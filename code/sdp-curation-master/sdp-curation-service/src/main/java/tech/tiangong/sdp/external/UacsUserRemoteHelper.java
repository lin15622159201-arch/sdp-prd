package tech.tiangong.sdp.external;

import cn.hutool.core.collection.CollUtil;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import team.aikero.blade.core.exception.BusinessException;
import team.aikero.blade.core.protocol.PageVo;
import team.aikero.blade.uacs.sdk.client.UserClient;
import team.aikero.blade.uacs.sdk.vo.UserVo;
import team.aikero.blade.util.json.JsonsKt;
import tech.tiangong.sdp.vo.req.yoc.YocUserQueryPageReq;

import java.util.Collections;
import java.util.List;


@Service
@Slf4j
@AllArgsConstructor
public class UacsUserRemoteHelper {

    private final UserClient userClient;
    private final UacsUserClient uacsUserClient;


    /**
     * 根据名称列表查询用户信息
     *
     */
    public List<UserVo> findByNames(List<String> names) {
        if (CollUtil.isEmpty(names)) {
            return Collections.emptyList();
        }
        try {
            final var response = userClient.findByNames(names);
            log.debug("=== uacs用户查询 response:{}", JsonsKt.toJsonPretty(response));
            if (!response.getSuccessful()) {
                throw new BusinessException("uacs用户查询失败:" + response.getMessage());
            }
            return response.getData();
        } catch (Exception e) {
            throw new BusinessException("uacs用户查询失败:" + e.getMessage(), e);
        }
    }

    public PageVo<UserVo> findPageByTenantId(YocUserQueryPageReq req) {
        try {
            final var response = uacsUserClient.findPageByTenantId(req);
            log.debug("=== uacs用户查询 response:{}", JsonsKt.toJsonPretty(response));
            if (!response.getSuccessful()) {
                throw new BusinessException("uacs用户查询失败:" + response.getMessage());
            }
            return response.getData();
        } catch (Exception e) {
            throw new BusinessException("uacs用户查询失败:" + e.getMessage(), e);
        }
    }
}
