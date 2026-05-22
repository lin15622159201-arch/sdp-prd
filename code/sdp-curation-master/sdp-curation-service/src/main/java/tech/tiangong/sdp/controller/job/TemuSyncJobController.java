package tech.tiangong.sdp.controller.job;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import team.aikero.blade.auth.annotation.PreCheckIgnore;
import tech.tiangong.sdp.controller.BasicController;
import tech.tiangong.sdp.service.TemuSyncService;

/**
 * temu同步 - 定时任务
 *
 * @author ：qinwenxuan@zj.tech
 * @version :1.0
 * @date ：2025/11/26 9:59
 */
@RestController
@RequestMapping("/job/temu/")
@RequiredArgsConstructor
public class TemuSyncJobController implements BasicController {
    private final TemuSyncService temuSyncService;

    @PostMapping("sync/review-price")
    @PreCheckIgnore
    public void syncReviewPrice() {
        job(temuSyncService::job);
    }
    @PostMapping("sync/product")
    @PreCheckIgnore
    public void syncProduct() {
        job(temuSyncService::syncProduct);
    }
    @PostMapping("sync/product-data")
    @PreCheckIgnore
    public void sync() {
        job(temuSyncService::sync);
    }
    @PostMapping("update/product-tenant")
    @PreCheckIgnore
    public void updateProductTenant() {
        job(temuSyncService::updateProductTenant);
    }
}
