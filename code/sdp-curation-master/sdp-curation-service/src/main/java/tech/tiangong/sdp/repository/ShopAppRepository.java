package tech.tiangong.sdp.repository;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import org.springframework.stereotype.Repository;
import team.aikero.blade.core.enums.Bool;
import tech.tiangong.sdp.entity.ShopApp;
import tech.tiangong.sdp.mapper.ShopAppMapper;

/**
 * 店铺APP 表 Repository
 *
 * @author : qinwenxuan@zj.tech
 * @version : 1.0
 * @date : 2025/8/13 16:20
 */
@Repository
public class ShopAppRepository extends ManualBaseRepository<ShopAppMapper, ShopApp> {
    public ShopApp getByShopId(final Long shopId) {
        return this.getOne(new LambdaQueryWrapper<ShopApp>()
                .eq(ShopApp::getDeleted, Bool.NO.getCode())
                .in(ShopApp::getShopId, shopId)
                .orderByDesc(ShopApp::getCreatedTime)
        )

                ;
    }
}
