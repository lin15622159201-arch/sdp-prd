package tech.tiangong.sdp.dto.aliexpress.req

/**
 * @author zjh
 * @date 2025/1/10 15:38
 */
data class AeReq(
    /**
     * 数据段，因数据量比较大，可以通过分段拉取，段之间可以并行拉取数据，段内串行分页拉取
     * demo 1-256
     */
    var segmentNum: Int? = null,
    /**
     * 表示段内需要拉取的页码，为了防止单次传输数据过多，最多单次传1000条，也是从1开始
     * demo 1
     */
    var curPage: Int? = null,
    /**
     * 指定读取某一个分区的数据
     * demo ds=20241209
     * ps：由AIDC通知的接口提供partition
     */
    var partition: String? = null,
    /**
     * odps的项目空间名称
     * demo glb_dataservice_sg
     */
    var project: String? = null,
    /**
     * odps的表名称
     * demo adi_aidc_pool_jv_task_export_dd
     */
    var tableName: String? = null,
)