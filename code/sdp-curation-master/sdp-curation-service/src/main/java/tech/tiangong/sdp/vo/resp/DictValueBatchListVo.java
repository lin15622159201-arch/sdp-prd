package tech.tiangong.sdp.vo.resp;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.Accessors;
import lombok.experimental.SuperBuilder;

import java.io.Serial;
import java.io.Serializable;
import java.util.List;

/**
 * @author : luminglong
 * @date : 2021-05-24 15:34
 */
@Data
public class DictValueBatchListVo implements Serializable {

    private static final long serialVersionUID = -4558034165366007527L;
    /**
     * 字典编码
     */
    private String dictCode;
   /**
     * 字典名称
     */
    private String dictName;
    /**
     * 字典值列表
     */
    private List<DictValueVo> dictValues;



    /**
     * 字典值属性
     */
    @Data
    @SuperBuilder
    @Accessors(chain = true)
    @NoArgsConstructor
    public static class DictValueVo implements Serializable {
        @Serial
        private static final long serialVersionUID = 6331377633184190996L;

        /**
         * 字典值父编号
         */
        private String valueParentCode;

        /**
         * 字典值编号
         */
        private String valueCode;
        /**
         * 字典值
         */
        private String value;
        /**
         * 来源方 : (open_sender : 公开的来源方)
         */
        private String senderCode;

        /**
         * 是否启用：{0-否 ,1-是},默认1
         */
        private Integer isEnable;

        /**
         * 字典值层级
         */
        private Integer valueLevel;

        /**
         * 排序
         */
        private Integer sort;

    }
}
