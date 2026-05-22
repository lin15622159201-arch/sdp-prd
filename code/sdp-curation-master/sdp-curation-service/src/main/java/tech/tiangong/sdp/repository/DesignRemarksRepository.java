package tech.tiangong.sdp.repository;

import cn.hutool.core.collection.CollUtil;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Repository;
import team.aikero.blade.core.enums.Bool;
import team.aikero.blade.data.mybatis.repository.BaseRepository;
import tech.tiangong.sdp.entity.DesignRemarks;
import tech.tiangong.sdp.mapper.DesignRemarksMapper;

import java.util.Collections;
import java.util.List;
import java.util.Objects;
import java.util.Set;

;

/**
* 设计打版备注信息
* <br>CreateDate August 10,2021
* @author lujunxuan
* @since 1.0
*/

@AllArgsConstructor
@Repository
public class DesignRemarksRepository extends BaseRepository<DesignRemarksMapper, DesignRemarks> {


	public List<DesignRemarks>  getListByBizId(Long bizId) {
		return baseMapper.selectList(new QueryWrapper<DesignRemarks>().lambda().eq(DesignRemarks::getTransientState, Bool.NO.getCode()).eq(DesignRemarks::getBizId, bizId));
	}

	public List<DesignRemarks>  getListByBizIdAndTransientState(Long bizId, Integer transientState) {
		return baseMapper.selectList(new QueryWrapper<DesignRemarks>().lambda()
				.eq(Objects.nonNull(transientState), DesignRemarks::getTransientState, transientState)
				.eq(DesignRemarks::getBizId, bizId));
	}

	public List<DesignRemarks> getListByDesignCode(String designCode) {
		return baseMapper.selectList(new QueryWrapper<DesignRemarks>().lambda().eq(DesignRemarks::getTransientState, Bool.NO.getCode()).eq(DesignRemarks::getDesignCode, designCode));
	}

	public List<DesignRemarks> getListByDesignCodeList(Set<String> designCodes) {
		return baseMapper.selectList(new QueryWrapper<DesignRemarks>().lambda().eq(DesignRemarks::getTransientState, Bool.NO.getCode()).in(DesignRemarks::getDesignCode, designCodes)
				.orderByDesc(DesignRemarks::getCreatedTime));

	}

	public List<DesignRemarks>  getListByBizIds(Set<Long> bizIds) {
		return baseMapper.selectList(new QueryWrapper<DesignRemarks>().lambda()
				.eq(DesignRemarks::getTransientState, Bool.NO.getCode())
				.in(DesignRemarks::getBizId,bizIds)
				.orderByDesc(DesignRemarks::getCreatedTime));
	}

	public List<DesignRemarks>  getListByBizChildIds(List<Long> bizChildIds) {
		return baseMapper.selectList(new QueryWrapper<DesignRemarks>().lambda()
				.eq(DesignRemarks::getTransientState, Bool.NO.getCode())
				.in(DesignRemarks::getBizChildId, bizChildIds));
	}

	public List<DesignRemarks>  getListByBizChildIds(List<Long> bizChildIds, Integer transientState) {
		return baseMapper.selectList(new QueryWrapper<DesignRemarks>().lambda()
				.eq(Objects.nonNull(transientState), DesignRemarks::getTransientState, transientState)
				.in(DesignRemarks::getBizChildId, bizChildIds));
	}

	public List<DesignRemarks> getListByBizIdWithTransient(Long bizId) {
		return baseMapper.selectList(new QueryWrapper<DesignRemarks>().lambda().eq(DesignRemarks::getBizId, bizId));
	}

	public List<DesignRemarks> listByDesignCodes(List<String> designCodeList) {
		if (CollUtil.isEmpty(designCodeList)) {
			return Collections.emptyList();
		}
		return lambdaQuery()
				.in(DesignRemarks::getDesignCode, designCodeList)
				.list();
	}
}