package tech.tiangong.sdp.controller.job;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import team.aikero.blade.auth.annotation.PreCheckIgnore;
import tech.tiangong.sdp.controller.BasicController;
import tech.tiangong.sdp.service.TemuTaskService;

import java.util.Set;

/**
 * temu任务 - 定时任务
 *
 * @author ：qinwenxuan@zj.tech
 * @version :1.0
 * @date ：2025/11/26 9:59
 */
@RestController
@RequestMapping("/job/temu-task/")
@RequiredArgsConstructor
public class TemuTaskJobController implements BasicController {
    private final TemuTaskService temuTaskService;

    @PostMapping("retry")
    @PreCheckIgnore
    public void retry() {
        job(temuTaskService::job);
    }

    @PostMapping("retry-product")
    @PreCheckIgnore
    public void retryProduct(@RequestBody(required = false) Set<Long> productIds) {
        job(() -> temuTaskService.retry(productIds));
    }
}
