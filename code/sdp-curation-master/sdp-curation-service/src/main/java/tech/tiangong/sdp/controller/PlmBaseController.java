package tech.tiangong.sdp.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import team.aikero.blade.core.constant.UrlVersionConstant;
import team.aikero.blade.core.protocol.DataResponse;
import tech.tiangong.sdp.service.PlmBaseService;
import tech.tiangong.sdp.vo.resp.ColorCategoryVO;
import java.util.List;

/**
 * PLM基础信息 - WEB
 *
 * @author ：liuhongfu
 * @version :1.0
 * @date ：2025/11/5 16:52
 */
@RestController
@RequestMapping(UrlVersionConstant.WEB + UrlVersionConstant.VERSION_V1 + "/base")
@RequiredArgsConstructor
public class PlmBaseController implements BasicController {

    private final PlmBaseService plmBaseService;


    /**
     * 全部类别以及下属的颜色
     * @return 列表
     */
    @PostMapping("/all-color-category")
    public DataResponse<List<ColorCategoryVO>> allColorCategory() {
        return list(plmBaseService::colorCategory);
    }


}
