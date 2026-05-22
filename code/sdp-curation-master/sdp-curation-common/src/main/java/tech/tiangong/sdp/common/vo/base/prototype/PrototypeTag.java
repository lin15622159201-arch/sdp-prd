package tech.tiangong.sdp.common.vo.base.prototype;

import lombok.Data;

import java.io.Serializable;

/**
 * 标签信息
 * @Author Husky
 * @create 2021/8/10
 */
@Data
public class PrototypeTag implements Serializable {

    private static final long serialVersionUID = 8011190452959264220L;
    /**
     * 标签编码
     */
    private String code;
    /**
     * 标签名
     */
    private String codeName;
    /**
     * 标签值
     */
    private String value;
}
