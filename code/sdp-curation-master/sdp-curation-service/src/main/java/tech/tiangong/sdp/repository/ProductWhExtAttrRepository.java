package tech.tiangong.sdp.repository;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import org.springframework.stereotype.Repository;
import team.aikero.blade.core.enums.Bool;
import tech.tiangong.sdp.entity.ProductWhExtAttr;
import tech.tiangong.sdp.entity.ProductWhExtAttr;
import tech.tiangong.sdp.mapper.ProductWhExtAttrMapper;

import java.util.List;

/**
 * 商品货品仓配供应链侧扩展属性表 Repository
 *
 * @author : qinwenxuan@zj.tech
 * @version : 1.0
 * @date : 2025/8/13 16:20
 */
@Repository
public class ProductWhExtAttrRepository extends ManualBaseRepository<ProductWhExtAttrMapper, ProductWhExtAttr> {
    public List<ProductWhExtAttr> listByProductIds(final List<Long> productIds) {
        return this.list(new LambdaQueryWrapper<ProductWhExtAttr>()
                .eq(ProductWhExtAttr::getDeleted, Bool.NO.getCode())
                .in(ProductWhExtAttr::getProductId, productIds)
                .orderByDesc(ProductWhExtAttr::getCreatedTime)
        )

                ;
    }
}
