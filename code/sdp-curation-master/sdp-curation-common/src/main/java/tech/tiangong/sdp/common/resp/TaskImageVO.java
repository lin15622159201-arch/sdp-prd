package tech.tiangong.sdp.common.resp;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import java.io.Serial;
import java.io.Serializable;

/**
 * 任务图
 *
 * @author : qinwenxuan@zj.tech
 * @version : 1.0
 * @date : 2025/8/19 11:41
 */
@EqualsAndHashCode(callSuper = true)
@Data
@AllArgsConstructor
@NoArgsConstructor
public class TaskImageVO extends BaseVO {
    @Serial
    private static final long serialVersionUID = -5405873460233777733L;
    /**
     * 图片ID
     */
    private Long imageId;
    /**
     * 图片URL
     */
    private String imageUrl;
}
