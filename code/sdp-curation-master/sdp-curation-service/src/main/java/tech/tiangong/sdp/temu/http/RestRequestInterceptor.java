package tech.tiangong.sdp.temu.http;

import cn.hutool.core.exceptions.ExceptionUtil;
import cn.hutool.core.util.StrUtil;
import com.fasterxml.jackson.core.type.TypeReference;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpRequest;
import org.springframework.http.client.ClientHttpRequestExecution;
import org.springframework.http.client.ClientHttpRequestInterceptor;
import org.springframework.http.client.ClientHttpResponse;
import org.springframework.util.StopWatch;
import team.aikero.blade.auth.UserContexts;
import team.aikero.blade.core.enums.Bool;
import team.aikero.blade.util.json.JsonsKt;
import tech.tiangong.sdp.enums.TemuCommonFieldEnum;
import tech.tiangong.sdp.enums.TemuPartnerEnum;
import tech.tiangong.sdp.service.TemuAccessLogService;
import tech.tiangong.sdp.temu.convert.TemuConvert;
import tech.tiangong.sdp.temu.vo.dto.RestLogDTO;
import tech.tiangong.sdp.temu.vo.dto.TemuApiLogDTO;
import tech.tiangong.sdp.util.ExecutorUtils;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;
import java.util.Objects;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.ExecutorService;
import java.util.function.Function;

/**
 * RestRequestInterceptor
 *
 * @author ：qinwenxuan@zj.tech
 * @version :1.0
 * @date ：2025/12/25 15:58
 */
@Slf4j
@RequiredArgsConstructor
public class RestRequestInterceptor implements ClientHttpRequestInterceptor {
    private final TemuAccessLogService temuAccessLogService;
    private final ExecutorService executor = ExecutorUtils.get("temuRestHTTPPool", 2 << 12);
    private static final Map<TemuPartnerEnum, Function<RestLogDTO, TemuApiLogDTO>> LOG_MAP = new HashMap<>(4);

    @Override
    public ClientHttpResponse intercept(HttpRequest request, byte[] body, ClientHttpRequestExecution execution) {
        final var dto = RestRequestContext.get();
        final var apiLog = getLog(dto);
        if (dto.hasParams()) {
            apiLog.setRequestParams(new String(body, StandardCharsets.UTF_8));
        }
        apiLog.setRequestUrl(request.getURI().toString());
        apiLog.setRequestMethod(request.getMethod().name());
        final var stopWatch = new StopWatch();
        stopWatch.start();
        apiLog.setRequestTime(LocalDateTime.now());
        final BufferingClientHttpResponseWrapper wrapper;
        try {
            wrapper = new BufferingClientHttpResponseWrapper(execution.execute(request, body));
            apiLog.setResponseTime(LocalDateTime.now());
            stopWatch.stop();
            apiLog.setExecuteTime(stopWatch.getTotalTimeMillis());
            setResponse(dto, wrapper, apiLog);
        } catch (IOException e) {
            apiLog.setResponseTime(LocalDateTime.now());
            stopWatch.stop();
            apiLog.setExecuteTime(stopWatch.getTotalTimeMillis());
            apiLog.setSuccessful(Bool.NO.getCode());
            apiLog.setStackTrace(ExceptionUtil.stacktraceToOneLineString(e, 2 << 12));
            throw new RuntimeException(e);
        } finally {
            RestRequestContext.clear();
            runAsync(apiLog);
//            saveWithSystemUser(apiLog);
        }
        return wrapper;
    }

    private void setResponse(final RestLogDTO dto, final BufferingClientHttpResponseWrapper wrapper,
                             final TemuApiLogDTO apiLog) throws IOException {
        if (!dto.hasResponse()) {
            return;
        }
        final var data = new String(wrapper.getBody().readAllBytes(), StandardCharsets.UTF_8);
        apiLog.setResponseData(data);
        final var dataMap = JsonsKt.parseJson(data, new TypeReference<Map<String, Object>>() {
        });
        if (Objects.isNull(dataMap)) {
            return;
        }
        apiLog.setRequestId(Objects.toString(dataMap.get(TemuCommonFieldEnum.REQUEST_ID.getCode()), ""));
        apiLog.setResponseCode(Objects.toString(dataMap.get(TemuCommonFieldEnum.ERROR_CODE.getCode()), ""));
        apiLog.setResponseMessage(Objects.toString(dataMap.get(TemuCommonFieldEnum.ERROR_MSG.getCode()), ""));
        if (StrUtil.isBlank(apiLog.getResponseMessage())) {
            apiLog.setResponseMessage(Objects.toString(dataMap.get(TemuCommonFieldEnum.ERROR_MSG_2.getCode()), ""));
        }
        if (StrUtil.isBlank(apiLog.getResponseCode())) {
            apiLog.setResponseCode(Objects.toString(dataMap.get(TemuCommonFieldEnum.ERROR_CODE_2.getCode()), ""));
        }
    }

    private void runAsync(final TemuApiLogDTO apiLog) {
        CompletableFuture.runAsync(() -> saveWithSystemUser(apiLog), executor)
                .exceptionally(e -> {
                    log.error("保存请求日志失败\t{}", e.getMessage(), e);
                    return null;
                });
    }

    private void saveWithSystemUser(final TemuApiLogDTO apiLog) {
        UserContexts.withSystemUser(() -> this.temuAccessLogService.save(apiLog));
    }

    private TemuApiLogDTO getLog(final RestLogDTO dto) {
        return LOG_MAP.get(dto.partner()).apply(dto);
    }

    static {
        LOG_MAP.putIfAbsent(TemuPartnerEnum.CN, it -> {
            final var log = TemuConvert.obtainCNLog();
            log.setRequestType(it.type());
            return log;
        });
        LOG_MAP.putIfAbsent(TemuPartnerEnum.CN_PA, it -> {
            final var log = TemuConvert.obtainPALog();
            log.setRequestType(it.type());
            return log;
        });
        LOG_MAP.putIfAbsent(TemuPartnerEnum.US, it -> {
            final var log = TemuConvert.obtainUSLog();
            log.setRequestType(it.type());
            return log;
        });
        LOG_MAP.putIfAbsent(TemuPartnerEnum.GLOBAL, it -> {
            final var log = TemuConvert.obtainGolLog();
            log.setRequestType(it.type());
            return log;
        });
    }
}
