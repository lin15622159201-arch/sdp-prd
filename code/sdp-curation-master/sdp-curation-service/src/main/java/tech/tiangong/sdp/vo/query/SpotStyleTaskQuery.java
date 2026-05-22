package tech.tiangong.sdp.vo.query;

import lombok.Data;
import lombok.EqualsAndHashCode;

import java.io.Serial;
import java.util.List;
import java.util.Objects;
import java.util.Set;

/**
 * 现货(SpotStyleTask)列表查询对象
 *
 * @author qinwenxuan@zj.tech
 * @since 2025-11-03 14:39:39
 */
@Data
@EqualsAndHashCode(callSuper = true)
public class SpotStyleTaskQuery extends BasePageQuery {
    @Serial
    private static final long serialVersionUID = 3724503377872159456L;
    private Integer pageLimit;
    /**
     * 任务状态
     */
    private Integer taskStatus;
    /**
     * 包含的状态列表（任意一个）
     */
    private Set<Integer> spuAnyStatus;

    /**
     * 必须包含的所有状态列表
     */
    private Set<Integer> spuAllStatus;

    /**
     * 排除的状态列表
     */
    private Set<Integer> spuExcludeStatus;
    /**
     * 包含的状态列表（任意一个）
     */
    private Set<Integer> skcAnyStatus;

    /**
     * 必须包含的所有状态列表
     */
    private Set<Integer> skcAllStatus;

    /**
     * 排除的状态列表
     */
    private Set<Integer> skcExcludeStatus;
    /**
     * SKC
     */
    private List<String> skcCodes;
    /**
     * 任务编号(多个,分割)
     */
    private List<String> taskCodes;
    /**
     * 供给方式编码
     */
    private List<String> supplyModeCodes;

    /**
     * 款式品类编码
     */
    private List<String> categoryCodes;
    /**
     * 图片修复状态
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

    /**
     * 创建人id
     */
    private Set<Long> creatorIds;
    private Integer joinSupplier;
    private Integer joinSkc;
    private Boolean empty = false;
    /**
     * 大于状态
     */
    private Integer skcStatus;


    public int requireSkcStatus() {
        return Objects.requireNonNullElse(this.skcStatus, 0);
    }
}
