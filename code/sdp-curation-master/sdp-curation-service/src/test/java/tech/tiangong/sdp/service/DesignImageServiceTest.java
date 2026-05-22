package tech.tiangong.sdp.service;

import cn.hutool.core.collection.CollectionUtil;
import cn.hutool.core.util.StrUtil;
import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import tech.tiangong.sdp.BasicTest;
import tech.tiangong.sdp.vector.repository.DesignImageRepository;

/**
 * 单元测试
 *
 * @author ：qinwenxuan@zj.tech
 * @version :1.0
 * @date ：2026/3/18 18:12
 */
@Slf4j
public class DesignImageServiceTest extends BasicTest {
    private @Autowired DesignImageRepository designImageRepository;

    @Test
    void test() {
        final var id = "7432609807745818702";
        final var resp = this.designImageRepository.listById(id, 10, false);
        if (!resp.isSuccess()) {
            log.error("根据ID搜索向量失败\t{}\t{}\t{}", id, resp.getCode(), resp.getMessage());
            return;
        }
        final var out = resp.getOutput();
        if (CollectionUtil.isEmpty(out)) {
            log.info("根据ID搜索向量为空\t{}", id);
        }
        out.stream().filter(it -> StrUtil.equalsIgnoreCase(id, it.getId()))
                .findFirst()
                .ifPresentOrElse(this::print, () -> log.info("根据ID搜索向量不存在\t{}", id));
        print(resp);
    }

    @Test
    void test1() {
        final var id = "7432609807745818702";
        final var resp = this.designImageRepository.delete(id);
        if (!resp.isSuccess()) {
            log.error("根据ID删除向量失败\t{}\t{}\t{}", id, resp.getCode(), resp.getMessage());
            return;
        }
        log.info("根据ID删除向量成功\t{}\t{}", id,resp.getMessage());
    }
}
