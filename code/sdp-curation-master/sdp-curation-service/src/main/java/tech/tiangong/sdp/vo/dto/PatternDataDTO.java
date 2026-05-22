package tech.tiangong.sdp.vo.dto;

import cn.hutool.core.util.StrUtil;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


import java.io.Serial;
import java.io.Serializable;
import java.util.stream.Collectors;

/**
 * 花型图案
 *
 * @author ：qinwenxuan@zj.tech
 * @version :1.0
 * @date ：2025/12/16 16:22
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class PatternDataDTO implements Serializable {
    @Serial
    private static final long serialVersionUID = -1047147811716636672L;
    private String result;
    private String status;

    public String result() {
        return StrUtil.split(result, "\n")
                .stream().map(it -> it.replaceAll("^\\d+\\.\\s*", "").trim())
                .collect(Collectors.joining(StrUtil.COMMA));
    }
}
