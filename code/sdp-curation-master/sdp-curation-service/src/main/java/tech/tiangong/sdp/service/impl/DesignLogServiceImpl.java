package tech.tiangong.sdp.service.impl;

import cn.hutool.core.lang.Assert;
import cn.hutool.core.util.StrUtil;
import com.baomidou.mybatisplus.core.toolkit.Wrappers;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import team.aikero.blade.sequence.id.IdHelper;
import tech.tiangong.sdp.entity.DesignLog;
import tech.tiangong.sdp.entity.Prototype;
import tech.tiangong.sdp.repository.DesignLogRepository;
import tech.tiangong.sdp.repository.PrototypeRepository;
import tech.tiangong.sdp.service.DesignLogService;
import tech.tiangong.sdp.vo.req.DesignLogBizListReq;
import tech.tiangong.sdp.vo.req.DesignLogListReq;
import tech.tiangong.sdp.vo.req.DesignLogReq;
import tech.tiangong.sdp.vo.req.DesignLogSdpSaveReq;
import tech.tiangong.sdp.vo.resp.DesignLogVO;

import javax.validation.ValidationException;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

/**
* 设计打版操作日志
* <br>CreateDate August 10,2021
* @author lujunxuan
* @since 1.0
*/

@Service
public class DesignLogServiceImpl implements DesignLogService {

    @Autowired
    private DesignLogRepository designLogRepository;
    @Autowired
    private PrototypeRepository prototypeRepository;


    @Transactional(rollbackFor = Exception.class)
    @Override
    public void create(DesignLogReq req) {
        Assert.notNull(req.getBizType(),"业务类型不能为空");
        //Assert.notNull(req.getDesignCode(),"设计款号不能为空");

        Prototype prototype = prototypeRepository.getById(req.getBizId());
        Assert.notNull(prototype,"找不到版单！版单={}",req.getBizId());

        DesignLog designLog = new DesignLog();
        BeanUtils.copyProperties(req,designLog);
        designLog.setBizType(req.getBizType().getCode());
        designLog.setDesignLogId(IdHelper.getId());
        designLog.setDesignCode(prototype.getDesignCode());
        designLog.setStyleCode(prototype.getStyleCode());
        designLog.setBizId(prototype.getPrototypeId());

        boolean save = designLogRepository.save(designLog);
        Assert.isTrue(save,"保存日志失败");
    }


    @Override
    public List<DesignLogVO> dateList(DesignLogListReq req) {
        List<DesignLog> list = designLogRepository.list(Wrappers.<DesignLog>lambdaQuery()
                .eq(DesignLog::getBizId, req.getPrototypeId())
                .orderByDesc(DesignLog::getCreatedTime)
                .orderByDesc(DesignLog::getDesignLogId));

        List<DesignLogVO> vos = new ArrayList<>();
        list.forEach(log -> {
            DesignLogVO vo = new DesignLogVO();
            BeanUtils.copyProperties(log, vo);
            vos.add(vo);
        });
        return vos;
    }

    @Override
    public List<DesignLogVO> dateBizList(DesignLogBizListReq req) {
        if (Objects.isNull(req.getBizId()) && StrUtil.isBlank(req.getStyleCode())) {
            throw new ValidationException("入参为空!");
        }
        List<DesignLog> list = designLogRepository.list(Wrappers.<DesignLog>lambdaQuery()
                .eq(Objects.nonNull(req.getBizId()), DesignLog::getBizId, req.getBizId())
                .eq(StrUtil.isNotBlank(req.getStyleCode()), DesignLog::getStyleCode, req.getStyleCode())
                .orderByDesc(DesignLog::getCreatedTime)
                .orderByDesc(DesignLog::getDesignLogId));
        List<DesignLogVO> vos = new ArrayList<>();
        list.forEach(log -> {
            DesignLogVO vo = new DesignLogVO();
            BeanUtils.copyProperties(log, vo);
            vos.add(vo);
        });
        return vos;
    }

    /*@Transactional(rollbackFor = Exception.class)
    @Override
    public void saveDesignLog(DesignLogReq req,PurchasePrototypeInfo purchasePrototypeInfo) {
        Assert.notNull(req.getBizType(),"业务类型不能为空");
        Assert.notNull(req.getDesignCode(),"设计款号不能为空");

        Assert.notNull(purchasePrototypeInfo,"找不到版单！版单={}",req.getDesignCode());

        DesignLog designLog = new DesignLog();
        BeanUtils.copyProperties(req,designLog);
        designLog.setBizType(req.getBizType().getCode());
        designLog.setDesignLogId(IdPool.getId());
        designLog.setDesignCode(purchasePrototypeInfo.getDesignCode());
        designLog.setStyleCode(purchasePrototypeInfo.getStyleCode());

        boolean save = designLogRepository.save(designLog);
        Assert.isTrue(save,"保存日志失败");
    }
*/
    @Override
    @Transactional(rollbackFor = Exception.class)
    public void sdpSave(DesignLogSdpSaveReq req) {
        Assert.notNull(req.getBizId(),"业务id不能为空");
        Assert.notNull(req.getBizType(),"业务类型不能为空");

        DesignLog designLog = new DesignLog();
        BeanUtils.copyProperties(req,designLog);
        designLog.setBizType(req.getBizType().getCode());
        designLog.setDesignLogId(IdHelper.getId());

        boolean save = designLogRepository.save(designLog);
        Assert.isTrue(save,"保存日志失败");
    }



}