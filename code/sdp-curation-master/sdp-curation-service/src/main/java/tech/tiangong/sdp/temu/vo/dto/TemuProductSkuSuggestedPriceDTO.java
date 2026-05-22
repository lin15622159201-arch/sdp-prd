package tech.tiangong.sdp.temu.vo.dto;

import lombok.Data;

import java.util.List;

/**
 * TemuSiteSupplierPriceDTO
 *
 * @author ：qinwenxuan@zj.tech
 * @version :1.0
 * @date ：2026/1/4 17:06
 */
@Data
public class TemuProductSkuSuggestedPriceDTO {
    /**
     * 建议价格币种
     * USD:美元,
     * CNY:人民币,
     * JPY:日元,
     * CAD:加拿大元,
     * GBP:英镑,
     * AUD:澳大利亚元,
     * NZD:新西兰元,
     * EUR:欧元,
     * MXN:墨西哥比索,
     * PLN:波兰兹罗提,
     * SEK:瑞典克朗,
     * CHF:瑞士法郎,
     * KRW:韩元,
     * SAR:沙特里亚尔,
     * SGD:新加坡元,
     * AED:阿联酋迪拉姆,
     * KWD:科威特第纳尔,
     * NOK:挪威克朗,
     * CLP:智利比索,
     * MYR:马来西亚林吉特,
     * PHP:菲律宾比索,
     * TWD:新台湾元,
     * THB:泰铢,
     * QAR:卡塔尔里亚尔,
     * JOD:约旦第纳尔,
     * BRL:巴西雷亚尔,
     * OMR:阿曼里亚尔,
     * BHD:巴林第纳尔,
     * ILS:以色列新锡克尔,
     * ZAR:南非兰特,
     * CZK:捷克克朗,
     * HUF:匈牙利福林,
     * DKK:丹麦克朗,
     * RON:罗马尼亚列伊,
     * BGN:保加利亚列瓦,
     * HKD:港元,
     * COP:哥伦比亚比索,
     * GEL:格鲁吉亚拉里
     */
    private String suggestedPriceCurrencyType;
    /**
     * 建议价格
     */
    private Integer suggestedPrice;
    /**
     * 特殊的建议价格
     */
    private String specialSuggestedPrice;

}
