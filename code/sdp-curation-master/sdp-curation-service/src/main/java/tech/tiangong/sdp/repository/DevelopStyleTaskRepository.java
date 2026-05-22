package tech.tiangong.sdp.repository;

import cn.hutool.core.collection.CollectionUtil;
import cn.hutool.core.util.StrUtil;
import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import org.springframework.stereotype.Repository;
import team.aikero.blade.core.enums.Bool;
import tech.tiangong.butted.common.enums.TaskStatusEnum;
import tech.tiangong.sdp.convert.BasicConvert;
import tech.tiangong.sdp.entity.DevelopStyleTask;
import tech.tiangong.sdp.enums.DevelopStyleTaskStatusEnum;
import tech.tiangong.sdp.mapper.DevelopStyleTaskMapper;
import tech.tiangong.sdp.vo.dto.DevelopStyleStateGroupDTO;
import tech.tiangong.sdp.vo.query.DevelopStyleTaskQuery;
import tech.tiangong.sdp.vo.req.DevelopStyleTaskOpenQueryReq;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Objects;

/**
 * 开款任务Repository
 *
 * @author ：qinwenxuan@zj.tech
 * @version :1.0
 * @date ：2025/11/3 15:15
 */
@Repository
public class DevelopStyleTaskRepository extends ManualBaseRepository<DevelopStyleTaskMapper, DevelopStyleTask> {
    public IPage<DevelopStyleTask> webPage(final DevelopStyleTaskQuery req) {
        return this.page(new Page<>(req.getPageNum(), req.getPageSize()), getWrapper(req));
    }

    public List<DevelopStyleStateGroupDTO> groupTotal(final DevelopStyleTaskQuery req) {
        return baseMapper.selectGroupByTaskStatus(req);
    }

    public void updateIdentify(final DevelopStyleTask task) {
        this.lambdaUpdate()
                .eq(DevelopStyleTask::getTaskId, task.getTaskId())
                .set(DevelopStyleTask::getAiTaskStatus, task.getAiTaskStatus())
                .set(DevelopStyleTask::getPushStatus, task.getPushStatus())
                .set(DevelopStyleTask::getTaskState, task.getTaskState())
                .set(DevelopStyleTask::getFailModel, task.getFailModel())
                .set(DevelopStyleTask::getFailMessage, task.getFailMessage())
                .set(DevelopStyleTask::getReviserId, task.getReviserId())
                .set(DevelopStyleTask::getReviserName, task.getReviserName())
                .set(DevelopStyleTask::getRevisedTime, task.getRevisedTime())
                .update();
    }

    public void updateCategoryRec(final DevelopStyleTask task) {
        this.lambdaUpdate()
                .eq(DevelopStyleTask::getTaskId, task.getTaskId())
                .set(DevelopStyleTask::getAiTaskStatus, task.getAiTaskStatus())
                .set(DevelopStyleTask::getPushStatus, task.getPushStatus())
                .set(DevelopStyleTask::getTaskState, task.getTaskState())
                .set(DevelopStyleTask::getFailModel, task.getFailModel())
                .set(DevelopStyleTask::getFailMessage, task.getFailMessage())
                .set(DevelopStyleTask::getCategoryRec, task.getCategoryRec())
                .set(DevelopStyleTask::getCategorySize, task.getCategorySize())
                .set(DevelopStyleTask::getCategoryCode, task.getCategoryCode())
                .set(DevelopStyleTask::getCategoryName, task.getCategoryName())
                .set(DevelopStyleTask::getReviserId, task.getReviserId())
                .set(DevelopStyleTask::getReviserName, task.getReviserName())
                .set(DevelopStyleTask::getRevisedTime, task.getRevisedTime())
                .update();
    }

    public void updateVector(final DevelopStyleTask task) {
        this.lambdaUpdate()
                .eq(DevelopStyleTask::getTaskId, task.getTaskId())
                .set(DevelopStyleTask::getAiTaskStatus, task.getAiTaskStatus())
                .set(DevelopStyleTask::getPushStatus, task.getPushStatus())
                .set(DevelopStyleTask::getTaskState, task.getTaskState())
                .set(DevelopStyleTask::getFailModel, task.getFailModel())
                .set(DevelopStyleTask::getFailMessage, task.getFailMessage())
                .set(DevelopStyleTask::getImageVectorId, task.getImageVectorId())
                .set(DevelopStyleTask::getReviserId, task.getReviserId())
                .set(DevelopStyleTask::getReviserName, task.getReviserName())
                .set(DevelopStyleTask::getRevisedTime, task.getRevisedTime())
                .update();
    }

    public void updateClip(final DevelopStyleTask task) {
        this.lambdaUpdate()
                .eq(DevelopStyleTask::getTaskId, task.getTaskId())
                .set(DevelopStyleTask::getAiTaskStatus, task.getAiTaskStatus())
                .set(DevelopStyleTask::getPushStatus, task.getPushStatus())
                .set(DevelopStyleTask::getTaskState, task.getTaskState())
                .set(DevelopStyleTask::getFailModel, task.getFailModel())
                .set(DevelopStyleTask::getFailMessage, task.getFailMessage())
                .set(DevelopStyleTask::getUsableLabels, task.getUsableLabels())
                .set(DevelopStyleTask::getPredLabels, task.getPredLabels())
                .set(DevelopStyleTask::getPatternCode, task.getPatternCode())
                .set(DevelopStyleTask::getPatternName, task.getPatternName())
                .set(DevelopStyleTask::getReviserId, task.getReviserId())
                .set(DevelopStyleTask::getReviserName, task.getReviserName())
                .set(DevelopStyleTask::getRevisedTime, task.getRevisedTime())
                .update();
    }

    public void updatePatternCheck(final DevelopStyleTask task) {
        this.lambdaUpdate()
                .eq(DevelopStyleTask::getTaskId, task.getTaskId())
                .set(DevelopStyleTask::getAiTaskStatus, task.getAiTaskStatus())
                .set(DevelopStyleTask::getPushStatus, task.getPushStatus())
                .set(DevelopStyleTask::getTaskState, task.getTaskState())
                .set(DevelopStyleTask::getFailModel, task.getFailModel())
                .set(DevelopStyleTask::getFailMessage, task.getFailMessage())
                .set(DevelopStyleTask::getPatternLabel, task.getPatternLabel())
                .set(DevelopStyleTask::getPrintingCode, task.getPrintingCode())
                .set(DevelopStyleTask::getPrintingName, task.getPrintingName())
                .set(DevelopStyleTask::getReviserId, task.getReviserId())
                .set(DevelopStyleTask::getReviserName, task.getReviserName())
                .set(DevelopStyleTask::getRevisedTime, task.getRevisedTime())
                .update();
    }

    public void updateFabricIdentify(final DevelopStyleTask task) {
        this.lambdaUpdate()
                .eq(DevelopStyleTask::getTaskId, task.getTaskId())
                .set(DevelopStyleTask::getAiTaskStatus, task.getAiTaskStatus())
                .set(DevelopStyleTask::getPushStatus, task.getPushStatus())
                .set(DevelopStyleTask::getTaskState, task.getTaskState())
                .set(DevelopStyleTask::getFailModel, task.getFailModel())
                .set(DevelopStyleTask::getFailMessage, task.getFailMessage())
                .set(DevelopStyleTask::getFabricIdentify, task.getFabricIdentify())
                .set(DevelopStyleTask::getWeaveModeCode, task.getWeaveModeCode())
                .set(DevelopStyleTask::getWeaveModeName, task.getWeaveModeName())
                .set(DevelopStyleTask::getElasticCode, task.getElasticCode())
                .set(DevelopStyleTask::getElasticName, task.getElasticName())
                .set(DevelopStyleTask::getReviserId, task.getReviserId())
                .set(DevelopStyleTask::getReviserName, task.getReviserName())
                .set(DevelopStyleTask::getRevisedTime, task.getRevisedTime())
                .update();
    }

    public void updateAnalysis(final DevelopStyleTask task) {
        this.lambdaUpdate()
                .eq(DevelopStyleTask::getTaskId, task.getTaskId())
                .set(DevelopStyleTask::getAiTaskStatus, task.getAiTaskStatus())
                .set(DevelopStyleTask::getPushStatus, task.getPushStatus())
                .set(DevelopStyleTask::getTaskState, task.getTaskState())
                .set(DevelopStyleTask::getFailModel, task.getFailModel())
                .set(DevelopStyleTask::getFailMessage, task.getFailMessage())
                .set(DevelopStyleTask::getTitleData, task.getTitleData())
                .set(DevelopStyleTask::getColorData, task.getColorData())
                .set(DevelopStyleTask::getPatternData, task.getPatternData())
                .set(DevelopStyleTask::getSeasonCode, task.getSeasonCode())
                .set(DevelopStyleTask::getSeasonName, task.getSeasonName())
                .set(DevelopStyleTask::getColorCode, task.getColorCode())
                .set(DevelopStyleTask::getColor, task.getColor())
                .set(DevelopStyleTask::getReviserId, task.getReviserId())
                .set(DevelopStyleTask::getReviserName, task.getReviserName())
                .set(DevelopStyleTask::getRevisedTime, task.getRevisedTime())
                .update();
    }

    public void updateFail(final DevelopStyleTask task) {
        this.lambdaUpdate()
                .eq(DevelopStyleTask::getTaskId, task.getTaskId())
                .set(DevelopStyleTask::getPushStatus, task.getPushStatus())
                .set(DevelopStyleTask::getAiTaskStatus, task.getAiTaskStatus())
                .set(DevelopStyleTask::getFailMessage, task.getFailMessage())
                .set(DevelopStyleTask::getFailModel, task.getFailModel())
                .set(DevelopStyleTask::getReviserId, task.getReviserId())
                .set(DevelopStyleTask::getReviserName, task.getReviserName())
                .set(DevelopStyleTask::getRevisedTime, task.getRevisedTime())
                .update();
    }

    public List<DevelopStyleTask> listByCodes(final List<String> codes) {
        return this.list(new LambdaQueryWrapper<DevelopStyleTask>()
                .eq(DevelopStyleTask::getDeleted, Bool.NO.getCode())
                .in(DevelopStyleTask::getTaskCode, codes)
                .ge(DevelopStyleTask::getCreatedTime, LocalDateTime.now().toLocalDate().minusDays(7))
        );
    }

    private LambdaQueryWrapper<DevelopStyleTask> getWrapper(final DevelopStyleTaskQuery req) {
        final LambdaQueryWrapper<DevelopStyleTask> w = BasicConvert.pageWrapper(req, new DevelopStyleTask());
        if (Objects.nonNull(req.getTaskStatus())) {
            w.eq(DevelopStyleTask::getTaskStatus, req.getTaskStatus());
        } if (StrUtil.isNotBlank(req.getStyleLabelCode())) {
            w.like(DevelopStyleTask::getStyleLabelCode, req.getStyleLabelCode());
        }
        if (Objects.nonNull(req.getCheckStartTime())) {
            w.ge(DevelopStyleTask::getCheckTime, req.getCheckStartTime());
        }
        if (Objects.nonNull(req.getCheckEndTime())) {
            w.le(DevelopStyleTask::getCheckTime, req.getCheckEndTime());
        }
        if (CollectionUtil.isNotEmpty(req.getWavebandCodes())) {
            w.in(DevelopStyleTask::getWavebandCode, req.getWavebandCodes());
        }
        if (CollectionUtil.isNotEmpty(req.getStoreIds())) {
            w.in(DevelopStyleTask::getStoreId, req.getStoreIds());
        }
        if (CollectionUtil.isNotEmpty(req.getRelaTypes())) {
            w.in(DevelopStyleTask::getRelaType, req.getRelaTypes());
        }
        if (CollectionUtil.isNotEmpty(req.getStyleTypes())) {
            w.in(DevelopStyleTask::getStyleType, req.getStyleTypes());
        }
        if (CollectionUtil.isNotEmpty(req.getCreatorIds())) {
            w.in(DevelopStyleTask::getCreatorId, req.getCreatorIds());
        }
        if (CollectionUtil.isNotEmpty(req.getSpuCodes())) {
            w.in(DevelopStyleTask::getSpuCode, req.getSpuCodes());
        }
        if (CollectionUtil.isNotEmpty(req.getTaskCodes())) {
            w.in(DevelopStyleTask::getTaskCode, req.getTaskCodes());
        }
        if (Objects.nonNull(req.getStyleCheckerId())) {
            w.eq(DevelopStyleTask::getStyleCheckerId, req.getStyleCheckerId());
        }
        if (Objects.nonNull(req.getIdentifyStatus())) {
            w.eq(DevelopStyleTask::getAiTaskStatus, req.getIdentifyStatus());
        }
        final var categoryCodes = req.getCategoryCodes();
        if (CollectionUtil.isNotEmpty(categoryCodes)) {
            w.and(
                    c -> categoryCodes
                            .forEach(
                                    it -> c.or().like(DevelopStyleTask::getCategoryCode, it)
                            )
            );
        }
        return w;
    }

    public DevelopStyleTask getByTaskCode(final String taskCode) {
        return this.getOne(new LambdaQueryWrapper<DevelopStyleTask>()
                .eq(DevelopStyleTask::getDeleted, Bool.NO.getCode())
                .eq(DevelopStyleTask::getTaskCode, taskCode));
    }

    public DevelopStyleTask getBySpu(final String spuCode) {
        return this.getOne(new LambdaQueryWrapper<DevelopStyleTask>()
                .eq(DevelopStyleTask::getDeleted, Bool.NO.getCode())
                .eq(DevelopStyleTask::getSpuCode, spuCode));
    }

    public List<DevelopStyleTask> jobs() {
        return this.list(new LambdaQueryWrapper<DevelopStyleTask>()
                .eq(DevelopStyleTask::getDeleted, Bool.NO.getCode())
                .in(DevelopStyleTask::getAiTaskStatus, List.of(TaskStatusEnum.QUEUEING.getCode(), TaskStatusEnum.GENERATING.getCode()))
                .ge(DevelopStyleTask::getCreatedTime, LocalDateTime.now().toLocalDate().minusDays(7))
        );
    }

    public List<DevelopStyleTask> jobChecks() {
        return this.list(new LambdaQueryWrapper<DevelopStyleTask>()
                .eq(DevelopStyleTask::getDeleted, Bool.NO.getCode())
                .in(DevelopStyleTask::getTaskStatus, List.of(DevelopStyleTaskStatusEnum.PENDING_REVIEW.getCode()))
                .ge(DevelopStyleTask::getStyleCheckerId,1)
                .ge(DevelopStyleTask::getCreatedTime, LocalDateTime.now().toLocalDate().minusDays(7))
        );
    }

    public List<DevelopStyleTask> historyVector() {
        return this.list(new LambdaQueryWrapper<DevelopStyleTask>()
                .eq(DevelopStyleTask::getDeleted, Bool.NO.getCode())
                .eq(DevelopStyleTask::getImageVectorId, 0)
                .in(DevelopStyleTask::getTaskStatus, List.of(DevelopStyleTaskStatusEnum.PENDING_REVIEW.getCode(), DevelopStyleTaskStatusEnum.PAYMENT_PENDING.getCode()))
        );
    }

    public List<DevelopStyleTask> query(DevelopStyleTaskOpenQueryReq req) {
        return this.list(new LambdaQueryWrapper<DevelopStyleTask>()
                .eq(DevelopStyleTask::getDeleted, Bool.NO.getCode())
                .in(CollectionUtil.isNotEmpty(req.getTaskIds()),DevelopStyleTask::getTaskId, req.getTaskIds())
                .in(CollectionUtil.isNotEmpty(req.getTaskCodes()),DevelopStyleTask::getTaskCode, req.getTaskCodes())
        );
    }
}
