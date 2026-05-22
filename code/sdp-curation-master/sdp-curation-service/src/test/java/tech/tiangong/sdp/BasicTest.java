package tech.tiangong.sdp;

import cn.hutool.core.util.StrUtil;
import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.springframework.boot.test.context.SpringBootTest;
import team.aikero.blade.auth.UserContexts;
import team.aikero.blade.user.entity.CurrentUser;
import team.aikero.blade.user.holder.DefaultCurrentUserContentSetter;
import team.aikero.blade.util.json.JsonsKt;

import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

/**
 * 单元测试
 *
 * @author ：qinwenxuan@zj.tech
 * @version :1.0
 * @date ：2025/11/5 10:32
 */
@SpringBootTest(
        classes = SdpApplication.class,
        properties = "spring.profiles.active=qa-xiniu"
)
@Slf4j
public class BasicTest {
    @BeforeEach
    void setUp() {
        DefaultCurrentUserContentSetter.INSTANCE.set(
                new CurrentUser(151240195L, "覃文轩", "", 1L, false, -1L));
    }

    @AfterEach
    void tearDown() {
        DefaultCurrentUserContentSetter.INSTANCE.clean();
    }

    protected void print(final Object data) {
        Optional.ofNullable(data)
                .ifPresentOrElse(it -> log.info("单元测试\t{}", JsonsKt.toJsonPretty(it)),
                        () -> log.error("单元测试,结果为空"));
        ;
    }
    protected void withSystemUser(final Runnable fn) {
        UserContexts.withSystemUser(fn) ;
    }
    /**
     * 从文件读取 DDL
     */
    private static String getDDLFromFile(String filePath) {
        StringBuilder content = new StringBuilder();
        try (BufferedReader reader = new BufferedReader(new FileReader(filePath))) {
            String line;
            while ((line = reader.readLine()) != null) {
                content.append(line).append("\n");
            }
        } catch (IOException e) {
            System.err.println("读取文件失败: " + e.getMessage());
            // 如果文件不存在，使用默认的 DDL
           return "";
        }
        return content.toString();
    }

    static List<String> extractTableNames(String ddl) {
        List<String> tableNames = new ArrayList<>();

        // 正则表达式匹配 CREATE TABLE 语句
        // 匹配模式：create table 表名 ( 或 CREATE TABLE 表名 (
        Pattern pattern = Pattern.compile(
                "(?i)create\\s+table\\s+(?:if\\s+not\\s+exists\\s+)?[`]?([a-zA-Z_][a-zA-Z0-9_]*)[`]?\\s*\\(",
                Pattern.CASE_INSENSITIVE | Pattern.MULTILINE
        );

        Matcher matcher = pattern.matcher(ddl);

        while (matcher.find()) {
            String tableName = matcher.group(1);
            if (!tableNames.contains(tableName)) {
                tableNames.add(tableName);
            }
        }

        return tableNames;
    }
}
