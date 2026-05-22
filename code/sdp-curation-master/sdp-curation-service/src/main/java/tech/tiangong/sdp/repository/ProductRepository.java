package tech.tiangong.sdp.repository;

import cn.hutool.core.collection.CollectionUtil;
import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import org.springframework.stereotype.Repository;
import team.aikero.blade.core.enums.Bool;
import tech.tiangong.sdp.entity.Product;
import tech.tiangong.sdp.mapper.ProductMapper;
import tech.tiangong.sdp.vo.dto.ProductStateGroupDTO;
import tech.tiangong.sdp.vo.query.ProductQuery;

import java.util.Comparator;
import java.util.List;
import java.util.Set;

/**
 * 商品表 Repository
 *
 * @author : qinwenxuan@zj.tech
 * @version : 1.0
 * @date : 2025/8/13 16:20
 */
@Repository
public class ProductRepository extends ManualBaseRepository<ProductMapper, Product> {

    public List<Product> listByStyleId(final Long styleId) {
        return this.list(new LambdaQueryWrapper<Product>()
                .eq(Product::getDeleted, Bool.NO.getCode())
                .eq(Product::getStyleId, styleId)
                .orderByDesc(Product::getCreatedTime)
        );
    }

    public Product getByPlatformProductId(final Long platformProductId) {
        return this.getOne(new LambdaQueryWrapper<Product>()
                .eq(Product::getDeleted, Bool.NO.getCode())
                .eq(Product::getPlatformProductId, platformProductId)
                .orderByDesc(Product::getCreatedTime)
        )
                ;
    }

    public List<Product> listByStyleIds(final List<Long> styleIds) {
        return this.list(new LambdaQueryWrapper<Product>()
                .eq(Product::getDeleted, Bool.NO.getCode())
                .in(Product::getStyleId, styleIds)
                .orderByDesc(Product::getCreatedTime)
        )
                ;
    }

    public List<Product> listByShopIds(final List<Long> shopIds) {
        return this.list(new LambdaQueryWrapper<Product>()
                .eq(Product::getDeleted, Bool.NO.getCode())
                .in(Product::getShopId, shopIds)
                .orderByDesc(Product::getCreatedTime)
        )
                ;
    }

    public IPage<Product> webPage(final ProductQuery query) {
        return this.baseMapper.page(new Page<>(query.getPageNum(), query.getPageSize()), query);
    }

    public List<ProductStateGroupDTO> stateTotal(final ProductQuery query) {
        return baseMapper.stateTotal(query);
    }

    public Long toBeUpdatedTotal(final ProductQuery query) {
        return baseMapper.toBeUpdatedTotal(query);
    }

    public void updateFile(final Product product) {
        this.lambdaUpdate()
                .eq(Product::getDeleted, Bool.NO.getCode())
                .eq(Product::getProductId, product.getProductId())
                .set(Product::getVideoUrl, product.getVideoUrl())
                .set(Product::getMaterialImgUrl, product.getMaterialImgUrl())
                .set(Product::getRevisedTime, product.getRevisedTime())
                .set(Product::getReviserId, product.getReviserId())
                .update();
    }

    public void removeTemp(final Product product) {
        this.lambdaUpdate()
                .eq(Product::getDeleted, Bool.NO.getCode())
                .eq(Product::getProductId, product.getProductId())
                .set(Product::getSizeTemplateId, product.getSizeTemplateId())
                .set(Product::getShowSizeTemplateId, product.getShowSizeTemplateId())
                .set(Product::getRevisedTime, product.getRevisedTime())
                .set(Product::getReviserId, product.getReviserId())
                .update();
    }

    public List<Product> jobs() {
        return this.list(new LambdaQueryWrapper<Product>()
                .eq(Product::getDeleted, Bool.NO.getCode())
                .eq(Product::getHidden, Bool.NO.getCode())
                .orderByDesc(Product::getCreatedTime)
        )
                ;
    }

    public List<Product> selectWithoutSalesDriving(final int page) {
        return baseMapper.selectWithoutSalesDriving(page);
    }

    public int editBatchById(final List<Product> list) {
        if (CollectionUtil.isEmpty(list)) {
            return 0;
        }
        // 先按照ID排序
        final var sorted = list.stream().sorted(Comparator.comparing(Product::getProductId)).toList();
        int i = 0;
        for (Product it : sorted) {
            final var row = this.baseMapper.editById(it);
            i += row;
        }
        return i;
    }

    public int editByIdWithOptimisticLock(final Product product) {
        return baseMapper.editByIdWithOptimisticLock(product);
    }

    public List<Product> listByStyleCodes(final Set<String> spuCodes) {
        return this.list(new LambdaQueryWrapper<Product>()
                .eq(Product::getDeleted, Bool.NO.getCode())
                .in(Product::getStyleCode, spuCodes)
                .orderByDesc(Product::getCreatedTime)
        )
                ;
    }
}
