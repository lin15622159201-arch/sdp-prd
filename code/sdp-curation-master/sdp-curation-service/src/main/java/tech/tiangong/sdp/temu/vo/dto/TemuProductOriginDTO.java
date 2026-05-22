package tech.tiangong.sdp.temu.vo.dto;

import lombok.Data;

/**
 * TemuProductOuterPackageImageDTO
 *
 * @author ：qinwenxuan@zj.tech
 * @version :1.0
 * @date ：2026/1/4 17:55
 */
@Data
public class TemuProductOriginDTO {

    /**
     * 省份，当region1ShortName为CN时，省份必传
     * 枚举值：<a href="https://partner.kuajingmaihuo.com/document?cataId=875196199516&docId=894069632221">...</a>
     */
    private Integer region2Id;

    /**
     * 一级区域简称 (二字简码)
     */
    private String region1ShortName;

}
