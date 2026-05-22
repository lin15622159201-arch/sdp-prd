package tech.tiangong.sdp.repository;

import cn.hutool.core.collection.CollUtil;
import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Repository;
import java.time.LocalDateTime;
import java.util.Collections;
import java.util.List;
import java.util.Objects;

import team.aikero.blade.data.mybatis.repository.BaseRepository;
import tech.tiangong.sdp.entity.DesignLog;
import tech.tiangong.sdp.mapper.DesignLogMapper;

/**
* 设计打版操作日志
* <br>CreateDate August 10,2021
* @author lujunxuan
* @since 1.0
*/

@Repository
public class DesignLogRepository extends BaseRepository<DesignLogMapper, DesignLog> {

    public List<DesignLog> getDonePrototypeByTime(LocalDateTime startTime) {
        if (Objects.isNull(startTime)) {
            return List.of();
        }
        return baseMapper.getDonePrototypeByTime(startTime);
    }

    /**
     * 根据业务id与日志内容匹配查询操作日志
     * @param bizIdList 业务id集合
     * @param content 日志内容; 可为空
     * @return 操作日志集合
     */
    public List<DesignLog> listByBizIdsAndContent(List<Long> bizIdList, String content) {
        if (CollUtil.isEmpty(bizIdList)) {
            return List.of();
        }
        return lambdaQuery()
                .eq(StringUtils.isNotBlank(content), DesignLog::getContent, content)
                .in(DesignLog::getBizId, bizIdList)
                .orderByDesc(DesignLog::getCreatedTime)
                .list();

    }

    public List<DesignLog> listByDesignCodes(List<String> designCodeList) {
        if (CollUtil.isEmpty(designCodeList)) {
            return Collections.emptyList();
        }
        return lambdaQuery()
                .in(DesignLog::getDesignCode, designCodeList)
                .list();
    }
}