package tech.tiangong.sdp.repository;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import org.springframework.stereotype.Repository;
import team.aikero.blade.core.enums.Bool;
import tech.tiangong.sdp.entity.SpotStyleSupplier;
import tech.tiangong.sdp.mapper.SpotStyleSupplierMapper;
import tech.tiangong.sdp.vo.req.SpotSupplierListReq;

import java.util.List;

/**
 * 现货款供应商表Repository
 *
 * @author ：qinwenxuan@zj.tech
 * @version :1.0
 * @date ：2025/11/3 15:15
 */
@Repository
public class SpotStyleSupplierRepository extends ManualBaseRepository<SpotStyleSupplierMapper, SpotStyleSupplier> {
    public List<SpotStyleSupplier> listByTaskIds(final List<Long> taskIds) {
        return this.list(new LambdaQueryWrapper<SpotStyleSupplier>()
                .eq(SpotStyleSupplier::getDeleted, Bool.NO.getCode())
                .in(SpotStyleSupplier::getTaskId, taskIds)
                .orderByDesc(SpotStyleSupplier::getCreatedTime)
        )

                ;
    }

    public List<SpotStyleSupplier> listBySupplierStyleCodes(final List<String> supplierStyleCodes) {
        return this.list(new LambdaQueryWrapper<SpotStyleSupplier>()
                .eq(SpotStyleSupplier::getDeleted, Bool.NO.getCode())
                .in(SpotStyleSupplier::getSupplierStyleCode, supplierStyleCodes)
                .orderByDesc(SpotStyleSupplier::getCreatedTime)
        )

                ;
    }

    public List<SpotStyleSupplier> listBySupplierStyleCodeAndNames(List<SpotSupplierListReq> reqs) {
        return this.baseMapper.listBySupplierStyleCodeAndNames(reqs);
    }
}
