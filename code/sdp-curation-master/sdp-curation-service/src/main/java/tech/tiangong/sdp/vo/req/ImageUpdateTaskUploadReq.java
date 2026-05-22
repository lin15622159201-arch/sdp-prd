package tech.tiangong.sdp.vo.req;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.util.List;

/**
 * 上传图片/视频
 *
 * @author ：liuhongfu
 * @version :1.0
 * @date ：2025/11/3 18:52
 */
@Data
public class ImageUpdateTaskUploadReq implements Serializable {


    /**
     * 图片任务ID
     */
    private Long taskId;


    /**
     * skc-图片信息
     */
    @NotEmpty(message = "skc不能为空")
    private List<Skc> skc;

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static class Skc implements Serializable {

        /**
         * skc-ID
         */
        private Long skcId;

        /**
         *  当前图片信息
         */
        private List<String> currentPictures;

        /**
         *  更新内容-图片数组信息
         */
        @NotEmpty(message = "图片不能为空")
        @Size(max = 10, message = "图片不能超过10")
        private List<String> pictures;
    }


}
