package tech.tiangong.sdp.convert;

import cn.hutool.core.bean.BeanUtil;
import cn.hutool.core.collection.CollUtil;
import cn.hutool.core.collection.CollectionUtil;
import cn.hutool.core.util.StrUtil;
import cn.hutool.extra.spring.SpringUtil;
import com.alibaba.fastjson2.JSON;
import com.baomidou.mybatisplus.core.toolkit.CollectionUtils;
import com.baomidou.mybatisplus.core.toolkit.StringUtils;
import com.zjkj.aigc.common.exception.BaseBizException;
import lombok.experimental.UtilityClass;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.tuple.Pair;
import org.springframework.beans.BeanUtils;
import team.aikero.admin.common.vo.AttributeVo;
import team.aikero.admin.common.vo.DictVo;
import team.aikero.admin.common.vo.LabelVo;
import team.aikero.blade.core.enums.Bool;
import team.aikero.blade.sequence.id.IdHelper;
import team.aikero.blade.util.json.JsonsKt;
import tech.tiangong.butted.common.req.MulfeatExtractTaskReq;
import tech.tiangong.butted.common.req.base.CompanyUserBatchReq;
import tech.tiangong.butted.common.vo.LabelValueVo;
import tech.tiangong.butted.common.vo.PredLabelVo;
import tech.tiangong.sdp.config.DomainProperties;
import tech.tiangong.sdp.entity.*;
import tech.tiangong.sdp.enums.*;
import tech.tiangong.sdp.external.CustomerApi;
import tech.tiangong.sdp.external.DictClientExternal;
import tech.tiangong.sdp.external.DictValueRemoteHelper;
import tech.tiangong.sdp.external.PlmConvertHelper;
import tech.tiangong.sdp.util.StreamUtil;
import tech.tiangong.sdp.utils.SsoContext;
import tech.tiangong.sdp.vo.dto.*;
import tech.tiangong.sdp.vo.req.*;
import tech.tiangong.sdp.vo.resp.*;

import javax.validation.ValidationException;
import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

/**
 * 设计款管理转换器
 *
 * @author cenlijin
 * @date 2021/8/22 12:59
 */
@UtilityClass
@Slf4j
public class PrototypeConverter {

    private final DictClientExternal dictClientExternal = SpringUtil.getBean(DictClientExternal.class);
    private final DictValueRemoteHelper dictValueRemoteHelper = SpringUtil.getBean(DictValueRemoteHelper.class);
    private final static String CALLBACK = "/open/v1/design-style/callback/";

    private static final Map<String, String> PROJECT_TYPE_MAP = new HashMap<String, String>() {{
        put("01", "1");
        put("02", "2");
        put("03", "4");
    }};


    public static PrototypeQueryResp buildPageList(PrototypeQueryResp prototypeResp,
                                                   List<DesignStyle> styleList,
                                                   Map<Long, List<PrototypeMaterial>> materialMap, Map<Long, List<DesignerDTO>> designerMap) {
        Map<Long, DesignStyle> styleMap = StreamUtil.list2Map(styleList, DesignStyle::getDesignStyleId);
        boolean canMakeColor = Objects.equals(PrototypeStatusEnum.DECOMPOSED.getCode(), prototypeResp.getPrototypeStatus());
        prototypeResp.setCanMakeColor(canMakeColor ? Bool.YES.getCode() : Bool.NO.getCode());

        // spu信息
        DesignStyle designStyle = styleMap.get(prototypeResp.getDesignStyleId());
        log.info("SPU列表信息:\t{}", JsonsKt.toJsonPretty(styleMap));
        log.info("分页返回信息:\t{}", JsonsKt.toJsonPretty(prototypeResp));
        if (designStyle != null) {
            prototypeResp.setWaveBandCode(designStyle.getWaveBandCode());
            prototypeResp.setWaveBandName(designStyle.getWaveBandName());
            prototypeResp.setImageUpdateTaskId(designStyle.getImageUpdateTaskId());
            prototypeResp.setImageUpdateTaskCode(designStyle.getImageUpdateTaskCode());
            prototypeResp.setImageUpdateStatus(designStyle.getImageUpdateStatus());
            prototypeResp.setStoreId(designStyle.getStoreId());
            prototypeResp.setStoreName(designStyle.getStoreName());
            prototypeResp.setSceneName(designStyle.getSceneName());
            prototypeResp.setSceneCode(designStyle.getSceneCode());
            prototypeResp.setSourceBusinessId(designStyle.getSourceBusinessId());
            prototypeResp.setSourceBusinessCode(designStyle.getSourceBusinessCode());
            prototypeResp.setPlatformCode(designStyle.getPlatformCode());
            prototypeResp.setPlatformName(designStyle.getPlatformName());
            prototypeResp.setStyleLabelCode(designStyle.getStyleLabelCode());
            prototypeResp.setStyleLabelName(designStyle.getStyleLabelName());
            if (StringUtils.isNotBlank(designStyle.getStyleType())) {
                prototypeResp.setStyleType(DesignStyleTypeEnum.from(designStyle.getStyleType()));
            }
            List<PrototypeMaterial> materialList = materialMap.get(prototypeResp.getPrototypeId());
            if (CollectionUtil.isNotEmpty(materialList)) {
                List<PrototypeQueryResp.PrototypeMaterialInfo> materialInfoList = materialList.stream()
                        .map(m -> BeanUtil.copyProperties(m, PrototypeQueryResp.PrototypeMaterialInfo.class))
                        .collect(Collectors.toList());
                prototypeResp.setMaterialInfo(materialInfoList);
            }
            if (CollectionUtil.isNotEmpty(designerMap) && null != prototypeResp.getDesignerId() && designerMap.containsKey(prototypeResp.getDesignerId())) {
                List<DesignerDTO> designerDTOList = designerMap.get(prototypeResp.getDesignerId());
                prototypeResp.setDesignerId(designerDTOList.get(0).getDesignerId());
                prototypeResp.setDesignerName(designerDTOList.get(0).getDesignerName());
                prototypeResp.setDesignerGroup(designerDTOList.get(0).getDesignerGroupName());
            }
        }
        return prototypeResp;
    }

    /**
     * 组装req到Prototype
     */
    public static void composePrototypeReqToPrototype(PrototypeOperateReq prototypeReq, Prototype prototype) {
        prototype.setColor(prototypeReq.getColor());
    }

    /**
     * 组装req到PrototypeHistory
     */
    public static void composePrototypeReqToPrototypeHistory(PrototypeOperateReq prototypeReq, PrototypeHistory prototypeHistoryNew) {
        prototypeHistoryNew.setMakeSameDesignCode(prototypeReq.getMakeSameDesignCode());
        prototypeHistoryNew.setColor(prototypeReq.getColor());
    }

    /**
     * 编辑或创建设计单，转换到PrototypeDetail
     */
    public static PrototypeDetail convertPrototypeDetail(PrototypeDetail prototypeDetail, PrototypeOperateReq req) {
        BeanUtils.copyProperties(req, prototypeDetail);
        if (CollectionUtil.isNotEmpty(req.getDesignPicture())) {
            prototypeDetail.setDesignPicture(StrUtil.join(StrUtil.COMMA, req.getDesignPicture()));
        } else {
            prototypeDetail.setDesignPicture("");
        }
        List<PrototypeOperateReq.ColorInfoReq> colorInfoReqList = req.getColorInfoList();
        if (CollUtil.isNotEmpty(colorInfoReqList)) {
            List<ColorInfoVo> colorInfoVoList = colorInfoReqList.stream().map(item -> {
                ColorInfoVo colorInfoVo = new ColorInfoVo();
                BeanUtils.copyProperties(item, colorInfoVo);
                return colorInfoVo;
            }).collect(Collectors.toList());
            prototypeDetail.setColorInfoList(colorInfoVoList);
        }
        return prototypeDetail;
    }


    public static List<PrototypeMaterial> buildMaterialInfo(List<PrototypeOperateReq.PrototypeMaterialInfo> materialInfo, Prototype prototype) {
        return materialInfo.stream()
                .map(source -> {
                    PrototypeMaterial material = new PrototypeMaterial();
                    material.setPrototypeMaterialId(IdHelper.getId());
                    material.setDesignStyleId(prototype.getDesignStyleId());
                    material.setStyleCode(source.getStyleCode());
                    material.setPrototypeId(prototype.getPrototypeId());
                    material.setDesignCode(prototype.getDesignCode());
                    material.setMaterialUrl(source.getMaterialUrl());
                    material.setMaterialType(source.getMaterialType());
                    material.setTenantId(SsoContext.tenantId());
                    return material;
                })
                .collect(Collectors.toList());
    }


    public static Prototype buildColorsPrototype(Prototype prototype, long id, DesignerDTO designerDTO, long colorPrototypeId, String colorDesignCode) {
        Prototype colorPrototype = new Prototype();
        BeanUtils.copyProperties(prototype, colorPrototype);
        colorPrototype.setPushPlmStatus(PushPlmStatusEnum.WAIT_PUSH.getCode());
        colorPrototype.setPushPlmResultMessage("");
        colorPrototype.setPrototypeId(colorPrototypeId);
        colorPrototype.setDesignCode(colorDesignCode);
        colorPrototype.setMakeSameDesignCode(prototype.getDesignCode());
        //是否动销置为null
        colorPrototype.setIsOnSale(null);
        //参考款号置为null, 正常款才有
        colorPrototype.setReferenceDesignCode(null);
        //设计师为复色发起人
        colorPrototype.setDesignerId(id);
        colorPrototype.setDesignerCode(designerDTO.getDesignerCode());
        colorPrototype.setDesignerName(designerDTO.getDesignerName());
        colorPrototype.setCreatorId(null);
        colorPrototype.setCreatorName(null);
        colorPrototype.setCreatedTime(null);
        colorPrototype.setReviserId(null);
        colorPrototype.setReviserName(null);
        colorPrototype.setRevisedTime(null);
        colorPrototype.setDisassemblyFinished(Bool.NO.getCode());
        colorPrototype.setDisassemblyFinishedTime(null);
        return colorPrototype;
    }

    public static ClothingCodeBatchGenerateReq buildPullPlmStyleCode(Long spuId, String styleCode, Boolean isCreateSpu, Integer count) {
        ClothingCodeBatchGenerateReq req = new ClothingCodeBatchGenerateReq();
        req.setSourceEnum("DESIGN");
        req.setSpuCodes(List.of(
                new ClothingCodeBatchGenerateReq.ClothingCodeGenerateReq() {{
                    setKey(String.valueOf(spuId));
                    setCreateNewSpu(isCreateSpu);
                    setDesignCodeCount(count);
                    setStyleCode(styleCode);
                }}
        ));
        return req;
    }

    public static ClothingCodeBatchGenerateReq buildPullPlmStyleCodeBatch(Long spuId,String styleCode,Boolean isCreateSpu,Integer count) {
        ClothingCodeBatchGenerateReq req = new ClothingCodeBatchGenerateReq();
        req.setSourceEnum("DESIGN");
        List<ClothingCodeBatchGenerateReq.ClothingCodeGenerateReq> spuCodeList = new ArrayList<>();
        for (int i = 0; i < count; i++) {
            spuCodeList.add(new ClothingCodeBatchGenerateReq.ClothingCodeGenerateReq() {{
                setKey(String.valueOf(spuId));
                setCreateNewSpu(isCreateSpu);
                setDesignCodeCount(1);
                setStyleCode(styleCode);
            }});
        }
        req.setSpuCodes(spuCodeList);
        return req;
    }

    public static Pair<PlmSdpStyleRela, PlmSdpStyleRela> buildRela(DesignStyle style, List<Prototype> skcList) {
        PlmSdpStyleRela spu = new PlmSdpStyleRela();
        spu.setTaskId(style.getDesignStyleId());
        spu.setParentId(0L);
        PlmSdpStyleRela skc = new PlmSdpStyleRela();
        skc.setTaskId(skcList.get(0).getPrototypeId());
        skc.setParentId(style.getDesignStyleId());
        return Pair.of(spu, skc);
    }


    public static BatchCancelDesignCodeReq buildNotifyPlmCancelReq(PrototypeCancelReq cancelReq, PrototypeVo prototype) {
        BatchCancelDesignCodeReq resp = new BatchCancelDesignCodeReq();
        resp.setCancelItems(List.of(
                new BatchCancelDesignCodeReq.CancelDesignCodeReq() {{
                    setDesignCode(prototype.getDesignCode());
                    setCancelReason(cancelReq.getCancelReason());
                    setCancelRemark(cancelReq.getCancelRemark());
                }}
        ));
        return resp;
    }


    public static PrototypePullReq skcPullReq(DesignStyle spu, Prototype skc, List<PrototypeMaterial> material,
                                              Map<Long, List<PrototypeDetail>> skcDetailMap) {
        PrototypePullReq req = new PrototypePullReq();
        final var skcDetail = skcDetailMap.get(skc.getPrototypeId());
        BeanUtils.copyProperties(skc, req);
        req.setSampleType(plmSampleType(skc));
        req.setSpecialTag(List.of("sdp_y2"));
        //款式风格--固定值：活力休闲 / 时尚休闲
        req.setClothingStyle("活力休闲 / 时尚休闲");
        if (null != skcDetail) {
            final var colorInfo = skcDetail.getFirst().getColorInfoList();
            //拿第一个给PLM
            final var color = getPlmColor(colorInfo);
            //plm的颜色编码塞在remark字段
            req.setColorCode(color.getRemark());
            req.setColor(color.getName());
            if (StringUtils.isNotBlank(skcDetail.getFirst().getDesignPicture())) {
                req.setDesignPicture(StrUtil.splitTrim(skcDetail.getFirst().getDesignPicture(), StrUtil.COMMA));
            }
            req.setRemark(skcDetail.getFirst().getTypeRemark());
            req.setTypeRemark(skcDetail.getFirst().getTypeRemark());
            req.setCuttingRemark(skcDetail.getFirst().getCuttingRemark());
            req.setSewingRemark(skcDetail.getFirst().getSewingRemark());
        }
        if (CollectionUtil.isNotEmpty(material)) {
            //营销图---取SDP【商品图】
            final var pictures = material.stream()
                    .filter(it -> it.getMaterialType() == 0)
                    .sorted(Comparator.comparing(PrototypeMaterial::getPrototypeMaterialId))
                    .map(PrototypeMaterial::getMaterialUrl)
                    .collect(Collectors.toList());
            req.setMarketingPicture(pictures);
        }

       /* final var dictValueBatchListVo = dictValueRemoteHelper.getDictValueByCode(DictEnum.PLM_STANDARD_SIZE.getDictCode(), DictEnum.PLM_STANDARD_SIZE.getDesc());
        final Map<String, List<DictValueBatchListVo.DictValueVo>> map = BasicConvert.groupingBy(dictValueBatchListVo.getFirst().getDictValues(), DictValueBatchListVo.DictValueVo::getValue);
        if (!map.containsKey("天工尺码标准")) {
            throw new BaseBizException("PLM找不到天工尺码标准相关信息配置，请检查！");
        }
        final var list = map.get("天工尺码标准");
        //固定值：【天工尺码标准】
        req.setSizeStandard(list.getFirst().getValue());
        req.setSizeStandardCode(list.getFirst().getValueCode());
        */
        //尺码标准
        final var sizeStandardElement = PlmConvertHelper.getPlmDictValueVo(spu.getSizeStandardCode(), DictEnum.PLM_STANDARD_SIZE, DictEnum.PLM_STANDARD_SIZE);
        req.setSizeStandard(sizeStandardElement.getValue());
        req.setSizeStandardCode(sizeStandardElement.getValueCode());

        if (null != skcDetail) {
            req.setSampleSize(skcDetail.getFirst().getSampleSize());
            req.setIsSplicing(skcDetail.getFirst().getIsSplicing());
        }
        req.setSampleAmount("1");

        final var makeClothesType = skc.getMakeClothesType();
        //是否打版: false:不打版，true:打版
        //制作方式：0-仅纸样 1-实物样 2-3D样，若选择"仅纸样"或"3D样"，则 isMakeClothing传false，否则true
        if (Objects.equals(makeClothesType, 1)) {
            req.setIsMakeClothing(true);
        } else if (Objects.equals(makeClothesType, 2)) {
            req.setIsMakeClothing(false);
        }
        //制作方式
        req.setMakeClothesType(makeClothesType);
        //前置拆版状态 0=否 1=是
        req.setSdpPreDisassemblyState(skc.getPreDisassemblyState());
        //以价开款 -- 固定值：50
        req.setPaymentAtPrice(50.0);
        return req;
    }

    private static AttributeVo getPlmColor(List<ColorInfoVo> colorInfo) {
        final var code = colorInfo.getFirst().getColorCode();
        final var color = dictClientExternal.getByDictCode(DictEnum.CLOTHING_COLOR, code);
        if (null == color) {
            throw new ValidationException("通过颜色编码找不到相应的颜色信息，请检查！，颜色编码：" + code);
        }
        assert color.getAttributes() != null;
        final var plmColor = color.getAttributes().stream().filter(it -> "YSSH".equals(it.getCode())).collect(Collectors.toList());
        if (CollectionUtil.isEmpty(plmColor)) {
            throw new ValidationException("还没配置PLM颜色映射值，请检查！，颜色名称：" + colorInfo.getFirst().getColor());
        }

        return plmColor.getFirst();
    }

    private static Integer plmSampleType(Prototype skc) {
        if (Objects.equals(skc.getSkcType(), SkcTypeEnum.NORMAL.getCode())) {
            return 2;
        }
        if (Objects.equals(skc.getSkcType(), SkcTypeEnum.COMPOUND_COLORS.getCode())) {
            return 3;
        }
        return 2;
    }

    public static final long DESIGNER_ID = 153645696;

    public static DesignStylePullReq stylePullReq(DesignStyle spu, Long designerId, Shop shop) {
        DesignStylePullReq stylePullReq = new DesignStylePullReq();
        BeanUtils.copyProperties(spu, stylePullReq, "styleType");
//        stylePullReq.setDesignerId(Objects.isNull(designerId) ? DESIGNER_ID : designerId);
        stylePullReq.setDesignerId(designerId);
        stylePullReq.setStyleType("OEM".equals(spu.getDesignTypeCode()) ? 1 : 6);


        //经讨论，传自建款
        stylePullReq.setSourceType(130);
        stylePullReq.setRegionId(4L);
        stylePullReq.setRegionName("广州");
        if (null != shop) {
            final var customerDetail = new CustomerIdInnerReq();
            customerDetail.setCustomerCode(shop.getSubjectCode());
            final var respCustomerDetail = CustomerApi.detail(customerDetail);
            stylePullReq.setPurchaserId(respCustomerDetail.getBaseInfo().getCustomerId());
            stylePullReq.setPurchaserCode(shop.getSubjectCode());
            stylePullReq.setPurchaserName(shop.getSubjectName());
            //
            if (Objects.equals(stylePullReq.getStyleType(), 1)) {
                final var brandChannelCooperationDetail = CustomerApi.brandChannelCooperationDetail(stylePullReq.getPurchaserId());
                final var brandList = brandChannelCooperationDetail.getBrandList();
                if (CollectionUtil.isEmpty(brandList)) {
                    throw new BaseBizException("CRM品牌信息未配置，请检查，客户ID：" + stylePullReq.getPurchaserId());
                }
                //品牌信息
                final var brand = brandList.getFirst();
                stylePullReq.setBrandId(brand.getBrandId());
                stylePullReq.setBrandName(brand.getBrandName());
                final var cooperationTypeList = brand.getCooperationModeList().stream().map(BrandInfoInnerVo.CooperationModeVo::getCooperationType).toList();
                //合作模式字典
                final var cooperationMode = PlmConvertHelper.getPlmDict("cooperation_mode");
                stylePullReq.setCooperationModeList(buildCooperationModeList(cooperationTypeList, cooperationMode));
            }
        }
        final var codeNamePair = new DesignStylePullReq.CodeNamePair();
        codeNamePair.setName("跨境电商");
        codeNamePair.setCode("cross_border_e-commerce");
        stylePullReq.setSaleChannelList(List.of(codeNamePair));

        // 品类映射 找出上面的所有层级结构
//        final var plmCategory = getCategory(spu.getCategoryCode(),spu.getCategoryLabels());
        final var plmCategoryList = PlmConvertHelper.plmCategoryList();
        final var codeList = StrUtil.split(spu.getCategoryCode(), "-");
        final var dictMap = BasicConvert.toMap(plmCategoryList, DictDTO::getId);
        final var categoryCode = new ArrayList<String>();
        final var categoryName = new ArrayList<String>();
        final var labelMap = PlmConvertHelper.mapLabel(spu.getCategoryLabels());
        final var defaultDict = new ArrayList<DictDTO>();
        final var categoryDict = new ArrayList<DictDTO>();
        PlmConvertHelper.plmCategory(plmCategoryList, codeList.getLast(), defaultDict, categoryDict,
                it -> PlmConvertHelper.plmCategoryFilterLabel(spu.getWeaveModeName(),
                        Objects.equals(0L, spu.getSourceBusinessId()), labelMap, it));
        PlmConvertHelper.filterDict(categoryDict, categoryCode, categoryName, dictMap);
        if (CollectionUtil.isEmpty(categoryCode)) {
            log.info("找不到品类,找默认标签\t{}", spu.getStyleCode());
            PlmConvertHelper.filterDict(defaultDict, categoryCode, categoryName, dictMap);
        }
//        if (CollectionUtil.isEmpty(Arrays.asList(plmCategory))){
        if (CollectionUtil.isEmpty(categoryCode)) {
            throw new BaseBizException("找不到品类映射的编码，品类编码：" + spu.getCategoryCode());
        }
//        log.info("要推向PLM的品类信息:\t{}", JsonsKt.toJsonPretty(plmCategory));
        stylePullReq.setCategory(StrUtil.join("-", BasicConvert.reverseList(categoryCode)));
        stylePullReq.setCategoryName(StrUtil.join("-", BasicConvert.reverseList(categoryName)));

        stylePullReq.setQualityLevel(spu.getQualityLevelName());
        //根据SDP【季节】，从NEST-plm_value取映射值，传文本
        final var season = PlmConvertHelper.getPlmDictValueVo(spu.getSeasonCode(), DictEnum.PLM_REFERENCE_SEASON, DictEnum.PLM_REFERENCE_SEASON);
        stylePullReq.setStyleSeasonList(buildPlmSeason(season));
        //廓形---传SDP【版型】，传文本
        final var plmTagMaterial = dictValueRemoteHelper.getDictValueByCode(DictEnum.PLM_TAG_MATERIAL.getDictCode(), DictEnum.PLM_TAG_MATERIAL.getDesc());
        final var kuoxingList = plmTagMaterial.getFirst().getDictValues().stream().filter(it -> "廓形".equals(it.getValue())).collect(Collectors.toList());
        if (CollectionUtil.isEmpty(kuoxingList)) {
            throw new BaseBizException("PLM找不到廓形相关信息配置，请检查,字典编码：" + DictEnum.PLM_TAG_MATERIAL.getDictCode());
        }
        final var children = plmTagMaterial.getFirst().getDictValues().stream()
                .filter(it -> it.getValueParentCode().equals(kuoxingList.getFirst().getValueCode())).toList();
        final var patternName = children.stream().filter(t -> t.getValue().equals(spu.getPatternName())).toList();
        if (CollectionUtil.isEmpty(patternName)) {
            throw new BaseBizException("PLM找不到廓形相关信息配置，请检查,字典名字：" + spu.getPatternName());
        }
        stylePullReq.setSilhouetteCode(patternName.getFirst().getValueCode());
        stylePullReq.setSilhouetteName(patternName.getFirst().getValue());

        stylePullReq.setWeaveMode(spu.getWeaveModeName());
        stylePullReq.setSdpDesignerId(spu.getDesignerId());
        stylePullReq.setSdpDesigner(spu.getDesignerName());


        //项目类型
        //final var productTag = PlmConvertHelper.productTag();
       /* final var productTagElement =
                productTag.stream().filter(it -> StrUtil.equalsIgnoreCase(spu.getStyleLabelCode(), it.getDictCode()))
                        .filter(it -> CollectionUtil.isNotEmpty(it.getAttributes()))
                        .flatMap(it -> it.getAttributes().stream())
                        .filter(it -> StrUtil.equalsIgnoreCase("plm_value", it.getCode()))
                        .map(AttributeVo::getName).findFirst().orElse("");*/
        stylePullReq.setProjectType(spu.getProjectTypeName());
        String originalCode = spu.getProjectTypeCode();
        String plmProjectTypeCode = PROJECT_TYPE_MAP.getOrDefault(originalCode, originalCode);
        stylePullReq.setProjectTypeCode(plmProjectTypeCode);

        final var sizeStandardElement = PlmConvertHelper.getPlmDictValueVo(spu.getSizeStandardCode(), DictEnum.PLM_STANDARD_SIZE, DictEnum.PLM_STANDARD_SIZE);
        stylePullReq.setSizeStandard(sizeStandardElement.getValue());
        stylePullReq.setSizeStandardCode(sizeStandardElement.getValueCode());
        /*final var dictValueBatchListVo = dictValueRemoteHelper.getDictValueByCode(DictEnum.PLM_STANDARD_SIZE.getDictCode(), DictEnum.PLM_STANDARD_SIZE.getDesc());
        if (null == dictValueBatchListVo) {
            throw new BaseBizException("字典尺码组信息没找相关配置，请检查！");
        }
        final Map<String, List<DictValueBatchListVo.DictValueVo>> map = BasicConvert.groupingBy(dictValueBatchListVo.getFirst().getDictValues(), DictValueBatchListVo.DictValueVo::getValue);
        if (!map.containsKey("天工尺码标准")) {
            throw new BaseBizException("PLM找不到天工尺码标准相关信息配置，请检查！");
        }
        final var list = map.get("天工尺码标准");
        //固定值：【天工尺码标准】
        stylePullReq.setSizeStandard(list.getFirst().getValue());
        stylePullReq.setSizeStandardCode(list.getFirst().getValueCode());*/

        //款式类别---固定值：大客户
        stylePullReq.setStyleCategory(Bool.YES.getCode());
        //款式来源---取SDP【款式等级】，去匹配PLM款式来源字典，传文本
        final var plmStyleSource = dictValueRemoteHelper.getDictValueByCode(DictEnum.PLM_STYLE_SOURCE.getDictCode(), DictEnum.PLM_STYLE_SOURCE.getDesc());
        final var styleSource = plmStyleSource.getFirst().getDictValues().stream().filter(it -> spu.getStyleLevelName().equals(it.getValue())).collect(Collectors.toList());
        if (CollectionUtil.isEmpty(styleSource)) {
            throw new BaseBizException("PLM找不到款式来源,名称为：" + spu.getStyleLevelName() + "的配置，请检查！");
        }
        stylePullReq.setStyleSourceCode(styleSource.getFirst().getValueCode());
        stylePullReq.setStyleSourceName(styleSource.getFirst().getValue());

        stylePullReq.setSuitAmount(1);
        final var standardList = dictValueRemoteHelper.getDictValueByCode(DictEnum.PLM_CLOTHING_EXECUTIVE_STANDARDS.getDictCode(), DictEnum.PLM_CLOTHING_EXECUTIVE_STANDARDS.getDesc());
        final Map<String, List<DictValueBatchListVo.DictValueVo>> standardsMap = BasicConvert.groupingBy(standardList.getFirst().getDictValues(), DictValueBatchListVo.DictValueVo::getValue);
        if (!standardsMap.containsKey("FZ/T81004-2022")) {
            throw new BaseBizException("PLM找不到执行标准,属性名字为FZ/T81004-2022相关信息配置，请检查！");
        }
        final var standardslist = standardsMap.get("FZ/T81004-2022");
        //执行标准---固定值：FZ/T81004-2022
        stylePullReq.setPerformStandardCode(standardslist.getFirst().getValueCode());
        stylePullReq.setPerformStandardName(standardslist.getFirst().getValue());

        final var securityTypeVoList = dictValueRemoteHelper.getDictValueByCode(DictEnum.PLM_CLOTHING_SECURITY_TYPE.getDictCode(), DictEnum.PLM_CLOTHING_SECURITY_TYPE.getDesc());
        final Map<String, List<DictValueBatchListVo.DictValueVo>> securityTypeVoMap = BasicConvert.groupingBy(securityTypeVoList.getFirst().getDictValues(), DictValueBatchListVo.DictValueVo::getValue);
        if (!securityTypeVoMap.containsKey("GB 18401-2010 B类")) {
            throw new BaseBizException("PLM找不到安全类别,属性名字为GB 18401-2010 B类相关信息配置，请检查！");
        }
        final var securityTypeList = securityTypeVoMap.get("GB 18401-2010 B类");
        //安全类别 固定值：GB 18401-2010 B类
        stylePullReq.setSecurityCategoryCode(securityTypeList.getFirst().getValueCode());
        stylePullReq.setSecurityCategoryName(securityTypeList.getFirst().getValue());

        final var patternElement = PlmConvertHelper.getPlmDictValueVo(spu.getPrintingCode(), DictEnum.FD_PRINTING, DictEnum.PLM_PATTERN_ELEMENTS);
        //图案元素 根据SDP【印花类型】，从NEST-plm_value取映射值，传文本
        stylePullReq.setPatternElementCode(patternElement.getValueCode());
        stylePullReq.setPatternElementName(patternElement.getValue());
        //固定值：否
        stylePullReq.setSeedCoat(Bool.NO.getCode());
        return stylePullReq;
    }

    private static List<DesignStylePullReq.CodeNamePair> buildCooperationModeList(List<String> cooperationTypeList, DictValueBatchListVo cooperationMode) {
        final var valueCodeMap = cooperationMode.getDictValues().stream().collect(Collectors.groupingBy(DictValueBatchListVo.DictValueVo::getValueCode));
        List<DesignStylePullReq.CodeNamePair> result = new ArrayList<>();
        cooperationTypeList.forEach(t -> {
            DesignStylePullReq.CodeNamePair codeNamePair = new DesignStylePullReq.CodeNamePair();
            if (valueCodeMap.containsKey(t)) {
                final var dictValue = valueCodeMap.get(t).getFirst();
                codeNamePair.setCode(dictValue.getValueCode());
                codeNamePair.setName(dictValue.getValue());
                result.add(codeNamePair);
            }
        });
        return result;
    }

//    private static DictValueBatchListVo.DictValueVo getPlmDictValueVo(String code, DictEnum sdpDictCode, DictEnum plmDictCode) {
//        final var patternElement = PlmConvertHelper.listByDictCode(sdpDictCode);
//        final var children = patternElement.getChildren();
//        if (CollectionUtil.isEmpty(children)) {
//            throw new BaseBizException(sdpDictCode.getDesc() + "字典属性信息不存在");
//        }
//        final var print = children.stream().filter(it -> it.getDictCode().equals(code)).collect(Collectors.toList());
//        if (CollectionUtil.isEmpty(print)) {
//            throw new BaseBizException(sdpDictCode.getDesc() + "信息在字典不存在，编码：" + code);
//        }
//        final var attributes = print.getFirst().getAttributes();
//        if (CollectionUtil.isEmpty(attributes)) {
//            throw new BaseBizException(sdpDictCode.getDesc() + "相关属性信息没有配置，编码：" + code);
//        }
//        final var attribute = attributes.stream().filter(it -> it.getCode().equals(DictEnum.PLM_VALUE.getDictCode())).collect(Collectors.toList());
//        if (CollectionUtil.isEmpty(attribute)) {
//            throw new BaseBizException("PLM相关属性信息没有配置，编码：" + code);
//        }
//        final var name = attribute.getFirst().getName();
//        final var patternElementList = dictValueRemoteHelper.getDictValueByCode(plmDictCode.getDictCode(), plmDictCode.getDesc());
//        final var dictValues = patternElementList.getFirst().getDictValues();
//        if (CollectionUtil.isEmpty(dictValues)) {
//            throw new BaseBizException("PLM" + plmDictCode.getDesc() + "信息没配置属性信息,编码" + plmDictCode.getDictCode());
//        }
//        final var patternElements = dictValues.stream().filter(it -> it.getValue().equals(name)).collect(Collectors.toList());
//        if (CollectionUtil.isEmpty(patternElements)) {
//            throw new BaseBizException("PLM" + plmDictCode.getDesc() + "信息没配置" + plmDictCode.getDesc() + "属性信息");
//        }
//        return patternElements.getFirst();
//    }


//    private static String[] getCategory(String code, String categoryLabels) {
//        if (StringUtils.isBlank(code)){
//            throw new BaseBizException("品类信息为空，请检查！");
//        }
//        String categoryCode = code.substring(code.lastIndexOf("-") + 1);
//        //如果有标签，则编码+标签进行匹配
//        if (StringUtils.isNotBlank(categoryLabels)){
//            final var dictList = dictClientExternal.getLabelByAttribute(categoryCode);
//            if (CollectionUtil.isEmpty(dictList)){
//                throw new BaseBizException("通过属性查询字典标签信息不存在，编码：" + categoryCode);
//            }
//            for (DictVo dictVo : dictList){
//                String[] hit = matchCurrentNode(dictVo, categoryLabels);
//                if (hit != null && hit.length == 2) {
//                    String id = hit[0];
//                    final var dict =dictClientExternal.getParentTreeFromLeaf(Long.parseLong(id));
//                    if (null != dict){
//                        return extractPath(dict);
//                    }
//                }
//            }
//        }
//        //兜底用品类查询
//        final var dictVo = dictClientExternal.selectParentByAttribute(categoryCode,DictEnum.SDP_CATEGORY.getDesc());
//        if (null == dictVo) {
//            throw new BaseBizException("查询信息映射不存在，编码：" + categoryCode);
//        }
//        return extractPath(dictVo);
//    }


    public static String[] matchCurrentNode(DictVo node, String stdJson) {
        List<PredLabelVo> stdList = JSON.parseArray(stdJson, PredLabelVo.class);
        List<LabelVo> labels = node.getLabels();
        if (labels == null || labels.isEmpty()) {
            return null;
        }
        boolean allMatch = true;
        for (LabelVo lb : labels) {
            if (!matchOneLabel(lb, stdList)) {
                allMatch = false;
                break;
            }
        }
        if (allMatch) {
            return new String[]{String.valueOf(node.getId()), node.getDictName()};
        }
        return null;
    }

    private static boolean matchOneLabel(LabelVo lb, List<PredLabelVo> stdList) {
        String[] segments = lb.getLabelValue().split(";");
        for (String seg : segments) {
            if (!matchSingleSegment(seg.trim(), stdList)) {
                return false;
            }
        }
        return true;
    }

    /**
     * 对每一段 "字段名:值1,值2" 做匹配
     */
    private static boolean matchSingleSegment(String segment, List<PredLabelVo> stdList) {
        String[] kv = segment.split(":", 2);
        if (kv.length != 2) {
            return false;
        }

        String fieldName = kv[0].trim();
        Set<String> valuePool = Arrays.stream(kv[1].split(","))
                .map(String::trim)
                .filter(s -> !s.isEmpty())
                .collect(Collectors.toSet());

        PredLabelVo std = stdList.stream()
                .filter(a -> fieldName.equals(a.getCn().getName()))
                .findFirst()
                .orElse(null);
        if (std == null || std.getCn() == null) {
            return false;
        }

        Set<String> stdValueSet = flatNames(std.getCn());
        return valuePool.stream().anyMatch(stdValueSet::contains);
    }


    private static Set<String> flatNames(LabelValueVo vo) {
        Set<String> set = new HashSet<>();
        if (vo == null) {
            return set;
        }
        if (vo.getValues() != null && !vo.getValues().isEmpty()) {
            for (LabelValueVo child : vo.getValues()) {
                set.add(child.getName());
            }
        }
        return set;
    }

    public static String[] extractPath(DictVo root) {
        if (root.getChildren() == null || root.getChildren().size() != 1) {
            throw new BaseBizException("品类信息配置错误请检查！");
        }
        StringBuilder name = new StringBuilder();
        StringBuilder code = new StringBuilder();
        List<DictVo> cursor = root.getChildren();
        while (cursor != null && cursor.size() == 1) {
            DictVo n = cursor.get(0);
            if (name.length() > 0) {
                name.append('-');
                code.append('-');
            }
            name.append(n.getDictName());
            code.append(n.getDictCode());
            cursor = n.getChildren();
        }
        return new String[]{code.toString(), name.toString()};
    }

//    private static DictVo listByDictCode(DictEnum dict) {
//        final var dictVo = dictClientExternal.listByDictCode(dict.getDictCode());
//        if (null == dictVo) {
//            throw new BaseBizException(dict.getDesc() + "查询信息映射不存在，编码：" + dict.getDictCode());
//        }
//        return dictVo;
//    }


    private static List<DesignStylePullReq.CodeNamePair> buildPlmSeason(DictValueBatchListVo.DictValueVo dictValueVo) {
        List<DesignStylePullReq.CodeNamePair> list = new ArrayList<>();
        DesignStylePullReq.CodeNamePair codeName = new DesignStylePullReq.CodeNamePair();
        codeName.setCode(dictValueVo.getValueCode());
        codeName.setName(dictValueVo.getValue());
        list.add(codeName);
        return list;
    }

    public static PlmSdpStyleRela buildSkcRela(long colorPrototypeId, DesignStyle designStyle) {
        PlmSdpStyleRela rela = new PlmSdpStyleRela();
        rela.setTaskId(colorPrototypeId);
        rela.setParentId(designStyle.getDesignStyleId());
//        rela.setPlmTaskCode(colorDesignCode);
        return rela;
    }

    public static PlmStyleLog obtainLog(final Long styleId) {
        final var log = new PlmStyleLog();
        BasicConvert.entityInit(log, log::setLogId);
        log.setLogType(PlmStyleLogTypeEnum.CODE.getCode());
        log.setTaskId(styleId);
        log.setSkcId(0L);
        log.setPushStatus(Bool.NO.getCode());
        return log;
    }

    public static List<DesignStyle> convertOnShelve(List<DesignStyle> spuList, List<Prototype> skcList) {
        final var taskMap = BasicConvert.toMap(spuList, DesignStyle::getDesignStyleId);
        final var data = new ArrayList<DesignStyle>(spuList.size());
        skcList.stream()
                .filter(Prototype::canOnShelve)
                .filter(it -> taskMap.containsKey(it.getDesignStyleId()))
                .forEach(it -> {
                    final var task = taskMap.get(it.getDesignStyleId());
                    if (it.sdpCancel()) {
                        throw new ValidationException("SKC已经取消,不允许操作");
                    }
                    if (!it.isSubmit()) {
                        throw new ValidationException("款式资料状态是已提交才能进行推送上架操作！");
                    }
                    // 待上架
                    if (CollectionUtil.isEmpty(task.getSkcs())) {
                        task.setSkcs(new ArrayList<>());
                        data.add(task);
                    }
                    it.setListingStatus(PrototypeOnShelveEnum.WAIT_ON_SHELVE.getCode());
                    task.getSkcs().add(it);
                });
        return data;
    }

    public static StyleOnShelves convert(DesignStyle task, Map<Long, List<PrototypeMaterial>> prototypeMaterialMap, Map<Long, List<PrototypeDetail>> skcDetailMap, DevelopStyleTask developStyleTask) {
        final var e = new StyleOnShelves();
        BasicConvert.copy(task, e);
        e.setStyleId(task.getDesignStyleId());
        e.setStyleCode(task.getStyleCode());
        e.setDeveloperId(task.getDesignerId());
        e.setDeveloperName(task.getDesignerName());
        e.setCreatorId(SsoContext.userId());
        e.setCreatorName(SsoContext.username());
        e.setCreatedTime(LocalDateTime.now());
        e.setDesignerId(task.getDesignerId());
        e.setDesignerName(task.getDesignerName());
        if (null != developStyleTask) {
            e.setTransparency(developStyleTask.getTransparency());
            e.setFabricMaterial(developStyleTask.getFabricMaterial());
            e.setSpotStyleTypeName(developStyleTask.getClothingStyleName());
            if (StringUtils.isNotBlank(developStyleTask.getPatternData())) {
                e.setPattern(JsonsKt.parseJson(developStyleTask.getPatternData(), PatternDataDTO.class).result());
            }
            e.setCommodityLink(developStyleTask.getCommodityLink());
            e.setFabricTexture(developStyleTask.getFabricTexture());
            e.setTitleData(developStyleTask.getTitleData());
            if (StrUtil.isNotBlank(developStyleTask.getTitleData())) {
                Optional.ofNullable(JsonsKt.parseJson(developStyleTask.getTitleData(), FashionTitleAnalysisDTO.class))
                        .map(FashionTitleAnalysisDTO::getResult)
                        .ifPresent(it -> {
                            if (StringUtils.isNotBlank(it.getStyle())) {
                                e.setFabricStyle(StrUtil.split(it.getStyle(), "]").getLast());
                            }
                            if (StringUtils.isNotBlank(it.getDetails())) {
                                e.setDetails(it.getDetails().replaceAll("\\[\\d+]", ""));
                            }
                            e.setChineseTitle(it.getChineseTitle());
                            e.setEnglishTitle(it.getEnglishTitle());
                        });
            }
        }
        Optional.ofNullable(task.getTaskSource())
                .filter(StrUtil::isNotBlank)
                .map(s -> StrUtil.equalsIgnoreCase(s, DesignStyleSourceTypeEnum.USER_UPLOAD.getCode())
                        ? SourceTypeEnum.USER_UPLOAD.getVale()
                        : SourceTypeEnum.DEVELOP_STYLE.getVale())
                .ifPresent(e::setSourceType);
        if (StrUtil.isNotBlank(task.getCategoryLabels())) {
            final var map = PlmConvertHelper.mapLabel(task.getCategoryLabels());
            final var list = new ArrayList<String>();
            map.forEach((k, v) -> list.add(k + ":" + v));
            e.setUsableLabels(String.join(";", list));
        }
        if (StringUtils.isNotBlank(task.getStyleType())) {
            e.setStyleType(DesignStyleTypeEnum.from(task.getStyleType()).getVale());
        }
        final var pictures = new ArrayList<StyleSkcOnShelvesPicture>();
        //TODO 待删除
        /*if (CollectionUtil.isNotEmpty(task.getPictures())) {
            e.setMainImgUrl(task.getPictures().getFirst().getMaterialUrl());
            if (CollectionUtil.isNotEmpty(task.getPictures())) {
                final var styleAddPicture = spuConvertPicture(task);
                if (CollectionUtil.isNotEmpty(styleAddPicture)) {
                    pictures.addAll(styleAddPicture);
                }
            }
        }*/
        final var skcs = task.getSkcs();
        if (CollectionUtil.isNotEmpty(skcs)) {
            e.setSkcs(skcs.stream().map(it -> {
                final var skc = new SkcOnShelves();
                BasicConvert.copy(it, skc);
                skc.setSkcId(it.getPrototypeId());
                skc.setStyleId(it.getDesignStyleId());
                skc.setSkcCode(it.getDesignCode());
                //设计图
                if (skcDetailMap.containsKey(it.getPrototypeId())) {
                    final var skcDetail = skcDetailMap.get(it.getPrototypeId()).getFirst();
                    skc.setSizeName(skcDetail.getSampleSize());
                    skc.setSpliced(skcDetail.getIsSplicing() != null && skcDetail.getIsSplicing() ? 1 : 0);
                    if (StringUtils.isNotBlank(skcDetail.getDesignPicture())) {
                        final var pictureList = StrUtil.splitTrim(skcDetail.getDesignPicture(), StrUtil.COMMA);
                        skc.setMainImgUrl(pictureList.getFirst());
                        final var skcAddPicture = skcConvertPicture(task, it, pictureList);
                        if (CollectionUtil.isNotEmpty(skcAddPicture)) {
                            pictures.addAll(skcAddPicture);
                        }
                    }
                }
                //营销图
                if (prototypeMaterialMap.containsKey(it.getPrototypeId())) {
                    final var skcMaterial = prototypeMaterialMap.get(it.getPrototypeId());
                    final var skcMaterialAddPicture = skcMaterialConvertPicture(task, it, skcMaterial);
                    if (CollectionUtil.isNotEmpty(skcMaterialAddPicture)) {
                        pictures.addAll(skcMaterialAddPicture);
                    }
                }
                skc.setSizeStandardCode(task.getSizeStandardCode());
                skc.setSizeStandardName(task.getSizeStandardName());
                return skc;
            }).toList());
        }
        if (CollectionUtil.isNotEmpty(pictures)) {
            e.setPictures(pictures);
        }
        return e;
    }


    private static List<StyleSkcOnShelvesPicture> spuConvertPicture(DesignStyle task) {
        return task.getPictures().stream().map(t -> {
            final var stylePicture = new StyleSkcOnShelvesPicture();
            stylePicture.setPictureId(IdHelper.getId());
            stylePicture.setStyleId(task.getDesignStyleId());
            stylePicture.setSkcId(0L);
            stylePicture.setPictureType(PictureTypeEnum.PRODUCT_IMG.getCode());
            stylePicture.setMaterialType(t.getMaterialType());
            stylePicture.setPictureUrl(t.getMaterialUrl());
            stylePicture.setTenantId(SsoContext.tenantId());
            return stylePicture;
        }).toList();
    }

    private static List<StyleSkcOnShelvesPicture> skcMaterialConvertPicture(DesignStyle task, Prototype skc, List<PrototypeMaterial> skcMaterial) {
        return skcMaterial.stream().map(material -> {
            final var stylePicture = new StyleSkcOnShelvesPicture();
            stylePicture.setPictureId(IdHelper.getId());
            stylePicture.setStyleId(task.getDesignStyleId());
            stylePicture.setSkcId(skc.getPrototypeId());
            stylePicture.setPictureType(PictureTypeEnum.MARKETING_IMAGE.getCode());
            stylePicture.setMaterialType(material.getMaterialType());
            stylePicture.setPictureUrl(material.getMaterialUrl());
            stylePicture.setTenantId(SsoContext.tenantId());
            return stylePicture;
        }).toList();
    }

    private static List<StyleSkcOnShelvesPicture> skcConvertPicture(DesignStyle task, Prototype skc, List<String> pictureList) {
        return pictureList.stream().map(url -> {
            final var stylePicture = new StyleSkcOnShelvesPicture();
            stylePicture.setPictureId(IdHelper.getId());
            stylePicture.setStyleId(task.getDesignStyleId());
            stylePicture.setSkcId(skc.getPrototypeId());
            stylePicture.setPictureType(PictureTypeEnum.PRODUCT_IMG.getCode());
            stylePicture.setMaterialType(0);
            stylePicture.setPictureUrl(url);
            stylePicture.setTenantId(SsoContext.tenantId());
            return stylePicture;
        }).toList();
    }

    public static List<StyleSkcSku> convertSkuByQuery(List<BaseSkuResp> skuList, Prototype prototype) {
        return skuList.stream().map(t -> {
            final var sku = new StyleSkcSku();
            sku.setSkuId(IdHelper.getId());
            sku.setSkuCode(t.getBarcode());
            sku.setStyleId(prototype.getDesignStyleId());
            sku.setSkcId(prototype.getPrototypeId());
            sku.setGroupName(t.getGroupName());
            sku.setSizeName(t.getSizeName());
            return sku;
        }).toList();
    }

    public static List<StyleSkcSku> convertSku(DesignStyle style, Prototype skc, DictVo standardSize) {
        final var groupCode = style.getSizeStandardCode();
        final var sizeName = style.getSizeStandardName();
        if (StringUtils.isBlank(sizeName)) {
            return Collections.emptyList();
        }
        final var sampleSize = standardSize.getChildren().stream().filter(it -> StrUtil.equalsIgnoreCase(groupCode, it.getDictCode()))
                .filter(it -> CollectionUtil.isNotEmpty(it.getChildren()))
                .flatMap(it -> it.getChildren().stream())
                .map(DictVo::getDictName).findFirst().orElse("");
        final var group = standardSize.getChildren().stream().filter(it -> StrUtil.equalsIgnoreCase(groupCode, it.getDictCode()))
                .filter(it -> CollectionUtil.isNotEmpty(it.getAttributes()))
                .flatMap(it -> it.getAttributes().stream())
                .filter(it -> StrUtil.equalsIgnoreCase("SKU_sign", it.getCode()))
                .map(AttributeVo::getName).findFirst().orElse("");
        final var plmCode = standardSize.getChildren().stream().filter(it -> StrUtil.equalsIgnoreCase(groupCode, it.getDictCode()))
                .filter(it -> CollectionUtil.isNotEmpty(it.getAttributes()))
                .flatMap(it -> it.getAttributes().stream())
                .filter(it -> StrUtil.equalsIgnoreCase("plm_code", it.getCode()))
                .map(AttributeVo::getName).findFirst().orElse("");
        final var plmValue = standardSize.getChildren().stream().filter(it -> StrUtil.equalsIgnoreCase(groupCode, it.getDictCode()))
                .filter(it -> CollectionUtil.isNotEmpty(it.getAttributes()))
                .flatMap(it -> it.getAttributes().stream())
                .filter(it -> StrUtil.equalsIgnoreCase("plm_value", it.getCode()))
                .map(AttributeVo::getName).findFirst().orElse("");
        final var sizeNameList = StrUtil.splitTrim(sampleSize, StrUtil.COMMA);
        return sizeNameList.stream().map(t -> {
            final var sku = new StyleSkcSku();
            sku.setSkuId(IdHelper.getId());
            sku.setSkuCode(skc.getDesignCode() + group + "-" + t);
            sku.setStyleId(style.getDesignStyleId());
            sku.setSkcId(skc.getPrototypeId());
            sku.setGroupName(plmValue);
            sku.setPlmGroupCode(plmCode);
            sku.setSizeName(t);
            sku.setTenantId(SsoContext.tenantId());
            return sku;
        }).toList();
    }

    public static List<BaseSkuResp> convertSkuResp(Map<Long, Prototype> map, List<StyleSkcSku> skuList) {
        return skuList.stream().map(t -> {
            final var resp = new BaseSkuResp();
            resp.setSkuInfoId(t.getSkuId());
            resp.setBarcode(t.getSkuCode());
            if (map.containsKey(t.getSkcId())) {
                final var skc = map.get(t.getSkcId());
                resp.setSkc(skc.getDesignCode());
            }
            resp.setSizeName(t.getSizeName());
            resp.setSourceGroupCode(t.getPlmGroupCode());
            resp.setCreatorId(t.getCreatorId());
            resp.setCreatorName(t.getCreatorName());
            resp.setCreatedTime(t.getCreatedTime());
            return resp;
        }).toList();
    }

    public static List<BaseSkuResp> convertSpotSkuResp(Map<Long, SpotStyleSkc> map, List<StyleSkcSku> skuList) {
        return skuList.stream().map(t -> {
            final var resp = new BaseSkuResp();
            resp.setSkuInfoId(t.getSkuId());
            resp.setBarcode(t.getSkuCode());
            if (map.containsKey(t.getSkcId())) {
                final var skc = map.get(t.getSkcId());
                resp.setSkc(skc.getSkcCode());
            }
            resp.setSizeName(t.getSizeName());
            resp.setSourceGroupCode(t.getPlmGroupCode());
            resp.setCreatorId(t.getCreatorId());
            resp.setCreatorName(t.getCreatorName());
            resp.setCreatedTime(t.getCreatedTime());
            return resp;
        }).toList();
    }


    public static List<PrototypeMaterial> buildUpdateMaterialInfo(Prototype prototype, List<String> pictures, Integer taskType) {
        return pictures.stream()
                .map(pic -> {
                    PrototypeMaterial material = new PrototypeMaterial();
                    material.setPrototypeMaterialId(IdHelper.getId());
                    material.setDesignStyleId(prototype.getDesignStyleId());
                    material.setStyleCode(prototype.getStyleCode());
                    material.setPrototypeId(prototype.getPrototypeId());
                    material.setDesignCode(prototype.getDesignCode());
                    material.setMaterialUrl(pic);
                    material.setMaterialType(taskType);
                    material.setTenantId(SsoContext.tenantId());
                    return material;
                })
                .collect(Collectors.toList());

    }

    public static List<PrototypeMaterial> buildSkcUpdateMaterialInfo(List<String> updatePictures, Integer taskType, Prototype skc) {
        return updatePictures.stream()
                .map(pic -> {
                    PrototypeMaterial material = new PrototypeMaterial();
                    material.setPrototypeMaterialId(IdHelper.getId());
                    material.setStyleCode(skc.getStyleCode());
                    material.setDesignStyleId(skc.getDesignStyleId());
                    material.setPrototypeId(skc.getPrototypeId());
                    material.setDesignCode(skc.getDesignCode());
                    material.setMaterialUrl(pic);
                    material.setMaterialType(taskType);
                    material.setTenantId(SsoContext.tenantId());
                    return material;
                })
                .collect(Collectors.toList());
    }

    public static PrototypeOperateReq buildReqMaterialInfo(Prototype skc, List<PrototypeMaterial> addList, Integer taskType) {
        PrototypeOperateReq req = new PrototypeOperateReq();
        final var add = addList.stream().filter(t -> t.getPrototypeId().equals(skc.getPrototypeId())).toList();
        List<PrototypeOperateReq.PrototypeMaterialInfo> materialInfoList = new ArrayList<>();
        for (PrototypeMaterial material : add) {
            if (material == null) {
                continue;
            }
            PrototypeOperateReq.PrototypeMaterialInfo materialInfo = PrototypeOperateReq.PrototypeMaterialInfo.builder()
                    .designStyleId(skc.getDesignStyleId())
                    .styleCode(skc.getStyleCode())
                    .prototypeId(skc.getPrototypeId())
                    .designCode(skc.getDesignCode())
                    .materialUrl(material.getMaterialUrl())
                    .materialType(taskType)
                    .build();
            materialInfoList.add(materialInfo);
        }
        req.setMaterialInfo(materialInfoList);
        return req;
    }

    public static Pair<List<PlmSdpStyleRela>, PlmStyleLog> buildStyleRela(DesignStyle style, List<Prototype> skcList) {
        final var skcLog = PrototypeConverter.obtainLog(style.getDesignStyleId());
        skcLog.setSkcId(skcList.getFirst().getPrototypeId());
        // 生成关联关系
        final var relaPair = PrototypeConverter.buildRela(style, skcList);
        final var spuRela = relaPair.getLeft();
        final var skcRela = relaPair.getRight();
        spuRela.setLogId(skcLog.getLogId());
        skcRela.setLogId(skcLog.getLogId());
        return Pair.of(List.of(spuRela, skcRela), skcLog);
    }

    public static List<PlmSdpStyleRela> buildStyleRela(List<DesignStyle> addSpuList) {
        return addSpuList.stream()
                .map(t -> {
                    PlmSdpStyleRela spu = new PlmSdpStyleRela();
                    spu.setTaskId(t.getDesignStyleId());
                    spu.setParentId(0L);
                    spu.setTenantId(SsoContext.tenantId());
                    return spu;
                }).toList();
    }

    public static List<MulfeatExtractTask> obtainMulfeatExtract(DesignStyle designStyle) {
        final var list = new ArrayList<MulfeatExtractTask>();
        final var skcs = designStyle.getSkcs();
        if (CollectionUtil.isEmpty(skcs)) {
            return list;
        }
        for (Prototype skc : skcs) {
            if (CollectionUtil.isEmpty(skc.getMaterialList())) {
                continue;
            }
            final var materialInfos = skc.getMaterialList().stream().filter(t -> t.getMaterialType().equals(PrototypeMaterialTypeEnum.IMAGE.getCode())).toList();
            if (CollectionUtil.isEmpty(materialInfos)) {
                continue;
            }
            final var t = new MulfeatExtractTask();
            BasicConvert.entityInit(t);
            t.setBusId(skc.getPrototypeId());
            t.setTaskCode(skc.getStyleCode());
            t.setBusType(SourceEnum.PROTOTYPE.getCode());
            t.setInputImg(materialInfos.getFirst().getMaterialUrl());
            list.add(t);
        }
        return list;
    }

    public static CompanyUserBatchReq<MulfeatExtractTaskReq> buildMulfeatExtractReq(DesignStyle designStyle) {
        final var rec = designStyle.getMulfeatExtracts().getFirst();
        final var req = BasicConvert.companyUserBatch(designStyle,
                List.of(new MulfeatExtractTaskReq(rec.getTaskId(), rec.getTaskCode(), rec.getInputImg())));
        req.setCallback(DomainProperties.buildPath(CALLBACK + "mulfeat-extract"));
        return req;
    }

    public static SkcImageResp convert(Prototype skc, Map<Long, DesignerDTO> designerMap, DesignImageDTO dto,
                                       Map<Long, DesignStyle> taskMap, Map<Long, List<PrototypeMaterial>> prototypeMaterialMap) {
        final var resp = BasicConvert.copy(dto, SkcImageResp.class);
        resp.setCreatedTime(skc.getCreatedTime());
        if (CollectionUtil.isNotEmpty(prototypeMaterialMap) && prototypeMaterialMap.containsKey(skc.getPrototypeId())) {
            resp.setImageUrl(prototypeMaterialMap.get(skc.getPrototypeId()).getFirst().getMaterialUrl());
        }

        resp.setDesignerId(skc.getDesignerId());
        resp.setDesignerName(skc.getDesignerName());
        Optional.ofNullable(designerMap.get(resp.getDesignerId())).ifPresent(it -> {
            resp.setDesignerGroupName(it.getDesignerGroupName());
            resp.setDesignerGroupCode(it.getDesignerGroupCode());
        });
        Optional.ofNullable(taskMap.get(skc.getDesignStyleId())).ifPresent(it -> {
            resp.setStoreId(it.getStoreId());
            resp.setStoreName(it.getStoreName());
        });
        resp.setUpcoming(Bool.NO);
        resp.setOnShelves(null);
        resp.setOnShelvesFail(null);
        resp.setCancelled(Bool.NO);
        if (skc.waitOnShelve()) {
            resp.setUpcoming(Bool.YES);
        }
        if (skc.onShelve()) {
            resp.setOnShelves(Bool.YES);
        }
        if (skc.offShelve()) {
            resp.setOnShelves(Bool.NO);
        }
        if (skc.onShelveFail()) {
            resp.setOnShelvesFail(Bool.YES);
        }
        return resp;
    }

    public static StylePushRemarkReq pushPlmRemark(Prototype prototype, PrototypeDetail prototypeDetail) {
        StylePushRemarkReq req = new StylePushRemarkReq();
        req.setBizType("DESIGN_PROTOTYPE");
        StylePushRemarkReq.Remark remark = new StylePushRemarkReq.Remark();
        remark.setRemark(prototypeDetail.getTypeRemark());
        remark.setDesignCode(prototype.getDesignCode());
        req.setRemarks(List.of(remark));
        return req;
    }

    public static List<BomOrderVo> bomConvert(List<DevelopStyleTaskBomOrder> boms) {
        if (CollectionUtils.isEmpty(boms)) {
            return Collections.emptyList();
        }
        return boms.stream().map(t -> {
                    BomOrderVo vo = new BomOrderVo();
                    BeanUtils.copyProperties(t, vo);
                    return vo;
                }).toList();
    }

    public static List<BomOrderMaterialResp> convertBomOrderMaterial(List<DesignStyle> spuList, List<DevelopStyleTaskBomOrder> bomList) {
        if (CollectionUtils.isEmpty(spuList) || CollectionUtils.isEmpty(bomList)) {
            return new ArrayList<>();
        }
        Map<Long, List<DevelopStyleTaskBomOrder>> bomMap = bomList.stream()
                .collect(Collectors.groupingBy(DevelopStyleTaskBomOrder::getDevelopStyleTaskId));
        return spuList.stream()
                .filter(style -> bomMap.containsKey(style.getSourceBusinessId()))
                .map(style -> {
                    BomOrderMaterialResp resp = new BomOrderMaterialResp();
                    resp.setStyleCode(style.getStyleCode());
                    resp.setBomOrderMaterialList(convertBomResp(bomMap.get(style.getSourceBusinessId())));
                    return resp;
                })
                .collect(Collectors.toList());
    }

    private static List<BomOrderMaterialResp.BomResp> convertBomResp(List<DevelopStyleTaskBomOrder> list) {
        return list.stream().map(t ->{
            BomOrderMaterialResp.BomResp resp = new BomOrderMaterialResp.BomResp();
            BeanUtils.copyProperties(t,resp);
            return resp;
        }).toList();
    }
}
