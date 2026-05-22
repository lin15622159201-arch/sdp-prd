package tech.tiangong.sdp.repository;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import org.springframework.stereotype.Repository;
import team.aikero.blade.core.enums.Bool;
import tech.tiangong.sdp.entity.ProductSkuMainSpec;
import tech.tiangong.sdp.entity.ProductSkuMainSpec;
import tech.tiangong.sdp.mapper.ProductSkuMainSpecMapper;

import java.util.List;

/**
 * 商品SKU主销售属性表 Repository
 *
 * @author : qinwenxuan@zj.tech
 * @version : 1.0
 * @date : 2025/8/13 16:20
 */
@Repository
public class ProductSkuMainSpecRepository extends ManualBaseRepository<ProductSkuMainSpecMapper, ProductSkuMainSpec> {
    public List<ProductSkuMainSpec> listByProductIds(final List<Long> productIds) {
        return this.list(new LambdaQueryWrapper<ProductSkuMainSpec>()
                .eq(ProductSkuMainSpec::getDeleted, Bool.NO.getCode())
                .in(ProductSkuMainSpec::getProductId, productIds)
                .orderByDesc(ProductSkuMainSpec::getCreatedTime)
        )

                ;
    }
}
