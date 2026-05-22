package tech.tiangong.sdp.vo.req;

import lombok.Data;

import java.io.Serial;
import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.List;

/**
 * 现货管理 - 图片修复
 *
 * @author ：qinwenxuan@zj.tech
 * @version :1.0
 * @date ：2025/11/11 16:56
 */
@Data
public class SpotStyleImageUpdateReq implements Serializable {
    @Serial
    private static final long serialVersionUID = 6807361884807894004L;
    /**
     * 任务id
     */
    private Long taskId;
    /**
     * 图片修复id
     */
    private Long imageUpdateId;
    /**
     * image_update_code
     */
    private String imageUpdateCode;
    /**
     * 图片修复状态
     * 0-待处理；10-待审核；20-待返修；30-已完成；50-已取消；90-未创建；
     */
    private Integer imageUpdateStatus;
    /**
     * 图片修复时间
     */
    private LocalDateTime imageUpdateTime;
    /**
     * 商品图片
     */
    private List<String> productImages;


    public Long getTaskId() {
        return taskId;
    }

    public void setTaskId(Long taskId) {
        this.taskId = taskId;
    }

    public Long getImageUpdateId() {
        return imageUpdateId;
    }

    public void setImageUpdateId(Long imageUpdateId) {
        this.imageUpdateId = imageUpdateId;
    }

    public String getImageUpdateCode() {
        return imageUpdateCode;
    }

    public void setImageUpdateCode(String imageUpdateCode) {
        this.imageUpdateCode = imageUpdateCode;
    }

    public Integer getImageUpdateStatus() {
        return imageUpdateStatus;
    }

    public void setImageUpdateStatus(Integer imageUpdateStatus) {
        this.imageUpdateStatus = imageUpdateStatus;
    }

    public LocalDateTime getImageUpdateTime() {
        return imageUpdateTime;
    }

    public void setImageUpdateTime(LocalDateTime imageUpdateTime) {
        this.imageUpdateTime = imageUpdateTime;
    }

    public List<String> getProductImages() {
        return productImages;
    }

    public void setProductImages(List<String> productImages) {
        this.productImages = productImages;
    }
}
