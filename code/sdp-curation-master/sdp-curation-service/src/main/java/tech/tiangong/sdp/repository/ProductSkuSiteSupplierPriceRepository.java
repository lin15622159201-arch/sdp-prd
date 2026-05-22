package tech.tiangong.sdp.repository;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import org.springframework.stereotype.Repository;
import team.aikero.blade.core.enums.Bool;
import tech.tiangong.sdp.entity.ProductSkuSiteSupplierPrice;
import tech.tiangong.sdp.entity.ProductSkuSiteSupplierPrice;
import tech.tiangong.sdp.mapper.ProductSkuSiteSupplierPriceMapper;

import java.util.List;

/**
 * SKU站点供货价表 Repository
 *
 * @author : qinwenxuan@zj.tech
 * @version : 1.0
 * @date : 2025/8/13 16:20
 */
@Repository
public class ProductSkuSiteSupplierPriceRepository extends ManualBaseRepository<ProductSkuSiteSupplierPriceMapper, ProductSkuSiteSupplierPrice> {
    public List<ProductSkuSiteSupplierPrice> listByProductIds(final List<Long> productIds) {
        return this.list(new LambdaQueryWrapper<ProductSkuSiteSupplierPrice>()
                .eq(ProductSkuSiteSupplierPrice::getDeleted, Bool.NO.getCode())
                .in(ProductSkuSiteSupplierPrice::getProductId, productIds)
                .orderByDesc(ProductSkuSiteSupplierPrice::getCreatedTime)
        )

                ;
    }
}
