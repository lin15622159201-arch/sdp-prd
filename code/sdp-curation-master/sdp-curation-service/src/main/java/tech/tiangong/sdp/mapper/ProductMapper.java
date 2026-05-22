package tech.tiangong.sdp.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import org.apache.ibatis.annotations.Param;
import tech.tiangong.sdp.entity.Product;
import tech.tiangong.sdp.entity.Prototype;
import tech.tiangong.sdp.vo.dto.ProductStateGroupDTO;
import tech.tiangong.sdp.vo.query.ProductQuery;

import java.util.List;

/**
 * 商品表 Mapper
 *
 * @author : qinwenxuan@zj.tech
 * @version : 1.0
 * @date : 2025/8/13 16:16
 */
public interface ProductMapper extends BaseMapper<Product> {
    IPage<Product> page(@Param("page") final Page<Product> page, @Param("query") ProductQuery query);
    List<ProductStateGroupDTO> stateTotal(@Param("query") ProductQuery req);
    Long toBeUpdatedTotal(@Param("query") ProductQuery query);
    List<Product> selectWithoutSalesDriving(@Param("page")final int page);
    int editById(Product product);
    int editByIdWithOptimisticLock(Product product);
}
