package tech.tiangong.sdp.common.req;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serial;
import java.io.Serializable;
import java.util.List;

/**
 * 买手创建SPU
 *
 * @author ：qinwenxuan@zj.tech
 * @version :1.0
 * @date ：2025/12/2 15:23
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class BuyerCreateSpuReq implements Serializable {
    @Serial
    private static final long serialVersionUID = 2921565291610925360L;
    private List<BuyerCreateSpuItemReq> spuSkcList;
}
