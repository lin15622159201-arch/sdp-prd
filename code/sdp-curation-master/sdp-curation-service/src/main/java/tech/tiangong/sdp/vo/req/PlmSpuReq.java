package tech.tiangong.sdp.vo.req;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serial;
import java.io.Serializable;
import java.util.List;

/**
 * 查询SPU列表（分页）
 *
 * @author ：liuhongfu@zj.tech
 * @version :1.0
 * @date ：2025/12/15 16:00
 */
@AllArgsConstructor
@NoArgsConstructor
@Data
public class PlmSpuReq implements Serializable {

    @Serial
    private static final long serialVersionUID = 7988048062448087712L;

    /**
     * 当前查询的页码
     */
    private Integer pageNum = 1;

    /**
     * 当前查询单页的数据量
     */
    private Integer pageSize = 20;

    /**
     * 业务渠道 zj:1 jv:2 默认是：zj:1
     */
    private Integer bizChannel = 1;

    /**
     * 款式SPU。SPU+年份+7位流水号
     */
    private List<String> styleCode;

    /**
     * 款式品类(款式品类-商品类型-商品末级分类)(code1-code2-code3)
     */
    private List<String> categoryList;

    /**
     * 所属区域id
     */
    private Integer regionId;

    /**
     * 设计师id【设计师】
     */
    private Integer designerId;

    /**
     * 设计组code
     */
    private String designerGroupCode;

    /**
     * 查询核价的状态(默认不传，全查出来)。0：未核价 1:核价中 2：已核价
     */
    private List<Integer> queryCheckPriceStatus;

    /**
     * 查询BOM的状态(默认不传，全查出来)。 100-待提交; 110-已提交; 120-已核算; 190-已关闭
     * <p>默认排除找料中、暂存的bom</p>
     */
    private List<Integer> queryBomStatus;

    /**
     * 是否要查所有（包含已取消）,默认不查已取消的。
     */
    private Boolean queryAllPrototype = false;

    /**
     * 是否胚衣
     */
    private Integer seedCoat;

    /**
     * 是否样衣尺码完成 0否 1是
     */
    private Integer isSampleClothingSizesCloseFinish;

    /**
     * 颜色
     */
    private String colorCode;
}
