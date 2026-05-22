package tech.tiangong.sdp.service;

import tech.tiangong.sdp.entity.SkcImageVector;
import tech.tiangong.sdp.vo.dto.DesignImageAddDTO;
import tech.tiangong.sdp.vo.dto.DesignImageDTO;

import java.util.List;

/**
 * 款式图片Service
 *
 * @author ：qinwenxuan@zj.tech
 * @version :1.0
 * @date ：2026/3/4 10:45
 */
public interface DesignImageService extends BasicService{
    boolean saveVector (final List<DesignImageAddDTO> data) ;
    void saveVector (final SkcImageVector vector) ;
    List<DesignImageDTO> listVector (final List<Float> data) ;
}
