package tech.tiangong.sdp.temu.serivce;

/**
 * Temu模板Service
 *
 * @author ：qinwenxuan@zj.tech
 * @version :1.0
 * @date ：2025/12/30 16:37
 */
public interface TemuTemplateService {
    void sync(final Long categoryId);
    void sync();
}
