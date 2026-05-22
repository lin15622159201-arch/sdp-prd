package tech.tiangong.sdp.vo.resp.yoc;

import lombok.Data;

import java.io.Serializable;

@Data
public class YocUserQueryResp implements Serializable {

    private Long id;

    private String code;

    private String name;

}
