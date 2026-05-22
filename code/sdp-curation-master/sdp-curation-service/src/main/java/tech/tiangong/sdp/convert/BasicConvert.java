package tech.tiangong.sdp.convert;

import cn.hutool.core.bean.BeanUtil;
import cn.hutool.core.collection.CollectionUtil;
import cn.hutool.core.date.DatePattern;
import cn.hutool.core.date.LocalDateTimeUtil;
import cn.hutool.core.util.StrUtil;
import cn.hutool.extra.spring.SpringUtil;
import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.zjkj.aigc.common.exception.BaseBizException;
import lombok.experimental.UtilityClass;
import lombok.extern.slf4j.Slf4j;
import org.springframework.amqp.core.Message;
import team.aikero.admin.common.vo.DictVo;
import team.aikero.blade.core.enums.Bool;
import team.aikero.blade.core.protocol.DataResponse;
import team.aikero.blade.core.protocol.PageVo;
import team.aikero.blade.sequence.code.entity.SimpleCodeRule;
import team.aikero.blade.sequence.code.generate.BusinessCodeGenerator;
import team.aikero.blade.sequence.id.IdHelper;
import team.aikero.blade.util.json.JsonsKt;
import tech.tiangong.butted.common.enums.TaskStatusEnum;
import tech.tiangong.butted.common.req.base.CompanyUserBatchReq;
import tech.tiangong.sdp.amqp.EventMessage;
import tech.tiangong.sdp.amqp.TaskMessageDTO;
import tech.tiangong.sdp.entity.BaseTenantUserEntity;
import tech.tiangong.sdp.entity.BasicAITask;
import tech.tiangong.sdp.entity.BasicTask;
import tech.tiangong.sdp.enums.RabbitConfigEnum;
import tech.tiangong.sdp.utils.SsoContext;
import tech.tiangong.sdp.vo.dto.DictDTO;
import tech.tiangong.sdp.vo.query.BasePageQuery;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.function.BinaryOperator;
import java.util.function.Consumer;
import java.util.function.Function;
import java.util.function.Supplier;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

/**
 * 基础转换工具类
 *
 * @author : qinwenxuan@zj.tech
 * @version : 1.0
 * @date : 2025/8/19 16:51
 */
@UtilityClass
@Slf4j
public class BasicConvert {
    private final BusinessCodeGenerator businessCodeGenerator = SpringUtil.getBean(BusinessCodeGenerator.class);

    public String code(final SimpleCodeRule rule) {
        return businessCodeGenerator.generate(rule);
    }

    public Long id() {
        return IdHelper.getId();
    }
    public String idStr() {
        return Objects.toString(id());
    }

    public <T extends BasicTask> void taskInit(final T task, final SimpleCodeRule rule) {
        task.setTaskId(id());
        if (Objects.nonNull(rule)) {
            task.setTaskCode(code(rule));
        }
        task.setDeleted(Bool.NO.getCode());
        task.setTaskStatus(TaskStatusEnum.QUEUEING.getCode());
        task.setTenantId(SsoContext.tenantId());
    }

    public <T extends BaseTenantUserEntity> void entityInit(final T task, final Consumer<Long> fn) {
        fn.accept(id());
        task.setDeleted(Bool.NO.getCode());
        task.setTenantId(SsoContext.tenantId());
    }

    public <T extends BaseTenantUserEntity> void entityInit(final T task) {
        task.setDeleted(Bool.NO.getCode());
        task.setTenantId(SsoContext.tenantId());
    }

    public <T extends BasicAITask> void entityInit(final T task) {
        task.setTaskId(id());
        task.setDeleted(Bool.NO.getCode());
        task.setTaskStatus(TaskStatusEnum.QUEUEING.getCode());
        task.setTenantId(SsoContext.tenantId());
        task.setPushStatus(Bool.NO.getCode());
        task.setPushTimes(0);
    }

    public <T extends BaseTenantUserEntity> EventMessage eventMessage(final T task, final RabbitConfigEnum config) {
        final var e = new EventMessage();
        e.setDateTime(LocalDateTime.now());
        e.setCreatorId(task.getCreatorId());
        e.setCreatorName(task.getCreatorName());
        e.setTenantId(task.getTenantId());
        e.setExchange(config.getExchange());
        e.setRoutingKey(config.getRoutingKey());
        return e;
    }

    public <T> EventMessage eventMessage2(final RabbitConfigEnum config) {
        final var e = new EventMessage();
        e.setExchange(config.getExchange());
        e.setRoutingKey(config.getRoutingKey());
        return e;
    }

    public TaskMessageDTO message2DTO(final Message message) {
        final var body = new String(message.getBody());
        return JsonsKt.parseJson(body, TaskMessageDTO.class);
    }

    public <T extends Serializable, R extends BaseTenantUserEntity> PageVo<T> page(final IPage<R> page, final Function<R, T> fn) {
        if (page.getSize() == 0L) {
            return new PageVo<>();
        }
        final var records = page.getRecords();
        return new PageVo<>((int) page.getCurrent(), (int) page.getTotal(), records.stream()
                .map(fn).toList());
    }


    public static <R, T> PageVo<T> pageVo(IPage<R> page, Function<R, T> converter) {
        if (page.getSize() == 0L) return new PageVo<>();
        return new PageVo<>(
                (int) page.getCurrent(),
                (int) page.getTotal(),
                page.getRecords().stream().map(converter).toList()
        );
    }

    public <T, R> T copy(final R source, final Class<T> klass, final String... ignoreProperties) {
        return BeanUtil.copyProperties(source, klass, ignoreProperties);
    }

    public <T, R> void copy(final R source, final T target, final String... ignoreProperties) {
        BeanUtil.copyProperties(source, target, ignoreProperties);
    }

    public <T extends BaseTenantUserEntity> void setRevised(final T task) {
        task.setReviserId(SsoContext.userId());
        task.setReviserName(SsoContext.username());
        task.setRevisedTime(LocalDateTime.now());
    }

    /**
     * 十进制转8位数的二进制
     * <pre>
     *     不处理负数
     * </pre>
     *
     * @param decimal 十进制
     * @return 二进制
     */
    public String bin8(final Integer decimal) {
        return String.format("%8s", Integer.toBinaryString(decimal)).replace(' ', '0');
    }

    public boolean combination(final int a, final int b, final int c) {
        return (a | b) == c;
    }

    public boolean contains(final int a, final int b) {
        return (a & b) == b;
    }

    public boolean notContains(final int a, final int b) {
        return !contains(a, b);
    }


    public <T> T invoke(final String error, final Supplier<DataResponse<T>> fn) {
        final var resp = fn.get();
        if (!resp.getSuccessful()) {
            log.error("{}\t{}", error, resp.getMessage());
            throw new BaseBizException(error + resp.getMessage());
        }
        return resp.getData();
    }

    public <T extends Serializable> T invokeOrNull(final Supplier<T> fn) {
        try {
            return fn.get();
        } catch (Exception e) {
            return null;
        }
    }

    public <T, R extends BaseTenantUserEntity> CompanyUserBatchReq<T> companyUserBatch(final R task, final List<T> data) {
        final var req = new CompanyUserBatchReq<>(task.getCreatorId(), task.getCreatorName(), task.getTenantId(),
                data);
//        req.setCallback(DomainProperties.defaultAiCallbackPath());
        return req;
    }

    public <T, K, U> Map<K, U> toMap(final List<T> list,
                                     Function<? super T, ? extends K> keyMapper,
                                     Function<? super T, ? extends U> valueMapper,
                                     BinaryOperator<U> mergeFunction) {
        if (CollectionUtil.isEmpty(list)) {
            return Collections.emptyMap();
        }
        return list.stream().collect(Collectors.toMap(keyMapper, valueMapper, mergeFunction));
    }

    public <T, K, U> Map<K, U> toMap(final List<T> list,
                                     Function<? super T, ? extends K> keyMapper,
                                     Function<? super T, ? extends U> valueMapper) {
        if (CollectionUtil.isEmpty(list)) {
            return Collections.emptyMap();
        }
        return toMap(list, keyMapper, valueMapper, (v0, v1) -> v1);
    }

    public <T, K> Map<K, T> toMap(final List<T> list,
                                  Function<? super T, ? extends K> keyMapper) {
        if (CollectionUtil.isEmpty(list)) {
            return Collections.emptyMap();
        }
        return toMap(list, keyMapper, Function.identity());
    }

    public <T, K> Map<K, List<T>>
    groupingBy(final List<T> list, final Function<? super T, ? extends K> classifier) {
        if (CollectionUtil.isEmpty(list)) {
            return Collections.emptyMap();
        }
        return list.stream().collect(Collectors.groupingBy(classifier));
    }

    public <T extends BasicTask, R extends BasePageQuery> LambdaQueryWrapper<T> pageWrapper(final R req, final T t) {
        final var w = new LambdaQueryWrapper<T>(t)
                .eq(T::getDeleted, Bool.NO.getCode());
        if (Objects.nonNull(req.getTenantId())) {
            w.eq(T::getTenantId, req.getTenantId());
        }
        if (Objects.nonNull(req.getCreatorId())) {
            w.eq(T::getCreatorId, req.getCreatorId());
        }
        if (Objects.nonNull(req.getCreatedStartTime())) {
            w.ge(T::getCreatedTime, req.getCreatedStartTime());
        }
        if (Objects.nonNull(req.getCreatedEndTime())) {
            w.le(T::getCreatedTime, req.getCreatedEndTime());
        }
        if (StrUtil.isNotBlank(req.getCreatorName())) {
            w.like(T::getCreatorName, req.getCreatorName());
        }
        if (StrUtil.isNotBlank(req.getTaskCode())) {
            w.in(T::getTaskCode, StrUtil.split(req.getTaskCode(), StrUtil.COMMA));
        }
        w.orderByDesc(T::getCreatedTime);
        return w;
    }

    public String format(final LocalDateTime time, final String format) {
        return LocalDateTimeUtil.format(time, format);
    }

    public String format(final LocalDateTime time) {
        return format(time, DatePattern.NORM_DATETIME_PATTERN);
    }

    public void reverseDict(final List<DictDTO> list, final DictVo dict, final DictVo parent) {
        if (Objects.isNull(dict)) {
            return;
        }
        final DictDTO node = copy(dict, DictDTO.class);
        node.setParentId(Objects.isNull(parent) ? 0L : parent.getId());
        list.add(node);
        final List<DictVo> children = dict.getChildren();
        if (CollectionUtil.isEmpty(children)) {
            return;
        }
        // 递归处理子节点
        for (DictVo child : children) {
            reverseDict(list, child, dict);
        }
    }

    public <T> List<T> reverseList(final List<T> list) {
        return IntStream.range(0, list.size())
                .mapToObj(i -> list.get(list.size() - 1 - i)).toList();
    }
}
