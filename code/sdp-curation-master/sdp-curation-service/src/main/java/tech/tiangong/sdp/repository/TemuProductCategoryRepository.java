package tech.tiangong.sdp.repository;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import org.springframework.stereotype.Repository;
import team.aikero.blade.core.enums.Bool;
import tech.tiangong.sdp.entity.TemuProductCategory;
import tech.tiangong.sdp.mapper.TemuProductCategoryMapper;

import java.util.List;

/**
 * Temu商品品类表 Repository
 *
 * @author : qinwenxuan@zj.tech
 * @version : 1.0
 * @date : 2025/8/13 16:20
 */
@Repository
public class TemuProductCategoryRepository extends ManualBaseRepository<TemuProductCategoryMapper, TemuProductCategory> {
    public List<TemuProductCategory> leafs() {
        return this.list(new LambdaQueryWrapper<TemuProductCategory>()
                .eq(TemuProductCategory::getDeleted, Bool.NO.getCode())
                .eq(TemuProductCategory::getAvailable, Bool.NO.getCode())
                .eq(TemuProductCategory::getLeaf, Bool.YES.getCode())
                .orderByDesc(TemuProductCategory::getCreatedTime)
        )

                ;
    }
}
