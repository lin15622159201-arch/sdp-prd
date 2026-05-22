-- ----------------------------
-- Table structure for sdp_curation
-- ----------------------------
-- -----------DDL-----------------
create table develop_style_task
(
    task_id             bigint unsigned not null comment '任务ID'
        primary key,
    parent_id           bigint                default 0 null comment '父任务ID',
    task_code           varchar(80) null comment '任务编号',
    task_status         int                   default 0 not null comment '任务状态：0-待审核；10-待开款；20-已淘汰；30-已开款；50-失败；',
    ai_task_status      int                   default 0 not null comment 'AI任务状态：0-排队中；10-生成中；20-已中止；30-已完成；50-失败；60-超时失败；',
    push_status         int                   default 0 null comment '推送状态',
    task_state          int                   default 0 not null comment '任务状态',
    required_task       int                   default 0 not null comment '需要进行的任务',
    picking_result_id   bigint                default 0 not null comment '选款结果ID',
    picking_style_id    bigint                default 0 not null comment '款式id',
    style_type          varchar(32)  not null default '' comment '开款类型',
    supplier_name       varchar(256) not null default '' comment '供应商名称',
    supplier_style_code varchar(32)  not null default '' comment '供应商款号',
    commodity_link      varchar(512) not null default '' comment '商品链接',
    price               decimal(18, 10) null comment '价格',
    waveband_code       varchar(32) null default '' comment '波段编码',
    waveband_name       varchar(32) null default '' comment '波段名称',
    category_code       varchar(256) null comment '款式品类编码',
    category_name       varchar(256) null comment '款式品类名',
    style_label_code    varchar(32) null default '' comment '款式标签编码',
    style_label_name    varchar(32) null default '' comment '款式标签名称',
    store_id            bigint                default 0 null comment '店铺id',
    store_name          varchar(32)           default '' null comment '店铺名称',
    main_img_url        varchar(512)          default '' null comment '主图url',
    rela_type           varchar(32)           default '' not null comment '关联类型',
    rela_id             bigint                default 0 not null comment '关联ID',
    rela_code           varchar(80) null default '' comment '关联编号',
    spu_code            varchar(80) null comment '款号',
    style_checker_name  varchar(32)  not null default '' comment '审款人',
    style_checker_id    bigint unsigned null comment '审款人ID',
    check_time          datetime null comment '审款时间',
    check_result        tinyint unsigned default 0 null comment '审款结果：0-未审款；1-淘汰；2-通过',
    platform_code       varchar(32)  not null default '' comment '平台编码',
    platform_name       varchar(32)  not null default '' comment '平台名称',
    submit_time         datetime null comment '提交时间',
    developer_id        bigint null comment '开款人id',
    developer_name      varchar(32) null comment '开款人名称',
    category_rec        varchar(32)  not null default '' comment '识别品类',
    category_size       varchar(32)  not null default '' comment '识别品类尺码',
    printing_code       varchar(32)  not null default '' comment '印花编码',
    printing_name       varchar(32)  not null default '' comment '印花名称',
    weave_mode_code     varchar(32) null default '' comment '织造方式code',
    weave_mode_name     varchar(32) null default '' comment '织造方式',
    elastic_code        varchar(32)  not null default '' comment '弹性编码',
    elastic_name        varchar(32)  not null default '' comment '弹性名称',
    fabric_texture      varchar(128) null default '' comment '面料纹理',
    fabric_material     varchar(128) null default '' comment '面料材质',
    transparency        varchar(128) null default '' comment '透明度',
    pattern_label       varchar(256) null default '' comment '花型标签',
    fabric_identify     json null comment '面料',
    pred_labels         json null comment '预测的标签：不支持品类，则返回品类是其他',
    usable_labels       json null comment '可用的标签',
    title_data          json null comment '标题数据',
    pattern_data        json null comment '花型数据',
    color_data          json null comment '颜色数据',
    season_code         varchar(32)           default '' not null comment '季节编码',
    season_name         varchar(32)           default '' not null comment '季节名称',
    clothing_style_name varchar(32) null comment '款式风格编码',
    clothing_style_code varchar(32) null comment '款式风格名称',
    color               varchar(128) null comment '颜色名称',
    color_code          varchar(128) null comment '颜色编码',
    message             varchar(256) null comment '信息备注',
    fail_message        varchar(256) null comment '失败备注',
    fail_model          varchar(256) null comment '失败模型',
    tenant_id           bigint null comment '租户ID',
    creator_id          bigint unsigned null comment '创建人ID',
    creator_name        varchar(50) null comment '创建人姓名',
    created_time        datetime null comment '创建时间',
    reviser_id          bigint unsigned null comment '更新人ID',
    reviser_name        varchar(50) null comment '更新人姓名',
    revised_time        datetime null comment '更新时间',
    deleted             tinyint unsigned default '0' not null comment '逻辑删除：0-否；1-是'
) comment '开款任务' charset = utf8mb4
                             row_format = DYNAMIC;
create index idx_task_code
    on develop_style_task (task_code);
create index idx_created_time
    on develop_style_task (created_time);
create index idx_picking_result_id
    on develop_style_task (picking_result_id);
create index idx_picking_style_id
    on develop_style_task (picking_style_id);
create table develop_style_picture
(
    picture_id   bigint      not null comment '图片ID'
        primary key,
    task_id      bigint unsigned not null comment '任务ID',
    picture_url  varchar(256) null comment '开款图',
    picture_type varchar(32) not null default '' comment '图类型',
    message      varchar(200) null comment '信息备注',
    tenant_id    bigint null comment '租户ID',
    creator_id   bigint unsigned null comment '创建人ID',
    creator_name varchar(50) null comment '创建人姓名',
    created_time datetime null comment '创建时间',
    reviser_id   bigint unsigned null comment '更新人ID',
    reviser_name varchar(50) null comment '更新人姓名',
    revised_time datetime null comment '更新时间',
    deleted      tinyint unsigned default '0' not null comment '逻辑删除：0-否；1-是'
) comment '开款图' row_format = DYNAMIC;
create index idx_created_time
    on develop_style_picture (created_time);
create index idx_task_id
    on develop_style_picture (task_id);
create table develop_style_remark
(
    remark_id    bigint unsigned not null comment '开款备注ID'
        primary key,
    task_id      bigint unsigned not null comment '任务ID',
    image_url    varchar(2048) not null default '' comment '图片',
    remark       varchar(512) null comment '备注信息',
    tenant_id    bigint        not null comment '租户ID',
    creator_id   bigint unsigned not null comment '创建人ID',
    creator_name varchar(50)   not null comment '创建人姓名',
    created_time datetime      not null comment '创建时间',
    reviser_id   bigint unsigned null comment '更新人ID',
    reviser_name varchar(50) null comment '更新人姓名',
    revised_time datetime null comment '更新时间',
    deleted      tinyint unsigned default 0 not null comment '逻辑删除：0-否；1-是'
) comment '开款备注表' collate = utf8mb4_general_ci
                       row_format = DYNAMIC;
create index idx_develop_task_id
    on develop_style_remark (task_id);

create table develop_style_opt
(
    opt_id       bigint unsigned not null comment '开款操作ID'
        primary key,
    task_id      bigint unsigned not null comment '任务ID',
    opt_type     varchar(32) not null default '' comment '操作类型',
    content      varchar(512) null comment '操作内容',
    tenant_id    bigint      not null comment '租户ID',
    creator_id   bigint unsigned not null comment '创建人ID',
    creator_name varchar(50) not null comment '创建人姓名',
    created_time datetime    not null comment '创建时间',
    reviser_id   bigint unsigned null comment '更新人ID',
    reviser_name varchar(50) null comment '更新人姓名',
    revised_time datetime null comment '更新时间',
    deleted      tinyint unsigned default 0 not null comment '逻辑删除：0-否；1-是'
) comment '开款操作表' collate = utf8mb4_general_ci
                       row_format = DYNAMIC;
create index idx_develop_task_id
    on develop_style_opt (task_id);
create table develop_style_rela_task
(
    rela_id      bigint unsigned not null comment '开款关联任务ID'
        primary key,
    task_id      bigint unsigned not null comment '任务ID',
    source_type  varchar(32)      not null comment '数据来源',
    source_id    bigint default 0 not null comment '数据来源ID',
    source_code  varchar(80) null default '' comment '数据来源编号',
    tenant_id    bigint           not null comment '租户ID',
    creator_id   bigint unsigned not null comment '创建人ID',
    creator_name varchar(50)      not null comment '创建人姓名',
    created_time datetime         not null comment '创建时间',
    reviser_id   bigint unsigned null comment '更新人ID',
    reviser_name varchar(50) null comment '更新人姓名',
    revised_time datetime null comment '更新时间',
    deleted      tinyint unsigned default 0 not null comment '逻辑删除：0-否；1-是'
) comment '开款关联任务表' collate = utf8mb4_general_ci
                       row_format = DYNAMIC;
create index idx_rela_task_id
    on develop_style_rela_task (task_id);
create table develop_style_spu
(
    spu_id               bigint unsigned not null comment 'spu ID'
        primary key,
    task_id              bigint                default 0 null comment '开款任务ID',
    task_status          int                   default 0 not null comment '任务状态：0-待审核；10-待开款；20-已淘汰；30-已开款；50-失败；',
    push_status          int                   default 0 null comment '推送状态',
    task_state           int                   default 0 not null comment '任务状态',
    required_task        int                   default 0 not null comment '需要进行的任务',
    suit_piece           int                   default 0 null comment '套装件数',
    main_img_url         varchar(512)          default '' null comment '主图url',
    supply_mode_name     varchar(32) null comment '供给方式',
    supply_mode_code     varchar(32) null comment '供给方式编码',
    store_id             bigint null comment '店铺id',
    store_name           varchar(32) null comment '店铺名称',
    scene_name           varchar(32) null comment '场景名称',
    scene_code           varchar(255) null comment '场景编码',
    quality_level_name   varchar(32) null comment '品质等级',
    quality_level_code   varchar(64) null comment '品质等级编号',
    style_level_name     varchar(32) null comment '款式等级',
    style_level_code     varchar(64) null comment '款式等级编号',
    weave_mode_code      varchar(32) null comment '织造方式code',
    weave_mode_name      varchar(32) null comment '织造方式',
    wave_band_code       varchar(32) null comment '波段编码',
    wave_band_name       varchar(32) null comment '波段名称',
    category_code        varchar(256) null comment '款式品类编码',
    category_name        varchar(256) null comment '款式品类名',
    size_standard_name   varchar(64) null comment '尺码标准',
    size_standard_code   varchar(64) null comment '尺码标准编号',
    clothing_style_name  varchar(32) null comment '款式风格编码',
    clothing_style_code  varchar(32) null comment '款式风格名称',
    spot_style_type_code varchar(32) null comment '现货类型编码',
    spot_style_type_name varchar(32) null comment '现货类型名称',
    platform_code        varchar(32)  not null default '' comment '平台编码',
    platform_name        varchar(32)  not null default '' comment '平台名称',
    printing_code        varchar(32)  not null default '' comment '印花编码',
    printing_name        varchar(32)  not null default '' comment '印花名称',
    pattern_code         varchar(32)  not null default '' comment '版型编码',
    pattern_name         varchar(32)  not null default '' comment '版型名称',
    elastic_code         varchar(32)  not null default '' comment '弹性编码',
    elastic_name         varchar(32)  not null default '' comment '弹性名称',
    season_code          varchar(32)  not null default '' comment '季节编码',
    season_name          varchar(32)  not null default '' comment '季节名称',
    gala_code            varchar(32)  not null default '' comment '节日编码',
    gala_name            varchar(32)  not null default '' comment '节日名称',
    visual_form_code     varchar(32)  not null default '' comment '视觉形式编码',
    visual_form_name     varchar(32)  not null default '' comment '视觉形式名称',
    sku_class_code       varchar(32)  not null default '' comment 'sku类别编码',
    sku_class_name       varchar(32)  not null default '' comment 'sku类别名称',
    commodity_link       varchar(512) not null default '' comment '商品链接',
    style_label_code     varchar(32) null default '' comment '款式标签编码',
    style_label_name     varchar(32) null default '' comment '款式标签名称',
    message              varchar(256) null comment '信息备注',
    tenant_id            bigint null comment '租户ID',
    creator_id           bigint unsigned null comment '创建人ID',
    creator_name         varchar(50) null comment '创建人姓名',
    created_time         datetime null comment '创建时间',
    reviser_id           bigint unsigned null comment '更新人ID',
    reviser_name         varchar(50) null comment '更新人姓名',
    revised_time         datetime null comment '更新时间',
    deleted              tinyint unsigned default 0 not null comment '逻辑删除：0-否；1-是'
) comment '开款-SPU表' row_format = DYNAMIC;
create index idx_task_id
    on develop_style_spu (task_id);
create index idx_created_time
    on develop_style_spu (created_time);

create table develop_style_skc
(
    skc_id        bigint not null comment '主键id'
        primary key,
    task_id       bigint unsigned not null comment '任务ID',
    spu_id        bigint unsigned not null comment 'SKC编码',
    color         varchar(128) null comment '颜色名称',
    color_code    varchar(128) null comment '颜色编码',
    color_en_name varchar(128) null comment '颜色英文名',
    message       varchar(256) null comment '信息备注',
    tenant_id     bigint null comment '租户ID',
    creator_id    bigint unsigned null comment '创建人ID',
    creator_name  varchar(50) null comment '创建人姓名',
    created_time  datetime null comment '创建时间',
    reviser_id    bigint unsigned null comment '更新人ID',
    reviser_name  varchar(50) null comment '更新人姓名',
    revised_time  datetime null comment '更新时间',
    deleted       tinyint unsigned default 0 not null comment '逻辑删除：0-否；1-是'
) comment '开款-SKU表' row_format = DYNAMIC;
create index idx_spu_id
    on develop_style_skc (spu_id);
create index idx_task_id
    on develop_style_skc (task_id);
create table spot_style_task
(
    task_id              bigint unsigned not null comment '任务ID'
        primary key,
    parent_id            bigint               default 0 null comment '父任务ID',
    task_code            varchar(80) null comment '任务编号',
    task_status          int                  default 0 not null comment '任务状态：0-待审核；10-待开款；20-已淘汰；30-已开款；50-失败；',
    style_type           varchar(32) not null default '' comment '开款类型',
    source_type          varchar(32) not null default '' comment '数据来源',
    source_id            bigint               default 0 not null comment '数据来源ID',
    push_status          int                  default 0 null comment '推送状态',
    task_state           int                  default 0 not null comment '任务状态',
    required_task        int                  default 0 not null comment '需要进行的任务',
    main_img_url         varchar(512)         default '' null comment '主图url',
    supply_mode_name     varchar(32) null comment '供给方式',
    supply_mode_code     varchar(32) null comment '供给方式编码',
    store_id             bigint null comment '店铺id',
    store_name           varchar(32) null comment '店铺名称',
    scene_name           varchar(32) null comment '场景名称',
    scene_code           varchar(255) null comment '场景编码',
    quality_level_name   varchar(32) null comment '品质等级',
    quality_level_code   varchar(64) null comment '品质等级编号',
    style_level_name     varchar(32) null comment '款式等级',
    style_level_code     varchar(64) null comment '款式等级编号',
    weave_mode_code      varchar(32) null comment '织造方式code',
    weave_mode_name      varchar(32) null comment '织造方式',
    wave_band_code       varchar(32) null comment '波段编码',
    wave_band_name       varchar(32) null comment '波段名称',
    category_code        varchar(256) null comment '款式品类编码',
    category_name        varchar(256) null comment '款式品类名',
    size_standard_name   varchar(64) null comment '尺码标准',
    size_standard_code   varchar(64) null comment '尺码标准编号',
    clothing_style_name  varchar(32) null comment '款式风格编码',
    clothing_style_code  varchar(32) null comment '款式风格名称',
    spot_style_type_code varchar(32) null comment '现货类型编码',
    spot_style_type_name varchar(32) null comment '现货类型名称',
    pallet_type_code     varchar(32) NULL COMMENT '货盘类型编码',
    pallet_type_name     varchar(32) NULL COMMENT '货盘类型名称',
    platform_code        varchar(32) not null default '' comment '平台编码',
    platform_name        varchar(32) not null default '' comment '平台名称',
    printing_code        varchar(32) not null default '' comment '印花编码',
    printing_name        varchar(32) not null default '' comment '印花名称',
    pattern_code         varchar(32) not null default '' comment '版型编码',
    pattern_name         varchar(32) not null default '' comment '版型名称',
    elastic_code         varchar(32) not null default '' comment '弹性编码',
    elastic_name         varchar(32) not null default '' comment '弹性名称',
    season_code          varchar(32) not null default '' comment '季节编码',
    season_name          varchar(32) not null default '' comment '季节名称',
    gala_code            varchar(32) not null default '' comment '节日编码',
    gala_name            varchar(32) not null default '' comment '节日名称',
    visual_form_code     varchar(32) not null default '' comment '视觉形式编码',
    visual_form_name     varchar(32) not null default '' comment '视觉形式名称',
    sku_class_code       varchar(32) not null default '' comment 'sku类别编码',
    sku_class_name       varchar(32) not null default '' comment 'sku类别名称',
    suit_piece           int                  default 0 null comment '套装件数',
    style_label_code     varchar(32) null default '' comment '款式标签编码',
    style_label_name     varchar(32) null default '' comment '款式标签名称',
    commodity_link       varchar(512) null default '' comment '商品链接',
    developer_id         bigint null comment '开发人id',
    developer_name       varchar(32) null comment '开发人名称',
    submit_time          datetime null comment '提交时间',
    check_price_id       bigint null comment '核价id',
    check_pricer         varchar(32) null comment '核价人',
    check_price_time     datetime null comment '核价时间',
    cloth_gross_weight   decimal(18, 10) null comment '成衣毛重',
    image_update_status  int                  default 90 not null comment '图片修复状态：0-待处理；10-待审核；20-待返修；30-已完成；50-已取消；90-未创建；',
    image_update_time    datetime null comment '图片修复时间',
    image_update_id      bigint null comment '图片修复id',
    image_update_code    varchar(80) null comment '图片修复编码',
    usable_labels        json null comment '可用的标签',
    title_data           json null comment '标题数据',
    message              varchar(256) null comment '信息备注',
    tenant_id            bigint null comment '租户ID',
    creator_id           bigint unsigned null comment '创建人ID',
    creator_name         varchar(50) null comment '创建人姓名',
    created_time         datetime null comment '创建时间',
    reviser_id           bigint unsigned null comment '更新人ID',
    reviser_name         varchar(50) null comment '更新人姓名',
    revised_time         datetime null comment '更新时间',
    deleted              tinyint unsigned default 0 not null comment '逻辑删除：0-否；1-是'
) comment '现货款表' row_format = DYNAMIC;
create index idx_task_code
    on spot_style_task (task_code);
create index idx_created_time
    on spot_style_task (created_time);

create table spot_style_supplier
(
    supplier_id         bigint      not null comment 'Id主键'
        primary key,
    task_id             bigint unsigned not null comment '任务ID',
    supplier_code       varchar(32) null comment '供应商编码',
    supplier_name       varchar(256) null comment '供应商名称',
    payee_id            bigint null comment '收款人id',
    payee_code          varchar(32) null comment '收款人编码',
    payee_name          varchar(256) null comment '收款人名称',
    supplier_style_code varchar(32) not null default '' comment '供应商款号',
    purchase_price      decimal(18, 10) null comment '采购价',
    message             varchar(256) null comment '信息备注',
    tenant_id           bigint null comment '租户ID',
    creator_id          bigint unsigned null comment '创建人ID',
    creator_name        varchar(50) null comment '创建人姓名',
    created_time        datetime null comment '创建时间',
    reviser_id          bigint unsigned null comment '更新人ID',
    reviser_name        varchar(50) null comment '更新人姓名',
    revised_time        datetime null comment '更新时间',
    deleted             tinyint unsigned default 0 not null comment '逻辑删除：0-否；1-是'
) comment '现货款供应商表' row_format = DYNAMIC;
create index idx_task_id
    on spot_style_supplier (task_id);
create index idx_supplier_name
    on spot_style_supplier (supplier_name);

create table spot_style_skc
(
    skc_id                 bigint                 not null comment '主键id'
        primary key,
    task_id                bigint unsigned not null comment '任务ID',
    skc_code               varchar(80)            not null comment 'SKC编码',
    parent_id              bigint       default 0 null comment '父任务ID',
    skc_status             int          default 0 not null comment 'SKc状态',
    main_img_url           varchar(512) default '' null comment '主图url',
    color                  varchar(128) null comment '颜色名称',
    color_en_name          varchar(128) null comment '颜色英文名',
    size_standard_name     varchar(64) null comment '尺码标准',
    size_standard_code     varchar(64) null comment '尺码标准编号',
    submit_time            datetime null comment '提交时间',
    sale_time              datetime null comment '动销时间',
    message                varchar(256) null comment '信息备注',
    fail_message           varchar(256) null comment '失败提示',
    on_shelves_fail_reason varchar(256) null comment '上架审核不通过原因',
    buyer_cancel_message   varchar(256) null comment '买手取消原因',
    tenant_id              bigint null comment '租户ID',
    creator_id             bigint unsigned null comment '创建人ID',
    creator_name           varchar(50) null comment '创建人姓名',
    created_time           datetime null comment '创建时间',
    reviser_id             bigint unsigned null comment '更新人ID',
    reviser_name           varchar(50) null comment '更新人姓名',
    revised_time           datetime null comment '更新时间',
    deleted                tinyint unsigned default 0 not null comment '逻辑删除：0-否；1-是'
) comment '现货-skc表' row_format = DYNAMIC;
create index idx_skc_code
    on spot_style_skc (skc_code);
create index idx_task_id
    on spot_style_skc (task_id);
create table spot_style_opt
(
    opt_id       bigint unsigned not null comment '现货操作ID'
        primary key,
    task_id      bigint unsigned not null comment '任务ID',
    opt_type     varchar(32) not null default '' comment '操作类型',
    content      varchar(512) null comment '操作内容',
    tenant_id    bigint      not null comment '租户ID',
    creator_id   bigint unsigned not null comment '创建人ID',
    creator_name varchar(50) not null comment '创建人姓名',
    created_time datetime    not null comment '创建时间',
    reviser_id   bigint unsigned null comment '更新人ID',
    reviser_name varchar(50) null comment '更新人姓名',
    revised_time datetime null comment '更新时间',
    deleted      tinyint unsigned default 0 not null comment '逻辑删除：0-否；1-是'
) comment '现货操作表' collate = utf8mb4_general_ci
                       row_format = DYNAMIC;
create index idx_spot_style_task_id
    on spot_style_opt (task_id);

create table spot_style_picture
(
    picture_id   bigint      not null comment '图片ID'
        primary key,
    task_id      bigint unsigned not null comment '任务ID',
    skc_id       bigint unsigned default 0 not null comment 'SKC ID',
    picture_url  varchar(256) null comment '现货图',
    picture_type varchar(32) not null default '' comment '图类型',
    message      varchar(200) null comment '信息备注',
    tenant_id    bigint null comment '租户ID',
    creator_id   bigint unsigned null comment '创建人ID',
    creator_name varchar(50) null comment '创建人姓名',
    created_time datetime null comment '创建时间',
    reviser_id   bigint unsigned null comment '更新人ID',
    reviser_name varchar(50) null comment '更新人姓名',
    revised_time datetime null comment '更新时间',
    deleted      tinyint unsigned default '0' not null comment '逻辑删除：0-否；1-是'
) comment '现货图' row_format = DYNAMIC;
create index idx_created_time
    on spot_style_picture (created_time);
create index idx_task_id
    on spot_style_picture (task_id);

create table spot_style_ingredient
(
    ingredient_id    bigint          not null comment '成分ID'
        primary key,
    task_id          bigint unsigned not null comment '任务ID',
    ingredient_code  varchar(32)     not null default '' comment '成分编码',
    ingredient_name  varchar(32)     not null default '' comment '成分名称',
    ingredient_ratio decimal(18, 10) not null comment '成分比例',
    tenant_id        bigint null comment '租户ID',
    creator_id       bigint unsigned null comment '创建人ID',
    creator_name     varchar(50) null comment '创建人姓名',
    created_time     datetime null comment '创建时间',
    reviser_id       bigint unsigned null comment '更新人ID',
    reviser_name     varchar(50) null comment '更新人姓名',
    revised_time     datetime null comment '更新时间',
    deleted          tinyint unsigned default '0' not null comment '逻辑删除：0-否；1-是'
) comment '现货成分' row_format = DYNAMIC;
create index idx_created_time
    on spot_style_ingredient (created_time);
create index idx_task_id
    on spot_style_ingredient (task_id);

create table clip_label_task
(
    task_id        bigint unsigned not null comment '任务ID'
        primary key,
    bus_id         bigint unsigned not null comment '业务主键ID',
    task_code      varchar(80) null comment '任务编号',
    bus_type       varchar(80) null comment '业务来源',
    task_status    int default 0 not null comment '任务状态：0-排队中；10-生成中；20-已中止；30-已完成；50-失败；60-超时失败；',
    input_img      varchar(512)  not null comment '输入图片URL（多张,隔开）',
    style_type     tinyint null comment '款式类型：0-净色、1-花型',
    category       varchar(80) null comment '识别品类名称',
    category_code  varchar(64) null comment '识别品类编号',
    extend_actions varchar(32) null comment '扩展处理:1-风格,2-花型识别,3-多姿势,4-面料识别及推荐,5-花型提取,6-场景,7-模特,8-Try换装',
    pred_labels    json null comment '预测的标签：不支持品类，则返回品类是其他',
    usable_labels  json null comment '可用的标签',
    useful_flat    tinyint null comment '有效平铺：0-否；1-是',
    push_status    tinyint unsigned default '0' null comment '推送状态：0-未推送；1-已推送；2-推送失败',
    push_time      datetime null comment '推送时间',
    push_times     int default 0 null comment '推送次数',
    pull_time      datetime null comment '拉取时间',
    pull_times     int default 0 null comment '拉取次数',
    ai_start_time  datetime null comment 'AI开始处理时间',
    ai_end_time    datetime null comment 'AI结束处理时间',
    message        varchar(200) null comment '信息备注',
    tenant_id      bigint null comment '租户ID',
    creator_id     bigint unsigned null comment '创建人ID',
    creator_name   varchar(50) null comment '创建人姓名',
    created_time   datetime null comment '创建时间',
    reviser_id     bigint unsigned null comment '更新人ID',
    reviser_name   varchar(50) null comment '更新人姓名',
    revised_time   datetime null comment '更新时间',
    deleted        tinyint unsigned default '0' not null comment '逻辑删除：0-否；1-是'
) comment '提取标签任务' row_format = DYNAMIC;
create index idx_bus_id
    on clip_label_task (bus_id);
create index idx_created_time
    on clip_label_task (created_time);
create table fashion_analysis_task
(
    task_id        bigint unsigned not null comment '任务ID'
        primary key,
    bus_id         bigint unsigned not null comment '业务主键ID',
    task_code      varchar(80) null comment '任务编号',
    bus_type       varchar(80) null comment '业务来源',
    task_status    int default 0 not null comment '任务状态：0-排队中；10-生成中；20-已中止；30-已完成；50-失败；60-超时失败；',
    input_img      varchar(512)  not null comment '输入图片URL（多张,隔开）',
    title_style    varchar(128) null comment '标题风格',
    title_season   varchar(128) null comment '标题季节',
    title_data     json null comment '标题数据',
    pattern_result varchar(256) null comment '花型结果',
    pattern_data   json null comment '花型数据',
    color_result   varchar(256) null comment '颜色结果',
    color_data     json null comment '颜色数据',
    push_status    tinyint unsigned default '0' null comment '推送状态：0-未推送；1-已推送；2-推送失败',
    push_time      datetime null comment '推送时间',
    push_times     int default 0 null comment '推送次数',
    pull_time      datetime null comment '拉取时间',
    pull_times     int default 0 null comment '拉取次数',
    ai_start_time  datetime null comment 'AI开始处理时间',
    ai_end_time    datetime null comment 'AI结束处理时间',
    message        varchar(200) null comment '信息备注',
    tenant_id      bigint null comment '租户ID',
    creator_id     bigint unsigned null comment '创建人ID',
    creator_name   varchar(50) null comment '创建人姓名',
    created_time   datetime null comment '创建时间',
    reviser_id     bigint unsigned null comment '更新人ID',
    reviser_name   varchar(50) null comment '更新人姓名',
    revised_time   datetime null comment '更新时间',
    deleted        tinyint unsigned default '0' not null comment '逻辑删除：0-否；1-是'
) comment 'fashion分析任务' row_format = DYNAMIC;
create index idx_bus_id
    on fashion_analysis_task (bus_id);
create index idx_created_time
    on fashion_analysis_task (created_time);

create table temu_order_sync
(
    sync_id            bigint          not null comment '同步ID'
        primary key,
    order_number       decimal(18, 10) not null comment '应履约件数',
    order_code         varchar(256)    not null comment '订单号',
    commodity_attr     varchar(256)    not null comment '商品属性',
    order_status       varchar(64)     not null comment '订单状态',
    skc_id             bigint unsigned not null comment 'SKC ID',
    sku_id             bigint unsigned not null comment 'SKU ID',
    product_id         bigint unsigned not null comment '商品 ID',
    spu_code           varchar(32)     not null default '' comment '款号',
    order_created_time datetime null comment '订单创建时间',
    skc_status         varchar(32) null comment 'SKC状态',
    skc_site_status    int COMMENT '商品状态:1,在售;0:未发布到站点;0:下架',
    sync_status        tinyint                  default 1 null comment '同步给业务状态：0-未同步；1-已同步',
    sync_time          datetime null comment '同步时间',
    sync_times         int                      default 0 null comment '同步次数',
    message            varchar(256) null comment '信息备注',
    tenant_id          bigint null comment '租户ID',
    creator_id         bigint unsigned null comment '创建人ID',
    creator_name       varchar(50) null comment '创建人姓名',
    created_time       datetime null comment '创建时间',
    reviser_id         bigint unsigned null comment '更新人ID',
    reviser_name       varchar(50) null comment '更新人姓名',
    revised_time       datetime null comment '更新时间',
    deleted            tinyint unsigned default '0' not null comment '逻辑删除：0-否；1-是'
) comment 'Temu订单同步记录' row_format = DYNAMIC;
create index idx_created_time
    on temu_order_sync (created_time);
create index idx_skc_id
    on temu_order_sync (skc_id);
create index idx_product_id
    on temu_order_sync (product_id);
create table spot_buyer_code
(
    task_id      bigint      not null comment '任务ID'
        primary key,
    parent_id    bigint               default 0 null comment '父任务ID',
    log_id       bigint      not null default 0 comment '日志ID',
    gen_code     varchar(32) not null default '' comment '买手码',
    code_status  int unsigned default '0' null comment '分码状态',
    message      varchar(256) null comment '信息备注',
    tenant_id    bigint null comment '租户ID',
    creator_id   bigint unsigned null comment '创建人ID',
    creator_name varchar(50) null comment '创建人姓名',
    created_time datetime null comment '创建时间',
    reviser_id   bigint unsigned null comment '更新人ID',
    reviser_name varchar(50) null comment '更新人姓名',
    revised_time datetime null comment '更新时间',
    deleted      tinyint unsigned default '0' not null comment '逻辑删除：0-否；1-是'
) comment '现货买手分码表' row_format = DYNAMIC;
create index idx_created_time
    on spot_buyer_code (created_time);
create index idx_parent_id
    on spot_buyer_code (parent_id);
create index idx_log_id
    on spot_buyer_code (log_id);
create table plm_buyer_log
(
    log_id        bigint      not null comment '任务ID'
        primary key,
    task_id       bigint               default 0 null comment '任务Id',
    skc_id        bigint               default 0 null comment 'SKC ID',
    log_type      varchar(32) not null default '' comment '类型',
    push_status   tinyint unsigned default '0' null comment '推送状态：0-未推送；1-已推送；2-推送失败',
    push_time     datetime null comment '推送时间',
    push_times    int                  default 0 null comment '推送次数',
    content       json null comment '日志内容',
    response_data json null comment '买手结果',
    message       varchar(256) null comment '信息备注',
    tenant_id     bigint null comment '租户ID',
    creator_id    bigint unsigned null comment '创建人ID',
    creator_name  varchar(50) null comment '创建人姓名',
    created_time  datetime null comment '创建时间',
    reviser_id    bigint unsigned null comment '更新人ID',
    reviser_name  varchar(50) null comment '更新人姓名',
    revised_time  datetime null comment '更新时间',
    deleted       tinyint unsigned default '0' not null comment '逻辑删除：0-否；1-是'
) comment '现货买手推送表' row_format = DYNAMIC;
create index idx_created_time
    on plm_buyer_log (created_time);
create index idx_task_id
    on plm_buyer_log (task_id);


create table temu_color
(
    val_id       bigint not null comment '主键ID'
        primary key,
    template_id  bigint       default 0 null comment '模板ID',
    color_id     bigint not null comment '颜色ID',
    color_name   varchar(256) null comment '颜色名',
    spec_id      bigint null comment '规格ID',
    group_id     bigint       default 0 null comment '分组ID',
    group_name   varchar(256) default '' null comment '分组名',
    extend_info  varchar(512) null comment '扩展信息',
    available    tinyint      default 0 null comment '可以用的',
    message      varchar(256) null comment '信息备注',
    tenant_id    bigint null comment '租户ID',
    creator_id   bigint unsigned              null comment '创建人ID',
    creator_name varchar(50) null comment '创建人姓名',
    created_time datetime null comment '创建时间',
    reviser_id   bigint unsigned              null comment '更新人ID',
    reviser_name varchar(50) null comment '更新人姓名',
    revised_time datetime null comment '更新时间',
    deleted      tinyint unsigned default '0' not null comment '逻辑删除：0-否；1-是'
) comment 'temu颜色表' row_format = DYNAMIC;
create index idx_created_time
    on temu_color (created_time);
create table temu_size
(
    val_id       bigint not null comment '主键ID'
        primary key,
    template_id  bigint  default 0 null comment '模板ID',
    size_id      bigint not null comment '尺码ID',
    size_name    varchar(256) null comment '尺码名',
    spec_id      bigint null comment '规格ID',
    group_id     bigint not null comment '分组ID',
    group_name   varchar(256) null comment '分组名',
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
) comment 'temu尺码表' row_format = DYNAMIC;
create index idx_created_time
    on temu_size (created_time);
CREATE TABLE `style_on_shelves`
(
    `style_id`             bigint unsigned NOT NULL COMMENT '款ID',
    `style_code`           varchar(80) COLLATE utf8mb4_general_ci                        DEFAULT NULL COMMENT '款号',
    `review_status`        tinyint                                                       DEFAULT '0' COMMENT '审核状态，0-待审核，1-已通过，2-已驳回',
    `release_status`       tinyint                                                       DEFAULT NULL COMMENT '发布状态，0-待发布，1-发布中，2-已发布，3-发布失败',
    `designer_id`          bigint                                                        DEFAULT NULL COMMENT '设计师id【设计师】',
    `designer_name`        varchar(32) COLLATE utf8mb4_general_ci                        DEFAULT NULL COMMENT '设计师名称【设计师】',
    `style_type`           varchar(32) COLLATE utf8mb4_general_ci NOT NULL               DEFAULT '' COMMENT '开款类型',
    `source_type`          varchar(32) COLLATE utf8mb4_general_ci NOT NULL               DEFAULT '' COMMENT '数据来源',
    `suit_piece`           int                                                           DEFAULT '0' COMMENT '套装件数',
    `main_img_url`         varchar(512) COLLATE utf8mb4_general_ci                       DEFAULT '' COMMENT '主图url',
    `supply_mode_code`     varchar(32) COLLATE utf8mb4_general_ci                        DEFAULT NULL COMMENT '供给方式编码',
    `supply_mode_name`     varchar(32) COLLATE utf8mb4_general_ci                        DEFAULT NULL COMMENT '供给方式',
    `store_id`             bigint                                                        DEFAULT NULL COMMENT '店铺id',
    `store_name`           varchar(32) COLLATE utf8mb4_general_ci                        DEFAULT NULL COMMENT '店铺名称',
    `scene_code`           varchar(255) COLLATE utf8mb4_general_ci                       DEFAULT NULL COMMENT '场景编码',
    `scene_name`           varchar(32) COLLATE utf8mb4_general_ci                        DEFAULT NULL COMMENT '场景名称',
    `quality_level_code`   varchar(64) COLLATE utf8mb4_general_ci                        DEFAULT NULL COMMENT '品质等级编号',
    `quality_level_name`   varchar(32) COLLATE utf8mb4_general_ci                        DEFAULT NULL COMMENT '品质等级',
    `style_level_code`     varchar(255) COLLATE utf8mb4_general_ci                       DEFAULT NULL COMMENT '款式等级编号',
    `style_level_name`     varchar(32) COLLATE utf8mb4_general_ci                        DEFAULT NULL COMMENT '款式等级',
    `weave_mode_code`      varchar(32) COLLATE utf8mb4_general_ci                        DEFAULT NULL COMMENT '织造方式code',
    `weave_mode_name`      varchar(32) COLLATE utf8mb4_general_ci                        DEFAULT NULL COMMENT '织造方式',
    `wave_band_code`       varchar(32) COLLATE utf8mb4_general_ci                        DEFAULT NULL COMMENT '波段编码',
    `wave_band_name`       varchar(32) COLLATE utf8mb4_general_ci                        DEFAULT NULL COMMENT '波段名称',
    `category_code`        varchar(256) COLLATE utf8mb4_general_ci                       DEFAULT NULL COMMENT '款式品类编码',
    `category_name`        varchar(256) COLLATE utf8mb4_general_ci                       DEFAULT NULL COMMENT '款式品类名',
    `size_standard_code`   varchar(64) COLLATE utf8mb4_general_ci                        DEFAULT NULL COMMENT '尺码标准编号',
    `size_standard_name`   varchar(64) COLLATE utf8mb4_general_ci                        DEFAULT NULL COMMENT '尺码标准',
    `clothing_style_code`  varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci  DEFAULT NULL COMMENT '款式风格编码',
    `clothing_style_name`  varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci  DEFAULT NULL COMMENT '款式风格名称',
    `spot_style_type_code` varchar(32) COLLATE utf8mb4_general_ci                        DEFAULT NULL COMMENT '现货类型编码',
    `spot_style_type_name` varchar(32) COLLATE utf8mb4_general_ci                        DEFAULT NULL COMMENT '现货类型名称',
    `pallet_type_code`     varchar(32) COLLATE utf8mb4_general_ci                        DEFAULT NULL COMMENT '货盘类型编码',
    `pallet_type_name`     varchar(32) COLLATE utf8mb4_general_ci                        DEFAULT NULL COMMENT '货盘类型名称',
    `platform_code`        varchar(32) COLLATE utf8mb4_general_ci                        DEFAULT NULL COMMENT '平台编码',
    `platform_name`        varchar(32) COLLATE utf8mb4_general_ci NOT NULL               DEFAULT '' COMMENT '平台名称',
    `printing_code`        varchar(32) COLLATE utf8mb4_general_ci                        DEFAULT NULL COMMENT '印花编码',
    `printing_name`        varchar(32) COLLATE utf8mb4_general_ci NOT NULL               DEFAULT '' COMMENT '印花名称',
    `pattern_code`         varchar(32) COLLATE utf8mb4_general_ci                        DEFAULT NULL COMMENT '版型编码',
    `pattern_name`         varchar(32) COLLATE utf8mb4_general_ci NOT NULL               DEFAULT '' COMMENT '版型名称',
    `elastic_code`         varchar(32) COLLATE utf8mb4_general_ci                        DEFAULT NULL COMMENT '弹性编码',
    `elastic_name`         varchar(32) COLLATE utf8mb4_general_ci NOT NULL               DEFAULT '' COMMENT '弹性名称',
    `season_code`          varchar(32) COLLATE utf8mb4_general_ci                        DEFAULT NULL COMMENT '季节编码',
    `season_name`          varchar(32) COLLATE utf8mb4_general_ci NOT NULL               DEFAULT '' COMMENT '季节名称',
    `gala_code`            varchar(32) COLLATE utf8mb4_general_ci                        DEFAULT NULL COMMENT '节日编码',
    `gala_name`            varchar(32) COLLATE utf8mb4_general_ci NOT NULL               DEFAULT '' COMMENT '节日名称',
    `visual_form_code`     varchar(32) COLLATE utf8mb4_general_ci                        DEFAULT NULL COMMENT '视觉形式编码',
    `visual_form_name`     varchar(32) COLLATE utf8mb4_general_ci NOT NULL               DEFAULT '' COMMENT '视觉形式名称',
    `sku_class_code`       varchar(32) COLLATE utf8mb4_general_ci                        DEFAULT NULL COMMENT 'sku类别编码',
    `sku_class_name`       varchar(32) COLLATE utf8mb4_general_ci NOT NULL               DEFAULT '' COMMENT 'sku类别名称',
    `style_label_code`     varchar(32) COLLATE utf8mb4_general_ci                        DEFAULT NULL COMMENT '款式标签编码',
    `style_label_name`     varchar(32) COLLATE utf8mb4_general_ci                        DEFAULT '' COMMENT '款式标签名称',
    `commodity_link`       varchar(512) COLLATE utf8mb4_general_ci                       DEFAULT '' COMMENT '商品链接',
    `developer_id`         bigint                                                        DEFAULT NULL COMMENT '开发人ID',
    `developer_name`       varchar(32) COLLATE utf8mb4_general_ci                        DEFAULT NULL COMMENT '开发人名称',
    `cloth_gross_weight`   decimal(18, 10)                                               DEFAULT NULL COMMENT '成衣毛重',
    `title_data`           json                                                          DEFAULT NULL COMMENT '标题数据',
    `english_title`        varchar(256) COLLATE utf8mb4_general_ci                       DEFAULT NULL COMMENT '英文标题',
    `usable_labels`        varchar(256) COLLATE utf8mb4_general_ci                       DEFAULT NULL COMMENT '可用的标签',
    `fabric_material`      varchar(128) COLLATE utf8mb4_general_ci                       DEFAULT '' COMMENT '面料材质',
    `fabric_texture`       varchar(128) COLLATE utf8mb4_general_ci                       DEFAULT '' COMMENT '面料纹理',
    `fabric_style`         varchar(128) COLLATE utf8mb4_general_ci                       DEFAULT '' COMMENT '面料风格',
    `pattern`              varchar(128) COLLATE utf8mb4_general_ci                       DEFAULT '' COMMENT '面料材质',
    `style_ingredient`     json                                                          DEFAULT NULL COMMENT '成分',
    `attachment`           json                                                          DEFAULT NULL COMMENT '附件[]字符串数组',
    `size_attachment`      json                                                          DEFAULT NULL COMMENT '尺码附件[]字符串数组',
    `transparency`         varchar(128) COLLATE utf8mb4_general_ci                       DEFAULT '' COMMENT '透明度',
    `review_user_id`       bigint                                                        DEFAULT NULL COMMENT '审核人ID',
    `review_user_name`     varchar(32) COLLATE utf8mb4_general_ci                        DEFAULT NULL COMMENT '审核人名称',
    `review_time`          datetime                                                      DEFAULT NULL COMMENT '审核时间',
    `review_fail_reason`   varchar(256) COLLATE utf8mb4_general_ci                       DEFAULT NULL COMMENT '审核不通过原因',
    `release_fail_reason`  varchar(256) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '发布失败原因',
    `message`              varchar(256) COLLATE utf8mb4_general_ci                       DEFAULT NULL COMMENT '信息备注',
    `creator_name`         varchar(50) COLLATE utf8mb4_general_ci                        DEFAULT NULL COMMENT '创建人姓名',
    `created_time`         datetime                                                      DEFAULT NULL COMMENT '创建时间',
    `revised_time`         datetime                                                      DEFAULT NULL COMMENT '更新时间',
    `deleted`              tinyint unsigned NOT NULL DEFAULT '0' COMMENT '逻辑删除：0-否；1-是',
    `reviser_name`         varchar(50) COLLATE utf8mb4_general_ci                        DEFAULT NULL COMMENT '更新人姓名',
    `reviser_id`           bigint unsigned DEFAULT NULL COMMENT '更新人ID',
    `details`              varchar(128) COLLATE utf8mb4_general_ci                       DEFAULT NULL COMMENT '标题详情',
    `chinese_title`        varchar(128) COLLATE utf8mb4_general_ci                       DEFAULT NULL COMMENT '英文标题',
    `tenant_id`            bigint                                                        DEFAULT NULL COMMENT '租户ID',
    `creator_id`           bigint unsigned DEFAULT NULL COMMENT '创建人ID',
    PRIMARY KEY (`style_id`),
    KEY                    `idx_created_time` (`created_time`),
    KEY                    `idx_style_code` (`style_code`),
    KEY                    `idx_revised_time` (`revised_time`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci ROW_FORMAT=DYNAMIC COMMENT='款上架表';

create table skc_on_shelves
(
    skc_id               bigint                 not null comment '主键id'
        primary key,
    style_id             bigint unsigned not null comment '款ID',
    skc_code             varchar(80)            not null comment 'SKC编码',
    on_shelves_status    int          default 0 not null comment '上架状态：1-上架；0-下架；',
    spliced              int          default 0 not null comment '是否拼接：1-拼接；；',
    main_img_url         varchar(512) default '' null comment '主图url',
    color                varchar(128) null comment '颜色名称',
    `size_standard_code` varchar(64) NULL COMMENT '尺码标准编号',
    size_standard_name   varchar(64) null comment '尺码标准',
    size_name            varchar(64) null comment '尺码',
    size_code            varchar(64) null comment '尺码编码',
    attachment           json null comment '附件',
    message              varchar(256) null comment '信息备注',
    tenant_id            bigint null comment '租户ID',
    creator_id           bigint unsigned null comment '创建人ID',
    creator_name         varchar(50) null comment '创建人姓名',
    created_time         datetime null comment '创建时间',
    reviser_id           bigint unsigned null comment '更新人ID',
    reviser_name         varchar(50) null comment '更新人姓名',
    revised_time         datetime null comment '更新时间',
    deleted              tinyint unsigned default '0' not null comment '逻辑删除：0-否；1-是'
) comment 'SKC上架表' row_format = DYNAMIC;
create index idx_created_time
    on skc_on_shelves (created_time);
create index idx_revised_time
    on skc_on_shelves (revised_time);
create index idx_style_id
    on skc_on_shelves (style_id);
create index idx_skc_code
    on skc_on_shelves (skc_code);

CREATE TABLE `style_skc_on_shelves_picture`
(
    `picture_id`    bigint  NOT NULL COMMENT '图片id',
    `style_id`      bigint  NOT NULL COMMENT '款ID',
    `skc_id`        bigint  NOT NULL COMMENT 'SKC-ID',
    `picture_type`  tinyint NOT NULL COMMENT '图片类型，0-商品图，1-尺码图',
    `material_type` tinyint                                                       DEFAULT '0' COMMENT '材料类型: 0-图片; 1-视频',
    `picture_url`   varchar(256) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '图片url',
    `crop_img_url`  varchar(256) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '裁剪图',
    `serial_num`    int                                                           DEFAULT NULL COMMENT '序号',
    `tenant_id`     bigint                                                        DEFAULT NULL COMMENT '租户ID',
    `creator_id`    bigint                                                        DEFAULT NULL COMMENT '创建人ID',
    `creator_name`  varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci  DEFAULT NULL COMMENT '创建人姓名',
    `created_time`  datetime                                                      DEFAULT NULL COMMENT '创建时间',
    `reviser_id`    bigint                                                        DEFAULT NULL COMMENT '更新人ID',
    `reviser_name`  varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci  DEFAULT NULL COMMENT '更新人姓名',
    `revised_time`  datetime                                                      DEFAULT NULL COMMENT '更新时间',
    `deleted`       tinyint NOT NULL                                              DEFAULT '0' COMMENT '逻辑删除：0-否；1-是',
    PRIMARY KEY (`picture_id`),
    KEY             `idx_style_id` (`style_id`),
    KEY             `idx_created_time` (`created_time`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci ROW_FORMAT=DYNAMIC COMMENT='款式-skc上架图片表';

create table plm_style_log
(
    log_id        bigint      not null comment '任务ID'
        primary key,
    task_id       bigint               default 0 null comment '任务Id',
    skc_id        bigint               default 0 null comment 'SKC ID',
    log_type      varchar(32) not null default '' comment '类型',
    push_status   tinyint unsigned default '0' null comment '推送状态：0-未推送；1-已推送；2-推送失败',
    push_time     datetime null comment '推送时间',
    push_times    int                  default 0 null comment '推送次数',
    content       json null comment '日志内容',
    response_data json null comment '买手结果',
    message       varchar(256) null comment '信息备注',
    tenant_id     bigint null comment '租户ID',
    creator_id    bigint unsigned null comment '创建人ID',
    creator_name  varchar(50) null comment '创建人姓名',
    created_time  datetime null comment '创建时间',
    reviser_id    bigint unsigned null comment '更新人ID',
    reviser_name  varchar(50) null comment '更新人姓名',
    revised_time  datetime null comment '更新时间',
    deleted       tinyint unsigned default '0' not null comment '逻辑删除：0-否；1-是'
) comment '款式推送表' row_format = DYNAMIC;
create index idx_created_time
    on plm_style_log (created_time);
create index idx_task_id
    on plm_style_log (task_id);
ALTER TABLE `style_gen_task`
    ADD COLUMN enable_distill tinyint default 0 null comment '是否使用蒸馏加速：0-否；1-是；' AFTER `gen_count`;

create table sku_grading
(
    sku_grading_id      bigint        not null comment '主键id'
        primary key,
    style_id            bigint unsigned not null comment '款ID',
    style_code          varchar(80) null comment '款号',
    skc_id              bigint unsigned not null comment 'SKC ID',
    skc_code            varchar(80)   not null comment 'SKC编码',
    sku_code            varchar(80)   not null comment 'SKU编码',
    grading_status      int default 0 not null comment '放码状态：0；',
    clothes_length_size decimal(18, 10) null comment '衣长尺寸',
    sleeve_length_size  decimal(18, 10) null comment '袖长尺寸',
    skirt_length_size   decimal(18, 10) null comment '裙长尺寸',
    pant_length_size    decimal(18, 10) null comment '裤长尺寸',
    inseam_length_size  decimal(18, 10) null comment '裤内长尺寸',
    shoulder_width_size decimal(18, 10) null comment '肩宽尺寸',
    bust_size           decimal(18, 10) null comment '胸围尺寸',
    waistline_size      decimal(18, 10) null comment '腰围尺寸',
    hipline_size        decimal(18, 10) null comment '臀围尺寸',
    category_code       varchar(256) null comment '品类',
    category_name       varchar(256) null comment '品类名称',
    size_standard_code  varchar(64) null comment '尺码标准',
    size_standard_name  varchar(64) null comment '尺码标准名称',
    size_name           varchar(64) null comment '尺码名称',
    size_code           varchar(64) null comment '尺码',
    usable_labels       varchar(256) null comment '可用的标签',
    message             varchar(256) null comment '信息备注',
    tenant_id           bigint null comment '租户ID',
    creator_id          bigint unsigned null comment '创建人ID',
    creator_name        varchar(50) null comment '创建人姓名',
    created_time        datetime null comment '创建时间',
    reviser_id          bigint unsigned null comment '更新人ID',
    reviser_name        varchar(50) null comment '更新人姓名',
    revised_time        datetime null comment '更新时间',
    deleted             tinyint unsigned default '0' not null comment '逻辑删除：0-否；1-是'
) comment 'SKU放码表' row_format = DYNAMIC;
create index idx_created_time
    on sku_grading (created_time);
create index idx_revised_time
    on sku_grading (revised_time);
create index idx_sku_code
    on sku_grading (sku_code);
create index idx_style_id
    on sku_grading (style_id);
create index idx_skc_id
    on sku_grading (skc_id);
create table grading_size
(
    grading_size_id   bigint      not null comment '主键id'
        primary key,
    grading_size_code varchar(80) not null comment '放码尺寸编码',
    grading_number    decimal(18, 10) null comment '放码数量',
    category_size     varchar(32) not null default '' comment '品类尺码',
    category_code     varchar(512) null comment '品类',
    category_name     varchar(512) null comment '品类名称',
    position_code     varchar(64) null comment '部位编码',
    position_name     varchar(64) null comment '部位名称',
    position_label    varchar(256) null comment '部位标签',
    style_code        varchar(64) null comment '款式编码',
    style_name        varchar(64) null comment '款式名称',
    acquiescent       tinyint unsigned default '0' not null comment '默认的：0-否；1-是',
    min_size          decimal(18, 10) null comment '最小尺寸',
    max_size          decimal(18, 10) null comment '最大尺寸',
    mean              decimal(18, 10) null comment '均值',
    grading_rule      json null comment '放码规则',
    message           varchar(256) null comment '信息备注',
    tenant_id         bigint null comment '租户ID',
    creator_id        bigint unsigned null comment '创建人ID',
    creator_name      varchar(50) null comment '创建人姓名',
    created_time      datetime null comment '创建时间',
    reviser_id        bigint unsigned null comment '更新人ID',
    reviser_name      varchar(50) null comment '更新人姓名',
    revised_time      datetime null comment '更新时间',
    deleted           tinyint unsigned default '0' not null comment '逻辑删除：0-否；1-是'
) comment '放码尺寸表' row_format = DYNAMIC;
create index idx_created_time
    on grading_size (created_time);
create index idx_grading_size_code
    on grading_size (grading_size_code);
create table page_view
(
    page_id      bigint      not null comment '主键id'
        primary key,
    page_code    varchar(80) not null comment '页面编码',
    page_name    varchar(64) not null default '' comment '页面名称',
    page_status  int                  default 0 not null comment '页面状态：0；',
    message      varchar(256) null comment '信息备注',
    tenant_id    bigint null comment '租户ID',
    creator_id   bigint unsigned null comment '创建人ID',
    creator_name varchar(50) null comment '创建人姓名',
    created_time datetime null comment '创建时间',
    reviser_id   bigint unsigned null comment '更新人ID',
    reviser_name varchar(50) null comment '更新人姓名',
    revised_time datetime null comment '更新时间',
    deleted      tinyint unsigned default '0' not null comment '逻辑删除：0-否；1-是'
) comment '页面表' row_format = DYNAMIC;
create index idx_created_time
    on page_view (created_time);
create index idx_page_code
    on page_view (page_code);
create table page_form
(
    form_id      bigint      not null comment '主键id'
        primary key,
    page_id      bigint      not null comment '页面id',
    form_code    varchar(80) not null comment '表单编码',
    form_name    varchar(64) not null default '' comment '表单名称',
    form_status  int                  default 0 not null comment '表单状态：0；',
    order_num    int                  default 0 COMMENT '排序号',
    message      varchar(256) null comment '信息备注',
    tenant_id    bigint null comment '租户ID',
    creator_id   bigint unsigned null comment '创建人ID',
    creator_name varchar(50) null comment '创建人姓名',
    created_time datetime null comment '创建时间',
    reviser_id   bigint unsigned null comment '更新人ID',
    reviser_name varchar(50) null comment '更新人姓名',
    revised_time datetime null comment '更新时间',
    deleted      tinyint unsigned default '0' not null comment '逻辑删除：0-否；1-是'
) comment '页面表单表' row_format = DYNAMIC;
create index idx_created_time
    on page_form (created_time);
create index idx_form_code
    on page_form (form_code);
create table field_type
(
    type_id        bigint      not null comment '主键id'
        primary key,
    type_code      varchar(80) not null comment '类型编码',
    type_name      varchar(64) not null default '' comment '类型名称',
    type_status    int                  default 0 not null comment '类型状态：0；',
    type_component VARCHAR(128) COMMENT '类型组件',
    type_config    json comment '组件配置',
    message        varchar(256) null comment '信息备注',
    tenant_id      bigint null comment '租户ID',
    creator_id     bigint unsigned null comment '创建人ID',
    creator_name   varchar(50) null comment '创建人姓名',
    created_time   datetime null comment '创建时间',
    reviser_id     bigint unsigned null comment '更新人ID',
    reviser_name   varchar(50) null comment '更新人姓名',
    revised_time   datetime null comment '更新时间',
    deleted        tinyint unsigned default '0' not null comment '逻辑删除：0-否；1-是'
) comment '字段类型表' row_format = DYNAMIC;

create table operation_type
(
    type_id        bigint      not null comment '主键id'
        primary key,
    type_code      varchar(80) not null comment '类型编码',
    type_name      varchar(64) not null default '' comment '类型名称',
    type_status    int                  default 0 not null comment '类型状态：0；',
    type_component VARCHAR(128) COMMENT '类型组件',
    type_config    json comment '组件配置',
    message        varchar(256) null comment '信息备注',
    tenant_id      bigint null comment '租户ID',
    creator_id     bigint unsigned null comment '创建人ID',
    creator_name   varchar(50) null comment '创建人姓名',
    created_time   datetime null comment '创建时间',
    reviser_id     bigint unsigned null comment '更新人ID',
    reviser_name   varchar(50) null comment '更新人姓名',
    revised_time   datetime null comment '更新时间',
    deleted        tinyint unsigned default '0' not null comment '逻辑删除：0-否；1-是'
) comment '操作类型表' row_format = DYNAMIC;

create table component_type
(
    type_id        bigint      not null comment '主键id'
        primary key,
    type_code      varchar(80) not null comment '类型编码',
    type_name      varchar(64) not null default '' comment '类型名称',
    type_status    int                  default 0 not null comment '类型状态：0；',
    type_component VARCHAR(128) COMMENT '类型组件',
    type_config    json comment '组件配置',
    message        varchar(256) null comment '信息备注',
    tenant_id      bigint null comment '租户ID',
    creator_id     bigint unsigned null comment '创建人ID',
    creator_name   varchar(50) null comment '创建人姓名',
    created_time   datetime null comment '创建时间',
    reviser_id     bigint unsigned null comment '更新人ID',
    reviser_name   varchar(50) null comment '更新人姓名',
    revised_time   datetime null comment '更新时间',
    deleted        tinyint unsigned default '0' not null comment '逻辑删除：0-否；1-是'
) comment '组件类型表' row_format = DYNAMIC;

create table data_source
(
    source_id     bigint      not null comment '主键id'
        primary key,
    source_code   varchar(80) not null comment '类型编码',
    source_name   varchar(64) not null default '' comment '类型名称',
    source_status int                  default 0 not null comment '类型状态：0；',
    message       varchar(256) null comment '信息备注',
    tenant_id     bigint null comment '租户ID',
    creator_id    bigint unsigned null comment '创建人ID',
    creator_name  varchar(50) null comment '创建人姓名',
    created_time  datetime null comment '创建时间',
    reviser_id    bigint unsigned null comment '更新人ID',
    reviser_name  varchar(50) null comment '更新人姓名',
    revised_time  datetime null comment '更新时间',
    deleted       tinyint unsigned default '0' not null comment '逻辑删除：0-否；1-是'
) comment '数据来源表' row_format = DYNAMIC;

create table validation_rule
(
    rule_id      bigint      not null comment '主键id'
        primary key,
    rule_code    varchar(80) not null comment '类型编码',
    rule_name    varchar(64) not null default '' comment '类型名称',
    rule_status  int                  default 0 not null comment '类型状态：0；',
    message      varchar(256) null comment '信息备注',
    tenant_id    bigint null comment '租户ID',
    creator_id   bigint unsigned null comment '创建人ID',
    creator_name varchar(50) null comment '创建人姓名',
    created_time datetime null comment '创建时间',
    reviser_id   bigint unsigned null comment '更新人ID',
    reviser_name varchar(50) null comment '更新人姓名',
    revised_time datetime null comment '更新时间',
    deleted      tinyint unsigned default '0' not null comment '逻辑删除：0-否；1-是'
) comment '校验规则表' row_format = DYNAMIC;

create table field_info
(
    field_id      bigint      not null comment '主键id'
        primary key,
    form_id       bigint      not null comment '页面id',
    page_id       bigint      not null comment '页面id',
    type_id       bigint      not null comment '类型id',
    parent_id     bigint      not null default 0 comment '父级id',
    field_code    varchar(80) not null comment '字段编码',
    field_name    varchar(64) not null default '' comment '字段名称',
    field_title   varchar(64) not null default '' comment '字段标题',
    placeholder   varchar(64) not null default '' comment '字段占位文本',
    field_status  int                  default 0 not null comment '字段状态：0；',
    required      int                  default 0 not null comment '是否必填：0；',
    visible       int                  default 1 not null comment '是否展示：0；',
    default_value VARCHAR(512) comment '默认值',
    field_config  json comment '字段配置',
    order_num     int                  default 0 COMMENT '排序号',
    message       varchar(256) null comment '信息备注',
    tenant_id     bigint null comment '租户ID',
    creator_id    bigint unsigned null comment '创建人ID',
    creator_name  varchar(50) null comment '创建人姓名',
    created_time  datetime null comment '创建时间',
    reviser_id    bigint unsigned null comment '更新人ID',
    reviser_name  varchar(50) null comment '更新人姓名',
    revised_time  datetime null comment '更新时间',
    deleted       tinyint unsigned default '0' not null comment '逻辑删除：0-否；1-是'
) comment '页面表单表' row_format = DYNAMIC;
create index idx_created_time
    on field_info (created_time);
create index idx_field_code
    on field_info (field_code);

create table field_validation
(
    validation_id bigint not null comment '主键id'
        primary key,
    field_id      bigint not null comment '字段id',
    rule_id       bigint not null comment '规则id',
    rule_config   json comment '规则配置',
    message       varchar(256) null comment '信息备注',
    tenant_id     bigint null comment '租户ID',
    creator_id    bigint unsigned null comment '创建人ID',
    creator_name  varchar(50) null comment '创建人姓名',
    created_time  datetime null comment '创建时间',
    reviser_id    bigint unsigned null comment '更新人ID',
    reviser_name  varchar(50) null comment '更新人姓名',
    revised_time  datetime null comment '更新时间',
    deleted       tinyint unsigned default '0' not null comment '逻辑删除：0-否；1-是'
) comment '字段校验表' row_format = DYNAMIC;
create index idx_created_time
    on field_validation (created_time);
create index idx_field_id
    on field_validation (field_id);
create index idx_rule_id
    on field_validation (rule_id);
create table field_data_source
(
    data_source_id bigint not null comment '主键id'
        primary key,
    field_id       bigint not null comment '字段id',
    source_id      bigint not null comment '数据源id',
    source_config  json comment '来源配置',
    message        varchar(256) null comment '信息备注',
    tenant_id      bigint null comment '租户ID',
    creator_id     bigint unsigned null comment '创建人ID',
    creator_name   varchar(50) null comment '创建人姓名',
    created_time   datetime null comment '创建时间',
    reviser_id     bigint unsigned null comment '更新人ID',
    reviser_name   varchar(50) null comment '更新人姓名',
    revised_time   datetime null comment '更新时间',
    deleted        tinyint unsigned default '0' not null comment '逻辑删除：0-否；1-是'
) comment '字段数据来源表' row_format = DYNAMIC;
create index idx_created_time
    on field_data_source (created_time);
create index idx_field_id
    on field_data_source (field_id);
create index idx_source_id
    on field_data_source (source_id);
create table field_interaction
(
    interaction_id     bigint not null comment '主键id'
        primary key,
    field_id           bigint not null comment '字段id',
    source_field_id    bigint not null default 0 comment '来源id',
    interaction_config json comment '交互配置',
    message            varchar(256) null comment '信息备注',
    tenant_id          bigint null comment '租户ID',
    creator_id         bigint unsigned null comment '创建人ID',
    creator_name       varchar(50) null comment '创建人姓名',
    created_time       datetime null comment '创建时间',
    reviser_id         bigint unsigned null comment '更新人ID',
    reviser_name       varchar(50) null comment '更新人姓名',
    revised_time       datetime null comment '更新时间',
    deleted            tinyint unsigned default '0' not null comment '逻辑删除：0-否；1-是'
) comment '字段交互表' row_format = DYNAMIC;
create index idx_created_time
    on field_interaction (created_time);
create index idx_field_id
    on field_interaction (field_id);
create index idx_source_id
    on field_interaction (source_field_id);


create table temu_access_log
(
    log_id           bigint                  not null comment '日志ID'
        primary key,
    app_key          varchar(32)  default '' not null comment 'APP KEY',
    successful       tinyint unsigned default '0' not null comment '成功的 0 否 1是',
    request_url      varchar(256) default '' not null comment '请求地址',
    request_id       varchar(256) default '' not null comment '请求ID',
    request_params   json null comment '请求参数',
    request_type     varchar(256) default '' not null comment 'Temu接口',
    request_method   varchar(32)  default '' not null comment '请求方式',
    request_time     datetime                not null comment '请求时间',
    response_time    datetime                not null comment '响应时间',
    execute_time     bigint unsigned null comment '执行时间',
    response_body    json null comment '响应体',
    response_code    varchar(32)  default '' not null comment '响应CODE',
    response_message varchar(512) default '' not null comment '响应提示语',
    response_data    json null comment '响应数据',
    stack_trace      text null comment '异常',
    trace_id         varchar(256) default '' not null comment '链路ID',
    tenant_id        bigint null comment '租户ID',
    creator_id       bigint unsigned null comment '创建人ID',
    creator_name     varchar(50) null comment '创建人姓名',
    created_time     datetime null comment '创建时间',
    reviser_id       bigint unsigned null comment '更新人ID',
    reviser_name     varchar(50) null comment '更新人姓名',
    revised_time     datetime null comment '更新时间',
    deleted          tinyint unsigned default '0' not null comment '逻辑删除：0-否；1-是'
) comment 'temu日志表' row_format = DYNAMIC;
create index idx_created_time
    on temu_access_log (created_time);
create table temu_product_category
(
    category_id      bigint not null comment '品类ID'
        primary key,
    parent_id        bigint  default 0 null comment '父品类ID',
    category_code    varchar(256) null comment '品类编码',
    category_name    varchar(256) null comment '品类名',
    category_en_name varchar(256) null comment '品类英文名',
    level            int     default 0 null comment '品类层级',
    leaf             tinyint default 0 null comment '叶子',
    suiting          tinyint default 0 null comment '套装',
    available        tinyint default 0 null comment '可以用的',
    message          varchar(256) null comment '信息备注',
    tenant_id        bigint null comment '租户ID',
    creator_id       bigint unsigned null comment '创建人ID',
    creator_name     varchar(50) null comment '创建人姓名',
    created_time     datetime null comment '创建时间',
    reviser_id       bigint unsigned null comment '更新人ID',
    reviser_name     varchar(50) null comment '更新人姓名',
    revised_time     datetime null comment '更新时间',
    deleted          tinyint unsigned default '0' not null comment '逻辑删除：0-否；1-是'
) comment 'temu商品品类表' row_format = DYNAMIC;
create index idx_created_time
    on temu_product_category (created_time);

create table temu_product_spec
(
    spec_id      bigint not null comment '规格ID'
        primary key,
    spec_name    varchar(256) null comment '规格名',
    available    tinyint default 0 null comment '可以用的',
    message      varchar(256) null comment '信息备注',
    tenant_id    bigint null comment '租户ID',
    creator_id   bigint unsigned null comment '创建人ID',
    creator_name varchar(50) null comment '创建人姓名',
    created_time datetime null comment '创建时间',
    reviser_id   bigint unsigned null comment '更新人ID',
    reviser_name varchar(50) null comment '更新人姓名',
    revised_time datetime null comment '更新时间',
    deleted      tinyint unsigned default '0' not null comment '逻辑删除：0-否；1-是'
) comment 'temu商品规格表' row_format = DYNAMIC;
create index idx_created_time
    on temu_product_spec (created_time);
create table temu_attr_group
(
    group_id     bigint not null comment '分组ID'
        primary key,
    group_name   varchar(256) null comment '分组名',
    available    tinyint default 0 null comment '可以用的',
    message      varchar(256) null comment '信息备注',
    tenant_id    bigint null comment '租户ID',
    creator_id   bigint unsigned null comment '创建人ID',
    creator_name varchar(50) null comment '创建人姓名',
    created_time datetime null comment '创建时间',
    reviser_id   bigint unsigned null comment '更新人ID',
    reviser_name varchar(50) null comment '更新人姓名',
    revised_time datetime null comment '更新时间',
    deleted      tinyint unsigned default '0' not null comment '逻辑删除：0-否；1-是'
) comment 'temu属性分组表' row_format = DYNAMIC;
create index idx_created_time
    on temu_attr_group (created_time);
create table temu_attr_sub_group
(
    group_id     bigint not null comment '分组ID'
        primary key,
    group_name   varchar(256) null comment '分组名',
    available    tinyint default 0 null comment '可以用的',
    message      varchar(256) null comment '信息备注',
    tenant_id    bigint null comment '租户ID',
    creator_id   bigint unsigned null comment '创建人ID',
    creator_name varchar(50) null comment '创建人姓名',
    created_time datetime null comment '创建时间',
    reviser_id   bigint unsigned null comment '更新人ID',
    reviser_name varchar(50) null comment '更新人姓名',
    revised_time datetime null comment '更新时间',
    deleted      tinyint unsigned default '0' not null comment '逻辑删除：0-否；1-是'
) comment 'temu属性子分组表' row_format = DYNAMIC;
create index idx_created_time
    on temu_attr_sub_group (created_time);
create table temu_attr_value
(
    value_id        bigint not null comment '值ID'
        primary key,
    spec_id         bigint null comment '规格ID',
    group_id        bigint null comment '分组ID',
    sub_group_id    bigint null comment '子分组ID',
    value_code      varchar(256) null comment '值编码',
    value_name      varchar(256) null comment '值名称',
    val             varchar(256) null comment '值',
    additional_info varchar(512) null comment '附加信息',
    extend_info     varchar(512) null comment '扩展信息',
    parent_ids      json null comment '父值ID列表(用于层级/联动)',
    available       tinyint default 0 null comment '可以用的',
    message         varchar(256) null comment '信息备注',
    tenant_id       bigint null comment '租户ID',
    creator_id      bigint unsigned null comment '创建人ID',
    creator_name    varchar(50) null comment '创建人姓名',
    created_time    datetime null comment '创建时间',
    reviser_id      bigint unsigned null comment '更新人ID',
    reviser_name    varchar(50) null comment '更新人姓名',
    revised_time    datetime null comment '更新时间',
    deleted         tinyint unsigned default '0' not null comment '逻辑删除：0-否；1-是'
) comment 'temu属性值表' row_format = DYNAMIC;
create index idx_created_time
    on temu_attr_value (created_time);
create table temu_size_spec_ele
(
    element_id    bigint not null comment '元素ID'
        primary key,
    element_name  varchar(256) null comment '元素名称',
    element_value varchar(256) null comment '元素名称',
    description   varchar(512) null comment '描述',
    element_type  int null comment '元素类型',
    available     tinyint default 0 null comment '可以用的',
    message       varchar(256) null comment '信息备注',
    tenant_id     bigint null comment '租户ID',
    creator_id    bigint unsigned null comment '创建人ID',
    creator_name  varchar(50) null comment '创建人姓名',
    created_time  datetime null comment '创建时间',
    reviser_id    bigint unsigned null comment '更新人ID',
    reviser_name  varchar(50) null comment '更新人姓名',
    revised_time  datetime null comment '更新时间',
    deleted       tinyint unsigned default '0' not null comment '逻辑删除：0-否；1-是'
) comment 'temu尺码规格元素表' row_format = DYNAMIC;
create index idx_created_time
    on temu_size_spec_ele (created_time);
create table temu_attr_unit
(
    unit_id      bigint not null comment '单位ID'
        primary key,
    unit_name    varchar(256) null comment '单位名',
    available    tinyint default 0 null comment '可以用的',
    message      varchar(256) null comment '信息备注',
    tenant_id    bigint null comment '租户ID',
    creator_id   bigint unsigned null comment '创建人ID',
    creator_name varchar(50) null comment '创建人姓名',
    created_time datetime null comment '创建时间',
    reviser_id   bigint unsigned null comment '更新人ID',
    reviser_name varchar(50) null comment '更新人姓名',
    revised_time datetime null comment '更新时间',
    deleted      tinyint unsigned default '0' not null comment '逻辑删除：0-否；1-是'
) comment 'temu属性单位表' row_format = DYNAMIC;
create index idx_created_time
    on temu_attr_unit (created_time);
create table temu_product_temp_attr
(
    attr_id       bigint not null comment '属性ID'
        primary key,
    parent_id     bigint  default 0 null comment '父属性ID',
    attr_name     varchar(256) null comment '属性名称',
    attr_title    varchar(256) null comment '属性中文',
    attr_type     int null comment '属性类型',
    default_value varchar(512) null comment '属性默认值',
    description   varchar(512) null comment '描述',
    available     tinyint default 0 null comment '可以用的',
    message       varchar(256) null comment '信息备注',
    tenant_id     bigint null comment '租户ID',
    creator_id    bigint unsigned null comment '创建人ID',
    creator_name  varchar(50) null comment '创建人姓名',
    created_time  datetime null comment '创建时间',
    reviser_id    bigint unsigned null comment '更新人ID',
    reviser_name  varchar(50) null comment '更新人姓名',
    revised_time  datetime null comment '更新时间',
    deleted       tinyint unsigned default '0' not null comment '逻辑删除：0-否；1-是'
) comment 'temu商品模板属性表' row_format = DYNAMIC;
create index idx_created_time
    on temu_product_temp_attr (created_time);

create table temu_product_template
(
    template_id            bigint not null comment '属性ID'
        primary key,
    category_id            bigint  default 0 null comment '品类ID',
    max_spec_num           int     default 0 null comment '允许的自定义父级规范的最大数量',
    single_spec_value_num  int     default 0 null comment '单个父规范下自定义规范值的上限',
    user_input_parent_spec json null comment '当没有模板或模板具有自定义规范时,要使用的自定义父级规范列表',
    size_spec              json null comment '尺码规格',
    description            varchar(512) null comment '描述',
    available              tinyint default 0 null comment '可以用的',
    choose_all             tinyint default 0 null comment '限定规格是否全选',
    message                varchar(256) null comment '信息备注',
    tenant_id              bigint null comment '租户ID',
    creator_id             bigint unsigned null comment '创建人ID',
    creator_name           varchar(50) null comment '创建人姓名',
    created_time           datetime null comment '创建时间',
    reviser_id             bigint unsigned null comment '更新人ID',
    reviser_name           varchar(50) null comment '更新人姓名',
    revised_time           datetime null comment '更新时间',
    deleted                tinyint unsigned default '0' not null comment '逻辑删除：0-否；1-是'
) comment 'temu商品模板表' row_format = DYNAMIC;
create index idx_created_time
    on temu_product_template (created_time);
create table temu_product_template_property
(
    property_id  bigint not null comment '属性ID'
        primary key,
    template_id  bigint not null comment '模板ID',
    property     json null comment '属性 ',
    message      varchar(256) null comment '信息备注',
    tenant_id    bigint null comment '租户ID',
    creator_id   bigint unsigned null comment '创建人ID',
    creator_name varchar(50) null comment '创建人姓名',
    created_time datetime null comment '创建时间',
    reviser_id   bigint unsigned null comment '更新人ID',
    reviser_name varchar(50) null comment '更新人姓名',
    revised_time datetime null comment '更新时间',
    deleted      tinyint unsigned default '0' not null comment '逻辑删除：0-否；1-是'
) comment 'temu商品模板-属性表' row_format = DYNAMIC;
create index idx_created_time
    on temu_product_template_property (created_time);
create table temu_product_temp_val
(
    val_id                bigint not null comment '模板值ID'
        primary key,
    template_type         tinyint default 0 null comment '模板类型,0-销售属性,1-通用属性',
    template_id           bigint  default 0 null comment '模板ID',
    attr_id               bigint  default 0 null comment '属性ID',
    base_attr_id          bigint  default 0 null comment '基础属性ID',
    parent_spec_id        bigint  default 0 null comment '父规格ID',
    parent_val_id         bigint  default 0 null comment '父模板值ID',
    referenced_attr_id    bigint  default 0 null comment '引用属性ID',
    attr_value            json null comment '属性值列表',
    value_rela            json null comment '属性关系列表',
    max_value             varchar(256) null comment '最大值',
    min_value             varchar(256) null comment '最小值',
    choose_title          varchar(256) null comment '下拉标题',
    choose_title_cn       varchar(256) null comment '下拉标题中文',
    number_input_title    varchar(256) null comment '数字输入标题',
    number_input_title_cn varchar(256) null comment '数字输入标题中文',
    unit_arr              json null comment '单位列表',
    value_precision       int     default 0 null comment '允许的最大小数精度,0:表示不允许使用小数',
    choose_max_num        int     default 0 null comment '可选择项目时的最大选择项数',
    value_rule            int     default 0 null comment '数值规则,仅用于通用属性,前端验证:输入时(1:表示值之和等于100,2:表示仅允许输入字母/数字/特殊字符)',
    show_condition        json null comment '显式条件',
    control_type          tinyint default 0 null comment '控件类型:0-仅输入,1-可选,3-既可输入又可选择,16-属性选择和数值输入',
    reference_type        tinyint default 0 null comment '属性值引用类型:0-普通,1-外部品牌库',
    show_type             tinyint default 0 null comment '属性显示类型,0-正常显示,1-选择指定父属性值时显示',
    feature               tinyint default 0 null comment '属性特征(目前决定是否分组,0-通用,1-颜色,2-尺寸,3-手机型号)',
    sales                 tinyint default 0 null comment '销售属性',
    main_sale             tinyint default 0 null comment '主要销售属性',
    transnational         tinyint default 0 null comment '当传入costTemplateId时,它将返回是否需要填写其他产品属性,这些属性在从非国内仓库发货时使用',
    available             tinyint default 0 null comment '可以用的',
    required              tinyint default 0 null comment '是否必填',
    message               varchar(256) null comment '信息备注',
    tenant_id             bigint null comment '租户ID',
    creator_id            bigint unsigned null comment '创建人ID',
    creator_name          varchar(50) null comment '创建人姓名',
    created_time          datetime null comment '创建时间',
    reviser_id            bigint unsigned null comment '更新人ID',
    reviser_name          varchar(50) null comment '更新人姓名',
    revised_time          datetime null comment '更新时间',
    deleted               tinyint unsigned default '0' not null comment '逻辑删除：0-否；1-是'
) comment 'temu商品品类表' row_format = DYNAMIC;
create index idx_created_time
    on temu_product_temp_val (created_time);


CREATE TABLE `style_skc_on_shelves_picture`
(
    `picture_id`    bigint  NOT NULL COMMENT '图片id',
    `style_id`      bigint  NOT NULL COMMENT '款ID',
    `skc_id`        bigint  NOT NULL COMMENT 'SKC-ID',
    `picture_type`  tinyint NOT NULL COMMENT '图片类型，0-商品图，1-尺码图',
    `material_type` tinyint                                                       DEFAULT '0' COMMENT '材料类型: 0-图片; 1-视频',
    `picture_url`   varchar(256) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '图片url',
    `crop_img_url`  varchar(256) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '裁剪图',
    `serial_num`    int                                                           DEFAULT NULL COMMENT '序号',
    `tenant_id`     bigint                                                        DEFAULT NULL COMMENT '租户ID',
    `creator_id`    bigint                                                        DEFAULT NULL COMMENT '创建人ID',
    `creator_name`  varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci  DEFAULT NULL COMMENT '创建人姓名',
    `created_time`  datetime                                                      DEFAULT NULL COMMENT '创建时间',
    `reviser_id`    bigint                                                        DEFAULT NULL COMMENT '更新人ID',
    `reviser_name`  varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci  DEFAULT NULL COMMENT '更新人姓名',
    `revised_time`  datetime                                                      DEFAULT NULL COMMENT '更新时间',
    `deleted`       tinyint NOT NULL                                              DEFAULT '0' COMMENT '逻辑删除：0-否；1-是',
    PRIMARY KEY (`picture_id`),
    KEY             `idx_style_id` (`style_id`),
    KEY             `idx_skc_id` (`skc_id`),
    KEY             `idx_created_time` (`created_time`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci ROW_FORMAT=DYNAMIC COMMENT='款式-skc上架图片表';


CREATE TABLE `style_skc_sku`
(
    `sku_id`       bigint                                 NOT NULL COMMENT 'SKU-ID',
    `sku_code`     varchar(32) COLLATE utf8mb4_general_ci NOT NULL COMMENT 'SKU编码',
    `style_id`     bigint                                 NOT NULL COMMENT '款ID',
    `skc_id`       bigint                                 NOT NULL COMMENT 'SKC-ID',
    `group_name`   varchar(32) COLLATE utf8mb4_general_ci NOT NULL COMMENT 'SPU-尺码组',
    `size_name`    varchar(32) COLLATE utf8mb4_general_ci NOT NULL COMMENT 'SKC-尺码名',
    `tenant_id`    bigint                                                       DEFAULT NULL COMMENT '租户ID',
    `creator_id`   bigint                                                       DEFAULT NULL COMMENT '创建人ID',
    `creator_name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '创建人姓名',
    `created_time` datetime                                                     DEFAULT NULL COMMENT '创建时间',
    `reviser_id`   bigint                                                       DEFAULT NULL COMMENT '更新人ID',
    `reviser_name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '更新人姓名',
    `revised_time` datetime                                                     DEFAULT NULL COMMENT '更新时间',
    `deleted`      tinyint                                NOT NULL              DEFAULT '0' COMMENT '逻辑删除：0-否；1-是',
    PRIMARY KEY (`sku_id`),
    KEY            `idx_skc_id` (`skc_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci ROW_FORMAT=DYNAMIC COMMENT='SKU表';


create table platform_category_mapping
(
    mapping_id             bigint       not null comment '映射ID'
        primary key,
    platform_code          varchar(128) not null comment '平台编码',
    platform_name          varchar(128) not null comment '平台名称',
    category_code          varchar(256) null comment '品类编码',
    category_name          varchar(256) null comment '品类名',
    platform_category_code varchar(256) not null comment '关联平台品类编码',
    platform_category_name varchar(255) not null comment '关联平台品类名称',
    enable                 tinyint DEFAULT 1 COMMENT '是否启用【1启用；0禁用】',
    message                varchar(256) null comment '信息备注',
    tenant_id              bigint null comment '租户ID',
    creator_id             bigint unsigned null comment '创建人ID',
    creator_name           varchar(50) null comment '创建人姓名',
    created_time           datetime null comment '创建时间',
    reviser_id             bigint unsigned null comment '更新人ID',
    reviser_name           varchar(50) null comment '更新人姓名',
    revised_time           datetime null comment '更新时间',
    deleted                tinyint unsigned default '0' not null comment '逻辑删除：0-否；1-是'
) comment '品类映射表' row_format = DYNAMIC;
create index idx_created_time
    on platform_category_mapping (created_time);
create index idx_platform_code
    on platform_category_mapping (platform_code);
create table shop
(
    shop_id                bigint       not null comment '主键ID'
        primary key,
    platform_code          varchar(128) not null comment '平台编码',
    platform_name          varchar(128) not null comment '平台名称',
    subject_code           varchar(128) not null comment '主体编码',
    subject_name           varchar(128) not null comment '主体名称',
    shop_name              varchar(256) not null comment '店铺名',
    shop_type              varchar(64) null comment '店铺类型',
    product_token          varchar(256) null comment '商品token',
    order_token            varchar(256) null comment '订单token',
    label                  varchar(256) null comment '标签',
    business_operator_id   bigint null comment '运营人员ID',
    business_operator_name varchar(64) null comment '运营人员名称',
    enable                 tinyint DEFAULT 1 COMMENT '是否启用【1启用；0禁用】',
    auth_start_time        datetime null comment '授权开始时间',
    auth_end_time          datetime null comment '授权结束时间',
    message                varchar(256) null comment '信息备注',
    tenant_id              bigint null comment '租户ID',
    creator_id             bigint unsigned null comment '创建人ID',
    creator_name           varchar(50) null comment '创建人姓名',
    created_time           datetime null comment '创建时间',
    reviser_id             bigint unsigned null comment '更新人ID',
    reviser_name           varchar(50) null comment '更新人姓名',
    revised_time           datetime null comment '更新时间',
    deleted                tinyint unsigned default '0' not null comment '逻辑删除：0-否；1-是'
) comment '店铺表' row_format = DYNAMIC;
create index idx_created_time
    on shop (created_time);
create index idx_platform_code
    on shop (platform_code);
create table shop_app
(
    app_id       bigint       not null comment '主键ID' primary key,
    shop_id      bigint       not null comment '主键ID',
    app_key      varchar(128) not null comment 'APP KEY',
    app_secret   varchar(256) not null comment 'APP 密钥',
    message      varchar(256) null comment '信息备注',
    tenant_id    bigint null comment '租户ID',
    creator_id   bigint unsigned null comment '创建人ID',
    creator_name varchar(50) null comment '创建人姓名',
    created_time datetime null comment '创建时间',
    reviser_id   bigint unsigned null comment '更新人ID',
    reviser_name varchar(50) null comment '更新人姓名',
    revised_time datetime null comment '更新时间',
    deleted      tinyint unsigned default '0' not null comment '逻辑删除：0-否；1-是'
) comment '店铺APP表' row_format = DYNAMIC;
create index idx_created_time
    on shop_app (created_time);
create index idx_shop_id
    on shop_app (shop_id);

create table size_template
(
    template_id            bigint       not null comment '主键id'
        primary key,
    template_name          varchar(80)  not null comment '尺码名称',
    group_code             varchar(64)  not null comment '尺码组编码',
    group_name             varchar(64)  not null comment '尺码组名称',
    platform_category_code varchar(256) not null comment '关联平台品类编码',
    platform_category_name varchar(255) not null comment '关联平台品类名称',
    size                   varchar(256) null comment '尺码',
    part                   varchar(256) null comment '部位',
    enable                 tinyint DEFAULT 1 COMMENT '是否启用【1启用；0禁用】',
    message                varchar(256) null comment '信息备注',
    tenant_id              bigint null comment '租户ID',
    creator_id             bigint unsigned              null comment '创建人ID',
    creator_name           varchar(50) null comment '创建人姓名',
    created_time           datetime null comment '创建时间',
    reviser_id             bigint unsigned              null comment '更新人ID',
    reviser_name           varchar(50) null comment '更新人姓名',
    revised_time           datetime null comment '更新时间',
    deleted                tinyint unsigned default '0' not null comment '逻辑删除：0-否；1-是'
) comment '尺码模板表' row_format = DYNAMIC;
create index idx_created_time
    on size_template (created_time);
create index idx_platform_category_code
    on size_template (platform_category_code);
create table size_part
(
    size_part_id bigint      not null comment '主键id'
        primary key,
    template_id  bigint      not null comment '模板id',
    part_id      bigint      not null comment '部位id',
    part_name    varchar(64) not null comment '部位名称',
    part_value   decimal(18, 10) null comment '部位值',
    part_diff    decimal(18, 10) null comment '部位档差值',
    size         varchar(16) null comment '尺码',
    message      varchar(256) null comment '信息备注',
    tenant_id    bigint null comment '租户ID',
    creator_id   bigint unsigned              null comment '创建人ID',
    creator_name varchar(50) null comment '创建人姓名',
    created_time datetime null comment '创建时间',
    reviser_id   bigint unsigned              null comment '更新人ID',
    reviser_name varchar(50) null comment '更新人姓名',
    revised_time datetime null comment '更新时间',
    deleted      tinyint unsigned default '0' not null comment '逻辑删除：0-否；1-是'
) comment '尺码部位表' row_format = DYNAMIC;
create index idx_created_time
    on size_part (created_time);
create index idx_template_id
    on size_part (template_id);
create table style_review_log
(
    log_id             bigint                 not null comment '主键id'
        primary key,
    style_id           bigint       default 0 not null comment '款式id',
    review_status      tinyint      DEFAULT '0' COMMENT '审核状态，0-待审核，1-已通过，2-已驳回',
    review_fail_reason varchar(256) DEFAULT NULL COMMENT '审核不通过原因',
    content            json null comment '日志内容',
    message            varchar(256) null comment '信息备注',
    tenant_id          bigint null comment '租户ID',
    creator_id         bigint unsigned              null comment '创建人ID',
    creator_name       varchar(50) null comment '创建人姓名',
    created_time       datetime null comment '创建时间',
    reviser_id         bigint unsigned              null comment '更新人ID',
    reviser_name       varchar(50) null comment '更新人姓名',
    revised_time       datetime null comment '更新时间',
    deleted            tinyint unsigned default '0' not null comment '逻辑删除：0-否；1-是'
) comment '款审核日志表' row_format = DYNAMIC;
create index idx_created_time
    on style_review_log (created_time);
create index idx_style_id
    on style_review_log (style_id);

create table product
(
    product_id             bigint        not null comment '商品id'
        primary key,
    platform_product_id    bigint        not null comment '平台商品ID',
    shop_id                bigint        not null comment '店铺ID',
    style_id               bigint                 default 0 not null comment '款式id',
    style_code             varchar(80)            DEFAULT '' NOT NULL COMMENT '款号',
    group_id               bigint                 default 0 not null comment '尺码组id',
    product_status         int                    default 0 not null comment '商品状态：0-排队中；10-生成中；20-已中止；30-已完成；50-失败；60-超时失败；',
    product_name           VARCHAR(255)  NOT NULL default '' COMMENT '商品名称',
    product_en_name        VARCHAR(255)  NOT NULL default '' COMMENT '商品英文名称',
    platform_category_code varchar(256)  not null comment '关联平台品类编码',
    platform_category_name varchar(255)  not null comment '关联平台品类名称',
    size                   varchar(256) null comment '尺码',
    part                   varchar(256) null comment '部位',
    product_tag            json null comment '商品标签',
    promised_delivery_day  int                    DEFAULT '0' NOT NULL COMMENT '承诺发货天',
    freight_template_id    varchar(64)            DEFAULT NULL COMMENT '运费模板 ID',
    site_id                json null comment '站点ID',
    size_template_id       json null comment '尺码模板ID',
    show_size_template_id  json null comment '重点展示尺码模板ID',
    material_img_url       VARCHAR(512)  NOT NULL DEFAULT ''COMMENT '素材图',
    video_url              VARCHAR(512)  NOT NULL DEFAULT ''COMMENT '视频地址',
    size_url               VARCHAR(2048) NOT NULL DEFAULT ''COMMENT '尺码图',
    style_label_code       varchar(32) null default '' comment '款式标签编码',
    style_label_name       varchar(32) null default '' comment '款式标签名称',
    waveband_code          varchar(32) null default '' comment '波段编码',
    waveband_name          varchar(32) null default '' comment '波段名称',
    designer_id            bigint                 DEFAULT NULL COMMENT '设计师id',
    designer_name          varchar(32)            DEFAULT NULL COMMENT '设计师名称',
    on_shelver_id          bigint                 DEFAULT NULL COMMENT '上架人id',
    on_shelver_name        varchar(32)            DEFAULT NULL COMMENT '上架人名称',
    on_shelves_time        datetime null comment '上架时间',
    style_type             varchar(32) null default '' comment '开款类型',
    hidden                 tinyint unsigned default '1' not null comment '隐藏的：0-否；1-是',
    message                varchar(256) null comment '信息备注',
    tenant_id              bigint null comment '租户ID',
    creator_id             bigint unsigned              null comment '创建人ID',
    creator_name           varchar(50) null comment '创建人姓名',
    created_time           datetime null comment '创建时间',
    reviser_id             bigint unsigned              null comment '更新人ID',
    reviser_name           varchar(50) null comment '更新人姓名',
    revised_time           datetime null comment '更新时间',
    deleted                tinyint unsigned default '0' not null comment '逻辑删除：0-否；1-是'
) comment '商品表' row_format = DYNAMIC;
create index idx_created_time
    on product (created_time);
create index idx_style_id
    on product (style_id);
create index idx_hidden
    on product (hidden);

create table product_skc
(
    product_skc_id  bigint                 not null comment '商品SKC id'
        primary key,
    product_id      bigint                 not null comment '商品id',
    skc_id          bigint                 NOT NULL DEFAULT 0 COMMENT 'SKC id',
    skc_code        varchar(80) DEFAULT '' NOT NULL COMMENT 'SKC号',
    skc_status      int         default 0  not null comment 'TemuSKC状态：0-排队中；10-生成中；20-已中止；30-已完成；50-失败；60-超时失败；',
    skc_state       int         default 0  not null comment 'SKC状态：0-排队中；10-生成中；20-已中止；30-已完成；50-失败；60-超时失败；',
    platform_skc_id bigint                 not null comment '平台SKC ID',
    carousel_url    VARCHAR(2048)          NOT NULL DEFAULT ''COMMENT '轮播图',
    shop_id         bigint                 not null comment '店铺ID',
    color           varchar(128) null comment '颜色名称',
    platform_color  varchar(128) null comment '平台颜色名称',
    sync_status     tinyint     default -1 null comment '同步给业务状态：0-未同步；1-已同步',
    sync_time       datetime null comment '同步时间',
    sync_times      int         default 0 null comment '同步次数',
    message         varchar(256) null comment '信息备注',
    tenant_id       bigint null comment '租户ID',
    creator_id      bigint unsigned              null comment '创建人ID',
    creator_name    varchar(50) null comment '创建人姓名',
    created_time    datetime null comment '创建时间',
    reviser_id      bigint unsigned              null comment '更新人ID',
    reviser_name    varchar(50) null comment '更新人姓名',
    revised_time    datetime null comment '更新时间',
    deleted         tinyint unsigned default '0' not null comment '逻辑删除：0-否；1-是'
) comment '商品SKC表' row_format = DYNAMIC;
create index idx_created_time
    on product_skc (created_time);
create index idx_product_id
    on product_skc (product_id);

create table product_sku
(
    product_sku_id     bigint                 not null comment '商品SKC id'
        primary key,
    product_id         bigint                 not null comment '商品id',
    product_skc_id     bigint                 not null comment '商品SKC id',
    sku_id             bigint                 NOT NULL DEFAULT 0 COMMENT 'SKC id',
    sku_code           varchar(80) DEFAULT '' NOT NULL COMMENT 'SKC号',
    sku_state          int         default 0  not null comment 'SKU状态：0-排队中；10-生成中；20-已中止；30-已完成；50-失败；60-超时失败；',
    color              varchar(128) null comment '颜色名称',
    platform_color     varchar(128) null comment '平台颜色名称',
    platform_sku_id    bigint                 not null comment '平台SKU ID',
    volume_len         bigint null comment 'sku体积:长，单位mm',
    volume_width       bigint null comment 'sku体积:宽，单位mm',
    volume_height      bigint null comment 'sku体积:高，单位mm',
    weight             bigint null comment 'sku重量',
    currency_type      varchar(16) null comment '币种 (CNY: 人民币, USD: 美元) (默认人民币)',
    thumb_url          varchar(512) null comment '预览图',
    number_of_pieces   int null comment 'sku分类单品数量',
    sku_classification int null comment 'sku分类，1：单品，2：同款多件装，3：混合套装',
    message            varchar(256) null comment '信息备注',
    tenant_id          bigint null comment '租户ID',
    creator_id         bigint unsigned              null comment '创建人ID',
    creator_name       varchar(50) null comment '创建人姓名',
    created_time       datetime null comment '创建时间',
    reviser_id         bigint unsigned              null comment '更新人ID',
    reviser_name       varchar(50) null comment '更新人姓名',
    revised_time       datetime null comment '更新时间',
    deleted            tinyint unsigned default '0' not null comment '逻辑删除：0-否；1-是'
) comment '商品SKU表' row_format = DYNAMIC;
create index idx_created_time
    on product_sku (created_time);
create index idx_product_id
    on product_sku (product_id);
create table product_attr
(
    attr_id            bigint       not null comment '主键ID'
        primary key,
    product_id         bigint       not null comment '商品id',
    template_pid       bigint       NOT NULL DEFAULT 0 COMMENT '模板属性 id',
    pid                bigint       NOT NULL DEFAULT 0 COMMENT '属性 id',
    ref_pid            bigint       NOT NULL DEFAULT 0 COMMENT '引用属性 id',
    prop_name          VARCHAR(256) NOT NULL DEFAULT '' COMMENT '引用属性名',
    prop_value         VARCHAR(512) NOT NULL DEFAULT '' COMMENT '基础属性值',
    vid                bigint       NOT NULL DEFAULT 0 COMMENT '基础属性值id，没有的情况传0',
    control_type       int NULL   COMMENT '控制类型',
    value_unit         VARCHAR(64)  NOT NULL DEFAULT '' COMMENT '属性值单位，没有的情况传空字符串',
    number_input_value VARCHAR(128) NOT NULL DEFAULT '' COMMENT '数值录入',
    value_extend_info  VARCHAR(512) NOT NULL DEFAULT '' COMMENT '值扩展属性',
    message            varchar(256) null comment '信息备注',
    tenant_id          bigint null comment '租户ID',
    creator_id         bigint unsigned              null comment '创建人ID',
    creator_name       varchar(50) null comment '创建人姓名',
    created_time       datetime null comment '创建时间',
    reviser_id         bigint unsigned              null comment '更新人ID',
    reviser_name       varchar(50) null comment '更新人姓名',
    revised_time       datetime null comment '更新时间',
    deleted            tinyint unsigned default '0' not null comment '逻辑删除：0-否；1-是'
) comment '商品属性表' row_format = DYNAMIC;
create index idx_created_time
    on product_attr (created_time);
create index idx_product_id
    on product_attr (product_id);
create table product_spec_attr
(
    attr_id            bigint       not null comment '主键id'
        primary key,
    product_id         bigint       not null comment '商品ID',
    template_pid       bigint       NOT NULL DEFAULT 0 COMMENT '模板属性 id',
    pid                bigint       NOT NULL DEFAULT 0 COMMENT '属性 id',
    ref_pid            bigint       NOT NULL DEFAULT 0 COMMENT '引用属性 id',
    vid                bigint       NOT NULL DEFAULT 0 COMMENT '基础属性值id，没有的情况传0',
    prop_name          VARCHAR(256) NOT NULL DEFAULT '' COMMENT '引用属性名',
    prop_value         VARCHAR(512) NOT NULL DEFAULT '' COMMENT '基础属性值',
    value_unit         VARCHAR(64)  NOT NULL DEFAULT '' COMMENT '属性值单位，没有的情况传空字符串',
    number_input_value VARCHAR(128) NOT NULL DEFAULT '' COMMENT '数值录入',
    value_extend_info  VARCHAR(512) NOT NULL DEFAULT '' COMMENT '值扩展属性',
    spec_id            bigint       NOT NULL DEFAULT 0 COMMENT '规格 id',
    spec_name          VARCHAR(256) NOT NULL DEFAULT ''COMMENT '规格名称',
    parent_spec_id     bigint       NOT NULL DEFAULT 0 COMMENT '父规格 id',
    parent_spec_name   VARCHAR(256) NOT NULL DEFAULT ''COMMENT '父规格名称',
    value_group_id     bigint       NOT NULL DEFAULT 0 COMMENT '属性值组id，没有的情况传0',
    value_group_name   VARCHAR(256) NOT NULL DEFAULT '' COMMENT '属性值组名称，没有的情况传空字符串',
    message            varchar(256) null comment '信息备注',
    tenant_id          bigint null comment '租户ID',
    creator_id         bigint unsigned              null comment '创建人ID',
    creator_name       varchar(50) null comment '创建人姓名',
    created_time       datetime null comment '创建时间',
    reviser_id         bigint unsigned              null comment '更新人ID',
    reviser_name       varchar(50) null comment '更新人姓名',
    revised_time       datetime null comment '更新时间',
    deleted            tinyint unsigned default '0' not null comment '逻辑删除：0-否；1-是'
) comment '商品销售属性表' row_format = DYNAMIC;
create index idx_created_time
    on product_spec_attr (created_time);
create index idx_product_id
    on product_spec_attr (product_id);
create table product_sku_main_spec
(
    sku_spec_id      bigint       not null comment '商品SKU规格 id'
        primary key,
    product_id       bigint       not null comment '商品ID',
    product_skc_id   bigint       not null comment '商品SKC id',
    spec_id          bigint       NOT NULL DEFAULT 0 COMMENT '规格 id',
    spec_name        VARCHAR(256) NOT NULL DEFAULT ''COMMENT '规格名称',
    parent_spec_id   bigint       NOT NULL DEFAULT 0 COMMENT '父规格 id',
    parent_spec_name VARCHAR(256) NOT NULL DEFAULT ''COMMENT '父规格名称',
    message          varchar(256) null comment '信息备注',
    tenant_id        bigint null comment '租户ID',
    creator_id       bigint unsigned              null comment '创建人ID',
    creator_name     varchar(50) null comment '创建人姓名',
    created_time     datetime null comment '创建时间',
    reviser_id       bigint unsigned              null comment '更新人ID',
    reviser_name     varchar(50) null comment '更新人姓名',
    revised_time     datetime null comment '更新时间',
    deleted          tinyint unsigned default '0' not null comment '逻辑删除：0-否；1-是'
) comment '商品SKU主销售属性表' row_format = DYNAMIC;
create index idx_created_time
    on product_sku_main_spec (created_time);
create index idx_product_id
    on product_sku_main_spec (product_id);
create table product_sku_spec
(
    sku_spec_id      bigint       not null comment '商品SKU规格 id'
        primary key,
    product_id       bigint       not null comment '商品ID',
    product_skc_id   bigint       not null comment 'SKC id',
    product_sku_id   bigint       not null comment 'SKU id',
    spec_id          bigint       NOT NULL DEFAULT 0 COMMENT '规格 id',
    spec_name        VARCHAR(256) NOT NULL DEFAULT ''COMMENT '规格名称',
    parent_spec_id   bigint       NOT NULL DEFAULT 0 COMMENT '父规格 id',
    parent_spec_name VARCHAR(256) NOT NULL DEFAULT ''COMMENT '父规格名称',
    message          varchar(256) null comment '信息备注',
    tenant_id        bigint null comment '租户ID',
    creator_id       bigint unsigned              null comment '创建人ID',
    creator_name     varchar(50) null comment '创建人姓名',
    created_time     datetime null comment '创建时间',
    reviser_id       bigint unsigned              null comment '更新人ID',
    reviser_name     varchar(50) null comment '更新人姓名',
    revised_time     datetime null comment '更新时间',
    deleted          tinyint unsigned default '0' not null comment '逻辑删除：0-否；1-是'
) comment '商品SKU规格表' row_format = DYNAMIC;
create index idx_created_time
    on product_sku_spec (created_time);
create index idx_product_id
    on product_sku_spec (product_id);
create table product_wh_ext_attr
(
    attr_id            bigint       not null comment '主键ID'
        primary key,
    product_id         bigint       not null comment '商品ID',
    outer_goods_url    VARCHAR(512) NOT NULL DEFAULT ''COMMENT '站外商品链接',
    region_id          VARCHAR(128) NOT NULL DEFAULT ''COMMENT '区域ID',
    country_short_name VARCHAR(32)  NOT NULL DEFAULT ''COMMENT '国家短名',
    message            varchar(256) null comment '信息备注',
    tenant_id          bigint null comment '租户ID',
    creator_id         bigint unsigned              null comment '创建人ID',
    creator_name       varchar(50) null comment '创建人姓名',
    created_time       datetime null comment '创建时间',
    reviser_id         bigint unsigned              null comment '更新人ID',
    reviser_name       varchar(50) null comment '更新人姓名',
    revised_time       datetime null comment '更新时间',
    deleted            tinyint unsigned default '0' not null comment '逻辑删除：0-否；1-是'
) comment '商品货品仓配供应链侧扩展属性表' row_format = DYNAMIC;
create index idx_created_time
    on product_wh_ext_attr (created_time);
create index idx_product_id
    on product_wh_ext_attr (product_id);
create table product_warehouse_route
(
    warehouse_route_id bigint       not null comment '主键ID'
        primary key,
    product_id         bigint       not null comment '商品ID',
    site_id            bigint       NOT NULL DEFAULT 0 COMMENT '站点 id',
    warehouse_id       VARCHAR(128) NOT NULL DEFAULT ''COMMENT '仓库ID',
    message            varchar(256) null comment '信息备注',
    tenant_id          bigint null comment '租户ID',
    creator_id         bigint unsigned              null comment '创建人ID',
    creator_name       varchar(50) null comment '创建人姓名',
    created_time       datetime null comment '创建时间',
    reviser_id         bigint unsigned              null comment '更新人ID',
    reviser_name       varchar(50) null comment '更新人姓名',
    revised_time       datetime null comment '更新时间',
    deleted            tinyint unsigned default '0' not null comment '逻辑删除：0-否；1-是'
) comment '货品仓库路由表' row_format = DYNAMIC;
create index idx_created_time
    on product_warehouse_route (created_time);
create index idx_product_id
    on product_warehouse_route (product_id);
create table product_sku_warehouse
(
    warehouse_route_id     bigint       not null comment '主键ID'
        primary key,
    product_id             bigint       not null comment '商品ID',
    product_sku_id         bigint       not null comment '商品SKU ID',
    target_stock_available VARCHAR(128) NOT NULL DEFAULT 0 COMMENT '目标库存',
    warehouse_id           VARCHAR(128) NOT NULL DEFAULT ''COMMENT '仓库ID',
    message                varchar(256) null comment '信息备注',
    tenant_id              bigint null comment '租户ID',
    creator_id             bigint unsigned              null comment '创建人ID',
    creator_name           varchar(50) null comment '创建人姓名',
    created_time           datetime null comment '创建时间',
    reviser_id             bigint unsigned              null comment '更新人ID',
    reviser_name           varchar(50) null comment '更新人姓名',
    revised_time           datetime null comment '更新时间',
    deleted                tinyint unsigned default '0' not null comment '逻辑删除：0-否；1-是'
) comment '发货仓库存表' row_format = DYNAMIC;
create index idx_created_time
    on product_sku_warehouse (created_time);
create index idx_product_id
    on product_sku_warehouse (product_id);
create table product_sku_site_supplier_price
(
    supplier_price_id bigint          not null comment '主键ID'
        primary key,
    product_id        bigint          not null comment '商品ID',
    product_sku_id    bigint          not null comment '商品SKU ID',
    supplier_price    decimal(18, 10) NOT NULL COMMENT '站点申报价格，单位 人民币：分，美元：美分',
    site_id           bigint          NOT NULL DEFAULT 0 COMMENT '申报价格站点id',
    message           varchar(256) null comment '信息备注',
    tenant_id         bigint null comment '租户ID',
    creator_id        bigint unsigned              null comment '创建人ID',
    creator_name      varchar(50) null comment '创建人姓名',
    created_time      datetime null comment '创建时间',
    reviser_id        bigint unsigned              null comment '更新人ID',
    reviser_name      varchar(50) null comment '更新人姓名',
    revised_time      datetime null comment '更新时间',
    deleted           tinyint unsigned default '0' not null comment '逻辑删除：0-否；1-是'
) comment 'SKU站点供货价表' row_format = DYNAMIC;
create index idx_created_time
    on product_sku_site_supplier_price (created_time);
create index idx_product_id
    on product_sku_site_supplier_price (product_id);

create table product_size
(
    product_size_id  bigint  not null comment '主键id'
        primary key,
    template_name    varchar(80) null DEFAULT '' comment '尺码名称',
    product_id       bigint  not null comment '商品ID',
    platform_size_id bigint null DEFAULT 0 comment '平台尺码 ID',
    element          JSON null comment '部位元素',
    size             varchar(256) null comment '尺码',
    platform_size    varchar(256) null comment '平台尺码',
    show_size        tinyint not null DEFAULT 1 COMMENT '是否重点展示(1:重点展示)',
    message          varchar(256) null comment '信息备注',
    tenant_id        bigint null comment '租户ID',
    creator_id       bigint unsigned              null comment '创建人ID',
    creator_name     varchar(50) null comment '创建人姓名',
    created_time     datetime null comment '创建时间',
    reviser_id       bigint unsigned              null comment '更新人ID',
    reviser_name     varchar(50) null comment '更新人姓名',
    revised_time     datetime null comment '更新时间',
    deleted          tinyint unsigned default '0' not null comment '逻辑删除：0-否；1-是'
) comment '商品尺码模板表' row_format = DYNAMIC;
create index idx_created_time
    on product_size (created_time);
create index idx_product_id
    on product_size (product_id);
create table product_size_part
(
    size_part_id    bigint      not null comment '主键id'
        primary key,
    product_id      bigint      not null comment '商品ID',
    product_size_id bigint      not null comment '商品尺码模板id',
    part_id         bigint      not null comment '部位id',
    part_name       varchar(64) not null comment '部位名称',
    part_value      decimal(18, 10) null comment '部位值',
    part_diff       decimal(18, 10) null comment '部位档差值',
    size            varchar(16) null comment '尺码',
    platform_size   varchar(16) null comment '平台尺码',
    message         varchar(256) null comment '信息备注',
    tenant_id       bigint null comment '租户ID',
    creator_id      bigint unsigned              null comment '创建人ID',
    creator_name    varchar(50) null comment '创建人姓名',
    created_time    datetime null comment '创建时间',
    reviser_id      bigint unsigned              null comment '更新人ID',
    reviser_name    varchar(50) null comment '更新人姓名',
    revised_time    datetime null comment '更新时间',
    deleted         tinyint unsigned default '0' not null comment '逻辑删除：0-否；1-是'
) comment '商品尺码部位表' row_format = DYNAMIC;
create index idx_created_time
    on product_size_part (created_time);
create index idx_product_size_id
    on product_size_part (product_size_id);
create index idx_product_id
    on product_size_part (product_id);

create table temu_product_file
(
    file_id        bigint       not null comment '文件ID'
        primary key,
    product_id     bigint unsigned not null comment '商品ID',
    product_skc_id bigint       not null comment 'SKC id',
    file_url       varchar(256) null comment '文件URL',
    temu_file_url  varchar(256) null comment 'Temu URL',
    cover_url      varchar(256) null comment '封面图',
    file_type      varchar(32)  not null default '' comment '文件型',
    ext_val        varchar(128) not null default '' comment '扩展值',
    file_width     bigint                default 0 not null comment '文件宽',
    file_height    bigint                default 0 not null comment '文件高',
    push_status    tinyint unsigned default '0' null comment '推送状态：0-未推送；1-已推送；2-推送失败',
    push_time      datetime null comment '推送时间',
    push_times     int                   default 0 null comment '推送次数',
    message        varchar(200) null comment '信息备注',
    tenant_id      bigint null comment '租户ID',
    creator_id     bigint unsigned null comment '创建人ID',
    creator_name   varchar(50) null comment '创建人姓名',
    created_time   datetime null comment '创建时间',
    reviser_id     bigint unsigned null comment '更新人ID',
    reviser_name   varchar(50) null comment '更新人姓名',
    revised_time   datetime null comment '更新时间',
    deleted        tinyint unsigned default '0' not null comment '逻辑删除：0-否；1-是'
) comment 'Temu商品文件表' row_format = DYNAMIC;
create index idx_created_time
    on temu_product_file (created_time);
create index idx_product_id
    on temu_product_file (product_id);

create table temu_task
(
    task_id       bigint unsigned              not null comment '任务ID'
        primary key,
    parent_id     bigint not null default 0 comment '父级id',
    product_id    bigint unsigned not null comment '商品ID',
    bus_id        bigint unsigned              not null comment '业务主键ID',
    task_code     varchar(80) null comment '任务编号',
    task_type     varchar(32) null comment '任务类型',
    opt_type      varchar(32) null comment '操作类型',
    task_status   int             default 0 not null comment '任务状态：0-排队中；10-生成中；20-已中止；30-已完成；50-失败；60-超时失败；',
    response_data json null comment '结果',
    push_status   tinyint unsigned default '0' null comment '推送状态：0-未推送；1-已推送；2-推送失败',
    push_time     datetime null comment '推送时间',
    push_times    int             default 0 null comment '推送次数',
    pull_time     datetime null comment '拉取时间',
    pull_times    int             default 0 null comment '拉取次数',
    sync_status   tinyint         default 1 null comment '同步给业务状态：0-未同步；1-已同步',
    sync_time     datetime null comment '同步时间',
    sync_times    int             default 0 null comment '同步次数',
    message       varchar(200) null comment '信息备注',
    tenant_id     bigint null comment '租户ID',
    creator_id    bigint unsigned              null comment '创建人ID',
    creator_name  varchar(50) null comment '创建人姓名',
    created_time  datetime null comment '创建时间',
    reviser_id    bigint unsigned              null comment '更新人ID',
    reviser_name  varchar(50) null comment '更新人姓名',
    revised_time  datetime null comment '更新时间',
    deleted       tinyint unsigned default '0' not null comment '逻辑删除：0-否；1-是'
) comment 'Temu任务' charset = utf8mb4
                           row_format = DYNAMIC;
create index idx_bus_id
    on temu_task (bus_id);
create index idx_created_time
    on temu_task (created_time);
create index idx_task_id
    on temu_task (task_id);


create table temu_app_config
(
    subject_code varchar(128) not null comment '主体编码' primary key,
    app_key      varchar(128) not null comment 'APP KEY',
    app_secret   varchar(256) not null comment 'APP 密钥',
    message      varchar(256) null comment '信息备注',
    tenant_id    bigint null comment '租户ID',
    creator_id   bigint unsigned              null comment '创建人ID',
    creator_name varchar(50) null comment '创建人姓名',
    created_time datetime null comment '创建时间',
    reviser_id   bigint unsigned              null comment '更新人ID',
    reviser_name varchar(50) null comment '更新人姓名',
    revised_time datetime null comment '更新时间',
    deleted      tinyint unsigned default '0' not null comment '逻辑删除：0-否；1-是'
) comment 'Temu APP配置表' row_format = DYNAMIC;
-- -----------DDL-----------------