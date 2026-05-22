package tech.tiangong.sdp.vo.req;

import lombok.Data;
import javax.validation.constraints.NotNull;
import java.io.Serializable;

/**
 * bom修改请求
 *
 * @author lijian
 * @version 1.0
 * @date 2022/8/9 11:43
 */
@Data
public class BomOrderAddReq implements Serializable {

	/**
	 * bomId
	 */
	@NotNull(message = "bomId不能为空")
	private Long bomId;

}
