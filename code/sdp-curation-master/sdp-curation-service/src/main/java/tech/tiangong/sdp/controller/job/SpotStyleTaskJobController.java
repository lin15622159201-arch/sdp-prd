package tech.tiangong.sdp.controller.job;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import team.aikero.blade.auth.annotation.PreCheckIgnore;
import tech.tiangong.sdp.controller.BasicController;
import tech.tiangong.sdp.service.SpotStyleTaskService;

/**
 * 现货任务 - 定时任务
 *
 * @author ：qinwenxuan@zj.tech
 * @version :1.0
 * @date ：2025/11/26 9:59
 */
@RestController
@RequestMapping("/job/spot-style/")
@RequiredArgsConstructor
public class SpotStyleTaskJobController implements BasicController {
    private final SpotStyleTaskService spotStyleTaskService;

    @PostMapping("retry")
    @PreCheckIgnore
    public void job() {
        job(spotStyleTaskService::job);
    }

    @PostMapping("history-vector")
    @PreCheckIgnore
    public void historyVector() {
        job(spotStyleTaskService::historyVector);
    }
}
