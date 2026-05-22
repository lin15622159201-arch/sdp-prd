package tech.tiangong.sdp.convert.typehandler;

import com.baomidou.mybatisplus.extension.handlers.AbstractJsonTypeHandler;
import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringUtils;
import org.apache.ibatis.type.JdbcType;
import org.apache.ibatis.type.MappedJdbcTypes;
import org.apache.ibatis.type.MappedTypes;
import org.springframework.util.CollectionUtils;
import tech.tiangong.sdp.vo.resp.ColorInfoVo;

import java.util.Collections;
import java.util.List;


/**
 * @author : chendecheng
 */
@Slf4j
@MappedTypes({List.class})
@MappedJdbcTypes(JdbcType.VARCHAR)
public class ColorInfoVoTypeHandler extends AbstractJsonTypeHandler<List<ColorInfoVo>> {

    private static final Gson GSON = new Gson();

    public ColorInfoVoTypeHandler(Class<?> type) {
        super(type);
    }

    @Override
    public List<ColorInfoVo> parse(String json) {
        if (StringUtils.isBlank(json)) {
            return Collections.emptyList();
        }
        return GSON.fromJson(json, new TypeToken<List<ColorInfoVo>>() {}.getType());
    }

    @Override
    public String toJson(List<ColorInfoVo> obj) {
        if (CollectionUtils.isEmpty(obj)) {
            return null;
        }
        return GSON.toJson(obj);
    }
}
