package tech.tiangong.sdp.service.impl;

import cn.hutool.core.collection.CollectionUtil;
import cn.hutool.core.util.StrUtil;
import com.aliyun.dashvector.models.Doc;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import team.aikero.blade.core.enums.Bool;
import tech.tiangong.sdp.config.DashVectorProperties;
import tech.tiangong.sdp.convert.DesignImageConvert;
import tech.tiangong.sdp.entity.SkcImageVector;
import tech.tiangong.sdp.repository.SkcImageVectorRepository;
import tech.tiangong.sdp.service.DesignImageService;
import tech.tiangong.sdp.service.component.RedissonHelper;
import tech.tiangong.sdp.vector.VectorContext;
import tech.tiangong.sdp.vector.repository.DesignImageRepository;
import tech.tiangong.sdp.vo.dto.DesignImageAddDTO;
import tech.tiangong.sdp.vo.dto.DesignImageDTO;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

/**
 * 款式图片Service
 *
 * @author ：qinwenxuan@zj.tech
 * @version :1.0
 * @date ：2026/3/4 10:48
 */
@Slf4j
@Service
@AllArgsConstructor
public class DesignImageServiceImpl extends DefaultTaskServiceImpl implements DesignImageService {
    private final DesignImageRepository designImageRepository;
    private final SkcImageVectorRepository skcImageVectorRepository;
    private final DashVectorProperties dashVectorProperties;
    private final RedissonHelper redissonHelper;

    @Override
    public boolean saveVector(List<DesignImageAddDTO> data) {
        if (CollectionUtil.isEmpty(data)) {
            return false;
        }
        final var resp = designImageRepository.insert(data.stream()
                .map(this::mapAdd).toList());
        if (resp.isSuccess()) {
            log.info("款式向量插入成功\t{}", data.size());
            return true;
        }
        log.error("款式向量插入失败\t{}\t{}\t{}", resp.getRequestId(), resp.getCode(), resp.getMessage());
        return false;
    }

    @Transactional(rollbackFor = Exception.class)
    @Override
    public void saveVector(SkcImageVector vector) {
        this.redissonHelper.lock("sdp-curation:design:image:save:vector:" + vector.getImageId(), 64,
                () -> insertVector(vector));

    }


    @Override
    public List<DesignImageDTO> listVector(List<Float> data) {
        if (CollectionUtil.isEmpty(data)) {
            return List.of();
        }
        final var resp = this.designImageRepository.listByVector(data, dashVectorProperties.getTop(), false);
        if (!resp.isSuccess()) {
            log.error("款式向量查询失败\t{}\t{}\t{}", resp.getRequestId(), resp.getCode(), resp.getMessage());
            return List.of();
        }
        return resp.getOutput().stream().map(this::mapGet).toList();
    }


    private Doc mapAdd(final DesignImageAddDTO dto) {
        return DesignImageConvert.convert(dto);
    }

    private DesignImageDTO mapGet(final Doc doc) {
        return DesignImageConvert.convert(doc);
    }

    private int insertVector(final SkcImageVector vector) {
        if (Objects.equals(Bool.YES.getCode(), vector.getSyncStatus())) {
            return -1;
        }
        final var data = DesignImageConvert.convert(vector);
        if (CollectionUtil.isEmpty(data)) {
            return 0;
        }
        VectorContext.set(vector.getTenantId());
        try {
            final var bool = this.saveVector(data);
            if (bool) {
                vector.setSyncStatus(Bool.YES.getCode());
                vector.setSyncTime(LocalDateTime.now());
                vector.setVectorId(data.stream().map(DesignImageAddDTO::getId).collect(Collectors.joining(StrUtil.COMMA)));
                this.skcImageVectorRepository.updateById(vector);
                // 删除历史向量
                final var vectors = this.skcImageVectorRepository.listBySkcCode(vector.getSkcCode());
                if (CollectionUtil.isEmpty(vectors)) {
                    return 0;
                }
                vectors.stream()
                        .filter(it -> !Objects.equals(it.getImageId(), vector.getImageId()))
                        .forEach(this::deleteVector);
            }
        } catch (Exception e) {
            log.error("插入向量失败\t{}", e.getLocalizedMessage(), e);
        } finally {
            VectorContext.clear();
        }
        return 1;
    }

    private void deleteVector(final SkcImageVector vector) {
        skcImageVectorRepository.logicDelete(vector.getImageId());
        final var vectorId = vector.getVectorId();
        log.info("根据ID删除向量\t{}", vectorId);
        // 删除向量库
        if (StrUtil.isBlank(vectorId)) {
            return;
        }
        StrUtil.split(vectorId, StrUtil.COMMA)
                .stream().filter(StrUtil::isNotBlank)
                .forEach(this::delete);
    }

    private void delete(final String id) {
        log.info("根据ID删除向量\t{}", id);
        final var resp = this.designImageRepository.delete(id);
        if (!resp.isSuccess()) {
            log.error("根据ID删除向量失败\t{}\t{}\t{}", id, resp.getCode(), resp.getMessage());
            return;
        }
        log.info("根据ID删除向量成功\t{}\t{}", id, resp.getMessage());
    }
}
