package tech.tiangong.sdp.entity;

import com.baomidou.mybatisplus.annotation.*;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.experimental.Accessors;
import tech.tiangong.sdp.convert.typehandler.ColorInfoVoTypeHandler;
import tech.tiangong.sdp.vo.resp.ColorInfoVo;

import java.util.List;

/**
 * SKC_详情表实体类
 *
 * @author while
 */
@Data
@Accessors(chain = true)
@NoArgsConstructor
@EqualsAndHashCode(callSuper = true)
@TableName(value = "prototype_detail", autoResultMap = true)
public class PrototypeDetail extends BaseTenantUserEntity {
    /**
     * SKC版单详细表id
     */
    @TableId(value = "prototype_detail_id", type = IdType.INPUT)
    private Long prototypeDetailId;

    @TableField(value = "prototype_id")
    private Long prototypeId;

    /**
     * 设计图片{多张以英文逗号分隔}
     */
    @TableField(value = "design_picture")
    private String designPicture;

    /**
     * 尺码标准
     */
    @TableField(value = "size_standard")
    private String sizeStandard;

    /**
     * 尺码标准编号
     */
    @TableField(value = "size_standard_code")
    private String sizeStandardCode;

    /**
     * 样衣尺码
     */
    @TableField(value = "sample_size")
    private String sampleSize;

    /**
     * 颜色信息集合
     */
    @TableField(value = "color_info_list", typeHandler = ColorInfoVoTypeHandler.class)
    private List<ColorInfoVo> colorInfoList;

    /**
     * 是否拼接 0 否 1是
     */
    @TableField(value = "is_splicing")
    private Boolean isSplicing;

    /**
     * 裁剪备注
     */
    @TableField(value = "cutting_remark")
    private String cuttingRemark;

    /**
     * 车缝工艺备注
     */
    @TableField(value = "sewing_remark")
    private String sewingRemark;

    /**
     * 版型备注
     */
    @TableField(value = "type_remark")
    private String typeRemark;

    /**
     * 版单取消原因
     */
    @TableField(value = "cancel_reason")
    private String cancelReason;

    /**
     * 取消版单操作人id
     */
    @TableField(value = "cancel_user_id")
    private Long cancelUserId;

    /**
     * 取消版单操作人编号
     */
    @TableField(value = "cancel_user_code")
    private String cancelUserCode;

    /**
     * 版单取消操作人姓名
     */
    @TableField(value = "cancel_user_name")
    private String cancelUserName;

    /**
     * 版单取消备注
     */
    @TableField(value = "cancel_remark")
    private String cancelRemark;
    /**
     * plm版单取消备注
     */
    @TableField(value = "plm_cancel_remark")
    private String plmCancelRemark;
    /**
     * plm版单取消原因
     */
    @TableField(value = "plm_cancel_reason")
    private String plmCancelReason;
    /**
     * 修改原因
     */
    @TableField(value = "modify_reason")
    private String modifyReason;

    /**
     * 生产核价状态: 0-未核价 1-核价中 2-已核价
     */
    @TableField(value = "check_price_state")
    private Integer checkPriceState;

    /**
     * 生产核价id
     */
    @TableField(value = "check_price_id")
    private Long checkPriceId;

    /**
     * 预估核价状态: 0-未核价 1-核价中 2-已核价
     */
    @TableField(value = "predict_check_price_status")
    private Integer predictCheckPriceStatus;

    /**
     * 预估核价id
     */
    @TableField(value = "predict_check_price_id")
    private Long predictCheckPriceId;

    /**
     * 备注记录
     */
    @TableField(value = "remark")
    private String remark;

}
