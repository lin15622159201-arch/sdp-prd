package tech.tiangong.sdp.vo.req;

import lombok.Data;

import java.io.Serial;
import java.io.Serializable;
import java.util.List;

/**
 * 开款任务 - 查询（对外）
 *
 * @author ：liuhongfu@zj.tech
 * @version :1.0
 * @date ：2025/11/3 18:52
 */
@Data
public class DevelopStyleTaskOpenQueryReq implements Serializable {
    @Serial
    private static final long serialVersionUID = -2284475141952545118L;

    /**
     * 开款任务ID集合
     */
    private List<Long> taskIds;


    /**
     * 开款任务编号集合
     */
    private List<String> taskCodes;
}
