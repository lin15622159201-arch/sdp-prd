package tech.tiangong.sdp.enums;

import lombok.AllArgsConstructor;
import lombok.Getter;

/**
 * @author lujunxuan
 * @date 2021/08/17
 * @since 2020/08/17
 * Description: 业务类型枚举
 */
@Getter
@AllArgsConstructor
public enum DesignRemarksBizTypeEnum {

    MATERIAL_PURCHASE("4","采购申请"),

    BOM_ORDER("3","开发bom"),

    MATERIAL_CONFIRM("2","物料确认"),

    DESIGN_PROTOTYPE("1","设计拆版"),

    CANCELLED("5","已取消"),

    ORDER_MATERIAL_FOLLOW("6","物料齐套"),

    DESIGN_DEMAND("7","灵感设计需求"),

    DIGITAL_PRINTING("8","数码印花"),
    ;

    private final String code;
    private final String desc;


}
