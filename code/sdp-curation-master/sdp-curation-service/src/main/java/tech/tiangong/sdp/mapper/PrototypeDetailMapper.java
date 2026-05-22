package tech.tiangong.sdp.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import org.apache.ibatis.annotations.Mapper;
import tech.tiangong.sdp.entity.PrototypeDetail;

/**
 * 版单详情表数据库访问层
 *
 * @author husky
 * @since 2021-08-09 14:50:33
 */
@Mapper
public interface PrototypeDetailMapper extends BaseMapper<PrototypeDetail> {

    /**
     * 批量更新版单详情中的品质等级信息
     * @param updateList 更新集合
     */
    //void batchUpdateQualityLeverInfo(List<Spu2SkcUpdateDto> updateList);
}