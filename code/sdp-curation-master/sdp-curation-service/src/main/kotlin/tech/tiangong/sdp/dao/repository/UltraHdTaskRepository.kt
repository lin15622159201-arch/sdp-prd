package tech.tiangong.sdp.dao.repository

import org.springframework.stereotype.Repository
import team.aikero.blade.data.mybatis.repository.BaseRepository
import tech.tiangong.sdp.dao.entity.UltraHdTask
import tech.tiangong.sdp.dao.mapper.UltraHdTaskMapper


@Repository
class UltraHdTaskRepository : BaseRepository<UltraHdTaskMapper, UltraHdTask>() {

}

