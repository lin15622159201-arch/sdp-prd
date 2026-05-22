package tech.tiangong.sdp.mapper;


import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import org.apache.ibatis.annotations.Param;
import tech.tiangong.sdp.entity.DesignStyleMaterial;
import tech.tiangong.sdp.entity.PrototypeMaterial;

import java.util.List;

/**
 * 款式管理-SKC素材信息表
 *
 * @author liuhongfu
 * @since 2021-08-17 15:52:54
 */
public interface PrototypeMaterialMapper extends BaseMapper<PrototypeMaterial> {

    void deletedBySkcIds(@Param("skcIds")List<Long> skcIds);

    void deletedByStyleCodesAndType(@Param("styleCodes")List<String> styleCodes, @Param("materialType")Integer materialType);

    void deletedBySkcIdsAndType(@Param("skcIds")List<Long> skcIds, @Param("materialType")Integer taskType);
}