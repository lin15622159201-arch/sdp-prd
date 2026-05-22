package tech.tiangong.sdp.constant;

import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;

/**
 * <p>
 * excel 导出模板
 * </p>
 *
 * @author : TG
 * @date : 2022/8/11
 **/
public interface ExcelTemplateConstant {

    /**
     * 款式信息导出模版
     * */
    Resource PROTOTYPE_TEMPLATE_RESOURCE = new ClassPathResource("template/prototype-template.xlsx");

}
