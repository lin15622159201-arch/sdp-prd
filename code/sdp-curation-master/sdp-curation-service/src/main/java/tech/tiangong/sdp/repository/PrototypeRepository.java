package tech.tiangong.sdp.repository;

import cn.hutool.core.collection.CollUtil;
import cn.hutool.core.collection.CollectionUtil;
import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.toolkit.Wrappers;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import org.springframework.stereotype.Repository;
import team.aikero.blade.core.enums.Bool;
import tech.tiangong.sdp.entity.Prototype;
import tech.tiangong.sdp.entity.Prototype;
import tech.tiangong.sdp.mapper.PrototypeMapper;
import tech.tiangong.sdp.vo.query.PrototypeQuery;
import tech.tiangong.sdp.vo.resp.PrototypeExcelResp;
import tech.tiangong.sdp.vo.resp.PrototypeQueryResp;

import java.util.Collection;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;

/**
 * SKC-服务仓库类
 *
 * @author cenlijin
 * @since 2021-08-17 15:52:50
 */
@Repository
public class PrototypeRepository extends ManualBaseRepository<PrototypeMapper, Prototype> {

    public Page<PrototypeQueryResp> listQuery(PrototypeQuery query) {
        return baseMapper.listQuery(new Page(query.getPageNum(), query.getPageSize()), query);
    }

    public List<PrototypeExcelResp> listExcel(PrototypeQuery req) {
        return baseMapper.listExcel(req);
    }


    public Prototype getByDesignCode(String designCode) {
        return getOne(Wrappers.<Prototype>lambdaQuery().eq(Prototype::getDesignCode, designCode));
    }

    public List<Prototype> listByStyleCode(String styleCode) {
        return baseMapper.selectList(new QueryWrapper<Prototype>().lambda().eq(Prototype::getStyleCode, styleCode)
                .eq(Prototype::getDeleted, Bool.NO.getCode()));
    }

    public List<Prototype> listByStyleCodes(List<String> styleCodes) {
        return baseMapper.selectList(new QueryWrapper<Prototype>().lambda().in(Prototype::getStyleCode, styleCodes)
                .eq(Prototype::getDeleted, Bool.NO.getCode()));
    }

    /**
     * 更新id和内容
     *
     * @param prototype
     * @param originPrototypeId 原prototypeId
     * @return
     */
    public Boolean updateIdAndPrototype(Prototype prototype, Long originPrototypeId) {
        return baseMapper.updateIdAndPrototype(prototype, originPrototypeId);
    }

    public List<Prototype> getListByStyleCode(String styleCode) {
        return baseMapper.selectList(new QueryWrapper<Prototype>().lambda().eq(Prototype::getStyleCode, styleCode)
                .eq(Prototype::getDeleted, Bool.NO.getCode()));
    }

    public List<Prototype> getListByDesignStyleId(Long designStyleId) {
        return baseMapper.selectList(new QueryWrapper<Prototype>().lambda().eq(Prototype::getDesignStyleId, designStyleId)
                .eq(Prototype::getDeleted, Bool.NO.getCode()));
    }

    public List<Prototype> listByDesignCodes(Collection<String> designCodeList) {
        if (CollUtil.isEmpty(designCodeList)) {
            return Collections.emptyList();
        }
        return lambdaQuery()
                .in(Prototype::getDesignCode, designCodeList)
                .eq(Prototype::getDeleted, Bool.NO.getCode())
                .list();
    }

    public List<Prototype> listByDesignStyleIds(Collection<Long> spuIds) {
        if (CollUtil.isEmpty(spuIds)) {
            return Collections.emptyList();
        }
        return lambdaQuery()
                .in(Prototype::getDesignStyleId, spuIds)
                .eq(Prototype::getDeleted, Bool.NO.getCode())
                .list();
    }

    public List<Prototype> refreshSkcSku(List<String> skcCodes) {
        return baseMapper.refreshSkcSku(skcCodes);
    }

    public int editBatchById(final List<Prototype> list) {
        if (CollectionUtil.isEmpty(list)) {
            return 0;
        }
        // 先按照ID排序
        final var sorted = list.stream().sorted(Comparator.comparing(Prototype::getPrototypeId)).toList();
        int i = 0;
        for (Prototype it : sorted) {
            final var row = this.baseMapper.editById(it);
            i += row;
        }
        return i;
    }

    public int editBatchByIdWithOptimisticLock(final List<Prototype> list) {
        if (CollectionUtil.isEmpty(list)) {
            return 0;
        }
        // 先按照ID排序
        final var sorted = list.stream().sorted(Comparator.comparing(Prototype::getPrototypeId)).toList();
        int i = 0;
        for (Prototype it : sorted) {
            final var row = editByIdWithOptimisticLock(it);
            i += row;
        }
        return i;
    }

    public int editByIdWithOptimisticLock(final Prototype prototype) {
        return baseMapper.editByIdWithOptimisticLock(prototype);
    }

    public List<Prototype> listBySalesDriving(final int pageIndex, final int pageSize) {
        return this.list(new LambdaQueryWrapper<Prototype>()
                .eq(Prototype::getDeleted, Bool.NO.getCode())
                .eq(Prototype::getIsOnSale, 0)
                .orderByAsc(Prototype::getCreatedTime)
                .last(" LIMIT " + pageIndex + " , " + pageSize)

        );
    }
}