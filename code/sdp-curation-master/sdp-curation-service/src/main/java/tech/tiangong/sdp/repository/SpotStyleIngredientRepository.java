package tech.tiangong.sdp.repository;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import org.springframework.stereotype.Repository;
import team.aikero.blade.core.enums.Bool;
import tech.tiangong.sdp.entity.SpotStyleIngredient;
import tech.tiangong.sdp.mapper.SpotStyleIngredientMapper;

import java.util.List;

/**
 * 现货成分表Repository
 *
 * @author ：qinwenxuan@zj.tech
 * @version :1.0
 * @date ：2025/11/3 15:15
 */
@Repository
public class SpotStyleIngredientRepository extends ManualBaseRepository<SpotStyleIngredientMapper, SpotStyleIngredient> {
    public List<SpotStyleIngredient> listByTaskIds(final List<Long> taskIds) {
        return this.list(new LambdaQueryWrapper<SpotStyleIngredient>()
                .eq(SpotStyleIngredient::getDeleted, Bool.NO.getCode())
                .in(SpotStyleIngredient::getTaskId, taskIds)
                .orderByDesc(SpotStyleIngredient::getCreatedTime)
        )

                ;
    }
}
