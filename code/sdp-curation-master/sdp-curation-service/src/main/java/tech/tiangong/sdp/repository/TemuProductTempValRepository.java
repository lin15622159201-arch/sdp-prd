package tech.tiangong.sdp.repository;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import org.springframework.stereotype.Repository;
import team.aikero.blade.core.enums.Bool;
import tech.tiangong.sdp.entity.TemuProductTempVal;
import tech.tiangong.sdp.entity.TemuProductTempVal;
import tech.tiangong.sdp.mapper.TemuProductTempValMapper;

import java.util.List;

/**
 * Temu商品模板值表 Repository
 *
 * @author : qinwenxuan@zj.tech
 * @version : 1.0
 * @date : 2025/8/13 16:20
 */
@Repository
public class TemuProductTempValRepository extends ManualBaseRepository<TemuProductTempValMapper, TemuProductTempVal> {
    public List<TemuProductTempVal> listByTemplateId(final Long templateId) {
        return this.list(new LambdaQueryWrapper<TemuProductTempVal>()
                .eq(TemuProductTempVal::getDeleted, Bool.NO.getCode())
                .eq(TemuProductTempVal::getTemplateId, templateId)
                .orderByDesc(TemuProductTempVal::getCreatedTime)
        )

                ;
    }

    public List<TemuProductTempVal> listByBaseAttrId(final Long baseAttrId) {
        return this.list(new LambdaQueryWrapper<TemuProductTempVal>()
                .eq(TemuProductTempVal::getDeleted, Bool.NO.getCode())
                .eq(TemuProductTempVal::getBaseAttrId, baseAttrId)
                .orderByDesc(TemuProductTempVal::getCreatedTime)
        )

                ;
    }
}
