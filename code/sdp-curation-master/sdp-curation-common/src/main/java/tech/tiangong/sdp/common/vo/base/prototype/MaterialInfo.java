package tech.tiangong.sdp.common.vo.base.prototype;

import lombok.Data;

import java.io.Serializable;

/**
 * 指定物料
 *
 * @Author Husky
 * @create 2021/8/16
 */
@Data
public class MaterialInfo implements Serializable {

    private static final long serialVersionUID = 7432239516003828858L;
    /**
     * 供应商名称
     */
    private String supplierName;
    /**
     * 联系人
     */
    private String supplierContactName;
    /**
     * 供应商地址
     */
    private String supplierAddress;
    /**
     * 手机号码
     */
    private String supplierContactMobile;
    /**
     * 商品名称
     */
    private String goodsName;
    /**
     * 色号
     */
    private String colorNumber;

    /**
     * 商品货号
     */
    private String commodityNumber;
    /**
     * 价格
     */
    private String price;
}
