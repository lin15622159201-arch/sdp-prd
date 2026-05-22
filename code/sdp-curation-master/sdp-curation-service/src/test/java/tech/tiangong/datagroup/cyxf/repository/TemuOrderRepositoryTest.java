package tech.tiangong.datagroup.cyxf.repository;

import cn.hutool.core.date.DatePattern;
import cn.hutool.core.date.LocalDateTimeUtil;
import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import tech.tiangong.datagroup.cyxf.entity.TemuOrderSkc;
import tech.tiangong.sdp.BasicTest;

import java.util.Map;
import java.util.function.Function;
import java.util.stream.Collectors;

/**
 * 单元测试
 *
 * @author ：qinwenxuan@zj.tech
 * @version :1.0
 * @date ：2025/11/27 14:21
 */
@Slf4j
public class TemuOrderRepositoryTest extends BasicTest {
    @Autowired
    private TemuOrderRepository temuOrderRepository;

    @Test
    void test() {
        // 2025-09-23 18:26:02
        final var data = this.temuOrderRepository.list();
        this.print(data);
        data.forEach(it -> LocalDateTimeUtil.format(it.getEtlTime(), DatePattern.NORM_DATETIME_FORMATTER));
    }

    @Test
    void listByEtlTime() {
        final var start = LocalDateTimeUtil.parse("2025-09-23 18:26:02", DatePattern.NORM_DATETIME_FORMATTER);
        final var end = start.minusSeconds(-30 * 60);
        final var total = this.temuOrderRepository.countByEtlTime(start, end);
        log.info("单元测试,total:{}", total);
        final var data = this.temuOrderRepository.listByEtlTime(1, start, end);
        this.print(data);
    }

    @Test
    void listEtlTime() {
        final var start = LocalDateTimeUtil.parse("2025-09-23 18:26:02", DatePattern.NORM_DATETIME_FORMATTER);
        final var end = start.minusSeconds(-30 * 60);
        final var total = this.temuOrderRepository.countEtlTime(start, end);
        log.info("单元测试,total:{}", total);
//        final var data = this.temuOrderRepository.listEtlTime(1, start, end);
        final var skcIds = this.temuOrderRepository.listSkcIdEtlTime( start, end);
        skcIds.forEach(it -> this.print(this.temuOrderRepository.listBySkcId(it)));
        final var data = this.temuOrderRepository.listEtlTime( start, end);
//        data.stream().sorted(TemuOrderSkc::getOrderCreatedTime).toList() ;
        Map<String, TemuOrderSkc> latestMap = data.stream()
                .collect(Collectors.toMap(
                        TemuOrderSkc::getSkcId,
                        Function.identity(),
                        (v0, v1) -> {
                            int compared = v0.getOrderCreatedTime()
                                    .compareTo(v1.getOrderCreatedTime());
                            if (compared != 0) {
                                return compared >= 0 ? v0 : v1;
                            }
                            // 如果orderCreatedTime相同，比较etlTime
                            return !v0.getEtlTime().isBefore(v1.getEtlTime())
                                    ? v0 : v1;
                        }
                ));
        this.print(data);
        this.print(latestMap);
    }
}
