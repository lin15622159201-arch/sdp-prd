-- ----------------------------
-- Table structure for sdp_curation
-- ----------------------------
-- -----------DDL-----------------
create table mulfeat_extract_task
(
    task_id       bigint unsigned              not null comment '任务ID'
        primary key,
    bus_id        bigint unsigned              not null comment '业务主键ID',
    task_code     varchar(80) null comment '任务编号',
    bus_type      varchar(80) null comment '业务来源',
    task_status   int default 0 not null comment '任务状态：0-排队中；10-生成中；20-已中止；30-已完成；50-失败；60-超时失败；',
    input_img     varchar(512)  not null comment '输入图片URL（多张,隔开）',
    up_feat       json null comment '上装区域的特征',
    down_feat     json null comment '下装区域的特征',
    full_feat     json null comment '连身类或全身所有服装区域的特征',
    whole_feat    json null comment '全图的特征，包含服装和背景模特等',
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
) comment '服装特征提取任务' row_format = DYNAMIC;

create index idx_bus_id
    on mulfeat_extract_task (bus_id);

create index idx_created_time
    on mulfeat_extract_task (created_time);

create table skc_image_vector
(
    image_id        bigint unsigned              not null comment '图片ID'
        primary key,
    develop_task_id bigint       default 0  not null comment '开款任务ID',
    vector_id       varchar(255) default '' null comment '向量ID,多个逗号分割',
    image_url       varchar(255)            not null comment '图片地址',
    style_type      varchar(32)  default '' not null comment '开款类型',
    spu_id          bigint       default 0  not null comment 'SPU ID',
    spu_code        varchar(80)  default '' not null comment 'SPU编码',
    skc_id          bigint       default 0  not null comment 'SKC ID',
    skc_code        varchar(80)  default '' not null comment 'SKC编码',
    up_feat         json null comment '上装区域的特征',
    down_feat       json null comment '下装区域的特征',
    full_feat       json null comment '连身类或全身所有服装区域的特征',
    whole_feat      json null comment '全图的特征，包含服装和背景模特等',
    sync_status     tinyint      default 1 null comment '同步向量库：0-未同步；1-已同步',
    sync_time       datetime null comment '同步时间',
    message         varchar(200) null comment '信息备注',
    tenant_id       bigint null comment '租户ID',
    creator_id      bigint unsigned              null comment '创建人ID',
    creator_name    varchar(50) null comment '创建人姓名',
    created_time    datetime null comment '创建时间',
    reviser_id      bigint unsigned              null comment '更新人ID',
    reviser_name    varchar(50) null comment '更新人姓名',
    revised_time    datetime null comment '更新时间',
    deleted         tinyint unsigned default '0' not null comment '逻辑删除：0-否；1-是'
) comment '款式图片信息' row_format = DYNAMIC;
create index idx_skc_id
    on skc_image_vector (skc_id);
create index idx_develop_task_id
    on skc_image_vector (develop_task_id);
create index idx_created_time
    on skc_image_vector (created_time);
ALTER TABLE develop_style_task
    ADD COLUMN image_vector_id bigint not null default 0 comment '图片向量ID' AFTER `project_type_code`;
-- -----------DDL-----------------