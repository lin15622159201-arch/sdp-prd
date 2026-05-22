package tech.tiangong.sdp.service;


import tech.tiangong.sdp.vo.req.SupplierReq;
import tech.tiangong.sdp.vo.resp.SupplierInfoVo;

import java.util.List;

/**
 * ZjAps 服务接口
 *
 * @author while
 * @since 2025-02-25 11:37:13
 */
public interface ApsService {


    /**
     * 供应商查询
     *
     * @param req 入参
     * @return List<SupplierInfoVo>
     */
    List<SupplierInfoVo> supplierQuery(SupplierReq req);
}
