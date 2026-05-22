package tech.tiangong.sdp.repository;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import org.springframework.stereotype.Repository;
import team.aikero.blade.core.enums.Bool;
import tech.tiangong.sdp.entity.ProductSkuWarehouse;
import tech.tiangong.sdp.entity.ProductSkuWarehouse;
import tech.tiangong.sdp.mapper.ProductSkuWarehouseMapper;

import java.util.List;

/**
 * 发货仓库存表 Repository
 *
 * @author : qinwenxuan@zj.tech
 * @version : 1.0
 * @date : 2025/8/13 16:20
 */
@Repository
public class ProductSkuWarehouseRepository extends ManualBaseRepository<ProductSkuWarehouseMapper, ProductSkuWarehouse> {
    public List<ProductSkuWarehouse> listByProductIds(final List<Long> productIds) {
        return this.list(new LambdaQueryWrapper<ProductSkuWarehouse>()
                .eq(ProductSkuWarehouse::getDeleted, Bool.NO.getCode())
                .in(ProductSkuWarehouse::getProductId, productIds)
                .orderByDesc(ProductSkuWarehouse::getCreatedTime)
        )

                ;
    }
}
