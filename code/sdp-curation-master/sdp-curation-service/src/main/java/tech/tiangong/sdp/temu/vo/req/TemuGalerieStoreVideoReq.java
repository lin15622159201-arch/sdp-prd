package tech.tiangong.sdp.temu.vo.req;

import lombok.Data;
import lombok.EqualsAndHashCode;
import org.springframework.core.io.FileSystemResource;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import tech.tiangong.sdp.enums.TemuCommonFieldEnum;
import tech.tiangong.sdp.temu.vo.TemuReq;

import java.io.File;
import java.io.Serial;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Temu-视频上传
 *
 * @author ：qinwenxuan@zj.tech
 * @version :1.0
 * @date ：2026/1/4 17:55
 */
@EqualsAndHashCode(callSuper = false)
@Data
public class TemuGalerieStoreVideoReq implements TemuReq {

    @Serial
    private static final long serialVersionUID = 2315221655048528764L;
    /**
     * 文件
     */
    private File file;
    /**
     * 文件MD5值
     * 用于校验实际收到的数据和发起方本地的数据是否一致
     */
    private String md5;
    /**
     * 文件MD5值
     * 用于校验实际收到的数据和发起方本地的数据是否一致
     */
    private String sign;
    /**
     * 固定值，true
     */
    private Boolean createMedia = true;

    public MultiValueMap<String, Object> toMap() {
        final MultiValueMap<String, Object> map = new LinkedMultiValueMap<>();
        map.put(TemuCommonFieldEnum.VIDEO_FILE.getCode(), List.of(new FileSystemResource(file)));
        map.put(TemuCommonFieldEnum.VIDEO_CONTENT_MD5.getCode(), List.of(md5));
        map.put(TemuCommonFieldEnum.VIDEO_SIGN.getCode(), List.of(sign));
        map.put(TemuCommonFieldEnum.VIDEO_CREATE_MEDIA.getCode(), List.of(createMedia));
        return map;
    }
}
