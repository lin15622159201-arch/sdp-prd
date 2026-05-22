package tech.tiangong.sdp.service;


import tech.tiangong.sdp.vo.resp.ColorCategoryVO;
import java.util.List;

/**
 *  PLM基础信息远Service
 *
 * @author ：liuhongfu
 * @version :1.0
 * @date ：2025/11/4 15:17
 */
public interface PlmBaseService {

    List<ColorCategoryVO> colorCategory();
}
