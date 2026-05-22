package tech.tiangong.sdp.repository;

import cn.hutool.core.collection.CollectionUtil;
import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import org.springframework.stereotype.Repository;
import team.aikero.blade.core.enums.Bool;
import tech.tiangong.sdp.entity.ProductSkc;
import tech.tiangong.sdp.mapper.ProductSkcMapper;

import java.time.LocalDateTime;
import java.util.Comparator;
import java.util.List;
import java.util.Set;

/**
 * 商品SKC表 Repository
 *
 * @author : qinwenxuan@zj.tech
 * @version : 1.0
 * @date : 2025/8/13 16:20
 */
@Repository
public class ProductSkcRepository extends ManualBaseRepository<ProductSkcMapper, ProductSkc> {
    public List<ProductSkc> listByProductIds(final List<Long> productIds) {
        return this.list(new LambdaQueryWrapper<ProductSkc>()
                .eq(ProductSkc::getDeleted, Bool.NO.getCode())
                .in(ProductSkc::getProductId, productIds)
                .orderByDesc(ProductSkc::getCreatedTime)
        )

                ;
    }

    public List<ProductSkc> listBySkcIds(final List<Long> skcIds) {
        return this.list(new LambdaQueryWrapper<ProductSkc>()
                .eq(ProductSkc::getDeleted, Bool.NO.getCode())
                .in(ProductSkc::getSkcId, skcIds)
                .orderByDesc(ProductSkc::getCreatedTime)
        )

                ;
    }

    public List<ProductSkc> jobs(final Long shopId, final int pageIndex, final int pageSize) {
        return this.list(new LambdaQueryWrapper<ProductSkc>()
                        .eq(ProductSkc::getDeleted, Bool.NO.getCode())
                        .eq(ProductSkc::getShopId, shopId)
//                .ge(ProductSkc::getSyncStatus, Bool.NO.getCode())
                        .ge(ProductSkc::getPlatformSkcId, 1)
                        .orderByAsc(ProductSkc::getSyncTimes)
                        .orderByDesc(ProductSkc::getCreatedTime)
                        .last(" LIMIT " + pageIndex + " , " + pageSize)

        )
                ;
    }

    public List<ProductSkc> jobs(final int pageIndex, final int pageSize) {
        return this.list(new LambdaQueryWrapper<ProductSkc>()
                .eq(ProductSkc::getDeleted, Bool.NO.getCode())
                .ge(ProductSkc::getPlatformSkcId, 1)
                .eq(ProductSkc::getSkcId, 0)
                .orderByAsc(ProductSkc::getCreatedTime)
                .last(" LIMIT " + pageIndex + " , " + pageSize)

        )
                ;
    }

    public int editBatchById(final List<ProductSkc> list) {
        if (CollectionUtil.isEmpty(list)) {
            return 0;
        }
        // 先按照ID排序
        final var sorted = list.stream().sorted(Comparator.comparing(ProductSkc::getProductSkcId)).toList();
        int i = 0;
        for (ProductSkc it : sorted) {
            final var row = this.baseMapper.editById(it);
            i += row;
        }
        return i;
    }

    public int editBatchByIdWithOptimisticLock(final List<ProductSkc> list) {
        if (CollectionUtil.isEmpty(list)) {
            return 0;
        }
        // 先按照ID排序
        final var sorted = list.stream().sorted(Comparator.comparing(ProductSkc::getProductSkcId)).toList();
        int i = 0;
        for (ProductSkc it : sorted) {
            final var row = editByIdWithOptimisticLock(it);
            i += row;
        }
        return i;
    }

    public int editByIdWithOptimisticLock(final ProductSkc productSkc) {
        return baseMapper.editByIdWithOptimisticLock(productSkc);
    }

    public List<ProductSkc> listBySalesDriving(final int pageIndex, final int pageSize) {
        return this.list(new LambdaQueryWrapper<ProductSkc>()
                .eq(ProductSkc::getDeleted, Bool.NO.getCode())
                .eq(ProductSkc::getSalesDriving, Bool.YES.getCode())
                .ge(ProductSkc::getPlatformSkcId, 1)
                .ge(ProductSkc::getOrderTime, LocalDateTime.now().toLocalDate().minusDays(500))
                .orderByAsc(ProductSkc::getCreatedTime)
                .last(" LIMIT " + pageIndex + " , " + pageSize))
                ;

    }

    public List<ProductSkc> listBySkcCodes(final Set<String> skcCodes) {
        return this.list(new LambdaQueryWrapper<ProductSkc>()
                .eq(ProductSkc::getDeleted, Bool.NO.getCode())
                .in(ProductSkc::getSkcCode, skcCodes)
                .orderByAsc(ProductSkc::getSyncTimes));
    }
}
