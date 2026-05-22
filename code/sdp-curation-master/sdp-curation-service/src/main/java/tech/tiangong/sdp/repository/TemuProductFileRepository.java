package tech.tiangong.sdp.repository;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import org.springframework.stereotype.Repository;
import team.aikero.blade.core.enums.Bool;
import tech.tiangong.sdp.entity.TemuProductFile;
import tech.tiangong.sdp.mapper.TemuProductFileMapper;

import java.util.List;

/**
 * Temu商品文件表 Repository
 *
 * @author : qinwenxuan@zj.tech
 * @version : 1.0
 * @date : 2025/8/13 16:20
 */
@Repository
public class TemuProductFileRepository extends ManualBaseRepository<TemuProductFileMapper, TemuProductFile> {
    public List<TemuProductFile> listByProductIds(final List<Long> productIds) {
        return this.list(new LambdaQueryWrapper<TemuProductFile>()
                .eq(TemuProductFile::getDeleted, Bool.NO.getCode())
                .in(TemuProductFile::getProductId, productIds)
                .orderByDesc(TemuProductFile::getCreatedTime)
        )

                ;
    }

    public TemuProductFile logicOne(Long id) {
        return this.baseMapper.logicOne(id);
    }
}
