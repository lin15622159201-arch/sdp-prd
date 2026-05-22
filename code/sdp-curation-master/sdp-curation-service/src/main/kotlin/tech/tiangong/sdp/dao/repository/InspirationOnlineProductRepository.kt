package tech.tiangong.sdp.dao.repository

import com.baomidou.mybatisplus.extension.kotlin.KtQueryWrapper
import org.springframework.stereotype.Repository
import team.aikero.blade.data.mybatis.repository.BaseRepository
import tech.tiangong.sdp.dao.entity.InspirationOnlineProduct
import tech.tiangong.sdp.dao.mapper.InspirationOnlineProductMapper

/**
 * 灵感上架商品(InspirationOnlineProduct)表数据库访问层
 *
 * @author zjh
 * @since 2024-12-19 10:05:31
 */
@Repository
class InspirationOnlineProductRepository : BaseRepository<InspirationOnlineProductMapper, InspirationOnlineProduct>() {

    /**
     * 根据灵感id和商品id查询
     *
     * @author zjh
     * @since 2024-12-19 10:05:31
     */
    fun getByInspirationIdAndOnlineSaleItemId(inspireSourceId: Long, onlineSaleItemId: Long): List<InspirationOnlineProduct> {
        return this.list(
            KtQueryWrapper(InspirationOnlineProduct::class.java)
                .eq(InspirationOnlineProduct::inspirationId, inspireSourceId)
                .eq(InspirationOnlineProduct::onlineSaleItemId, onlineSaleItemId)
        )
    }
}

