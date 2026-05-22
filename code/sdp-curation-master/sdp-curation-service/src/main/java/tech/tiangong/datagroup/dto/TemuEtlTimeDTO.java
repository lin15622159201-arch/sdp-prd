package tech.tiangong.datagroup.dto;

import com.baomidou.mybatisplus.annotation.TableField;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serial;
import java.io.Serializable;
import java.time.LocalDateTime;

/**
 * Temu数据etl时间
 *
 * @author ：qinwenxuan@zj.tech
 * @version :1.0
 * @date ：2025/11/27 15:24
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class TemuEtlTimeDTO implements Serializable {
    @Serial
    private static final long serialVersionUID = 4244160093455660749L;
    /**
     * skc表etl_time
     */
    private LocalDateTime skcEtlTime;
    /**
     * order表etl_time
     */
    private LocalDateTime orderEtlTime;

}
