package tech.tiangong.sdp.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import org.apache.ibatis.annotations.Param;
import tech.tiangong.sdp.entity.StyleOnShelves;
import tech.tiangong.sdp.vo.dto.GroupStatusDTO;
import tech.tiangong.sdp.vo.query.StyleOnShelvesQuery;

import java.util.List;

/**
 * 款上架表Mapper
 *
 * @version :1.0
 * @date ：2025/11/3 15:13
 */
public interface StyleOnShelvesMapper extends BaseMapper<StyleOnShelves> {
    Page<StyleOnShelves> page(@Param("page") Page<StyleOnShelves> page, @Param("query") StyleOnShelvesQuery req);

    List<GroupStatusDTO> selectReviewStatus(@Param("query") StyleOnShelvesQuery query);

    List<GroupStatusDTO> selectShopReviewStatus(@Param("query") StyleOnShelvesQuery query);

    List<GroupStatusDTO> selectReleaseStatus(@Param("query") StyleOnShelvesQuery query);
}
