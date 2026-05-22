-- ----------------------------
-- Table structure for sdp_curation
-- ----------------------------
-- -----------DDL-----------------
create table skc_image_sync
(
    sync_id       bigint                 not null comment '同步ID'
        primary key,
    skc_code      varchar(64) default '' not null comment 'SKC编码',
    src_url       varchar(1024)           not null comment '原图url',
    image_url     varchar(256)           not null comment '图片url',
    upload_status tinyint     default 1 null comment '上传状态：0-未同步；1-已同步',
    upload_time   datetime null comment '上传时间',
    upload_times  int         default 0 null comment '上传次数',
    sync_status   tinyint     default 1 null comment '同步给业务状态：0-未同步；1-已同步',
    sync_time     datetime null comment '同步时间',
    sync_times    int         default 0 null comment '同步次数',
    message       varchar(256) null comment '信息备注',
    tenant_id     bigint null comment '租户ID',
    creator_id    bigint unsigned              null comment '创建人ID',
    creator_name  varchar(50) null comment '创建人姓名',
    created_time  datetime null comment '创建时间',
    reviser_id    bigint unsigned              null comment '更新人ID',
    reviser_name  varchar(50) null comment '更新人姓名',
    revised_time  datetime null comment '更新时间',
    deleted       tinyint unsigned default '0' not null comment '逻辑删除：0-否；1-是'
) comment 'SKC图片导入同步记录' row_format = DYNAMIC;
create index idx_created_time
    on skc_image_sync (created_time);
create index idx_skc_code
    on skc_image_sync (skc_code);
-- -----------DDL-----------------
