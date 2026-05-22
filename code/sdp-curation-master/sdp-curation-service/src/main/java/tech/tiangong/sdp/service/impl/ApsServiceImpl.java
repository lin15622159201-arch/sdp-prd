package tech.tiangong.sdp.service.impl;

import cn.hutool.core.collection.CollUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;
import tech.tiangong.sdp.external.ApsRemoteHelper;
import tech.tiangong.sdp.service.ApsService;
import tech.tiangong.sdp.vo.req.SupplierReq;
import tech.tiangong.sdp.vo.resp.SupplierInfoVo;

import java.util.List;

/**
 * 致景 aps service
 *
 * @author while
 * @since 2025-02-25 11:38:47
 */
@Slf4j
@Service
@RequiredArgsConstructor
public class ApsServiceImpl implements ApsService {
    private final ApsRemoteHelper apsRemoteHelper;

    @Override
    public List<SupplierInfoVo> supplierQuery(SupplierReq req) {
        final var respList = apsRemoteHelper.queryApsSupplier(req);
        if (CollUtil.isEmpty(respList)) {
            return List.of();
        }
        return respList.stream().map(item -> {
            SupplierInfoVo info = new SupplierInfoVo();
            BeanUtils.copyProperties(item, info);
            return info;
        }).toList();
    }
}
