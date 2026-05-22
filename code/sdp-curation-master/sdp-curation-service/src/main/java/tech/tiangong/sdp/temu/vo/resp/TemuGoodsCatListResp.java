package tech.tiangong.sdp.temu.vo.resp;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;
import tech.tiangong.sdp.temu.vo.TemuResp;

import java.io.Serial;
import java.util.List;

/**
 * Temu商品品类
 *
 * @author ：qinwenxuan@zj.tech
 * @version :1.0
 * @date ：2025/12/26 10:17
 */
@Data
public class TemuGoodsCatListResp implements TemuResp {
    @Serial
    private static final long serialVersionUID = -4487081740540786770L;
    @JsonProperty(value = "categoryDTOList")
    private List<TemuGoodsCatResp> goodsCatsList;
}
