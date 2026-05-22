package tech.tiangong.sdp.service.impl;

import cn.hutool.core.collection.CollectionUtil;
import cn.hutool.core.util.StrUtil;
import com.alibaba.excel.EasyExcel;
import com.baomidou.mybatisplus.core.toolkit.CollectionUtils;
import com.baomidou.mybatisplus.core.toolkit.StringUtils;
import com.google.common.collect.Maps;
import com.rabbitmq.client.Channel;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.amqp.core.Message;
import org.springframework.amqp.rabbit.annotation.Exchange;
import org.springframework.amqp.rabbit.annotation.Queue;
import org.springframework.amqp.rabbit.annotation.QueueBinding;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;
import team.aikero.admin.common.vo.DictVo;
import team.aikero.blade.core.enums.Bool;
import team.aikero.blade.core.protocol.PageVo;
import team.aikero.blade.util.json.JsonsKt;
import tech.tiangong.butted.common.enums.TaskStatusEnum;
import tech.tiangong.butted.common.req.base.CompanyUserBatchReq;
import tech.tiangong.butted.common.vo.*;
import tech.tiangong.sdp.amqp.RabbitConstant;
import tech.tiangong.sdp.common.req.AiTaskCallbackReq;
import tech.tiangong.sdp.common.req.DevelopStyleRelaAddReq;
import tech.tiangong.sdp.convert.BasicConvert;
import tech.tiangong.sdp.convert.DesignImageConvert;
import tech.tiangong.sdp.convert.DevelopStyleTaskConvert;
import tech.tiangong.sdp.entity.*;
import tech.tiangong.sdp.enums.*;
import tech.tiangong.sdp.excel.DevelopStyleDataListener;
import tech.tiangong.sdp.external.*;
import tech.tiangong.sdp.repository.*;
import tech.tiangong.sdp.service.*;
import tech.tiangong.sdp.vector.VectorContext;
import tech.tiangong.sdp.vo.dto.DesignImageDTO;
import tech.tiangong.sdp.vo.dto.DevelopStyleExcelDTO;
import tech.tiangong.sdp.vo.dto.DevelopStyleStateGroupDTO;
import tech.tiangong.sdp.vo.dto.FabricIdentifyDTO;
import tech.tiangong.sdp.vo.req.*;
import tech.tiangong.sdp.vo.resp.DevelopStyleOptResp;
import tech.tiangong.sdp.vo.resp.DevelopStyleRemarkResp;
import tech.tiangong.sdp.vo.resp.DevelopStyleTaskPageResp;
import tech.tiangong.sdp.vo.resp.SkcImageResp;
import tech.tiangong.sdp.vo.resp.*;

import javax.validation.ValidationException;
import java.io.IOException;
import java.io.InputStream;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.*;
import java.util.function.Function;
import java.util.stream.Collectors;

/**
 * 开款任务Service
 *
 * @author ：qinwenxuan@zj.tech
 * @version :1.0
 * @date ：2025/11/4 15:31
 */
@Slf4j
@Service
@AllArgsConstructor
public class DevelopStyleTaskServiceImpl extends DefaultTaskServiceImpl implements DevelopStyleTaskService {
    private final DevelopStyleTaskRepository developStyleTaskRepository;
    private final DevelopStylePictureRepository developStylePictureRepository;
    private final DevelopStyleRelaTaskRepository developStyleRelaTaskRepository;
    private final DevelopStyleRemarkRepository developStyleRemarkRepository;
    private final DevelopStyleOptRepository developStyleOptRepository;
    private final DevelopStyleSpuRepository developStyleSpuRepository;
    private final DevelopStyleSkcRepository developStyleSkcRepository;
    private final ClipLabelTaskRepository clipLabelTaskRepository;
    private final PictureCaptionTaskRepository pictureCaptionTaskRepository;
    private final PatternCheckTaskRepository patternCheckTaskRepository;
    private final CategoryRecTaskRepository categoryRecTaskRepository;
    private final FashionAnalysisTaskRepository fashionAnalysisTaskRepository;
    private final MulfeatExtractTaskRepository mulfeatExtractTaskRepository;

    private final SkcImageVectorRepository skcImageVectorRepository;

    private final DevelopStyleTaskBomOrderRepository developStyleTaskBomOrderRepository;
    private final SpotStyleTaskService spotStyleTaskService;
    private final DesignStyleService designStyleService;
    private final PrototypeService prototypeService;
    private final PrototypeRepository prototypeRepository;
    private final SpotStyleTaskRepository spotStyleTaskRepository;
    private final SpotStyleSkcRepository spotStyleSkcRepository;
    private final DictClientExternal dictClientExternal;
    private final DesignImageService designImageService;
    private final static String LOCK_KEY = "sdp-curation:develop:style:";
    private final static String FD_PRINTING = "fd-printing";
    private final static String APS_CATEGORY_TYPE = "aps_category_type";
    private final static String PLM_ELASTIC_REQUIREMENT = "plm_elastic_requirement";
    private final static String CLOTHING_COLOR = "clothing_color";
    private final static String FIT = "fit";
    //    private final static String PRODUCT_STYLE = "product_style";
    private final static String PLM_REFERENCE_SEASON = "plm_reference_season";
    private final static String MODEL_CATEGORY_REC = "CATEGORY_REC";
    private final static String MODEL_FABRIC_IDENTIFY = "FABRIC_IDENTIFY";
    private final static String MODEL_PATTERN_CHECK = "PATTERN_CHECK";
    private final static String MODEL_CLIP_LABEL = "CLIP_VIT_L_14";
    private final static String MODEL_FASHION_ANALYSIS = "FASHION_ANALYSIS";
    private final static String MODEL_MULFEAT_EXTRACT = "MULFEAT_EXTRACT";
    private final static SourceEnum SOURCE = SourceEnum.DEVELOP_STYLE;

    @Override
    public PageVo<DevelopStyleTaskPageResp> page(DevelopStyleTaskPageReq req) {
        final var query = DevelopStyleTaskConvert.buildWebPage(req);
        if (query.getEmpty()) {
            return new PageVo<>();
        }
        final var page = this.developStyleTaskRepository.webPage(query);
        final var records = page.getRecords();
        if (CollectionUtil.isEmpty(records)) {
            return new PageVo<>();
        }
        final var taskIds = records.stream().map(DevelopStyleTask::getTaskId).toList();
        final Map<Long, List<DevelopStylePicture>> imageMap =
                BasicConvert.groupingBy(this.developStylePictureRepository.listByTaskIds(taskIds),
                        DevelopStylePicture::getTaskId);
        final Map<Long, DevelopStyleSpu> spuMap =
                BasicConvert.toMap(this.developStyleSpuRepository.listByTaskIds(taskIds),
                        DevelopStyleSpu::getTaskId);
        return BasicConvert.page(page, it -> DevelopStyleTaskConvert.convert(it, imageMap, spuMap));
    }

    @Override
    public List<DevelopStyleStateGroupDTO> stateTotal(DevelopStyleTaskPageReq req) {
        return this.developStyleTaskRepository.groupTotal(DevelopStyleTaskConvert.buildWebPage(req));
    }

    @Transactional(rollbackFor = Exception.class)
    @Override
    public Boolean batchCreate(List<DevelopStyleTaskAddReq> req) {
        validation();
        final var reqs = req.stream()
                .filter(DevelopStyleTaskAddReq::hasKey2)
                .filter(it -> Objects.equals(DevelopStyleTypeEnum.SPOT_STYLE, it.getStyleType()))
                .map(it -> new SpotSupplierListReq(it.getSupplierName(), it.getSupplierStyleCode()))
                .toList();
        if (CollectionUtil.isNotEmpty(reqs)) {
            final var suppliers = spotStyleTaskService.listSupplier(reqs);
            if (CollectionUtil.isNotEmpty(suppliers)) {
                throw new ValidationException("该款号已存在SPU，请勿重复添加");
            }
        }
        final var list = DevelopStyleTaskConvert.convert(req);
        this.developStyleTaskRepository.saveBatch(list);
        styleSaveOrUpdated(list);
        this.created(list);
        return true;
    }


    @Transactional(rollbackFor = Exception.class)
    @Override
    public List<DevelopStyleTaskCreateResp> batchCreateOpen(CompanyUserBatchReq<DevelopStyleTaskOpenAddReq> req) {
        final var reqData = req.getData();
        final var list = DevelopStyleTaskConvert.convertOpen(reqData);
        this.developStyleTaskRepository.saveBatch(list);
        styleSaveOrUpdated(list);
        this.created(list);
        return list.stream().map(DevelopStyleTaskConvert::convertOpenCreateResp).toList();
    }


    @Transactional(rollbackFor = Exception.class)
    @Override
    public Boolean batchCheck(List<DevelopStyleTaskCheckReq> req) {
        validation();
        req.forEach(DevelopStyleTaskCheckReq::validation);
        final var tasks = this.developStyleTaskRepository.listByIds(req.stream().map(DevelopStyleTaskCheckReq::getTaskId).toList());
        if (CollectionUtil.isEmpty(tasks)) {
            throw new ValidationException("开款任务不存在");
        }
        tasks.forEach(it -> {
            if (it.banCheck()) {
                throw new ValidationException("不允许重复审核【" + it.getTaskCode() + "】");
            }
        });
        final var list = DevelopStyleTaskConvert.convert(req, tasks);
        if (CollectionUtil.isEmpty(list)) {
            return false;
        }
        this.developStyleTaskRepository.updateBatchById(list, list.size());
        styleSaveOrUpdated(list);
        created(list);
        return true;
    }

    @Transactional(rollbackFor = Exception.class)
    @Override
    public Boolean batchDevelop(List<DevelopStyleSpuAddReq> req) {
        validation();
        final var tasks = this.developStyleTaskRepository.listByIds(req.stream().map(DevelopStyleSpuAddReq::getTaskId).toList());
        if (CollectionUtil.isEmpty(tasks)) {
            throw new ValidationException("开款任务不存在");
        }
        tasks.forEach(it -> {
            if (it.banDevelop()) {
                throw new ValidationException("仅待开款的任务允许开款【" + it.getTaskCode() + "】");
            }
        });
        final var list = DevelopStyleTaskConvert.convertDevelop(req, tasks);
        if (CollectionUtil.isEmpty(list)) {
            return false;
        }
        this.developStyleTaskRepository.updateBatchById(list, list.size());
        styleSaveOrUpdated(list);
        final var pictureMap = BasicConvert.groupingBy(
                this.developStylePictureRepository.listByTaskIds(list.stream().map(DevelopStyleTask::getTaskId).toList()),
                DevelopStylePicture::getTaskId);
        list.forEach(it -> {
            it.setPictures(pictureMap.get(it.getTaskId()));
            developed(it);
        });
        this.developStyleTaskRepository.updateBatchById(list, list.size());
        final var spus = list.stream().flatMap(it -> it.getSpus().stream()).toList();
        this.developStyleSpuRepository.updateBatchById(spus, spus.size());
        return true;
    }

    @Transactional(rollbackFor = Exception.class)
    @Override
    public Boolean batchRela(List<DevelopStyleRelaAddReq> req) {
        final var tasks = this.developStyleTaskRepository.listByIds(req.stream().map(DevelopStyleRelaAddReq::getTaskId).toList());
        if (CollectionUtil.isEmpty(tasks)) {
            throw new ValidationException("开款任务不存在");
        }
        final var taskMap = BasicConvert.toMap(tasks, DevelopStyleTask::getTaskId);
        req.stream().filter(it -> taskMap.containsKey(it.getTaskId()))
                .forEach(it -> rela(it, taskMap.get(it.getTaskId())));
        return true;
    }

    @Transactional(rollbackFor = Exception.class)
    @Override
    public Boolean batchIdentify(List<Long> taskIds) {
        validation();
        final var tasks = this.developStyleTaskRepository.listByIds(taskIds);
        if (CollectionUtil.isEmpty(tasks)) {
            throw new ValidationException("开款任务不存在");
        }
        tasks.forEach(it -> {
            if (it.banDevelop()) {
                throw new ValidationException("仅待开款的任务允许识别【" + it.getTaskCode() + "】");
            }
            if (!it.failed()) {
                throw new ValidationException("仅待识别失败的任务允许识别【" + it.getTaskCode() + "】");
            }
        });
        tasks.forEach(this::identify);
        this.created(tasks);
        return true;
    }

    @Transactional(rollbackFor = Exception.class)
    @Override
    public Boolean addRemark(DevelopStyleRemarkReq req) {
        validation();
        final var task = this.developStyleTaskRepository.obtainById(req.getTaskId());
        DevelopStyleTaskConvert.convert(req, task);
        this.developStyleTaskRepository.updateById(task);
        this.styleSaveOrUpdated(List.of(task));
        return true;
    }

    @Override
    public List<DevelopStyleRemarkResp> listRemark(List<Long> taskIds) {
        if (CollectionUtil.isEmpty(taskIds)) {
            return Collections.emptyList();
        }
        final var data = this.developStyleRemarkRepository.listByTaskIds(taskIds);
        if (CollectionUtil.isEmpty(data)) {
            return Collections.emptyList();
        }
        return data.stream().map(DevelopStyleTaskConvert::toRemarkResp).toList();
    }

    @Override
    public List<DevelopStyleOptResp> listOpt(List<Long> taskIds) {
        if (CollectionUtil.isEmpty(taskIds)) {
            return Collections.emptyList();
        }
        final var data = this.developStyleOptRepository.listByTaskIds(taskIds);
        if (CollectionUtil.isEmpty(data)) {
            return Collections.emptyList();
        }
        return data.stream().map(DevelopStyleTaskConvert::toOptResp).toList();
    }

    @Transactional(rollbackFor = Exception.class)
    @Override
    public Boolean batchDeleted(List<Long> taskIds) {
        validation();
        if (CollectionUtil.isEmpty(taskIds)) {
            return false;
        }
        final var tasks = this.developStyleTaskRepository.listByIds(taskIds);
        if (CollectionUtil.isEmpty(tasks)) {
            throw new ValidationException("开款任务不存在");
        }
        tasks.forEach(this::deleted);
        this.styleSaveOrUpdated(tasks);
        return true;
    }


    @Override
    public List<DevelopStyleExcelDTO> importExcel(MultipartFile file) {
        try (final var reader = file.getInputStream()) {
            return importExcel(reader);
        } catch (IOException e) {
            log.error("导入开款失败\t{}", e.getMessage(), e);
        }
        return Collections.emptyList();
    }

    @Override
    public List<DevelopStyleExcelDTO> importExcel(InputStream inputStream) {
        final var listener = new DevelopStyleDataListener();
        EasyExcel.read(inputStream, DevelopStyleExcelDTO.class, listener).doReadAll();
        return listener.getList();
    }

    @Override
    public void callbackClip(AiTaskCallbackReq req) {
        log.info("开款任务-提取标签callback\t{}", JsonsKt.toJsonPretty(req));
        execOrElse(this.clipLabelTaskRepository.getById(req.getBusId()),
                this::callbackClip,
                () -> log.warn("开款任务-提取标签callback任务【{}】不存在", req.getBusId()));
    }


    @RabbitListener(
            id = "sdpCurationPushDevelopStyleConsumer",
            concurrency = "4-8",
            bindings =
            @QueueBinding(
                    value = @Queue(value = RabbitConstant.PUSH_DEVELOP_STYLE_QUEUE,
                            durable = "true", autoDelete = "false"),
                    exchange = @Exchange(value = RabbitConstant.PUSH_DEVELOP_STYLE_EXCHANGE),
                    key = RabbitConstant.PUSH_DEVELOP_STYLE_ROUTING_KEY))

    @Override
    public void pushTask(Message message, Channel channel) {
        this.handle(message, channel, this.developStyleTaskRepository::getById, this::pushWithLock);
    }

    @Override
    public void job() {
        log.info("开款任务-定时任务-开始");
        final var recs = this.categoryRecTaskRepository.listByDevelopStyleJobs();
        if (CollectionUtil.isNotEmpty(recs)) {
            final var taskMap = mapByCodes(recs.stream().map(CategoryRecTask::getTaskCode).toList());
            recs.forEach(it -> this.job(taskMap.get(it.getTaskCode()), it));
        }
        final var feats = this.mulfeatExtractTaskRepository.jobs(SOURCE);
        if (CollectionUtil.isNotEmpty(feats)) {
            final var taskMap = mapByCodes(feats.stream().map(MulfeatExtractTask::getTaskCode).toList());
            feats.forEach(it -> this.job(taskMap.get(it.getTaskCode()), it));
        }
        final var captions = this.pictureCaptionTaskRepository.listByDevelopStyleJobs();
        if (CollectionUtil.isNotEmpty(captions)) {
            final var taskMap = mapByCodes(captions.stream().map(PictureCaptionTask::getTaskCode).toList());
            captions.forEach(it -> this.job(taskMap.get(it.getTaskCode()), it));
        }
        final var checks = this.patternCheckTaskRepository.listByDevelopStyleJobs();
        if (CollectionUtil.isNotEmpty(checks)) {
            final var taskMap = mapByCodes(checks.stream().map(PatternCheckTask::getTaskCode).toList());
            checks.forEach(it -> this.job(taskMap.get(it.getTaskCode()), it));
        }
        final var clips = this.clipLabelTaskRepository.listBySourceJobs(SOURCE);
        if (CollectionUtil.isNotEmpty(clips)) {
            final var taskMap = mapByCodes(clips.stream().map(ClipLabelTask::getTaskCode).toList());
            clips.forEach(it -> this.job(taskMap.get(it.getTaskCode()), it));
        }
        final var analysis = this.fashionAnalysisTaskRepository.listBySourceJobs(SOURCE);
        if (CollectionUtil.isNotEmpty(analysis)) {
            final var taskMap = mapByCodes(analysis.stream().map(FashionAnalysisTask::getTaskCode).toList());
            analysis.forEach(it -> this.job(taskMap.get(it.getTaskCode()), it));
        }
        final var data = this.developStyleTaskRepository.jobs();
        if (CollectionUtil.isNotEmpty(data)) {
            data.forEach(this::job);
        }
        final var jobChecks = this.developStyleTaskRepository.jobChecks();
        if (CollectionUtil.isNotEmpty(jobChecks)) {
            jobChecks.forEach(it -> {
                final var opts = this.developStyleOptRepository.listByTaskIds(List.of(it.getTaskId()));
                if (CollectionUtil.isNotEmpty(opts)) {
                    opts.stream().filter(o -> Objects.equals(DevelopStyleOptTypeEnum.CHECK.getCode(), o.getOptType()))
                            .findFirst()
                            .ifPresent(o -> {
                                if (StrUtil.equalsIgnoreCase(DevelopStyleOptTypeEnum.CHECK_PASS.getVale(), o.getContent())) {
                                    it.setTaskStatus(DevelopStyleTaskStatusEnum.PAYMENT_PENDING.getCode());
                                    it.setCheckResult(DevelopStyleCheckResultEnum.PASS.getCode());
                                } else {
                                    it.setCheckResult(DevelopStyleCheckResultEnum.DISUSE.getCode());
                                    it.setTaskStatus(DevelopStyleTaskStatusEnum.ELIMINATED.getCode());
                                }
                                this.developStyleTaskRepository.updateByIdManualFill(it);
                            });
                }
            });
        }
        log.info("开款任务-定时任务-结束");
    }


    @Override
    public void callback(AiTaskCallbackReq req) {
        log.info("开款任务-品类识别callback\t{}", JsonsKt.toJsonPretty(req));
        execOrElse(this.categoryRecTaskRepository.getById(req.getBusId()),
                this::callback,
                () -> log.warn("开款任务-品类识别callback任务【{}】不存在", req.getBusId()));
    }

    @Override
    public void pushTask(Long taskId) {
        final var task = this.developStyleTaskRepository.getById(taskId);
        if (Objects.isNull(task)) {
            log.error("开款任务-推送失败,任务不存在\t{}", taskId);
            return;
        }
        this.pushWithLock(task);
    }

    @Override
    public void callbackFabricIdentify(AiTaskCallbackReq req) {
        log.info("开款任务-面料识别callback\t{}", JsonsKt.toJsonPretty(req));
        execOrElse(this.pictureCaptionTaskRepository.getById(req.getBusId()),
                this::callbackFabricIdentify,
                () -> log.warn("开款任务-面料识别callback任务【{}】不存在", req.getBusId()));
    }

    @Override
    public void callbackPatternCheck(AiTaskCallbackReq req) {
        log.info("开款任务-款式分类callback\t{}", JsonsKt.toJsonPretty(req));
        execOrElse(this.patternCheckTaskRepository.getById(req.getBusId()),
                this::callbackPatternCheck,
                () -> log.warn("开款任务-款式分类callback任务【{}】不存在", req.getBusId()));
    }

    @Override
    public void callbackFashionAnalysis(AiTaskCallbackReq req) {
        log.info("开款任务-fashion分析callback\t{}", JsonsKt.toJsonPretty(req));
        execOrElse(this.fashionAnalysisTaskRepository.getById(req.getBusId()),
                this::callbackAnalysis,
                () -> log.warn("开款任务-fashion分析callback任务【{}】不存在", req.getBusId()));
    }

    @Override
    public List<DevelopStyleTaskQueryResp> queryList(DevelopStyleTaskOpenQueryReq req) {
        if (CollectionUtil.isEmpty(req.getTaskCodes()) && CollectionUtil.isEmpty(req.getTaskIds())) {
            throw new ValidationException("开款信息查询参数必传！");
        }
        final var list = developStyleTaskRepository.query(req);
        if (CollectionUtil.isEmpty(list)) {
            return Collections.emptyList();
        }
        final var designStyleList = list.stream().filter(t -> t.isPushDesignStyleType()).toList();
        final var spotList = list.stream().filter(t -> !t.isPushDesignStyleType()).toList();
        List<DevelopStyleTaskQueryResp> resp = new ArrayList<>();
        if (CollectionUtils.isNotEmpty(designStyleList)) {
            resp.addAll(buildDesignStyleResp(designStyleList));
        }
        if (CollectionUtils.isNotEmpty(spotList)) {
            resp.addAll(buildDesignSpotResp(spotList));
        }
        return resp;
    }

    private List<DevelopStyleTaskQueryResp> buildDesignSpotResp(List<DevelopStyleTask> designStyleList) {
        final var spuCodes = designStyleList.stream().filter(t -> StringUtils.isNotBlank(t.getSpuCode())).map(DevelopStyleTask::getSpuCode).toList();
        Map<String, List<String>> spuMap = new HashMap<>();
        if (CollectionUtils.isNotEmpty(spuCodes)) {
            final var spuList = spotStyleTaskRepository.listByTaskCodes(spuCodes);
            if (CollectionUtil.isNotEmpty(spuList)) {
                final var spuIds = spuList.stream().map(SpotStyleTask::getTaskId).toList();
                final var skcList = spotStyleSkcRepository.listByTaskIds(spuIds);
                final var skcMap = BasicConvert.groupingBy(skcList, SpotStyleSkc::getTaskId);
                spuList.forEach(t -> {
                    if (!skcMap.isEmpty() && skcMap.containsKey(t.getTaskId())) {
                        spuMap.put(t.getTaskCode(),skcMap.get(t.getTaskId()).stream().map(SpotStyleSkc::getSkcCode).toList());
                    }
                });
            }
        }
        return designStyleList.stream().map(t -> {
            DevelopStyleTaskQueryResp resp = new DevelopStyleTaskQueryResp();
            resp.setTaskId(t.getTaskId());
            resp.setTaskCode(t.getTaskCode());
            resp.setTaskStatus(t.getTaskStatus());
            resp.setSpuCode(t.getSpuCode());
            if (StringUtils.isNotBlank(t.getSpuCode()) && !spuMap.isEmpty() && spuMap.containsKey(t.getSpuCode())) {
                resp.setSkcCodes(spuMap.get(t.getSpuCode()));
            }
            return resp;
        }).toList();
    }

    private List<DevelopStyleTaskQueryResp> buildDesignStyleResp(List<DevelopStyleTask> designStyleList) {
        final var spuCodes = designStyleList.stream().filter(t -> StringUtils.isNotBlank(t.getSpuCode())).map(DevelopStyleTask::getSpuCode).toList();
        Map<String, List<Prototype>> spuMap = new HashMap<>();
        if (CollectionUtils.isNotEmpty(spuCodes)) {
            final var skcList = prototypeRepository.listByStyleCodes(spuCodes);
            if (CollectionUtil.isNotEmpty(skcList)) {
                spuMap = BasicConvert.groupingBy(skcList, Prototype::getStyleCode);
            }
        }
        Map<String, List<Prototype>> finalSpuMap = spuMap;
        return designStyleList.stream().map(t -> {
            DevelopStyleTaskQueryResp resp = new DevelopStyleTaskQueryResp();
            resp.setTaskId(t.getTaskId());
            resp.setTaskCode(t.getTaskCode());
            resp.setTaskStatus(t.getTaskStatus());
            resp.setSpuCode(t.getSpuCode());
            if (StringUtils.isNotBlank(t.getSpuCode()) && !finalSpuMap.isEmpty() && finalSpuMap.containsKey(t.getSpuCode())) {
                resp.setSkcCodes(finalSpuMap.get(t.getSpuCode()).stream().map(Prototype::getDesignCode).toList());
            }
            return resp;
        }).toList();
    }


    @Transactional(rollbackFor = Exception.class)
    @Override
    public Long pickingStyleDevelop(PickingStyleDevelopReq req) {
        validation();
        if (req.add()) {
            if (req.disuse()) {
                return 0L;
            }
            return pickingAdd(req);
        }
        final var task = this.developStyleTaskRepository.getById(req.getTaskId());
        if (Objects.isNull(task)) {
            return pickingAdd(req);
        }
        if (task.develop()) {
            return task.getTaskId();
        }
        if (req.disuse()) {
            return pickingEliminate(task);
        }
        if (task.eliminated()) {
            return pickingAdd(req);
        }
        return task.getTaskId();
    }

    @Override
    public void callbackMulfeatExtract(AiTaskCallbackReq req) {
        log.info("开款任务-图片特征提取callback\t{}", JsonsKt.toJsonPretty(req));
        execOrElse(this.mulfeatExtractTaskRepository.getById(req.getBusId()),
                this::callbackMulfeatExtract,
                () -> log.warn("开款任务-图片特征提取callback任务【{}】不存在", req.getBusId()));
    }

    @Override
    public List<SkcImageResp> listSameSkc(List<Long> taskIds) {
        if (CollectionUtil.isEmpty(taskIds)) {
            return List.of();
        }
        final var tasks = this.developStyleTaskRepository.listByIds(taskIds);
        if (CollectionUtil.isEmpty(tasks)) {
            return List.of();
        }
        final var imageVectorIds = tasks.stream().map(DevelopStyleTask::requireImageVectorId).filter(id -> id > 0L).toList();
        if (CollectionUtil.isEmpty(imageVectorIds)) {
            return List.of();
        }
        final var imageVectors = this.skcImageVectorRepository.listByIds(imageVectorIds);
        if (CollectionUtil.isEmpty(imageVectors)) {
            return List.of();
        }
        return getSkcImages(imageVectors);
    }

    @Override
    public void historyVector() {
        final var tasks = this.developStyleTaskRepository.historyVector();
        if (CollectionUtil.isEmpty(tasks)) {
            return;
        }
        tasks.forEach(it -> it.setMulfeatExtracts(List.of(DevelopStyleTaskConvert.obtainMulfeatExtract(it))));
        styleSaveOrUpdated(tasks);
        this.created(tasks);
    }

    private List<SkcImageResp> getSkcImages(final List<SkcImageVector> imageVectors) {
        final var spotVectors = new ArrayList<DesignImageDTO>();
        final var list = new ArrayList<SkcImageResp>();
        imageVectors.forEach(it -> {
            final var vectors = listVector(it);
            if (CollectionUtil.isNotEmpty(vectors)) {
                spotVectors.addAll(vectors);
            }
        });
        log.info("向量查询\t{}", JsonsKt.toJsonPretty(spotVectors));
        if (CollectionUtil.isEmpty(spotVectors)) {
            return List.of();
        }
        final var ids = spotVectors.stream().map(DesignImageDTO::getImageId).collect(Collectors.toSet());
        final var skcImageVectors = this.skcImageVectorRepository.listByIds(ids);
        if (CollectionUtil.isEmpty(skcImageVectors)) {
            return List.of();
        }
        final var imageIds = skcImageVectors.stream().map(SkcImageVector::getImageId).collect(Collectors.toSet());
        final var images = spotVectors.stream()
                .filter(it -> imageIds.contains(it.getImageId())).toList();
        final var spots = this.spotStyleTaskService.listByDesignImage(images);
        if (CollectionUtil.isNotEmpty(spots)) {
            list.addAll(spots);
        }
        final var designStyles = this.prototypeService.listByDesignImage(images);
        if (CollectionUtil.isNotEmpty(designStyles)) {
            list.addAll(designStyles);
        }
        if (CollectionUtil.isEmpty(list)) {
            return List.of();
        }
        final var developVectors = BasicConvert.groupingBy(list, SkcImageResp::getDevelopTaskId);
        final var resp = new ArrayList<SkcImageResp>();
        developVectors.forEach((k, v) -> {
            final var skcVectors = BasicConvert.groupingBy(v, DesignImageDTO::getSkcCode);
            skcVectors.forEach((c, r) -> {
                log.info("分组向量\t{}", JsonsKt.toJsonPretty(r));
                r.stream()
                        .min(Comparator.comparing(s -> new BigDecimal(Float.toString(s.getScore())).abs()))
                        .ifPresent(resp::add);
            });
        });
        return resp.stream().sorted(Comparator.comparingDouble(it -> Math.abs(it.getScore()))).collect(Collectors.toList());
    }

    private List<DesignImageDTO> listVector(final SkcImageVector vector) {
        VectorContext.set(vector.getTenantId());
        final var vectors = new ArrayList<DesignImageDTO>();
        try {
            listVector(vector.getFullFeat(), vectors, vector.getDevelopTaskId());
            listVector(vector.getUpFeat(), vectors, vector.getDevelopTaskId());
            listVector(vector.getDownFeat(), vectors, vector.getDevelopTaskId());
        } catch (Exception e) {
            log.error("查询向量失败\t{}", e.getLocalizedMessage(), e);
        } finally {
            VectorContext.clear();
        }
        return vectors;
    }

    private void listVector(final String data, final List<DesignImageDTO> vectors, final Long developTaskId) {
        if (StrUtil.isBlank(data)) {
            return;
        }
        final var list = this.designImageService.listVector(JsonsKt.parseJsonList(data, Float.class));
        if (CollectionUtil.isEmpty(list)) {
            return;
        }
        list.forEach(it -> it.setDevelopTaskId(developTaskId));
        vectors.addAll(list);
    }

    private void pushWithLock(final DevelopStyleTask task) {
        lock(LOCK_KEY + "push" + task.getTaskId(), 90L, () -> {
            if (task.banPush()) {
                log.error("开款任务【{}】-不允许推送", task.getTaskId());
                return;
            }
            // 推送
            this.pushCategoryRec(task);
            this.pushMulfeatExtract(task);
            this.pushPatternCheck(task);
            this.pushFabricIdentify(task);
            this.pushClipLabel(task);
            this.pushAnalysis(task);
            this.developStyleTaskRepository.updateByIdManualFill(task);
        });
    }

    private void pushCategoryRec(final DevelopStyleTask task) {
        if (!task.notPushCategoryRec() || task.hasCategoryRec()) {
            return;
        }
        final var recs = this.categoryRecTaskRepository.listByBusId(task.getTaskId(), SOURCE);
        if (CollectionUtil.isEmpty(recs)) {
            log.info("开款任务【{}】-没有生成对应的品类识别,不能推送品类识别", task.getTaskId());
            return;
        }
        recs.stream().filter(it -> Objects.equals(Bool.NO.getCode(), it.getPushStatus()))
                .forEach(it ->
                        tryFinally(() -> {
                                    task.setRecs(List.of(it));
                                    CategoryRecApi.create(DevelopStyleTaskConvert.buildCategoryRecReq(task));
                                    it.setPushStatus(Bool.YES.getCode());
                                    it.setPushTime(LocalDateTime.now());
                                },
                                e -> {
                                    task.setAiTaskStatus(TaskStatusEnum.FAILED.getCode());
                                    task.setFailMessage("品类识别推送失败" + e.getLocalizedMessage());
                                    task.addFailModel(MODEL_CATEGORY_REC);
                                    log.error("开款任务【{}】-品类识别推送失败\t{}", task.getTaskId(), e.getLocalizedMessage(), e);
                                },
                                () -> this.categoryRecTaskRepository.updateByIdManualFill(it)));
        if (recs.stream().allMatch(f -> Objects.equals(Bool.YES.getCode(), f.getPushStatus())) &&
                task.notPushCategoryRec()) {
            task.setPushStatus(task.requirePushStatus() + DevelopStyleTask.CATEGORY_REC);
        }
    }


    private void pushMulfeatExtract(final DevelopStyleTask task) {
        if (!task.notPushImageVector() || task.hasImageVector()) {
            return;
        }
        final var mulfeats = this.mulfeatExtractTaskRepository.listByBusId(task.getTaskId(), SOURCE);
        if (CollectionUtil.isEmpty(mulfeats)) {
            log.info("开款任务【{}】-没有生成对应的图片特征提取任务,不能推送图片特征提取", task.getTaskId());
            return;
        }
        mulfeats.stream().filter(it -> Objects.equals(Bool.NO.getCode(), it.getPushStatus()))
                .forEach(it ->
                        tryFinally(() -> {
                                    task.setMulfeatExtracts(List.of(it));
                                    MulfeatExtractApi.create(DevelopStyleTaskConvert.buildMulfeatExtractReq(task));
                                    it.setPushStatus(Bool.YES.getCode());
                                    it.setPushTime(LocalDateTime.now());
                                },
                                e -> {
                                    task.setAiTaskStatus(TaskStatusEnum.FAILED.getCode());
                                    task.setFailMessage("图片特征提取推送失败" + e.getLocalizedMessage());
                                    task.addFailModel(MODEL_MULFEAT_EXTRACT);
                                    log.error("开款任务【{}】-图片特征提取推送失败\t{}", task.getTaskId(), e.getLocalizedMessage(), e);
                                },
                                () -> this.mulfeatExtractTaskRepository.updateByIdManualFill(it)));
        if (mulfeats.stream().allMatch(f -> Objects.equals(Bool.YES.getCode(), f.getPushStatus())) &&
                task.notPushImageVector()) {
            task.setPushStatus(task.requirePushStatus() + DevelopStyleTask.MULFEAT_EXTRACT);
        }
    }


    private void pushFabricIdentify(final DevelopStyleTask task) {
        if (!task.pass() || !task.notPushFabricIdentify() || task.hasFabricIdentify()) {
            return;
        }
        final var captions = this.pictureCaptionTaskRepository.listByBusId(task.getTaskId(), SOURCE);
        if (CollectionUtil.isEmpty(captions)) {
            log.info("开款任务【{}】-没有生成对应的面料识别,不能推送面料识别", task.getTaskId());
            return;
        }
        if (task.canQueueing() && !task.queueing()) {
            task.setAiTaskStatus(TaskStatusEnum.QUEUEING.getCode());
        }
        captions.stream().filter(it -> Objects.equals(Bool.NO.getCode(), it.getPushStatus()))
                .forEach(it ->
                        tryFinally(() -> {
                                    task.setCaptions(List.of(it));
                                    PictureCaptionApi.create(DevelopStyleTaskConvert.buildFabricIdentifyReq(task));
                                    it.setPushStatus(Bool.YES.getCode());
                                    it.setPushTime(LocalDateTime.now());
                                },
                                e -> {
                                    task.setAiTaskStatus(TaskStatusEnum.FAILED.getCode());
                                    task.setFailMessage("面料识别推送失败" + e.getLocalizedMessage());
                                    task.addFailModel(MODEL_FABRIC_IDENTIFY);
                                    log.error("开款任务【{}】-面料识别推送失败\t{}", task.getTaskId(), e.getLocalizedMessage(), e);
                                }, () -> this.pictureCaptionTaskRepository.updateByIdManualFill(it)));
        if (captions.stream().allMatch(f -> Objects.equals(Bool.YES.getCode(), f.getPushStatus())) &&
                task.notPushFabricIdentify()) {
            task.setPushStatus(task.requirePushStatus() + DevelopStyleTask.FABRIC_IDENTIFY);
        }
    }

    private void pushPatternCheck(final DevelopStyleTask task) {
        if (!task.pass() || !task.notPushPatternCheck() || task.hasPatternLabel()) {
            return;
        }
        final var checks = this.patternCheckTaskRepository.listByBusId(task.getTaskId(), SOURCE);
        if (CollectionUtil.isEmpty(checks)) {
            log.info("开款任务【{}】-没有生成对应的款式分类,不能推送款式分类", task.getTaskId());
            return;
        }
        if (task.canQueueing() && !task.queueing()) {
            task.setAiTaskStatus(TaskStatusEnum.QUEUEING.getCode());
        }
        checks.stream().filter(it -> Objects.equals(Bool.NO.getCode(), it.getPushStatus()))
                .forEach(it ->
                        tryFinally(() -> {
                                    task.setPatternChecks(List.of(it));
                                    PatternCheckApi.create(DevelopStyleTaskConvert.buildPatternCheckReq(task));
                                    it.setPushStatus(Bool.YES.getCode());
                                    it.setPushTime(LocalDateTime.now());
                                },
                                e -> {
                                    task.setAiTaskStatus(TaskStatusEnum.FAILED.getCode());
                                    task.setFailMessage("款式分类推送失败" + e.getLocalizedMessage());
                                    task.addFailModel(MODEL_PATTERN_CHECK);
                                    log.error("开款任务【{}】-款式分类推送失败\t{}", task.getTaskId(), e.getLocalizedMessage(), e);
                                },
                                () -> this.patternCheckTaskRepository.updateByIdManualFill(it)));
        if (checks.stream().allMatch(f -> Objects.equals(Bool.YES.getCode(), f.getPushStatus())) &&
                task.notPushPatternCheck()) {
            task.setPushStatus(task.requirePushStatus() + DevelopStyleTask.PATTERN_CHECK);
        }
    }

    private void pushAnalysis(final DevelopStyleTask task) {
        if (!task.pass() || !task.notPushAnalysis() || task.hasAnalysis()) {
            return;
        }
        final var analysis = this.fashionAnalysisTaskRepository.listByBusId(task.getTaskId(), SOURCE);
        if (CollectionUtil.isEmpty(analysis)) {
            log.info("开款任务【{}】-没有生成对应的fashion分析,不能推送fashion分析", task.getTaskId());
            return;
        }
        if (task.canQueueing() && !task.queueing()) {
            task.setAiTaskStatus(TaskStatusEnum.QUEUEING.getCode());
        }
        analysis.stream().filter(it -> Objects.equals(Bool.NO.getCode(), it.getPushStatus()))
                .forEach(it ->
                        tryFinally(() -> {
                                    task.setAnalysis(List.of(it));
                                    FashionAnalysisApi.create(DevelopStyleTaskConvert.buildAnalysisReq(task));
                                    it.setPushStatus(Bool.YES.getCode());
                                    it.setPushTime(LocalDateTime.now());
                                },
                                e -> {
                                    task.setAiTaskStatus(TaskStatusEnum.FAILED.getCode());
                                    task.setFailMessage("fashion分析推送失败" + e.getLocalizedMessage());
                                    task.addFailModel(MODEL_FASHION_ANALYSIS);
                                    log.error("开款任务【{}】-fashion分析推送失败\t{}", task.getTaskId(), e.getLocalizedMessage(), e);
                                }, () -> this.fashionAnalysisTaskRepository.updateByIdManualFill(it)));
        if (analysis.stream().allMatch(f -> Objects.equals(Bool.YES.getCode(), f.getPushStatus())) &&
                task.notPushAnalysis()) {
            task.setPushStatus(task.requirePushStatus() + DevelopStyleTask.FASHION_ANALYSIS);
        }
    }

    private void pushClipLabel(final DevelopStyleTask task) {
        if (!task.pass() || !task.notPushClipLabel() || task.hasPredLabel()) {
            return;
        }
        final var clips = this.clipLabelTaskRepository.listByBusId(task.getTaskId(), SOURCE);
        if (CollectionUtil.isEmpty(clips)) {
            log.info("开款任务【{}】-没有生成对应的提取标签,不能推送提取标签", task.getTaskId());
            return;
        }
        if (task.canQueueing() && !task.queueing()) {
            task.setAiTaskStatus(TaskStatusEnum.QUEUEING.getCode());
        }
        clips.stream().filter(it -> Objects.equals(Bool.NO.getCode(), it.getPushStatus()))
                .forEach(it ->
                        tryFinally(() -> {
                                    task.setLabels(List.of(it));
                                    ClipLabelApi.create(DevelopStyleTaskConvert.buildClipLabelReq(task));
                                    it.setPushStatus(Bool.YES.getCode());
                                    it.setPushTime(LocalDateTime.now());
                                },
                                e -> {
                                    task.setAiTaskStatus(TaskStatusEnum.FAILED.getCode());
                                    task.setFailMessage("提取标签推送失败" + e.getLocalizedMessage());
                                    task.addFailModel(MODEL_CLIP_LABEL);
                                    log.error("开款任务【{}】-提取标签推送失败\t{}", task.getTaskId(), e.getLocalizedMessage(), e);
                                }, () -> this.clipLabelTaskRepository.updateByIdManualFill(it)));
        if (clips.stream().allMatch(f -> Objects.equals(Bool.YES.getCode(), f.getPushStatus())) &&
                task.notPushClipLabel()) {
            task.setPushStatus(task.requirePushStatus() + DevelopStyleTask.CLIP_VIT_L_14);
        }
    }

    private void callbackFabricIdentify(final PictureCaptionTask task) {
        if (task.end()) {
            return;
        }
        callbackFabricIdentify(task, PictureCaptionApi.getByBusId(task.getTaskId()));
    }

    private void callbackFabricIdentify(final PictureCaptionTask caption, final PictureCaptionTaskVo vo) {
        final var task = this.developStyleTaskRepository.getByTaskCode(caption.getTaskCode());
        if (Objects.isNull(task)) {
            return;
        }
        if (task.hasFabricIdentify()) {
            return;
        }
        callbackFabricIdentify(caption, vo, task);
    }

    private void callbackFabricIdentify(final PictureCaptionTask caption, final PictureCaptionTaskVo vo,
                                        final DevelopStyleTask task) {
        lock(LOCK_KEY + "pattern:fabric:identify" + task.getTaskId(), 90L, () -> {
            if (TaskStatusViewEnum.failed(vo.getTaskStatus())) {
                caption.setTaskStatus(TaskStatusEnum.FAILED.getCode());
                caption.setMessage(vo.getMessage());
                task.setAiTaskStatus(TaskStatusEnum.FAILED.getCode());
                task.setFailMessage("面料识别失败," + vo.getMessage());
                task.addFailModel(MODEL_FABRIC_IDENTIFY);
                transaction(() -> {
                    this.pictureCaptionTaskRepository.updateByIdManualFill(caption);
                    this.developStyleTaskRepository.updateFail(task);
                });
                return;
            }
            if (task.canGenerating()) {
                task.setAiTaskStatus(TaskStatusEnum.GENERATING.getCode());
            }
            caption.setTaskStatus(vo.getTaskStatus());
            if (TaskStatusViewEnum.completed(vo.getTaskStatus())) {
                if (!task.hasFabricIdentify()) {
                    task.setTaskState(task.requireTaskState() + DevelopStyleTask.FABRIC_IDENTIFY);
                }
                if (task.canCompleted()) {
                    task.setAiTaskStatus(TaskStatusEnum.COMPLETED.getCode());
                }
                caption.setAiStartTime(vo.getAiStartTime());
                caption.setAiEndTime(vo.getAiEndTime());
                final var text = vo.getCaption();
                task.setFabricIdentify(text);
                caption.setCaption(text);
                if (StrUtil.isBlank(text)) {
                    caption.setTaskStatus(TaskStatusEnum.FAILED.getCode());
                    caption.setMessage("图片描述为空");
//                    task.setAiTaskStatus(TaskStatusEnum.FAILED.getCode());
//                    task.setFailMessage("面料识别为空");
//                    task.addFailModel(MODEL_FABRIC_IDENTIFY);
                } else {
                    setFabricIdentify(task, text);
                }
            }
            transaction(() -> {
                this.pictureCaptionTaskRepository.updateByIdManualFill(caption);
                this.developStyleTaskRepository.updateFabricIdentify(task);
            });
        });
    }

    private void setFabricIdentify(final DevelopStyleTask task, final String text) {
        final var dto = JsonsKt.parseJson(text, FabricIdentifyDTO.class);
        task.setTransparency(dto.getTransparency());
        task.setFabricMaterial(dto.getFabricMaterial());
        task.setFabricTexture(dto.getFabricTexture());
        final var apsCategoryType = this.apsCategoryType();
        final var plmElastic = this.plmElastic();
        if (Objects.nonNull(apsCategoryType)) {
            final List<DictVo> children = Objects.requireNonNullElse(apsCategoryType.getChildren(), Collections.emptyList());
            getDictByAttribute(children, dto.getWeavingMethod()).ifPresentOrElse(it -> {
                task.setWeaveModeCode(it.getDictCode());
                task.setWeaveModeName(it.getDictName());
            }, () -> log.error("织造方式\t{}\t没有对应的字典", dto.getWeavingMethod()));
        }
        if (Objects.nonNull(plmElastic)) {
            final List<DictVo> children = Objects.requireNonNullElse(plmElastic.getChildren(), Collections.emptyList());
            getDictByAttribute(children, dto.getFabricElasticity()).ifPresentOrElse(it -> {
                task.setElasticCode(it.getDictCode());
                task.setElasticName(it.getDictName());
            }, () -> log.error("弹性\t{}\t没有对应的字典", dto.getFabricElasticity()));
        }

    }

    private Optional<DictVo> getDictByAttribute(final List<DictVo> children, final String name) {
        return children
                .stream()
//                .filter(it -> Objects.nonNull(it.getChildren()) && CollectionUtil.isNotEmpty(it.getChildren()))
//                .flatMap(it -> it.getChildren().stream())
                .filter(it -> Objects.nonNull(it.getAttributes()) && CollectionUtil.isNotEmpty(it.getAttributes()))
                .filter(it ->
                        it.getAttributes().stream()
                                .anyMatch(a ->
                                        StrUtil.contains(a.getName(), name) && StrUtil.contains(a.getCode(), "model")))
                .findFirst();
    }

    private void callbackAnalysis(final FashionAnalysisTask task) {
        if (task.end()) {
            return;
        }
        callbackAnalysis(task, FashionAnalysisApi.getByBusId(task.getTaskId()));
    }

    private void callbackAnalysis(final FashionAnalysisTask analysis, final FashionAnalysisTaskVo vo) {
        final var task = this.developStyleTaskRepository.getByTaskCode(analysis.getTaskCode());
        if (Objects.isNull(task)) {
            return;
        }
        if (task.hasAnalysis()) {
            return;
        }
        callbackAnalysis(analysis, vo, task);
    }

    private void callbackAnalysis(final FashionAnalysisTask analysis, final FashionAnalysisTaskVo vo,
                                  final DevelopStyleTask task) {
        lock(LOCK_KEY + "fashion:analysis:callback" + task.getTaskId(), 90L, () -> {
            if (TaskStatusViewEnum.failed(vo.getTaskStatus())) {
                analysis.setTaskStatus(TaskStatusEnum.FAILED.getCode());
                analysis.setMessage(vo.getMessage());
                task.setAiTaskStatus(TaskStatusEnum.FAILED.getCode());
                task.setFailMessage("fashion分析失败," + vo.getMessage());
                task.addFailModel(MODEL_FASHION_ANALYSIS);
                transaction(() -> {
                    this.fashionAnalysisTaskRepository.updateByIdManualFill(analysis);
                    this.developStyleTaskRepository.updateFail(task);
                });
                return;
            }
            if (task.canGenerating()) {
                task.setAiTaskStatus(TaskStatusEnum.GENERATING.getCode());
            }
            analysis.setTaskStatus(vo.getTaskStatus());
            if (TaskStatusViewEnum.completed(vo.getTaskStatus())) {
                if (!task.hasAnalysis()) {
                    task.setTaskState(task.requireTaskState() + DevelopStyleTask.FASHION_ANALYSIS);
                }
                analysis.setAiStartTime(vo.getAiStartTime());
                analysis.setAiEndTime(vo.getAiEndTime());
                final var titleData = vo.getTitleData();
                final var colorData = vo.getColorData();
                final var patternData = vo.getPatternData();
                analysis.setTitleStyle(vo.getTitleStyle());
                analysis.setTitleSeason(vo.getTitleSeason());
                analysis.setPatternResult(vo.getPatternResult());
                analysis.setColorResult(vo.getColorResult());
                analysis.setTitleData(titleData);
                analysis.setColorData(colorData);
                analysis.setPatternData(patternData);
                task.setTitleData(titleData);
                task.setColorData(colorData);
                task.setPatternData(patternData);
                if (task.canCompleted()) {
                    task.setAiTaskStatus(TaskStatusEnum.COMPLETED.getCode());
                }
                if (StrUtil.isBlank(titleData) && StrUtil.isBlank(colorData) && StrUtil.isBlank(patternData)) {
                    analysis.setTaskStatus(TaskStatusEnum.FAILED.getCode());
                    analysis.setMessage("fashion分析为空");
//                    task.setAiTaskStatus(TaskStatusEnum.FAILED.getCode());
//                    task.setFailMessage("fashion分析为空");
//                    task.addFailModel(MODEL_PATTERN_CHECK);
                } else {
                    setAnalysis(task, analysis);
                }
            }
            transaction(() -> {
                this.fashionAnalysisTaskRepository.updateByIdManualFill(analysis);
                this.developStyleTaskRepository.updateAnalysis(task);
            });
        });
    }

    private void setAnalysis(final DevelopStyleTask task, final FashionAnalysisTask analysis) {
//        final var style = analysis.getTitleStyle();
        final var season = analysis.getTitleSeason();
        final var color = analysis.getColorResult();
        final var clothingColor = this.clothingColor();
//        final var productStyle = this.productStyle();
        final var plmReferenceSeason = this.plmReferenceSeason();
//        if (Objects.nonNull(productStyle)) {
//            final List<DictVo> children = Objects.requireNonNullElse(productStyle.getChildren(), Collections.emptyList());
//            getDictByAttribute(children, style).ifPresentOrElse(it -> {
//                task.setClothingStyleCode(it.getDictCode());
//                task.setClothingStyleName(it.getDictName());
//            }, () -> log.error("风格\t{}\t没有对应的字典", style));
//        }
        if (Objects.nonNull(plmReferenceSeason)) {
            final List<DictVo> children = Objects.requireNonNullElse(plmReferenceSeason.getChildren(), Collections.emptyList());
            final var name = StrUtil.contains(season, "]") ? StrUtil.split(season, "]").getLast() : season;
            getDictByAttribute(children, name).ifPresentOrElse(it -> {
                task.setSeasonCode(it.getDictCode());
                task.setSeasonName(it.getDictName());
            }, () -> log.error("季节\t{}\t没有对应的字典", season));
        }
        if (Objects.nonNull(clothingColor)) {
            final var colorArr = new ArrayList<String>();
            final var colorCodeArr = new ArrayList<String>();
            final var colors = StrUtil.split(color, StrUtil.COMMA);
            final List<DictVo> children = Objects.requireNonNullElse(clothingColor.getChildren(), Collections.emptyList());
            children
                    .stream()
                    .filter(it -> Objects.nonNull(it.getChildren()) && CollectionUtil.isNotEmpty(it.getChildren()))
                    .forEach(it -> {
                        final var name = it.getDictName();
                        colors.forEach(c -> {
                            final var cols = StrUtil.split(c, " - ");
                            if (StrUtil.equalsIgnoreCase(name, cols.getFirst())) {
                                it.getChildren().forEach(child -> {
                                    if (StrUtil.equalsIgnoreCase(child.getDictName(), cols.getLast())) {
                                        colorArr.add(child.getDictName());
                                        colorCodeArr.add(child.getDictCode());
                                    }
                                });
                            }
                        });
                    });
            if (CollectionUtil.isNotEmpty(colorArr) && CollectionUtil.isNotEmpty(colorCodeArr)) {
                task.setColor(StrUtil.join(StrUtil.COMMA, colorArr));
                task.setColorCode(StrUtil.join(StrUtil.COMMA, colorCodeArr));
            }
        }
    }

    private void callbackPatternCheck(final PatternCheckTask task) {
        if (task.end()) {
            return;
        }
        callbackPatternCheck(task, PatternCheckApi.getByBusId(task.getTaskId()));
    }

    private void callbackPatternCheck(final PatternCheckTask check, final PatternCheckTaskVo vo) {
        final var task = this.developStyleTaskRepository.getByTaskCode(check.getTaskCode());
        if (Objects.isNull(task)) {
            return;
        }
        if (task.hasPatternLabel()) {
            return;
        }
        callbackPatternCheck(check, vo, task);
    }

    private void callbackPatternCheck(final PatternCheckTask check, final PatternCheckTaskVo vo,
                                      final DevelopStyleTask task) {
        lock(LOCK_KEY + "pattern:check:callback" + task.getTaskId(), 90L, () -> {
            if (TaskStatusViewEnum.failed(vo.getTaskStatus())) {
                check.setTaskStatus(TaskStatusEnum.FAILED.getCode());
                check.setMessage(vo.getMessage());
                task.setAiTaskStatus(TaskStatusEnum.FAILED.getCode());
                task.setFailMessage("款式分类失败," + vo.getMessage());
                task.addFailModel(MODEL_PATTERN_CHECK);
                transaction(() -> {
                    this.patternCheckTaskRepository.updateByIdManualFill(check);
                    this.developStyleTaskRepository.updateFail(task);
                });
                return;
            }
            if (task.canGenerating()) {
                task.setAiTaskStatus(TaskStatusEnum.GENERATING.getCode());
            }
            check.setTaskStatus(vo.getTaskStatus());
            if (TaskStatusViewEnum.completed(vo.getTaskStatus())) {
                if (!task.hasPatternLabel()) {
                    task.setTaskState(task.requireTaskState() + DevelopStyleTask.PATTERN_CHECK);
                }
                if (task.canCompleted()) {
                    task.setAiTaskStatus(TaskStatusEnum.COMPLETED.getCode());
                }
                check.setAiStartTime(vo.getAiStartTime());
                check.setAiEndTime(vo.getAiEndTime());
                final var labels = vo.getLabel();
                check.setLabel(labels);
                task.setPatternLabel(labels);
                if (StrUtil.isBlank(labels)) {
                    check.setTaskStatus(TaskStatusEnum.FAILED.getCode());
                    check.setMessage("款式分类标签为空");
//                    task.setAiTaskStatus(TaskStatusEnum.FAILED.getCode());
//                    task.setFailMessage("款式分类标签为空");
//                    task.addFailModel(MODEL_PATTERN_CHECK);
                } else {
                    setPrinting(task, labels);
                }
            }
            transaction(() -> {
                this.patternCheckTaskRepository.updateByIdManualFill(check);
                this.developStyleTaskRepository.updatePatternCheck(task);
            });
        });
    }

    private void setPrinting(final DevelopStyleTask task, final String labels) {
        final var label = StrUtil.split(labels, StrUtil.COMMA).getFirst();
        final var dict = this.fdPrinting();
        if (Objects.isNull(dict)) {
            log.error("建议印花字典为空");
            return;
        }
        final List<DictVo> children = Objects.requireNonNullElse(dict.getChildren(), Collections.emptyList());
        children
                .stream()
//                .filter(it -> Objects.nonNull(it.getChildren()) && CollectionUtil.isNotEmpty(it.getChildren()))
//                .flatMap(it -> it.getChildren().stream())
                .filter(it -> Objects.nonNull(it.getAttributes()) && CollectionUtil.isNotEmpty(it.getAttributes()))
                .filter(it ->
                        it.getAttributes().stream()
                                .anyMatch(a ->
                                        StrUtil.equals(label, a.getName()) && StrUtil.contains(a.getCode(), "model")))
                .findFirst().ifPresentOrElse(it -> {
                    task.setPrintingCode(it.getDictCode());
                    task.setPrintingName(it.getDictName());
                }, () -> log.error("印花\t{}\t没有对应的字典", label));

    }

    private void callback(final CategoryRecTask task) {
        if (task.end()) {
            return;
        }
        callback(task, CategoryRecApi.getByBusId(task.getTaskId()));
    }

    private void callbackMulfeatExtract(final MulfeatExtractTask task) {
        if (task.end()) {
            return;
        }
        callbackMulfeatExtract(task, MulfeatExtractApi.getByBusId(task.getTaskId()));
    }

    private void callbackMulfeatExtract(final MulfeatExtractTask extract, final MulfeatExtractTaskVo vo) {
        final var task = this.developStyleTaskRepository.getByTaskCode(extract.getTaskCode());
        if (Objects.isNull(task)) {
            return;
        }
        if (task.hasImageVector()) {
            return;
        }
        callbackMulfeatExtract(extract, vo, task);
    }

    private void callback(final CategoryRecTask rec, final CategoryRecTaskVo vo) {
        final var task = this.developStyleTaskRepository.getByTaskCode(rec.getTaskCode());
        if (Objects.isNull(task)) {
            return;
        }
        if (task.hasCategoryRec()) {
            return;
        }
        callback(rec, vo, task);
    }

    private void callbackMulfeatExtract(final MulfeatExtractTask extract, final MulfeatExtractTaskVo vo, final DevelopStyleTask task) {
        lock(LOCK_KEY + "mulfeat:extract:callback" + task.getTaskId(), 90L, () -> {
            if (TaskStatusViewEnum.failed(vo.getTaskStatus())) {
                extract.setTaskStatus(TaskStatusEnum.FAILED.getCode());
                extract.setMessage(vo.getMessage());
                task.setAiTaskStatus(TaskStatusEnum.FAILED.getCode());
                task.setFailMessage("图片特征提取失败," + vo.getMessage());
                task.addFailModel(MODEL_MULFEAT_EXTRACT);
                transaction(() -> {
                    this.mulfeatExtractTaskRepository.updateByIdManualFill(extract);
                    this.developStyleTaskRepository.updateFail(task);
                });
                return;
            }
            // 不是失败改成生成中
            if (!task.failedOrCanceled()) {
                task.setAiTaskStatus(TaskStatusEnum.GENERATING.getCode());
            }
            extract.setTaskStatus(vo.getTaskStatus());
            if (TaskStatusViewEnum.completed(vo.getTaskStatus())) {
                if (!task.hasImageVector()) {
                    task.setTaskState(task.requireTaskState() + DevelopStyleTask.MULFEAT_EXTRACT);
                }
                // 已经有品类识别
                if (task.hasCategoryRec()) {
                    task.setAiTaskStatus(TaskStatusEnum.COMPLETED.getCode());
                }
                extract.setAiStartTime(vo.getAiStartTime());
                extract.setAiEndTime(vo.getAiEndTime());
                extract.setDownFeat(vo.getDownFeat());
                extract.setUpFeat(vo.getUpFeat());
                extract.setFullFeat(vo.getFullFeat());
                extract.setWholeFeat(vo.getWholeFeat());
                task.setMulfeatExtracts(List.of(extract));
                transaction(() -> {
                    this.setVector(task);
                    this.mulfeatExtractTaskRepository.updateByIdManualFill(extract);
                    this.developStyleTaskRepository.updateVector(task);
                });
            }
        });
    }

    private void callback(final CategoryRecTask rec, final CategoryRecTaskVo vo, final DevelopStyleTask task) {
        lock(LOCK_KEY + "category:rec:callback" + task.getTaskId(), 90L, () -> {
            if (TaskStatusViewEnum.failed(vo.getTaskStatus())) {
                rec.setTaskStatus(TaskStatusEnum.FAILED.getCode());
                rec.setMessage(vo.getMessage());
                task.setAiTaskStatus(TaskStatusEnum.FAILED.getCode());
                task.setFailMessage("品类识别失败," + vo.getMessage());
                task.addFailModel(MODEL_CATEGORY_REC);
                transaction(() -> {
                    this.categoryRecTaskRepository.updateByIdManualFill(rec);
                    this.developStyleTaskRepository.updateFail(task);
                });
                return;
            }
            // 不是失败改成生成中
            if (!task.failedOrCanceled()) {
                task.setAiTaskStatus(TaskStatusEnum.GENERATING.getCode());
            }
            rec.setTaskStatus(vo.getTaskStatus());
            if (TaskStatusViewEnum.completed(vo.getTaskStatus())) {
                if (!task.hasCategoryRec()) {
                    task.setTaskState(task.requireTaskState() + DevelopStyleTask.CATEGORY_REC);
                }
                // 已经有向量数据库
                if (task.hasImageVector()) {
                    task.setAiTaskStatus(TaskStatusEnum.COMPLETED.getCode());
                }
                rec.setAiStartTime(vo.getAiStartTime());
                rec.setAiEndTime(vo.getAiEndTime());
                final var category = vo.getCategory();
                final var categorySize = vo.getCategorySize();
                rec.setCategory(category);
                rec.setCategorySize(categorySize);
                task.setCategoryRec(category);
                task.setCategorySize(categorySize);
                if (StrUtil.isBlank(category) || StrUtil.isBlank(categorySize)) {
                    rec.setTaskStatus(TaskStatusEnum.FAILED.getCode());
                    rec.setMessage("品类识别为空");
//                    task.setAiTaskStatus(TaskStatusEnum.FAILED.getCode());
//                    task.setFailMessage("品类识别为空");
//                    task.setFailModel(MODEL_CATEGORY_REC);
                } else {
                    categoryMapping(task, category, categorySize);
                }
                transaction(() -> {
                    this.categoryRecTaskRepository.updateByIdManualFill(rec);
                    this.developStyleTaskRepository.updateCategoryRec(task);
                });
            }
        });
    }

    private void categoryMapping(final DevelopStyleTask task, final String category, final String categorySize) {
        final var listMapping = AiCategoryMappingApi.listMapping();
        listMapping.stream()
                .filter(it -> StrUtil.contains(it.getAiCategoryName(), category))
                .filter(it -> {
                    if (StrUtil.equalsIgnoreCase(AiCategoryMappingTypeEnum.PLUS_SIZE.getVale(), categorySize)) {
                        return AiCategoryMappingTypeEnum.PLUS_SIZE == it.getType();
                    }
                    return AiCategoryMappingTypeEnum.STANDARD_SIZE == it.getType();
                }).findFirst().ifPresentOrElse(it -> {
                    task.setCategoryCode(it.getCategoryCode());
                    task.setCategoryName(it.getCategoryName());
                }, () -> log.error("AI品类映射为空\t{}", category));
    }

    private void callbackClip(final ClipLabelTask task) {
        if (task.end()) {
            return;
        }
        callbackClip(task, ClipLabelApi.getByBusId(task.getTaskId()));
    }

    private void callbackClip(final ClipLabelTask label, final ClipLabelTaskVo vo) {
        final var task = this.developStyleTaskRepository.getByTaskCode(label.getTaskCode());
        if (Objects.isNull(task)) {
            return;
        }
        if (task.hasPredLabel()) {
            return;
        }
        callbackClip(label, vo, task);

    }

    private void callbackClip(final ClipLabelTask label, final ClipLabelTaskVo vo,
                              final DevelopStyleTask task) {
        lock(LOCK_KEY + "clip:label:callback" + task.getTaskId(), 90L, () -> {
            if (TaskStatusViewEnum.failed(vo.getTaskStatus())) {
                label.setTaskStatus(TaskStatusEnum.FAILED.getCode());
                label.setMessage(vo.getMessage());
                task.setAiTaskStatus(TaskStatusEnum.FAILED.getCode());
                task.setFailMessage("提取标签失败," + vo.getMessage());
                task.addFailModel(MODEL_CLIP_LABEL);
                transaction(() -> {
                    this.clipLabelTaskRepository.updateByIdManualFill(label);
                    this.developStyleTaskRepository.updateFail(task);
                });
                return;
            }
            if (task.canGenerating()) {
                task.setAiTaskStatus(TaskStatusEnum.GENERATING.getCode());
            }
            label.setTaskStatus(vo.getTaskStatus());
            if (TaskStatusViewEnum.completed(vo.getTaskStatus())) {
                if (!task.hasPredLabel()) {
                    task.setTaskState(task.requireTaskState() + DevelopStyleTask.CLIP_VIT_L_14);
                }
                if (task.canCompleted()) {
                    task.setAiTaskStatus(TaskStatusEnum.COMPLETED.getCode());
                }
                label.setAiStartTime(vo.getAiStartTime());
                label.setAiEndTime(vo.getAiEndTime());
                final var predLabels = vo.getPredLabels();
                label.setPredLabels(predLabels);
                task.setPredLabels(predLabels);
                if (StrUtil.isBlank(predLabels)) {
                    label.setTaskStatus(TaskStatusEnum.FAILED.getCode());
                    label.setMessage("提取标签为空");
//                    task.setAiTaskStatus(TaskStatusEnum.FAILED.getCode());
//                    task.setFailMessage("提取标签为空");
//                    task.addFailModel(MODEL_CLIP_LABEL);
                }
                final var predLabelList = vo.getPredLabelList();
                if (Objects.nonNull(predLabelList) && CollectionUtil.isNotEmpty(predLabelList)) {
                    label.setUsableLabels(JsonsKt.toJson(predLabelList));
                    task.setUsableLabels(JsonsKt.toJson(predLabelList));
                    final var dict = BasicConvert.toMap(fit().getChildren(), DictVo::getDictName);
                    predLabelList.stream().map(PredLabelVo::getCn)
                            .filter(Objects::nonNull)
                            .filter(it -> StrUtil.equalsIgnoreCase("FM240402568", it.getCode()))
                            .filter(it -> CollectionUtil.isNotEmpty(it.getValues()))
                            .flatMap(it -> it.getValues().stream())
                            .filter(it -> dict.containsKey(it.getName()))
                            .findFirst().ifPresentOrElse(it -> {
                                task.setPatternCode(it.getCode());
                                task.setPatternName(it.getName());
                            }, () -> log.warn("标签版没有匹配\t{}", task.getTaskCode()));
                }
            }
            transaction(() -> {
                this.clipLabelTaskRepository.updateByIdManualFill(label);
                this.developStyleTaskRepository.updateClip(task);
            });
        });
    }

    private Long pickingAdd(final PickingStyleDevelopReq req) {
        final var e = DevelopStyleTaskConvert.convert(req);
        this.developStyleTaskRepository.save(e);
        this.styleSaveOrUpdated(List.of(e));
        this.created(List.of(e));
        return e.getTaskId();
    }

    private Long pickingEliminate(final DevelopStyleTask task) {
        if (!task.canEliminate()) {
            return task.getTaskId();
        }
        final var req = new DevelopStyleTaskCheckReq();
        req.setTaskId(task.getTaskId());
        req.setCheckResult(DevelopStyleCheckResultEnum.DISUSE);
        final var list = DevelopStyleTaskConvert.convert(List.of(req), List.of(task));
        this.developStyleTaskRepository.updateById(task);
        styleSaveOrUpdated(list);
        return task.getTaskId();
    }

    private void created(final List<DevelopStyleTask> list) {
        list.forEach(it -> this.send(it, RabbitConfigEnum.PUSH_DEVELOP_STYLE));
    }

    private void styleSaveOrUpdated(final List<DevelopStyleTask> list) {
        final var opts = new ArrayList<DevelopStyleOpt>();
        final var remarks = new ArrayList<DevelopStyleRemark>();
        final var pictures = new ArrayList<DevelopStylePicture>();
        final var spus = new ArrayList<DevelopStyleSpu>();
        final var labels = new ArrayList<ClipLabelTask>();
        final var captions = new ArrayList<PictureCaptionTask>();
        final var patternChecks = new ArrayList<PatternCheckTask>();
        final var recs = new ArrayList<CategoryRecTask>();
        final var mulfeatExtracts = new ArrayList<MulfeatExtractTask>();
        final var analysis = new ArrayList<FashionAnalysisTask>();
        final var boms = new ArrayList<DevelopStyleTaskBomOrder>();
        list.forEach(it -> {
            if (CollectionUtil.isNotEmpty(it.getOpts())) {
                opts.addAll(it.getOpts());
            }
            if (CollectionUtil.isNotEmpty(it.getPictures())) {
                pictures.addAll(it.getPictures());
            }
            if (CollectionUtil.isNotEmpty(it.getRemarks())) {
                remarks.addAll(it.getRemarks());
            }
            if (CollectionUtil.isNotEmpty(it.getSpus())) {
                spus.addAll(it.getSpus());
            }
            if (CollectionUtil.isNotEmpty(it.getLabels())) {
                labels.addAll(it.getLabels());
            }
            if (CollectionUtil.isNotEmpty(it.getCaptions())) {
                captions.addAll(it.getCaptions());
            }
            if (CollectionUtil.isNotEmpty(it.getPatternChecks())) {
                patternChecks.addAll(it.getPatternChecks());
            }
            if (CollectionUtil.isNotEmpty(it.getRecs())) {
                recs.addAll(it.getRecs());
            }
            if (CollectionUtil.isNotEmpty(it.getAnalysis())) {
                analysis.addAll(it.getAnalysis());
            }
            if (CollectionUtil.isNotEmpty(it.getMulfeatExtracts())) {
                mulfeatExtracts.addAll(it.getMulfeatExtracts());
            }
            if (CollectionUtil.isNotEmpty(it.getBomOrders())) {
                boms.addAll(it.getBomOrders());
            }
        });
        if (CollectionUtil.isNotEmpty(opts)) {
            this.developStyleOptRepository.saveBatch(opts, opts.size());
        }
        if (CollectionUtil.isNotEmpty(pictures)) {
            this.developStylePictureRepository.saveBatch(pictures, pictures.size());
        }
        if (CollectionUtil.isNotEmpty(remarks)) {
            this.developStyleRemarkRepository.saveBatch(remarks, remarks.size());
        }
        if (CollectionUtil.isNotEmpty(labels)) {
            this.clipLabelTaskRepository.saveBatch(labels, labels.size());
        }
        if (CollectionUtil.isNotEmpty(captions)) {
            this.pictureCaptionTaskRepository.saveBatch(captions, captions.size());
        }
        if (CollectionUtil.isNotEmpty(patternChecks)) {
            this.patternCheckTaskRepository.saveBatch(patternChecks, patternChecks.size());
        }
        if (CollectionUtil.isNotEmpty(recs)) {
            this.categoryRecTaskRepository.saveBatch(recs, recs.size());
        }
        if (CollectionUtil.isNotEmpty(analysis)) {
            this.fashionAnalysisTaskRepository.saveBatch(analysis, analysis.size());
        }
        if (CollectionUtil.isNotEmpty(mulfeatExtracts)) {
            this.mulfeatExtractTaskRepository.saveBatch(mulfeatExtracts, mulfeatExtracts.size());
        }
        if (CollectionUtil.isNotEmpty(boms)) {
            developStyleTaskBomOrderRepository.saveBatch(boms);
        }
        if (CollectionUtil.isNotEmpty(spus)) {
            this.developStyleSpuRepository.saveBatch(spus, spus.size());
            final var skcs = spus.stream().flatMap(it -> it.getSkcs().stream()).toList();
            if (CollectionUtil.isNotEmpty(skcs)) {
                this.developStyleSkcRepository.saveBatch(skcs, skcs.size());
            }
        }
    }

    private void validation() {
        designer();
    }

    private void deleted(final DevelopStyleTask task) {
        if (task.banCheck()) {
            throw new ValidationException("待审核状态才可以删除【" + task.getTaskCode() + "】");
        }
        DevelopStyleTaskConvert.delOpt(task);
        this.developStyleTaskRepository.logicDelete(task.getTaskId());
    }

    private void developed(final DevelopStyleTask task) {
        if (StrUtil.equalsIgnoreCase(DevelopStyleTypeEnum.SPOT_STYLE.getCode(), task.getStyleType())) {
            final var code = this.spotStyleTaskService.batchDevelop(task);
            task.setSpuCode(code);
            task.getSpus().forEach(it -> it.setTaskStatus(TaskStatusEnum.COMPLETED.getCode()));
        } else if (task.isPushDesignStyleType()) {
            final var code = this.designStyleService.batchDevelop(task);
            task.setSpuCode(code);
            task.getSpus().forEach(it -> it.setTaskStatus(TaskStatusEnum.COMPLETED.getCode()));
        }
    }

    private void rela(final DevelopStyleRelaAddReq req, final DevelopStyleTask task) {
        this.doAsUser(req, () -> {
            DevelopStyleTaskConvert.relaTask(req, task);
            developStyleTaskRepository.updateByIdManualFill(task);
            developStyleRelaTaskRepository.saveBatchManualFill(task.getRelas());
        });
    }

    private DictVo fdPrinting() {
        return dictClientExternal.listByDictCode(FD_PRINTING);
    }

    private DictVo apsCategoryType() {
        return dictClientExternal.listByDictCode(APS_CATEGORY_TYPE);
    }

    private DictVo plmElastic() {
        return dictClientExternal.listByDictCode(PLM_ELASTIC_REQUIREMENT);
    }

    private DictVo clothingColor() {
        return dictClientExternal.listByDictCode(CLOTHING_COLOR);
    }

    private DictVo fit() {
        return dictClientExternal.listByDictCode(FIT);
    }
//
//    private DictVo productStyle() {
//        return dictClientExternal.listByDictCode(PRODUCT_STYLE);
//    }

    private DictVo plmReferenceSeason() {
        return dictClientExternal.listByDictCode(PLM_REFERENCE_SEASON);
    }

    private void identify(final DevelopStyleTask task) {
        final var model = task.getFailModel();
        if (StrUtil.isBlank(model)) {
            log.info("没有需要重新识别的任务\t{}", task.getTaskCode());
            return;
        }
        new HashSet<>(StrUtil.split(model, StrUtil.COMMA))
                .forEach(it -> {
                    reCategoryRec(task, it);
                    rePatternCheck(task, it);
                    reFabricIdentify(task, it);
                    reClipLabel(task, it);
                    reAnalysis(task, it);
                });
        task.setFailModel("");
        task.setFailMessage("");
        BasicConvert.setRevised(task);
        task.setAiTaskStatus(TaskStatusEnum.QUEUEING.getCode());
        this.developStyleTaskRepository.updateIdentify(task);
    }

    private void reCategoryRec(final DevelopStyleTask task, final String model) {
        if (!StrUtil.equalsIgnoreCase(MODEL_CATEGORY_REC, model)) {
            return;
        }
        final var recs = this.categoryRecTaskRepository.listByBusIds(List.of(task.getTaskId()), SOURCE);
        // 先删除.再插入
        if (CollectionUtil.isNotEmpty(recs)) {
            recs.forEach(it -> categoryRecTaskRepository.logicDelete(it.getTaskId()));
        }
        if (task.hasCategoryRec()) {
            task.setTaskState(task.requireTaskState() - DevelopStyleTask.CATEGORY_REC);
        }
        if (!task.notPushCategoryRec()) {
            task.setPushStatus(task.requirePushStatus() - DevelopStyleTask.CATEGORY_REC);
        }
        categoryRecTaskRepository.save(DevelopStyleTaskConvert.setAITask(task, new CategoryRecTask()));
    }

    private void rePatternCheck(final DevelopStyleTask task, final String model) {
        if (!StrUtil.equalsIgnoreCase(MODEL_PATTERN_CHECK, model)) {
            return;
        }
        final var checks = this.patternCheckTaskRepository.listByBusIds(List.of(task.getTaskId()), SOURCE);
        // 先删除.再插入
        if (CollectionUtil.isNotEmpty(checks)) {
            checks.forEach(it -> patternCheckTaskRepository.logicDelete(it.getTaskId()));
        }
        if (task.hasPatternLabel()) {
            task.setTaskState(task.requireTaskState() - DevelopStyleTask.PATTERN_CHECK);
        }
        if (!task.notPushPatternCheck()) {
            task.setPushStatus(task.requirePushStatus() - DevelopStyleTask.PATTERN_CHECK);
        }
        patternCheckTaskRepository.save(DevelopStyleTaskConvert.setAITask(task, new PatternCheckTask()));
    }

    private void reFabricIdentify(final DevelopStyleTask task, final String model) {
        if (!StrUtil.equalsIgnoreCase(MODEL_FABRIC_IDENTIFY, model)) {
            return;
        }
        final var captions = this.pictureCaptionTaskRepository.listByBusIds(List.of(task.getTaskId()), SOURCE);
        // 先删除.再插入
        if (CollectionUtil.isNotEmpty(captions)) {
            captions.forEach(it -> clipLabelTaskRepository.logicDelete(it.getTaskId()));
        }
        final var e = DevelopStyleTaskConvert.setAITask(task, new PictureCaptionTask());
        e.setSource(SourceEnum.FABRIC_IDENTIFY.getCode());
        if (task.hasFabricIdentify()) {
            task.setTaskState(task.requireTaskState() - DevelopStyleTask.FABRIC_IDENTIFY);
        }
        if (!task.notPushFabricIdentify()) {
            task.setPushStatus(task.requirePushStatus() - DevelopStyleTask.FABRIC_IDENTIFY);
        }
        pictureCaptionTaskRepository.save(e);
    }

    private void reClipLabel(final DevelopStyleTask task, final String model) {
        if (!StrUtil.equalsIgnoreCase(MODEL_CLIP_LABEL, model)) {
            return;
        }
        final var clips = this.clipLabelTaskRepository.listByBusIds(List.of(task.getTaskId()), SOURCE);
        // 先删除.再插入
        if (CollectionUtil.isNotEmpty(clips)) {
            clips.forEach(it -> clipLabelTaskRepository.logicDelete(it.getTaskId()));
        }
        if (task.hasPredLabel()) {
            task.setTaskState(task.requireTaskState() - DevelopStyleTask.CLIP_VIT_L_14);
        }
        if (!task.notPushClipLabel()) {
            task.setPushStatus(task.requirePushStatus() - DevelopStyleTask.CLIP_VIT_L_14);
        }
        clipLabelTaskRepository.save(DevelopStyleTaskConvert.setAITask(task, new ClipLabelTask()));
    }

    private void reAnalysis(final DevelopStyleTask task, final String model) {
        if (!StrUtil.equalsIgnoreCase(MODEL_FASHION_ANALYSIS, model)) {
            return;
        }
        final var analysis = this.fashionAnalysisTaskRepository.listByBusIds(List.of(task.getTaskId()), SOURCE);
        // 先删除.再插入
        if (CollectionUtil.isNotEmpty(analysis)) {
            analysis.forEach(it -> fashionAnalysisTaskRepository.logicDelete(it.getTaskId()));
        }
        if (task.hasAnalysis()) {
            task.setTaskState(task.requireTaskState() - DevelopStyleTask.FASHION_ANALYSIS);
        }
        if (!task.notPushAnalysis()) {
            task.setPushStatus(task.requirePushStatus() - DevelopStyleTask.FASHION_ANALYSIS);
        }
        fashionAnalysisTaskRepository.save(DevelopStyleTaskConvert.setAITask(task, new FashionAnalysisTask()));
    }

    private Map<String, DevelopStyleTask> mapByCodes(final List<String> codes) {
        final var list = this.developStyleTaskRepository.listByCodes(codes);
        if (CollectionUtil.isNotEmpty(list)) {
            return list.stream().collect(Collectors.toMap(DevelopStyleTask::getTaskCode, Function.identity(),
                    (v0, v1) -> v0));
        }
        return Maps.newHashMap();
    }

    private void job(final DevelopStyleTask task, final CategoryRecTask rec) {
        if (Objects.isNull(task)) {
            return;
        }
        execOrElseNotEx(CategoryRecApi.getByBusIdOrNull(rec.getTaskId()),
                it -> this.callback(rec, it, task),
                () -> this.pushWithLock(task));
    }

    private void job(final DevelopStyleTask task, final MulfeatExtractTask feat) {
        if (Objects.isNull(task)) {
            return;
        }
        execOrElseNotEx(MulfeatExtractApi.getByBusIdOrNull(feat.getTaskId()),
                it -> this.callbackMulfeatExtract(feat, it, task),
                () -> this.pushWithLock(task));
    }

    private void job(final DevelopStyleTask task, final PictureCaptionTask caption) {
        if (Objects.isNull(task)) {
            return;
        }
        execOrElseNotEx(PictureCaptionApi.getByBusIdOrNull(caption.getTaskId()),
                it -> this.callbackFabricIdentify(caption, it, task),
                () -> this.pushWithLock(task));
    }

    private void job(final DevelopStyleTask task, final PatternCheckTask check) {
        if (Objects.isNull(task)) {
            return;
        }
        execOrElseNotEx(PatternCheckApi.getByBusIdOrNull(check.getTaskId()),
                it -> this.callbackPatternCheck(check, it, task),
                () -> this.pushWithLock(task));
    }

    private void job(final DevelopStyleTask task, final ClipLabelTask clip) {
        if (Objects.isNull(task)) {
            return;
        }
        execOrElseNotEx(ClipLabelApi.getByBusIdOrNull(clip.getTaskId()),
                it -> this.callbackClip(clip, it, task),
                () -> this.pushWithLock(task));
    }

    private void job(final DevelopStyleTask task, final FashionAnalysisTask analysis) {
        if (Objects.isNull(task)) {
            return;
        }
        execOrElseNotEx(FashionAnalysisApi.getByBusIdOrNull(analysis.getTaskId()),
                it -> this.callbackAnalysis(analysis, it, task),
                () -> this.pushWithLock(task));
    }

    private void job(final DevelopStyleTask task) {
        if (StrUtil.isNotBlank(task.getFailModel()) && !task.failed()) {
            task.setAiTaskStatus(TaskStatusEnum.FAILED.getCode());
            this.developStyleTaskRepository.updateByIdManualFill(task);
            return;
        }
        if (done(task)) {
            return;
        }
        if (!task.hasCategoryRec()) {
            final var recs = this.categoryRecTaskRepository.listByBusId(task.getTaskId(), SOURCE);
            if (CollectionUtil.isNotEmpty(recs) && recs.stream().anyMatch(CategoryRecTask::end)) {
                recs.stream().filter(CategoryRecTask::completed).findFirst().ifPresent(it -> {
                    task.setCategoryRec(it.getCategory());
                    task.setCategorySize(it.getCategorySize());
                    categoryMapping(task, it.getCategory(), it.getCategorySize());
                    if (!task.hasCategoryRec()) {
                        task.setTaskState(task.requireTaskState() + DevelopStyleTask.CATEGORY_REC);
                    }
                });
            }
        }
        if (!task.hasImageVector()) {
            final var mulfeats = this.mulfeatExtractTaskRepository.listByBusId(task.getTaskId(), SOURCE);
            if (CollectionUtil.isNotEmpty(mulfeats) && mulfeats.stream().anyMatch(MulfeatExtractTask::end)) {
                mulfeats.stream().filter(MulfeatExtractTask::completed).findFirst().ifPresent(it -> {
                    if (!task.hasImageVector()) {
                        task.setMulfeatExtracts(List.of(it));
                        task.setTaskState(task.requireTaskState() + DevelopStyleTask.MULFEAT_EXTRACT);
                        setVector(task);
                    }
                });
            }
        }
        if (!task.hasAnalysis()) {
            final var analysis = this.fashionAnalysisTaskRepository.listByBusId(task.getTaskId(), SOURCE);
            if (CollectionUtil.isNotEmpty(analysis) && analysis.stream().anyMatch(FashionAnalysisTask::end)) {
                analysis.stream().filter(FashionAnalysisTask::completed).findFirst().ifPresent(it -> {
                    task.setTitleData(it.getTitleData());
                    task.setColorData(it.getColorData());
                    task.setPatternData(it.getPatternData());
                    setAnalysis(task, it);
                    if (!task.hasAnalysis()) {
                        task.setTaskState(task.requireTaskState() + DevelopStyleTask.FASHION_ANALYSIS);
                    }
                });
            }
        }
        if (!task.hasPatternLabel()) {
            final var checks = this.patternCheckTaskRepository.listByBusId(task.getTaskId(), SOURCE);
            if (CollectionUtil.isNotEmpty(checks) && checks.stream().anyMatch(PatternCheckTask::end)) {
                checks.stream().filter(PatternCheckTask::completed).findFirst().ifPresent(it -> {
                    task.setPatternLabel(it.getLabel());
                    setPrinting(task, it.getLabel());
                    if (!task.hasPatternLabel()) {
                        task.setTaskState(task.requireTaskState() + DevelopStyleTask.PATTERN_CHECK);
                    }
                });
            }
        }
        if (!task.hasPredLabel()) {
            final var clips = this.clipLabelTaskRepository.listByBusId(task.getTaskId(), SOURCE);
            if (CollectionUtil.isNotEmpty(clips) && clips.stream().anyMatch(ClipLabelTask::end)) {
                clips.stream().filter(ClipLabelTask::completed).findFirst().ifPresent(it -> {
                    task.setPredLabels(it.getPredLabels());
                    task.setUsableLabels(it.getUsableLabels());
                    if (!task.hasPredLabel()) {
                        task.setTaskState(task.requireTaskState() + DevelopStyleTask.CLIP_VIT_L_14);
                    }
                });
            }
        }
        if (!task.hasFabricIdentify()) {
            final var captions = this.pictureCaptionTaskRepository.listByBusId(task.getTaskId(), SOURCE);
            if (CollectionUtil.isNotEmpty(captions) && captions.stream().anyMatch(PictureCaptionTask::end)) {
                captions.stream().filter(PictureCaptionTask::completed).findFirst().ifPresent(it -> {
                    task.setFabricIdentify(it.getCaption());
                    setFabricIdentify(task, it.getCaption());
                    if (!task.hasFabricIdentify()) {
                        task.setTaskState(task.requireTaskState() + DevelopStyleTask.FABRIC_IDENTIFY);
                    }
                });
            }
        }
        this.done(task);
    }

    private void setVector(final DevelopStyleTask task) {
        final var vector = DesignImageConvert.convert(task);
        if (Objects.nonNull(skcImageVectorRepository.getById(vector.getImageId()))) {
            return;
        }
        this.skcImageVectorRepository.save(vector);
    }

    private boolean done(final DevelopStyleTask task) {
        if (!task.done()) {
            this.developStyleTaskRepository.updateByIdManualFill(task);
            return false;
        }
        if (task.queueingOrProcessing()) {
            task.setAiTaskStatus(TaskStatusEnum.COMPLETED.getCode());
            task.setTaskState(task.requireTaskState());
        }
        this.developStyleTaskRepository.updateByIdManualFill(task);
        return true;
    }
}
