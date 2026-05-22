package tech.tiangong.sdp.vo.req;

import lombok.Data;
import team.aikero.blade.core.enums.Bool;

import java.io.Serial;
import java.io.Serializable;
import java.util.List;
import java.util.Objects;

/**
 * 选款结果开款
 *
 * @author ：qinwenxuan@zj.tech
 * @version :1.0
 * @date ：2025/11/7 10:11
 */
@Data
public class PickingStyleDevelopReq implements Serializable {
    @Serial
    private static final long serialVersionUID = 8841880296648780454L;

    /**
     * 任务id
     */
    private Long taskId;

    /**
     * 选款结果ID
     */
    private Long pickingResultId;
    /**
     * 款式id
     */
    private Long pickingStyleId;
    /**
     * 结果
     */
    private Bool result;
    /**
     * 店铺id
     */
    private Long storeId;

    /**
     * 店铺名称
     */
    private String storeName;
    /**
     * 波段编码
     */
    private String wavebandCode;

    /**
     * 波段名称
     */
    private String wavebandName;
    /**
     * 主图url
     */
    private String mainImgUrl;
    /**
     * 图片
     */
    private List<String> images;

    /**
     * 开款数据来源类型
     */
    private String taskSource = "user_upload";

    public Long getTaskId() {
        return taskId;
    }

    public void setTaskId(Long taskId) {
        this.taskId = taskId;
    }

    public Long getPickingResultId() {
        return pickingResultId;
    }

    public void setPickingResultId(Long pickingResultId) {
        this.pickingResultId = pickingResultId;
    }

    public Long getPickingStyleId() {
        return pickingStyleId;
    }

    public void setPickingStyleId(Long pickingStyleId) {
        this.pickingStyleId = pickingStyleId;
    }

    public String getMainImgUrl() {
        return mainImgUrl;
    }

    public void setMainImgUrl(String mainImgUrl) {
        this.mainImgUrl = mainImgUrl;
    }

    public List<String> getImages() {
        return images;
    }

    public void setImages(List<String> images) {
        this.images = images;
    }

    public Bool getResult() {
        return result;
    }

    public void setResult(Bool result) {
        this.result = result;
    }

    public boolean add() {
        return Objects.requireNonNullElse(this.taskId, 0L) == 0L;
    }
    public boolean disuse() {
        return Objects.equals(result, Bool.NO);
    }

    public String getTaskSource() {
        return taskSource;
    }

    public void setTaskSource(String taskSource) {
        this.taskSource = taskSource;
    }

    public Long getStoreId() {
        return storeId;
    }

    public void setStoreId(Long storeId) {
        this.storeId = storeId;
    }

    public String getStoreName() {
        return storeName;
    }

    public void setStoreName(String storeName) {
        this.storeName = storeName;
    }

    public String getWavebandCode() {
        return wavebandCode;
    }

    public void setWavebandCode(String wavebandCode) {
        this.wavebandCode = wavebandCode;
    }

    public String getWavebandName() {
        return wavebandName;
    }

    public void setWavebandName(String wavebandName) {
        this.wavebandName = wavebandName;
    }
}
