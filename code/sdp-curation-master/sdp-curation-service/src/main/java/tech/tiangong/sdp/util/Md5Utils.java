package tech.tiangong.sdp.util;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.UnsupportedEncodingException;

/**
 * @author while
 * @date 2024/12/6 10:28
 * <p>
 * copy from: com.alibaba.nacos.common.utils.Md5Utils
 */
public class Md5Utils {
    private static final Logger log = LoggerFactory.getLogger(Md5Utils.class);

    private static final int HEX_VALUE_COUNT = 16;

    public static String getMD5(byte[] bytes) {
        char[] hexDigits = {'0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f'};
        char[] str = new char[16 * 2];
        try {
            java.security.MessageDigest md = java.security.MessageDigest.getInstance("MD5");
            md.update(bytes);
            byte[] tmp = md.digest();
            int k = 0;
            for (int i = 0; i < HEX_VALUE_COUNT; i++) {
                byte byte0 = tmp[i];
                str[k++] = hexDigits[byte0 >>> 4 & 0xf];
                str[k++] = hexDigits[byte0 & 0xf];
            }
        } catch (Exception e) {
            log.error("md5加密失败", e);
        }
        return new String(str);
    }

    public static String getMD5(String value, String encode) {
        String result = "";
        try {
            result = getMD5(value.getBytes(encode));
        } catch (UnsupportedEncodingException e) {
            log.error("md5加密失败", e);
        }
        return result;
    }
}
