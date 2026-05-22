package tech.tiangong.sdp.vo.resp;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import lombok.Data;

import java.io.Serial;
import java.io.Serializable;

/**
 * 商品-销售属性
 *
 * @author ：qinwenxuan@zj.tech
 * @version :1.0
 * @date ：2026/1/13 10:33
 */
@Data
public class ProductSpecAttrResp implements Serializable {
    @Serial
    private static final long serialVersionUID = -5962209284410597234L;
    /**
     * 主键 id
     */
    private Long attrId;

    /**
     * 商品 ID
     */
    private Long productId;
    /**
     * 模板属性 id
     */
    private Integer templatePid;
    /**
     * 属性 id
     */
    private Integer pid;
    /**
     * 引用属性 id
     */
    private Integer refPid;
    /**
     * 基础属性值id，没有的情况传0
     */
    private Integer vid;
    /**
     * 引用属性名
     */
    private String propName;
    /**
     * 基础属性值
     */
    private String propValue;
    /**
     * 父规格 id
     */
    private Integer parentSpecId;
    /**
     * 父规格名称
     */
    private String parentSpecName;
    /**
     * 规格 id
     */
    private Integer specId;
    /**
     * 规格名称
     */
    private String specName;

    /**
     * 属性值组id，没有的情况传0
     */
    private Integer valueGroupId;
    /**
     * 属性值组名称，没有的情况传空字符串
     */
    private String valueGroupName;
    /**
     * 数值录入
     */
    private String numberInputValue;
    /**
     * 属性值单位，没有的情况传空字符串
     */
    private String valueUnit;
    /**
     * 值扩展属性
     */
    private String valueExtendInfo;
}
