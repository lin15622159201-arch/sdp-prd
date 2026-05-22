-- 表关系:
-- picking_ai_design 主表
-- >> |--1:n-- picking_ai_design_style 款式表
-- >> >> |--1:n-- picking_ai_design_picture 款式图

-- 结果表: picking_ai_design_result
-- >> 款式粒度, 固化结果(因为选款数据还能继续改, 生成新的结果)


# show create table picking_ai_design;
# show create table picking_ai_design_style;
# show create table picking_ai_design_picture;
# show create table picking_ai_design_result;

CREATE TABLE `picking_ai_design`
(
    `picking_id`              bigint        NOT NULL COMMENT '选款id',
    `inspiration_id`          bigint                 DEFAULT NULL COMMENT '灵感数据id',
    `inspiration_image`       varchar(1000) NOT NULL COMMENT '灵感图',
    `inspiration_source_type` varchar(128)           DEFAULT NULL COMMENT '灵感来源，ins、shein等',
    `planning_source`         varchar(255)  NOT NULL COMMENT '企划来源',
    `supply_method`           varchar(255)  NOT NULL COMMENT '供给方式',
    `design_task_id`          bigint                 DEFAULT NULL COMMENT 'ai任务id',
    `design_task_code`        varchar(255)           DEFAULT NULL COMMENT 'ai任务编号',
    `product_link`            varchar(500)           DEFAULT NULL COMMENT '商品链接URL',
    `data_source`             varchar(128)           DEFAULT NULL COMMENT '数据来源(导入..)',
    `category`                varchar(256)           DEFAULT NULL COMMENT '品类',
    `country_site`            varchar(10)            DEFAULT NULL COMMENT '国家站点，获取当前lazada跨境的6个站点',
    `external_category`       varchar(256)           DEFAULT NULL COMMENT '外部品类',
    `identify_category`       varchar(256)           DEFAULT NULL COMMENT '识别品类',
    `wave_batch_code`         varchar(255)  NOT NULL COMMENT '波次编号',
    `retail_price`            decimal(10, 2)         DEFAULT NULL COMMENT '划线价(US)',
    `sale_price`              decimal(10, 2)         DEFAULT NULL COMMENT '销售价(US)',
    `tenant_id`               bigint        NOT NULL COMMENT '租户id',
    `creator_id`              bigint        NOT NULL COMMENT '创建人id',
    `creator_name`            varchar(50)            DEFAULT NULL COMMENT '创建人姓名',
    `created_time`            datetime      NOT NULL COMMENT '创建时间',
    `reviser_id`              bigint                 DEFAULT NULL COMMENT '更新人id',
    `reviser_name`            varchar(50)            DEFAULT NULL COMMENT '更新人姓名',
    `revised_time`            datetime               DEFAULT NULL COMMENT '更新时间',
    `deleted`                 tinyint       NOT NULL DEFAULT '0' COMMENT '逻辑删除 0 否 1是',
    PRIMARY KEY (`picking_id`)
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8mb4
  COLLATE = utf8mb4_general_ci
  ROW_FORMAT = DYNAMIC COMMENT ='选款-AI设计';

CREATE TABLE `picking_ai_design_style`
(
    `picking_style_id`          bigint       NOT NULL COMMENT '款式id',
    `picking_id`                bigint       NOT NULL COMMENT '选款id',
    `picking_state`             tinyint               DEFAULT NULL COMMENT '选款状态：0待选中,1已选中,2未选中',
    `style_name`                varchar(128) NOT NULL COMMENT '款式名称(款式1,款式2..)',
    `sort`                      int          NOT NULL DEFAULT '0' COMMENT '排序号',
    `suggested_price`           decimal(10, 2)        DEFAULT NULL COMMENT '建议价格',
    `suggested_style`           varchar(255)          DEFAULT NULL COMMENT '建议风格',
    `suggested_category`        varchar(255)          DEFAULT NULL COMMENT '建议品类',
    `suggested_wave_batch_code` varchar(255)          DEFAULT NULL COMMENT '建议波段',
    `suggested_shop_name`       varchar(150)          DEFAULT NULL COMMENT '建议店铺',
    `suggested_shop_short_code` varchar(150)          DEFAULT NULL COMMENT '建议店铺',
    `suggested_printing`        varchar(50)           DEFAULT NULL COMMENT '建议印花：0-无，1-定位印，2-满印，3-净色',
    `suggested_country_site`    varchar(10)           DEFAULT NULL COMMENT '建议国家站点',
    `cargo_tray_id`             bigint                DEFAULT NULL COMMENT '货盘id',
    `cargo_tray_code`           varchar(255)          DEFAULT NULL COMMENT '货盘编号',
    `remark`                    varchar(512)          DEFAULT NULL COMMENT '备注',
    `attachments`               json                  DEFAULT NULL COMMENT '附件',
    `update_version`            bigint                DEFAULT NULL COMMENT '更新版本号(随机)',
    `selector_id`               bigint       NOT NULL COMMENT '选款人ID(买手)',
    `selector_name`             varchar(64)  NOT NULL COMMENT '选款人名称(买手)',
    `selection_time`            datetime     NOT NULL COMMENT '选款时间',
    `tenant_id`                 bigint                DEFAULT NULL COMMENT '租户ID',
    `creator_id`                bigint                DEFAULT NULL COMMENT '创建人ID',
    `creator_name`              varchar(50)           DEFAULT NULL COMMENT '创建人姓名',
    `created_time`              datetime              DEFAULT NULL COMMENT '创建时间',
    `reviser_id`                bigint                DEFAULT NULL COMMENT '更新人ID',
    `reviser_name`              varchar(50)           DEFAULT NULL COMMENT '更新人姓名',
    `revised_time`              datetime              DEFAULT NULL COMMENT '更新时间',
    `deleted`                   tinyint      NOT NULL DEFAULT '0' COMMENT '逻辑删除：0-否；1-是',
    PRIMARY KEY (`picking_style_id`)
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8mb4
  COLLATE = utf8mb4_0900_ai_ci COMMENT ='选款-AI设计款式';
CREATE TABLE `picking_ai_design_picture`
(
    `picking_picture_id` bigint  NOT NULL COMMENT '图片id',
    `picking_id`         bigint  NOT NULL COMMENT '选款id',
    `picking_style_id`   bigint  NOT NULL COMMENT '款式id',
    `picture_url`        varchar(256)     DEFAULT NULL COMMENT '生成图',
    `repair_img_url`     varchar(256)     DEFAULT NULL COMMENT '修复图',
    `group_num`          int              DEFAULT NULL COMMENT '组号',
    `serial_num`         int              DEFAULT NULL COMMENT '序号',
    `main_image_type`    tinyint          DEFAULT '0' COMMENT '是否主图 1是 0否',
    `fix_image_type`     tinyint          DEFAULT '0' COMMENT '是否修图 1是 0否',
    `eliminate_type`     tinyint          DEFAULT '0' COMMENT '是否淘汰 1是 0否',
    `eliminate_reason`   varchar(512)     DEFAULT NULL COMMENT '淘汰原因',
    `tenant_id`          bigint           DEFAULT NULL COMMENT '租户ID',
    `creator_id`         bigint           DEFAULT NULL COMMENT '创建人ID',
    `creator_name`       varchar(50)      DEFAULT NULL COMMENT '创建人姓名',
    `created_time`       datetime         DEFAULT NULL COMMENT '创建时间',
    `reviser_id`         bigint           DEFAULT NULL COMMENT '更新人ID',
    `reviser_name`       varchar(50)      DEFAULT NULL COMMENT '更新人姓名',
    `revised_time`       datetime         DEFAULT NULL COMMENT '更新时间',
    `deleted`            tinyint NOT NULL DEFAULT '0' COMMENT '逻辑删除：0-否；1-是',
    PRIMARY KEY (`picking_picture_id`)
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8mb4
  COLLATE = utf8mb4_general_ci
  ROW_FORMAT = DYNAMIC COMMENT ='选款-AI设计款式图';
CREATE TABLE `picking_ai_design_result`
(
    `picking_result_id`         bigint      NOT NULL COMMENT '选款结果id',
    `inspiration_id`            bigint               DEFAULT NULL COMMENT '灵感id(可能空)',
    `design_task_id`            bigint               DEFAULT NULL,
    `design_task_code`          varchar(255)         DEFAULT NULL COMMENT 'ai任务编号(可空)',
    `picking_state`             tinyint     NOT NULL COMMENT '选款状态：0待选中,1已选中,2未选中',
    `picking_id`                bigint      NOT NULL COMMENT '选款id',
    `picking_style_id`          bigint      NOT NULL COMMENT '款式id',
    `selector_id`               bigint      NOT NULL COMMENT '选款人ID(买手)',
    `selector_name`             varchar(64) NOT NULL COMMENT '选款人名称(买手)',
    `selection_time`            datetime    NOT NULL COMMENT '选款时间',
    `suggested_price`           decimal(10, 2)       DEFAULT NULL COMMENT '建议价格',
    `suggested_style`           varchar(255)         DEFAULT NULL COMMENT '建议风格',
    `suggested_category`        varchar(255)         DEFAULT NULL COMMENT '建议品类',
    `suggested_wave_batch_code` varchar(255)         DEFAULT NULL COMMENT '建议波段',
    `suggested_shop_code`       varchar(150)         DEFAULT NULL COMMENT '建议店铺code',
    `suggested_shop_name`       varchar(150)         DEFAULT NULL COMMENT '建议店铺name',
    `suggested_printing`        varchar(50)          DEFAULT NULL COMMENT '建议印花：0-无，1-定位印，2-满印，3-净色',
    `suggested_country_site`    varchar(10)          DEFAULT NULL COMMENT '建议国家站点',
    `cargo_tray_id`             bigint               DEFAULT NULL COMMENT '货盘id',
    `cargo_tray_code`           varchar(255)         DEFAULT NULL COMMENT '货盘编号',
    `attachments`               json                 DEFAULT NULL COMMENT '附件',
    `remark`                    varchar(512)         DEFAULT NULL COMMENT '备注',
    `picking_creator_id`        bigint      NOT NULL COMMENT '创建人ID',
    `picking_creator_name`      varchar(50) NOT NULL COMMENT '创建人姓名',
    `picking_created_time`      datetime    NOT NULL COMMENT '创建时间',
    `style_design_code`         varchar(512)         DEFAULT NULL COMMENT '款号(已开款才有)',
    `open_style_state`          tinyint              DEFAULT NULL COMMENT '开款状态(下游返回) 0待处理、1已开款、2已淘汰',
    `style_eliminate_reason`    varchar(500)         DEFAULT NULL COMMENT '开款淘汰原因(下游返回)',
    `result_image_info`         json                 DEFAULT NULL COMMENT '选择图片信息[{图片url, 图片顺序, 主图标识, 修图标识}]',
    `tenant_id`                 bigint               DEFAULT NULL COMMENT '租户ID',
    `creator_id`                bigint               DEFAULT NULL COMMENT '创建人ID',
    `creator_name`              varchar(50)          DEFAULT NULL COMMENT '创建人姓名',
    `created_time`              datetime             DEFAULT NULL COMMENT '创建时间',
    `reviser_id`                bigint               DEFAULT NULL COMMENT '更新人ID',
    `reviser_name`              varchar(50)          DEFAULT NULL COMMENT '更新人姓名',
    `revised_time`              datetime             DEFAULT NULL COMMENT '更新时间',
    `deleted`                   tinyint     NOT NULL DEFAULT '0' COMMENT '逻辑删除：0-否；1-是',
    PRIMARY KEY (`picking_result_id`)
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8mb4
  COLLATE = utf8mb4_general_ci
  ROW_FORMAT = DYNAMIC COMMENT ='选款-AI设计-选款结果';