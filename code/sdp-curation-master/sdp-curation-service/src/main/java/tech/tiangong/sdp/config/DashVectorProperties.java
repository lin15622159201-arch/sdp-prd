package tech.tiangong.sdp.config;

import lombok.Data;

import java.util.List;

/**
 * 向量配置
 *
 * @author ：qinwenxuan@zj.tech
 * @version :1.0
 * @date ：2026/3/3 17:01
 */
@Data
public class DashVectorProperties {
    /**
     * 地址
     */
    private String endpoint;
    /**
     * 访问KEY
     */
    private String apiKey;
    /**
     * 超时
     */
    private Float timeout;
    /**
     * 集群
     */
    private String cluster;
    /**
     * 名称前缀
     */
    private String prefixName;

    /**
     * 最大条数
     * <pre>
     *     不能超过1024
     * </pre>
     */
    private Integer top;
    /**
     * 租户ID列表
     */
    private List<Long> tenantIds ;
}
