package tech.tiangong.sdp.vo.resp;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotEmpty;
import lombok.Data;
import tech.tiangong.sdp.vo.req.SizeTemplatePartReq;

import java.io.Serial;
import java.io.Serializable;
import java.util.List;

/**
 * 尺码
 *
 * @author ：qinwenxuan@zj.tech
 * @version :1.0
 * @date ：2026/1/13 11:39
 */
@Data
public class SizeTemplateVO implements Serializable {

    @Serial
    private static final long serialVersionUID = 8092367284471774939L;

    /**
     * 尺码
     */
    private String size;
    /**
     * 部位尺码
     */
    @Valid
    private List<SizeTemplatePartResp> values;
}
