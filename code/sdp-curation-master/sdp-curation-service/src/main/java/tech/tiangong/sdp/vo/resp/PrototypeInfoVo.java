package tech.tiangong.sdp.vo.resp;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.experimental.Accessors;
import lombok.experimental.SuperBuilder;

import java.io.Serial;
import java.util.List;

/**
 * 设计款管理 skc信息
 *
 * @author while
 */
@Data
@SuperBuilder
@Accessors(chain = true)
@EqualsAndHashCode(callSuper=true)
@NoArgsConstructor
public class PrototypeInfoVo extends PrototypeVo {
    @Serial
    private static final long serialVersionUID = -969431200718977481L;

    /**
     * 颜色信息集合
     */
    private List<ColorInfoVo> colorInfoList;

    /**
     * Bom信息集合
     */
    private List<BomOrderVo> bomList;

    /**
     * 花型图ID
     */
    private Long patternPictureId;

    /**
     * 花型图URL
     */
    private String patternPictureUrl;
}
