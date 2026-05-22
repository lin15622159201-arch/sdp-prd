package tech.tiangong.sdp.service.impl;

import cn.hutool.core.lang.Assert;
import cn.hutool.extra.spring.SpringUtil;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import team.aikero.blade.core.enums.Bool;
import tech.tiangong.sdp.entity.DesignRemarks;
import tech.tiangong.sdp.entity.PrototypeHistory;
import tech.tiangong.sdp.repository.PrototypeHistoryRepository;
import tech.tiangong.sdp.service.ComposeDesignRemark;
import tech.tiangong.sdp.vo.req.DesignRemarksReq;

import java.util.List;

/**
 * @Author Husky
 * @create 2021/8/19
 */
public class ComposeDesignRemarkPrototye implements ComposeDesignRemark {
    @Override
    public DesignRemarks compose(DesignRemarksReq req, DesignRemarks designRemarks) {
        PrototypeHistoryRepository prototypeHistoryRepository = SpringUtil.getBean(PrototypeHistoryRepository.class);
        List<PrototypeHistory> prototypeHistory = prototypeHistoryRepository.getListByPrototypeId(req.getBizId());
        Assert.notEmpty(prototypeHistory, "不存在此设计款号");
        designRemarks.setStyleCode(prototypeHistory.getFirst().getStyleCode());
        designRemarks.setDesignCode(prototypeHistory.getFirst().getDesignCode());
        return designRemarks;
    }

}
