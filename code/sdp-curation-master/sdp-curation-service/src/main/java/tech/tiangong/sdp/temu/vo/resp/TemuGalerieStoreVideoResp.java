package tech.tiangong.sdp.temu.vo.resp;

import lombok.Data;
import lombok.EqualsAndHashCode;
import tech.tiangong.sdp.temu.vo.TemuVideoResp;

import java.io.Serial;

/**
 * Temu-视频上传
 *
 * @author ：qinwenxuan@zj.tech
 * @version :1.0
 * @date ：2026/1/4 17:55
 */
@EqualsAndHashCode(callSuper = true)
@Data
public class TemuGalerieStoreVideoResp extends TemuVideoResp {

    @Serial
    private static final long serialVersionUID = 2315221655048528764L;

    /**
     * 上传视频文件对应vid，后续查询转码结果使用
     */
    private String vid;

}
