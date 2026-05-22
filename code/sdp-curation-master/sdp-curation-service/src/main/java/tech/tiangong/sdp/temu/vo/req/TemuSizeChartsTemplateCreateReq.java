package tech.tiangong.sdp.temu.vo.req;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import tech.tiangong.sdp.temu.vo.TemuCommonReq;

import java.io.Serial;

/**
 * Temu创建尺码表模板
 *
 * @author ：qinwenxuan@zj.tech
 * @version :1.0
 * @date ：2025/12/25 15:19
 */
@EqualsAndHashCode(callSuper = true)
@Data
@AllArgsConstructor
@NoArgsConstructor
public class TemuSizeChartsTemplateCreateReq extends TemuCommonReq {

    @Serial
    private static final long serialVersionUID = 4202000946054665075L;
    /**
     * 基础模板 ID
     */
    private Long businessId;
    
}
