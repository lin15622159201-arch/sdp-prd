package tech.tiangong.sdp.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import org.apache.ibatis.annotations.Param;
import tech.tiangong.sdp.entity.StyleSkcSku;
import tech.tiangong.sdp.vo.resp.StyleSkcSkuVo;

import java.util.List;

/**
 * SKU表Mapper
 *
 * @author ：liuhongfu
 * @version :1.0
 * @date ：2025/11/6 15:13
 */
public interface StyleSkcSkuMapper extends BaseMapper<StyleSkcSku> {

    List<StyleSkcSkuVo> selectVoBySkcIds(@Param("skcIds") List<Long> skcIds);

    int deleteBySkuIds(@Param("skuIds") List<Long> skuIds);
}
