package tech.tiangong.sdp.controller.job;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import team.aikero.blade.auth.annotation.PreCheckIgnore;
import tech.tiangong.datagroup.service.TemuDataService;
import tech.tiangong.sdp.controller.BasicController;

/**
 * temu数据 - 定时任务
 *
 * @author ：qinwenxuan@zj.tech
 * @version :1.0
 * @date ：2025/11/26 9:59
 */
@RestController
@RequestMapping("/job/temu/")
@RequiredArgsConstructor
public class TemuDataJobController implements BasicController {
    private final TemuDataService temuDataService;

    @PostMapping("data")
    @PreCheckIgnore
    public void data() {
        job(temuDataService);
    }

    @PostMapping("sync")
    @PreCheckIgnore
    public void sync() {
        job(temuDataService::sync);
    }
}
