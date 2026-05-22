package tech.tiangong.sdp.common.resp;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import java.io.Serial;

/**
 * BasicTaskVO
 *
 * @author ：qinwenxuan@zj.tech
 * @version :1.0
 * @date ：2025/10/31 11:09
 */
@EqualsAndHashCode(callSuper = true)
@Data
@AllArgsConstructor
@NoArgsConstructor
public class BasicVO extends BaseVO {
    @Serial
    private static final long serialVersionUID = 1239887595738503010L;
    /**
     * 任务id
     */
    private Long taskId;
    /**
     * 任务编号
     */
    private String taskCode;


}
