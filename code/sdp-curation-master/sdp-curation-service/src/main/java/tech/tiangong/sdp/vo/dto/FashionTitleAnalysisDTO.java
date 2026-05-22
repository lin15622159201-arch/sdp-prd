package tech.tiangong.sdp.vo.dto;

import lombok.Data;

import java.io.Serial;
import java.io.Serializable;

/**
 * FashionTitleAnalysis
 *
 * @author ：qinwenxuan@zj.tech
 * @version :1.0
 * @date ：2025/12/5 9:58
 */
@Data
public class FashionTitleAnalysisDTO implements Serializable {
    @Serial
    private static final long serialVersionUID = 939480054923754277L;
    private FashionTitleAnalysisResultDTO result;
    private String status;
}
