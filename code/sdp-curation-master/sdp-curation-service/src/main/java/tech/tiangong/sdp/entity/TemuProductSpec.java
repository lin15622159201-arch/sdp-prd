package tech.tiangong.sdp.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.experimental.Accessors;

/**
 * temu 商品规格表实体类
 *
 * @author ：qinwenxuan@zj.tech
 * @version :1.0
 * @date ：2025/11/3 15:20
 */
@Data
@EqualsAndHashCode(callSuper = false)
@Accessors(chain = true)
@TableName(value = "temu_product_spec")
public class TemuProductSpec extends BaseMessageEntity {
    /**
     * 规格 ID
     */
    @TableId(value = "spec_id", type = IdType.INPUT)
    private Long specId;

    /**
     * 规格名
     */
    @TableField(value = "spec_name")
    private String specName;

    /**
     * 可以用的
     */
    @TableField(value = "available")
    private Integer available;
}
