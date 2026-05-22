package tech.tiangong.sdp.config;

import lombok.Data;

/**
 *  temu推送过PLM设计师信息配置
 *
 * @author ：liuhonngfu
 * @version :1.0
 * @date ：2025/12/1 10:31
 */
@Data
public class TemuSyncPlmDesignerProperties {

    /**
     * 设计师id【设计师】,PLM的
     */
    private Long designerId;

    /**
     * 设计师名称【设计师】,PLM的
     */
    private String designerName;
}
