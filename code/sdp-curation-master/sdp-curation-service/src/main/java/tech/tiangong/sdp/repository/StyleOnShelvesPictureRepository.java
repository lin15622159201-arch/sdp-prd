package tech.tiangong.sdp.repository;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import org.springframework.stereotype.Repository;
import team.aikero.blade.core.enums.Bool;
import team.aikero.blade.data.mybatis.repository.BaseRepository;
import tech.tiangong.sdp.entity.StyleSkcOnShelvesPicture;
import tech.tiangong.sdp.mapper.StyleOnShelvesPictureMapper;

import java.util.List;

/**
 * 款上架图片表Repository
 *
 * @author : liuhongfu@zj.tech
 * @version : 1.0
 * @date : 2025/8/13 16:20
 */
@Repository
public class StyleOnShelvesPictureRepository extends BaseRepository<StyleOnShelvesPictureMapper, StyleSkcOnShelvesPicture> {
    public List<StyleSkcOnShelvesPicture> selectByStyleId(List<Long> styleIds) {
        return this.list(new LambdaQueryWrapper<StyleSkcOnShelvesPicture>()
                .eq(StyleSkcOnShelvesPicture::getDeleted, Bool.NO.getCode())
                .in(StyleSkcOnShelvesPicture::getStyleId, styleIds)
                .orderByDesc(StyleSkcOnShelvesPicture::getCreatedTime)
                .orderByAsc(StyleSkcOnShelvesPicture::getPictureId)
        );
    }

    public void deleteByStyleId(Long styleId) {
        baseMapper.deleteByStyleId(styleId);
    }
}
