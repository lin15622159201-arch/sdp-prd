package tech.tiangong.sdp.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import org.apache.ibatis.annotations.Param;
import tech.tiangong.sdp.entity.StyleSkcOnShelvesPicture;

/**
 * 款上架图片表Mapper
 *
 * @author liuhongfu
 * @version :1.0
 * @date ：2025/11/3 15:13
 */
public interface StyleOnShelvesPictureMapper extends BaseMapper<StyleSkcOnShelvesPicture> {
    void deleteByStyleId(@Param("styleId") Long styleId);

}
