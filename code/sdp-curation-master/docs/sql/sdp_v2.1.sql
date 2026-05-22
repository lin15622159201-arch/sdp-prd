-- ----------------------------
-- Table structure for sdp_curation
-- ----------------------------
-- -----------DDL-----------------
ALTER TABLE develop_style_task
    ADD COLUMN design_type_code varchar(32) null default '' comment '款式类型编码' AFTER `color_code`;
ALTER TABLE develop_style_task
    ADD COLUMN design_type_name varchar(32) null default '' comment '款式类型名称' AFTER `color_code`;
ALTER TABLE develop_style_spu
    ADD COLUMN design_type_code varchar(32) null default '' comment '款式类型编码' AFTER `commodity_link`;
ALTER TABLE develop_style_spu
    ADD COLUMN design_type_name varchar(32) null default '' comment '款式类型名称' AFTER `commodity_link`;
ALTER TABLE spot_style_task
    ADD COLUMN design_type_code varchar(32) null default '' comment '款式类型编码' AFTER `usable_labels`;
ALTER TABLE spot_style_task
    ADD COLUMN design_type_name varchar(32) null default '' comment '款式类型名称' AFTER `usable_labels`;
ALTER TABLE product
    ADD COLUMN fail_message varchar(512) null default '' comment '失败提示' AFTER `message`;
ALTER TABLE shop
    ADD COLUMN expired tinyint default 1 null comment '是否有效【1有效；0无效】' AFTER `auth_end_time`;

create table size_diff
(
    size_diff_id bigint      not null comment '主键id'
        primary key,
    size_code    varchar(32) not null comment '尺码',
    size_name    varchar(32) not null comment '尺码名称',
    part         varchar(256) null comment '部位',
    size         varchar(256) null comment '尺码',
    diff_val     json null comment '档差值',
    enable       tinyint default 1 null comment '是否启用【1启用；0禁用】',
    message      varchar(256) null comment '信息备注',
    tenant_id    bigint null comment '租户ID',
    creator_id   bigint unsigned              null comment '创建人ID',
    creator_name varchar(50) null comment '创建人姓名',
    created_time datetime null comment '创建时间',
    reviser_id   bigint unsigned              null comment '更新人ID',
    reviser_name varchar(50) null comment '更新人姓名',
    revised_time datetime null comment '更新时间',
    deleted      tinyint unsigned default '0' not null comment '逻辑删除：0-否；1-是'
) comment '尺码档差表' row_format = DYNAMIC;

create index idx_created_time
    on size_diff (created_time);
-- -----------DDL-----------------