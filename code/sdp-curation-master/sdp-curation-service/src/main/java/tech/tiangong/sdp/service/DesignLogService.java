package tech.tiangong.sdp.service;


import tech.tiangong.sdp.vo.req.DesignLogBizListReq;
import tech.tiangong.sdp.vo.req.DesignLogListReq;
import tech.tiangong.sdp.vo.req.DesignLogReq;
import tech.tiangong.sdp.vo.req.DesignLogSdpSaveReq;
import tech.tiangong.sdp.vo.resp.DesignLogVO;
import java.util.List;

/**
* 设计打版操作日志
* <br>CreateDate August 10,2021
* @author lujunxuan
* @since 1.0
*/
public interface DesignLogService {

    /**
    * 创建数据
    * @param req 数据实体
    * @return 创建结果
    */
    void create(DesignLogReq req);

    /**
     * SKC日志查询
     * @param req 数据实体
     * @return List<DesignLogResp>
     */
    List<DesignLogVO> dateList(DesignLogListReq req);


    /**
     * 业务id日志查询: 灵感任务, 数码印花款 采购齐套管理, 采购申请管理;
     * @param req 数据实体
     * @return List<DesignLogResp>
     */
    List<DesignLogVO> dateBizList(DesignLogBizListReq req);


    /**
     * 创建数据
     * @param req 数据实体
     * @return 创建结果
     */
    //void saveDesignLog(DesignLogReq req,PurchasePrototypeInfo purchasePrototypeInfo);

    /**
     * 添加日志: 主要用于 灵感设计与数码印花款
     * @param logSdpSaveReq 入参
     */
    void sdpSave(DesignLogSdpSaveReq logSdpSaveReq);

}