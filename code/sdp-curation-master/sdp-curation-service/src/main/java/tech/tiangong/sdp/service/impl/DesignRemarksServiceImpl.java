package tech.tiangong.sdp.service.impl;

import cn.hutool.core.collection.CollectionUtil;
import cn.hutool.core.lang.Assert;
import lombok.AllArgsConstructor;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import team.aikero.blade.sequence.id.IdHelper;
import team.aikero.blade.user.entity.CurrentUser;
import tech.tiangong.sdp.entity.DesignRemarks;
import tech.tiangong.sdp.enums.DesignRemarksBizTypeEnum;
import tech.tiangong.sdp.repository.DesignRemarksRepository;
import tech.tiangong.sdp.service.ComposeDesignRemark;
import tech.tiangong.sdp.service.DesignRemarksService;
import tech.tiangong.sdp.utils.SsoContext;
import tech.tiangong.sdp.vo.req.DesignRemarksBatchListReq;
import tech.tiangong.sdp.vo.req.DesignRemarksReq;
import tech.tiangong.sdp.vo.resp.DesignRemarksVO;

import tech.tiangong.sdp.vo.req.DesignRemarksListReq;
import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.stream.Collectors;

/**
* 设计打版备注信息
* <br>CreateDate August 10,2021
* @author lujunxuan
* @since 1.0
*/

@AllArgsConstructor
@Service
public class DesignRemarksServiceImpl implements DesignRemarksService {

    private final DesignRemarksRepository designRemarksRepository;

    @Transactional(rollbackFor = Exception.class)
    @Override
    public DesignRemarksVO create(DesignRemarksReq req) {
        SsoContext.user();
        CurrentUser userContent = SsoContext.user();
        DesignRemarks designRemarks = new DesignRemarks();
        BeanUtils.copyProperties(req,designRemarks);
        designRemarks.setDesignRemarksId(IdHelper.getId());
        DesignRemarksBizTypeEnum designRemarksBizTypeEnum = DesignRemarksBizTypeEnum.valueOf(req.getBizType());
        Assert.notNull(designRemarksBizTypeEnum,"不存在此业务类型:{}",req.getBizType());
        ComposeDesignRemark composeDesignRemark = null;
        switch (designRemarksBizTypeEnum) {
            case DESIGN_PROTOTYPE, CANCELLED -> composeDesignRemark = new ComposeDesignRemarkPrototye();
            default -> Assert.isTrue(false, "无法处理业务类型:{}，请联系开发人员！", req.getBizType());
        }
        if(userContent != null){
            designRemarks.setCreatedName(userContent.getName());
        }
        composeDesignRemark.compose(req,designRemarks);
        designRemarksRepository.save(designRemarks);
        DesignRemarksVO vo = new DesignRemarksVO();
        BeanUtils.copyProperties(designRemarks,vo);
        return vo;
    }

    @Override
    public List<DesignRemarksVO> dataList(DesignRemarksListReq req) {

        List<DesignRemarks> designRemarkList = designRemarksRepository.getListByDesignCode(req.getDesignCode());
        if (CollectionUtil.isEmpty(designRemarkList)) {
            return Collections.emptyList();
        }
        //过滤掉Bom详情明细的备注
        return designRemarkList.stream().filter(remark ->
                !(StringUtils.equals(remark.getBizType(), DesignRemarksBizTypeEnum.BOM_ORDER.name()) && Objects.nonNull(remark.getBizChildId())))
                .map(remark -> {
                    DesignRemarksVO remarksVO = new DesignRemarksVO();
                    BeanUtils.copyProperties(remark, remarksVO);
                    return remarksVO;
                }).collect(Collectors.toList());
    }

    @Override
    public Map<Long, List<DesignRemarksVO>> batchDataList(DesignRemarksBatchListReq req) {

        List<DesignRemarks> designRemarkList = designRemarksRepository.getListByBizIds(req.getBizIds());
        if (CollectionUtil.isEmpty(designRemarkList)) {
            return Collections.emptyMap();
        }

        //过滤掉Bom详情明细的备注
        Map<Long, List<DesignRemarksVO>> result = designRemarkList.stream().filter(remark ->
                        !(StringUtils.equals(remark.getBizType(), DesignRemarksBizTypeEnum.BOM_ORDER.name()) && Objects.nonNull(remark.getBizChildId())))
                .map(remark -> {
                    DesignRemarksVO remarksVO = new DesignRemarksVO();
                    BeanUtils.copyProperties(remark, remarksVO);
                    return remarksVO;
                }).collect(Collectors.groupingBy(DesignRemarksVO::getBizId));
        return result;
    }

}