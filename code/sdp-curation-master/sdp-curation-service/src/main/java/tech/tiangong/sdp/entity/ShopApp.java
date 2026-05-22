package tech.tiangong.sdp.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.experimental.Accessors;

/**
 * 店铺APP 表实体类
 *
 * @author ：qinwenxuan@zj.tech
 * @version :1.0
 * @date ：2025/11/3 15:20
 */
@Data
@EqualsAndHashCode(callSuper = false)
@Accessors(chain = true)
@TableName(value = "shop_app")
public class ShopApp extends BaseMessageEntity {
    /**
     * 主键 ID
     */
    @TableId(value = "app_id", type = IdType.INPUT)
    private Long appId;

    /**
     * 店铺 ID
     */
    @TableField("shop_id")
    private Long shopId;

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
