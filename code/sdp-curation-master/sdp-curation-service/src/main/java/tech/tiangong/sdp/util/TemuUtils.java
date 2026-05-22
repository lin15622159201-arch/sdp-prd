package tech.tiangong.sdp.util;

import cn.hutool.core.io.FileUtil;
import cn.hutool.core.util.StrUtil;
import cn.hutool.crypto.SecureUtil;
import lombok.experimental.UtilityClass;
import team.aikero.blade.util.json.JsonsKt;
import tech.tiangong.sdp.enums.TemuCommonFieldEnum;

import java.io.File;
import java.nio.charset.StandardCharsets;
import java.util.*;

/**
 * Temu工具类
 *
 * @author ：qinwenxuan@zj.tech
 * @version :1.0
 * @date ：2025/12/23 16:08
 */
@UtilityClass
public class TemuUtils {
    public String imageBase64(final String url) {
        final var data = ImageUtils.download(url);
        final var base64 = new String(Base64.getEncoder().encode(data), StandardCharsets.UTF_8);
        return "data:" + FileUtil.getMimeType(url) + ";base64," + base64;
    }

    public String sign(final Map<String, Object> params, final String appSecret) {
        params.remove(TemuCommonFieldEnum.SIGN.getCode());
        final Map<String, Object> filteredParams = new HashMap<>();
        for (Map.Entry<String, Object> entry : params.entrySet()) {
            if (Objects.isNull(entry.getValue())) {
                continue;
            }
            if (StrUtil.isBlank(Objects.toString(entry.getValue()))) {
                continue;
            }
            filteredParams.put(entry.getKey(), entry.getValue());
        }
        final List<String> keys = new ArrayList<>(filteredParams.keySet());
        Collections.sort(keys);
        final StringBuilder paramString = new StringBuilder();
        for (String key : keys) {
            paramString.append(key).append(convertToString(filteredParams.get(key)));
        }
        return SecureUtil.md5(appSecret + paramString + appSecret).toUpperCase(Locale.ROOT);
    }

    public String md5(final File dataFile) {
        return SecureUtil.md5(dataFile);
    }

    private String convertToString(Object value) {
        if (value == null) {
            return "";
        }
        try {
            if (value instanceof String) {
                return (String) value;
            }
            String json = JsonsKt.toJson(value);
            if (json.startsWith("\"") && json.endsWith("\"")) {
                return json.substring(1, json.length() - 1);
            }
            return json;
        } catch (Exception e) {
            // 如果转换失败，使用toString方法
            return Objects.toString(value.toString());
        }
    }
}
