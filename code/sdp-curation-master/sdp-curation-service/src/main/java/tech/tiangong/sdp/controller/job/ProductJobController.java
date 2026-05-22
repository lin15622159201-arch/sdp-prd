package tech.tiangong.sdp.controller.job;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import team.aikero.blade.auth.annotation.PreCheckIgnore;
import tech.tiangong.sdp.controller.BasicController;
import tech.tiangong.sdp.service.ProductService;

import java.util.List;
import java.util.Set;

/**
 * 商品 - 定时任务
 *
 * @author ：qinwenxuan@zj.tech
 * @version :1.0
 * @date ：2025/11/26 9:59
 */
@RestController
@RequestMapping("/job/product/")
@RequiredArgsConstructor
public class ProductJobController implements BasicController {
    private final ProductService productService;

    @PostMapping("sync")
    @PreCheckIgnore
    public void job() {
        job(productService::job);
    }

    @PostMapping("sales-driving")
    @PreCheckIgnore
    public void salesDriving() {
        job(productService::syncTemuDataGroup);
    }

    @PostMapping("skc/sales-driving")
    @PreCheckIgnore
    public void salesDrivings() {
        job(productService::salesDrivings);
    }

    @PostMapping("skc/related")
    @PreCheckIgnore
    public void related() {
        job(productService::related);
    }
    @PostMapping("skc-code/related")
    @PreCheckIgnore
    public void related(@RequestBody(required = false) Set<String> skcCodes) {
        job(() -> productService.relatedBySkc(skcCodes));
    }

    @PostMapping("binding")
    @PreCheckIgnore
    public void binding(@RequestBody(required = false) Set<String> spuCodes) {
        job(() -> productService.binding(spuCodes));
    }

    @PostMapping("syncNewSkcTemuId")
    @PreCheckIgnore
    public void syncNewSkcTemuId(@RequestBody(required = false) List<Long> productIds) {
        job(() -> productService.syncNewSkcTemuId(productIds));
    }
}
