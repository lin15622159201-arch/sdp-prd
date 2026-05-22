package tech.tiangong.sdp.common.resp;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serial;
import java.io.Serializable;
import java.time.LocalDateTime;

/**
 * BasicVO
 *
 * @author ：qinwenxuan@zj.tech
 * @version :1.0
 * @date ：2025/11/3 18:36
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class BaseVO implements Serializable {

    @Serial
    private static final long serialVersionUID = -7809363903170057312L;
    /**
     * 创建人 ID
     */
    private Long creatorId;

    /**
     * 创建人名称
     */
    private String creatorName;
    /**
     * 创建时间
     */
    private LocalDateTime createdTime;

    /**
     * 修改人ID
     */
    private Long reviserId;

    /**
     * 修改人名称
     */
    private String reviserName;


    /**
     * 更新时间
     */
    private LocalDateTime revisedTime;
}
