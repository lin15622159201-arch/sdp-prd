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
import tech.tiangong.sdp.convert.BasicConvert;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Objects;

/**
 * 现货skc表(spot_style_skc)实体类
 * <ol>
 *     <li>000000000000000000000001:商品图:已补充</li>
 *     <li>000000000000000000000010:资料状态:已完善</li>
 *     <li>000000000000000000000100:资料状态:已取消</li>
 *     <li>000000000000000000001000:上架状态:待上架</li>
 *     <li>000000000000000000010000:上架状态:已上架</li>
 *     <li>000000000000000000100000:复色:已复色</li>
 *     <li>000000000000000001000000:动销:已动销</li>
 *     <li>000000000000000010000000:推送买手:已推送买手</li>
 *     <li>000000000000000100000000:推送买手失败:推送买手失败</li>
 *     <li>000000000000001000000000:买手取消:买手取消</li>
 *      <li>0b000000000000010000000000:上架状态:上架失败</li>
 *      <li>0b000000000000100000000000:已下架:已下架</li>
 * </ol>
 *
 * @author ：qinwenxuan@zj.tech
 * @version :1.0
 * @date ：2025/11/3 15:20
 */
@EqualsAndHashCode(callSuper = true)
@Data
@NoArgsConstructor
@AllArgsConstructor
@TableName(value = "spot_style_skc")
public class SpotStyleSkc extends BasicMessageTask {
    public static final int MAIN_IMG_Y = 0b000000000000000000000001;
    public static final int DATA_Y = 0b000000000000000000000010;
    public static final int CANCEL_Y = 0b000000000000000000000100;
    public static final int UPCOMING_Y = 0b000000000000000000001000;
    public static final int ON_THE_SHELVES_Y = 0b000000000000000000010000;
    public static final int RE_COLOR_Y = 0b000000000000000000100000;
    public static final int SALES_Y = 0b000000000000000001000000;
    public static final int PUSH_BUYER_Y = 0b000000000000000010000000;
    public static final int PUSH_BUYER_FAIL_Y = 0b000000000000000100000000;
    public static final int BUYER_CANCEL_Y = 0b000000000000001000000000;
    public static final int ON_THE_SHELVES_FAIL_Y = 0b000000000000010000000000;
    public static final int OFF_SHELVES_Y = 0b000000000000100000000000;
    /**
     * SKC ID
     */
    @TableId(value = "skc_id", type = IdType.INPUT)
    private Long skcId;
    /**
     * 父任务ID
     */
    @TableField(value = "parent_id")
    private Long parentId;
    /**
     * 任务ID
     */
    @TableField(value = "task_id")
    private Long taskId;
    /**
     * SKC编码
     */
    @TableField(value = "skc_code")
    private String skcCode;

    /**
     * SKC状态
     */
    @TableField(value = "skc_status")
    private Integer skcStatus;


    /**
     * 上架失败原因
     */
    @TableField(value = "on_shelves_fail_reason")
    private String onShelvesFailReason;

    /**
     * 主图url
     */
    @TableField(value = "main_img_url")
    private String mainImgUrl;

    /**
     * 颜色名称
     */
    @TableField(value = "color")
    private String color;

    /**
     * 颜色英文名
     */
    @TableField(value = "color_en_name")
    private String colorEnName;

    /**
     * 提交时间
     */
    @TableField(value = "submit_time")
    private LocalDateTime submitTime;
    /**
     * 动销时间
     */
    @TableField(value = "sale_time")
    private LocalDateTime saleTime;

    /**
     * 尺码标准
     */
    @TableField(value = "size_standard_name")
    private String sizeStandardName;

    /**
     * 尺码标准编号
     */
    @TableField(value = "size_standard_code")
    private String sizeStandardCode;
    /**
     * 失败提示
     */
    @TableField(value = "fail_message")
    private String failMessage;
    /**
     * 买手取消原因
     */
    @TableField(value = "buyer_cancel_message")
    private String buyerCancelMessage;
    @TableField(exist = false)
    private List<SpotStylePicture> pictures;
    @TableField(exist = false)
    private List<SpotStyleOpt> opts;
    @TableField(exist = false)
    private String plmColor;
    @TableField(exist = false)
    private String plmColorName;
    @TableField(exist = false)
    private List<PlmBuyerLog> logs;

    public boolean onShelves() {
        return BasicConvert.contains(requireSkcStatus(), ON_THE_SHELVES_Y);
    }
    public boolean offShelves() {
        return BasicConvert.contains(requireSkcStatus(), OFF_SHELVES_Y);
    }

    public boolean onShelvesFail() {
        return BasicConvert.contains(requireSkcStatus(), ON_THE_SHELVES_FAIL_Y);
    }

    public boolean upcoming() {
        return BasicConvert.contains(requireSkcStatus(), UPCOMING_Y);
    }

    public boolean canOnShelve() {
        return canUpcoming() || BasicConvert.contains(requireSkcStatus(), ON_THE_SHELVES_FAIL_Y);

    }

    public boolean hasMainImg() {
        return BasicConvert.contains(requireSkcStatus(), MAIN_IMG_Y);
    }

    public boolean dataCompleted() {
        return BasicConvert.contains(requireSkcStatus(), DATA_Y);
    }

    public boolean sold() {
        return BasicConvert.contains(requireSkcStatus(), SALES_Y);
    }

    public boolean pushedBuyer() {
        return BasicConvert.contains(requireSkcStatus(), PUSH_BUYER_Y);
    }

    public boolean canUpcoming() {
        if (!hasMainImg() || !dataCompleted()) {
            return false;
        }
        return !upcoming();
    }

    public boolean cancelled() {
        return BasicConvert.contains(requireSkcStatus(), CANCEL_Y);
    }

    public boolean buyerCancelled() {
        return BasicConvert.contains(requireSkcStatus(), BUYER_CANCEL_Y);
    }

    public boolean pushFailed() {
        return BasicConvert.contains(requireSkcStatus(), PUSH_BUYER_FAIL_Y);
    }

    public boolean reColor() {
        return BasicConvert.contains(requireSkcStatus(), RE_COLOR_Y);
    }

    public int requireSkcStatus() {
        return Objects.requireNonNullElse(this.skcStatus, 0);
    }

    public boolean hasCode() {
        return StrUtil.isNotBlank(this.skcCode);
    }

    public Long getSkcId() {
        return skcId;
    }

    public void setSkcId(Long skcId) {
        this.skcId = skcId;
    }

    public Long getTaskId() {
        return taskId;
    }

    public void setTaskId(Long taskId) {
        this.taskId = taskId;
    }

    public String getSkcCode() {
        return skcCode;
    }

    public void setSkcCode(String skcCode) {
        this.skcCode = skcCode;
    }

    public String getMainImgUrl() {
        return mainImgUrl;
    }

    public void setMainImgUrl(String mainImgUrl) {
        this.mainImgUrl = mainImgUrl;
    }

    public String getColor() {
        return color;
    }

    public void setColor(String color) {
        this.color = color;
    }

    public String getColorEnName() {
        return colorEnName;
    }

    public void setColorEnName(String colorEnName) {
        this.colorEnName = colorEnName;
    }

    public String getSizeStandardName() {
        return sizeStandardName;
    }

    public void setSizeStandardName(String sizeStandardName) {
        this.sizeStandardName = sizeStandardName;
    }

    public String getSizeStandardCode() {
        return sizeStandardCode;
    }

    public void setSizeStandardCode(String sizeStandardCode) {
        this.sizeStandardCode = sizeStandardCode;
    }

    public List<SpotStylePicture> getPictures() {
        return pictures;
    }

    public void setPictures(List<SpotStylePicture> pictures) {
        this.pictures = pictures;
    }

    public List<SpotStyleOpt> getOpts() {
        return opts;
    }

    public void setOpts(List<SpotStyleOpt> opts) {
        this.opts = opts;
    }

    public String getPlmColor() {
        return plmColor;
    }

    public void setPlmColor(String plmColor) {
        this.plmColor = plmColor;
    }
}
