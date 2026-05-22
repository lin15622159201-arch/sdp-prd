package tech.tiangong.sdp.temu.vo.resp;

import lombok.Data;
import lombok.EqualsAndHashCode;
import tech.tiangong.sdp.temu.vo.TemuResp;

import java.io.Serial;
import java.util.List;

/**
 * 文件上传
 * @author ：qinwenxuan@zj.tech
 * @version :1.0
 * @date ：2025/12/29 9:57
 */
@EqualsAndHashCode(callSuper = false)
@Data
public class TemuFileUploadResp implements TemuResp {

    @Serial
    private static final long serialVersionUID = 7047877351926704801L;

    private String url;
    private String imageUrl;
    private List<String> urls;


}
