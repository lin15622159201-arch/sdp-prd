package tech.tiangong.sdp.temu.convert;

import cn.hutool.core.date.LocalDateTimeUtil;
import cn.hutool.extra.spring.SpringUtil;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.experimental.UtilityClass;
import lombok.extern.slf4j.Slf4j;
import team.aikero.blade.core.enums.Bool;
import team.aikero.blade.core.exception.BusinessException;
import team.aikero.blade.util.json.Json;
import team.aikero.blade.util.json.JsonsKt;
import tech.tiangong.sdp.temu.config.TemuPlatformProperties;
import tech.tiangong.sdp.temu.http.TemuShopContext;
import tech.tiangong.sdp.temu.vo.TemuCommonReq;
import tech.tiangong.sdp.temu.vo.dto.TemuApiLogDTO;

import java.time.LocalDateTime;
import java.util.Map;
import java.util.TreeMap;

/**
 * Temu转换工具类
 *
 * @author ：qinwenxuan@zj.tech
 * @version :1.0
 * @date ：2025/12/24 16:14
 */
@UtilityClass
@Slf4j
public class TemuConvert {
    private final TemuPlatformProperties usTemuProperties = SpringUtil.getBean("usTemuProperties", TemuPlatformProperties.class);
    private final TemuPlatformProperties gloTemuProperties = SpringUtil.getBean("gloTemuProperties", TemuPlatformProperties.class);
    private final TemuPlatformProperties cnTemuProperties = SpringUtil.getBean("cnTemuProperties", TemuPlatformProperties.class);
    private final TemuPlatformProperties paTemuProperties = SpringUtil.getBean("paTemuProperties", TemuPlatformProperties.class);
    private final static ObjectMapper MAPPER_INSTANCE = Json.INSTANCE.getInstance().copy();


    public <T extends TemuCommonReq> Map<String, Object> convert(final T src) {
        return new TreeMap<>(JsonsKt.toMap(writeValueAsString(src)));
    }

    public TemuApiLogDTO obtainGolLog() {
        return obtainLog(gloTemuProperties);
    }

    public TemuApiLogDTO obtainCNLog() {
        return obtainLog(cnTemuProperties);
    }

    public TemuApiLogDTO obtainPALog() {
        return obtainLog(paTemuProperties);
    }

    public TemuApiLogDTO obtainUSLog() {
        return obtainLog(usTemuProperties);
    }

    public Long getTimestamp() {
        return LocalDateTimeUtil.toEpochMilli(LocalDateTime.now()) / 1000;
    }

    public String writeValueAsString(final Object value) {
        try {
            return MAPPER_INSTANCE.writeValueAsString(value);
        } catch (JsonProcessingException e) {
            throw new BusinessException(e);
        }
    }

    private TemuApiLogDTO obtainLog(final TemuPlatformProperties properties) {
        final var log = new TemuApiLogDTO();
        final var app = TemuShopContext.get();
        log.setSuccessful(Bool.YES.getCode());
        log.setAppKey(app.getAppKey());
        log.setRequestUrl(properties.getUrl());
        return log;
    }

    static {
        MAPPER_INSTANCE.setSerializationInclusion(JsonInclude.Include.NON_NULL);
    }
}
