package tech.tiangong.sdp.constants

/**
 * @author zjh
 * @date 2024/12/5 10:43
 */
class MqConstant {

    companion object {
        // 灵感任务淘汰
        const val DESIGN_DEMAND_ELIMINATE_E = "e.sdp_design.design_demand_no_pass"
        const val DESIGN_DEMAND_ELIMINATE_R = "r.sdp_design.design_demand_no_pass"
        const val DESIGN_DEMAND_ELIMINATE_Q = "q.sdp_design.design_demand_no_pass"

        // 灵感任务开款
        const val DESIGN_DEMAND_CREATE_SPU_E = "e.sdp_design.design_demand_create_spu"
        const val DESIGN_DEMAND_CREATE_SPU_R = "r.sdp_design.design_demand_create_spu"
        const val DESIGN_DEMAND_CREATE_SPU_Q = "q.sdp_design.design_demand_create_spu"

        //选款确认
        const val PACKING_RESULT_CONFIRM_E = "ola.sdp_curation.packing_result_confirm"
        const val PACKING_RESULT_CONFIRM_R = "r.ola.sdp_curation.packing_result_confirm"
        const val PACKING_RESULT_CONFIRM_Q = "q.ola.sdp_curation.packing_result_confirm"

        //选款创建
        const val PACKING_STYLE_CREATE_E = "ola.sdp_curation.packing_style_create"
        const val PACKING_STYLE_CREATE_R = "r.ola.sdp_curation.packing_style_create"
    }
}