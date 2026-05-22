package tech.tiangong.sdp.temu.vo.dto;

import lombok.Data;

import java.util.List;
import java.util.Map;

/**
 * TemuImageUploadOptionDTO
 *
 * @author ：qinwenxuan@zj.tech
 * @version :1.0
 * @date ：2026/1/4 17:06
 */
@Data
public class TemuImageUploadOptionDTO {
    /**
     * 叶子类目ID，按不同类型进行裁剪，当doIntelligenceCrop=true生效
     */
    private Integer cateId ;

    /**
     * 是否AI智能裁剪，true-根据sizeMode返回一组智能裁剪图（1张原图+3张裁剪图）
     */
    private Boolean doIntelligenceCrop;



    /**
     * 是否AI清晰度提升
     */
    private Boolean boost ;

    /**
     * 返回尺寸大小，0-原图大小，1-800*800（1:1），2-1350*1800（3:4）
     */
    private Integer sizeMode ;

}
