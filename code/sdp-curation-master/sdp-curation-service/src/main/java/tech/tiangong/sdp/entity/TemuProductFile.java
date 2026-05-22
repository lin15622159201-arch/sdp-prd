package tech.tiangong.sdp.entity;

import cn.hutool.core.util.StrUtil;
import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import tech.tiangong.sdp.enums.ProductFileTypeEnum;

import java.time.LocalDateTime;
import java.util.Objects;

/**
 * Temu商品文件表实体类
 *
 * @author ：qinwenxuan@zj.tech
 * @version :1.0
 * @date ：2025/12/22 18:29
 */
@EqualsAndHashCode(callSuper = true)
@Data
@NoArgsConstructor
@AllArgsConstructor
@TableName(value = "temu_product_file")
public class TemuProductFile extends BaseMessageEntity {
    /**
     * 文件 ID
     */
    @TableId(value = "file_id", type = IdType.INPUT)
    private Long fileId;

    /**
     * 商品 ID
     */
    @TableField("product_id")
    private Long productId;

    /**
     * 商品SKC id
     */
    @TableField("product_skc_id")
    private Long productSkcId;
    /**
     * 文件 URL
     */
    @TableField("file_url")
    private String fileUrl;

    /**
     * Temu URL
     */
    @TableField("temu_file_url")
    private String temuFileUrl;

    /**
     * 封面图
     */
    @TableField("cover_url")
    private String coverUrl;

    /**
     * 文件型
     */
    @TableField("file_type")
    private String fileType;

    /**
     * 扩展值
     */
    @TableField("ext_val")
    private String extVal;

    /**
     * 文件宽
     */
    @TableField("file_width")
    private Long fileWidth;

    /**
     * 文件高
     */
    @TableField("file_height")
    private Long fileHeight;
    /**
     * 推送状态：0-未推送；1-已推送；2-推送失败
     */
    @TableField("push_status")
    private Integer pushStatus;

    /**
     * 推送时间
     */
    @TableField("push_time")
    private LocalDateTime pushTime;

    /**
     * 推送次数
     */
    @TableField("push_times")
    private Integer pushTimes;
    public int requirePushTimes() {
        return Objects.requireNonNullElse(this.pushTimes, 0);
    }
    public boolean material () {
        return StrUtil.equalsIgnoreCase(ProductFileTypeEnum.MATERIAL_IMAGE.getCode(),fileType);
    }
    public boolean video () {
        return StrUtil.equalsIgnoreCase(ProductFileTypeEnum.VIDEO.getCode(),fileType);
    }
    public boolean carousel () {
        return StrUtil.equalsIgnoreCase(ProductFileTypeEnum.CAROUSEL_IMAGE.getCode(),fileType);
    }
}
