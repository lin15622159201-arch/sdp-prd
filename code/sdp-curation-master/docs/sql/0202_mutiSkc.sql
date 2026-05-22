-- ----------------------------
-- Table structure for sdp_curation
-- ----------------------------
-- -----------DDL-----------------
ALTER TABLE develop_style_task
    ADD COLUMN pattern_code varchar(32) null default '' comment '版型编码' AFTER `usable_labels`;
ALTER TABLE develop_style_task
    ADD COLUMN pattern_name varchar(32) null default '' comment '版型名称' AFTER `usable_labels`;
ALTER TABLE develop_style_task
    ADD COLUMN project_type_code varchar(32) null default '' comment '项目类型编码' AFTER `color_code`;
ALTER TABLE develop_style_task
    ADD COLUMN project_type_name varchar(32) null default '' comment '项目类型名称' AFTER `color_code`;
ALTER TABLE develop_style_spu
    ADD COLUMN project_type_code varchar(32) null default '' comment '项目类型编码' AFTER `commodity_link`;
ALTER TABLE develop_style_spu
    ADD COLUMN project_type_name varchar(32) null default '' comment '项目类型名称' AFTER `commodity_link`;
ALTER TABLE spot_style_task
    ADD COLUMN project_type_code varchar(32) null default '' comment '项目类型编码' AFTER `usable_labels`;
ALTER TABLE spot_style_task
    ADD COLUMN project_type_name varchar(32) null default '' comment '项目类型名称' AFTER `usable_labels`;

create table temu_size_class
(
    category_id  bigint not null comment '品类ID'
        primary key,
    parent_id    bigint  default 0 null comment '父分类ID',
    class_id     bigint  default 0 null comment '分类ID',
    related_id   json null comment '关联的分类ID列表 (仅对套装类型生效)',
    class_type   tinyint default 0 null comment '类型:0: 普通类型, 1: 套装类型',
    available    tinyint default 0 null comment '可以用的',
    message      varchar(256) null comment '信息备注',
    tenant_id    bigint null comment '租户ID',
    creator_id   bigint unsigned              null comment '创建人ID',
    creator_name varchar(50) null comment '创建人姓名',
    created_time datetime null comment '创建时间',
    reviser_id   bigint unsigned              null comment '更新人ID',
    reviser_name varchar(50) null comment '更新人姓名',
    revised_time datetime null comment '更新时间',
    deleted      tinyint unsigned default '0' not null comment '逻辑删除：0-否；1-是'
) comment 'temu尺码分类表' row_format = DYNAMIC;

create index idx_created_time
    on temu_size_class (created_time);
create index idx_class_id
    on temu_size_class (class_id);
-- -----------DDL-----------------