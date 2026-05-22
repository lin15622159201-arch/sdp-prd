package tech.tiangong.sdp.convert;

import cn.hutool.core.collection.CollectionUtil;
import cn.hutool.core.util.StrUtil;
import com.aliyun.dashvector.models.Doc;
import com.aliyun.dashvector.models.Vector;
import lombok.experimental.UtilityClass;
import team.aikero.blade.core.enums.Bool;
import team.aikero.blade.util.json.JsonsKt;
import tech.tiangong.sdp.entity.*;
import tech.tiangong.sdp.enums.DesignVectorEnum;
import tech.tiangong.sdp.enums.DesignVectorTypeEnum;
import tech.tiangong.sdp.enums.DevelopStyleTypeEnum;
import tech.tiangong.sdp.vo.dto.DesignImageAddDTO;
import tech.tiangong.sdp.vo.dto.DesignImageDTO;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

/**
 * 款式图片工具类
 *
 * @author ：qinwenxuan@zj.tech
 * @version :1.0
 * @date ：2026/3/4 11:07
 */
@UtilityClass
public class DesignImageConvert {
    public Doc convert(final DesignImageAddDTO dto) {
        final var id = BasicConvert.idStr();
        dto.setId(id);
        return Doc.builder()
                .id(id)
                // 向量
                .vector(Vector.builder().value(dto.getData()).build())
                // 预设值
                .field(DesignVectorEnum.IMAGE_ID.getCode(), Objects.toString(dto.getImageId()))
                .field(DesignVectorEnum.SKC_CODE.getCode(), dto.getSkcCode())
                .field(DesignVectorEnum.SKC_ID.getCode(), Objects.toString(dto.getSkcId()))
                .field(DesignVectorEnum.TYPE.getCode(), dto.getType())
                .build();
    }

    public DesignImageDTO convert(final Doc doc) {
        final var dto = new DesignImageDTO();
        dto.setScore(doc.getScore());
        final var fields = doc.getFields();
        Optional.ofNullable(fields.get(DesignVectorEnum.TYPE.getCode()))
                .ifPresent(t -> dto.setType(Objects.toString(t)));
        Optional.ofNullable(fields.get(DesignVectorEnum.SKC_CODE.getCode()))
                .ifPresent(t -> dto.setSkcCode(Objects.toString(t)));
        Optional.ofNullable(fields.get(DesignVectorEnum.SKC_ID.getCode()))
                .ifPresent(t -> dto.setSkcId(Long.valueOf(Objects.toString(t))));
        Optional.ofNullable(fields.get(DesignVectorEnum.IMAGE_ID.getCode()))
                .ifPresent(t -> dto.setImageId(Long.valueOf(Objects.toString(t))));
        return dto;
    }

    public SkcImageVector convert(final DevelopStyleTask task) {
        final var e = getImageVector(task.getMulfeatExtracts(), task.getStyleType(), task.getTaskId());
        task.setImageVectorId(e.getImageId());
        return e;
    }

    public List<DesignImageAddDTO> convert(final SkcImageVector vector) {
        final var list = new ArrayList<DesignImageAddDTO>();
        if (StrUtil.isNotBlank(vector.getUpFeat())) {
            final var data = JsonsKt.parseJsonList(vector.getUpFeat(), Float.class);
            if (CollectionUtil.isNotEmpty(data)) {
                final var up = obtainImageAdd(vector);
                up.setType(DesignVectorTypeEnum.UP.getCode());
                up.setData(data);
                list.add(up);
            }
        }
        if (StrUtil.isNotBlank(vector.getDownFeat())) {
            final var data = JsonsKt.parseJsonList(vector.getDownFeat(), Float.class);
            if (CollectionUtil.isNotEmpty(data)) {
                final var down = obtainImageAdd(vector);
                down.setType(DesignVectorTypeEnum.DOWN.getCode());
                down.setData(data);
                list.add(down);
            }
        }
        if (StrUtil.isNotBlank(vector.getFullFeat())) {
            final var data = JsonsKt.parseJsonList(vector.getFullFeat(), Float.class);
            if (CollectionUtil.isNotEmpty(data)) {
                final var full = obtainImageAdd(vector);
                full.setType(DesignVectorTypeEnum.FULL.getCode());
                full.setData(data);
                list.add(full);
            }
        }
        if (StrUtil.isNotBlank(vector.getWholeFeat())) {
            final var data = JsonsKt.parseJsonList(vector.getWholeFeat(), Float.class);
            if (CollectionUtil.isNotEmpty(data)) {
                final var whole = obtainImageAdd(vector);
                whole.setType(DesignVectorTypeEnum.WHOLE.getCode());
                whole.setData(data);
                list.add(whole);
            }
        }
        return list;
    }

    public SkcImageVector convert(final SpotStyleTask task) {
        final var skc = task.getSkcs().getFirst();
        final var e = getImageVector(task.getMulfeatExtracts(), DevelopStyleTypeEnum.SPOT_STYLE.getCode(), 0L);
//        e.setImageId(skc.getSkcId());
        e.setSkcCode(skc.getSkcCode());
        e.setSkcId(skc.getSkcId());
        e.setSpuId(task.getTaskId());
        e.setSpuCode(task.getTaskCode());
        return e;
    }

    public SkcImageVector convertDesignStyle(final DesignStyle designStyle) {
        final var skc = designStyle.getSkcs().getFirst();
        final var e = getImageVector(designStyle.getMulfeatExtracts(), designStyle.getStyleType(), 0L);
        //e.setImageId(skc.getPrototypeId());
        e.setSkcCode(skc.getDesignCode());
        e.setSkcId(skc.getPrototypeId());
        e.setSpuId(designStyle.getDesignStyleId());
        e.setSpuCode(designStyle.getStyleCode());
        return e;
    }


    private SkcImageVector getImageVector(final List<MulfeatExtractTask> task, final String styleType,
                                          final Long developTaskId) {
        final var e = new SkcImageVector();
        BasicConvert.entityInit(e);
        final var feat = task.getFirst();
        e.setImageId(feat.getTaskId());
        e.setImageUrl(feat.getInputImg());
        e.setStyleType(styleType);
        e.setDevelopTaskId(developTaskId);
        e.setSyncStatus(Bool.NO.getCode());
        e.setDownFeat(feat.getDownFeat());
        e.setUpFeat(feat.getUpFeat());
        e.setFullFeat(feat.getFullFeat());
        e.setWholeFeat(feat.getWholeFeat());
        return e;
    }

    private DesignImageAddDTO obtainImageAdd(final SkcImageVector vector) {
        final var d = new DesignImageAddDTO();
        d.setImageId(vector.getImageId());
        d.setSkcId(vector.getSkcId());
        d.setSkcCode(vector.getSkcCode());
        return d;
    }
}
