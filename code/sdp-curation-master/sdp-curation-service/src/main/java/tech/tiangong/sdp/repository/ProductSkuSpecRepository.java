package tech.tiangong.sdp.repository;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import org.springframework.stereotype.Repository;
import team.aikero.blade.core.enums.Bool;
import tech.tiangong.sdp.entity.ProductSkuSpec;
import tech.tiangong.sdp.entity.ProductSkuSpec;
import tech.tiangong.sdp.mapper.ProductSkuSpecMapper;

import java.util.List;

/**
 * 商品SKU规格表 Repository
 *
 * @author : qinwenxuan@zj.tech
 * @version : 1.0
 * @date : 2025/8/13 16:20
 */
@Repository
public class ProductSkuSpecRepository extends ManualBaseRepository<ProductSkuSpecMapper, ProductSkuSpec> {
    public List<ProductSkuSpec> listByProductIds(final List<Long> productIds) {
        return this.list(new LambdaQueryWrapper<ProductSkuSpec>()
                .eq(ProductSkuSpec::getDeleted, Bool.NO.getCode())
                .in(ProductSkuSpec::getProductId, productIds)
                .orderByDesc(ProductSkuSpec::getCreatedTime)
        )

                ;
    }
}
