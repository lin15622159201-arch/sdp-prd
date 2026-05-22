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
import tech.tiangong.sdp.enums.SpotStylePictureTypeEnum;

import java.util.Objects;

/**
 * 现货图(spot_style_picture)实体类
 *
 * @author ：qinwenxuan@zj.tech
 * @version :1.0
 * @date ：2025/11/3 15:20
 */
@EqualsAndHashCode(callSuper = true)
@Data
@NoArgsConstructor
@AllArgsConstructor
@TableName(value = "spot_style_picture")
public class SpotStylePicture extends BasicMessageTask {

    /**
     * 图片ID
     */
    @TableId(value = "picture_id", type = IdType.INPUT)
    private Long pictureId;
    /**
     * 任务ID
     */
    @TableField(value = "task_id")
    private Long taskId;
    /**
     * SKC ID
     */
    @TableField(value = "skc_id")
    private Long skcId;
    /**
     * 开款图
     */
    @TableField(value = "picture_url")
    private String pictureUrl;

    /**
     * 图类型
     */
    @TableField(value = "picture_type")
    private String pictureType;

    public boolean spuProductImage() {
        return Objects.equals(Objects.requireNonNullElse(skcId, 0L), 0L) &&
                StrUtil.equalsIgnoreCase(SpotStylePictureTypeEnum.PRODUCT_IMAGE.getCode(), pictureType);
    }

    public boolean skcProductImage() {
        return Objects.requireNonNullElse(skcId, 0L) > 0L &&
                !StrUtil.equalsIgnoreCase(SpotStylePictureTypeEnum.SIZE_IMAGE.getCode(), pictureType);
    }
    public boolean skcImage() {
        return Objects.requireNonNullElse(skcId, 0L) > 0L;
    }

    public boolean sizeImage() {
        return StrUtil.equalsIgnoreCase(SpotStylePictureTypeEnum.SIZE_IMAGE.getCode(), pictureType);
    }

    public boolean mainImage() {
        return StrUtil.equalsIgnoreCase(SpotStylePictureTypeEnum.MAIN_IMAGE.getCode(), pictureType);
    }

    public boolean spuImage() {
        return Objects.equals(Objects.requireNonNullElse(skcId, 0L), 0L) &&
                !StrUtil.equalsIgnoreCase(SpotStylePictureTypeEnum.SIZE_IMAGE.getCode(), pictureType);
    }

    public Long getPictureId() {
        return pictureId;
    }

    public void setPictureId(Long pictureId) {
        this.pictureId = pictureId;
    }

    public String getPictureUrl() {
        return pictureUrl;
    }

    public void setPictureUrl(String pictureUrl) {
        this.pictureUrl = pictureUrl;
    }

    public String getPictureType() {
        return pictureType;
    }

    public void setPictureType(String pictureType) {
        this.pictureType = pictureType;
    }

    public Long getTaskId() {
        return taskId;
    }

    public void setTaskId(Long taskId) {
        this.taskId = taskId;
    }

    public Long getSkcId() {
        return skcId;
    }

    public void setSkcId(Long skcId) {
        this.skcId = skcId;
    }
}
