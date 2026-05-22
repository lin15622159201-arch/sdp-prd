package tech.tiangong.sdp.controller.job;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import team.aikero.blade.auth.annotation.PreCheckIgnore;
import tech.tiangong.sdp.controller.BasicController;
import tech.tiangong.sdp.service.PrototypeService;

/**
 * 款式管理 - 定时任务
 *
 * @author Liuhongfu
 * @version :1.0
 * @date ：2025/11/26 9:59
 */
@RestController
@RequestMapping("/job/prototype")
@RequiredArgsConstructor
public class PrototypeJobController implements BasicController {
    private final PrototypeService prototypeService;

    @PostMapping("/retry")
    @PreCheckIgnore
    public void job() {
        job(prototypeService::job);
    }

    @PostMapping("/sales-driving")
    @PreCheckIgnore
    public void salesDriving() {
        job(prototypeService::salesDriving);
    }
}
