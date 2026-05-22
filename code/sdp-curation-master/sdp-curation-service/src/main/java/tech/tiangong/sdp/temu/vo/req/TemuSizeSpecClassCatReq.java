package tech.tiangong.sdp.temu.vo.req;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import tech.tiangong.sdp.temu.vo.TemuCommonReq;

import java.io.Serial;
import java.util.List;

/**
 * Temu尺码分组配置
 *
 * @author ：qinwenxuan@zj.tech
 * @version :1.0
 * @date ：2025/12/25 15:19
 */
@EqualsAndHashCode(callSuper = true)
@Data
@AllArgsConstructor
@NoArgsConstructor
public class TemuSizeSpecClassCatReq extends TemuCommonReq {

    @Serial
    private static final long serialVersionUID = 3168084281026516282L;
    /**
     * 类目 ID
     */
    private Long catId;
    /**
     *尺码组 ID
     */
    private Long classId;
   
}
