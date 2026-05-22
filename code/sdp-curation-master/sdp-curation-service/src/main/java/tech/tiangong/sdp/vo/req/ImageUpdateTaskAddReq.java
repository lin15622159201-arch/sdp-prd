package tech.tiangong.sdp.vo.req;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.io.Serializable;
import java.util.List;

/**
 * 图片修复任务 - 新增
 *
 * @author ：liuhongfu
 * @version :1.0
 * @date ：2025/11/3 18:52
 */
@Data
public class ImageUpdateTaskAddReq implements Serializable {

    /**
     * 波段编码
     */
    private String wavebandCode;
    /**
     * 波段名称
     */
    private String wavebandName;

    /**
     * 店铺ID
     */
    private Long storeId;

    /**
     * 店铺名称
     */
    private String storeName;

    /**
     * 设计组编码
     */
    private String designerGroupCode;

    /**
     * 设计组名称
     */
    private String designerGroupName;

    /**
     * 设计师ID
     */
    private Long designerId;

    /**
     * 设计师名称
     */
    private String designerName;


    /**
     * 任务类型,0-图片，1-视频
     */
    @NotNull(message = "任务类型不能为空")
    private Integer taskType;


    /**
     * 开款任务ID
     */
    private Long developStyleTaskId;

    /**
     * spu的ID
     */
    @NotNull(message = "spuId不能为空")
    private Long spuId;


    /**
     * spu编码
     */
    @NotBlank(message = "spu编码不能为空")
    private String spuCode;


    /**
     * 任务来源，款式管理：prototype_manage，现货管理：spot_style，用户创建：upload'
     */
    private String taskSource;

    /**
     * spu任务来源，款式管理：prototype_manage，现货管理：spot_style
     */
    @NotBlank(message = "spu任务来源不能为空")
    private String spuSource;

    /**
     * 修图需求说明
     */
    private String repairDescribe;

    /**
     * 修图需求说明附件
     */
    private String repairAttachment;


    /**
     * skc-图片信息
     */
    @NotEmpty(message = "skc不能为空")
    private List<Skc> skc;

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static class Skc implements Serializable {

        /**
         * skc-ID
         */
        private Long skcId;

        /**
         * SKC编码
         */
        private String skcCode;

        /**
         * 图片信息
         */
        @NotEmpty(message = "图片不能为空")
        @Size(max = 10, message = "图片不能超过10")
        private List<ImageUpdatePictureAddReq> pictures;

    }


}
