package tech.tiangong.sdp.temu.vo.req;

import lombok.Data;
import tech.tiangong.sdp.temu.vo.TemuReq;
import tech.tiangong.sdp.temu.vo.dto.TemuSemiManagedSiteModeDTO;
import tech.tiangong.sdp.temu.vo.resp.TemuGoodsAdditionalInfoResp;
import tech.tiangong.sdp.temu.vo.resp.TemuGoodsGroupResp;

import java.io.Serial;
import java.util.List;

/**
 * Temu商品-货品属性
 *
 * @author ：qinwenxuan@zj.tech
 * @version :1.0
 * @date ：2026/1/4 17:04
 */
@Data
public class TemuProductPropertyReq implements TemuReq {
    @Serial
    private static final long serialVersionUID = -4002736694892611741L;
    /**
     * 基础属性值id，没有的情况传0
     */
    private Long vid;
    /**
     * 属性 id
     */
    private Long pid;
    /**
     * 模板属性 id
     */
    private Long templatePid;
    /**
     * 引用属性 id
     */
    private Long refPid;
    /**
     * 属性值单位，没有的情况传空字符串
     */
    private String valueUnit;


    /**
     * 数值录入
     */
    private String numberInputValue;


    /**
     * 基础属性值
     */
    private String propValue;


    /**
     * 基础属性值
     */
    private String propName;
}
