package tech.tiangong.sdp.vo.resp;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import tech.tiangong.sdp.common.resp.TaskImageVO;
import tech.tiangong.sdp.enums.SpotStylePictureTypeEnum;

import java.io.Serial;

/**
 * 开款任务 - 图片
 *
 * @author ：qinwenxuan@zj.tech
 * @version :1.0
 * @date ：2025/11/3 18:31
 */
@EqualsAndHashCode(callSuper = true)
@Data
@AllArgsConstructor
@NoArgsConstructor
public class SpotStylePictureResp extends TaskImageVO {
    @Serial
    private static final long serialVersionUID = 6855704561379797946L;
    /**
     * SKC ID
     */
    private Long skcId;
    /**
     * 图片类型
     */
    private SpotStylePictureTypeEnum pictureType;
}
