package tech.tiangong.sdp.service.impl;

import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import tech.tiangong.sdp.external.PlmBaseRemoteHelper;
import tech.tiangong.sdp.service.PlmBaseService;
import tech.tiangong.sdp.vo.resp.ColorCategoryVO;
import java.util.List;
import java.util.stream.Collectors;

/**
 * PLM基础信息远Service
 *
 * @author ：liuhongfu
 * @version :1.0
 * @date ：2025/11/4 15:31
 */
@Slf4j
@Service
@AllArgsConstructor
public class PlmBaseServiceImpl implements PlmBaseService {

    private final PlmBaseRemoteHelper plmBaseRemoteHelper;


    @Override
    public List<ColorCategoryVO> colorCategory() {
        final var resp = this.plmBaseRemoteHelper.colorCategory();
        return resp.stream().map(t -> {
            ColorCategoryVO vo = new ColorCategoryVO();
            vo.setName(t.getColorCategoryName());
            vo.setCode(t.getColorCategoryCode());
            List<ColorCategoryVO.ColorResp> colorRespList = t.getColorRespList().stream()
                    .map(color -> {
                        ColorCategoryVO.ColorResp colorResp = new ColorCategoryVO.ColorResp();
                        colorResp.setCode(color.getColorCode());
                        colorResp.setName(color.getColor());
                        return colorResp;
                    }).collect(Collectors.toList());
            vo.setColorRespList(colorRespList);
            return vo;
        }).collect(Collectors.toList());
    }
}