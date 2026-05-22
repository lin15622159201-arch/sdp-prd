package tech.tiangong.sdp.vo.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import team.aikero.blade.core.enums.Bool;

import java.io.Serial;
import java.io.Serializable;
import java.util.List;

/**
 * 图片修复任务分组结果
 *
 * @author ：liuhongfu
 * @version :1.0
 * @date ：2025/11/5 16:47
 */
@Data
public class ImageUpdateTaskDTO implements Serializable {
    @Serial
    private static final long serialVersionUID = -542493380571514415L;

    /**
     * spu任务来源
     * 款式管理：prototype_manage，现货管理：spot_style
     */
    private String spuSourceType;

    /**
     * 开款任务ID
     */
    private Long developStyleTaskId;


    /**
     * spu的ID
     */
    private Long spuId;

    /**
     * spu编码
     */
    private String spuCode;

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
     * 设计师id【设计师】
     */
    private Long designerId;

    /**
     * 设计师编号【设计师】
     */
    private String designerCode;

    /**
     * 设计师名称【设计师】
     */
    private String designerName;

    /**
     * 设计组code
     */
    private String designerGroupCode;

    /**
     * 设计组
     */
    private String designerGroupName;


    /**
     * 图片相关信息
     */
    private List<Skc> skcList;

    /**
     * 任务是否进行中
     * true:是，false:否
     */
    private Bool processing;


    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static class Skc implements Serializable {

        /**
         * skc-ID
         */
        private Long skcId;

        /**
         * skc-编码
         */
        private String skcCode;

        /**
         * 图片相关信息
         */
        private List<ImageUpdatePictureDTO> pictures;

    }


}
