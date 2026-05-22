package tech.tiangong.sdp.dao.entity

import com.baomidou.mybatisplus.annotation.IdType
import com.baomidou.mybatisplus.annotation.TableField
import com.baomidou.mybatisplus.annotation.TableId
import com.baomidou.mybatisplus.annotation.TableName
import team.aikero.blade.data.mybatis.entity.BaseEntityWithNamedAndReviser
import tech.tiangong.sdp.common.enums.PickingTypeEnum
import tech.tiangong.sdp.enums.PickingSourceTypeEnum

/**
 * 选款-AI设计(PickingAiDesign)表名: picking_ai_design
 *
 * @author zjh
 * @since 2025-01-14 11:08:49
 */
@TableName(value = "picking_ai_design")
data class PickingAiDesign(
    /**
     * 选款id
     */
    @TableId(value = "picking_id", type = IdType.ASSIGN_ID)
    var pickingId: Long? = null,

    /**
     * 灵感数据id
     */
    @TableField(value = "inspiration_id")
    var inspirationId: Long? = null,
    /**
     * 灵感图
     */
    @TableField(value = "inspiration_image")
    var inspirationImage: String? = null,

    /**
     * 发送类型id
     * 假设灵感来源，该值就是灵感ID
     * 如果是款式来源，该值就是款式管理的ID
     */
    @TableField(value = "send_type_id")
    var sendTypeId: Long? = null,

    /**
     * 发送类型编码
     * 假设灵感来源，该值就是灵感编码
     * 如果是款式来源，该值就是款式管理的编码
     */
    @TableField(value = "send_type_code")
    var sendTypeCode: String? = null,

    /**
     * 发送类型
     * 灵感源：inspiration
     * 款式管理：prototype_manage
     * 现货管理：spot_style
     */
    @TableField(value = "send_type")
    var sendType: String? = null,

    /**
     * SKC-ID
     */
    @TableField(value = "skc_id")
    var skcId: Long? = null,

    /**
     * SKC编码
     */
    @TableField(value = "skc_code")
    var skcCode: String? = null,


    /**
     * 任务参考图
     */
    @TableField(value = "ref_img_url")
    var refImgUrl: String? = null,


    /**
     * 原图
     * origin为floral_pattern时，该字段为模型图
     */
    @TableField(value = "source_image")
    var sourceImage: String? = null,


    /**
     * 来源
     * smart_develop_style：AI设计
     * posture_fission ：姿势裂变
     * floral_pattern ： 花型上身
     * style_gen ：风格化衍生
     * fashion_virtual_try_on ；虚拟换衣
     */
    @TableField(value = "origin")
    var origin: String? = "smart_develop_style",

    /**
     * 灵感来源，AI衍生款、外采款等
     */
    @TableField(value = "inspiration_source_type")
    var inspirationSourceType: String? = null,
    /**
     * 企划来源code
     */
    @TableField(value = "planning_source_code")
    var planningSourceCode: String? = null,
    /**
     * 企划来源
     */
    @TableField(value = "planning_source_name")
    var planningSourceName: String? = null,
    /**
     * 供给方式code
     */
    @TableField(value = "supply_method_code")
    var supplyMethodCode: String? = null,
    /**
     * 供给方式name
     */
    @TableField(value = "supply_method_name")
    var supplyMethodName: String? = null,
    /**
     * ai任务id
     *
     * origin为floral_pattern时，该字段为花型上身任务表的id
     */
    @TableField(value = "design_task_id")
    var designTaskId: Long? = null,
    /**
     * ai任务编号
     * origin为floral_pattern时，该字段为花型上身任务表的code
     */
    @TableField(value = "design_task_code")
    var designTaskCode: String? = null,
    /**
     * 商品链接URL
     */
    @TableField(value = "product_link")
    var productLink: String? = null,
    /**
     * 数据来源(导入..)
     */
    @TableField(value = "data_source")
    var dataSource: String? = null,
    /**
     * 国家站点，获取当前lazada跨境的6个站点
     */
    @TableField(value = "country_site_code")
    var countrySiteCode: String? = null,
    /**
     * 国家站点，获取当前lazada跨境的6个站点
     */
    @TableField(value = "country_site_name")
    var countrySiteName: String? = null,


    /**
     * 波段编码
     */
    @TableField(value = "wave_band_code")
    var waveBandCode: String? = null,

    /**
     * 波段名称
     */
    @TableField(value = "wave_band_name")
    var waveBandName: String? = null,

    /**
     * 店铺ID
     */
    @TableField(value = "store_id")
    var storeId: Long? = null,

    /**
     * 店铺名称
     */
    @TableField(value = "store_name")
    var storeName: String? = null,

    /**
     * 外部品类
     */
    @TableField(value = "external_category")
    var externalCategory: String? = null,
    /**
     * 识别品类
     */
    @TableField(value = "identify_category_code")
    var identifyCategoryCode: String? = null,
    /**
     * 识别品类
     */
    @TableField(value = "identify_category_name")
    var identifyCategoryName: String? = null,
    /**
     * 波次编号
     */
    @TableField(value = "wave_batch_code")
    var waveBatchCode: String? = null,
    /**
     * 划线价(US)
     */
    @TableField(value = "retail_price")
    var retailPrice: String? = null,
    /**
     * 销售价(US)
     */
    @TableField(value = "sale_price")
    var salePrice: String? = null,
    /**
     * 租户id
     */
    @TableField(value = "tenant_id")
    var tenantId: Long? = null,


    ) : BaseEntityWithNamedAndReviser() {

    /**
     * 一个任务一组图得任务
     */

    fun oneTaskOneGroup(): Boolean {
        return (this.origin.equals(PickingSourceTypeEnum.POSTURE_FISSION.code)
                || this.origin.equals(PickingSourceTypeEnum.FASHION_VIRTUAL_TRY_ON.code))
    }


    /**
     * 是否是款式管理发送过来
     */
    fun isPrototypeManageSendType(): Boolean {
        return this.sendType.equals(PickingTypeEnum.PROTOTYPE_MANAGE.code) || this.sendType.equals(PickingTypeEnum.SPOT_STYLE.code)
    }

    /**
     * 款式管理
     */
    fun isDesignType(): Boolean {
        return this.sendType.equals(PickingTypeEnum.PROTOTYPE_MANAGE.code)
    }

    /**
     * 现货管理
     */
    fun isSpotStyle(): Boolean {
        return this.sendType.equals(PickingTypeEnum.SPOT_STYLE.code)
    }

    /**
     * 灵感来源
     */
    fun isInspiration(): Boolean {
        return null != this.inspirationId
    }


}


