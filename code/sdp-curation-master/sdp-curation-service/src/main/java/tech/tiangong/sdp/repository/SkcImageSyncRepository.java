package tech.tiangong.sdp.repository;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import org.springframework.stereotype.Repository;
import team.aikero.blade.core.enums.Bool;
import tech.tiangong.sdp.entity.SkcImageSync;
import tech.tiangong.sdp.mapper.SkcImageSyncMapper;

import java.util.List;

/**
 * SKC图片导入同步记录表 Repository
 *
 * @author : qinwenxuan@zj.tech
 * @version : 1.0
 * @date : 2025/8/13 16:20
 */
@Repository
public class SkcImageSyncRepository extends ManualBaseRepository<SkcImageSyncMapper, SkcImageSync> {
    public List<SkcImageSync> uploads() {
        return this.list(new LambdaQueryWrapper<SkcImageSync>()
                .eq(SkcImageSync::getDeleted, Bool.NO.getCode())
                .in(SkcImageSync::getUploadStatus, List.of(0))
                .orderByAsc(SkcImageSync::getCreatedTime)
                .last(" LIMIT 1024")

        )
                ;
    }

    public List<SkcImageSync> listBySkcCode(final String skcCode) {
        return this.list(new LambdaQueryWrapper<SkcImageSync>()
                .eq(SkcImageSync::getDeleted, Bool.NO.getCode())
                .in(SkcImageSync::getSkcCode, List.of(skcCode))
                .orderByAsc(SkcImageSync::getCreatedTime)
                .last(" LIMIT 1024")

        )
                ;
    }

    public List<SkcImageSync> syncs() {
        return this.list(new LambdaQueryWrapper<SkcImageSync>()
                .eq(SkcImageSync::getDeleted, Bool.NO.getCode())
                .in(SkcImageSync::getUploadStatus, List.of(1))
                .in(SkcImageSync::getSyncStatus, List.of(0))
                .orderByAsc(SkcImageSync::getCreatedTime)
                .last(" LIMIT 1024")

        );
    }

    public List<SkcImageSync> syncs(List<String> skcCodes) {
        return this.list(new LambdaQueryWrapper<SkcImageSync>()
                .eq(SkcImageSync::getDeleted, Bool.NO.getCode())
                .in(SkcImageSync::getSkcCode, skcCodes)
                .in(SkcImageSync::getUploadStatus, List.of(1))
                .in(SkcImageSync::getSyncStatus, List.of(0))
                .orderByAsc(SkcImageSync::getCreatedTime)
        );
    }
}
