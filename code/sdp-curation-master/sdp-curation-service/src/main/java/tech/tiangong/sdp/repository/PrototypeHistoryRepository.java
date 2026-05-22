package tech.tiangong.sdp.repository;

import cn.hutool.core.collection.CollectionUtil;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.toolkit.StringUtils;
import com.baomidou.mybatisplus.core.toolkit.Wrappers;
import org.springframework.stereotype.Repository;
import team.aikero.blade.core.enums.Bool;
import tech.tiangong.sdp.entity.PrototypeHistory;
import tech.tiangong.sdp.mapper.PrototypeHistoryMapper;

import java.util.List;
import java.util.Objects;

/**
 * SKC-历史表服务仓库类
 *
 * @author cenlijin
 * @since 2021-08-17 15:52:50
 */
@Repository
public class PrototypeHistoryRepository extends ManualBaseRepository<PrototypeHistoryMapper, PrototypeHistory> {
    public List<PrototypeHistory> getListByStyleCode(String styleCode) {
        return baseMapper.selectList(new QueryWrapper<PrototypeHistory>().lambda().eq(PrototypeHistory::getStyleCode, styleCode)
                .eq(PrototypeHistory::getDeleted, Bool.NO.getCode()));
    }


    public List<PrototypeHistory> getListByStyleId(Long styleId) {
        return baseMapper.selectList(new QueryWrapper<PrototypeHistory>().lambda().eq(PrototypeHistory::getDesignStyleId, styleId)
                .eq(PrototypeHistory::getDeleted, Bool.NO.getCode()));
    }

    public List<PrototypeHistory> getListByPrototypeId(Long prototypeId) {
        return baseMapper.selectList(new QueryWrapper<PrototypeHistory>().lambda().eq(PrototypeHistory::getPrototypeId, prototypeId)
                .eq(PrototypeHistory::getDeleted, Bool.NO.getCode()));
    }


    public PrototypeHistory getByPrototypeId(Long prototypeId){
        return getOne(Wrappers.<PrototypeHistory>lambdaQuery().eq(PrototypeHistory::getPrototypeId,prototypeId));
    }

    /**
     * 根据skcList编码查询所有的版单信息
     */
    public List<PrototypeHistory> listQueryByDesignCode(List<String> designCodeList) {
        if (CollectionUtil.isEmpty(designCodeList)) {
            return List.of();
        }
        return lambdaQuery()
                .in(PrototypeHistory::getDesignCode, designCodeList)
                .orderByDesc(PrototypeHistory::getVersionNum)
                .list();
    }

    /**
     * 根据设计款编码更新
     * @param designCode
     * @param prototypeHistory
     */
    public void updateByDesignCode(String designCode, PrototypeHistory prototypeHistory) {
        if (StringUtils.isBlank(designCode) || Objects.isNull(prototypeHistory)) {
            return;
        }
        update(prototypeHistory,Wrappers.<PrototypeHistory>lambdaUpdate().eq(PrototypeHistory::getDesignCode,designCode));
    }

    /**
     * 根据设计款编码更新
     * @param prototypeId
     * @param prototypeHistory
     */
    public void updateByPrototypeId(Long prototypeId, PrototypeHistory prototypeHistory) {
        if (null == prototypeId || Objects.isNull(prototypeHistory)) {
            return;
        }
        update(prototypeHistory,Wrappers.<PrototypeHistory>lambdaUpdate().eq(PrototypeHistory::getPrototypeId,prototypeId));
    }

}