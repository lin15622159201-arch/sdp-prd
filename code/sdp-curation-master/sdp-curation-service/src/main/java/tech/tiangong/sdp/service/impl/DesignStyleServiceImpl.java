package tech.tiangong.sdp.service.impl;

import cn.hutool.core.collection.CollUtil;
import cn.hutool.core.collection.CollectionUtil;
import jakarta.annotation.Resource;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.BeanUtils;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import team.aikero.blade.core.enums.Bool;
import team.aikero.blade.sequence.id.IdHelper;
import team.aikero.blade.util.json.JsonsKt;
import tech.tiangong.sdp.amqp.DesignStyleMessageDTO;
import tech.tiangong.sdp.amqp.TaskMessageDTO;
import tech.tiangong.sdp.common.req.AiTaskCallbackReq;
import tech.tiangong.sdp.convert.DesignStyleConverter;
import tech.tiangong.sdp.convert.PrototypeConverter;
import tech.tiangong.sdp.entity.*;
import tech.tiangong.sdp.enums.DesignStyleMessageEnum;
import tech.tiangong.sdp.enums.PrototypeStatusEnum;
import tech.tiangong.sdp.enums.RabbitConfigEnum;
import tech.tiangong.sdp.repository.*;
import tech.tiangong.sdp.service.DesignStyleService;
import tech.tiangong.sdp.service.PrototypeService;
import tech.tiangong.sdp.util.FieldLabelMap;
import tech.tiangong.sdp.utils.SsoContext;
import tech.tiangong.sdp.vo.dto.DesignStyleUpdateDto;
import tech.tiangong.sdp.vo.dto.DesignerDTO;
import tech.tiangong.sdp.vo.req.DesignStyleCreateReq;
import tech.tiangong.sdp.vo.req.DesignStyleUpdateReq;
import tech.tiangong.sdp.vo.req.DesignerRemoteReq;
import tech.tiangong.sdp.vo.resp.DesignStyleCreateResp;
import tech.tiangong.sdp.vo.resp.DesignStyleFieldLogVO;
import tech.tiangong.sdp.vo.resp.DesignStyleVo;
import tech.tiangong.sdp.vo.resp.NormalSkcCreateResp;

import javax.validation.ValidationException;
import java.lang.reflect.Field;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.Set;
import java.util.stream.Collectors;

/**
 * 款式管理-SPU-Service
 *
 * @author ：liuhongfu
 * @version :1.0
 * @date ：2025/11/4 15:31
 */
@Slf4j
@Service
@RequiredArgsConstructor
public class DesignStyleServiceImpl extends DefaultTaskServiceImpl implements DesignStyleService {

    private final DesignStyleRepository designStyleRepository;
    private final PrototypeRepository prototypeRepository;
    private final DesignStyleMaterialRepository designStyleMaterialRepository;
    private final PlmStyleLogRepository plmStyleLogRepository;
    private final PlmSdpStyleRelaRepository plmSdpStyleRelaRepository;
    private final DesignStyleFieldLogRepository designStyleFieldLogRepository;
    @Lazy
    @Resource
    private PrototypeService prototypeService;

    final static Integer DESIGN_STYLE_MATERIAL_PICTURE_COUNT = 10;

    @Override
    public DesignStyleVo getLatestVersionByStyleId(Long designStyleId) {
        DesignStyle entity = designStyleRepository.getById(designStyleId);
        return this.entity2Vo(entity);
    }

    @Override
    public DesignStyleVo getLatestVersionByStyleCode(String designStyleCode) {
        DesignStyle entity = designStyleRepository.getByStyleCode(designStyleCode);
        return this.entity2Vo(entity);
    }


    @Override
    @Transactional(rollbackFor = Exception.class)
    public DesignStyleCreateResp createSpuSkc(DesignStyleCreateReq req) {
        validation();
        //校验入参
        var userContent = SsoContext.user();
        Long currentUserId = userContent.getId();

        //新增SPU并归档
        long designStyleId = IdHelper.getId();
        //String styleCode = BasicConvert.code(CodeRuleEnum.CLOTHING_SPU_CODE);
        String styleCode = null;
        Integer styleVersionNum = 1;

        final var designerRemoteReq = new DesignerRemoteReq();
        designerRemoteReq.setDesignerId(String.valueOf(currentUserId));

        List<DesignerDTO> currentUser = selectByDesignerIds(List.of(currentUserId));
        DesignStyle designStyleEo = DesignStyleConverter.buildSpuCreateEo(req, designStyleId, styleCode,
                styleVersionNum, currentUserId, currentUser.get(0));
        designStyleRepository.save(designStyleEo);

        //自动创建一个正常打版的SKC
        NormalSkcCreateResp patternMakingCreateResp = prototypeService.normalSkcCreate(designStyleEo);
        Long prototypeId = patternMakingCreateResp.getPrototypeId();
        String designCode = patternMakingCreateResp.getDesignCode();


        DesignStyleCreateResp resp = DesignStyleCreateResp.builder()
                .designStyleId(designStyleId)
                .versionNum(styleVersionNum)
                .prototypeId(prototypeId)
                .designCode(designCode)
                .build();
        //发送MQ给PLM
        pushMqGetPlmCode(designStyleEo);
        //封装返回对象
        return resp;
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public void updateSpu(DesignStyleUpdateReq req) {
        //1,校验
        DesignStyle designStyle = designStyleRepository.obtainById(req.getDesignStyleId(), "SPU不存在!");
        String styleCode = designStyle.getStyleCode();
        this.checkUpdateSpu(req, designStyle);

        var userContent = SsoContext.user();

        LocalDateTime now = LocalDateTime.now();
        Integer newVersionNum = designStyle.getVersionNum() + 1;

        //2,更新design_spu表, 要更新可以为null的字段: 参考链接;
        //注: 编辑spu不会更新设计师信息
        DesignStyleUpdateDto updateDto = DesignStyleConverter.buildDesignStyleUpdateDto(req, styleCode, newVersionNum, now);
        designStyleRepository.updateSpuInfo(updateDto, userContent);


        //4,根据spuCode更新所有prototype表与prototype_history表中SPU维度的信息
        prototypeService.updateSpuInfoWithinHistory(updateDto);

        //尺码组相应信息修改
        if (!Objects.equals(req.getSizeStandardCode(), designStyle.getSizeStandardCode())) {
            prototypeService.changeSizeStandardCode(updateDto);
        }

        //5,记录字段变更日志
        List<DesignStyleFieldLog> fieldLogs = buildFieldChangeLogs(designStyle, req, newVersionNum);
        if (CollUtil.isNotEmpty(fieldLogs)) {
            designStyleFieldLogRepository.saveBatch(fieldLogs);
        }

        log.info("=== 编辑SPU-成功: styleCode:{}; versionNum:{}; spuId:{} ===", designStyle.getStyleCode(), newVersionNum, designStyle.getDesignStyleId());
    }

    @Transactional(rollbackFor = Exception.class)
    @Override
    public String batchDevelop(DevelopStyleTask task) {
        log.info("开款任务创建款式管理-入参:\t{}", JsonsKt.toJsonPretty(task));
        final var spuAdd = DesignStyleConverter.buildDevelopSpuAdd(task);
        final var spuResp = createSpuSkc(spuAdd);
        final var spu = task.getSpus().getFirst();
        final var skcAdd = DesignStyleConverter.buildDevelopSkcAdd(task, spu, spuResp);
        prototypeService.save(skcAdd, true);

        return spuResp.getStyleCode();
    }

    private void pushMqGetPlmCode(final DesignStyle style) {
        final var skcList = prototypeRepository.getListByDesignStyleId(style.getDesignStyleId());
        final var allRelaList = PrototypeConverter.buildStyleRela(style,skcList);
        plmSdpStyleRelaRepository.saveBatch(allRelaList.getLeft());
        plmStyleLogRepository.save(allRelaList.getRight());
        this.send(allRelaList.getRight(), JsonsKt.toJson(new TaskMessageDTO(allRelaList.getRight().getLogId())), RabbitConfigEnum.PUSH_PLM_STYLE);
    }

    /*@Override
    public void updateMaterialByImageTask(String spuCode, List<String> pictures, List<String> skcIds,Integer taskType, List<ImageUpdatePicture> images,
                                          ImageUpdateTaskCheckReq req) {
        req.getSkcList();
        final var skcPictures = prototypeRepository.getListByStyleCode(spuCode);


        final var pictureUrls = images.stream().map(ImageUpdatePicture::getPictureUrl).toList();
        //先查出来在替换，为了不改变图片得顺序问题
        final var exitPictures = designStyleMaterialRepository.listByStyleCodesAndType(List.of(spuCode),taskType);
        final var addList = new ArrayList<DesignStyleMaterial>();
        final var spu = designStyleRepository.getByStyleCode(spuCode);
        if (null == spu) {
            throw new ValidationException("SPU信息不存在，SPU编码：" + spuCode);
        }
        Boolean isAdd = false;
        for (DesignStyleMaterial material : exitPictures) {
            if (pictureUrls.contains(material.getMaterialUrl())) {
                if (isAdd) {
                    continue;
                }
                addList.addAll(PrototypeConverter.buildUpdateMaterialInfo(spuCode, pictures, taskType, spu.getDesignStyleId()));
                isAdd = true;
            } else {
                addList.addAll(PrototypeConverter.buildUpdateMaterialInfo(spuCode, List.of(material.getMaterialUrl()), taskType, spu.getDesignStyleId()));
            }
        }
        designStyleMaterialRepository.deletedByStyleCodesAndType(List.of(spuCode), taskType);
        if (CollectionUtil.isNotEmpty(addList)) {
            designStyleMaterialRepository.saveBatch(addList);
        }
        //skc升版本
        prototypeService.addVersionNumAndPushPlm(spuCode);
    }*/

    @Override
    public void pickingPushPictureToDesignStyle(Long spuId, List<String> allPictures, String spuCode) {
       /* final var materialList = designStyleMaterialRepository
                .listByStyleIdsAndType(List.of(spuId), PrototypeMaterialTypeEnum.IMAGE.getCode());
        Set<String> existedUrls = materialList.stream()
                .map(DesignStyleMaterial::getMaterialUrl)
                .filter(Objects::nonNull)
                .collect(Collectors.toSet());
        int need = DESIGN_STYLE_MATERIAL_PICTURE_COUNT - materialList.size();
        List<String> addList = allPictures.stream()
                .filter(url -> !existedUrls.contains(url))
                .limit(need)
                .collect(Collectors.toList());
        if (addList.isEmpty()) {
            return;
        }
        final var materialAddList = PrototypeConverter.buildUpdateMaterialInfo(
                spuCode, addList, PrototypeMaterialTypeEnum.IMAGE.getCode(), spuId);
        if (CollectionUtil.isNotEmpty(materialAddList)) {
            designStyleMaterialRepository.saveBatch(materialAddList);
        }
        //skc升版本
        prototypeService.addVersionNumAndPushPlm(spuCode);*/
    }

    private void validation() {
        designer();
    }


    private void checkUpdateSpu(DesignStyleUpdateReq req, DesignStyle designStyle) {
        if (Objects.equals(designStyle.getVersionNum(), req.getVersionNum())) {
            throw new ValidationException("当前SPU已更新, 请刷新获取最新版本SPU信息后再编辑! ");
        }
        //当SPU下推送到待上架得SKC，不允许再次编辑尺码标准
        if (!Objects.equals(req.getSizeStandardCode(), designStyle.getSizeStandardCode())) {
            List<Prototype> prototypeList = prototypeRepository.listByStyleCode(designStyle.getStyleCode());
            if (CollUtil.isNotEmpty(prototypeList)) {
                final var pushProductList = prototypeList.stream()
                        .filter(item -> !item.canOnShelve()).toList();
                final var pushPlmList = prototypeList.stream()
                        .filter(item -> !item.push()).toList();
                final var onSaleList = prototypeList.stream()
                        .filter(Prototype::getIsOnSale).toList();
                if (CollectionUtil.isNotEmpty(pushProductList)) {
                    final var skcCodes = pushProductList.stream().map(Prototype::getDesignCode).toList();
                    String skcCodesStr = String.join(", ", skcCodes);
                    throw new ValidationException("SKC: " + skcCodesStr + " 已推送商品/PLM，不能编辑尺码组");
                }
                if ( CollectionUtil.isNotEmpty(pushPlmList) ) {
                    final var skcCodes = pushPlmList.stream().map(Prototype::getDesignCode).toList();
                    String skcCodesStr = String.join(", ", skcCodes);
                    throw new ValidationException("SKC: " + skcCodesStr + " 已推送商品/PLM，不能编辑尺码组");
                }
                if ( CollectionUtil.isNotEmpty(onSaleList) ) {
                    final var skcCodes = onSaleList.stream().map(Prototype::getDesignCode).toList();
                    String skcCodesStr = String.join(", ", skcCodes);
                    throw new ValidationException("SKC: " + skcCodesStr + " 已动销，不能编辑尺码组");
                }
            }
        }

        //当SPU下有已提交的SKC,不允许再次编辑尺码标准
       /* if (!Objects.equals(req.getSizeStandardCode(), designStyle.getSizeStandardCode())) {
            List<Prototype> prototypeList = prototypeRepository.listByStyleCode(designStyle.getStyleCode());
            if (CollUtil.isNotEmpty(prototypeList)) {
                Prototype prototype = prototypeList.stream()
                        .filter(item -> Objects.equals(PrototypeStatusEnum.DECOMPOSED.getCode(), item.getPrototypeStatus()))
                        .findFirst().orElse(null);
                if (Objects.nonNull(prototype)) {
                    throw new ValidationException("尺码标准不能修改, skc已提交:" + prototype.getDesignCode());
                }
            }
        }*/
    }

    @Override
    public List<DesignStyleFieldLogVO> getFieldLogs(Long designStyleId) {
        List<DesignStyleFieldLog> logs = designStyleFieldLogRepository.listByDesignStyleId(designStyleId);
        return logs.stream().map(log -> {
            DesignStyleFieldLogVO vo = new DesignStyleFieldLogVO();
            BeanUtils.copyProperties(log, vo);
            return vo;
        }).collect(Collectors.toList());
    }

    private DesignStyleVo entity2Vo(DesignStyle entity) {
        if (Objects.isNull(entity)) {
            return null;
        }
        DesignStyleVo vo = new DesignStyleVo();
        BeanUtils.copyProperties(entity, vo);
        return vo;
    }

    /**
     * 通过反射比较 {@link DesignStyleUpdateReq}（新值）与旧 {@link DesignStyle} 实体，
     * 返回有变更的字段日志列表。新增字段无需修改此方法。
     */
    private List<DesignStyleFieldLog> buildFieldChangeLogs(DesignStyle oldEntity, DesignStyleUpdateReq req,
                                                            Integer newVersionNum) {
        var userContent = SsoContext.user();
        String tenantId = SsoContext.tenantId();
        LocalDateTime now = LocalDateTime.now();
        List<DesignStyleFieldLog> logs = new ArrayList<>();

        Field[] reqFields = DesignStyleUpdateReq.class.getDeclaredFields();
        for (Field field : reqFields) {
            String fieldName = field.getName();
            if ("serialVersionUID".equals(fieldName)
                    || "designStyleId".equals(fieldName)
                    || "versionNum".equals(fieldName)) {
                continue;
            }

            Object newValue;
            Object oldValue;
            try {
                field.setAccessible(true);
                newValue = field.get(req);
                oldValue = getFieldValue(oldEntity, fieldName);
            } catch (Exception e) {
                log.warn("字段比较失败: {}", fieldName, e);
                continue;
            }

            if (Objects.equals(oldValue, newValue)) {
                continue;
            }

            DesignStyleFieldLog logEntry = new DesignStyleFieldLog();
            logEntry.setId(IdHelper.getId());
            logEntry.setDesignStyleId(oldEntity.getDesignStyleId());
            logEntry.setStyleCode(oldEntity.getStyleCode());
            logEntry.setVersionNum(newVersionNum);
            logEntry.setFieldName(fieldName);
            logEntry.setFieldLabel(FieldLabelMap.LABELS.getOrDefault(fieldName, fieldName));
            logEntry.setOldValue(oldValue == null ? "" : String.valueOf(oldValue));
            logEntry.setNewValue(newValue == null ? "" : String.valueOf(newValue));
            logEntry.setTenantId(tenantId);
            logEntry.setCreatorId(userContent.getId());
            logEntry.setCreatorName(userContent.getName());
            logEntry.setCreateTime(now);
            logs.add(logEntry);
        }
        return logs;
    }

    /**
     * 反射获取字段值，req与entity字段名一致则直接取；不一致时在entity中查找同名字段。
     */
    private Object getFieldValue(DesignStyle entity, String fieldName) {
        try {
            Field entityField = DesignStyle.class.getDeclaredField(fieldName);
            entityField.setAccessible(true);
            return entityField.get(entity);
        } catch (NoSuchFieldException e) {
            return null;
        } catch (Exception e) {
            log.warn("获取entity字段值失败: {}", fieldName, e);
            return null;
        }
    }

    @Override
    public void job() {

    }

    @Override
    public void callback(AiTaskCallbackReq req) {

    }
}
