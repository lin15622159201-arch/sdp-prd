package tech.tiangong.sdp.external

import org.apache.commons.collections4.CollectionUtils
import org.apache.commons.lang3.StringUtils
import org.springframework.stereotype.Component
import team.aikero.admin.common.req.DictCodeReq
import team.aikero.admin.common.req.DictTreeReq
import team.aikero.admin.common.vo.DictVo
import team.aikero.admin.sdk.client.DictClient
import team.aikero.blade.logging.core.annotation.Slf4j
import team.aikero.blade.logging.core.annotation.Slf4j.Companion.log
import team.aikero.blade.util.json.toJson
import tech.tiangong.sdp.enums.DictEnum

/**
 * 字典
 * @author zjh
 * @date 2024-12-8 10:53:40
 */
@Slf4j
@Component
class DictClientExternal(
    private val dictClient: DictClient,
) {
    // 字典使用方
    private val consumerCode = "SDP"

    /**
     * 获取字典
     * @param dictEnum 字典 code
     * @param dictCode 字典值 code
     * @return 字典对象
     */
    fun getByDictCode(dictEnum: DictEnum, dictCode: String): DictVo? {
        if (StringUtils.isBlank(dictCode)) {
            log.warn { "获取字典失败, 入参 dictCode 为空" }
            return null
        }

        try {

            val req = DictCodeReq(
                dictCode = dictCode,
                category = dictEnum.dictCode,
                belongCode = "",
                consumerCode = consumerCode,
            )
            log.info { "请求获取字典，参数: ${req.toJson()}" }
            val dataResponse = dictClient.detailByDictCode(req)
            log.info { "获取字典响应: code=${dataResponse.code}, successful=${dataResponse.successful},response=${dataResponse.data}" }

            if (!dataResponse.successful) {
                throw RuntimeException("编码:" + dictCode + "，获取字典失败: ${dataResponse.message}")
            }

            dataResponse.data?.let {
                log.debug { "获取的字典详细信息: id=${it.id}, name=${it.dictName}" }
                return it
            }
        } catch (e: Exception) {
            log.error { "获取字典失败，错误信息: ${e.message}" }
            throw e
        }
        return null
    }


    /**
     * 获取字典
     * @param dictEnum 字典 code
     * @param dictCode 字典值 code
     * @return 字典对象
    fun selectParentByAttribute(code: String, type: String): DictVo? {
    if (StringUtils.isBlank(code)) {
    log.warn { "获取${type}字典失败, 入参 dictCode 为空" }
    return null
    }
    try {
    val req = AttributeReq(
    code = code,
    name = "",
    remark = "",
    )
    log.info { "请求获取${type}字典，参数: ${req.toJson()}" }
    val dataResponse = dictClient.selectParentByAttribute(req)
    log.info { "获取${type}字典响应: code=${dataResponse.code}, successful=${dataResponse.successful},response=${dataResponse.data}" }

    if (!dataResponse.successful) {
    throw RuntimeException("获取${type}字典失败: ${dataResponse.message},品类编码：${code}")
    }
    dataResponse.data?.let {
    log.debug { "获取${type}字典详细信息: id=${it.id}, name=${it.dictName}" }
    return it
    }
    } catch (e: Exception) {
    log.error { "获取${type}字典失败，错误信息: ${e.message}" }
    throw e
    }
    return null
    }
     */
    /**
     * 通过子节点信息查询父节点
     * @param dictEnum 字典 code
     * @param dictCode 字典值 code
     * @return 字典对象

    fun getParentTreeFromLeaf(dictId: Long): DictVo? {

    if (null == dictId) {
    log.warn { "获取字典失败, 入参 dictId为空" }
    return null
    }
    try {
    var req = DictReq(
    dictId = dictId,
    dictCodes = emptyList()
    )
    log.info { "通过子节点信息查询父节点，参数: ${req.toJson()}" }
    val dataResponse = dictClient.getParentTreeFromLeaf(req)
    log.info { "通过子节点信息查询父节点获取字典响应: code=${dataResponse.code}, successful=${dataResponse.successful},response=${dataResponse.data}" }

    if (!dataResponse.successful) {
    throw RuntimeException("通过子节点信息查询父节点获取字典失败: ${dataResponse.message}")
    }
    dataResponse.data?.let {
    log.debug { "通过子节点信息查询父节点获取的字典详细信息: id=${it.id}, name=${it.dictName}" }
    return it
    }
    } catch (e: Exception) {
    log.error { "通过子节点信息查询父节点获取字典失败，错误信息: ${e.message}" }
    throw e
    }
    return null
    }
     */
    /**
     * 通过属性查询字典标签信息
     * @param dictEnum 字典 code
     * @param dictCode 字典值 code
     * @return 字典对象

    fun getLabelByAttribute(code: String): List<DictVo>? {
    if (StringUtils.isBlank(code)) {
    log.warn { "通过属性查询字典标签信息获取字典失败, 入参 code为空" }
    return null
    }
    try {
    var req = AttributeReq(
    code = code,
    name = "",
    remark = "",
    )
    log.info { "通过属性查询字典标签信息查询父节点，参数: ${req.toJson()}" }
    val dataResponse = dictClient.getLabelByAttribute(req)
    log.info { "通过属性查询字典标签信息获取字典响应: code=${dataResponse.code}, successful=${dataResponse.successful},response=${dataResponse.data}" }

    if (!dataResponse.successful) {
    throw RuntimeException("通过属性查询字典标签信息获取字典失败: ${dataResponse.message}")
    }

    dataResponse.data?.let { list ->
    log.info { "通过属性查询字典标签信息查询父节点返回信息: ${list.toJson()}" }
    return list
    }
    } catch (e: Exception) {
    log.error { "通过属性查询字典标签信息获取字典失败，错误信息: ${e.message}" }
    throw e
    }
    return null
    }

     */
    /**
     * 获取字典(批量)
     * @param dictCode 字典代码
     * @return 字典列表
     */
    fun listByDictCode(dictCode: String): DictVo? {
        if (StringUtils.isBlank(dictCode)) {
            log.warn { "获取字典树失败, 入参 dictCode 为空" }
            return null
        }

        try {
            val req = DictCodeReq(
                dictCode = dictCode,
                category = dictCode,
                belongCode = "",
                consumerCode = consumerCode,
            )
            log.info { "请求获取字典树,参数: dictCodes=${req.toJson()}" }

            val dataResponse = dictClient.tree(req)
            log.info { "请求获取字典树,响应: code=${dataResponse.code}, successful=${dataResponse.successful},response=${dataResponse.data}" }

            if (!dataResponse.successful) {
                throw RuntimeException("请求获取字典树失败: ${dataResponse.message}")
            }
            return dataResponse.data
        } catch (e: Exception) {
            log.error { "请求获取字典树失败，错误信息: ${e.message}" }
            throw e
        }
    }

    /**
     * 获取字典
     * @param dictEnum 如字典:企划来源 字典组的code
     * @return
     */
    fun getTopByDictCode(dictEnum: DictEnum): DictVo? {
        return listByDictCode(dictEnum.dictCode)
    }

    /**
     * 通过枚举+第一层name 获取字典
     * @param dictEnum 如字典:企划来源 字典组的code
     * @param firstLevelDictName 如字典:企划来源-Top灵感源 字典值的name(只字典值第一层)
     * @return
     */
    fun getFirstByDictName(dictEnum: DictEnum, firstLevelDictName: String): DictVo? {
        return getTopByDictCode(dictEnum)?.let {
            return it.children?.find { child -> child.dictName == firstLevelDictName }
        }
    }


    /**
     * 批量获取字典
     * @param dictCodes 字典代码
     * @return 字典列表
     */
    fun listByDictCodes(dictCodes: List<String>): List<DictVo>? {
        if (CollectionUtils.isEmpty(dictCodes)) {
            log.warn { "获取字典树失败, 入参 dictCode 为空" }
            return null
        }
        try {
            val req = DictTreeReq(
                dictCodes = dictCodes,
                belongCode = "",
                consumerCode = consumerCode,
            )
            log.info { "请求获取字典树,参数: dictCodes=${req.toJson()}" }

            val dataResponse = dictClient.treeList(req)
            log.info { "请求获取字典树,响应: code=${dataResponse.code}, successful=${dataResponse.successful},response=${dataResponse.data}" }

            if (!dataResponse.successful) {
                throw RuntimeException("请求获取字典树失败: ${dataResponse.message}")
            }
            return dataResponse.data
        } catch (e: Exception) {
            log.error { "请求获取字典树失败，错误信息: ${e.message}" }
            throw e
        }
    }

}
