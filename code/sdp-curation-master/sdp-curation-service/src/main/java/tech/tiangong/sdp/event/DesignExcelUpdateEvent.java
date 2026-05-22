package tech.tiangong.sdp.event;

import org.springframework.context.ApplicationEvent;
import tech.tiangong.sdp.vo.dto.DesignExcelDTO;

import java.util.List;

/**
 * 批量导入款式管理(修改)异步处理
 *
 * @author ：liuhongfu@zj.tech
 * @version :1.0
 * @date ：2025/11/5 11:41
 */


/**
 * 设计Excel导入事件
 * @author liuhongfu
 */
public class DesignExcelUpdateEvent extends ApplicationEvent {

    private final List<DesignExcelDTO> importList;

    /**
     * 构造方法
     * @param source 事件源（通常是发布事件的service）
     * @param importList 导入的数据列表
     */
    public DesignExcelUpdateEvent(Object source, List<DesignExcelDTO> importList) {
        super(source);
        this.importList = importList;
    }

    /**
     * 获取导入的数据列表
     */
    public List<DesignExcelDTO> getImportList() {
        return importList;
    }
}
