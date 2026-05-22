package tech.tiangong.sdp.service;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import team.aikero.blade.util.json.JsonsKt;
import tech.tiangong.sdp.BasicTest;
import tech.tiangong.sdp.vo.req.SizeTemplateAddReq;
import tech.tiangong.sdp.vo.req.SizeTemplatePageReq;

/**
 * 单元测试
 *
 * @author ：qinwenxuan@zj.tech
 * @version :1.0
 * @date ：2026/1/19 14:46
 */
public class SizeTemplateServiceTest extends BasicTest {
    @Autowired
    private SizeTemplateService service;

    @Test
    void batchCreate() {
        final var json = """
                [
                    {
                        "templateName": "测试模板1",
                        "catId": "28949",
                        "parts": [
                            "10002",
                            "10003",
                            "10001"
                        ],
                        "sizes": [
                            "2XS",
                            "XS"
                        ],
                        "groupCode": "tiangong_code_standard",
                        "groupName": "字母码",
                        "sizeReqs": [
                            {
                                "size": "2XS",
                                "values": [
                                    {
                                        "part": "10001",
                                        "partName": "肩宽",
                                        "value": "123",
                                        "diff": "1"
                                    },
                                    {
                                        "part": "10002",
                                        "partName": "胸围全围",
                                        "value": "123",
                                        "diff": "1"
                                    },
                                    {
                                        "part": "10003",
                                        "partName": "衣长",
                                        "value": "123",
                                        "diff": "1"
                                    }
                                ]
                            },
                            {
                                "size": "XS",
                                "values": [
                                    {
                                        "part": "10001",
                                        "partName": "肩宽",
                                        "value": "124",
                                        "diff": 0
                                    },
                                    {
                                        "part": "10002",
                                        "partName": "胸围全围",
                                        "value": "124",
                                        "diff": 0
                                    },
                                    {
                                        "part": "10003",
                                        "partName": "衣长",
                                        "value": "124",
                                        "diff": 0
                                    }
                                ]
                            }
                        ],
                        "catName": "女装针织背心"
                    }
                ]
                """;
        this.service.batchCreate(JsonsKt.parseJsonList(json, SizeTemplateAddReq.class));
    }

    @Test
    void page() {
        final var req = new SizeTemplatePageReq();
        req.setTemplateName("测1113333556");
        this.print(service.page(req));
    }
}
