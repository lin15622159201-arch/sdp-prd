package tech.tiangong.datagroup.cyxf.repository;

import cn.hutool.core.date.DatePattern;
import cn.hutool.core.date.LocalDateTimeUtil;
import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import tech.tiangong.sdp.BasicTest;

import java.util.List;

/**
 * 单元测试
 *
 * @author ：qinwenxuan@zj.tech
 * @version :1.0
 * @date ：2025/11/27 11:39
 */
@Slf4j
public class TemuSkcRepositoryTest extends BasicTest {
    @Autowired
    private TemuSkcRepository temuSkcRepository;

    @Test
    void test() {
        this.print(this.temuSkcRepository.listBySkcCode(List.of("26030093120101","26030092420101","2601005600101")));
    }

    @Test
    void listByEtlTime() {
        final var start = LocalDateTimeUtil.parse("2025-03-11 04:57:59", DatePattern.NORM_DATETIME_FORMATTER);
        final var end = start.minusSeconds(-30 * 60);
        final var total = this.temuSkcRepository.countByEtlTime(start, end);
        log.info("单元测试,total:{}", total);
        final var data = this.temuSkcRepository.listByEtlTime(0, start, end);
        this.print(data);
    }
}
