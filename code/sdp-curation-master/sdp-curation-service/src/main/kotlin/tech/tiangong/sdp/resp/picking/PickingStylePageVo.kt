package tech.tiangong.sdp.resp.picking

import com.baomidou.mybatisplus.annotation.TableField
import com.fasterxml.jackson.annotation.JsonFormat
import com.fasterxml.jackson.databind.annotation.JsonSerialize
import com.fasterxml.jackson.databind.ser.std.ToStringSerializer
import team.aikero.blade.core.annotation.convert.ConvertOssPath
import tech.tiangong.sdp.dao.bo.AttachmentBo
import tech.tiangong.sdp.resp.SmartDevelopOutputGroupTag
import java.math.BigDecimal
import java.time.LocalDateTime

/**
 * 选款列表
 *
 * @author yanjiaming@zj.tech
 * @date 2024/8/6
 */

class PickingStylePageVo {
    /**
     * 选款任务ID
     */
    @JsonSerialize(using = ToStringSerializer::class)
    var pickingId: Long? = null

    /**
     * 数据来源类型（导入）
     */
    var dataSourceType: String? = null

    /**
     * 数据来源
     * smart_develop_style：AI设计
     * posture_fission ：姿势裂变
     */
    var origin: String? = null

    /**
     * 原图
     * origin为floral_pattern时，该字段为模型图
     */
    var sourceImage: String? = null


    /**
     * 外部品类
     */
    var externalCategory: String? = null

    /**
     * 算法品类
     */
    var identifyCategoryName: String? = null

    /**
     * 波次
     */
    var waveBatchName: String? = null

    /**
     * 国家站点
     */
    var countrySiteName: String? = null

    /**
     * 跑图任务编码
     */
    var taskCode: String? = null

    /**
     * 创建人 id
     */
    @JsonSerialize(using = ToStringSerializer::class)
    var creatorId: Long? = null

    /**
     * 创建人 name
     */
    var creatorName: String? = null

    /**
     * 创建时间
     */
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss", timezone = "GMT+8")
    var createdTime: LocalDateTime? = null

    /**
     * 灵感图
     */
    var inspirationImage: String? = null

    /**
     * 参考图
     */
    var refImgUrl: String? = null



    /**
     * 灵感来源，ins、shein等
     */
    var inspirationSourceType: String? = null

    /**
     * 划线价(US)
     */
    var retailPrice: String? = null

    /**
     * 销售价(US)
     */
    var salePrice: String? = null

    /**
     * 选款状态(用于前端校验)
     * 0待选, 1已选过
     */
    var state: Int? = null

    /**
     * AIGC图片详情列表
     */
    var pickingStyleDetails: List<PickingStylePageResultDetailVo>? = mutableListOf()

    /**
     * 参考图
     */
    @ConvertOssPath
    var referencePicture: String? = null

    /**
     * 参考图权重，值越大，参考度越低，建议1~8的浮点数（默认0）
     */
    var refWeight: BigDecimal? = null


    /**
     * 场景图
     */
    @ConvertOssPath
    var picturePath: String? = null

    /**
     * 模特图片Url
     */
    @ConvertOssPath
    var aiModelUrl: String? = null

    /**
     * ai任务id
     */
    var designTaskId: Long? = null

    /**
     * 模型名称（字典配置名称）
     */
    var modeName: String? = null

    /**
     * 款式
     */
    class PickingStylePageResultDetailVo {

        /**
         * 款式id
         */
        @JsonSerialize(using = ToStringSerializer::class)
        var pickingStyleId: Long? = null

        /**
         * 选款id
         */
        @JsonSerialize(using = ToStringSerializer::class)
        var pickingId: Long? = null

        /**
         * 款式名称(款式1,款式2..)
         */
        var pickingStyleName: String? = null

        /**
         * 选用状态：0待选中,1已选中,2未选中
         * @see tech.tiangong.sdp.enums.PickingStateEnum
         */
        var pickingState: Int? = null

        /**
         * 排序号
         */
        var sortOrder: Int? = null

        /**
         * 款式信息
         */
        var resultDetail: ResultDetailVo? = null

        /**
         * 图片集合
         */
        var pickingStyleImages: List<PickingStylePageResultImageVo>? = null

        /**
         * 图片标签 v3.10.1
         */
        var styleTag: SmartDevelopOutputGroupTag? = null

        /**
         * 选款人名称(买手)
         */
        @TableField(value = "selector_name")
        var selectorName: String? = null

        /**
         * 选款时间
         */
        @TableField(value = "selection_time")
        var selectionTime: LocalDateTime? = null


        class ResultDetailVo {

            /**
             * 建议价格
             */
            var suggestedPrice: String? = null

            /**
             * 建议风格
             */
            var suggestedStyle: String? = null

            /**
             * 建议品类
             */
            var suggestedCategoryCode: String? = null

            /**
             * 建议波段
             */
            var suggestedWaveBatchCode: String? = null

            /**
             * 建议店铺
             */
            var suggestedShopName: String? = null

            /**
             * 建议店铺
             */
            var suggestedShopCode: String? = null

            /**
             * 建议印花：0-无，1-定位印，2-满印，3-净色
             */
            var suggestedPrinting: String? = null

            /**
             * 建议国家站点
             */
            var suggestedCountrySiteCode: String? = null

            /**
             * 货盘编号
             */
            var cargoTrayCode: String? = null

            /**
             * 备注
             */
            var remark: String? = null

            /**
             * 附件
             */
            var attachments: List<AttachmentBo> = mutableListOf()

            /**
             * 更新版本号(随机)
             */
            @JsonSerialize(using = ToStringSerializer::class)
            var updateVersion: Long? = null

            /**
             * 场景code  v3.9
             */
            var sceneCode: String? = null

            /**
             * 场景名称 v3.9
             */
            var sceneName: String? = null
        }

        /**
         * 款式图片
         */
        class PickingStylePageResultImageVo {
            /**
             * 图片id
             */
            @JsonSerialize(using = ToStringSerializer::class)
            var pickingPictureId: Long? = null

            /**
             * 选款id
             */
            @JsonSerialize(using = ToStringSerializer::class)
            var pickingId: Long? = null

            /**
             * 款式id
             */
            @JsonSerialize(using = ToStringSerializer::class)
            var pickingStyleId: Long? = null

            /**
             * 选用状态：1已选中,2未选中
             * @see tech.tiangong.sdp.enums.PickingStateEnum
             */
            var pickingState: Int? = null

            /**
             * 生成图
             */
            var pictureUrl: String? = null

            /**
             * 修复图
             */
            var repairImgUrl: String? = null

            /**
             * 组号
             */
            var groupNum: Int? = null

            /**
             * 序号
             */
            var serialNum: Int? = null

            /**
             * 是否主图 1是 0否
             */
            var mainImageType: Int? = null

            /**
             * 是否修图 1是 0否
             */
            var fixImageType: Int? = null

            /**
             * 是否淘汰 1是 0否
             */
            var eliminateType: Int? = null

            /**
             * 淘汰原因 v3.10.1
             */
            var eliminateReasonCodes: List<String>? = null
        }

    }

}
