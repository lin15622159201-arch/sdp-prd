package tech.tiangong.sdp.mapper;


import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import org.apache.ibatis.annotations.Param;
import tech.tiangong.sdp.entity.DesignStyleMaterial;

import java.util.List;

/**
 * 款式管理-SPU素材信息表
 *
 * @author liuhongfu
 * @since 2021-08-17 15:52:54
 */
public interface DesignStyleMaterialMapper extends BaseMapper<DesignStyleMaterial> {

    void deletedByStyleCodes(@Param("styleCodes")List<String> styleCodes);

    void deletedByStyleCodesAndType(@Param("styleCodes")List<String> styleCodes, @Param("materialType")Integer materialType);

    void deletedByStyleIdsAndType(@Param("styleIds")List<String> styleCodes, @Param("materialType")Integer materialType);

    void deletedByStyleIds(@Param("styleIds")List<Long> styleIds);
}