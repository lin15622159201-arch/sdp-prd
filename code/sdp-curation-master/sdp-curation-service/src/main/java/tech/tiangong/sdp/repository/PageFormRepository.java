package tech.tiangong.sdp.repository;

import org.springframework.stereotype.Repository;
import tech.tiangong.sdp.entity.PageForm;
import tech.tiangong.sdp.mapper.PageFormMapper;

/**
 * 页面表单表 Repository
 *
 * @author : qinwenxuan@zj.tech
 * @version : 1.0
 * @date : 2025/8/13 16:20
 */
@Repository
public class PageFormRepository extends ManualBaseRepository<PageFormMapper, PageForm> {
}
