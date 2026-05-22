-- ----------------------------
-- Table structure for sdp_curation
-- ----------------------------
-- -----------DDL-----------------
create table feishu_notice_log
(
    log_id        bigint                 not null comment '任务ID'
        primary key,
    bus_id       bigint      default 0 null comment '业务Id',
    bus_type      varchar(32) default '' not null comment '业务类型',
    log_type      varchar(64) default '' not null comment '日志类型',
    push_status   tinyint unsigned default '0' null comment '推送状态：0-未推送；1-已推送；2-推送失败',
    push_time     datetime null comment '推送时间',
    push_times    int         default 0 null comment '推送次数',
    content       json null comment '日志内容',
    response_data json null comment '结果',
    message       varchar(256) null comment '信息备注',
    tenant_id     bigint null comment '租户ID',
    creator_id    bigint unsigned              null comment '创建人ID',
    creator_name  varchar(50) null comment '创建人姓名',
    created_time  datetime null comment '创建时间',
    reviser_id    bigint unsigned              null comment '更新人ID',
    reviser_name  varchar(50) null comment '更新人姓名',
    revised_time  datetime null comment '更新时间',
    deleted       tinyint unsigned default '0' not null comment '逻辑删除：0-否；1-是'
) comment '飞书通知日志' row_format = DYNAMIC;
create index idx_created_time
    on feishu_notice_log (created_time);
create index idx_bus_id
    on feishu_notice_log (bus_id);
-- -----------DDL-----------------
