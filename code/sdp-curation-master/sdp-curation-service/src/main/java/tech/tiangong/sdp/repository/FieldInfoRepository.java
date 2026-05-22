package tech.tiangong.sdp.repository;

import org.springframework.stereotype.Repository;
import tech.tiangong.sdp.entity.FieldInfo;
import tech.tiangong.sdp.mapper.FieldInfoMapper;

/**
 * 字段信息表 Repository
 *
 * @author : qinwenxuan@zj.tech
 * @version : 1.0
 * @date : 2025/8/13 16:20
 */
@Repository
public class FieldInfoRepository extends ManualBaseRepository<FieldInfoMapper, FieldInfo> {
}
