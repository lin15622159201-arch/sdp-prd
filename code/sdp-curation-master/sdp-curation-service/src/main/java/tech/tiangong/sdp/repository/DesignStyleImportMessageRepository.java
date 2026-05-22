package tech.tiangong.sdp.repository;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Repository;
import tech.tiangong.sdp.entity.DesignStyleImportMessage;
import tech.tiangong.sdp.mapper.DesignStyleImportMessageMapper;

/**
 * 款式管理-SPU素材信息-服务仓库类
 *
 * @author cenlijin
 * @since 2021-08-17 15:52:50
 */
@AllArgsConstructor
@Repository
public class DesignStyleImportMessageRepository extends ManualBaseRepository<DesignStyleImportMessageMapper, DesignStyleImportMessage> {

}