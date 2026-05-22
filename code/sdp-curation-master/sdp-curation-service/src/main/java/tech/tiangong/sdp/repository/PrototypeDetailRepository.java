package tech.tiangong.sdp.repository;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.toolkit.Wrappers;
import org.springframework.stereotype.Repository;
import org.springframework.util.CollectionUtils;
import team.aikero.blade.data.mybatis.repository.BaseRepository;
import tech.tiangong.sdp.entity.PrototypeDetail;
import tech.tiangong.sdp.mapper.PrototypeDetailMapper;

import java.util.Collections;
import java.util.List;
import java.util.Objects;
import java.util.Set;

/**
 * 版单详情表服务仓库类
 *
 * @author husky
 * @since 2021-08-09 14:50:25
 */
@Repository
public class PrototypeDetailRepository extends BaseRepository<PrototypeDetailMapper, PrototypeDetail> {
    public PrototypeDetail getByPrototypeId(Long prototypeId){
        return getOne(Wrappers.<PrototypeDetail>lambdaQuery().eq(PrototypeDetail::getPrototypeId,prototypeId));
    }

    public List<PrototypeDetail> getListByPrototypeIds(List<Long> prototypeIdList) {
        if(CollectionUtils.isEmpty(prototypeIdList)){
            return Collections.emptyList();
        }
        return baseMapper.selectList(new QueryWrapper<PrototypeDetail>().lambda().in(PrototypeDetail::getPrototypeId, prototypeIdList));
    }
    public List<PrototypeDetail> getListByPrototypeIds(Set<Long> prototypeIds) {
        if(CollectionUtils.isEmpty(prototypeIds)){
            return Collections.emptyList();
        }
        return baseMapper.selectList(new QueryWrapper<PrototypeDetail>().lambda().in(PrototypeDetail::getPrototypeId, prototypeIds));
    }



    /**
     * 取消设计款
     * @param prototypeId
     * @param prototypeDetail
     */
    public void cancelByPrototypeId(Long prototypeId,PrototypeDetail prototypeDetail) {
        if (Objects.isNull(prototypeId) || Objects.isNull(prototypeDetail)) {
            return;
        }
        update(prototypeDetail,Wrappers.<PrototypeDetail>lambdaUpdate().eq(PrototypeDetail::getPrototypeId,prototypeId));
    }

    /**
     * v2.1.2 版单字段优化历史数据处理
     */
    public List<PrototypeDetail> getList() {
        return baseMapper.selectList(new QueryWrapper<PrototypeDetail>().lambda());
    }


   /* public void batchUpdateQualityLeverInfo(List<Spu2SkcUpdateDto> updateList) {
        if (CollUtil.isEmpty(updateList)) {
            return;
        }
        baseMapper.batchUpdateQualityLeverInfo(updateList);
    }*/


}