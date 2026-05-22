package tech.tiangong.sdp.external;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import team.aikero.blade.core.protocol.DataResponse;
import team.aikero.blade.core.protocol.PageVo;
import team.aikero.blade.uacs.sdk.vo.UserVo;
import tech.tiangong.sdp.vo.req.yoc.YocUserQueryPageReq;

/**
 * uacs用户
 *
 * @version :1.0
 */
@FeignClient(
        contextId = "userClient",
        name = "uacs-service",
        path = "/uacs",
        url = "${domain.nest-api}"
)
public interface UacsUserClient {

    /**
     * 分页查询
     */
    @PostMapping("/api/user-query/findPage")
    DataResponse<PageVo<UserVo>> findPage(@RequestBody YocUserQueryPageReq req);

    /**
     * 分页查询-指定租户
     */
    @PostMapping("/inner/user/findPageByTenantId")
    DataResponse<PageVo<UserVo>> findPageByTenantId(@RequestBody YocUserQueryPageReq req);

    // /**
    //  * 分页查询-带组织Id
    //  */
    // @PostMapping("/inner/organization/findUserPage")
    // DataResponse<PageVo<UserVo>> findUserPage(@RequestParam Long id, @RequestBody YocUserQueryPageReq req);

}
