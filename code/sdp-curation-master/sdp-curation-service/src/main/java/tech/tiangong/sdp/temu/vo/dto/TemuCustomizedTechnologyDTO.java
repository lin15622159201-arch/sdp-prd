package tech.tiangong.sdp.temu.vo.dto;

import lombok.Data;

import java.util.List;

/**
 * TemuCustomizedTechnologyDTO
 *
 * @author ：qinwenxuan@zj.tech
 * @version :1.0
 * @date ：2026/1/4 17:06
 */
@Data
public class TemuCustomizedTechnologyDTO {
    /**
     * 二级工艺列表
     * 20001: 激光雕刻-文字 , 20002: 激光雕刻-图片 , 20003: 机械雕刻-文字 , 20004: 机械雕刻-图片 , 20005: 焊接 ,
     * 20006: 蚀刻 , 20007: UV , 20008: 丝网印刷-文字 , 20009: 丝网印刷-图片 , 20010: 喷漆 ,
     * 20011: 滴油 , 20012: 滴胶-文字 , 20013: 滴胶-图片 , 20014: 激光切割-文字 , 20015: 激光切割-图片 ,
     * 20016: 镶钻 , 20017: 烫金-文字 , 20018: 烫金-图片 , 20019: 锡金 , 20020: 热转印-文字 ,
     * 20021: 热转印-图片 , 20022: 刺绣 , 20023: 植绒 , 20024: 电镀 , 20025: 烫画-文字 ,
     * 20026: 烫画-图片 , 20027: 数码直喷 , 20033: 压印 , 20034: 美甲手绘 , 20035: 机织图案-胶贴
     * 20036: 烫钻 , 20037：手绘 , 20038: 水转印印刷
     */
    private List<Integer> twiceType;

    /**
     * 一级工艺
     * 10001：基础工艺，10002：木制品定制工艺，10003：金属制品定制工艺，10004：皮具/布艺定制工艺，
     * 10005：有机材料（亚克力/树脂等）定制工艺，10006：画布/纸张定制工艺
     */
    private Integer firstType;

    /**
     * 工艺类型，1：单一工艺，2：组合工艺
     */
    private Integer technologyType;
}
