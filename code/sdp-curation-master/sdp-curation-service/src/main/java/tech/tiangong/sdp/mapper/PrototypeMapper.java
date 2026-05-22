package tech.tiangong.sdp.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import org.apache.ibatis.annotations.Param;
import tech.tiangong.sdp.entity.Prototype;
import tech.tiangong.sdp.vo.query.PrototypeQuery;
import tech.tiangong.sdp.vo.resp.PrototypeExcelResp;
import tech.tiangong.sdp.vo.resp.PrototypeQueryResp;

import java.util.List;

/**
 * 版单管理-数据库访问层
 *
 * @author cenlijin
 * @since 2021-08-17 15:52:54
 */
public interface PrototypeMapper extends BaseMapper<Prototype> {

    /**
     * 设计款管理-条件查询
     *
     * @param queryDTO
     * @return
     */
    Page<PrototypeQueryResp> listQuery(@Param("page") Page page, @Param("query") PrototypeQuery queryDTO);

    /**
     * 设计款管理-条件查询(关联下游数据表)
     *
     * @param queryDTO
     * @return
     */

    Page<PrototypeQueryResp> listMoreQuery(@Param("page") Page page, @Param("query") PrototypeQuery queryDTO);

    /**
     * 设计款-已取消列表条件查询
     * @param queryDTO
     * @return
     */
    //List<PrototypeManageCancelQueryResp> listCancelQuery(@Param("query") PrototypeManageCancelQuery queryDTO);

    /**
     * 设计款-导出款式数据
     *
     * @param queryDTO
     * @return
     */
    List<PrototypeExcelResp> listExcel(@Param("query") PrototypeQuery queryDTO);

    Boolean updateIdAndPrototype(@Param("bean") Prototype prototype, @Param("prototypeId") Long originPrototypeId);

    List<Prototype> refreshSkcSku(@Param("skcCodes") List<String> skcCodes);

    int editById(Prototype prototype);

    int editByIdWithOptimisticLock(Prototype prototype);
    /**
     * 设计款-导出款式数据,获取花型数据
     * @param bomIdList
     * @return
     */
    //List<BomOrderMaterialExcelResp> listBomOrderMaterialExcel(@Param("bomIdList") List<Long> bomIdList);

    /**
     * 设计款-导出款式图片
     * @param queryDTO
     * @return
     */
    //List<PrototypeZipResp> listZip(@Param("query") PrototypeExcelReq queryDTO);
}