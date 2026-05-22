package tech.tiangong.sdp.enums;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.Arrays;

/**
 * YOC操作类型枚举
 *
 * <p>定义了系统中各种操作类型的枚举值，包括审核相关操作和店铺管理操作</p>
 *
 * @author while
 * @since 1.0.0
 */
@Getter
@AllArgsConstructor
public enum YocOperationTypeEnum {

    /**
     * 审核通过
     */
    AUDIT_PASS(1, "审核通过"),

    /**
     * 审核驳回
     */
    AUDIT_REJECT(2, "审核驳回"),

    /**
     * 新增店铺
     */
    SHOP_CREATE(3, "新增店铺"),

    /**
     * 编辑店铺
     */
    SHOP_EDIT(4, "编辑店铺"),

    /**
     * 启用店铺
     */
    SHOP_ENABLE(5, "启用店铺"),

    /**
     * 停用店铺
     */
    SHOP_DISABLE(6, "停用店铺");

    /**
     * 操作类型编码
     */
    private final Integer code;

    /**
     * 操作类型描述
     */
    private final String desc;

    /**
     * 根据操作类型编码查找对应的枚举值
     *
     * @param code 操作类型编码
     * @return 对应的枚举值，如果未找到则返回null
     */
    public static YocOperationTypeEnum findByCode(Integer code) {
        return Arrays.stream(YocOperationTypeEnum.values())
                .filter(e -> e.getCode().equals(code))
                .findFirst()
                .orElse(null);
    }
}
