package tech.tiangong.sdp.vo.resp;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.Accessors;
import lombok.experimental.SuperBuilder;
import java.io.Serializable;

/**
 * 款上架图片表(style_on_shelves_picture)实体类
 *
 * @author liuhongfu
 * @since 2025-11-03 14:39:38
 */

@Data
@SuperBuilder
@Accessors(chain = true)
@NoArgsConstructor
public class StyleSkcOnShelvesPictureVo implements Serializable {
    /**
     * 图片ID
     */
    private Long pictureId;


    /**
     * 款ID
     */
    private Long styleId;

    /**
     * SKC-ID
     */
    private Long skcId;


    /**
     * 图片类型，0-商品图，1-尺码图
     */
    private Integer pictureType;


    /**
     * 材料类型: 0-图片; 1-视频
     */
    private Integer materialType;


    /**
     * 图片URL
     */
    private String pictureUrl;

    /**
     * 裁剪图
     */
    private String cropImgUrl;


    /**
     * 序号
     */
    private Integer serialNum;

}


