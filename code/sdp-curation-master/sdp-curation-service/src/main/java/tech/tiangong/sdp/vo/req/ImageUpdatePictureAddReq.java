package tech.tiangong.sdp.vo.req;

import lombok.Data;
import java.io.Serializable;

/**
 * 图片修复任务 - 图片新增
 *
 * @author ：liuhongfu
 * @version :1.0
 * @date ：2025/11/3 18:52
 */
@Data
public class ImageUpdatePictureAddReq implements Serializable {


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
