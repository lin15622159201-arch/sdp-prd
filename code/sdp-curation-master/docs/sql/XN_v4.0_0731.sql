-- ----------------------------
-- Table structure for sdp_curation
-- ----------------------------
-- -----------DDL-----------------
ALTER TABLE ai_design_task
    ADD COLUMN try_on_fix int null default 0 comment '一拖三(1:开启, 0:关闭)' AFTER `style_type`;
ALTER TABLE ai_design_task
    ADD COLUMN style_generate_num int default 0 not null comment '款生成数量' AFTER `gen_count`;
ALTER TABLE ai_design_task
    ADD COLUMN model_ethnicity varchar(120) not null comment '模特人种' AFTER `model_material_name`;
create table ai_design_material
(
    material_id         bigint unsigned        not null comment '选款备注ID'
        primary key,
    task_id             bigint unsigned        not null comment 'AI设计素材任务ID',
    inspiration_id         bigint                  null comment '灵感数据id',
    material_library_id bigint unsigned        not null comment '素材库ID',
    material_type       varchar(32)  default '' not null comment '素材类型',
    picture_url         varchar(512) default '' null comment '模特图片URL',
    mask_picture_url    varchar(512) default '' null comment 'mask图URL',
    tenant_id           bigint                  not null comment '租户ID',
    creator_id          bigint unsigned        not null comment '创建人ID',
    creator_name        varchar(50)             not null comment '创建人姓名',
    created_time        datetime                not null comment '创建时间',
    reviser_id          bigint unsigned        null comment '更新人ID',
    reviser_name        varchar(50) null comment '更新人姓名',
    revised_time        datetime null comment '更新时间',
    deleted             tinyint null comment '逻辑删除：0-否；1-是'
) comment 'AI设计素材表' row_format = DYNAMIC;

create index idx_design_inspiration_id
    on ai_design_material (inspiration_id);
create index idx_design_task_id
    on ai_design_material (task_id);
-- -----------DDL-----------------