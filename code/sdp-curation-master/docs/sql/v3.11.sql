alter table sdp_curation.ai_design_task
    add column sync_category     tinyint(1) comment '是否同步修改灵感识别品类1-是 0-否' after category_name,
    add column ref_weight decimal(5, 2) comment '参考图权重，值越大，参考度越低，建议1~8的浮点数（默认0）' after mode_code;

alter table sdp_curation.picking_ai_design_picture
    add column ultra_hd_picture_url varchar(500) comment '4K图' after picture_url,
    add column ultra_hd_try_times   tinyint comment '生成4K次数' default 0 after picture_url;

alter table sdp_curation.picking_ai_design_result
    add column design_submit_status tinyint comment '提交sdp-design状态 10-待推送 20-已推送 30-推送失败' after scene_name;

create table sdp_curation.ultra_hd_task
(
    task_id            bigint comment '任务id'
        primary key,
    image_id           bigint            not null comment '图片ID，目前是picking_ai_design_picture.picking_picture_id',
    picking_result_id  bigint unsigned   not null comment '选款结果ID，picking_ai_design_result.picking_result_id',
    task_status        int     default 0 not null comment '任务状态:0排队中 10生成中 20已中止 30已完成 40无效 50失败 60超时失败',
    image_url          varchar(500)      not null comment '原图',
    ultra_hd_image_url varchar(500)      null comment '原图的高清图',
    generated_time     datetime          null comment '生成时间',
    tenant_id          bigint            not null comment '租户id',
    creator_id         bigint            not null comment '创建人id',
    creator_name       varchar(50)       null comment '创建人姓名',
    created_time       datetime          not null comment '创建时间',
    reviser_id         bigint            null comment '更新人id',
    reviser_name       varchar(50)       null comment '更新人姓名',
    revised_time       datetime          null comment '更新时间',
    deleted            tinyint default 0 not null comment '逻辑删除 0 否 1是'
)
    comment 'ultra_hd_task 图片放大任务' collate = utf8mb4_general_ci
                                         row_format = DYNAMIC;








