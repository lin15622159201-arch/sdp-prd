package tech.tiangong.sdp.temu.vo.dto;

import lombok.Data;

import java.util.List;

/**
 * TemuProductSkuAccessoriesDTO
 *
 * @author ：qinwenxuan@zj.tech
 * @version :1.0
 * @date ：2026/1/4 17:55
 */
@Data
public class TemuProductSkuAccessoriesDTO {
    /**
     * 预览图
     */
    private String thumbUrl;
    /**
     * 货品SKU包装清单，全托管SKU分类选择“混合套装”时必填，从bg.goods.accessories.get获取支持的包装清单物品类型信息
     */
    private List<TemuProductSkuAccessoryDTO> productSkuAccessories;
}
