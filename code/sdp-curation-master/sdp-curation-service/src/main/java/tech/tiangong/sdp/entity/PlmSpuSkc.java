package tech.tiangong.sdp.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;
import lombok.EqualsAndHashCode;

/**
 * PLM生成的SPU-SKC信息表实体类
 *
 * @author liuhongfu
 * @since 2025-11-03 14:39:38
 */
@EqualsAndHashCode(callSuper = true)
@Data
@TableName(value = "plm_spu_skc")
public class PlmSpuSkc extends BasicMessageTask {

    /**
     * 主键ID
     */
    @TableId(value = "plm_spu_skc_id", type = IdType.INPUT)
    private Long plmSpuSkcId;

    /**
     * SPU编码
     */
    @TableField(value = "style_code")
    private String styleCode;

    /**
     * SKC编码
     */
    @TableField(value = "design_code")
    private String designCode;


}


