package tech.tiangong.sdp.vo.resp;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serial;
import java.io.Serializable;

/**
 * 现货管理 - 编辑商品图
 *
 * @author ：qinwenxuan@zj.tech
 * @version :1.0
 * @date ：2025/11/7 16:46
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class SpotStyleEditProductImageResp implements Serializable {
    @Serial
    private static final long serialVersionUID = -1612566960768733752L;
    /**
     * 编码
     */
    private String code;
    /**
     * 提示
     */
    private String message;
}
