-- sit_tg_aigc_server.picking_style definition

CREATE TABLE `picking_style`
(
    `picking_style_id`         bigint     NOT NULL COMMENT '主键',
    `inspiration_version`      varchar(128)        DEFAULT NULL COMMENT '灵感版本',
    `country_site`             varchar(10)         DEFAULT NULL COMMENT '国家站点，获取当前lazada跨境的6个站点',
    `category`                 varchar(256)        DEFAULT NULL COMMENT '品类',
    `product_url`              text COMMENT '商品URL',
    `original_image_url`       text COMMENT '原图URL',
    `state`                    int                 DEFAULT NULL COMMENT '选款任务状态0待处理，1已完成',
    `data_type`                varchar(128)        DEFAULT NULL COMMENT '灵感来源，ins、shein等',
    `model_type`               varchar(32)         DEFAULT NULL COMMENT '跑图任务模型：通用AI模型(MJ)，服装大模型(FG)',
    `task_code`                varchar(64)         DEFAULT NULL COMMENT '跑图任务编码',
    `task_name`                varchar(255)        DEFAULT NULL COMMENT '跑图任务名称',
    `task_created_time`        datetime            DEFAULT NULL COMMENT '跑图任务创建时间',
    `image_picking_time`       datetime            DEFAULT NULL COMMENT '选图时间',
    `image_picker_id`          bigint              DEFAULT NULL COMMENT '选图人ID',
    `image_picker_name`        varchar(50)         DEFAULT NULL COMMENT '选图人',
    `busi_channel`             tinyint             DEFAULT NULL COMMENT '跑图渠道，1-JV渠道，0-外部渠道',
    `busi_source`              varchar(50)         DEFAULT NULL COMMENT '根据对应跑图渠道显示对应的数据来源，比如JV渠道就FM/FG，外部渠道就没有数据来源',
    `busi_code`                varchar(64)         DEFAULT NULL COMMENT '任务编码',
    `busi_name`                varchar(64)         DEFAULT NULL COMMENT '任务名称',
    `busi_id`                  varchar(50)         DEFAULT NULL COMMENT '任务所属业务ID',
    `busi_task_type`           int                 DEFAULT NULL COMMENT '任务所属业务类型,参考TaskTypeEnum枚举',
    `remark`                   varchar(512)        DEFAULT NULL COMMENT '备注',
    `selector_id`              bigint              DEFAULT NULL COMMENT '买手ID',
    `selector_name`            varchar(64)         DEFAULT NULL COMMENT '买手名称',
    `selection_time`           datetime            DEFAULT NULL COMMENT '选款时间',
    `picking_style_history_id` bigint              DEFAULT NULL COMMENT '最新一条选款记录',
    `company_id`               bigint              DEFAULT NULL COMMENT '租户ID',
    `deleted`                  tinyint(1) NOT NULL DEFAULT '0' COMMENT '是否删除，0-未删除，1-已删除',
    `creator_id`               bigint              DEFAULT NULL COMMENT '创建者ID',
    `created_time`             datetime            DEFAULT NULL COMMENT '创建时间',
    `creator_name`             varchar(50)         DEFAULT NULL COMMENT '创建人名称，即选图人/Excel导入人',
    `reviser_id`               bigint              DEFAULT NULL COMMENT '修改者ID',
    `revised_time`             datetime            DEFAULT NULL COMMENT '修改时间',
    `reviser_name`             varchar(50)         DEFAULT NULL COMMENT '修改人名称',
    PRIMARY KEY (`picking_style_id`) USING BTREE,
    KEY `idx_picking_style_version` (`inspiration_version`) USING BTREE,
    KEY `idx_picking_style_source` (`data_type`) USING BTREE,
    KEY `idx_picking_style_country` (`country_site`) USING BTREE,
    KEY `idx_picking_style_created` (`created_time`) USING BTREE
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8mb4
  COLLATE = utf8mb4_general_ci
  ROW_FORMAT = DYNAMIC COMMENT ='选款任务表';

-- sit_tg_aigc_server.picking_style_detail definition

CREATE TABLE `picking_style_detail`
(
    `picking_style_detail_id` bigint     NOT NULL COMMENT '主键',
    `picking_style_id`        bigint              DEFAULT NULL COMMENT '选款任务ID',
    `picking_image_id`        bigint              DEFAULT NULL COMMENT '对应选图(初选)任务ID',
    `serial_num`              int                 DEFAULT NULL COMMENT '选款图片序号1,2,3,4...',
    `picture_no`              int                 DEFAULT NULL COMMENT '选图序号，来自选图任务',
    `image_url`               text COMMENT '图片地址',
    `picking_state`           tinyint             DEFAULT NULL COMMENT '选用状态：0-未选择，1-可用，2-不可用',
    `company_id`              bigint              DEFAULT NULL COMMENT '租户ID',
    `deleted`                 tinyint(1) NOT NULL DEFAULT '0' COMMENT '是否删除，0-未删除，1-已删除',
    `creator_id`              bigint              DEFAULT NULL COMMENT '创建者ID',
    `created_time`            datetime            DEFAULT NULL COMMENT '创建时间',
    `reviser_id`              bigint              DEFAULT NULL COMMENT '修改者ID',
    `revised_time`            datetime            DEFAULT NULL COMMENT '修改时间',
    `creator_name`            varchar(50)         DEFAULT NULL COMMENT '创建人名称',
    `reviser_name`            varchar(50)         DEFAULT NULL COMMENT '修改人名称',
    PRIMARY KEY (`picking_style_detail_id`) USING BTREE,
    KEY `idx_picking_style_detail_main` (`picking_style_id`, `picking_state`) USING BTREE
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8mb4
  COLLATE = utf8mb4_general_ci
  ROW_FORMAT = DYNAMIC COMMENT ='选款任务明细表';

-- sit_tg_aigc_server.picking_style_history definition

CREATE TABLE `picking_style_history`
(
    `picking_style_history_id` bigint     NOT NULL COMMENT '主键',
    `picking_style_id`         bigint              DEFAULT NULL COMMENT '选款任务ID',
    `selector_id`              bigint              DEFAULT NULL COMMENT '买手ID',
    `selector_name`            varchar(64)         DEFAULT NULL COMMENT '买手名称',
    `selection_time`           datetime            DEFAULT NULL COMMENT '选款时间',
    `company_id`               bigint              DEFAULT NULL COMMENT '租户ID',
    `deleted`                  tinyint(1) NOT NULL DEFAULT '0' COMMENT '是否删除，0-未删除，1-已删除',
    `creator_id`               bigint              DEFAULT NULL COMMENT '创建者ID',
    `created_time`             datetime            DEFAULT NULL COMMENT '创建时间',
    `reviser_id`               bigint              DEFAULT NULL COMMENT '修改者ID',
    `revised_time`             datetime            DEFAULT NULL COMMENT '修改时间',
    `creator_name`             varchar(50)         DEFAULT NULL COMMENT '创建人名称',
    `reviser_name`             varchar(50)         DEFAULT NULL COMMENT '修改人名称',
    PRIMARY KEY (`picking_style_history_id`) USING BTREE,
    KEY `idx_picking_style_history_time` (`selection_time`) USING BTREE,
    KEY `idx_picking_style_history_selector` (`selector_id`) USING BTREE,
    KEY `idx_picking_style_history_main` (`picking_style_id`) USING BTREE
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8mb4
  COLLATE = utf8mb4_general_ci
  ROW_FORMAT = DYNAMIC COMMENT ='选款记录表';

-- sit_tg_aigc_server.picking_style_result definition

CREATE TABLE `picking_style_result`
(
    `picking_style_result_id`  bigint     NOT NULL COMMENT '主键',
    `picking_style_history_id` bigint              DEFAULT NULL COMMENT '选款记录ID',
    `picking_style_detail_id`  bigint              DEFAULT NULL COMMENT '选款明细ID',
    `image_url`                text COMMENT '图片地址',
    `serial_num`               int                 DEFAULT NULL COMMENT '序号1,2,3,4...',
    `picking_state`            tinyint             DEFAULT NULL COMMENT '选用状态：0-未选择，1-可用，2-不可用',
    `company_id`               bigint              DEFAULT NULL COMMENT '租户ID',
    `deleted`                  tinyint(1) NOT NULL DEFAULT '0' COMMENT '是否删除，0-未删除，1-已删除',
    `creator_id`               bigint              DEFAULT NULL COMMENT '创建者ID',
    `created_time`             datetime            DEFAULT NULL COMMENT '创建时间',
    `reviser_id`               bigint              DEFAULT NULL COMMENT '修改者ID',
    `revised_time`             datetime            DEFAULT NULL COMMENT '修改时间',
    `creator_name`             varchar(50)         DEFAULT NULL COMMENT '创建人名称',
    `reviser_name`             varchar(50)         DEFAULT NULL COMMENT '修改人名称',
    PRIMARY KEY (`picking_style_result_id`) USING BTREE,
    KEY `idx_picking_style_result_main` (`picking_style_history_id`, `picking_state`) USING BTREE
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8mb4
  COLLATE = utf8mb4_general_ci
  ROW_FORMAT = DYNAMIC COMMENT ='选款结果表';

-- sit_tg_aigc_server.picking_style_result_detail definition

CREATE TABLE `picking_style_result_detail`
(
    `picking_style_result_detail_id` bigint     NOT NULL COMMENT '主键',
    `picking_style_result_id`        bigint                                   DEFAULT NULL COMMENT '选款结果ID',
    `suggested_price`                decimal(10, 2)                           DEFAULT NULL COMMENT '建议价格',
    `suggested_style`                varchar(1000) COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '建议风格',
    `suggested_category`             varchar(1000) COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '建议品类',
    `suggested_wave`                 varchar(1000)                            DEFAULT NULL COMMENT '建议波段',
    `suggested_shop_name`            varchar(150)                             DEFAULT NULL COMMENT '建议店铺',
    `suggested_shop_short_code`      varchar(150)                             DEFAULT NULL COMMENT '建议店铺',
    `suggested_printing`             varchar(50)                              DEFAULT NULL COMMENT '印花标识：0-无，1-定位印，2-满印，3-净色',
    `suggested_country_site`         varchar(10)                              DEFAULT NULL COMMENT '建议国家站点',
    `remark`                         varchar(512)                             DEFAULT NULL COMMENT '备注',
    `attachments`                    json                                     DEFAULT NULL COMMENT '附件',
    `company_id`                     bigint                                   DEFAULT NULL COMMENT '租户ID',
    `deleted`                        tinyint(1) NOT NULL                      DEFAULT '0' COMMENT '是否删除，0-未删除，1-已删除',
    `creator_id`                     bigint                                   DEFAULT NULL COMMENT '创建者ID',
    `created_time`                   datetime                                 DEFAULT NULL COMMENT '创建时间',
    `reviser_id`                     bigint                                   DEFAULT NULL COMMENT '修改者ID',
    `revised_time`                   datetime                                 DEFAULT NULL COMMENT '修改时间',
    `creator_name`                   varchar(50)                              DEFAULT NULL COMMENT '创建人名称',
    `reviser_name`                   varchar(50)                              DEFAULT NULL COMMENT '修改人名称',
    PRIMARY KEY (`picking_style_result_detail_id`) USING BTREE,
    KEY `idx_picking_style_result_detail_main` (`picking_style_result_id`) USING BTREE
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8mb4
  COLLATE = utf8mb4_general_ci
  ROW_FORMAT = DYNAMIC COMMENT ='选款结果明细表';

-- 上面是原有的表结构，本次迭代后，做表结构变动
-- 新的表关系说明：
-- picking_style(1) -> picking_style_design(n) -> picking_style_detail(n)
-- 一个选款任务可以有多个款式
-- 一个款式可以包含多张图片
-- 图片可以设置排序和主图标识
-- 图片可以单独设置优化标签和淘汰原因
-- picking_style表修改：
ALTER TABLE picking_style
    ADD COLUMN `original_price` decimal(10, 2) DEFAULT NULL COMMENT '划线价',
    ADD COLUMN `sale_price`     decimal(10, 2) DEFAULT NULL COMMENT '售价';

-- 新增款式表(picking_style_design)：
CREATE TABLE `picking_style_design`
(
    `picking_style_design_id` bigint NOT NULL COMMENT '款式ID',
    `picking_style_id`        bigint NOT NULL COMMENT '选款任务ID',
    `design_code`             varchar(64) COMMENT '款式编号',
    `design_name`             varchar(128) COMMENT '款式名称',
    `design_state`            tinyint DEFAULT 0 COMMENT '款式状态：0-待选择 1-已选中 2-已淘汰',
    `sort_order`              int     DEFAULT 0 COMMENT '排序号',
    -- 其他基础字段省略
    PRIMARY KEY (`picking_style_design_id`),
    KEY `idx_picking_style_design_main` (`picking_style_id`)
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8mb4 COMMENT ='选款款式表';

-- 修改picking_style_detail表：
ALTER TABLE picking_style_detail
    ADD COLUMN `picking_style_design_id` bigint       DEFAULT NULL COMMENT '款式ID',
    ADD COLUMN `image_type`              tinyint(1)   DEFAULT 0 COMMENT '是否主图，1，主图，0，普通',
    ADD COLUMN `sort_order`              int          DEFAULT 0 COMMENT '图片排序',
    ADD COLUMN `reject_reason`           varchar(512) DEFAULT NULL COMMENT '淘汰原因',
    ADD COLUMN `need_optimize`           tinyint(1)   DEFAULT 0 COMMENT '是否需要优化修图';

-- 添加索引
ALTER TABLE picking_style_detail
    ADD INDEX `idx_design_sort` (`design_id`, `sort_order`);

ALTER TABLE picking_style
    DROP COLUMN `inspiration_version`;
ALTER TABLE picking_style
    DROP COLUMN `model_type`;
ALTER TABLE picking_style
    DROP COLUMN `busi_channel`;
ALTER TABLE picking_style
    DROP COLUMN `inspiration_version`;
