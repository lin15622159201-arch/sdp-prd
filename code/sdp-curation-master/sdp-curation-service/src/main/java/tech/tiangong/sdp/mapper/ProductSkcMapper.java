package tech.tiangong.sdp.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import tech.tiangong.sdp.entity.ProductSkc;

/**
 * 商品SKC表 Mapper
 *
 * @author : qinwenxuan@zj.tech
 * @version : 1.0
 * @date : 2025/8/13 16:16
 */
public interface ProductSkcMapper extends BaseMapper<ProductSkc> {
    int editById(ProductSkc productSkc);

    int editByIdWithOptimisticLock(ProductSkc productSkc);
}
