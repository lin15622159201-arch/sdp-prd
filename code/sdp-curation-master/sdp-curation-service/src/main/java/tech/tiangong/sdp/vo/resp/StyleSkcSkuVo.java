package tech.tiangong.sdp.vo.resp;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.Accessors;
import lombok.experimental.SuperBuilder;
import java.io.Serializable;


/**
 * SKC 上架表
 *
 * @author ：liuhongfu@zj.tech
 * @version :1.0
 * @date ：2025/12/11 10:27
 */
@Data
@SuperBuilder
@Accessors(chain = true)
@NoArgsConstructor
public class StyleSkcSkuVo implements Serializable {
    /**
     * SKU-ID
     */
    private Long skuId;


    /**
     * SKU编码
     */
    private String skuCode;

    /**
     * 款ID
     */
    private Long styleId;

    /**
     * SKC-ID
     */
    private Long skcId;

    /**
     * SKC-编码
     */
    private String skcCode;

    /**
     * SPU-尺码组
     */
    private String groupName;

    /**
     * SKC-尺码
     */
    private String sizeName;



}
