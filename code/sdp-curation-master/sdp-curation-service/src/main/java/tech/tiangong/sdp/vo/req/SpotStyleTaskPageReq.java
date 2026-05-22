package tech.tiangong.sdp.vo.req;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import team.aikero.blade.core.enums.Bool;

import java.io.Serial;
import java.util.List;

/**
 * 现货管理 - 分页
 *
 * @author ：qinwenxuan@zj.tech
 * @version :1.0
 * @date ：2025/11/3 16:58
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode(callSuper = true)
public class SpotStyleTaskPageReq extends BasePageReq {

    @Serial
    private static final long serialVersionUID = 8739452072134486893L;
    /**
     * 同组
     * 1:组内
     */
    private Bool sameGroup;
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
     * 供给方式编码
     */
    private List<String> supplyModeCodes;

    /**
     * SKC
     */
    private String skcCode;

    /**
     * 款式品类编码
     */
    private List<String> categoryCodes;
    /**
     * 图片修复状态
     * 0-待处理；10-待审核；20-待返修；30-已完成；50-已取消；90-未创建；
     */
    private Integer imageUpdateStatus;

    /**
     * 款式标签
     */
    private List<String> styleLabelCodes;

    /**
     * 供应商款号
     */
    private String supplierStyleCode;

    /**
     * 供应商名称
     */
    private String supplierName;

}
