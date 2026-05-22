package tech.tiangong.sdp.service.impl;

import cn.hutool.core.collection.CollectionUtil;
import cn.hutool.core.util.StrUtil;
import com.rabbitmq.client.Channel;
import jakarta.annotation.PostConstruct;
import jakarta.validation.ValidationException;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.amqp.core.Message;
import org.springframework.amqp.rabbit.annotation.Exchange;
import org.springframework.amqp.rabbit.annotation.Queue;
import org.springframework.amqp.rabbit.annotation.QueueBinding;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.retry.support.RetryTemplate;
import org.springframework.stereotype.Service;
import team.aikero.blade.core.enums.Bool;
import team.aikero.blade.util.json.JsonsKt;
import tech.tiangong.sdp.amqp.RabbitConstant;
import tech.tiangong.sdp.convert.BasicConvert;
import tech.tiangong.sdp.convert.TemuTaskConvert;
import tech.tiangong.sdp.entity.Product;
import tech.tiangong.sdp.entity.ProductSkc;
import tech.tiangong.sdp.entity.ProductSku;
import tech.tiangong.sdp.entity.TemuTask;
import tech.tiangong.sdp.enums.ProductStatusEnum;
import tech.tiangong.sdp.enums.TemuSkcSyncStatusEnum;
import tech.tiangong.sdp.enums.TemuTaskOptTypeEnum;
import tech.tiangong.sdp.enums.TemuTaskTypeEnum;
import tech.tiangong.sdp.repository.*;
import tech.tiangong.sdp.service.ShopService;
import tech.tiangong.sdp.service.StyleOnShelvesService;
import tech.tiangong.sdp.service.TemuTaskService;
import tech.tiangong.sdp.temu.http.TemuShopContext;
import tech.tiangong.sdp.temu.serivce.TemuProductService;
import tech.tiangong.sdp.temu.vo.req.TemuGalerieStoreVideoReq;
import tech.tiangong.sdp.temu.vo.req.TemuVideoResultGetReq;
import tech.tiangong.sdp.util.ImageUtils;
import tech.tiangong.sdp.util.TemuUtils;
import tech.tiangong.sdp.vo.req.StyleOnShelvesReleaseReq;

import java.io.File;
import java.time.LocalDateTime;
import java.util.*;
import java.util.function.Consumer;

/**
 * Temu任务
 *
 * @author ：qinwenxuan@zj.tech
 * @version :1.0
 * @date ：2026/1/18 16:28
 */
@Slf4j
@Service
@AllArgsConstructor
public class TemuTaskServiceImpl extends DefaultTaskServiceImpl implements TemuTaskService {
    private final ShopService shopService;
    private final StyleOnShelvesService styleOnShelvesService;
    private final TemuProductService temuProductService;
    private final TemuProductCategoryRepository temuProductCategoryRepository;
    private final ProductRepository productRepository;
    private final ProductAttrRepository productAttrRepository;
    private final ProductSkcRepository productSkcRepository;
    private final ProductSkuMainSpecRepository productSkuMainSpecRepository;
    private final ProductSkuRepository productSkuRepository;
    private final ProductSkuSiteSupplierPriceRepository productSkuSiteSupplierPriceRepository;
    private final ProductSizePartRepository productSizePartRepository;
    private final ProductSizeRepository productSizeRepository;
    private final ProductSkuSpecRepository productSkuSpecRepository;
    private final ProductSkuWarehouseRepository productSkuWarehouseRepository;
    private final ProductSpecAttrRepository productSpecAttrRepository;
    private final ProductWarehouseRouteRepository productWarehouseRouteRepository;
    private final ProductWhExtAttrRepository productWhExtAttrRepository;
    private final TemuProductFileRepository temuProductFileRepository;
    private final TemuTaskRepository temuTaskRepository;
    private final TemuSizeClassRepository temuSizeClassRepository;
    private final SizeTemplateRepository sizeTemplateRepository;
    private final RetryTemplate temuTaskRetryTemplate;
    private final Map<String, Consumer<TemuTask>> PUSH_TASK = new HashMap<>();
    private final Map<String, Consumer<Product>> OPT_TASK = new HashMap<>();
    private final static String LOCK_KEY = "sdp-curation:temu:task:";

    @Override
    public void test() {
        final var product = this.productRepository.getById(7427180452156649479L);
        product.setTasks(List.of(this.temuTaskRepository.getById(7427181755301736571L)));
        this.editPicture(product);
    }

    @Override
    public void job() {
        final var list = this.temuTaskRepository.jobs();
        if (CollectionUtil.isEmpty(list)) {
            return;
        }
        list.forEach(this::job);
    }

    @Override
    public void retry(Set<Long> productIds) {
        if (CollectionUtil.isEmpty(productIds)) {
            return;
        }
        final var list = this.temuTaskRepository.jobByProductIds(productIds);
        if (CollectionUtil.isEmpty(list)) {
            return;
        }
        list.forEach(this::job);
    }

    @Override
    public void pushTask(Long taskId) {
        pushTemuTask(this.temuTaskRepository.obtainById(taskId));
    }

    @RabbitListener(
            id = "sdpCurationTemuTaskPushConsumer",
            concurrency = "4-8",
            bindings =
            @QueueBinding(
                    value = @Queue(value = RabbitConstant.PUSH_TEMU_QUEUE, durable = "true", autoDelete = "false"),
                    exchange = @Exchange(value = RabbitConstant.PUSH_TEMU_EXCHANGE),
                    key = RabbitConstant.PUSH_TEMU_ROUTING_KEY))
    @Override
    public void pushTask(Message message, Channel channel) {
        rabbitConsumer.handle(message, channel,
                () -> pushTemu(message),
                e -> log.error("任务消费失败,{}", e.getLocalizedMessage(), e));
    }

    private void job(final TemuTask task) {
        Optional.ofNullable(PUSH_TASK.get(task.getTaskType()))
                .ifPresent(it -> pushTemuLock(task, () -> it.accept(task)));
    }

    private void pushTemu(final Message message) {
        final var dto = BasicConvert.message2DTO(message);
        log.info("Temu推送任务消费\t{}", JsonsKt.toJson(dto));
        execOrElse(this.temuTaskRepository.getById(dto.getTaskId()),
                this::pushTemuTask,
                () -> log.error("任务消费失败【{}】,任务不存在", dto.getTaskId()));
    }

    private void pushTemuTask(final TemuTask task) {
        this.doAsUser(task, () -> PUSH_TASK.get(task.getTaskType()).accept(task));
    }

    private void productAddTask(final TemuTask task) {
        final var product = getProduct(task);
        if (Objects.isNull(product)) {
            return;
        }
        product.setTasks(List.of(task));
        this.productAdd(product);
    }

    private void editPictures(final TemuTask task) {
        final var product = getProduct(task);
        if (Objects.isNull(product)) {
            return;
        }
        product.setTasks(List.of(task));
        this.editPicture(product);
    }

    private void editPicture(final Product product) {
//        if (!Objects.equals(ProductStatusEnum.PUBLISHING.getCode(), product.getProductStatus())) {
//            return;
//        }
        final var tasks = this.temuTaskRepository.listByParentId(product.getTasks().getFirst().getParentId());
        if (tasks.stream().anyMatch(TemuTask::failed)) {
            return;
        }
        if (!tasks.stream()
                .filter(it -> !StrUtil.equalsIgnoreCase(TemuTaskTypeEnum.EDIT_PICTURES.getCode(), it.getTaskType()))
                .allMatch(TemuTask::succeed)) {
            return;
        }
        product.setTasks(tasks);
        tasks.stream()
                .filter(it -> StrUtil.equalsIgnoreCase(TemuTaskTypeEnum.EDIT_PICTURES.getCode(), it.getTaskType()))
                .findFirst()
                .ifPresentOrElse(it -> pushPicture(it, product),
                        () -> log.error("商品修改文件任务不存在\t{}", product.getProductId()));
    }

    private void pushPicture(final TemuTask task, final Product product) {
        task.setPushTimes(task.requirePushTimes() + 1);
        task.setPushTime(LocalDateTime.now());
        final var productIds = List.of(product.getProductId());
        product.setFiles(this.temuProductFileRepository.listByProductIds(productIds));
        TemuShopContext.set(shopService.getApp(product.getShopId()));
        tryFinally(() ->
                        this.temuProductService.editProductPictures(TemuTaskConvert.buildProductPictureReq(product)),
                e -> {
                    log.error("请求Temu更新图片接口失败\t{}", e.getLocalizedMessage(), e);
                    task.setPushStatus(2);
                    task.setMessage(e.getLocalizedMessage());
                    product.setProductStatus(failedType(task).getCode());
                    product.setFailMessage(e.getLocalizedMessage());
                    invalidShop(e, product);
                }, () -> {
                    TemuShopContext.clear();
                    transaction(() -> {
                        temuTaskRepository.updateById(task);
                        productRepository.updateById(product);
                        releaseResult(task, product);
                    });
                }
        );
    }

    private void fileTask(final TemuTask task) {
        final var product = getProduct(task);
        if (Objects.isNull(product)) {
            return;
        }
        final var file = this.temuProductFileRepository.getById(task.getBusId());
        if (Objects.isNull(file)) {
            log.info("文件不存在\t{}", task.getTaskId());
            return;
        }
        if (Objects.equals(Bool.YES.getCode(), file.getPushStatus())) {
            log.info("文件已经上传Temu\t{}", task.getTaskId());
            return;
        }
        TemuShopContext.set(shopService.getApp(product.getShopId()));
        file.setPushTimes(task.requirePushTimes() + 1);
        file.setPushTime(LocalDateTime.now());
        file.setPushStatus(Bool.YES.getCode());
        tryFinally(() -> {
                    final var resp = this.temuProductService.fileUpload(file.getFileUrl());
                    task.setResponseData(JsonsKt.toJson(resp));
                    file.setTemuFileUrl(resp.getImageUrl());
                },
                e -> {
                    log.error("请求Temu文件上传接口失败\t{}", e.getLocalizedMessage(), e);
                    task.setPushStatus(2);
                    file.setPushStatus(2);
                    task.setMessage(e.getLocalizedMessage());
                    product.setProductStatus(failedType(task).getCode());
                    invalidShop(e, product);
                }, () -> {
                    TemuShopContext.clear();
                    transaction(() -> {
                        temuProductFileRepository.updateById(file);
                        temuTaskRepository.updateById(task);
                        productRepository.updateById(product);
                        releaseResult(task, product);
                        this.taskCallback(task, product);
                    });
                }
        );
    }


    /**
     * 方式一：bg.goods.sizecharts.create，reusable=true创建可复用尺码表，即尺码表模板（等同于用bg.goods.sizecharts.get查到的在卖家中心后台创建的尺码表模板）；
     * 再用businessId通过bg.goods.sizecharts.template.create生成tempBusinessId，作为发品入参使用
     * 方式二：bg.goods.sizecharts.create，reusable=false创建不可复用尺码表，接口返回的businessId可直接发品入参使用
     * 套装（classType=1）时创建尺码表不传catid
     * 注意：尺码表中的records数量和值必须于发品接口中的尺码保持一致
     */
    private void sizeTemplateTask(final TemuTask task) {
        final var product = getProduct(task);
        if (Objects.isNull(product)) {
            return;
        }
        final var category = temuProductCategoryRepository.getById(Long.valueOf(product.getPlatformCategoryCode()));
        if (Objects.isNull(category)) {
            log.info("商品尺码对应的品类不存在\t{}", task.getTaskId());
            return;
        }
        final var size = this.productSizeRepository.getById(task.getBusId());
        if (Objects.isNull(size)) {
            log.info("商品尺码不存在\t{}", task.getTaskId());
            return;
        }
        if (Objects.equals(Bool.NO.getCode(), category.getSuiting())) {
            category.setSizeClass(temuSizeClassRepository.getById(category.getCategoryId()));
        } else {
            // 套装获取模板对应的品类的classId
            final var sizeTemp = this.sizeTemplateRepository.getByName(size.getTemplateName());
            category.setSizeClass(temuSizeClassRepository.getById(Long.valueOf(sizeTemp.getPlatformCategoryCode())));
        }
        final var parts = this.productSizePartRepository.listBySizeId(size.getProductSizeId());
        if (CollectionUtil.isEmpty(parts)) {
            log.info("商品尺码部位不存在\t{}", task.getTaskId());
            return;
        }
        size.setSizeParts(parts);
        TemuShopContext.set(shopService.getApp(product.getShopId()));
        tryFinally(() -> {
                    final var resp = this.temuProductService.sizeChartsCreate(TemuTaskConvert.buildSizeCreateReq(size, category, product));
                    task.setResponseData(JsonsKt.toJson(resp));
                    final var id = resp.getBusinessId();
                    product.addSizeTemplateId(id);
                    size.setPlatformSizeId(id);
                    if (Objects.equals(Bool.YES.getCode(), size.getShowSize())) {
                        product.addShowSizeTemplateId(id);
                    }
                },
                e -> {
                    log.error("请求Temu添加尺码模板接口失败\t{}", e.getLocalizedMessage(), e);
                    task.setPushStatus(2);
                    task.setMessage(e.getLocalizedMessage());
                    product.setProductStatus(failedType(task).getCode());
                    invalidShop(e, product);
                }, () -> {
                    TemuShopContext.clear();
                    transaction(() -> {
                        temuTaskRepository.updateById(task);
                        productRepository.updateById(product);
                        productSizeRepository.updateById(size);
                        releaseResult(task, product);
                    });
                    this.taskCallback(task, product);
                }
        );
    }

    /**
     * 视频上传
     *
     * @param task 任务
     */
    private void videoTask(final TemuTask task) {
        final var product = getProduct(task);
        if (Objects.isNull(product)) {
            return;
        }
        final var file = this.temuProductFileRepository.getById(task.getBusId());
        if (Objects.isNull(file)) {
            log.info("文件不存在\t{}", task.getTaskId());
            return;
        }
        if (Objects.equals(Bool.YES.getCode(), file.getPushStatus())) {
            log.info("视频上传Temu\t{}", task.getTaskId());
            return;
        }
        TemuShopContext.set(shopService.getApp(product.getShopId()));
        file.setPushTimes(task.requirePushTimes() + 1);
        file.setPushTime(LocalDateTime.now());
        file.setPushStatus(Bool.YES.getCode());
        // 文件下载
        final var path = ImageUtils.downloadVideo(file.getFileUrl());
        tryFinally(() -> {
                    // 拿签名
                    final var sign = this.temuProductService.videoSign();
                    final var req = new TemuGalerieStoreVideoReq();
                    final var video = new File(path);
                    req.setMd5(TemuUtils.md5(video));
                    req.setFile(video);
                    req.setSign(sign);
                    // 文件上传
                    final var vid = this.temuProductService.galerieStoreVideo(req);
                    file.setExtVal(vid);
                    final var getReq = new TemuVideoResultGetReq();
                    getReq.setVid(vid);
//                    try {
//                        Thread.sleep(5000);
//                    } catch (InterruptedException e) {
//                        log.error("延迟3秒去视频解码失败\t{}", e.getLocalizedMessage(), e);
//                    }
                    // 解码
//                    final var resp = this.temuProductService.getVideoResult(getReq);
                    final var resp = temuTaskRetryTemplate.execute(context -> {
                        log.info("视频解码重试第 {} 次，taskId={}",
                                context.getRetryCount() + 1, task.getTaskId());
                        return this.temuProductService.getVideoResult(getReq);
                    });
                    task.setResponseData(JsonsKt.toJson(resp));
                    file.setCoverUrl(resp.getCoverUrl());
                    file.setTemuFileUrl(resp.getVideoUrl());
                    file.setFileWidth(resp.getWidth());
                    file.setFileHeight(resp.getHeight());
                },
                e -> {
                    log.error("请求Temu视频上传接口失败\t{}", e.getLocalizedMessage(), e);
                    task.setPushStatus(2);
                    file.setPushStatus(2);
                    task.setMessage(e.getLocalizedMessage());
                    product.setProductStatus(failedType(task).getCode());
                    invalidShop(e, product);
                }, () -> {
                    TemuShopContext.clear();
                    transaction(() -> {
                        temuProductFileRepository.updateById(file);
                        temuTaskRepository.updateById(task);
                        productRepository.updateById(product);
                        releaseResult(task, product);
                    });
                    this.taskCallback(task, product);
                    // 临时文件回收
                    ImageUtils.removeFile(path);
                }
        );
    }

    private Product getProduct(final TemuTask task) {
        if (Objects.equals(Bool.YES.getCode(), task.getPushStatus())) {
            log.info("任务已经执行\t{}", task.getTaskId());
            return null;
        }
        task.setPushTimes(task.requirePushTimes() + 1);
        task.setPushTime(LocalDateTime.now());
        task.setPushStatus(Bool.YES.getCode());
        final var product = this.productRepository.getById(task.getProductId());
        if (Objects.isNull(product)) {
            return null;
        }
        if (Objects.equals(ProductStatusEnum.PUBLISH_FAILED.getCode(), product.getProductStatus())) {
            task.setPushStatus(3);
            task.setMessage("商品发布失败,任务取消");
            temuTaskRepository.updateById(task);
            return null;
        }
        return product;
    }

    private void pushTemuLock(final TemuTask task, final Runnable run) {
        lock(LOCK_KEY + "push:" + task.getProductId(), 120L, run);
    }

    private void pushTemuLock(final Product product, final Runnable run) {
        lock(LOCK_KEY + "push:" + product.getProductId(), 120L, run);
    }

    private void productAdd(final Product product) {
        if (Objects.equals(ProductStatusEnum.PUBLISH_FAILED.getCode(), product.getProductStatus())) {
            return;
        }
        final var tasks = this.temuTaskRepository.listByParentId(product.getTasks().getFirst().getParentId());
        if (tasks.stream().anyMatch(TemuTask::failed)) {
            return;
        }
        if (!tasks.stream()
                .filter(it -> !StrUtil.equalsIgnoreCase(TemuTaskTypeEnum.PRODUCT_ADD.getCode(), it.getTaskType()))
                .allMatch(TemuTask::succeed)) {
            return;
        }
        tasks.stream()
                .filter(it -> StrUtil.equalsIgnoreCase(TemuTaskTypeEnum.PRODUCT_ADD.getCode(), it.getTaskType()))
                .findFirst()
                .ifPresentOrElse(it -> {
                            if (Objects.equals(it.requirePushStatus(), Bool.YES.getCode())) {
                                log.info("商品【{}】已经推送Temu", product.getStyleCode());
                            } else {
                                pushProduct(it, product);
                            }
                        },
                        () -> log.error("商品推送Temu任务不存在\t{}", product.getProductId()));
    }

    private void taskCallback(final TemuTask task, final Product product) {
        if (!Objects.equals(Bool.YES.getCode(), task.getPushStatus())) {
            return;
        }
        product.setTasks(List.of(task));
        log.info("Temu任务回调\t{}", JsonsKt.toJson(product));
        Optional.ofNullable(OPT_TASK.get(task.getOptType()))
                .ifPresentOrElse(it -> it.accept(product),
                        () -> log.error("任务回调处理不存在\t{}", task.getTaskId()));
    }

    private void pushProduct(final TemuTask task, final Product product) {
        if (Objects.requireNonNullElse(product.getPlatformProductId(), 0L) > 1) {
            log.info("商品【{}】已经推送Temu", product.getPlatformProductId());
            return;
        }
        if (!Objects.equals(task.requirePushStatus(), Bool.YES.getCode())) {
            task.setPushTimes(task.requirePushTimes() + 1);
            task.setPushTime(LocalDateTime.now());
            task.setPushStatus(Bool.YES.getCode());
        }
        if (StrUtil.isBlank(product.getSizeTemplateId())) {
            return;
        }
        final var productIds = List.of(product.getProductId());
        final var files = this.temuProductFileRepository.listByProductIds(productIds);
        if (CollectionUtil.isEmpty(files)) {
            return;
        }
        product.setFiles(files);
        final var skcs = this.productSkcRepository.listByProductIds(productIds);
        final var skus = this.productSkuRepository.listByProductIds(productIds);
        final var cats = this.temuProductCategoryRepository.list();
        final var skcMap = BasicConvert.toMap(skcs, ProductSkc::getProductSkcId);
        final var skuMap = BasicConvert.toMap(skus, ProductSku::getSkuCode);
        product.setSkcs(skcs);
        product.setSkus(skus);
        product.setSkuSpecs(this.productSkuSpecRepository.listByProductIds(productIds));
        product.setMainSpecs(this.productSkuMainSpecRepository.listByProductIds(productIds));
        product.setAttrs(this.productAttrRepository.listByProductIds(productIds));
        product.setSpecAttrs(this.productSpecAttrRepository.listByProductIds(productIds));
        product.setExtAttrs(this.productWhExtAttrRepository.listByProductIds(productIds));
        product.setPrices(this.productSkuSiteSupplierPriceRepository.listByProductIds(productIds));
        product.setWarehouses(this.productSkuWarehouseRepository.listByProductIds(productIds));
        product.setWarehouseRoutes(this.productWarehouseRouteRepository.listByProductIds(productIds));
        TemuShopContext.set(shopService.getApp(product.getShopId()));
        tryFinally(() -> {
                    final var resp = this.temuProductService.addProduct(TemuTaskConvert.buildGoodsAddReq(product, cats));
                    task.setResponseData(JsonsKt.toJson(resp));
                    product.setProductStatus(ProductStatusEnum.PUBLISHED.getCode());
                    product.setPlatformProductId(resp.getProductId());
                    product.setHidden(Bool.NO.getCode());
                    resp.getProductSkuList()
                            .forEach(it -> {
                                final var sku = skuMap.get(it.getExtCode());
                                final var skc = skcMap.get(sku.getProductSkcId());
                                skc.setSyncStatus(TemuSkcSyncStatusEnum.UN_SYNC.getCode());
                                skc.setPlatformSkcId(it.getProductSkcId());
                                sku.setPlatformSkuId(it.getProductSkuId());
                            });
                },
                e -> {
                    log.error("请求Temu添加商品接口失败\t{}", e.getLocalizedMessage(), e);
                    task.setPushStatus(2);
                    task.setMessage(e.getLocalizedMessage());
                    product.setProductStatus(failedType(task).getCode());
                    invalidShop(e, product);
                }, () -> {
                    TemuShopContext.clear();
                    transaction(() -> {
                        temuTaskRepository.updateById(task);
                        productRepository.updateById(product);
                        productSkcRepository.editBatchById(skcs);
                        productSkuRepository.updateBatchById(skus);
                    });
                    releaseResult(task, product);
                }
        );
    }

    private void releaseResult(final TemuTask task, final Product product) {
        //如果是其他的任务并且成功的不需要通知开款
        if (!StrUtil.equalsIgnoreCase(TemuTaskTypeEnum.PRODUCT_ADD.getCode(), task.getTaskType()) &&
                task.addSucceed()) {
            return;
        }
        final var req = new StyleOnShelvesReleaseReq();
        req.setReleaseSuccess(task.succeed());
        req.setStyleId(product.getStyleId());
        req.setReleaseFailReason(task.getMessage());
        try {
            this.styleOnShelvesService.releaseResult(req);
        } catch (Exception e) {
            log.error("处理推送Temu失败异常\t{}", e.getLocalizedMessage(), e);
        }
    }

    private ProductStatusEnum failedType(final TemuTask task) {
        if (StrUtil.equalsIgnoreCase(TemuTaskOptTypeEnum.ADD.getCode(), task.getOptType())) {
            return ProductStatusEnum.PUBLISH_FAILED;
        }
        return ProductStatusEnum.EDIT_FAILED;
    }

    private void invalidShop(final Exception e, final Product product) {
        if (e instanceof ValidationException) {
            try {
                this.shopService.invalid(product.getShopId());
            } catch (Exception ex) {
                log.error("更新店铺失效失败\t{}", e.getLocalizedMessage(), e);
            }
        }
    }

    @PostConstruct
    void init() {
        log.info("初始化函数");
        PUSH_TASK.putIfAbsent(TemuTaskTypeEnum.VIDEO.getCode(), it -> pushTemuLock(it, () -> videoTask(it)));
        PUSH_TASK.putIfAbsent(TemuTaskTypeEnum.FILE.getCode(), it -> pushTemuLock(it, () -> fileTask(it)));
        PUSH_TASK.putIfAbsent(TemuTaskTypeEnum.SIZE_TEMPLATE.getCode(), it -> pushTemuLock(it, () -> sizeTemplateTask(it)));
        PUSH_TASK.putIfAbsent(TemuTaskTypeEnum.PRODUCT_ADD.getCode(), it -> pushTemuLock(it, () -> productAddTask(it)));
        PUSH_TASK.putIfAbsent(TemuTaskTypeEnum.EDIT_PICTURES.getCode(), it -> pushTemuLock(it, () -> editPictures(it)));
        OPT_TASK.putIfAbsent(TemuTaskOptTypeEnum.ADD.getCode(), it -> pushTemuLock(it, () -> this.productAdd(it)));
        OPT_TASK.putIfAbsent(TemuTaskOptTypeEnum.EDIT_FILE.getCode(), it -> pushTemuLock(it, () -> this.editPicture(it)));
        OPT_TASK.putIfAbsent(TemuTaskOptTypeEnum.EDIT_SKC.getCode(), it -> pushTemuLock(it, () -> this.productAdd(it)));
    }
}
