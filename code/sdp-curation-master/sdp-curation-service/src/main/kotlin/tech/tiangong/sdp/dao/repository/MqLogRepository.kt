package tech.tiangong.sdp.dao.repository

import org.springframework.stereotype.Repository
import team.aikero.blade.data.mybatis.repository.BaseRepository
import tech.tiangong.sdp.dao.entity.MqLog
import tech.tiangong.sdp.dao.mapper.MqLogMapper

/**
 * @author: xieyuxiang
 * @Date 2025/5/16
 */
@Repository
class MqLogRepository : BaseRepository<MqLogMapper, MqLog>() {
}