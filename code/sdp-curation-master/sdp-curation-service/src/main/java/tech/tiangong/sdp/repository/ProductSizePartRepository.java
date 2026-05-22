package tech.tiangong.sdp.repository;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import org.springframework.stereotype.Repository;
import team.aikero.blade.core.enums.Bool;
import tech.tiangong.sdp.entity.ProductSizePart;
import tech.tiangong.sdp.mapper.ProductSizePartMapper;

import java.util.List;

/**
 * 商品尺码部位表 Repository
 *
 * @author : qinwenxuan@zj.tech
 * @version : 1.0
 * @date : 2025/8/13 16:20
 */
@Repository
public class ProductSizePartRepository extends ManualBaseRepository<ProductSizePartMapper, ProductSizePart> {
    public List<ProductSizePart> listByProductIds(final List<Long> productIds) {
        return this.list(new LambdaQueryWrapper<ProductSizePart>()
                .eq(ProductSizePart::getDeleted, Bool.NO.getCode())
                .in(ProductSizePart::getProductId, productIds)
                .orderByDesc(ProductSizePart::getCreatedTime)
        )

                ;
    }
    public List<ProductSizePart> listBySizeId(final Long productSizeId) {
        return this.list(new LambdaQueryWrapper<ProductSizePart>()
                .eq(ProductSizePart::getDeleted, Bool.NO.getCode())
                .eq(ProductSizePart::getProductSizeId, productSizeId)
                .orderByDesc(ProductSizePart::getCreatedTime)
        )

                ;
    }
}
