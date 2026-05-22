package tech.tiangong.sdp.repository;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import org.springframework.stereotype.Repository;
import team.aikero.blade.core.enums.Bool;
import tech.tiangong.sdp.entity.ProductSpecAttr;
import tech.tiangong.sdp.entity.ProductSpecAttr;
import tech.tiangong.sdp.mapper.ProductSpecAttrMapper;

import java.util.List;

/**
 * 商品销售属性表 Repository
 *
 * @author : qinwenxuan@zj.tech
 * @version : 1.0
 * @date : 2025/8/13 16:20
 */
@Repository
public class ProductSpecAttrRepository extends ManualBaseRepository<ProductSpecAttrMapper, ProductSpecAttr> {
    public List<ProductSpecAttr> listByProductIds(final List<Long> productIds) {
        return this.list(new LambdaQueryWrapper<ProductSpecAttr>()
                .eq(ProductSpecAttr::getDeleted, Bool.NO.getCode())
                .in(ProductSpecAttr::getProductId, productIds)
                .orderByDesc(ProductSpecAttr::getCreatedTime)
        )

                ;
    }
}
