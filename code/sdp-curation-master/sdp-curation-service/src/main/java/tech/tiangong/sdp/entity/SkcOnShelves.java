package tech.tiangong.sdp.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.experimental.Accessors;

import java.time.LocalDateTime;


/**
 * SKC 上架表
 *
 * @author ：qinwenxuan@zj.tech
 * @version :1.0
 * @date ：2025/12/11 10:27
 */
@Data
@EqualsAndHashCode(callSuper = false)
@Accessors(chain = true)
@TableName(value = "skc_on_shelves", autoResultMap = true)
public class SkcOnShelves extends BaseMessageEntity {
    /**
     * 主键id
     */
    @TableId(value = "skc_id", type = IdType.INPUT)
    private Long skcId;

    /**
     * 款ID
     */
    @TableField("style_id")
    private Long styleId;

    /**
     * SKC编码
     */
    @TableField("skc_code")
    private String skcCode;

    /**
     * 上架状态：1-上架；0-下架；
     */
    @TableField("on_shelves_status")
    private Integer onShelvesStatus;

    /**
     * 是否拼接：1-拼接；
     */
    @TableField("spliced")
    private Integer spliced;

    /**
     * 是否要展示出来
     * 已发布的商品进行复色一个skc，这个skc不需要展示出来
     */
    @TableField("show_detail")
    private Integer showDetail;


    /**
     * 主图url
     */
    @TableField("main_img_url")
    private String mainImgUrl;

    /**
     * 颜色名称
     */
    @TableField("color")
    private String color;

    /**
     * 尺码标准编号
     */
    @TableField(value = "size_standard_code")
    private String sizeStandardCode;

    /**
     * 尺码标准
     */
    @TableField("size_standard_name")
    private String sizeStandardName;

    /**
     * 尺码
     */
    @TableField("size_name")
    private String sizeName;

    /**
     * 尺码编码
     */
    @TableField("size_code")
    private String sizeCode;

    /**
     * 前置拆版状态 0=否 1=是
     */
    @TableField(value = "pre_disassembly_state")
    private Integer preDisassemblyState;


    /**
     * 测价通过状态 0=否 1=是
     */
    @TableField(value = "price_passed_state")
    private Integer pricePassedState;

    /**
     * 测价通过时间
     */
    @TableField(value = "price_passed_time")
    private LocalDateTime pricePassedTime;


    /**
     * 拆版是否完成 0=否 1=是
     */
    @TableField(value = "disassembly_finished")
    private Integer disassemblyFinished;

    /**
     * 拆版完成时间
     */
    @TableField(value = "disassembly_finished_time")
    private LocalDateTime disassemblyFinishedTime;


    /**
     * 附件
     */
    @TableField(value = "attachment")
    private String attachment;
}
