package tech.tiangong.sdp.vector.repository;

import cn.hutool.core.util.StrUtil;
import com.aliyun.dashvector.DashVectorClient;
import com.aliyun.dashvector.DashVectorClientConfig;
import com.aliyun.dashvector.DashVectorCollection;
import com.aliyun.dashvector.common.DashVectorException;
import com.aliyun.dashvector.models.requests.CreateCollectionRequest;
import com.aliyun.dashvector.proto.CollectionInfo;
import com.aliyun.dashvector.proto.FieldType;
import com.google.common.base.Stopwatch;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import tech.tiangong.sdp.config.DashVectorProperties;
import tech.tiangong.sdp.enums.DesignVectorEnum;
import tech.tiangong.sdp.service.component.RedissonHelper;

import java.util.Objects;
import java.util.concurrent.TimeUnit;

/**
 * 向量数据库
 *
 * @author ：qinwenxuan@zj.tech
 * @version :1.0
 * @date ：2026/3/3 17:43
 */
@RequiredArgsConstructor
@Slf4j
public class DashVectorRepository implements AutoCloseable, ApplicationRunner {
    private final DashVectorProperties dashVectorProperties;
    private final RedissonHelper redissonHelper;
    private DashVectorClient dashVectorClient;
    private static final String VECTOR_DB_NAME = DesignVectorEnum.DESIGN_VECTOR_NAME.getCode();

    @Override
    public void close() throws Exception {
        if (Objects.isNull(dashVectorClient)) {
            return;
        }
        try {
            dashVectorClient.close();
        } catch (Exception e) {
            log.error("关闭向量数据库连接失败\t{}", e.getLocalizedMessage(), e);
        }
    }

    public void init() {
        if (Objects.nonNull(dashVectorClient)) {
            return;
        }
        initClient();
    }

    @Override
    public void run(ApplicationArguments args) throws Exception {
        if (Objects.isNull(dashVectorClient)) {
            return;
        }
        this.redissonHelper.lock("sdp-curation:design:image:init:vector", 64,
                () -> {
                    this.dashVectorProperties.getTenantIds().forEach(it -> this.initCollection(collectionName(it)));
                    return 0;
                });
    }

    protected DashVectorCollection getCollection(final String name) {
        return this.dashVectorClient.get(name);
    }

    protected String collectionName() {
        if (StrUtil.contains(this.dashVectorProperties.getPrefixName(), "-")) {
            return StrUtil.replace(dashVectorProperties.getPrefixName(), "-", "_") + "_" + VECTOR_DB_NAME;
        }
        return dashVectorProperties.getPrefixName() + "_" + VECTOR_DB_NAME;
    }

    protected String collectionName(final Long tenantId) {
        final var name = collectionName();
        if (Objects.equals(1L, tenantId)) {
            return name;
        }
        return name + "_" + tenantId;
    }

    private void initCollection(final String name) {
        log.info("初始化向量数据库开始");
        final var watch = Stopwatch.createStarted();
        final var collection = this.getCollection(name);
        if (collection.isSuccess()) {
            watch.stop();
            log.info("初始化向量数据库\t{}\t已经存在,\t{}", name, watch.elapsed(TimeUnit.MILLISECONDS));
            return;
        }
        final var request = CreateCollectionRequest.builder()
                .name(name)
                .dimension(1792)
                .metric(CollectionInfo.Metric.cosine)
                .dataType(CollectionInfo.DataType.FLOAT)
                .filedSchema(DesignVectorEnum.IMAGE_ID.getCode(), FieldType.STRING)
                .filedSchema(DesignVectorEnum.SKC_CODE.getCode(), FieldType.STRING)
                .filedSchema(DesignVectorEnum.TYPE.getCode(), FieldType.STRING)
                .filedSchema(DesignVectorEnum.SKC_ID.getCode(), FieldType.STRING)
                .build();
        final var response = this.dashVectorClient.create(request);
        if (response.isSuccess()) {
            watch.stop();
            log.info("初始化向量数据库\t{}\t成功,\t{}", name, watch.elapsed(TimeUnit.MILLISECONDS));
            this.getCollection(name).createPartition(DesignVectorEnum.PARTITION.getCode());
            return;
        }
        watch.stop();
        log.error("初始化向量数据库\t{}\t失败,\t{}\t{}\t{}", name, watch.elapsed(TimeUnit.MILLISECONDS), response.getCode(), response.getMessage());
    }

    private void initClient() {
        try {
            dashVectorClient = new DashVectorClient(
                    DashVectorClientConfig.builder().endpoint(dashVectorProperties.getEndpoint())
                            .apiKey(dashVectorProperties.getApiKey())
                            .timeout(dashVectorProperties.getTimeout())
                            .build());
        } catch (DashVectorException e) {
            log.error("初始化向量数据库连接失败\t{}", e.getLocalizedMessage(), e);
        }
    }

}
