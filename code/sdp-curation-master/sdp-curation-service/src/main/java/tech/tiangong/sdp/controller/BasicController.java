package tech.tiangong.sdp.controller;

import jakarta.servlet.http.HttpServletRequest;
import team.aikero.blade.auth.UserContexts;
import team.aikero.blade.core.protocol.DataResponse;
import team.aikero.blade.core.protocol.DataResponseExtKt;
import team.aikero.blade.core.protocol.PageVo;
import team.aikero.blade.feign.util.MockUserExecutorKt;
import tech.tiangong.sdp.utils.UserInvoke;

import java.util.List;
import java.util.function.Supplier;

/**
 * 基础Controller
 *
 * @author : qinwenxuan@zj.tech
 * @version : 1.0
 * @date : 2025/8/19 10:30
 */
public interface BasicController {
    default <T> DataResponse<T> one(final Supplier<T> fn) {
        return DataResponseExtKt.ok(fn.get());
    }

    default <T> DataResponse<PageVo<T>> page(final Supplier<PageVo<T>> fn) {
        return DataResponseExtKt.ok(fn.get());
    }

    default <T> DataResponse<List<T>> list(final Supplier<List<T>> fn) {
        return DataResponseExtKt.ok(fn.get());
    }

    default void non(final Runnable fn) {
        fn.run();
    }

    default void job(final Runnable fn) {
        UserContexts.withSystemUser(fn);
    }

    default <T> DataResponse<T> callback(final HttpServletRequest httpServletRequest, final Supplier<T> fn) {
        return UserInvoke.INSTANCE.doAction(httpServletRequest, () -> mockUser(fn));
    }

    default <T> DataResponse<T> mockUser(final Supplier<T> fn) {
        return MockUserExecutorKt.mockUserExecWithResult(() -> DataResponseExtKt.ok(fn.get()));
    }
}
