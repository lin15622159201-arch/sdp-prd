package tech.tiangong.sdp.vo.resp;

import lombok.Data;
import team.aikero.blade.core.enums.Bool;

import java.io.Serial;
import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.List;

/**
 * 现货管理 - SKC
 *
 * @author ：qinwenxuan@zj.tech
 * @version :1.0
 * @date ：2025/11/6 15:02
 */
@Data
public class SpotStyleSkcResp implements Serializable {
    @Serial
    private static final long serialVersionUID = 1360736051790657146L;
    /**
     * SKC ID
     */
    private Long skcId;

    /**
     * SKC编码
     */
    private String skcCode;
    /**
     * 商品主图
     * 1：已齐全
     */
    private Bool hasMainImg;
    /**
     * 资料状态
     * 1：已完善
     */
    private Bool dataCompleted;
    /**
     * 待上架
     * 1：待上架
     * 0：待推送
     */
    private Bool upcoming;
    /**
     * 上架
     * 1：上架
     * 0：下架
     */
    private Bool onShelves;

    /**
     * 上架是否失败状态
     * 1：上架失败
     */
    private Bool onShelvesFail;

    /**
     * 已取消
     * 1：已取消
     */
    private Bool cancelled;
    /**
     * 已动销
     * 1：已动销
     */
    private Bool sold;
    /**
     * 已推送买手
     * 1：已推送买手
     */
    private Bool pushedBuyer;
    /**
     * 推送买手失败
     * 1：推送买手失败
     */
    private Bool pushFailed;
    /**
     * 买手取消
     * 1：买手取消
     */
    private Bool buyerCancelled;
    /**
     * 主图url
     */
    private String mainImgUrl;

    /**
     * 颜色名称
     */
    private String color;

    /**
     * 颜色英文名
     */
    private String colorEnName;

    /**
     * 提交时间
     */
    private LocalDateTime submitTime;

    /**
     * 尺码标准
     */
    private String sizeStandardName;

    /**
     * 尺码标准编号
     */
    private String sizeStandardCode;
    /**
     * 创建时间
     */
    private LocalDateTime createdTime;
    /**
     * 更新时间
     */
    private LocalDateTime revisedTime;
    /**
     * 信息备注
     */
    private String message;
    /**
     * 失败提示
     */
    private String failMessage;
    /**
     * 买手取消原因
     */
    private String buyerCancelMessage;

    /**
     * 上架失败原因
     */
    private String onShelvesFailReason;

    /**
     * 动销时间
     */
    private LocalDateTime saleTime;
    /**
     * 商品图片
     */
    private List<SpotStylePictureResp> productImages;
}
