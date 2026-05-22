package tech.tiangong.sdp.service;

import tech.tiangong.sdp.entity.Shop;
import tech.tiangong.sdp.vo.dto.TemuAppDTO;

/**
 * Temu同步服务
 *
 * @author ：qinwenxuan@zj.tech
 * @version :1.0
 * @date ：2026/3/18 15:57
 */
public interface TemuSyncService extends BasicService{
    void sync(final TemuAppDTO app);
    void syncReviewPrice(final Shop shop);
    void sync(final Long shopId);
    void sync(final Long shopId,final String skcCode);
    void syncProduct();
    void sync();
    void test();

    void updateProductTenant();
}
