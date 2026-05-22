package tech.tiangong.sdp.enums;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.List;
import java.util.stream.Stream;

/**
 * bom订单状态枚举
 *
 * @author lijian
 * @version 1.0
 * @date 2021/8/13 15:29
 */
@Getter
@AllArgsConstructor
public enum BomOrderStateEnum {
	// bom状态: 100-待提交; 110-已提交; 120-已核算; 130-暂存; 190-已关闭
	WAIT_SUBMIT(100,"待提交"),

	SUBMITTED(110,"已提交"),

	CALCULATED(120,"已核算"),

	/**
	 * 注: bom单没有暂存状态, 暂存状态使用另外的字段维护,这里是给前端统一数量用;
	 */
	IS_TRANSIENT(130,"暂存"),

	CLOSED(190,"已关闭"),

	UNKNOWN(9999,"未知")

	;
	private final Integer code;

	private final String desc;


	public static BomOrderStateEnum findEntityByCode(Integer code) {
		return Stream.of(BomOrderStateEnum.values()).filter(e -> e.getCode().equals(code)).findFirst().orElse(UNKNOWN);
	}

	/**
	 * bom已提交列表,排除 待提交,已关闭
	 * @return
	 */
	public static List<BomOrderStateEnum> submitStateList() {
		return List.of(SUBMITTED, CALCULATED);
	}
}
