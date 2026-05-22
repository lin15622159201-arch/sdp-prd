-- ----------------------------
-- Table structure for sdp_curation
-- ----------------------------
-- -----------DDL-----------------
create table picture_caption_task
(
    task_id       bigint unsigned              not null comment '任务ID'
        primary key,
    bus_id        bigint unsigned              not null comment '业务主键ID',
    task_code     varchar(80) null comment '任务编号',
    bus_type      varchar(80) null comment '业务来源',
    source        varchar(42) null comment '来源',
    task_status   int default 0 not null comment '任务状态：0-排队中；10-生成中；20-已中止；30-已完成；50-失败；60-超时失败；',
    input_img     varchar(256)  not null comment '输入图片',
    caption       text null comment '图片描述',
    push_status   tinyint unsigned default '0' null comment '推送状态：0-未推送；1-已推送；2-推送失败',
    push_time     datetime null comment '推送时间',
    push_times    int default 0 null comment '推送次数',
    pull_time     datetime null comment '拉取时间',
    pull_times    int default 0 null comment '拉取次数',
    ai_start_time datetime null comment 'AI开始处理时间',
    ai_end_time   datetime null comment 'AI结束处理时间',
    message       varchar(200) null comment '信息备注',
    tenant_id     bigint null comment '租户ID',
    creator_id    bigint unsigned              null comment '创建人ID',
    creator_name  varchar(50) null comment '创建人姓名',
    created_time  datetime null comment '创建时间',
    reviser_id    bigint unsigned              null comment '更新人ID',
    reviser_name  varchar(50) null comment '更新人姓名',
    revised_time  datetime null comment '更新时间',
    deleted       tinyint unsigned default '0' not null comment '逻辑删除：0-否；1-是'
) comment '图片解析任务' row_format = DYNAMIC;
create index idx_bus_id
    on picture_caption_task (bus_id);
create index idx_created_time
    on picture_caption_task (created_time);
create table category_rec_task
(
    task_id       bigint unsigned              not null comment '任务ID'
        primary key,
    bus_id        bigint unsigned              not null comment '业务主键ID',
    task_code     varchar(80) null comment '任务编号',
    bus_type      varchar(80) null comment '业务来源',
    task_status   int default 0 not null comment '任务状态：0-排队中；10-生成中；20-已中止；30-已完成；50-失败；60-超时失败；',
    input_img     varchar(512)  not null comment '输入图片URL（多张,隔开）',
    category      varchar(256) null comment '品类',
    category_size varchar(256) null comment '品类尺码',
    push_status   tinyint unsigned default '0' null comment '推送状态：0-未推送；1-已推送；2-推送失败',
    push_time     datetime null comment '推送时间',
    push_times    int default 0 null comment '推送次数',
    pull_time     datetime null comment '拉取时间',
    pull_times    int default 0 null comment '拉取次数',
    ai_start_time datetime null comment 'AI开始处理时间',
    ai_end_time   datetime null comment 'AI结束处理时间',
    message       varchar(200) null comment '信息备注',
    tenant_id     bigint null comment '租户ID',
    creator_id    bigint unsigned              null comment '创建人ID',
    creator_name  varchar(50) null comment '创建人姓名',
    created_time  datetime null comment '创建时间',
    reviser_id    bigint unsigned              null comment '更新人ID',
    reviser_name  varchar(50) null comment '更新人姓名',
    revised_time  datetime null comment '更新时间',
    deleted       tinyint unsigned default '0' not null comment '逻辑删除：0-否；1-是'
) comment '品类识别任务' row_format = DYNAMIC;
create index idx_bus_id
    on category_rec_task (bus_id);
create index idx_created_time
    on category_rec_task (created_time);
create table pattern_check_task
(
    task_id       bigint unsigned              not null comment '任务ID'
        primary key,
    bus_id        bigint unsigned              not null comment '业务主键ID',
    task_code     varchar(80) null comment '任务编号',
    bus_type      varchar(80) null comment '业务来源',
    task_status   int default 0 not null comment '任务状态：0-排队中；10-生成中；20-已中止；30-已完成；50-失败；60-超时失败；',
    input_img     varchar(512)  not null comment '输入图片URL（多张,隔开）',
    label         varchar(256) null comment '标签',
    category      varchar(256) null comment '类别',
    push_status   tinyint unsigned default '0' null comment '推送状态：0-未推送；1-已推送；2-推送失败',
    push_time     datetime null comment '推送时间',
    push_times    int default 0 null comment '推送次数',
    pull_time     datetime null comment '拉取时间',
    pull_times    int default 0 null comment '拉取次数',
    ai_start_time datetime null comment 'AI开始处理时间',
    ai_end_time   datetime null comment 'AI结束处理时间',
    message       varchar(200) null comment '信息备注',
    tenant_id     bigint null comment '租户ID',
    creator_id    bigint unsigned              null comment '创建人ID',
    creator_name  varchar(50) null comment '创建人姓名',
    created_time  datetime null comment '创建时间',
    reviser_id    bigint unsigned              null comment '更新人ID',
    reviser_name  varchar(50) null comment '更新人姓名',
    revised_time  datetime null comment '更新时间',
    deleted       tinyint unsigned default '0' not null comment '逻辑删除：0-否；1-是'
) comment '款式分类任务' row_format = DYNAMIC;
create index idx_bus_id
    on pattern_check_task (bus_id);
create index idx_created_time
    on pattern_check_task (created_time);
-- -----------DDL-----------------