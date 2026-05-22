package tech.tiangong.sdp.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import tech.tiangong.sdp.entity.TemuProductFile;

/**
 * Temu商品文件表 Mapper
 *
 * @author : qinwenxuan@zj.tech
 * @version : 1.0
 * @date : 2025/8/13 16:16
 */
public interface TemuProductFileMapper extends BaseMapper<TemuProductFile> {

    TemuProductFile logicOne(Long id);
}
