package tech.tiangong.sdp.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import org.apache.ibatis.annotations.Param;
import tech.tiangong.sdp.entity.DesignStyle;

import java.util.List;

/**
 * 款式管理-SPU-Mapper
 *
 * @author ：liuhongfu
 * @version :1.0
 * @date ：2025/11/6 15:13
 */
public interface DesignStyleMapper extends BaseMapper<DesignStyle> {

    List<DesignStyle> listByStyleCodesAndMaterialType(@Param("styleCodeList") List<String> styleCodeList, @Param("materialType")Integer materialType);

}
