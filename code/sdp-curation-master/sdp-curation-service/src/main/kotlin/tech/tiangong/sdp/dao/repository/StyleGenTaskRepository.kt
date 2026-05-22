package tech.tiangong.sdp.dao.repository

import org.springframework.stereotype.Repository
import team.aikero.blade.data.mybatis.repository.BaseRepository
import tech.tiangong.sdp.dao.entity.StyleGenTask
import tech.tiangong.sdp.dao.mapper.StyleGenTaskMapper

/**
 * 风格小模型任务表数据库访问层
 *
 * @author zjh
 * @since 2024-11-29 11:00:23
 */
@Repository
class StyleGenTaskRepository : BaseRepository<StyleGenTaskMapper, StyleGenTask>() {

}

