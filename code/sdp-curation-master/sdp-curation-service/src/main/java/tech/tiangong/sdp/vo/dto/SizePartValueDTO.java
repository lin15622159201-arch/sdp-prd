package tech.tiangong.sdp.vo.dto;

import lombok.Data;

import java.io.Serial;
import java.io.Serializable;
import java.util.List;

/**
 * 尺码档差值
 *
 * @author ：qinwenxuan@zj.tech
 * @version :1.0
 * @date ：2026/2/27 10:01
 */
@Data
public class SizePartValueDTO implements Serializable {
    @Serial
    private static final long serialVersionUID = -809468071521099274L;
    /**
     * 尺码
     */
    private String size;

    /**
     * 部档差值
     */
    private List<PartValueDTO> parts;
}
