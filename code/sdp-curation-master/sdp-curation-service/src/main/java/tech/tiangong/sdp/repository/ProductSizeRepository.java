package tech.tiangong.sdp.repository;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import org.springframework.stereotype.Repository;
import team.aikero.blade.core.enums.Bool;
import tech.tiangong.sdp.entity.ProductSize;
import tech.tiangong.sdp.entity.ProductSize;
import tech.tiangong.sdp.mapper.ProductSizeMapper;

import java.util.List;

/**
 * 商品尺码模板表 Repository
 *
 * @author : qinwenxuan@zj.tech
 * @version : 1.0
 * @date : 2025/8/13 16:20
 */
@Repository
public class ProductSizeRepository extends ManualBaseRepository<ProductSizeMapper, ProductSize> {
    public List<ProductSize> listByProductIds(final List<Long> productIds) {
        return this.list(new LambdaQueryWrapper<ProductSize>()
                .eq(ProductSize::getDeleted, Bool.NO.getCode())
                .in(ProductSize::getProductId, productIds)
                .orderByDesc(ProductSize::getCreatedTime)
        )

                ;
    }
}
