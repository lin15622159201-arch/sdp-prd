package tech.tiangong.sdp.repository;

import org.springframework.stereotype.Repository;
import tech.tiangong.sdp.entity.GradingSize;
import tech.tiangong.sdp.mapper.GradingSizeMapper;


/**
 * 放码尺寸表-服务接口
 *
 * @author liuhongfu
 * @since 2025-12-17 15:39:12
 */
@Repository
public class GradingSizeRepository extends ManualBaseRepository<GradingSizeMapper, GradingSize> {

}
