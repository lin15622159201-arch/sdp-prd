package tech.tiangong.sdp.temu.vo.req;

import lombok.Data;
import tech.tiangong.sdp.temu.vo.TemuReq;
import tech.tiangong.sdp.temu.vo.dto.TemuGoodsLayerContentDTO;
import tech.tiangong.sdp.temu.vo.dto.TemuSemiManagedSiteModeDTO;

import java.io.Serial;
import java.util.List;

/**
 * Temu商品-商详装饰
 *
 * @author ：qinwenxuan@zj.tech
 * @version :1.0
 * @date ：2026/1/4 17:04
 */
@Data
public class TemuGoodsLayerDecorationReq implements TemuReq {

    @Serial
    private static final long serialVersionUID = 6938993914551202140L;
    /**
     * 楼层id,null:新增,否则为更新
     */
    private Integer floorId ;
    /**
     * 商品 ID
     */
    private Long goodsId ;
    /**
     * 楼层排序
     */
    private  Integer priority ;
    /**
     * 语言类型
     */
    private String lang ;
    /**
     * 楼层类型的key,目前默认传'DecImage'
     */
    private String key ;
    /**
     * 楼层内容
     */
    private List<TemuGoodsLayerContentDTO> contentList;
}
