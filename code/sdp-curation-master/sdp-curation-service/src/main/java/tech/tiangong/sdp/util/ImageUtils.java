package tech.tiangong.sdp.util;

import cn.hutool.core.io.FileUtil;
import cn.hutool.extra.spring.SpringUtil;
import lombok.experimental.UtilityClass;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.util.StreamUtils;
import org.springframework.web.client.RestTemplate;
import team.aikero.blade.core.exception.BusinessException;
import team.aikero.blade.oss.OssTemplate;
import tech.tiangong.sdp.config.FileProperties;

import java.io.*;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

/**
 * 图片工具类
 *
 * @author ：qinwenxuan@zj.tech
 * @version :1.0
 * @date ：2026/1/5 16:01
 */
@UtilityClass
@Slf4j
public class ImageUtils {
    private final RestTemplate restTemplate = SpringUtil.getBean("restTemplate", RestTemplate.class);
    private final FileProperties fileProperties = SpringUtil.getBean("fileProperties", FileProperties.class);
    private final OssTemplate ossTemplate = SpringUtil.getBean("ossTemplate", OssTemplate.class);

    public byte[] download(final String url) {
        final var headers = new HttpHeaders();
        headers.set("User-Agent", "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36");
        headers.set("Accept", "image/*, */*");
        headers.set("Accept-Language", "zh-CN,zh;q=0.9,en;q=0.8");
        headers.set("Connection", "keep-alive");
        return download(url, headers);
    }


    public byte[] downloadWithCookie(final String url) {
        final var headers = new HttpHeaders();
        headers.set("User-Agent", "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36");
        headers.set("Accept", "image/*, */*");
        headers.set("Accept-Language", "zh-CN,zh;q=0.9,en;q=0.8");
        headers.set("Connection", "keep-alive");
        // 飞书的Cookie,因为飞书的图片下载必须登录
        headers.set("cookie",
                "passport_web_did=7534540021305671681; passport_trace_id=7534540021324333058; QXV0aHpDb250ZXh0=868dbb113461472e8124a3781af97131; is_anonymous_session=; lang=zh; i18n_locale=zh; locale=zh-CN; session=XN0YXJ0-f81q1c24-6b1f-4df0-a803-5e3682ad2183-WVuZA; session_list=XN0YXJ0-f81q1c24-6b1f-4df0-a803-5e3682ad2183-WVuZA; __tea__ug__uid=7534540019413108263; Hm_lvt_a79616d9322d81f12a92402ac6ae32ea=1765850993; landing_url=https://www.feishu.cn/product/base; _uetvid=8382d150c12711f0ada929f532374514; _ga=GA1.1.1999640071.1754271803; _ga_VPYRHN104D=GS2.1.s1765850993$o11$g1$t1765851290$j59$l0$h0; s_v_web_id=verify_mkm0etcb_gE6xKpEz_Drcp_4xtW_BYXC_THKK3v0q0H2V; _csrf_token=39e8834a1ef82a531f1ee23f28e25be54ae391bb-1772938268; swp_csrf_token=2708e2a7-99b8-46b1-9229-77cd48b6e9b9; t_beda37=2b0c4a4c0de321ae47c4a52629ad17f1c512500c5f3376bf72e4a7d18b1443ee; sl_session=eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3NzMyNTk3NDksInVuaXQiOiJldV9uYyIsInJhdyI6eyJtZXRhIjoiQVdCTzI5TkRRSUFDWFZZOGV6U0FBUTFva0JBNnkrT0FBV2lRRURyTDQ0QUJhSkFRUmlUQ0FBRUNLZ0VBUVVGQlFVRkJRVUZCUVVKdmJsbGlZa0pXVFVGQmR6MDkiLCJzdW0iOiI2OGFkOTM2YWVlYTBjM2JiNmUxNmY5NDYyZWMxNzhkNWY0ZWVlMDI1MDE0NWE4ZDIzNWM3MzZkYjhkZWQyMTY0IiwibG9jIjoiemhfY24iLCJhcGMiOiIiLCJpYXQiOjE3NzMyMTY1NDksInNhYyI6eyJVc2VyU3RhZmZTdGF0dXMiOiIxIiwiVXNlclR5cGUiOiI0MiJ9LCJsb2QiOm51bGwsIm5zIjoibGFyayIsIm5zX3VpZCI6IjY5Mzk3MjU3NzYyMzczOTU5NzAiLCJuc190aWQiOiI2NzI1NjI5NTkzMzgzODYyNTQxIiwib3QiOjEsImN0IjoxNzU1MTU0MTM5LCJydCI6MTc3MzE0NjIyOX19.Ma3Fju_d9315Q08bgTol14_IUQrg3x_FBoy33Tk8LyZW960nqvEOE_zEvJCnYxrkNwGsvecD3bWvzXjYrkGflw");
        return download(url, headers);
    }

    public String upload(final byte[] data, final String name) {
        return ossTemplate.upload(name, new ByteArrayInputStream(data));
    }

    public String downloadVideo(final String url) {
        final var path = fileProperties.getVideoDirection() + "tmp_" + FileUtil.getName(url);
        restTemplate.execute(
                url,
                HttpMethod.GET,
                it -> {
                    final var headers = it.getHeaders();
                    headers.set("User-Agent", "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36");
                    headers.set("Accept", "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7");
                    headers.set("Accept-Language", "zh-CN,zh;q=0.9,en;q=0.8");
                    headers.set("Connection", "keep-alive");
                },
                it -> {
                    try (final InputStream in = it.getBody();
                         final OutputStream out = new FileOutputStream(path)) {
                        StreamUtils.copy(in, out);
                        return path;
                    }
                }
        );
        return path;
    }

    public void removeFile(final String path) {
        try {
            Files.delete(Path.of(path));
        } catch (IOException e) {
            log.error("删除文件失败\t{}", e.getMessage(), e);
        }
    }

    public void initDirection() {
        try {
            Files.createDirectories(Paths.get(fileProperties.getVideoDirection()));
            log.info("初始化文件目录\t{}", fileProperties.getVideoDirection());
        } catch (IOException e) {
            log.error("初始化文件目录失败\t{}", e.getMessage(), e);
        }
    }

    private byte[] download(final String url, final HttpHeaders headers) {
        final var response = restTemplate.exchange(
                url,
                HttpMethod.GET,
                new HttpEntity<>(headers),
                byte[].class
        );
        if (response.getStatusCode() != HttpStatus.OK) {
            log.error("下载图片失败\t{},\t{}", url, response.getStatusCode());
            throw new BusinessException("HTTP请求失败，状态码: " + response.getStatusCode());
        }
        return response.getBody();
    }
}
