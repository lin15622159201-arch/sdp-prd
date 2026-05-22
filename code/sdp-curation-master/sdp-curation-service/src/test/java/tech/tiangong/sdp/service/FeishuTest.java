package tech.tiangong.sdp.service;

import com.zjkj.scf.notification.sdk.dto.feishu.req.FeishuContentItemReq;
import com.zjkj.scf.notification.sdk.dto.feishu.req.FeishuGroupRobotMegReq;
import com.zjkj.scf.notification.sdk.dto.feishu.req.FeishuMessageReq;
import org.junit.jupiter.api.Test;
import team.aikero.blade.auth.UserContexts;
import tech.tiangong.sdp.BasicTest;
import tech.tiangong.sdp.external.FeishuApi;

import java.util.ArrayList;

/**
 * 单元测试
 *
 * @author ：qinwenxuan@zj.tech
 * @version :1.0
 * @date ：2026/4/16 10:52
 */
public class FeishuTest extends BasicTest {
    @Test
    void sendGroup () {
        final  var req = new FeishuGroupRobotMegReq () ;
        req.setNoticeType("Y2_SALES_DRIVING_GROUP_NOTICE");
        req.setTitle("动销通知");
        final var items = new ArrayList<FeishuContentItemReq>();
        items.add(FeishuContentItemReq.ofText("组别：一组 @覃文轩"));
        items.add(FeishuContentItemReq.ofNewLine()) ;
        items.add(FeishuContentItemReq.ofText("款号信息：26040267750101"));
        items.add(FeishuContentItemReq.ofNewLine()) ;
        items.add(FeishuContentItemReq.ofText("前置拆版：是"));
        items.add(FeishuContentItemReq.ofNewLine()) ;
        items.add(FeishuContentItemReq.ofText("项目类型：有版有样"));
        items.add(FeishuContentItemReq.ofNewLine()) ;
        items.add(FeishuContentItemReq.ofText("制作方式：实物样"));
        items.add(FeishuContentItemReq.ofNewLine()) ;
        items.add(FeishuContentItemReq.ofText("订单编号：PO-211-12855678177913791"));
        items.add(FeishuContentItemReq.ofNewLine()) ;
        items.add(FeishuContentItemReq.ofText("下单时间：2026-04-14 15:35:42"));
        items.add(FeishuContentItemReq.ofNewLine()) ;
        req.setContents(items);
//        req.setAppType("DEFAULT");
        UserContexts.withSystemUser(() -> FeishuApi.sendGroup(req));
    }
    @Test
    void send () {
        final  var req = new FeishuMessageReq() ;
        req.setTitle("动销通知");
        final var items = new ArrayList<FeishuContentItemReq>();
        items.add(FeishuContentItemReq.ofText("组别：一组钟源茂"));
        items.add(FeishuContentItemReq.ofNewLine()) ;
        items.add(FeishuContentItemReq.ofText("款号信息：26040267750101"));
        items.add(FeishuContentItemReq.ofNewLine()) ;
        items.add(FeishuContentItemReq.ofText("前置拆版：是"));
        items.add(FeishuContentItemReq.ofNewLine()) ;
        items.add(FeishuContentItemReq.ofText("项目类型：有版有样"));
        items.add(FeishuContentItemReq.ofNewLine()) ;
        items.add(FeishuContentItemReq.ofText("制作方式：实物样"));
        items.add(FeishuContentItemReq.ofNewLine()) ;
        items.add(FeishuContentItemReq.ofText("订单编号：PO-211-12855678177913791"));
        items.add(FeishuContentItemReq.ofNewLine()) ;
        items.add(FeishuContentItemReq.ofText("下单时间：2026-04-14 15:35:42"));
        items.add(FeishuContentItemReq.ofNewLine()) ;
        req.setContents(items);
//        req.setMobile("15622159201");
        req.setMobile("13138794688");
//        req.setAppType("DEFAULT");
        req.setAppType("Y2_NOTICE_APP");
        UserContexts.withSystemUser(() -> FeishuApi.send(req));
    }
}
