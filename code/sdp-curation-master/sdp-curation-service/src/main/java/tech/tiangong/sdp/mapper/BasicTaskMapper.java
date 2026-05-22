package tech.tiangong.sdp.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import tech.tiangong.sdp.entity.BasicTask;

/**
 * BasicTask实体Mapper<br/>
 * 没有实际意义,但是mp在某个版本之后不会缓存entity父类的结构信息<br/>
 * 在使用泛型lambda操作的时候会报错
 * <pre>
 *{@code
 *     public <T extends BasicTask, R extends BasePageQuery> LambdaQueryWrapper<T> pageWrapper(final R req) {
 *         final var w = new LambdaQueryWrapper<T>()
 *                 .eq(T::getDeleted, Bool.NO.getCode());
 *         if (Objects.nonNull(req.getTenantId())) {
 *             w.eq(T::getTenantId, req.getTenantId());
 *         }
 *         if (Objects.nonNull(req.getCreatorId())) {
 *             w.eq(T::getCreatorId, req.getCreatorId());
 *         }
 *         if (Objects.nonNull(req.getCreatedStartTime())) {
 *             w.ge(T::getCreatedTime, req.getCreatedStartTime());
 *         }
 *         if (Objects.nonNull(req.getCreatedEndTime())) {
 *             w.ge(T::getCreatedTime, req.getCreatedEndTime());
 *         }
 *         if (StrUtil.isNotBlank(req.getCreatorName())) {
 *             w.like(T::getCreatorName, req.getCreatorName());
 *         }
 *         if (StrUtil.isNotBlank(req.getTaskCode())) {
 *             w.in(T::getTaskCode, StrUtil.split(req.getTaskCode(), StrUtil.COMMA));
 *         }
 *         w.orderByDesc(T::getCreatedTime);
 *         return w;
 *     }
 *}
 * </pre>
 * MybatisPlusException: can not find lambda cache for this entity [tech.tiangong.sdp.entity.BasicTask]]
 * @author ：qinwenxuan@zj.tech
 * @version :1.0
 * @date ：2025/11/3 15:13
 */
public interface BasicTaskMapper extends BaseMapper<BasicTask> {
}
