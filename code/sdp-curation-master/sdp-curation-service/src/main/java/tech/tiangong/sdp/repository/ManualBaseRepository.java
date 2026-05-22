package tech.tiangong.sdp.repository;

import cn.hutool.core.util.StrUtil;
import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.baomidou.mybatisplus.extension.toolkit.SqlHelper;
import team.aikero.blade.core.exception.BusinessException;
import team.aikero.blade.data.mybatis.entity.BaseEntity;
import team.aikero.blade.data.mybatis.mapper.MapperExtKt;
import team.aikero.blade.data.mybatis.repository.BaseRepository;
import team.aikero.blade.data.mybatis.toolkit.ForceManualFillFlag;

import java.io.Serializable;
import java.util.List;
import java.util.Optional;
import java.util.function.Supplier;

/**
 * ManualBaseRepository
 *
 * @author ：qinwenxuan@zj.tech
 * @version :1.0
 * @date ：2025/10/31 10:17
 */
public abstract class ManualBaseRepository<M extends BaseMapper<T>, T extends BaseEntity> extends BaseRepository<M, T> {
    public T obtainById(final Serializable id) {
        return obtainById(id, null);
    }

    public T obtainById(final Serializable id, final String error) {
        return Optional.ofNullable(this.getById(id))
                .orElseThrow(() -> new BusinessException(StrUtil.isBlank(error) ? "data不存在!" : error));
    }

    public Boolean updateByIdManualFill(final T entity) {
        return SqlHelper.retBool(MapperExtKt.updateByIdForceManualFill(getBaseMapper(), entity));
    }

    public Boolean saveManualFill(final T entity) {
        return SqlHelper.retBool(MapperExtKt.insertForceManualFill(getBaseMapper(), entity));
    }

    public Boolean saveBatchManualFill(final List<T> data) {
        return doForceManualFill(() -> super.saveBatch(data, data.size()));
    }

    public Boolean updateBatchByIdManualFill(final List<T> data) {
        return doForceManualFill(() -> super.updateBatchById(data, data.size()));

    }

    protected Boolean doForceManualFill(final Supplier<Boolean> fn) {
        final var flag = ForceManualFillFlag.INSTANCE.getForceManualFill();
        try {
            flag.set(true);
            return fn.get();
        } finally {
            flag.remove();
        }
    }
}
