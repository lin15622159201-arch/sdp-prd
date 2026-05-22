package tech.tiangong.sdp.repository;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import org.springframework.stereotype.Repository;
import team.aikero.blade.core.enums.Bool;
import tech.tiangong.sdp.entity.ProductAttr;
import tech.tiangong.sdp.entity.ProductAttr;
import tech.tiangong.sdp.mapper.ProductAttrMapper;

import java.util.List;

/**
 * 商品属性表 Repository
 *
 * @author : qinwenxuan@zj.tech
 * @version : 1.0
 * @date : 2025/8/13 16:20
 */
@Repository
public class ProductAttrRepository extends ManualBaseRepository<ProductAttrMapper, ProductAttr> {
    public List<ProductAttr> listByProductIds(final List<Long> productIds) {
        return this.list(new LambdaQueryWrapper<ProductAttr>()
                .eq(ProductAttr::getDeleted, Bool.NO.getCode())
                .in(ProductAttr::getProductId, productIds)
                .orderByDesc(ProductAttr::getCreatedTime)
        )

                ;
    }
}
