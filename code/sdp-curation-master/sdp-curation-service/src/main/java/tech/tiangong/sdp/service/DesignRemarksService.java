package tech.tiangong.sdp.service;


import tech.tiangong.sdp.vo.req.DesignRemarksBatchListReq;
import tech.tiangong.sdp.vo.req.DesignRemarksListReq;
import tech.tiangong.sdp.vo.req.DesignRemarksReq;
import tech.tiangong.sdp.vo.resp.DesignRemarksVO;

import java.util.List;
import java.util.Map;

/**
* 设计打版备注信息
* <br>CreateDate August 10,2021
* @author lujunxuan
* @since 1.0
*/
public interface DesignRemarksService {

    /**
    * 创建数据
    * @param req 数据实体
    * @return 创建结果
    */
    DesignRemarksVO create(DesignRemarksReq req);

    /**
     * 查询-根据设计款号查询
     *
     * @param req 设计打版备注信息对象
     * @return 设计打版备注信息实体
     */
    List<DesignRemarksVO> dataList(DesignRemarksListReq req);

    /**
     * 批量查询-根据设计款号批量查询
     *
     * @param req 设计打版备注信息对象
     * @return 设计打版备注信息实体
     */
    Map<Long, List<DesignRemarksVO>> batchDataList(DesignRemarksBatchListReq req);


}