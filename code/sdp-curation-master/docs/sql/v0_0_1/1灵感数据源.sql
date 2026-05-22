# drop table inspiration;
CREATE TABLE `inspiration`
(
    `inspiration_id`           bigint        NOT NULL COMMENT '灵感id',
    `inspiration_code`         varchar(50)   NOT NULL COMMENT '灵感编号',
    `third_inspiration_id`     bigint                             DEFAULT NULL COMMENT '第三方灵感id',
    `planning_source`          varchar(255)  NOT NULL COMMENT '企划来源',
    `wave_batch_code`          varchar(255)  NOT NULL COMMENT '波次编号',
    `inspiration_image`        varchar(1000) NOT NULL COMMENT '灵感图',
    `inspiration_image_source` varchar(255) CHARACTER SET utf8mb4 DEFAULT NULL COMMENT '灵感图来源',
    `source_image`             varchar(1000) NOT NULL COMMENT '导入灵感图原图URL',
    `product_link`             varchar(500) CHARACTER SET utf8mb4 DEFAULT NULL COMMENT '商品链接URL',
    `external_category`        varchar(255)                       DEFAULT NULL COMMENT '外部品类',
    `country_site_id`          bigint                             DEFAULT NULL COMMENT '来源国家站点code',
    `country_site_name`        varchar(255) CHARACTER SET utf8mb4 DEFAULT NULL COMMENT '来源国家站点name',
    `retail_price`             varchar(255)                       DEFAULT NULL COMMENT '划线价(US)',
    `sale_price`               varchar(255)                       DEFAULT NULL COMMENT '销售价(US)',
    `suggested_supply_method`  varchar(255)                       DEFAULT NULL COMMENT '建议供给方式',
    `inspiration_created_time` datetime      NOT NULL COMMENT '灵感创建时间',
    `data_source`              varchar(255)                       DEFAULT NULL COMMENT '数据来源',
    `submit_count`             int           NOT NULL             DEFAULT '0' COMMENT '灵感提交次数',
    `submit_status`            int           NOT NULL             DEFAULT '0' COMMENT '状态: 0待提交, 1已提交',
    identified_id              bigint        null comment '识别任务id',
    `identified_status`        int                                DEFAULT NULL COMMENT '识别结果',
    `identified_category`      varchar(255) CHARACTER SET utf8mb4 DEFAULT NULL COMMENT '识别品类',
    `identified_label`         varchar(255)                       DEFAULT NULL COMMENT '识别标签',
    `style_type`               varchar(255)                       DEFAULT NULL COMMENT '款式类型',
    `message`                  varchar(255)                       DEFAULT NULL COMMENT '信息备注',
    `creator_id`               bigint        NOT NULL COMMENT '创建人id',
    `creator_name`             varchar(32)   NOT NULL COMMENT '创建人名称',
    `created_time`             datetime      NOT NULL COMMENT '创建时间',
    `reviser_id`               bigint                             DEFAULT NULL COMMENT '最近修改人id',
    `reviser_name`             varchar(32)                        DEFAULT NULL COMMENT '最近修改人名称',
    `revised_time`             datetime      NOT NULL             DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '最近更新时间',
    `deleted`                  tinyint(1)    NOT NULL COMMENT '是否已删除;0未删除，1已删除',
    PRIMARY KEY (`inspiration_id`) USING BTREE
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8mb4
  COLLATE = utf8mb4_general_ci
  ROW_FORMAT = DYNAMIC COMMENT ='灵感数据';

CREATE TABLE `inspiration_label`
(
    `id`               bigint   NOT NULL COMMENT '主键',
    identified_id      bigint   not null comment '识别id',
    inspiration_id     bigint   not null comment '灵感id',
    `label_name`       varchar(255)      DEFAULT NULL COMMENT '标签key名称',
    `label_code`       varchar(255)      DEFAULT NULL COMMENT '标签key编号',
    `label_value_name` varchar(255)      DEFAULT NULL COMMENT '标签value名称',
    `label_value_code` varchar(255)      DEFAULT NULL COMMENT '标签value编号',
    `tenant_id`        bigint   NOT NULL COMMENT '租户id',
    `creator_id`       bigint   NOT NULL COMMENT '创建人id',
    `creator_name`     varchar(50)       DEFAULT NULL COMMENT '创建人姓名',
    `created_time`     datetime NOT NULL COMMENT '创建时间',
    `reviser_id`       bigint            DEFAULT NULL COMMENT '更新人id',
    `reviser_name`     varchar(50)       DEFAULT NULL COMMENT '更新人姓名',
    `revised_time`     datetime          DEFAULT NULL COMMENT '更新时间',
    `deleted`          tinyint  NOT NULL DEFAULT '0' COMMENT '逻辑删除 0 否 1是',
    PRIMARY KEY (`id`)
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8mb4
  COLLATE = utf8mb4_general_ci
  ROW_FORMAT = DYNAMIC COMMENT ='灵感数据-标签';

CREATE TABLE `submit_downstream_log`
(
    `log_id`          bigint       NOT NULL COMMENT 'id',
    `inspiration_id`  bigint       NOT NULL COMMENT '灵感id',
    `business_id`     bigint       NOT NULL COMMENT '业务id',
    `business_code`   varchar(255) NOT NULL COMMENT '业务code',
    `generation_type` varchar(255) NOT NULL COMMENT '跑图类型',
    `task_code`       varchar(255) NOT NULL COMMENT '任务编号',
    `task_status`     int          NOT NULL COMMENT '任务状态',
    `request`         json                  DEFAULT NULL COMMENT '请求参数',
    `response`        json                  DEFAULT NULL COMMENT '结果参数',
    `creator_id`      bigint       NOT NULL COMMENT '创建人id',
    `creator_name`    varchar(32)  NOT NULL COMMENT '创建人名称',
    `created_time`    datetime     NOT NULL COMMENT '创建时间',
    `reviser_id`      bigint                DEFAULT NULL COMMENT '最近修改人id',
    `reviser_name`    varchar(32)           DEFAULT NULL COMMENT '最近修改人名称',
    `revised_time`    datetime     NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '最近更新时间',
    `deleted`         tinyint(1)   NOT NULL COMMENT '是否已删除;0未删除，1已删除',
    PRIMARY KEY (`log_id`) USING BTREE
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8mb4
  COLLATE = utf8mb4_general_ci
  ROW_FORMAT = DYNAMIC COMMENT ='提交下游任务信息';