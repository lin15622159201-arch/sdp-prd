package tech.tiangong.sdp.dao.repository

import org.springframework.stereotype.Repository
import team.aikero.blade.data.mybatis.repository.BaseRepository
import tech.tiangong.sdp.dao.entity.PickingAiHistory2024
import tech.tiangong.sdp.dao.mapper.PickingAiHistory2024Mapper

/**
 * 选款-历史数据(2024年)(PickingAiHistory2024)表数据库访问层
 *
 * @author qinwenxuan@zj.tech
 * @since 2025-02-06 17:58:44
 */
@Repository
class PickingAiHistory2024Repository : BaseRepository<PickingAiHistory2024Mapper, PickingAiHistory2024>()

