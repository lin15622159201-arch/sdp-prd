-- ----------------------------
-- Table structure for sdp_curation
-- ----------------------------
-- -----------DDL-----------------

create table style_gen_task
(
    task_id           bigint unsigned              not null comment '任务ID'
        primary key,
    push_status       int           default 0 null comment '推送状态',
    gen_task_id       bigint        default 0 null comment '生图任务ID',
    inspiration_id    bigint null comment '灵感数据id',
    inspiration_code  varchar(80) null comment '灵感数据编号',
    inspiration_image varchar(255) null comment '灵感图',
    face_fix          int null comment '脸部修复(1:开启, 0:关闭)',
    prompt            varchar(2048) null comment '提示词',
    ref_img_url       varchar(2048) default '' null comment '原图url',
    bg_img_url        varchar(2048) default '' null comment '背景图url',
    bg_img_desc       varchar(2048) default '' null comment '背景图描述',
    model_img_url     varchar(2048) default '' null comment '模特图url',
    model_img_desc    varchar(2048) default '' null comment '模特图描述',
    img_size          varchar(64) null comment '生图的尺寸',
    lora_name         varchar(128) null comment 'lora的名字',
    mode_name         varchar(128) null comment '模型名',
    cloth_type        varchar(128) null comment '服装类型',
    style_model_id    bigint unsigned              not null comment '风格模型ID',
    gen_count         int not null comment '生成数量',
    message           varchar(200) null comment '信息备注',
    tenant_id         bigint null comment '租户ID',
    creator_id        bigint unsigned              null comment '创建人ID',
    creator_name      varchar(50) null comment '创建人姓名',
    created_time      datetime null comment '创建时间',
    reviser_id        bigint unsigned              null comment '更新人ID',
    reviser_name      varchar(50) null comment '更新人姓名',
    revised_time      datetime null comment '更新时间',
    deleted           tinyint unsigned default '0' not null comment '逻辑删除：0-否；1-是'
) comment '风格小模型任务' charset = utf8mb4
                         row_format = DYNAMIC;
create index idx_inspiration_code
    on style_gen_task (inspiration_code);
create index idx_inspiration_id
    on style_gen_task (inspiration_id);
create index idx_created_time
    on style_gen_task (created_time);

-- AIGC添加选款来源
ALTER TABLE `sdp_curation`.`picking_ai_design`
    ADD COLUMN `origin` varchar(64) NULL AFTER `source_image`;


ALTER TABLE `sdp_curation`.`picking_ai_design_picture`
    ADD COLUMN `picking_state` tinyint NULL DEFAULT NULL COMMENT '选款状态：0待选中,1已选中,2未选中' AFTER `picking_style_id`;


ALTER TABLE `sdp_curation`.`picking_ai_design`
    ADD COLUMN `posture_fission_task_id` bigint NULL COMMENT '姿势裂变任务id' AFTER `inspiration_image`,
ADD COLUMN `posture_fission_ref_img_url` varchar(600) NULL COMMENT '姿势裂变任务参考图' AFTER `posture_fission_task_id`;


-- -----------DDL-----------------


-- -----------DML-----------------
update picking_ai_design set origin='smart_develop_style';
-- -----------DML-----------------