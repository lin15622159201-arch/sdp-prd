package tech.tiangong.sdp.temu.vo.req;

import lombok.Data;
import tech.tiangong.sdp.temu.vo.TemuReq;

import java.io.Serial;

/**
 * Temu商品-货品规格属性
 *
 * @author ：qinwenxuan@zj.tech
 * @version :1.0
 * @date ：2026/1/4 17:55
 */
@Data
public class TemuProductSpecPropertyReq implements TemuReq {

    @Serial
    private static final long serialVersionUID = -2713423545659078563L;
    /**
     * 基础属性值id，没有的情况传0
     */
    private Long vid;

    /**
     * 规格 id
     */
    private Long specId;

    /**
     * 属性值组id，没有的情况传0
     */
    private Long valueGroupId;

    /**
     * 父规格 id
     */
    private Long parentSpecId;

    /**
     * 属性值组名称，没有的情况传空字符串
     */
    private String valueGroupName;

    /**
     * 属性值单位，没有的情况传空字符串
     */
    private String valueUnit;

    /**
     * 属性 id
     */
    private Long pid;

    /**
     * 模板属性 id
     */
    private Long templatePid;

    /**
     * 数值录入
     */
    private String numberInputValue;

    /**
     * 基础属性值
     */
    private String propValue;

    /**
     * 引用属性名
     */
    private String propName;

    /**
     * 引用属性 id
     */
    private Long refPid;

}
