package tech.tiangong.sdp.repository;

import cn.hutool.core.collection.CollectionUtil;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.conditions.update.LambdaUpdateWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import org.springframework.stereotype.Repository;
import team.aikero.blade.core.enums.Bool;
import team.aikero.blade.data.mybatis.repository.BaseRepository;
import tech.tiangong.sdp.entity.StyleOnShelves;
import tech.tiangong.sdp.enums.ShopReviewStatusEnum;
import tech.tiangong.sdp.enums.SpotStyleTypeEnum;
import tech.tiangong.sdp.mapper.StyleOnShelvesMapper;
import tech.tiangong.sdp.vo.dto.GroupStatusDTO;
import tech.tiangong.sdp.vo.query.StyleOnShelvesQuery;

import java.util.List;

/**
 * 款上架表Repository
 *
 * @author : qinwenxuan@zj.tech
 * @version : 1.0
 * @date : 2025/8/13 16:20
 */
@Repository
public class StyleOnShelvesRepository extends BaseRepository<StyleOnShelvesMapper, StyleOnShelves> {

    public IPage<StyleOnShelves> webPage(final StyleOnShelvesQuery req) {
        return this.baseMapper.page(new Page<>(req.getPageNum(), req.getPageLimit()), req);
    }

    public List<GroupStatusDTO> selectReviewStatus(StyleOnShelvesQuery query) {
        return baseMapper.selectReviewStatus(query);
    }
    public List<GroupStatusDTO> selectShopReviewStatus(StyleOnShelvesQuery query) {
        return baseMapper.selectShopReviewStatus(query);
    }

    public List<GroupStatusDTO> selectReleaseStatus(StyleOnShelvesQuery query) {
        return baseMapper.selectReleaseStatus(query);
    }

    public void updatePushShopReview(List<Long> styleIds) {
        baseMapper.update(new LambdaUpdateWrapper<StyleOnShelves>()
                .set(StyleOnShelves::getShopReviewStatus, ShopReviewStatusEnum.WAIT_REVIEW.getCode())
                .set(StyleOnShelves::getReviewFailReason, "")
                .set(StyleOnShelves::getShopReviewTime, null)
                .set(StyleOnShelves::getShopReviewUserId, null)
                .set(StyleOnShelves::getShopReviewUserName, "")
                .in(StyleOnShelves::getStyleId,styleIds));
    }

    public List<StyleOnShelves> selectDesignTask(List<String> styleCodes) {
        return baseMapper.selectList(new QueryWrapper<StyleOnShelves>().lambda().
                in(CollectionUtil.isNotEmpty(styleCodes), StyleOnShelves::getStyleCode, styleCodes)
                .eq(StyleOnShelves::getDeleted, Bool.NO.getCode())
                .ne(StyleOnShelves::getStyleType, SpotStyleTypeEnum.SPOT_STYLE.getVale())
        );
    }
}
