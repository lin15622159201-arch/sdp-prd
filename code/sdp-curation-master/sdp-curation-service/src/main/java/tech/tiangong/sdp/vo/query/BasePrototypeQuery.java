package tech.tiangong.sdp.vo.query;

import lombok.Data;
import lombok.EqualsAndHashCode;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.List;

/**
 * 版单-主表列表查询对象
 *
 * @author husky
 * @since 2021-08-09 15:06:45
 */
@Data
@EqualsAndHashCode(callSuper = true)
public class BasePrototypeQuery extends BasePageQuery implements Serializable {

    private static final long serialVersionUID = 1L;

    /**
     * 设计款号
     */
    private String designCode;

    /**
     * 成衣SPU(款式SPU)
     */
    private String styleCode;

    /**
     * 设计师名称【设计师】
     */
    private List<String> designerNameList;

    /**
     * 设计师id集合  (多选)
     */
    private List<Long> designerIdList;

    /**
     * 买手id集合
     */
    private List<Long> buyerIdList;

    /**
     * 设计组  (多选)
     */
    private List<String> designerGroupCodeList;
    /**
     * 款类型: 1--正常款 2-复色款
     */
    private Integer skcType;
    /**
     * 商品末级分类(中文) 完整的分类组装格式: 女装-T恤-圆领T恤
     */
    private List<String> categoryNameList;
    /**
     * 款生成时间（创建时间）
     */
    private LocalDateTime skcCreatedTimeStart;
    /**
     * 款生成时间（创建时间）
     */
    private LocalDateTime skcCreatedTimeEnd;

    /**
     * SPU生成时间
     */
    private LocalDateTime spuCreatedTimeStart;
    /**
     * SPU生成时间
     */
    private LocalDateTime spuCreatedTimeEnd;

    /**
     * bom 提交开始时间 ---2025-01-16 新增
     * */
    private LocalDateTime bomSubmitTimeStart;

    /**
     * bom 提交结束时间 ---2025-01-16 新增
     * */
    private LocalDateTime bomSubmitTimeEnd;

    /**
     * 是否动销: 0-否; 1-是; 默认0
     */
    private Integer isOnSale;

    /**
     * 设计小组组别 1 == 选择了设计小组组别 ， 0 == 没有选择设计小组组别，默认就是为 0
     */
    private Integer clothesDesigner = 0;

    /**
     * 商品类型 (多选)
     */
    private List<String> productTypeList;

    /**
     * 供给方式编码 (多选)
     */
    private List<String> supplyModeCodeList;

    /**
     * 国家站点编码集合 (多选)
     */
    private List<String> countrySiteCodeList;

    /**
     * 波段编码-OPS: plm_clothing_band  (多选)
     */
    private List<String> waveBandCodeList;

    /**
     * 店铺id集合   (多选)
     */
    private List<Long> storeIdList;

    /**
     * SPU编码集合(多选)
     */
    private List<String> styleCodeList;

    /**
     * SKC编码集合(多选)
     */
    private List<String> designCodeList;

    /**
     * 货盘类型编码
     */
    private String palletTypeCode;



}