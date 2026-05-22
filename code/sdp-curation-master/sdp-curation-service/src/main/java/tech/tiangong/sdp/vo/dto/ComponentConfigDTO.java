package tech.tiangong.sdp.vo.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serial;
import java.io.Serializable;

/**
 * 组件配置
 *
 * @author ：qinwenxuan@zj.tech
 * @version :1.0
 * @date ：2025/12/23 14:33
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ComponentConfigDTO implements Serializable {
    @Serial
    private static final long serialVersionUID = 3955160680902583387L;
    /**
     * 格式
     */
    private String format;
    /**
     * 最小值
     */
    private String min;
    /**
     * 最大值
     */
    private String max;
    /**
     * 提示
     */
    private String placeholder;
}
