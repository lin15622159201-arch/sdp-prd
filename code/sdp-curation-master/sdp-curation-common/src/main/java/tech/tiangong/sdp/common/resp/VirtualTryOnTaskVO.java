package tech.tiangong.sdp.common.resp;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.io.Serial;
import java.time.LocalDateTime;

/**
 * 虚拟换衣 - 详情
 *
 * @author : liuhongfu
 * @version : 1.0
 * @date : 2025/8/14 14:50
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class VirtualTryOnTaskVO {
    @Serial
    private static final long serialVersionUID = 3596769351639056661L;

    /**
     * 参考图
     */
    private String refImgUrl;
    /**
     * 模型编码（字典配置编码）
     */
    private String modeCode;

    /**
     * 模型名称（字典配置名称）
     */
    private String modeName;

    /**
     * 品类编号
     */
    private String categoryCode;
    /**
     * 品类名称
     */
    private String categoryName;

    /**
     * 模特素材ID（手动上传模特素材图为空）
     */
    private Long modelMaterialId;
    /**
     * 模特素材名称（手动上传模特素材图为空）
     */
    private String modelMaterialName;
    /**
     * 模特素材URL（可以手动上传模特素材图）
     */
    private String modelMaterialUrl;

    /**
     * 脸部修复(1:开启, 0:关闭)
     */
    private Integer faceFix;
    /**
     * 素材衍生(1:开启, 0:关闭)
     */
    private Integer materialGenerate;
    /**
     * 生成数量
     */
    private Integer genCount;
    /**
     * 来源业务id
     */
    private Long sourceBusinessId;
    /**
     * 来源业务编号
     */
    private String sourceBusinessCode;

    /**
     * 来源
     */
    private String source;

    /**
     * 生成时间
     */
    private LocalDateTime generateTime;


    /**
     * 排队时长(秒)
     */
    private Integer queueDuration;


    /**
     * 生成时长(秒)
     */
    private Integer generateDuration;

    /**
     * 任务id
     */
    private Long taskId;
    /**
     * 任务编号
     */
    private String taskCode;

    /**
     * 任务状态：0-排队中；10-生成中；20-已中止；30-已完成；50-失败；60-超时失败；
     */
    private Integer taskStatus;
    /**
     * 创建人id
     */
    private Long creatorId;

    /**
     * 创建人名称
     */
    private String creatorName;
    /**
     * 创建时间
     */
    private LocalDateTime createdTime;


    public String getRefImgUrl() {
        return refImgUrl;
    }

    public void setRefImgUrl(String refImgUrl) {
        this.refImgUrl = refImgUrl;
    }

    public String getModeCode() {
        return modeCode;
    }

    public void setModeCode(String modeCode) {
        this.modeCode = modeCode;
    }

    public String getModeName() {
        return modeName;
    }

    public void setModeName(String modeName) {
        this.modeName = modeName;
    }

    public String getCategoryCode() {
        return categoryCode;
    }

    public void setCategoryCode(String categoryCode) {
        this.categoryCode = categoryCode;
    }

    public String getCategoryName() {
        return categoryName;
    }

    public void setCategoryName(String categoryName) {
        this.categoryName = categoryName;
    }

    public Long getModelMaterialId() {
        return modelMaterialId;
    }

    public void setModelMaterialId(Long modelMaterialId) {
        this.modelMaterialId = modelMaterialId;
    }

    public String getModelMaterialName() {
        return modelMaterialName;
    }

    public void setModelMaterialName(String modelMaterialName) {
        this.modelMaterialName = modelMaterialName;
    }

    public String getModelMaterialUrl() {
        return modelMaterialUrl;
    }

    public void setModelMaterialUrl(String modelMaterialUrl) {
        this.modelMaterialUrl = modelMaterialUrl;
    }

    public Integer getFaceFix() {
        return faceFix;
    }

    public void setFaceFix(Integer faceFix) {
        this.faceFix = faceFix;
    }

    public Integer getMaterialGenerate() {
        return materialGenerate;
    }

    public void setMaterialGenerate(Integer materialGenerate) {
        this.materialGenerate = materialGenerate;
    }

    public Integer getGenCount() {
        return genCount;
    }

    public void setGenCount(Integer genCount) {
        this.genCount = genCount;
    }

    public Long getSourceBusinessId() {
        return sourceBusinessId;
    }

    public void setSourceBusinessId(Long sourceBusinessId) {
        this.sourceBusinessId = sourceBusinessId;
    }

    public String getSourceBusinessCode() {
        return sourceBusinessCode;
    }

    public void setSourceBusinessCode(String sourceBusinessCode) {
        this.sourceBusinessCode = sourceBusinessCode;
    }

    public String getSource() {
        return source;
    }

    public void setSource(String source) {
        this.source = source;
    }

    public LocalDateTime getGenerateTime() {
        return generateTime;
    }

    public void setGenerateTime(LocalDateTime generateTime) {
        this.generateTime = generateTime;
    }

    public Integer getQueueDuration() {
        return queueDuration;
    }

    public void setQueueDuration(Integer queueDuration) {
        this.queueDuration = queueDuration;
    }

    public Integer getGenerateDuration() {
        return generateDuration;
    }

    public void setGenerateDuration(Integer generateDuration) {
        this.generateDuration = generateDuration;
    }

    public Long getTaskId() {
        return taskId;
    }

    public void setTaskId(Long taskId) {
        this.taskId = taskId;
    }

    public String getTaskCode() {
        return taskCode;
    }

    public void setTaskCode(String taskCode) {
        this.taskCode = taskCode;
    }

    public Integer getTaskStatus() {
        return taskStatus;
    }

    public void setTaskStatus(Integer taskStatus) {
        this.taskStatus = taskStatus;
    }

    public Long getCreatorId() {
        return creatorId;
    }

    public void setCreatorId(Long creatorId) {
        this.creatorId = creatorId;
    }

    public String getCreatorName() {
        return creatorName;
    }

    public void setCreatorName(String creatorName) {
        this.creatorName = creatorName;
    }

    public LocalDateTime getCreatedTime() {
        return createdTime;
    }

    public void setCreatedTime(LocalDateTime createdTime) {
        this.createdTime = createdTime;
    }
}
