package tech.tiangong.sdp.vo.resp;

import lombok.Data;
import java.io.Serializable;

/**
 * @author liuhongfu
 * @Created by jeromeliu
 * @ClassName PrototypeExcelResp
 * @Description
 * @Date 2025/1/16 16:46
 */
@Data
public class PrototypeExcelResp implements Serializable {


    /**
     * 成衣编号
     */
    private String styleCode;


    /**
     * 款式编号
     */
    private String designCode;


    /**
     * 品类
     */
    private String categoryName;


    /**
     * 店铺
     */
    private String storeName;


    /**
     * 波段
     */
    private String waveBandName;

    /**
     * 款式标签名称
     */
    private String styleLabelName;


    /**
     * 款式类型
     */
    private String skcType;


    /**
     * 视觉形式名称
     */
    private String visualFormName;


    /**
     * 款式级别
     */
    private String styleLevelName;

    /**
     * 款式风格名称
     */
    private String clothingStyleName;


    /**
     * 场景名称
     */
    private String sceneName;


    /**
     * 节日名称
     */
    private String galaName;

    /**
     * 印花类型名称
     */
    private String printingName;


    /**
     * 织造方式
     */
    private String weaveModeName;


    /**
     * 品质等级
     */
    private String qualityLevelName;

    /**
     * 季节名称
     */
    private String seasonName;

    /**
     * 颜色
     * */
    private String color;

    /**
     * 尺码组别
     */
    private String sizeStandardName;


    /**
     * 版型名称
     */
    private String patternName;


    /**
     * 弹性名称
     */
    private String elasticName;


    /**
     * 设计师
     */
    private String designerName;


    /**
     * SKC生产时间
     */
    private String skcCreatedTime;

}
