package tech.tiangong.sdp.dao.repository

import com.baomidou.mybatisplus.extension.kotlin.KtQueryWrapper
import org.springframework.stereotype.Repository
import team.aikero.blade.data.mybatis.repository.BaseRepository
import tech.tiangong.sdp.common.enums.YesOrNoEnum
import tech.tiangong.sdp.dao.entity.PickingAiDesignPicture
import tech.tiangong.sdp.dao.mapper.PickingAiDesignPictureMapper

/**
 * 选款-AI设计款式图(PickingAiDesignPicture)表数据库访问层
 *
 * @author zjh
 * @since 2024-11-28 16:56:52
 */
@Repository
class PickingAiDesignPictureRepository : BaseRepository<PickingAiDesignPictureMapper, PickingAiDesignPicture>() {

    /**
     * 通过pickingStyleIds获取
     * @param pickingStyleIds
     * @return
     */
    fun selectByPickingStyleIds(pickingStyleIds: List<Long>): List<PickingAiDesignPicture> {
        return list(
            KtQueryWrapper(PickingAiDesignPicture::class.java)
                .`in`(PickingAiDesignPicture::pickingStyleId, pickingStyleIds)
                .eq(PickingAiDesignPicture::deleted, YesOrNoEnum.NO.code)
        )
    }

    /**
     * 通过pickingId获取
     * @param pickingId
     * @return
     */
    fun getByPickingId(pickingId: Long): List<PickingAiDesignPicture> {
        return list(
            KtQueryWrapper(PickingAiDesignPicture::class.java)
                .eq(PickingAiDesignPicture::pickingId, pickingId)
                .eq(PickingAiDesignPicture::deleted, YesOrNoEnum.NO.code)
        )
    }

    /**
     * 通过pickingStyleId获取
     * @param pickingStyleId
     * @return
     */
    fun getByPickingStyleId(pickingStyleId: Long): List<PickingAiDesignPicture> {
        return list(
            KtQueryWrapper(PickingAiDesignPicture::class.java)
                .eq(PickingAiDesignPicture::pickingStyleId, pickingStyleId)
                .eq(PickingAiDesignPicture::deleted, YesOrNoEnum.NO.code)
        )
    }
}

