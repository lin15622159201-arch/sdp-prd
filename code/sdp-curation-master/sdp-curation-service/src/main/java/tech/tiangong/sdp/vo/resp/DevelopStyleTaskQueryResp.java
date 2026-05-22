package tech.tiangong.sdp.vo.resp;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;
import lombok.experimental.Accessors;
import lombok.experimental.SuperBuilder;
import tech.tiangong.butted.common.enums.TaskStatusEnum;
import java.io.Serial;
import java.io.Serializable;
import java.util.List;

/**
 * 开款任务 - 查询返回（对外）
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
public class DevelopStyleTaskQueryResp implements Serializable {
    @Serial
    private static final long serialVersionUID = 2386940987489394798L;

    /**
     * 任务状态：0-待审核；10-待开款；20-已淘汰；30-已开款；50-失败
     *
     * @see TaskStatusEnum
     */
    private Integer taskStatus;


    /**
     * 开款任务ID
     */
    private Long taskId;


    /**
     * 开款任务编号
     */
    private String taskCode;


    /**
     * SPU-编码
     */
    private String spuCode;

    /**
     * SKC-编码
     */
    private List<String> skcCodes;


}
