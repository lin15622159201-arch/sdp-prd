package tech.tiangong.sdp.vo.dto;

import lombok.Data;

import java.io.Serial;
import java.io.Serializable;

/**
 * Temu名称DTO
 *
 * @author ：qinwenxuan@zj.tech
 * @version :1.0
 * @date ：2026/1/9 15:25
 */
@Data
public class TemuNameDTO implements Serializable {
    @Serial
    private static final long serialVersionUID = 5350862493565868566L;
    /**
     * 名称
     */
    private String name;
    /**
     *  ID
     */
    private Long id;
}
