package tech.tiangong.sdp.repository;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Repository;
import team.aikero.blade.core.enums.Bool;
import tech.tiangong.sdp.entity.PrototypeMaterial;
import tech.tiangong.sdp.mapper.PrototypeMaterialMapper;

import java.util.List;

/**
 * 款式管理-SKC素材信息-服务仓库类
 *
 * @author liuhongfu
 * @since 2021-08-17 15:52:50
 */
@AllArgsConstructor
@Repository
public class PrototypeMaterialRepository extends ManualBaseRepository<PrototypeMaterialMapper, PrototypeMaterial> {


    public List<PrototypeMaterial> listByDesignCodes(List<String> designCodes) {
        return this.list(new LambdaQueryWrapper<PrototypeMaterial>()
                .eq(PrototypeMaterial::getDeleted, Bool.NO.getCode())
                .in(PrototypeMaterial::getDesignCode, designCodes)
                .orderByAsc(PrototypeMaterial::getPrototypeMaterialId));
    }

    public List<PrototypeMaterial> listBySkcIds(List<Long> skcIds) {
        return this.list(new LambdaQueryWrapper<PrototypeMaterial>()
                .eq(PrototypeMaterial::getDeleted, Bool.NO.getCode())
                .in(PrototypeMaterial::getPrototypeId, skcIds)
                .orderByAsc(PrototypeMaterial::getPrototypeMaterialId))
                ;
    }

    public List<PrototypeMaterial> listByStyleCodesAndType(List<String> styleCodes, Integer materialType) {
        return this.list(new LambdaQueryWrapper<PrototypeMaterial>()
                .eq(PrototypeMaterial::getDeleted, Bool.NO.getCode())
                .eq(PrototypeMaterial::getMaterialType, materialType)
                .in(PrototypeMaterial::getStyleCode, styleCodes)
                .orderByAsc(PrototypeMaterial::getPrototypeMaterialId)
        );
    }

    public List<PrototypeMaterial> listBySkcIdsAndType(List<Long> skcIds, Integer materialType) {
        return this.list(new LambdaQueryWrapper<PrototypeMaterial>()
                .eq(PrototypeMaterial::getDeleted, Bool.NO.getCode())
                .eq(PrototypeMaterial::getMaterialType, materialType)
                .in(PrototypeMaterial::getPrototypeId, skcIds)
                .orderByAsc(PrototypeMaterial::getPrototypeMaterialId)
        );
    }

    public void deletedBySkcIds(List<Long> styleIds) {
        baseMapper.deletedBySkcIds(styleIds);
    }

    public void deletedByStyleCodesAndType(List<String> StyleCodes, Integer materialType) {
        baseMapper.deletedByStyleCodesAndType(StyleCodes, materialType);
    }

    public void deletedBySkcIdsAndType(List<Long> skcIds, Integer taskType) {
        baseMapper.deletedBySkcIdsAndType(skcIds, taskType);
    }
}