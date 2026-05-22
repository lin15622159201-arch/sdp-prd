package tech.tiangong.sdp.repository;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import org.springframework.stereotype.Repository;
import team.aikero.blade.core.enums.Bool;
import tech.tiangong.sdp.entity.SizePart;
import tech.tiangong.sdp.mapper.SizePartMapper;

import java.util.List;

/**
 * 校验规则表 Repository
 *
 * @author : qinwenxuan@zj.tech
 * @version : 1.0
 * @date : 2025/8/13 16:20
 */
@Repository
public class SizePartRepository extends ManualBaseRepository<SizePartMapper, SizePart> {
    public List<SizePart> listByTemplateIds(
            final List<Long> sizeTemplateIds) {
        return this.list(new LambdaQueryWrapper<SizePart>()
                .eq(SizePart::getDeleted, Bool.NO.getCode())
                .in(SizePart::getTemplateId, sizeTemplateIds)
                .orderByDesc(SizePart::getCreatedTime)
        )

                ;
    }
}
