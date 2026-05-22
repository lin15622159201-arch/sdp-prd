package tech.tiangong.sdp.repository;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import org.springframework.stereotype.Repository;
import team.aikero.blade.core.enums.Bool;
import tech.tiangong.sdp.entity.TemuProductTemplateProperty;
import tech.tiangong.sdp.mapper.TemuProductTemplatePropertyMapper;

import java.util.List;

/**
 * Temu商品模板值表 Repository
 *
 * @author : qinwenxuan@zj.tech
 * @version : 1.0
 * @date : 2025/8/13 16:20
 */
@Repository
public class TemuProductTemplatePropertyRepository extends ManualBaseRepository<TemuProductTemplatePropertyMapper,
        TemuProductTemplateProperty> {
    public List<TemuProductTemplateProperty> listByTemplateId(final Long templateId) {
        return this.list(new LambdaQueryWrapper<TemuProductTemplateProperty>()
                .eq(TemuProductTemplateProperty::getDeleted, Bool.NO.getCode())
                .eq(TemuProductTemplateProperty::getTemplateId, templateId)
                .orderByDesc(TemuProductTemplateProperty::getCreatedTime)
        )

                ;
    }

}
