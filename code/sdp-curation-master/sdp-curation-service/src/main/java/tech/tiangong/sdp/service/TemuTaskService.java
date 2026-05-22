package tech.tiangong.sdp.service;

import java.util.Set;

/**
 * Temu任务
 *
 * @author ：qinwenxuan@zj.tech
 * @version :1.0
 * @date ：2026/1/18 16:23
 */
public interface TemuTaskService extends BasicService{
    void test() ;
    void retry(final Set<Long> productIds) ;
}
