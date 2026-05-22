package tech.tiangong.sdp.vo.resp;

import lombok.Data;

import java.time.LocalDateTime;

/**
 * SPU字段变更日志VO
 *
 * @author auto-generated
 */
@Data
public class DesignStyleFieldLogVO {

    private Long id;

    private Long designStyleId;

    private String styleCode;

    private Integer versionNum;

    private String fieldName;

    private String fieldLabel;

    private String oldValue;

    private String newValue;

    private Long creatorId;

    private String creatorName;

    private LocalDateTime createTime;
}
