package tech.tiangong.sdp.vo.resp;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import tech.tiangong.sdp.common.resp.BasicVO;
import java.io.Serial;
import java.io.Serializable;
import java.util.List;

/**
 * 图片修复任务 - 分页返回
 *
 * @author ：liuhongfu
 * @version :1.0
 * @date ：2025/11/3 18:08
 */
@EqualsAndHashCode(callSuper = true)
@Data
public class ImageUpdateTaskPageResp extends BasicVO {
    @Serial
    private static final long serialVersionUID = 2386940987489394798L;

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
    private Integer taskType;

    /**
     * spu-ID
     */
    private Long spuId;

    /**
     * spu编码
     */
    private String spuCode;


    /**
     * 任务状态：0-待处理；10-待审核；20-待返修；30-已完成；50-已取消
     */
    private Integer taskStatus;


    /**
     * 返修-原因
     */
    private String reason;

    /**
     * 修图备注-总说明
     */
    private String repairDescribe;

    /**
     * 修图需求说明附件
     */
    private String repairAttachment;

    /**
     * 审核不通过图片说明
     */
    private String notPassDescribePicture;


    /**
     * SKC图片信息
     */
    private List<Skc> skcList;


    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static class Skc implements Serializable {

        /**
         * skc-ID
         */
        private Long skcId;

        /**
         * 待修图
         */
        private List<ImageUpdatePictureResp> pictures;

        /**
         * 结果图
         */
        private List<String> resultPictures;

    }

}
