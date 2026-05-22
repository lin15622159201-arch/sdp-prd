package tech.tiangong.sdp.vo.dto;

import lombok.Data;
import java.io.Serial;
import java.io.Serializable;

/**
 * SPU图片相关信息
 *
 * @author ：liuhongfu
 * @version :1.0
 * @date ：2025/11/5 16:47
 */
@Data
public class ImageUpdatePictureDTO implements Serializable {
    @Serial
    private static final long serialVersionUID = -542493380571514415L;

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
