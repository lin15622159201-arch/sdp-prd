package tech.tiangong.sdp.temu.vo.req;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import tech.tiangong.sdp.temu.vo.TemuCommonReq;
import tech.tiangong.sdp.temu.vo.dto.TemuImageUploadOptionDTO;

import java.io.Serial;

/**
 * Temu文件上传
 *
 * @author ：qinwenxuan@zj.tech
 * @version :1.0
 * @date ：2025/12/25 15:19
 */
@EqualsAndHashCode(callSuper = true)
@Data
@AllArgsConstructor
@NoArgsConstructor
public class TemuFileUploadReq extends TemuCommonReq {
    @Serial
    private static final long serialVersionUID = -7691521262855512134L;
    private String image ;
    private Integer imageBizType ;
    private TemuImageUploadOptionDTO options ;
}
