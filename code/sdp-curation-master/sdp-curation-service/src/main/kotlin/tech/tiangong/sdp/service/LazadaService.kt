package tech.tiangong.sdp.service

/**
 * Lazada
 * @author zjh
 * @date 2024/12/18 15:40
 */
interface LazadaService {

    /**
     * 回流推送导AIDC-已使用,已上架
     *
     * @param inspireSourceId
     * @param onlineSaleItemId
     */
    fun pushAidcOnline(inspireSourceId: Long, onlineSaleItemId: Long)
}