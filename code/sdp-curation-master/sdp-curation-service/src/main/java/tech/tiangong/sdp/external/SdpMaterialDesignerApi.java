package tech.tiangong.sdp.external;

import cn.hutool.core.collection.CollectionUtil;
import cn.hutool.core.util.StrUtil;
import cn.hutool.extra.spring.SpringUtil;
import lombok.experimental.UtilityClass;
import lombok.extern.slf4j.Slf4j;
import team.aikero.blade.auth.UserContexts;
import tech.tiangong.sdp.convert.BasicConvert;
import tech.tiangong.sdp.utils.SsoContext;
import tech.tiangong.sdp.vo.dto.DesignerDTO;
import tech.tiangong.sdp.vo.req.DesignerRemoteReq;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

/**
 * SdpMaterialDesigner
 *
 * @author ：qinwenxuan@zj.tech
 * @version :1.0
 * @date ：2025/11/5 10:58
 */
@Slf4j
@UtilityClass
public class SdpMaterialDesignerApi {
    private final SdpMaterialDesignerClient materialDesignerClient = SpringUtil.getBean(SdpMaterialDesignerClient.class);

    public static boolean designer() {
        final var data = listDesignerGroup();
        if (CollectionUtil.isEmpty(data)) {
            return false;
        }
        final var set = data.stream().map(DesignerDTO::getDesignerId).collect(Collectors.toSet());
        return set.contains(SsoContext.userId());
    }

    public List<DesignerDTO> listDesignerGroup() {
        return getDesigners(new DesignerRemoteReq());
    }

    /**
     * 同组设计师
     *
     * @return 同组设计师
     */
    public List<Long> listDesignerIds() {
        final var data = listDesignerGroup();
        if (CollectionUtil.isEmpty(data)) {
            return Collections.emptyList();
        }
        final var userId = SsoContext.userId();
        final var designers = data.stream()
                .filter(it -> Objects.equals(userId, it.getDesignerId())).collect(Collectors.toList());
        if (CollectionUtil.isEmpty(designers)) {
            return Collections.emptyList();
        }
        final var designerGroupCode = designers.getFirst().getDesignerGroupCode();
        log.info("同组设计师,当前登录人:\t{},设计师组:\t{}", userId, designerGroupCode);
        return data.stream().filter(it -> StrUtil.equalsIgnoreCase(designerGroupCode, it.getDesignerGroupCode()))
                .map(DesignerDTO::getDesignerId).collect(Collectors.toList());
    }

    /**
     * 通过设计组编码查询
     *
     * @return 设计师数组
     */
    public List<Long> listDesignerGroupCodes(List<String> designerGroupCodeList) {
        final var data = listDesignerGroup();
        if (CollectionUtil.isEmpty(data)) {
            return Collections.emptyList();
        }
        log.info("设计师组信息:\t{}", designerGroupCodeList);
        return data.stream()
                .filter(it -> designerGroupCodeList.stream()
                        .anyMatch(code -> StrUtil.equalsIgnoreCase(code, it.getDesignerGroupCode())))
                .map(DesignerDTO::getDesignerId)
                .collect(Collectors.toList());
    }

    public List<DesignerDTO> selectByDesignerName(String designerName) {
        final var req = new DesignerRemoteReq();
        req.setDesignerName(designerName);
        return getDesigners(req);
    }

    public List<DesignerDTO> selectByDesignerIds(List<String> designerIds) {
        final var req = new DesignerRemoteReq();
        req.setDesignerIdList(designerIds);
        return getDesigners(req);
    }

    private List<DesignerDTO> getDesigners(final DesignerRemoteReq req) {
        final List<DesignerDTO> list = new ArrayList<>();
        UserContexts.withSystemUser(() -> {
                    final var data = BasicConvert.invoke("查询设计师失败", () -> materialDesignerClient.designerInfoList(req));
                    if (CollectionUtil.isNotEmpty(data)) {
                        list.addAll(data);
                    }
                }
        );
        return list;
    }

}
