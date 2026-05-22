package tech.tiangong.sdp.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.experimental.Accessors;

/**
 * Temu APP配置表实体类
 *
 * @author ：qinwenxuan@zj.tech
 * @version :1.0
 * @date ：2025/11/3 15:20
 */
@Data
@EqualsAndHashCode(callSuper = false)
@Accessors(chain = true)
@TableName(value = "temu_app_config")
public class TemuAppConfig extends BaseMessageEntity {
    /**
     * 主体编码
     */
    @TableId(value = "subject_code", type = IdType.INPUT)
    private String subjectCode;

    /**
     * APP KEY
     */
    @TableField("app_key")
    private String appKey;

    /**
     * APP 密钥
     */
    @TableField("app_secret")
    private String appSecret;
}
