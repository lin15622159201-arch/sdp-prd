package tech.tiangong.sdp.vo.resp;

import lombok.Data;
import lombok.EqualsAndHashCode;
import team.aikero.blade.core.enums.Bool;
import tech.tiangong.sdp.common.resp.BasicVO;
import tech.tiangong.sdp.enums.SpotStyleTypeEnum;
import java.io.Serial;
import java.time.LocalDateTime;
import java.util.List;

/**
 * 现货管理 - 分页
 *
 * @author ：qinwenxuan@zj.tech
 * @version :1.0
 * @date ：2025/11/3 18:08
 */
@EqualsAndHashCode(callSuper = true)
@Data
public class SpotStyleTaskPageResp extends BasicVO {

    @Serial
    private static final long serialVersionUID = -2428963009678792259L;
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
     * 已取消
     * 1：已取消
     */
    private Bool cancelled;
    /**
     * 开款类型
     */
    private SpotStyleTypeEnum styleType;
    /**
     * 款式品类编码
     */
    private String categoryCode;

    /**
     * 款式品类名
     */
    private String categoryName;

    /**
     * 店铺id
     */
    private Long storeId;

    /**
     * 店铺名称
     */
    private String storeName;

    /**
     * 主图url
     */
    private String mainImgUrl;

    /**
     * 更新时间
     */
    private LocalDateTime revisedTime;

    /**
     * 图片修复id
     */
    private Long imageUpdateId;
    /**
     * image_update_code
     */
    private String imageUpdateCode;
    /**
     * 图片修复状态
     */
    private Integer imageUpdateStatus;
    /**
     * 图片修复时间
     */
    private LocalDateTime imageUpdateTime;
    /**
     * 货盘类型名称
     */
    private String palletTypeName;

    /**
     * 货盘类型编码
     */
    private String palletTypeCode;

    /**
     * 现货类型编码
     */
    private String spotStyleTypeCode;

    /**
     * 现货类型名称
     */
    private String spotStyleTypeName;

    /**
     * 信息备注
     */
    private String message;
    /**
     * 尺码标准
     */
    private String sizeStandardName;

    /**
     * 尺码标准编号
     */
    private String sizeStandardCode;

    /**
     * 数据来源ID
     */
    private Long sourceId;

    /**
     * SKC
     */
    private List<SpotStyleSkcResp> skcs;

    /**
     * 供应商
     */
    private List<SpotStyleSupplierResp> suppliers;

    /**
     * 商品图片
     */
    private List<SpotStylePictureResp> productImages;

    /**
     * 设计师id【设计师】
     */
    private Long designerId;


    /**
     * 设计师名称【设计师】
     */
    private String designerName;

}
