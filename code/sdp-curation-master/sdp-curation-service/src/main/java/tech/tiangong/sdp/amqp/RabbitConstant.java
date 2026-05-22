package tech.tiangong.sdp.amqp;

/**
 * RabbitConstant
 *
 * @author : qinwenxuan@zj.tech
 * @version : 1.0
 * @date : 2025/8/20 18:06
 */
public interface RabbitConstant {
    String PUSH_DEVELOP_STYLE_EXCHANGE = "e.sdp-curation.develop_style.push";
    String PUSH_DEVELOP_STYLE_ROUTING_KEY = "r.sdp-curation.develop_style.push";
    String PUSH_DEVELOP_STYLE_QUEUE = "q.sdp-curation.develop_style.push";
    String SUSPEND_DEVELOP_STYLE_EXCHANGE = "e.sdp-curation.develop_style.suspend";
    String SUSPEND_DEVELOP_STYLE_ROUTING_KEY = "r.sdp-curation.develop_style.suspend";
    String SUSPEND_DEVELOP_STYLE_QUEUE = "q.sdp-curation.develop_style.suspend";

    String PULL_PLM_STYLE_CODE_EXCHANGE = "e.sdp-curation.plm_style_code.pull";
    String PULL_PLM_STYLE_CODE_ROUTING_KEY = "r.sdp-curation.plm_style_code.pull";
    String PULL_PLM_STYLE_CODE_QUEUE = "q.sdp-curation.plm_style_code.pull";

    String PUSH_PLM_STYLE_EXCHANGE = "e.sdp-curation.plm_style.push";
    String PUSH_PLM_STYLE_ROUTING_KEY = "r.sdp-curation.plm_style.push";
    String PUSH_PLM_STYLE_QUEUE = "q.sdp-curation.plm_prototype.push";

    String PUSH_MULFEAT_EXTRACT_EXCHANGE = "e.sdp-curation.mulfeat.extract.push";
    String PUSH_MULFEAT_EXTRACT_ROUTING_KEY = "r.sdp-curation.mulfeat.extract.push";
    String PUSH_MULFEAT_EXTRACT_QUEUE = "q.sdp-curation.mulfeat.extract.push";


    String PUSH_CROP_TASK_EXCHANGE = "e.sdp-curation.crop_task.push";
    String PUSH_CROP_TASK_ROUTING_KEY = "r.sdp-curation.crop_task.push";
    String PUSH_CROP_TASK_QUEUE = "q.sdp-curation.crop_task.push";


    String PUSH_PLM_SPU_SKC_EXCHANGE = "e.sdp-curation.plm_spu_skc.push";
    String PUSH_PLM_SPU_SKC_ROUTING_KEY = "r.sdp-curation.plm_spu_skc.push";
    String PUSH_PLM_SPU_SKC_QUEUE = "q.sdp-curation.plm_spu_skc.push";

    String PUSH_PLM_BUYER_EXCHANGE = "e.sdp-curation.plm_buyer.push";
    String PUSH_PLM_BUYER_ROUTING_KEY = "r.sdp-curation.plm_buyer.push";
    String PUSH_PLM_BUYER_QUEUE = "q.sdp-curation.plm_buyer.push";

    String PUSH_TEMU_EXCHANGE = "e.sdp-curation.temu.push";
    String PUSH_TEMU_ROUTING_KEY = "r.sdp-curation.temu.push";
    String PUSH_TEMU_QUEUE = "q.sdp-curation.temu.push";

}
