package tech.tiangong.sdp.service;

import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import team.aikero.blade.auth.UserContexts;
import team.aikero.blade.util.json.JsonsKt;
import tech.tiangong.sdp.BasicTest;
import tech.tiangong.sdp.common.req.PrototypeBatchCancelReq;
import tech.tiangong.sdp.entity.Prototype;

import java.nio.file.Files;
import java.nio.file.Path;
import java.util.ArrayList;
import java.util.List;

/**
 * 单元测试
 *
 * @author ：qinwenxuan@zj.tech
 * @version :1.0
 * @date ：2025/12/15 10:06
 */
@Slf4j
public class PrototypeServiceTest extends BasicTest {
    private @Autowired PrototypeService service;

    @Test
    void plmBatchCancel() {
        final var
                json = """
                {
                  "cancelItems": [
                    {
                      "designCode": "525120001050102",
                      "cancelReason": "我是收费取消原因",
                      "cancelRemark": ""
                    }
                  ]
                }
                """;
        this.service.plmBatchCancel(JsonsKt.parseJson(json, PrototypeBatchCancelReq.class));
    }

    @Test
    void test() {
        UserContexts.withSystemUser(() -> this.service.test(List.of(7398896680197910546L)));
    }

    @Test
    void salesDriving() {
        UserContexts.withSystemUser(() -> this.service.salesDriving());
    }


    @Test
    void test2() {
        final var update = new ArrayList<String>();
        final var list = new ArrayList<Prototype>();
        try (var reader = Files.newBufferedReader(Path.of("C:\\repos\\xiniu\\sdp-curation\\sdp-curation-service\\src\\test\\kotlin\\xxx"))) {
            reader.lines().forEach(it ->
                    list.addAll(JsonsKt.parseJsonList(it, Prototype.class))
            );
        } catch (Exception e) {
            log.error(e.getMessage(), e);
        }
        list.forEach(it -> {
            update.add("UPDATE picking_ai_design t SET t.skc_id = " + it.getPrototypeId() + ",t.skc_code = '"+ it.getDesignCode() +"' WHERE t.design_task_id =" + it.getDesignStyleId() + " AND deleted = 0 AND skc_id IS NULL;");
        });
        System.out.println("-- -----------DML-----------------");
        update.forEach(System.out::println);
        System.out.println("-- -----------DML-----------------");
    }
}
