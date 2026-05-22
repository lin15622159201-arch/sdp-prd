package tech.tiangong.sdp.repository;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import org.springframework.stereotype.Repository;
import team.aikero.blade.core.enums.Bool;
import team.aikero.blade.data.mybatis.repository.BaseRepository;
import tech.tiangong.sdp.entity.SkcOnShelves;
import tech.tiangong.sdp.mapper.SkcOnShelvesMapper;

import java.util.List;

/**
 * SKC上架表Repository
 *
 * @author : qinwenxuan@zj.tech
 * @version : 1.0
 * @date : 2025/8/13 16:20
 */
@Repository
public class SkcOnShelvesRepository extends BaseRepository<SkcOnShelvesMapper, SkcOnShelves> {

    public List<SkcOnShelves> selectByStyleId(List<Long> styleIds) {
        return this.list(new LambdaQueryWrapper<SkcOnShelves>()
                .eq(SkcOnShelves::getDeleted, Bool.NO.getCode())
                .eq(SkcOnShelves::getShowDetail, Bool.YES.getCode())
                .in(SkcOnShelves::getStyleId, styleIds)
                .orderByDesc(SkcOnShelves::getCreatedTime)
        );
    }

    public List<SkcOnShelves> selectAllByStyleId(List<Long> styleIds) {
        return this.list(new LambdaQueryWrapper<SkcOnShelves>()
                .eq(SkcOnShelves::getDeleted, Bool.NO.getCode())
                .in(SkcOnShelves::getStyleId, styleIds)
                .orderByDesc(SkcOnShelves::getCreatedTime)
        );
    }
 public List<SkcOnShelves> listByPreDisassemblyState(final Integer preDisassemblyState) {
        return this.list(new LambdaQueryWrapper<SkcOnShelves>()
                .eq(SkcOnShelves::getDeleted, Bool.NO.getCode())
                .eq(SkcOnShelves::getPreDisassemblyState, preDisassemblyState)
                .orderByDesc(SkcOnShelves::getCreatedTime)
        );
    }

}
