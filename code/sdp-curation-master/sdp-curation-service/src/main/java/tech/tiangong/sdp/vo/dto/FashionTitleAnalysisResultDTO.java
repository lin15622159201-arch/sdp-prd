package tech.tiangong.sdp.vo.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

import java.io.Serial;
import java.io.Serializable;

/**
 * FashionTitleAnalysisResultVO
 *
 * @author ：qinwenxuan@zj.tech
 * @version :1.0
 * @date ：2025/12/5 9:56
 */
@Data
public class FashionTitleAnalysisResultDTO implements Serializable {
    @Serial
    private static final long serialVersionUID = 1806858572339757546L;
    private String style;
    private String season;
    private String details;
    @JsonProperty(value = "chinese_title")
    private String chineseTitle;
    @JsonProperty(value = "english_title")
    private String englishTitle;


}
