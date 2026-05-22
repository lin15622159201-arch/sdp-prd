package tech.tiangong.sdp.vo.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

import java.io.Serial;
import java.io.Serializable;

/**
 * FabricIdentifyDTO
 * {
 * "category": "上装",
 * "面料材质": "聚酯纤维(涤纶）",
 * "透明度": "不透",
 * "面料弹性": "无弹",
 * "织造方式": "梭织",
 * "面料纹理": "光面"
 * }
 *
 * @author ：qinwenxuan@zj.tech
 * @version :1.0
 * @date ：2025/11/21 10:09
 */
@Data
public class FabricIdentifyDTO implements Serializable {
    @Serial
    private static final long serialVersionUID = -7608198355026256399L;
    @JsonProperty(value = "category")
    private String category;
    @JsonProperty(value = "面料弹性")
    private String fabricElasticity;
    @JsonProperty(value = "面料纹理")
    private String fabricTexture;
    @JsonProperty(value = "面料材质")
    private String fabricMaterial;
    @JsonProperty(value = "透明度")
    private String transparency;
    @JsonProperty(value = "织造方式")
    private String weavingMethod;
}
