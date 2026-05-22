package tech.tiangong.sdp.repository;

import org.springframework.stereotype.Repository;
import tech.tiangong.sdp.entity.PageView;
import tech.tiangong.sdp.mapper.PageViewMapper;

/**
 * 页面表 Repository
 *
 * @author : qinwenxuan@zj.tech
 * @version : 1.0
 * @date : 2025/8/13 16:20
 */
@Repository
public class PageViewRepository extends ManualBaseRepository<PageViewMapper, PageView> {
}
