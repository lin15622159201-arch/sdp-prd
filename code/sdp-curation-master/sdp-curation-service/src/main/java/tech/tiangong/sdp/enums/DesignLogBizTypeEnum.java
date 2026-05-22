package tech.tiangong.sdp.enums;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.Objects;
import java.util.stream.Stream;


/**
 * 日志的业务枚举类
 * @author liuhongfu
 */
@Getter
@AllArgsConstructor
public enum DesignLogBizTypeEnum {

    DESIGN_PROTOTYPE("1", "设计拆板"),

    // MATERIAL_CONFIRM("2", "物料确认"),

    BOM_ORDER("3", "开发bom"),

    MATERIAL_PURCHASE("4", "采购申请"),

    ORDER_MATERIAL_FOLLOW("5","采购齐套管理"),

    // PROTO_ON_SHELF("6","上新管理"),

    // INTENTION("7","设计需求"),

    // /**
    //  * plm_demand服务-需求任务-取消款
    //  */
    // DEMAND_TASK("8","需求任务"),

    DESIGN_DEMAND("9","灵感设计需求"),

    DIGITAL_PRINTING("10","数码印花"),

    SPOT("11","现货管理"),
    ;

    private final String code;
    private final String desc;

    public static PrototypeStatusEnum findByCode(String code) {
        return Stream.of(PrototypeStatusEnum.values()).filter(e -> Objects.equals(e.getCode(), code)).findFirst().orElse(null);
    }
}
