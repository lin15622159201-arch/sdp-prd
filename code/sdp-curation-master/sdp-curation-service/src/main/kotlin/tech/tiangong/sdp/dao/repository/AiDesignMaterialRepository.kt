package tech.tiangong.sdp.dao.repository

import com.baomidou.mybatisplus.extension.kotlin.KtQueryWrapper
import org.springframework.stereotype.Repository
import team.aikero.blade.core.enums.Bool
import team.aikero.blade.data.mybatis.repository.BaseRepository
import tech.tiangong.sdp.common.enums.YesOrNoEnum
import tech.tiangong.sdp.dao.entity.AiDesignMaterial
import tech.tiangong.sdp.dao.entity.AiDesignTaskFabric
import tech.tiangong.sdp.dao.mapper.AiDesignMaterialMapper

/**
 * AI设计素材表数据库访问层
 *
 * @author     ：qinwenxuan@zj.tech
 * @date       ：2025/7/14 10:35
 * @version    :1.0
 */
@Repository
class AiDesignMaterialRepository : BaseRepository<AiDesignMaterialMapper, AiDesignMaterial>() {
    fun selectByInspirationId(inspirationId: Long?): List<AiDesignMaterial> {
        return list(
            KtQueryWrapper(AiDesignMaterial::class.java)
                .eq(AiDesignMaterial::inspirationId, inspirationId)
                .eq(AiDesignMaterial::deleted, YesOrNoEnum.NO.code)
        )?:listOf()
    }

    fun listByTaskId(taskId: Long?): List<AiDesignMaterial> {
        return list(
            KtQueryWrapper(AiDesignMaterial::class.java)
                .eq(AiDesignMaterial::taskId, taskId)
                .eq(AiDesignMaterial::deleted, YesOrNoEnum.NO.code)
        )?:listOf()
    }

    fun listByTaskId(taskId: Long): List<AiDesignMaterial>? =
        list(
            KtQueryWrapper(AiDesignMaterial::class.java)
                .eq(AiDesignMaterial::taskId, taskId)
                .eq(AiDesignMaterial::deleted, Bool.NO.code)
        )

}

