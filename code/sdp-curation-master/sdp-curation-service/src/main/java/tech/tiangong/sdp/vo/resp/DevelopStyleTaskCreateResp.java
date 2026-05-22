package tech.tiangong.sdp.vo.resp;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;
import lombok.experimental.Accessors;
import lombok.experimental.SuperBuilder;
import java.io.Serial;
import java.io.Serializable;

/**
 * 开款任务 - 创建数据返回
 *
 * @author ：liuhongfu@zj.tech
 * @version :1.0
 * @date ：2025/11/3 18:08
 */
@Data
@SuperBuilder
@Accessors(chain = true)
@NoArgsConstructor
@ToString
public class DevelopStyleTaskCreateResp implements Serializable {
    @Serial
    private static final long serialVersionUID = 2386940987489394798L;


    /**
     * 创建结果,0-失败，1-成功
     */
    private Integer createSuccess;


    /**
     * 开款任务ID
     */
    private Long taskId;


    /**
     * 开款任务编号
     */
    private String taskCode;

}
