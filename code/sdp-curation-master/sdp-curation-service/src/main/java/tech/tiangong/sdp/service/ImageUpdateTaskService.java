package tech.tiangong.sdp.service;


import team.aikero.blade.core.protocol.PageVo;
import tech.tiangong.sdp.vo.dto.ImageUpdateTaskDTO;
import tech.tiangong.sdp.vo.dto.ImageUpdateTaskGroupDTO;
import tech.tiangong.sdp.vo.req.*;
import tech.tiangong.sdp.vo.resp.ImageUpdateTaskDetailResp;
import tech.tiangong.sdp.vo.resp.ImageUpdateTaskPageResp;
import java.util.List;

/**
 * 图片修复任务Service
 *
 * @author ：liuhongfu
 * @version :1.0
 * @date ：2025/11/4 15:17
 */
public interface ImageUpdateTaskService  {

    PageVo<ImageUpdateTaskPageResp> page(final ImageUpdateTaskPageReq req);

    List<ImageUpdateTaskGroupDTO> stateTotal(final ImageUpdateTaskPageReq req);

    Boolean batchCreate(final List<ImageUpdateTaskAddReq> req);

    Boolean batchUpload(List<ImageUpdateTaskUploadReq> req);

    Boolean batchCheck(List<ImageUpdateTaskCheckReq> req);

    Boolean resubmit(List<Long> taskIds);

    Boolean cancel(List<Long> taskIds);

    ImageUpdateTaskDetailResp detail(Long taskId);

    Boolean edit(List<ImageUpdateTaskEditReq> req);

    List<ImageUpdateTaskDTO>  selectBySpu(ImageUpdateQueryReq req);

    void refreshSkcPicture(List<String> styleCodes);
}
