package tech.tiangong.sdp.repository;

import cn.hutool.core.collection.CollectionUtil;
import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import org.springframework.stereotype.Repository;
import team.aikero.blade.core.enums.Bool;
import tech.tiangong.sdp.entity.StyleSkcSku;
import tech.tiangong.sdp.mapper.StyleSkcSkuMapper;
import tech.tiangong.sdp.vo.resp.StyleSkcSkuVo;

import java.util.Collections;
import java.util.List;

/**
 * SKU表Repository
 *
 * @author ：liuhongfu
 * @version :1.0
 * @date ：2025/11/3 15:15
 */
@Repository
public class StyleSkcSkuRepository extends ManualBaseRepository<StyleSkcSkuMapper, StyleSkcSku> {

    public List<StyleSkcSku> selectByStyleId(Long styleId) {
        return this.list(new LambdaQueryWrapper<StyleSkcSku>()
                .eq(StyleSkcSku::getDeleted, Bool.NO.getCode())
                .in(StyleSkcSku::getStyleId, styleId)
                .orderByDesc(StyleSkcSku::getCreatedTime)
        );
    }

    public List<StyleSkcSku> selectBySkcIds(List<Long> skcIds) {
        return this.list(new LambdaQueryWrapper<StyleSkcSku>()
                .eq(StyleSkcSku::getDeleted, Bool.NO.getCode())
                .in(StyleSkcSku::getSkcId, skcIds)
                .orderByDesc(StyleSkcSku::getCreatedTime)
        );
    }

    public StyleSkcSku getByCode(final String skuCode) {
        return this.getOne(new LambdaQueryWrapper<StyleSkcSku>()
                .eq(StyleSkcSku::getDeleted, Bool.NO.getCode())
                .eq(StyleSkcSku::getSkuCode, skuCode)
                .orderByDesc(StyleSkcSku::getCreatedTime)
        );
    }

    public List<StyleSkcSkuVo> selectVoBySkcIds(List<Long> skcIds) {
        if (CollectionUtil.isEmpty(skcIds)) {
            return Collections.emptyList();
        }
        return baseMapper.selectVoBySkcIds(skcIds);
    }

    public int deleteByIds(List<Long> skuIds) {
        if (CollectionUtil.isNotEmpty(skuIds)) {
            return baseMapper.deleteBySkuIds(skuIds);
        }
        return 0;
    }
}
