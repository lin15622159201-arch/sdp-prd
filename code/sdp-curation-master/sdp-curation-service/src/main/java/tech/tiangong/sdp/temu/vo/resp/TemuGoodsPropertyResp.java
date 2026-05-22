package tech.tiangong.sdp.temu.vo.resp;

import lombok.Data;
import tech.tiangong.sdp.temu.vo.TemuResp;

import java.io.Serial;
import java.util.List;

/**
 * 用户输入父级规格实体类
 *
 * @author ：qinwenxuan@zj.tech
 * @version :1.0
 * @date ：2025/12/29 9:57
 */
@Data
public class TemuGoodsPropertyResp implements TemuResp {
    @Serial
    private static final long serialVersionUID = 6838389004362287085L;
    /**
     * Basic attribute ID
     */
    private Long pid;
    /**
     * Numeric input title
     */
    private String numberInputTitle;
    /**
     * Attribute value reference type: 0-normal, 1-external brand library
     */
    private Integer referenceType;
    /**
     * Template attribute ID
     */
    private Long templatePid;
    /**
     * When the costTemplateId is passed in, it will return whether additional product attributes need to be filled in, which are used when shipping from non-domestic warehouses.
     */
    private Boolean transnationalAttribute;
    /**
     * If required=True, attribute must be defined.
     */
    private Boolean required;
    /**
     * Template attribute value type, 0-text, 1-numeric
     */
    private Integer propertyValueType;

    /**
     * Attribute characteristic. Currently determines whether to group, 0-general, 1-color, 2-size, 3-phone model
     */
    private Integer feature;
    /**
     * Numeric rule. Only used for common attributes, front-end validation when inputting 1-sum of values equals 100, 2-only allow input of letters/numbers/special characters
     */
    private Integer valueRule;
    /**
     * Attribute selection title
     */
    private String propertyChooseTitle;
    /**
     * Attribute display type, 0-normal display, 1-display when selecting a specified parent attribute value
     */
    private Integer showType;
    /**
     * Template parent attribute ID
     */
    private Long parentTemplatePid;
    /**
     * Whether it is the main sale attribute (i.e. attribute: color)
     */
    private Boolean mainSale;
    /**
     * Template module ID
     */
    private Long templateModuleId;
    /**
     * Parent Specification ID
     */
    private Long parentSpecId;
    /**
     * Minimum input value
     */
    private String minValue;
    /**
     * Maximum input value: text type represents the maximum length of text; numeric type represents the maximum numeric value; and time type represents the maximum time value
     */
    private String maxValue;
    /**
     * Maximum number of selectable items when selectable. Applicable to common attributes & specifications
     */
    private Integer chooseMaxNum;
    /**
     * Maximum decimal precision allowed. 0 indicates that no decimals are allowed
     */
    private Integer valuePrecision;
    /**
     * Control type, only 0-input, 1-selectable, 3-both input and selectable, 16-attribute selection and numeric input
     */
    private Integer controlType;
    /**
     * Attribute name
     */
    private String name;

    /**
     * Whether it is a sale attribute (as a basic part Variances)
     */
    private Boolean isSale;
    /**
     * Referenced attribute ID
     */
    private Long refPid;
    /**
     * Attribute value unit. Only the composition attribute has [%]. Others will not be returned
     */
    private List<TemuGoodsValueUnitResp> valueUnitList;
    /**
     * 单位
     */
    private List<String> valueUnit;
    /**
     * Attribute display conditions or relationships
     */
    private List<TemuGoodsShowConditionResp> showCondition;
    /**
     * Attribute value relationship
     */
    private List<TemuGoodsTemplatePropertyValueParentResp> templatePropertyValueParentList;
    /**
     * Template attribute values
     */
    private List<TemuGoodsPropertyValueResp> values;
}
