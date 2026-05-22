package tech.tiangong.sdp.vo.resp;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.Accessors;
import lombok.experimental.SuperBuilder;

import java.io.Serial;
import java.io.Serializable;

/**
 * 颜色信息-vo
 *
 * @author while
 */

@Data
@SuperBuilder
@Accessors(chain = true)
@NoArgsConstructor
public class ColorInfoVo implements Serializable {
    @Serial
    private static final long serialVersionUID = 396431891374319971L;

    /**
     * 颜色名称
     */
    private String color;

    /**
     * 颜色英文名
     */
    private String colorEnglishName;

    /**
     * 颜色编码
     */
    private String colorCode;

    /**
     * 颜色编码缩写
     */
    private String colorAbbrCode;

    /**
     * 色号
     */
    private String colorNumber;

}
