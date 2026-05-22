package tech.tiangong.sdp.service;

import java.io.InputStream;

/**
 * SKC图片导入Service
 *
 * @author ：qinwenxuan@zj.tech
 * @version :1.0
 * @date ：2026/3/11 15:17
 */
public interface SkcImageSyncService {
    void importExcel(final InputStream inputStream);
    void upload();
}
