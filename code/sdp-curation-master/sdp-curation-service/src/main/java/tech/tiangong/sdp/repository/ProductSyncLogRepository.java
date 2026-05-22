package tech.tiangong.sdp.repository;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import org.springframework.stereotype.Repository;
import team.aikero.blade.core.enums.Bool;
import tech.tiangong.sdp.entity.ProductSyncLog;
import tech.tiangong.sdp.mapper.ProductSyncLogMapper;

import java.util.List;

/**
 * 商品同步日志表 Repository
 *
 * @author : qinwenxuan@zj.tech
 * @version : 1.0
 * @date : 2025/8/13 16:20
 */
@Repository
public class ProductSyncLogRepository extends ManualBaseRepository<ProductSyncLogMapper, ProductSyncLog> {
    public List<ProductSyncLog> listByShopIds(final List<Long> shopIds, final Integer syncStatus) {
        return this.list(new LambdaQueryWrapper<ProductSyncLog>()
                .eq(ProductSyncLog::getDeleted, Bool.NO.getCode())
                .eq(ProductSyncLog::getSyncStatus, syncStatus)
                .in(ProductSyncLog::getShopId, shopIds)
                .orderByAsc(ProductSyncLog::getCreatedTime)
        )
                ;
    }
}
