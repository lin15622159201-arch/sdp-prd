package tech.tiangong.sdp.repository;

import cn.hutool.core.collection.CollectionUtil;
import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Repository;
import team.aikero.blade.core.enums.Bool;
import tech.tiangong.sdp.entity.DesignStyleMaterial;
import tech.tiangong.sdp.mapper.DesignStyleMaterialMapper;

import java.util.List;

/**
 * 款式管理-SPU素材信息-服务仓库类
 *
 * @author cenlijin
 * @since 2021-08-17 15:52:50
 */
@AllArgsConstructor
@Repository
public class DesignStyleMaterialRepository extends ManualBaseRepository<DesignStyleMaterialMapper, DesignStyleMaterial> {


    public List<DesignStyleMaterial> listByStyleCodes(List<String> styleCodes) {
        return this.list(new LambdaQueryWrapper<DesignStyleMaterial>()
                .eq(DesignStyleMaterial::getDeleted, Bool.NO.getCode())
                .in(CollectionUtil.isNotEmpty(styleCodes), DesignStyleMaterial::getStyleCode, styleCodes));
    }

    public List<DesignStyleMaterial> listByStyleIds(List<Long> styleIds) {
        return this.list(new LambdaQueryWrapper<DesignStyleMaterial>()
                .eq(DesignStyleMaterial::getDeleted, Bool.NO.getCode())
                .in(DesignStyleMaterial::getDesignStyleId, styleIds))
                ;
    }

    public List<DesignStyleMaterial> listByStyleCodesAndType(List<String> styleCodes,Integer materialType ) {
        return this.list(new LambdaQueryWrapper<DesignStyleMaterial>()
                .eq(DesignStyleMaterial::getDeleted, Bool.NO.getCode())
                .eq(DesignStyleMaterial::getMaterialType, materialType)
                .in(DesignStyleMaterial::getStyleCode, styleCodes))
                ;
    }

    public List<DesignStyleMaterial> listByStyleIdsAndType(List<Long> spuIds,Integer materialType ) {
        return this.list(new LambdaQueryWrapper<DesignStyleMaterial>()
                .eq(DesignStyleMaterial::getDeleted, Bool.NO.getCode())
                .eq(DesignStyleMaterial::getMaterialType, materialType)
                .in(DesignStyleMaterial::getDesignStyleId, spuIds))
                ;
    }

    public void deletedByStyleCodes(List<String> StyleCodes) {
        baseMapper.deletedByStyleCodes(StyleCodes);
    }

    public void deletedByStyleIds(List<Long> styleIds) {
        baseMapper.deletedByStyleIds(styleIds);
    }

    public void deletedByStyleCodesAndType(List<String> StyleCodes, Integer materialType) {
        baseMapper.deletedByStyleCodesAndType(StyleCodes,materialType);
    }
}