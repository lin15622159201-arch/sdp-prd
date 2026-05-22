package tech.tiangong.sdp.vo.query;

import lombok.Data;
import lombok.EqualsAndHashCode;

import java.util.List;

/**
 * @author liuhongfu
 * @Created by jeromeliu
 * @ClassName PrototypeManageExcelQuery
 * @Description
 * @Date 2025/1/20 15:13
 */
@Data
@EqualsAndHashCode(callSuper = true)
public class PrototypeManageExcelQuery extends PrototypeQuery{

    /**
     * 指定导出skc
     *
     * */
    private List<String> exportDesignCodeList;

}
