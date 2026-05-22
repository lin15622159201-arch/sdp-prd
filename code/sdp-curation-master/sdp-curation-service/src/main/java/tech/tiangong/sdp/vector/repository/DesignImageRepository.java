package tech.tiangong.sdp.vector.repository;

import com.aliyun.dashvector.DashVectorCollection;
import com.aliyun.dashvector.models.Doc;
import com.aliyun.dashvector.models.DocOpResult;
import com.aliyun.dashvector.models.Vector;
import com.aliyun.dashvector.models.requests.DeleteDocRequest;
import com.aliyun.dashvector.models.requests.InsertDocRequest;
import com.aliyun.dashvector.models.requests.QueryDocRequest;
import com.aliyun.dashvector.models.responses.Response;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Repository;
import tech.tiangong.sdp.enums.DesignVectorEnum;
import tech.tiangong.sdp.vector.VectorContext;

import java.util.List;

/**
 * 款式图片
 *
 * @author ：qinwenxuan@zj.tech
 * @version :1.0
 * @date ：2026/3/4 10:13
 */
@Repository
@AllArgsConstructor
public class DesignImageRepository {
    private final DashVectorRepository dashVectorRepository;
    private static final String PARTITION = DesignVectorEnum.PARTITION.getCode();

    public Response<List<DocOpResult>> insert(final List<Doc> docs) {
        return this.imageCollection().insert(
                InsertDocRequest.builder()
                        .docs(docs)
                        // 指定分区
                        .partition(PARTITION)
                        .build()
        );
    }

    public Response<List<Doc>> listByVector(final List<Float> data, final Integer top, final Boolean includeVector) {
        return this.imageCollection().query(
                QueryDocRequest.builder()
                        // 向量查询
                        .vector(Vector.builder().value(data).build())
                        // 返回条数,最多1024
                        .topk(top)
                        // 是否返回向量
                        .includeVector(includeVector)
                        // 指定分区
                        .partition(PARTITION)
                        .build());
    }

    public Response<List<Doc>> listById(final String id, final Integer top, final Boolean includeVector) {
        return this.imageCollection().query(
                QueryDocRequest.builder()
                        .id(id)
                        // 返回条数,最多1024
                        .topk(top)
                        // 是否返回向量
                        .includeVector(includeVector)
                        // 指定分区
                        .partition(PARTITION)
                        .build());
    }

    public Response<List<DocOpResult>> delete(final String id) {
        return this.imageCollection().delete(
                DeleteDocRequest.builder()
                        .id(id)
                        // 指定分区
                        .partition(PARTITION)
                        .build());
    }

    private DashVectorCollection imageCollection() {
        return dashVectorRepository.getCollection(dashVectorRepository.collectionName(VectorContext.get()));
    }
}
