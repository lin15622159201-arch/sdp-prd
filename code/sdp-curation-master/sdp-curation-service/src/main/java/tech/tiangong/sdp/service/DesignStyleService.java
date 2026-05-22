package tech.tiangong.sdp.service;


import tech.tiangong.sdp.entity.DevelopStyleTask;
import tech.tiangong.sdp.entity.ImageUpdatePicture;
import tech.tiangong.sdp.vo.req.DesignStyleCreateReq;
import tech.tiangong.sdp.vo.req.DesignStyleUpdateReq;
import tech.tiangong.sdp.vo.resp.DesignStyleCreateResp;
import tech.tiangong.sdp.vo.resp.DesignStyleFieldLogVO;
import tech.tiangong.sdp.vo.resp.DesignStyleVo;

import java.util.List;

/**
 * 款式管理-SPU-Service
 *
 * @author ：liuhongfu
 * @version :1.0
 * @date ：2025/11/4 15:17
 */
public interface DesignStyleService {

    /**
     * 根据SPU编号查询SPU最新版本信息
     *
     * @param styleCode spu编码
     * @return spu对象
     */
    DesignStyleVo getLatestVersionByStyleId(Long designStyleId);

    /**
     * 根据SPU编号查询SPU最新版本信息
     *
     * @param designStyleCode spu编码
     * @return spu对象
     */
    DesignStyleVo getLatestVersionByStyleCode(String designStyleCode);

    DesignStyleCreateResp createSpuSkc(DesignStyleCreateReq req);

    void updateSpu(DesignStyleUpdateReq req);

    /**
     * 查询SPU字段变更日志
     *
     * @param designStyleId SPU ID
     * @return 字段变更日志列表
     */
    List<DesignStyleFieldLogVO> getFieldLogs(Long designStyleId);

    String batchDevelop(DevelopStyleTask task);

    void pickingPushPictureToDesignStyle(Long spuId, List<String> allPictures,String spuCode);
}
