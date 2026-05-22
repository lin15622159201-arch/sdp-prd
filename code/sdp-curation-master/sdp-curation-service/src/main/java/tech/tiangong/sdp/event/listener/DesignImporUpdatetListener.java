package tech.tiangong.sdp.event.listener;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.ApplicationListener;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Component;
import org.springframework.util.CollectionUtils;
import team.aikero.blade.util.json.JsonsKt;
import tech.tiangong.sdp.event.DesignExcelUpdateEvent;
import tech.tiangong.sdp.service.PrototypeImportService;
import tech.tiangong.sdp.utils.FileExportUtils;

/**
 * 监听保存设备信息事件
 * @author liuhongfu
 */
@Component
public class DesignImporUpdatetListener implements ApplicationListener<DesignExcelUpdateEvent> {

    private final PrototypeImportService prototypeImportService;
    private static final Logger log = LoggerFactory.getLogger(FileExportUtils.class);

    public DesignImporUpdatetListener(PrototypeImportService prototypeService) {
        this.prototypeImportService = prototypeService;
    }

    @Override
    @Async("designImportHandlerExecutor")
    public void onApplicationEvent(DesignExcelUpdateEvent event) {
        if (CollectionUtils.isEmpty(event.getImportList())) {
            return;
        }
        log.info("Event导入款式管理更新信息数据:\t{}", JsonsKt.toJsonPretty(event.getImportList()));
        prototypeImportService.importDataUpdate(event.getImportList());
    }
}
