package tech.tiangong.sdp.service.impl;

import cn.hutool.core.collection.CollUtil;
import cn.hutool.core.collection.CollectionUtil;
import cn.hutool.core.util.StrUtil;
import com.alibaba.excel.EasyExcel;
import com.alibaba.excel.context.AnalysisContext;
import com.alibaba.excel.read.listener.ReadListener;
import com.baomidou.mybatisplus.core.toolkit.StringUtils;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.BeanUtils;
import org.springframework.context.ApplicationContext;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import team.aikero.admin.common.vo.AttributeVo;
import team.aikero.admin.common.vo.DictVo;
import team.aikero.blade.core.exception.BusinessException;
import team.aikero.blade.sequence.id.IdHelper;
import team.aikero.blade.util.json.JsonsKt;
import tech.tiangong.sdp.convert.PrototypeConverter;
import tech.tiangong.sdp.entity.*;
import tech.tiangong.sdp.enums.DictEnum;
import tech.tiangong.sdp.enums.PrototypeMaterialTypeEnum;
import tech.tiangong.sdp.enums.PushPlmStatusEnum;
import tech.tiangong.sdp.enums.StyleStatusEnum;
import tech.tiangong.sdp.event.DesignExcelEvent;
import tech.tiangong.sdp.event.DesignExcelUpdateEvent;
import tech.tiangong.sdp.external.*;
import tech.tiangong.sdp.repository.*;
import tech.tiangong.sdp.service.*;
import tech.tiangong.sdp.util.StreamUtil;
import tech.tiangong.sdp.utils.SsoContext;
import tech.tiangong.sdp.vo.dto.DesignExcelDTO;
import tech.tiangong.sdp.vo.dto.GenerateCountDTO;
import tech.tiangong.sdp.vo.req.DesignerReq;
import tech.tiangong.sdp.vo.req.PlmSpuReq;
import tech.tiangong.sdp.vo.req.SkcBatchQueryReq;
import tech.tiangong.sdp.vo.resp.*;

import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

/**
 * 设计款管理-服务
 *
 * @author cenlijin
 * @since 2021-08-09 14:43:18
 */
@Slf4j
@Service
@RequiredArgsConstructor
public class PrototypeImportServiceImpl extends DefaultTaskServiceImpl implements PrototypeImportService {
    private final DesignStyleRepository designStyleRepository;
    private final PrototypeRepository prototypeRepository;
    private final PrototypeMaterialRepository prototypeMaterialRepository;
    private final PrototypeDetailRepository prototypeDetailRepository;
    private final PrototypeHistoryRepository prototypeHistoryRepository;
    private final ApplicationContext applicationContext;
    private final DictClientExternal dictClientExternal;
    private final DesignerService designerService;
    private final ShopRepository shopRepository;
    private final StyleSkcSkuRepository styleSkcSkuRepository;
    private final SkcImageSyncRepository skcImageSyncRepository;
    private final PrototypeService prototypeService;
    private final PlmStyleLogRepository plmStyleLogRepository;
    private final PlmSdpStyleRelaRepository plmSdpStyleRelaRepository;
    private final PlmDesignStyleRemoteHelper plmDesignStyleRemoteHelper;
    private final DesignStyleImportMessageRepository designStyleImportMessageRepository;
    private final static int BATCH_SIZE = 100;
    private final SkuInfoRemoteHelper skuInfoRemoteHelper;
    private final ProductSkuRepository productSkuRepository;
    private final PlmSpuSkcRepository plmSpuSkcRepository;

    @Override
    public List<String> importExcel(MultipartFile file) {
        List<String> resultErrorInfos = new ArrayList<>();
        try {
            EasyExcel.read(file.getInputStream(), DesignExcelDTO.class,
                    new ReadListener<DesignExcelDTO>() {
                        private final List<DesignExcelDTO> importDataList = new ArrayList<>();
                        private final List<String> errorMessages = new ArrayList<>();
                        private int successCount = 0;
                        private int failCount = 0;

                        @Override
                        public void invoke(DesignExcelDTO designExcelDTO, AnalysisContext context) {
                            boolean isError = false;
                            int rowNum = context.readRowHolder().getRowIndex() + 1;

                            // SPU编码校验
                            if (StrUtil.isBlank(designExcelDTO.getStyleCode())) {
                                errorMessages.add(String.format("第 %s 行的”SPU编码“不能为空！", rowNum));
                                isError = true;
                            }

                            // SKC编码校验
                            if (StrUtil.isBlank(designExcelDTO.getDesignCode())) {
                                errorMessages.add(String.format("第 %s 行的”SKC编码“不能为空！", rowNum));
                                isError = true;
                            }
                            if (isError) {
                                failCount++;
                                return;
                            }
                            importDataList.add(designExcelDTO);
                            successCount++;
                        }

                        @Override
                        public void doAfterAllAnalysed(AnalysisContext context) {
                            errorMessages.add(0, String.format("导入完成：成功 %s 条，失败 %s 条",
                                    successCount, failCount));
                            saveData();
                            resultErrorInfos.addAll(errorMessages);
                        }

                        private void saveData() {
                            if (CollUtil.isEmpty(importDataList)) {
                                log.warn("没有数据，不进行存储");
                                return;
                            }
                            afterCommit(() -> applicationContext.publishEvent(
                                    new DesignExcelEvent(this, importDataList)
                            ));
                        }
                    }).sheet().doRead();

        } catch (Exception e) {
            log.error("导入款式管理信息失败", e);
            throw new BusinessException("导入款式管理信息失败");
        }
        return resultErrorInfos;
    }


    @Override
    public List<String> importUpdateExcel(MultipartFile file) {
        List<String> resultErrorInfos = new ArrayList<>();
        try {
            EasyExcel.read(file.getInputStream(), DesignExcelDTO.class,
                    new ReadListener<DesignExcelDTO>() {
                        private final List<DesignExcelDTO> importDataList = new ArrayList<>();
                        private final List<String> errorMessages = new ArrayList<>();
                        private int successCount = 0;
                        private int failCount = 0;

                        @Override
                        public void invoke(DesignExcelDTO designExcelDTO, AnalysisContext context) {
                            boolean isError = false;
                            int rowNum = context.readRowHolder().getRowIndex() + 1;

                            // SPU编码校验
                            if (StrUtil.isBlank(designExcelDTO.getStyleCode())) {
                                errorMessages.add(String.format("第 %s 行的”SPU编码“不能为空！", rowNum));
                                isError = true;
                            }

                            // SKC编码校验
                            if (StrUtil.isBlank(designExcelDTO.getDesignCode())) {
                                errorMessages.add(String.format("第 %s 行的”SKC编码“不能为空！", rowNum));
                                isError = true;
                            }
                            if (isError) {
                                failCount++;
                                return;
                            }
                            importDataList.add(designExcelDTO);
                            successCount++;
                        }

                        @Override
                        public void doAfterAllAnalysed(AnalysisContext context) {
                            errorMessages.add(0, String.format("导入完成：成功 %s 条，失败 %s 条",
                                    successCount, failCount));
                            saveData();
                            resultErrorInfos.addAll(errorMessages);
                        }

                        private void saveData() {
                            if (CollUtil.isEmpty(importDataList)) {
                                log.warn("没有数据，不进行存储");
                                return;
                            }
                            afterCommit(() -> applicationContext.publishEvent(
                                    new DesignExcelUpdateEvent(this, importDataList)
                            ));
                        }
                    }).sheet().doRead();

        } catch (Exception e) {
            log.error("导入款式管理信息失败", e);
            throw new BusinessException("导入款式管理信息失败");
        }
        return resultErrorInfos;
    }

    @Override
    public void importData(List<DesignExcelDTO> importList) {
        if (CollectionUtil.isEmpty(importList)) {
            log.info("导入的数据为空");
            return;
        }
        int batchSize = BATCH_SIZE;
        int totalSize = importList.size();
        int batchCount = (totalSize + batchSize - 1) / batchSize;
        List<String> errorList = new ArrayList<>();
        log.info("开始导入数据，总条数：{}，分批数：{}，每批大小：{}", totalSize, batchCount, batchSize);
        for (int i = 0; i < batchCount; i++) {
            int fromIndex = i * batchSize;
            int toIndex = Math.min(fromIndex + batchSize, totalSize);
            List<DesignExcelDTO> batchList = importList.subList(fromIndex, toIndex);
            try {
                processBatch(batchList, errorList);
                log.info("第 {}/{} 批处理完成，本批条数：{}", i + 1, batchCount, batchList.size());
            } catch (Exception e) {
                log.error("第 {}/{} 批处理失败，本批条数：{}", i + 1, batchCount, batchList.size(), e);
                throw new RuntimeException("第 " + (i + 1) + " 批处理失败", e);
            }
        }
        if (CollectionUtil.isNotEmpty(errorList)) {
            log.info("款式导入数据失败信息：\t{}", JsonsKt.toJsonPretty(errorList));
        }

        log.info("数据导入完成，总处理条数：{}", totalSize);
    }

    @Override
    public void importDataUpdate(List<DesignExcelDTO> importList) {
        if (CollectionUtil.isEmpty(importList)) {
            log.info("导入的数据为空");
            return;
        }
        int batchSize = BATCH_SIZE;
        int totalSize = importList.size();
        int batchCount = (totalSize + batchSize - 1) / batchSize;
        List<String> errorList = new ArrayList<>();
        log.info("开始导入款式更新数据，总条数：{}，分批数：{}，每批大小：{}", totalSize, batchCount, batchSize);
        for (int i = 0; i < batchCount; i++) {
            int fromIndex = i * batchSize;
            int toIndex = Math.min(fromIndex + batchSize, totalSize);
            List<DesignExcelDTO> batchList = importList.subList(fromIndex, toIndex);
            try {
                processUpdateBatch(batchList, errorList);
                log.info("第 {}/{} 批处理完成，本批条数：{}", i + 1, batchCount, batchList.size());
            } catch (Exception e) {
                log.error("第 {}/{} 批处理失败，本批条数：{}", i + 1, batchCount, batchList.size(), e);
                throw new RuntimeException("第 " + (i + 1) + " 批处理失败", e);
            }
        }
        if (CollectionUtil.isNotEmpty(errorList)) {
            log.info("款式导入数据失败信息：\t{}", JsonsKt.toJsonPretty(errorList));
        }
        log.info("款式管理更新数据导入完成，总处理条数：{}", totalSize);
    }

    @Override
    @Async("designImportHandlerExecutor")
    public void generateSpuSkc(GenerateCountDTO req) {
        Integer generateCount = req.getGenerateCount();
        log.info("开始生成PLM-SPU-SKC数量：{}", generateCount);
        int batchSize = 100;
        int batchCount = (int) Math.ceil((double) generateCount / batchSize);
        final var time = LocalDateTime.now();
        for (int i = 0; i < batchCount; i++) {
            int start = i * batchSize;
            int end = Math.min(start + batchSize, generateCount);
            int currentBatchCount = end - start;
            List<PlmSpuSkc> addList = new ArrayList<>();
            var batchReq = PrototypeConverter.buildPullPlmStyleCodeBatch(null, null, true, currentBatchCount);
            try {
                final var resp = this.plmDesignStyleRemoteHelper.batchGenerate(batchReq);
                if (CollectionUtil.isNotEmpty(resp.getSpuCodes())) {
                    addList.addAll(buildSpuSkc(resp.getSpuCodes(), time));
                }
                plmSpuSkcRepository.saveBatch(addList);
                log.info("第{}批请求成功，生成数量：{}", i + 1, currentBatchCount);
            } catch (Exception e) {
                log.error("第{}批请求失败，生成数量：{}，异常信息：{}", i + 1, currentBatchCount, e);
            }
        }
        log.info("生成PLM-SPU-SKC数量：{}", generateCount);
    }

    @Override
    public List<BaseSkuResp> getMokenSkuList(List<String> skcCodes) {
        if (CollectionUtil.isEmpty(skcCodes)) {
            return  Collections.emptyList();
        }
        final var skc = prototypeRepository.listByDesignCodes(skcCodes);
        if (CollectionUtil.isEmpty(skc)) {
            return Collections.emptyList();
        }
        final var style = designStyleRepository.getById(skc.getFirst().getDesignStyleId());
        final var req = new SkcBatchQueryReq();
        req.setSkcs(skcCodes);
        final var skuList = skuInfoRemoteHelper.querySku(req);
        final var standardSize = PlmConvertHelper.listByDictCode(DictEnum.PLM_STANDARD_SIZE);
        final var checkMokenList = getMokenSkuList(skuList,standardSize,style);
        return checkMokenList;
    }

    private List<PlmSpuSkc> buildSpuSkc(List<ClothingCodeBatchGenerateResp.ClothingCodeGenerateResp> spuCodes, LocalDateTime time) {
        return spuCodes.stream().map(t -> {
            PlmSpuSkc spuSkc = new PlmSpuSkc();
            spuSkc.setPlmSpuSkcId(IdHelper.getId());
            spuSkc.setStyleCode(t.getStyleCode());
            spuSkc.setDesignCode(t.getDesignCodes().getFirst());
            spuSkc.setCreatedTime(time);
            spuSkc.setRevisedTime(time);
            return spuSkc;
        }).toList();
    }


    @Override
    @Async("designImportHandlerExecutor")
    public void refreshImportSkcPicture(List<String> styleCodes) {
        final var spuList = designStyleRepository.selectImportList(styleCodes);
        if (CollectionUtil.isEmpty(spuList)) {
            return;
        }
        final var spuIds = spuList.stream().map(DesignStyle::getDesignStyleId).toList();
        final var skcList = prototypeRepository.listByDesignStyleIds(spuIds);
        if (CollectionUtil.isEmpty(skcList)) {
            log.info("skc数组信息不存在，spu-id：\t{}", JsonsKt.toJsonPretty(spuIds));
            return;
        }
        final var skcCodes = skcList.stream().map(Prototype::getDesignCode).toList();
        final var skcPictures = skcImageSyncRepository.syncs(skcCodes);
        if (CollectionUtil.isEmpty(skcPictures)) {
            log.info("SkcImageSync没有可执行的图片同步数据！");
            return;
        }
        final var prototypeMaterialList = prototypeMaterialRepository.listByDesignCodes(skcCodes);
        int batchSize = BATCH_SIZE;
        int totalSize = skcList.size();
        int batchCount = (totalSize + batchSize - 1) / batchSize;
        log.info("开始处理skc图片信息，总条数：{}，分批数：{}，每批大小：{}", totalSize, batchCount, batchSize);
        for (int i = 0; i < batchCount; i++) {
            int fromIndex = i * batchSize;
            int toIndex = Math.min(fromIndex + batchSize, totalSize);
            List<Prototype> batchList = skcList.subList(fromIndex, toIndex);
            try {
                fillSkcPictures(batchList, skcPictures, prototypeMaterialList);
                log.info("第 {}/{} 批处理完成，本批条数：{}", i + 1, batchCount, batchList.size());
            } catch (Exception e) {
                log.error("第 {}/{} 批处理失败，本批条数：{}", i + 1, batchCount, batchList.size(), e);
            }
        }
        log.info("款式管理图片更新成功！");
    }

    @Override
    @Async("designImportHandlerExecutor")
    public void refreshSkcSku(List<String> skcCodes) {
        final var skcList = prototypeRepository.listByDesignCodes(skcCodes);
        if (CollectionUtil.isEmpty(skcList)) {
            return;
        }
        int batchSize = BATCH_SIZE;
        int totalSize = skcList.size();
        int batchCount = (totalSize + batchSize - 1) / batchSize;
        log.info("开始处理skc-sku信息，总条数：{}，分批数：{}，每批大小：{}", totalSize, batchCount, batchSize);
        for (int i = 0; i < batchCount; i++) {
            int fromIndex = i * batchSize;
            int toIndex = Math.min(fromIndex + batchSize, totalSize);
            List<Prototype> batchList = skcList.subList(fromIndex, toIndex);
            try {
                skcSku(batchList);
                log.info("第 {}/{} 批处理完成，本批条数：{}", i + 1, batchCount, batchList.size());
            } catch (Exception e) {
                log.error("第 {}/{} 批处理失败，本批条数：{}", i + 1, batchCount, batchList.size(), e);
            }
        }
        log.info("skc-sku更新成功！");
    }

    private void skcSku(List<Prototype> batchList) {
        final var skcCodes = batchList.stream().map(Prototype::getDesignCode).toList();
        final var skcIds = batchList.stream().map(Prototype::getPrototypeId).toList();
        Map<String, Prototype> skcMap = StreamUtil.list2Map(batchList, Prototype::getDesignCode);
        //生成SKU信息
        final var req = new SkcBatchQueryReq();
        req.setSkcs(skcCodes);
        final var mokenSkuList = skuInfoRemoteHelper.querySku(req);
        final var skuList = styleSkcSkuRepository.selectVoBySkcIds(skcIds);
        final var spuIds = skuList.stream().map(StyleSkcSkuVo::getStyleId).toList();
        final var spuList = designStyleRepository.listByIds(spuIds);
        Map<Long, DesignStyle> spuMap = StreamUtil.list2Map(spuList, DesignStyle::getDesignStyleId);
        final var skcSkuMap = skuList.stream().collect(Collectors.groupingBy(StyleSkcSkuVo::getSkcCode));
        final var mokenMap = mokenSkuList.stream().collect(Collectors.groupingBy(BaseSkuResp::getSkc));
        List<Long> deleteIds = new ArrayList<>();
        List<StyleSkcSku> addList = new ArrayList<>();
        skcSkuMap.forEach((skcCode, list) -> {
            log.info("开始处理SKC:{}", skcCode);
            if (CollectionUtil.isNotEmpty(mokenMap) && mokenMap.containsKey(skcCode)) {
                final var sdpCount = list.size();
                final var mokenList = mokenMap.get(skcCode);
                final var skuFirst = skcSkuMap.get(skcCode).getFirst();
                if (spuMap.containsKey(skuFirst.getStyleId())) {
                    final var spu = spuMap.get(skuFirst.getStyleId());
                    final var standardSize = PlmConvertHelper.listByDictCode(DictEnum.PLM_STANDARD_SIZE);
                    final var checkMokenList = getMokenSkuList(mokenList,standardSize,spu);
                    if (sdpCount != checkMokenList.size() && checkMokenList.size() > 0) {
                        list.forEach(sku -> deleteIds.add(sku.getSkuId()));
                        if (CollectionUtil.isNotEmpty(checkMokenList) && skcMap.containsKey(skcCode)) {
                            addList.addAll(PrototypeConverter.convertSkuByQuery(checkMokenList, skcMap.get(skcCode)));
                        }
                    }
                }
            }
            log.info("处理完成SKC:{}", skcCode);
        });
        if (CollectionUtil.isNotEmpty(deleteIds)) {
            log.info("删除的SKU数组:\t{}", JsonsKt.toJsonPretty(deleteIds));
            styleSkcSkuRepository.deleteByIds(deleteIds);
        }
        if (CollectionUtil.isNotEmpty(addList)) {
            log.info("新增的SKU数组:\t{}", JsonsKt.toJsonPretty(addList));
            styleSkcSkuRepository.saveBatch(addList);
        }
    }

    public static List<BaseSkuResp> getMokenSkuList(List<BaseSkuResp> mokenSkuList, DictVo standardSize,DesignStyle style) {
        final var groupCode = style.getSizeStandardCode();
        if (StringUtils.isBlank(groupCode)) {
            return Collections.emptyList();
        }
        final var plmCode = standardSize.getChildren().stream().filter(it -> StrUtil.equalsIgnoreCase(groupCode, it.getDictCode()))
                .filter(it -> CollectionUtil.isNotEmpty(it.getAttributes()))
                .flatMap(it -> it.getAttributes().stream())
                .filter(it -> StrUtil.equalsIgnoreCase("plm_code", it.getCode()))
                .map(AttributeVo::getName).findFirst().orElse("");
        return mokenSkuList.stream().filter(t -> plmCode.equals(t.getSourceGroupCode())).toList();
    }

    private void fillSkcPictures(List<Prototype> batchList, List<SkcImageSync> skcPictures, List<PrototypeMaterial> prototypeMaterialList) {
        final var skcPictureMap = skcPictures.stream().collect(Collectors.groupingBy(SkcImageSync::getSkcCode));
        final var exitSkcPictureMap = prototypeMaterialList.stream().collect(Collectors.groupingBy(PrototypeMaterial::getDesignCode));
        List<PrototypeMaterial> prototypeMaterialUpdateList = new ArrayList<>();
        List<SkcImageSync> skcImageSyncUpdateList = new ArrayList<>();
        List<PrototypeMaterial> prototypeMaterialDeleteList = new ArrayList<>();
        for (Prototype skc : batchList) {
            if (!exitSkcPictureMap.isEmpty() && exitSkcPictureMap.containsKey(skc.getDesignCode())) {
                final var deleteList = exitSkcPictureMap.get(skc.getDesignCode());
                deleteList.forEach(t -> t.setDeleted(1));
                prototypeMaterialDeleteList.addAll(deleteList);
            }
            if (skcPictureMap.containsKey(skc.getDesignCode())) {
                final var skcAddPictures = skcPictureMap.get(skc.getDesignCode());
                final var pictures = skcAddPictures.stream().map(SkcImageSync::getImageUrl).toList();
                prototypeMaterialUpdateList.addAll(PrototypeConverter.buildUpdateMaterialInfo(skc, pictures, PrototypeMaterialTypeEnum.IMAGE.getCode()));
                skcAddPictures.forEach(t -> {
                    t.setSyncStatus(1);
                    t.setSyncTime(LocalDateTime.now());
                });
                skcImageSyncUpdateList.addAll(skcAddPictures);
            }
        }
        if (CollectionUtil.isNotEmpty(prototypeMaterialDeleteList)) {
            prototypeMaterialRepository.updateBatchById(prototypeMaterialDeleteList);
        }
        if (CollectionUtil.isNotEmpty(prototypeMaterialUpdateList)) {
            prototypeMaterialRepository.saveBatch(prototypeMaterialUpdateList);
        }
        if (CollectionUtil.isNotEmpty(skcImageSyncUpdateList)) {
            skcImageSyncRepository.updateBatchById(skcImageSyncUpdateList);
        }
    }

    /**
     * 处理单批次数据
     */
    private void processBatch(List<DesignExcelDTO> batchList, List<String> errorList) {
        final var addSpuList = new ArrayList<DesignStyle>();
        final var addSkcList = new ArrayList<Prototype>();
        final var addSkcPicturesList = new ArrayList<PrototypeMaterial>();
        final var addSkcDetailAddList = new ArrayList<PrototypeDetail>();
        final var addSkcHistoryList = new ArrayList<PrototypeHistory>();
        final var updateSkcImageSyncList = new ArrayList<SkcImageSync>();
        List<String> plmSpuCodes = new ArrayList<>();
        List<String> plmSkcCodes = new ArrayList<>();
        final List<String> dictCodes = Arrays.asList(
                "styleType", "clothing_category", "product_tag", "plm_clothing_band",
                "product_level", "plm_quality_level", "aps_category_type", "plm_productType",
                "product_style", "fd-printing", "plm_reference_season", "festival",
                "fit", "plm_elastic_requirement", "scenes", "visual_style", "SKU_CLASSIFICATION", "plm_standard_size", "clothing_color"
        );
        List<String> designStyleCodes = batchList.stream().filter(t -> t.getPushPlmStatus().equals(PushPlmStatusEnum.COMPLETED.getCode())).map(DesignExcelDTO::getStyleCode).distinct().toList();
        List<String> storeNames = batchList.stream().map(DesignExcelDTO::getStoreName).distinct().toList();
        List<String> selectDesignStyleCodes = batchList.stream().map(DesignExcelDTO::getStyleCode).distinct().toList();
        List<String> skcCodes = batchList.stream().map(DesignExcelDTO::getDesignCode).distinct().toList();
       /* if (CollectionUtil.isEmpty(designStyleCodes)) {
            return;
        }*/
        getSpuSkcCodes(plmSpuCodes, plmSkcCodes, designStyleCodes);
       /* if (CollectionUtil.isEmpty(plmSpuCodes) && CollectionUtil.isEmpty(plmSkcCodes)) {
            return;
        }*/

        final var exitSpuList = designStyleRepository.listByStyleCodes(selectDesignStyleCodes);
        final var exitSkcList = prototypeRepository.listByDesignCodes(skcCodes);
        final var skcPictures = skcImageSyncRepository.syncs(skcCodes);
        List<Shop> shopList;
        if (CollectionUtil.isNotEmpty(storeNames)) {
            shopList = shopRepository.listByNames(storeNames);
        } else {
            shopList = Collections.emptyList();
        }
        final var dictValues = dictClientExternal.listByDictCodes(dictCodes);
        Map<String,Long> designerMap = new HashMap<>();
        //组装数据
        for (DesignExcelDTO dto : batchList) {
            if (dto.getPushPlmStatus().equals(PushPlmStatusEnum.COMPLETED.getCode()) && !plmSkcCodes.contains(dto.getDesignCode())) {
                errorList.add("SKC编码不存在，导入失败，SKC编码：" + dto.getDesignCode());
                log.info("PLM不存在SKC编码：{}", dto.getDesignCode());
                continue;
            }
            convertData(exitSpuList, exitSkcList, dto, dictValues, shopList, addSpuList, addSkcList,
                    addSkcDetailAddList, addSkcPicturesList, addSkcHistoryList, errorList, skcPictures, updateSkcImageSyncList);
        }
        if (CollectionUtil.isNotEmpty(addSpuList)) {
            designStyleRepository.saveBatch(addSpuList);
        }
        if (CollectionUtil.isNotEmpty(addSkcList)) {
            prototypeRepository.saveBatch(addSkcList);
        }
        if (CollectionUtil.isNotEmpty(addSkcPicturesList)) {
            prototypeMaterialRepository.saveBatch(addSkcPicturesList);
        }
        if (CollectionUtil.isNotEmpty(addSkcDetailAddList)) {
            prototypeDetailRepository.saveBatch(addSkcDetailAddList);
        }
        if (CollectionUtil.isNotEmpty(addSkcHistoryList)) {
            prototypeHistoryRepository.saveBatch(addSkcHistoryList);
        }
        if (CollectionUtil.isNotEmpty(updateSkcImageSyncList)) {
            skcImageSyncRepository.updateBatchById(updateSkcImageSyncList);
        }
        //处理生成关联信息
        /*if (CollectionUtil.isNotEmpty(addSpuList) || CollectionUtil.isNotEmpty(addSkcList)) {
            styleRela(addSpuList,addSkcList);
        }*/
    }

    /**
     * 处理单批次数据
     */
    private void processUpdateBatch(List<DesignExcelDTO> batchList, List<String> errorList) {
        final var updateSpuList = new ArrayList<DesignStyle>();
        final var updateSkcList = new ArrayList<Prototype>();
        final var updateDetailList = new ArrayList<PrototypeDetail>();
        final List<String> dictCodes = Arrays.asList(
                "styleType", "clothing_category", "product_tag", "plm_clothing_band",
                "product_level", "plm_quality_level", "aps_category_type", "plm_productType",
                "product_style", "fd-printing", "plm_reference_season", "festival",
                "fit", "plm_elastic_requirement", "scenes", "visual_style", "SKU_CLASSIFICATION", "plm_standard_size", "clothing_color"
        );
        List<String> storeNames = batchList.stream().map(DesignExcelDTO::getStoreName).distinct().toList();
        List<String> selectDesignStyleCodes = batchList.stream().map(DesignExcelDTO::getStyleCode).distinct().toList();
        List<String> skcCodes = batchList.stream().map(DesignExcelDTO::getDesignCode).distinct().toList();
        final var exitSpuList = designStyleRepository.listByStyleCodes(selectDesignStyleCodes);
        final var exitSkcList = prototypeRepository.listByDesignCodes(skcCodes);
        final var spuMap = StreamUtil.list2Map(exitSpuList, DesignStyle::getStyleCode);
        final var skcMap = StreamUtil.list2Map(exitSkcList, Prototype::getDesignCode);
        if (spuMap.isEmpty() || skcMap.isEmpty()) {
            return;
        }
        final var skcIds = exitSkcList.stream().map(Prototype::getPrototypeId).toList();
        final var exitSkcDetailList = prototypeDetailRepository.getListByPrototypeIds(skcIds);
        final var skcDetailMap = StreamUtil.list2Map(exitSkcDetailList, PrototypeDetail::getPrototypeId);
        List<Shop> shopList;
        if (CollectionUtil.isNotEmpty(storeNames)) {
            shopList = shopRepository.listByNames(storeNames);
        } else {
            shopList = Collections.emptyList();
        }
        final var dictValues = dictClientExternal.listByDictCodes(dictCodes);
        //组装数据
        for (DesignExcelDTO dto : batchList) {
            if (CollectionUtil.isEmpty(spuMap) || CollectionUtil.isEmpty(skcMap)) {
                log.info("SPU：{}或者SKC：{}信息为空", dto.getStyleCode(), dto.getDesignCode());
                continue;
            }
            if (!spuMap.containsKey(dto.getStyleCode())) {
                log.info("SPU信息不存在：{}", dto.getStyleCode());
                errorList.add("SPU编码不存在，导入失败，SKC编码：" + dto.getStyleCode());
                continue;
            }
            if (!skcMap.containsKey(dto.getDesignCode())) {
                errorList.add("SPU编码不存在，导入失败，SKC编码：" + dto.getDesignCode());
                log.info("SKC信息不存在：{}", dto.getDesignCode());
                continue;
            }
            convertUpdateData(updateSpuList, updateSkcList, updateDetailList, spuMap, skcMap, skcDetailMap, dto, dictValues, shopList, errorList);
        }
        if (CollectionUtil.isNotEmpty(updateSpuList)) {
            designStyleRepository.updateBatchById(updateSpuList);
        }
        if (CollectionUtil.isNotEmpty(updateSkcList)) {
            prototypeRepository.editBatchById(updateSkcList);
        }
        if (CollectionUtil.isNotEmpty(updateDetailList)) {
            prototypeDetailRepository.updateBatchById(updateDetailList);
        }
    }


    private void getSpuSkcCodes(List<String> plmSpuCodes, List<String> plmSkcCodes, List<String> designStyleCodes) {
        if (CollectionUtil.isNotEmpty(designStyleCodes)) {
            final var plmReq = new PlmSpuReq();
            plmReq.setPageNum(1);
            plmReq.setPageSize(BATCH_SIZE);
            plmReq.setStyleCode(designStyleCodes);
            final var plmDesignList = plmDesignStyleRemoteHelper.spuList(plmReq);
            plmSpuCodes.addAll(plmDesignList.stream()
                    .flatMap(spu -> spu.getPrototypes().stream())
                    .map(PlmSpuSkcResp.PlmPrototype::getStyleCode).filter(Objects::nonNull).distinct().toList());
            plmSkcCodes.addAll(plmDesignList.stream()
                    .flatMap(spu -> spu.getPrototypes().stream())
                    .map(PlmSpuSkcResp.PlmPrototype::getDesignCode).filter(Objects::nonNull).distinct().toList());
        }
       /* final var importMessage = designStyleImportMessageRepository.list();
        if (CollectionUtil.isNotEmpty(importMessage)) {
            plmSpuCodes.addAll(importMessage.stream()
                    .map(DesignStyleImportMessage::getSpuCode).filter(Objects::nonNull).distinct().toList());
            plmSkcCodes.addAll(importMessage.stream()
                    .map(DesignStyleImportMessage::getSkcCode).filter(Objects::nonNull).distinct().toList());
        }*/
    }

    /*private void styleRela(List<DesignStyle> addSpuList, List<Prototype> addSkcList) {
        List<PlmSdpStyleRela> addPlmSdpStyleRela;
        List<PlmStyleLog> plmStyleLog;
        if (CollectionUtil.isNotEmpty(addSpuList)) {
            addPlmSdpStyleRela.addAll(PrototypeConverter.buildStyleRela(addSpuList));
        }
        if (CollectionUtil.isNotEmpty(addSkcList)) {
            addPlmSdpStyleRela.addAll();
        }
        if (CollectionUtil.isNotEmpty(addPlmSdpStyleRela)) {
            plmSdpStyleRelaRepository.saveBatch(addPlmSdpStyleRela);
        }

    }*/

    private void convertData(List<DesignStyle> exitSpus, List<Prototype> exitSkcs, DesignExcelDTO dto, List<DictVo> dictValues, List<Shop> shopList,
                             List<DesignStyle> addSpuList, List<Prototype> addSkcList, List<PrototypeDetail> skcDetailList,
                             List<PrototypeMaterial> skcPicturesList, List<PrototypeHistory> skcHistoryList, List<String> errorList,
                             List<SkcImageSync> skcPictures, ArrayList<SkcImageSync> updateSkcImageSyncList) {
        final var exitStyleCodess = exitSpus.stream().map(DesignStyle::getStyleCode).toList();

        DesignStyle spu;
        //创建SPU
        if (!exitStyleCodess.contains(dto.getStyleCode())) {
            spu = fillSpu(dto, shopList, dictValues, addSpuList);
            exitSpus.add(spu);
        } else {
            spu = exitSpus.stream().filter(t -> t.getStyleCode().equals(dto.getStyleCode())).toList().getFirst();
        }
        final var exitSkcCodes = exitSkcs.stream().map(Prototype::getDesignCode).toList();
        Prototype skc;
        //创建SKC
        if (!exitSkcCodes.contains(dto.getDesignCode())) {
            skc = fillSkc(dto, spu, addSkcList, skcDetailList, skcPicturesList, skcHistoryList, skcPictures, updateSkcImageSyncList);
            exitSkcs.add(skc);
        } else {
            skc = exitSkcs.stream().filter(t -> t.getDesignCode().equals(dto.getDesignCode())).toList().getFirst();
        }
        //生成SKU
        prototypeService.generateSku(spu, skc);
    }


    private void convertUpdateData(List<DesignStyle> updateSpuList, List<Prototype> updateSkcList, List<PrototypeDetail> updateDetailList,
                                   Map<String, DesignStyle> spuMap, Map<String, Prototype> skcMap, Map<Long, PrototypeDetail> skcDetailMap,
                                   DesignExcelDTO dto,
                                   List<DictVo> dictValues, List<Shop> shopList, List<String> errorList) {
        DesignStyle spu;
        List<String> styleCodeList = updateSpuList.stream()
                .map(DesignStyle::getStyleCode)
                .collect(Collectors.toList());
        List<String> skcCodeList = updateSkcList.stream()
                .map(Prototype::getDesignCode)
                .collect(Collectors.toList());
        //SPU更新
        if (CollectionUtil.isEmpty(styleCodeList) || !styleCodeList.contains(dto.getStyleCode())) {
            spu = fillUpdateSpu(spuMap, dto, shopList, dictValues);
            updateSpuList.add(spu);
        } else {
            spu = updateSpuList.stream().filter(t -> t.getStyleCode().equals(dto.getStyleCode())).toList().getFirst();
        }
        Prototype skc;
        //SKC更新
        if (CollectionUtil.isEmpty(skcCodeList) || !skcCodeList.contains(dto.getStyleCode())) {
            skc = updateFillSkc(dto, spu, skcMap, skcDetailMap, updateDetailList, errorList);
            updateSkcList.add(skc);
        } else {
            skc = updateSkcList.stream().filter(t -> t.getDesignCode().equals(dto.getDesignCode())).toList().getFirst();
        }
        //生成SKU
        //prototypeService.generateSku(spu, skc);

    }

    private Prototype updateFillSkc(DesignExcelDTO dto, DesignStyle spu, Map<String, Prototype> skcMap, Map<Long, PrototypeDetail> skcDetailMap, List<PrototypeDetail> updateDetailList, List<String> errorList) {
        final var exitSkc = skcMap.get(dto.getDesignCode());
        final var exitSkcDetail = skcDetailMap.get(exitSkc.getPrototypeId());
        final var prototype = new Prototype();
        final var prototypeDetail = new PrototypeDetail();
        BeanUtils.copyProperties(exitSkc, prototype);
        BeanUtils.copyProperties(exitSkcDetail, prototypeDetail);
        //颜色
        if (StringUtils.isNotBlank(dto.getColor())) {
            prototypeDetail.setColorInfoList(convertColor(dto.getColor()));
        }
        //尺码
        if (StringUtils.isNotBlank(dto.getSampleSize())) {
            prototypeDetail.setSampleSize(dto.getSampleSize());
        }
        //制作方式
        if (null != dto.getMakeClothesType()) {
            prototype.setMakeClothesType(dto.getMakeClothesType());
        }
        //前置拆板
        if (null != dto.getPreDisassemblyState()) {
            prototype.setPreDisassemblyState(dto.getPreDisassemblyState());
        }
        prototype.setVersionNum(exitSkc.getVersionNum() + 1);
        prototypeDetail.setSizeStandard(spu.getSizeStandardName());
        prototypeDetail.setSizeStandardCode(spu.getSizeStandardCode());
        try {
            if (StringUtils.isNotBlank(dto.getDesignerName()) && !StringUtils.equals(prototype.getDesignerName(), dto.getDesignerName())) {
                final var designers = SdpMaterialDesignerApi.selectByDesignerName(dto.getDesignerName());
                if (CollectionUtil.isNotEmpty(designers)) {
                    prototype.setDesignerId(designers.getFirst().getDesignerId());
                    prototype.setDesignerName(dto.getDesignerName());
                } else {
                    errorList.add("设计师信息查询不到,SKC编码：" + dto.getDesignCode() + "，设计师名字：" + dto.getDesignerName());
                }
            }
        } catch (Exception e) {
            errorList.add("设计师信息查询异常,异常信息：" + e.getMessage());
            log.info("设计师信息查询不到:{}", dto.getDesignerName());
        }
        if (StringUtils.isNotBlank(dto.getPlmDesignerName()) && !StringUtils.equals(prototype.getPlmDesignerName(), dto.getPlmDesignerName())) {
            DesignerReq req = new DesignerReq();
            req.setDesignerName(dto.getPlmDesignerName());
            try {
                final var plmDesigner = designerService.designerInfoList(req);
                if (CollectionUtil.isNotEmpty(plmDesigner)) {
                    prototype.setPlmDesignerId(Long.parseLong(plmDesigner.getFirst().getDesignerId()));
                    prototype.setPlmDesignerName(dto.getPlmDesignerName());
                } else {
                    errorList.add("PLM设计师信息查询不到,SKC编码：" + dto.getDesignCode() + "，设计师名字：" + dto.getPlmDesignerName());
                }
            } catch (Exception e) {
                errorList.add("PLM设计师信息查询异常,异常信息：" + e.getMessage());
                log.info("PLM设计师信息查询异常:{}", e.getMessage());
            }
        }
        updateDetailList.add(prototypeDetail);
        return prototype;
    }


    private Prototype fillSkc(DesignExcelDTO dto, DesignStyle spu, List<Prototype> addSkcList, List<PrototypeDetail> skcDetailList,
                              List<PrototypeMaterial> skcAddPicturesList, List<PrototypeHistory> skcHistoryList,
                              List<SkcImageSync> skcPictures, ArrayList<SkcImageSync> updateSkcImageSyncList) {
        final var prototype = new Prototype();
        BeanUtils.copyProperties(dto, prototype);
        prototype.setPrototypeId(IdHelper.getId());
        prototype.setLatestPrototypeId(prototype.getPrototypeId());
        prototype.setDesignStyleId(spu.getDesignStyleId());
        prototype.setStyleCode(spu.getStyleCode());
        prototype.setTaskSource("user_upload");
        //prototype.setImportSource(2);
        prototype.setVersionNum(1);
        prototype.setLatestVersionNum(1);
        prototype.setSkcType(null == dto.getSkcType() ? 1 : dto.getSkcType());
        prototype.setMakeSameDesignCode(dto.getMakeSameDesignCode());
        prototype.setTenantId(SsoContext.tenantId());
        try {
            if (StringUtils.isNotBlank(dto.getDesignerName())) {
                final var designers = SdpMaterialDesignerApi.selectByDesignerName(dto.getDesignerName());
                if (CollectionUtil.isNotEmpty(designers)) {
                    prototype.setDesignerId(designers.getFirst().getDesignerId());
                    prototype.setCreatorId(designers.getFirst().getDesignerId());
                    prototype.setReviserId(designers.getFirst().getDesignerId());
                    prototype.setCreatorName(designers.getFirst().getDesignerName());
                    prototype.setReviserName(designers.getFirst().getDesignerName());
                }
            }
        } catch (Exception e) {
            log.info("设计师信息查询不到:{}", dto.getDesignerName());
        }
        Map<String, List<SkcImageSync>> skcPictureMap = skcPictures.stream().collect(Collectors.groupingBy(SkcImageSync::getSkcCode));
        if (CollectionUtil.isNotEmpty(skcPictures) && skcPictureMap.containsKey(dto.getDesignCode())) {
            final var addPictures = skcPictureMap.get(dto.getDesignCode());
            final var addPictureList = addPictures.stream().map(skcPicture -> createPrototypeMaterial(skcPicture, spu, prototype)).toList();
            skcAddPicturesList.addAll(addPictureList);
            addPictures.forEach(t -> {
                t.setSyncStatus(1);
                t.setSyncTime(LocalDateTime.now());
            });
            updateSkcImageSyncList.addAll(addPictures);
        }
        if (StringUtils.isNotBlank(dto.getPlmDesignerName())) {
            DesignerReq req = new DesignerReq();
            req.setDesignerName(dto.getPlmDesignerName());
            final var plmDesigner = designerService.designerInfoList(req);
            if (CollectionUtil.isNotEmpty(plmDesigner)) {
                prototype.setPlmDesignerId(Long.parseLong(plmDesigner.getFirst().getDesignerId()));
            }
        }
        addSkcList.add(prototype);

        final var prototypeDetail = new PrototypeDetail();
        BeanUtils.copyProperties(dto, prototypeDetail);
        prototypeDetail.setPrototypeDetailId(IdHelper.getId());
        prototypeDetail.setPrototypeId(prototype.getPrototypeId());
        prototypeDetail.setSizeStandard(spu.getSizeStandardName());
        prototypeDetail.setSizeStandardCode(spu.getSizeStandardCode());
        prototypeDetail.setColorInfoList(convertColor(dto.getColor()));
        prototypeDetail.setTenantId(SsoContext.tenantId());
        skcDetailList.add(prototypeDetail);

        PrototypeHistory prototypeHistory = new PrototypeHistory();
        BeanUtils.copyProperties(prototype, prototypeHistory);
        prototypeHistory.setHistoryId(IdHelper.getId());
        prototypeHistory.setTenantId(SsoContext.tenantId());
        skcHistoryList.add(prototypeHistory);

        return prototype;
    }

    private PrototypeMaterial createPrototypeMaterial(SkcImageSync skcPicture, DesignStyle spu, Prototype prototype) {
        PrototypeMaterial material = new PrototypeMaterial();
        material.setPrototypeMaterialId(IdHelper.getId());
        material.setDesignStyleId(spu.getDesignStyleId());
        material.setStyleCode(spu.getStyleCode());
        material.setPrototypeId(prototype.getPrototypeId());
        material.setDesignCode(prototype.getDesignCode());
        material.setMaterialUrl(skcPicture.getImageUrl());
        material.setMaterialType(0);
        material.setTenantId(SsoContext.tenantId());
        return material;
    }

    private List<ColorInfoVo> convertColor(String colorStr) {
        final var dictColor = PlmConvertHelper.dictColor();
        List<String> colorList = StrUtil.splitTrim(colorStr, "、");
        List<ColorInfoVo> colorInfoVoList = new ArrayList<>();
        for (String color : colorList) {
            final var colors = dictColor.stream().filter(it -> StrUtil.equalsIgnoreCase(color, it.getDictName()))
                    .filter(it -> CollectionUtil.isNotEmpty(it.getAttributes()))
                    .toList();
            if (CollectionUtil.isNotEmpty(colors)) {
                ColorInfoVo colorInfoVo = new ColorInfoVo();
                colorInfoVo.setColor(color);
                colorInfoVo.setColorCode(colors.getFirst().getDictCode());
                colorInfoVo.setColorNumber(colors.getFirst().getDictCode());
                final var colorAbbrCodes = colors.getFirst().getAttributes().stream().filter(t -> "英文缩写".equals(t.getRemark())).toList();
                if (CollectionUtil.isNotEmpty(colorAbbrCodes)) {
                    colorInfoVo.setColorAbbrCode(colorAbbrCodes.getFirst().getName());
                }
                final var colorEnglishNames = colors.getFirst().getAttributes().stream().filter(t -> "英文翻译".equals(t.getRemark())).toList();
                if (CollectionUtil.isNotEmpty(colorEnglishNames)) {
                    colorInfoVo.setColorEnglishName(colorEnglishNames.getFirst().getName());
                }
                colorInfoVoList.add(colorInfoVo);
            }
        }
        return colorInfoVoList;
    }

    private DesignStyle fillUpdateSpu(Map<String, DesignStyle> spuMap, DesignExcelDTO dto, List<Shop> shopList, List<DictVo> dictValues) {
        final var spu = spuMap.get(dto.getStyleCode());
        final var updateSpu = new DesignStyle();
        BeanUtils.copyProperties(spu, updateSpu);
        updateSpu.setDesignStyleId(spu.getDesignStyleId());
        if (StringUtils.isNotBlank(dto.getCategoryCode())) {
            updateSpu.setCategoryCode(dto.getCategoryCode());
        }
        if (StringUtils.isNotBlank(dto.getCategoryName())) {
            updateSpu.setCategoryName(dto.getCategoryName());
        }
        //款式标签 原本有值，表格有值时更新，无值时忽略
        if (StringUtils.isNotBlank(dto.getStyleLabelName()) && !StringUtils.equals(spu.getStyleLabelName(), dto.getStyleLabelName())) {
            updateSpu.setStyleLabelCode(getDictCode(dictValues, "product_tag", dto.getStyleLabelName()));
            updateSpu.setStyleLabelName(dto.getStyleLabelName());
        }
        //店铺
        if (StringUtils.isNotBlank(dto.getStoreName()) && CollectionUtil.isNotEmpty(shopList)) {
            Map<String, List<Shop>> shopMap = shopList.stream().collect(Collectors.groupingBy(Shop::getShopName));
            if (shopMap.containsKey(dto.getStoreName())) {
                updateSpu.setStoreId(shopMap.get(dto.getStoreName()).getFirst().getShopId());
            }
            updateSpu.setStoreName(dto.getStoreName());
        }
        //尺码组
        if (StringUtils.isBlank(spu.getSizeStandardName()) && StringUtils.isNotBlank(dto.getSizeStandardName())) {
            updateSpu.setSizeStandardCode(getDictCode(dictValues, "plm_standard_size", dto.getSizeStandardName()));
            updateSpu.setSizeStandardName(dto.getSizeStandardName());
        }
        //波段
        if (StringUtils.isNotBlank(dto.getWaveBandName()) && !StringUtils.equals(spu.getWaveBandName(), dto.getWaveBandName())) {
            updateSpu.setWaveBandCode(getDictCode(dictValues, "plm_clothing_band", dto.getWaveBandName()));
            updateSpu.setWaveBandName(dto.getWaveBandName());
        }
        //款式级别
        if (StringUtils.isNotBlank(dto.getStyleLevelName()) && !StringUtils.equals(spu.getStyleLevelName(), dto.getStyleLevelName())) {
            updateSpu.setStyleLevelCode(getDictCode(dictValues, "product_level", dto.getStyleLevelName()));
            updateSpu.setStyleLevelName(dto.getStyleLevelName());
        }
        //品质等级
        if (StringUtils.isNotBlank(dto.getQualityLevelName()) && !StringUtils.equals(spu.getQualityLevelName(), dto.getQualityLevelName())) {
            updateSpu.setQualityLevelCode(getDictCode(dictValues, "plm_quality_level", dto.getQualityLevelName()));
            updateSpu.setQualityLevelName(dto.getQualityLevelName());
        }
        //织造方式
        if (StringUtils.isNotBlank(dto.getWeaveModeName()) && !StringUtils.equals(spu.getWeaveModeName(), dto.getWeaveModeName())) {
            updateSpu.setWeaveModeCode(getDictCode(dictValues, "aps_category_type", dto.getWeaveModeName()));
            updateSpu.setWeaveModeName(dto.getWeaveModeName());
        }
        //项目类型
        if (StringUtils.isNotBlank(dto.getProjectTypeName()) && !StringUtils.equals(spu.getProjectTypeName(), dto.getProjectTypeName())) {
            updateSpu.setProjectTypeCode(getDictCode(dictValues, "plm_productType", dto.getProjectTypeName()));
            updateSpu.setProjectTypeName(dto.getProjectTypeName());
        }
        //风格
        if (StringUtils.isNotBlank(dto.getClothingStyleName()) && !StringUtils.equals(spu.getClothingStyleName(), dto.getClothingStyleName())) {
            updateSpu.setClothingStyleCode(getDictCode(dictValues, "product_style", dto.getClothingStyleName()));
            updateSpu.setClothingStyleName(dto.getClothingStyleName());
        }
        //印花类型
        if (StringUtils.isNotBlank(dto.getPrintingName()) && !StringUtils.equals(spu.getPrintingName(), dto.getPrintingName())) {
            updateSpu.setPrintingCode(getDictCode(dictValues, "fd-printing", dto.getPrintingName()));
            updateSpu.setPrintingName(dto.getPrintingName());
        }
        //季节
        if (StringUtils.isNotBlank(dto.getSeasonName()) && !StringUtils.equals(spu.getSeasonName(), dto.getSeasonName())) {
            updateSpu.setSeasonCode(getDictCode(dictValues, "plm_reference_season", dto.getSeasonName()));
            updateSpu.setSeasonName(dto.getSeasonName());
        }
        //节日
        if (StringUtils.isNotBlank(dto.getGalaName()) && !StringUtils.equals(spu.getGalaName(), dto.getGalaName())) {
            updateSpu.setGalaCode(getDictCode(dictValues, "festival", dto.getGalaName()));
            updateSpu.setGalaName(dto.getGalaName());
        }
        //版型
        if (StringUtils.isNotBlank(dto.getPatternName()) && !StringUtils.equals(spu.getPatternName(), dto.getPatternName())) {
            updateSpu.setPatternCode(getDictCode(dictValues, "fit", dto.getPatternName()));
            updateSpu.setPatternName(dto.getPatternName());
        }
        //弹性
        if (StringUtils.isNotBlank(dto.getElasticName()) && !StringUtils.equals(spu.getElasticName(), dto.getElasticName())) {
            updateSpu.setElasticCode(getDictCode(dictValues, "plm_elastic_requirement", dto.getElasticName()));
            updateSpu.setElasticName(dto.getElasticName());
        }
        //场景
        if (StringUtils.isNotBlank(dto.getSceneName()) && !StringUtils.equals(spu.getSceneName(), dto.getSceneName())) {
            updateSpu.setSceneCode(getDictCode(dictValues, "scenes", dto.getSceneName()));
            updateSpu.setSceneName(dto.getSceneName());
        }
        //视觉形式
        if (StringUtils.isNotBlank(dto.getVisualFormName()) && !StringUtils.equals(spu.getVisualFormName(), dto.getVisualFormName())) {
            updateSpu.setVisualFormCode(getDictCode(dictValues, "visual_style", dto.getVisualFormName()));
            updateSpu.setVisualFormName(dto.getVisualFormName());
        }
        //SKU分类
        if (StringUtils.isNotBlank(dto.getSkuClassName()) && !StringUtils.equals(spu.getSkuClassName(), dto.getSkuClassName())) {
            updateSpu.setSkuClassCode(getDictCode(dictValues, "SKU_CLASSIFICATION", dto.getSkuClassName()));
            updateSpu.setSkuClassName(dto.getSkuClassName());
        }
        //套装件数
        if (null != dto.getSuitPiece()) {
            updateSpu.setSuitPiece(dto.getSuitPiece());
        }
        //款式类型
        if (StringUtils.isNotBlank(dto.getDesignTypeName()) && !StringUtils.equals(spu.getDesignTypeName(), dto.getDesignTypeName())) {
            updateSpu.setDesignTypeCode(getDictCode(dictValues, "styleType", dto.getDesignTypeName()));
            updateSpu.setDesignTypeName(dto.getDesignTypeName());
        }
        //商品链接
        if (StringUtils.isNotBlank(dto.getCommodityLink())) {
            updateSpu.setCommodityLink(dto.getCommodityLink());
        }
        return updateSpu;
    }


    private DesignStyle fillSpu(DesignExcelDTO dto, List<Shop> shopList, List<DictVo> dictValues, List<DesignStyle> spuList) {
        final var designStyle = new DesignStyle();
        BeanUtils.copyProperties(dto, designStyle);
        designStyle.setDesignStyleId(IdHelper.getId());
        designStyle.setStyleStatus(StyleStatusEnum.WAIT_SUBMIT.getCode());
        designStyle.setTaskSource("upload");
        designStyle.setMessage("导入旧的PLM款式操作");
        //款式标签
        if (StringUtils.isNotBlank(dto.getStyleLabelName())) {
            designStyle.setStyleLabelCode(getDictCode(dictValues, "product_tag", dto.getStyleLabelName()));
        }
        //店铺
        if (StringUtils.isNotBlank(dto.getStoreName()) && CollectionUtil.isNotEmpty(shopList)) {
            Map<String, List<Shop>> shopMap = shopList.stream().collect(Collectors.groupingBy(Shop::getShopName));
            if (shopMap.containsKey(dto.getStoreName())) {
                designStyle.setStoreId(shopMap.get(dto.getStoreName()).getFirst().getShopId());
            }
        }
        //尺码组
        if (StringUtils.isNotBlank(dto.getSizeStandardName())) {
            designStyle.setSizeStandardCode(getDictCode(dictValues, "plm_standard_size", dto.getSizeStandardName()));
        }
        //波段
        if (StringUtils.isNotBlank(dto.getWaveBandName())) {
            designStyle.setWeaveModeCode(getDictCode(dictValues, "plm_clothing_band", dto.getWaveBandName()));
        }
        //款式级别
        if (StringUtils.isNotBlank(dto.getStyleLevelName())) {
            designStyle.setStyleLevelCode(getDictCode(dictValues, "product_level", dto.getStyleLevelName()));
        }
        //品质等级
        if (StringUtils.isNotBlank(dto.getQualityLevelName())) {
            designStyle.setQualityLevelCode(getDictCode(dictValues, "plm_quality_level", dto.getQualityLevelName()));
        }
        //织造方式
        if (StringUtils.isNotBlank(dto.getWeaveModeName())) {
            designStyle.setWeaveModeCode(getDictCode(dictValues, "aps_category_type", dto.getWeaveModeName()));
        }
        //项目类型
        if (StringUtils.isNotBlank(dto.getProjectTypeName())) {
            designStyle.setProjectTypeCode(getDictCode(dictValues, "plm_productType", dto.getProjectTypeName()));
        }
        //风格
        if (StringUtils.isNotBlank(dto.getClothingStyleName())) {
            designStyle.setClothingStyleCode(getDictCode(dictValues, "product_style", dto.getClothingStyleName()));
        }
        //印花类型
        if (StringUtils.isNotBlank(dto.getPrintingName())) {
            designStyle.setPrintingCode(getDictCode(dictValues, "fd-printing", dto.getPrintingName()));
        }
        //季节
        if (StringUtils.isNotBlank(dto.getSeasonName())) {
            designStyle.setSeasonCode(getDictCode(dictValues, "plm_reference_season", dto.getSeasonName()));
        }
        //节日
        if (StringUtils.isNotBlank(dto.getGalaName())) {
            designStyle.setGalaCode(getDictCode(dictValues, "festival", dto.getGalaName()));
        }
        //版型
        if (StringUtils.isNotBlank(dto.getPatternName())) {
            designStyle.setPatternCode(getDictCode(dictValues, "fit", dto.getPatternName()));
        }
        //弹性
        if (StringUtils.isNotBlank(dto.getElasticName())) {
            designStyle.setElasticCode(getDictCode(dictValues, "plm_elastic_requirement", dto.getElasticName()));
        }
        //场景
        if (StringUtils.isNotBlank(dto.getSceneName())) {
            designStyle.setSceneCode(getDictCode(dictValues, "scenes", dto.getSceneName()));
        }
        //视觉形式
        if (StringUtils.isNotBlank(dto.getVisualFormName())) {
            designStyle.setVisualFormCode(getDictCode(dictValues, "visual_style", dto.getVisualFormName()));
        }
        //SKU分类
        if (StringUtils.isNotBlank(dto.getSkuClassName())) {
            designStyle.setSkuClassCode(getDictCode(dictValues, "SKU_CLASSIFICATION", dto.getSkuClassName()));
        }
        //套装件数
        if (null != dto.getSuitPiece()) {
            designStyle.setSuitPiece(dto.getSuitPiece());
        }
        //款式类型
        if (StringUtils.isNotBlank(dto.getDesignTypeName())) {
            designStyle.setDesignTypeCode(getDictCode(dictValues, "styleType", dto.getDesignTypeName()));
            designStyle.setDesignTypeName(dto.getDesignTypeName());
        }
        if (StringUtils.isNotBlank(dto.getDesignerName())) {
            final var designers = SdpMaterialDesignerApi.selectByDesignerName(dto.getDesignerName());
            if (CollectionUtil.isNotEmpty(designers)) {
                designStyle.setDesignerId(designers.getFirst().getDesignerId());
            }
        }
        designStyle.setTenantId(SsoContext.tenantId());
        spuList.add(designStyle);

        return designStyle;
    }

    public String getDictCode(List<DictVo> dictValues, String dictCode, String dictName) {
        final var dict = dictValues.stream().filter(t -> t.getDictCode().equals(dictCode)).toList();
        if (CollectionUtil.isNotEmpty(dict)) {
            final var dictValue = Objects.requireNonNull(dict.getFirst().getChildren()).stream().filter(t -> t.getDictName().equals(dictName)).toList();
            if (CollectionUtil.isNotEmpty(dictValue)) {
                return dictValue.getFirst().getDictCode();
            }
            return "";
        }
        return "";
    }

}