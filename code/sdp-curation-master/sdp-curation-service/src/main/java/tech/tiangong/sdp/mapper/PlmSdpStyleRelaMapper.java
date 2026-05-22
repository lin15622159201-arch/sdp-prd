package tech.tiangong.sdp.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import org.apache.ibatis.annotations.Param;
import tech.tiangong.sdp.entity.PlmSdpStyleRela;

/**
 * PLM-SDP款式管理编码关联表-Mapper
 *
 * @author ：liuhongfu
 * @version :1.0
 * @date ：2025/11/6 15:13
 */
public interface PlmSdpStyleRelaMapper extends BaseMapper<PlmSdpStyleRela> {


    void updateTaskId(@Param("prototypeIdOld")Long prototypeId, @Param("prototypeIdNew")long prototypeIdNew);
}
