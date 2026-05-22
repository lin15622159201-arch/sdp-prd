package tech.tiangong.sdp.vo.resp;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import tech.tiangong.sdp.common.resp.BaseVO;
import java.io.Serial;

/**
 * 图片修复任务 - 图片
 *
 * @author ：liuhongfu
 * @version :1.0
 * @date ：2025/11/3 18:31
 */
@EqualsAndHashCode(callSuper = true)
@Data
@AllArgsConstructor
@NoArgsConstructor
public class ImageUpdatePictureResp extends BaseVO {

    @Serial
    private static final long serialVersionUID = 6855704561379797946L;


    /**
     * 图片ID
     */
    private Long pictureId;


    /**
     * 图片修复任务ID
     */
    private Long taskId;

    /**
     * spu的ID
     */
    private Long spuId;


    /**
     * skc-ID
     */
    private Long skcId;


    /**
     * 图片URL
     */
    private String pictureUrl;

    /**
     * 序号
     */
    private Integer serialNum;


    /**
     * 修图需求说明
     */
    private String pictureDescribe;

    /**
     * 说明里面添加图片说明信息
     */
    private String attachment;
}
