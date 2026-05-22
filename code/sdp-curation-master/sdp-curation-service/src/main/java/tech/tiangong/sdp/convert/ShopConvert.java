package tech.tiangong.sdp.convert;

import lombok.experimental.UtilityClass;
import team.aikero.blade.core.enums.Bool;
import tech.tiangong.sdp.entity.Shop;
import tech.tiangong.sdp.entity.ShopApp;
import tech.tiangong.sdp.entity.TemuAppConfig;
import tech.tiangong.sdp.vo.dto.TemuAppDTO;
import tech.tiangong.sdp.vo.req.ShopAddReq;
import tech.tiangong.sdp.vo.req.ShopEditReq;
import tech.tiangong.sdp.vo.resp.ShopResp;

import javax.validation.ValidationException;
import java.util.List;
import java.util.Map;
import java.util.Objects;

/**
 * 店铺工具类
 *
 * @author ：qinwenxuan@zj.tech
 * @version :1.0
 * @date ：2026/1/16 18:33
 */
@UtilityClass
public class ShopConvert {
    public TemuAppDTO convert(final Shop shop, final ShopApp app) {
        final var dto = new TemuAppDTO();
        dto.setAccessToken(shop.getProductToken());
        dto.setOrderToken(shop.getOrderToken());
        dto.setAppSecret(app.getAppSecret());
        dto.setAppKey(app.getAppKey());
        dto.setShopId(shop.getShopId());
        dto.setShopName(shop.getShopName());
        return dto;
    }

    public ShopResp convert(final Shop shop) {
        return BasicConvert.copy(shop, ShopResp.class);
    }

    public List<Shop> convert(final List<ShopAddReq> list,
                              final Map<String, TemuAppConfig> configMap) {
        return list.stream().map(it -> {
            final var config = configMap.get(it.getSubjectCode());
            if (Objects.isNull(config)) {
                throw new ValidationException("主体【" + it.getSubjectName() + "】对应的APP配置不存在，请修改");
            }
            final var e = new Shop();
            BasicConvert.copy(it, e);
            BasicConvert.entityInit(e, e::setShopId);
            e.setEnable(Bool.YES.getCode());
            e.setExpired(Bool.YES.getCode()) ;
            final var app = new ShopApp();
            app.setAppId(e.getShopId());
            app.setShopId(e.getShopId());
            app.setAppKey(config.getAppKey());
            app.setAppSecret(config.getAppSecret());
            BasicConvert.entityInit(e);
            e.setApps(List.of(app));
            return e;
        }).toList();
    }

    public void convert(final Shop shop, final ShopEditReq req) {
        BasicConvert.copy(req, shop);
        BasicConvert.setRevised(shop);
    }

}
