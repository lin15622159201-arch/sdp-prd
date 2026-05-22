package tech.tiangong.sdp.vo.query;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import team.aikero.blade.core.enums.Bool;

import java.io.Serial;
import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Set;

/**
 * 设计款管理-列表查询对象
 *
 * @author cenlijin
 * @since 2021-08-09 15:06:45
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(callSuper = true)
public class PrototypeQuery extends BasePageQuery  implements Serializable {

    @Serial
    private static final long serialVersionUID = 1L;


    //-----共同部分
    /**
     * 同组
     * 1:组内
     */
    private Bool sameGroup;

    /**
     * 创建人id，tab选择了我的的时候传
     */
    private Long creatorId;

    /**
     * 创建人id
     */
    private Set<Long> creatorIds;

    private Boolean empty = false;


    /**
     * SKC编码集合(多选)
     */
    private List<String> designCodeList;

    /**
     * SPU编码集合(多选)
     */
    private List<String> styleCodeList;

    /**
     * 商品末级分类(中文) 完整的分类组装格式: 女装-T恤-圆领T恤
     */
    private List<String> categoryNameList;


    /**
     * 波段编码-OPS: plm_clothing_band  (多选)
     */
    private List<String> waveBandCodeList;

    /**
     * 设计师id集合  (多选)
     */
    private List<Long> designerIdList;

    /**
     * 后台查询专用
     */
    private Set<Long> designerIds;


    /**
     * 设计组  (多选)
     */
    private List<String> designerGroupCodeList;


    /**
     * 店铺id集合   (多选)
     */
    private List<Long> storeIdList;


    /**
     * 款式标签编码集合   (多选)
     */
    private List<String> styleLabelCodeList;


    /**
     * 款式等级编号(多选)
     */
    private List<String> styleLevelCodeList;


    /**
     * SPU生成时间开始时间
     */
    private LocalDateTime spuCreatedTimeStart;

    /**
     * SPU生成时间结束时间
     */
    private LocalDateTime spuCreatedTimeEnd;


    /**
     * SKC生成时间（创建时间）
     */
    private LocalDateTime skcCreatedTimeStart;
    /**
     * SKC生成时间（创建结束时间）
     */
    private LocalDateTime skcCreatedTimeEnd;

    //-----共同部分


    /**
     * 修图任务:1-:未创建；0-待处理；10-待审核；20-待返修；30-已完成；50-已取消
     */
    private Integer imageUpdateStatus;


    /**
     * 款式资料状态: 1.未提交 2.已提交
     */
    private Integer prototypeStatus;


    /**
     * 是否补做 false 否 true是
     */
    private Integer isMakeMore;

    /**
     * 是否二次工艺(1:是,0:否)
     */
    private Integer isCraft;


    /**
     * 是否取消 0 否 1是
     */
    private Integer isCanceled;

    /**
     * 是否动销: 0-否; 1-是; 默认0
     */
    private Integer isOnSale;

    /**
     * 款类型: 1--正常款 2-复色款
     */
    private Integer skcType;


    /**
     * 是否核价(1:是,0:否)
     */
    private Integer checkPriceState;


    /**
     * 找料状态: 0-否; 1-是 (默认0) ---2025-01-16新增
     */
    private Integer materialSearchState;


    /**
     * 上架状态: 0-待推送; 1-待上架;2-已上架；3-下架；4-上架失败
     */
    private Integer listingStatus;

    /**
     * 任务状态：0-待推送，1-已推送；2-推送失败,3-已取消
     */
    private Integer pushPlmStatus;

    /**
     * 指定导出skc
     * <p>
     * */
    private List<String> exportDesignCodeList;


    /**
     * 前置拆版状态 0=否 1=是
     */
    private Integer preDisassemblyState;


    /**
     * 测价通过状态 0=否 1=是
     */
    private Integer pricePassedState;


    /**
     * 拆版是否完成 0=否 1=是
     */
    private Integer disassemblyFinished;



}