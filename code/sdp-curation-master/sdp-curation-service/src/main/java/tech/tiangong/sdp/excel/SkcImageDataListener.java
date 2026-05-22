package tech.tiangong.sdp.excel;

import com.alibaba.excel.context.AnalysisContext;
import com.alibaba.excel.event.AnalysisEventListener;
import lombok.Getter;
import lombok.extern.slf4j.Slf4j;
import tech.tiangong.sdp.vo.dto.SkcImageExcelDTO;

import java.util.ArrayList;
import java.util.List;

/**
 * SKC图片导入Listener
 *
 * @author ：qinwenxuan@zj.tech
 * @version :1.0
 * @date ：2025/11/5 11:41
 */
@Getter
@Slf4j
public class SkcImageDataListener extends AnalysisEventListener<SkcImageExcelDTO> {
    private final List<SkcImageExcelDTO> list = new ArrayList<>();

    @Override
    public void invoke(SkcImageExcelDTO data, AnalysisContext context) {
        list.add(data);
    }

    @Override
    public void doAfterAllAnalysed(AnalysisContext context) {
        log.info("数据解析完成");
    }
}
