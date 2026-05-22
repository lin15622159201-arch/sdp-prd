package tech.tiangong.sdp.dao.repository

import com.baomidou.mybatisplus.extension.kotlin.KtQueryWrapper
import org.springframework.stereotype.Repository
import team.aikero.blade.core.enums.Bool
import team.aikero.blade.data.mybatis.repository.BaseRepository
import tech.tiangong.sdp.common.enums.YesOrNoEnum
import tech.tiangong.sdp.dao.entity.AiDesignTaskPicture
import tech.tiangong.sdp.dao.mapper.AiDesignTaskPictureMapper

/**
 * AI设计任务-结果图(AiDesignTaskPicture)表数据库访问层
 *
 * @author zjh
 * @since 2024-11-29 11:00:24
 */
@Repository
class AiDesignTaskPictureRepository : BaseRepository<AiDesignTaskPictureMapper, AiDesignTaskPicture>() {
    /**
     * 根据任务id物理删除
     */
    fun deleteByTaskId(taskId: Long) {
        this.baseMapper.deleteByTaskId(taskId)
    }

    /**
     * taskId 查询
     */
    fun listByTaskId(taskId: Long?): List<AiDesignTaskPicture> {
        return list(
            KtQueryWrapper(AiDesignTaskPicture::class.java)
                .eq(AiDesignTaskPicture::taskId, taskId)
                .eq(AiDesignTaskPicture::deleted, YesOrNoEnum.NO.code)
        )
    }

}

