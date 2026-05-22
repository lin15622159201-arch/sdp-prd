package tech.tiangong.sdp.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import org.apache.ibatis.annotations.Param;
import tech.tiangong.sdp.entity.SpotStyleSupplier;
import tech.tiangong.sdp.entity.SpotStyleTask;
import tech.tiangong.sdp.vo.query.SpotStyleTaskQuery;
import tech.tiangong.sdp.vo.req.SpotSupplierListReq;

import java.util.List;

/**
 * 现货款供应商表Mapper
 *
 * @author ：qinwenxuan@zj.tech
 * @version :1.0
 * @date ：2025/11/3 15:13
 */
public interface SpotStyleSupplierMapper extends BaseMapper<SpotStyleSupplier> {
    List<SpotStyleSupplier> listBySupplierStyleCodeAndNames(@Param("reqs") List<SpotSupplierListReq> reqs);
}
