# show create table ai_design_task;
# show create table ai_design_task_fabric;
# show create table ai_design_task_label;
# show create table ai_design_task_picture;

CREATE TABLE `ai_design_task`
(
    `task_id`           bigint       NOT NULL COMMENT '任务id',
    `task_code`         varchar(255)          DEFAULT NULL COMMENT 'ai任务编号',
    `task_status`       int          NOT NULL DEFAULT '0' COMMENT '任务状态:0排队中 10生成中 20已中止 30已完成 40无效 50失败 60超时失败',
    `inspiration_id`    varchar(255)          DEFAULT NULL COMMENT '灵感数据id',
    `inspiration_image` varchar(255)          DEFAULT NULL COMMENT '灵感图',
    `smart_identify_id` bigint                DEFAULT NULL COMMENT '图片识别id',
    `category_code`     varchar(255) NOT NULL DEFAULT '' COMMENT '款式品类code',
    `category_name`     varchar(255) NOT NULL DEFAULT '' COMMENT '款式品类名称',
    `generate_mode`     int          NOT NULL DEFAULT '0' COMMENT '生成模式：0-单姿势；1-多姿势',
    `model_code`        varchar(50)           DEFAULT '' COMMENT '模特code',
    `model_url`         varchar(255)          DEFAULT '' COMMENT '模特图片url',
    `model_caption`     varchar(500)          DEFAULT '' COMMENT '模特图片描述',
    `scene_info`        json                  DEFAULT NULL COMMENT '场景信息',
    `gen_count`         int          NOT NULL DEFAULT '0' COMMENT '生成数量',
    `filter_back`       int                   DEFAULT NULL COMMENT '背景增强(1:开启, 0:关闭)',
    `face_repair`       int                   DEFAULT NULL COMMENT '脸部修复(1:开启, 0:关闭)',
    `style_type`        int          NOT NULL DEFAULT '0' COMMENT '款式类型：0-净色、1-花型',
    `tenant_id`         bigint       NOT NULL COMMENT '租户id',
    `creator_id`        bigint       NOT NULL COMMENT '创建人id',
    `creator_name`      varchar(50)           DEFAULT NULL COMMENT '创建人姓名',
    `created_time`      datetime     NOT NULL COMMENT '创建时间',
    `reviser_id`        bigint                DEFAULT NULL COMMENT '更新人id',
    `reviser_name`      varchar(50)           DEFAULT NULL COMMENT '更新人姓名',
    `revised_time`      datetime              DEFAULT NULL COMMENT '更新时间',
    `deleted`           tinyint      NOT NULL DEFAULT '0' COMMENT '逻辑删除 0 否 1是',
    PRIMARY KEY (`task_id`)
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8mb4
  COLLATE = utf8mb4_general_ci
  ROW_FORMAT = DYNAMIC COMMENT ='AI设计任务';
CREATE TABLE `ai_design_task_fabric`
(
    `fabric_id`              bigint   NOT NULL COMMENT '主键',
    `task_id`                bigint   NOT NULL COMMENT '任务id',
    `fabric_recommend_id`    bigint            DEFAULT NULL COMMENT '面料推荐ID',
    `family_fabric_category` varchar(100)      DEFAULT NULL COMMENT '家族代表面料类目',
    `source_commodity_id`    bigint            DEFAULT NULL COMMENT '中台主商品ID',
    `commodity_id`           bigint            DEFAULT NULL COMMENT '商品ID',
    `commodity_code`         varchar(255)      DEFAULT NULL COMMENT '商品编码',
    `commodity_name`         varchar(255)      DEFAULT NULL COMMENT '商品名称',
    `commodity_picture`      varchar(255)      DEFAULT NULL COMMENT '商品图片',
    `color_picture`          varchar(255)      DEFAULT NULL COMMENT '纹理色块图',
    `sku_id`                 bigint            DEFAULT NULL COMMENT 'SKU-ID',
    `sku_code`               varchar(255)      DEFAULT NULL COMMENT 'SKU-编码',
    `color_code`             varchar(255)      DEFAULT NULL COMMENT '色号',
    `rgb`                    varchar(255)      DEFAULT NULL COMMENT 'RGB',
    `creator_id`             bigint   NOT NULL COMMENT '创建人id',
    `creator_name`           varchar(50)       DEFAULT NULL COMMENT '创建人姓名',
    `created_time`           datetime NOT NULL COMMENT '创建时间',
    `reviser_id`             bigint            DEFAULT NULL COMMENT '更新人id',
    `reviser_name`           varchar(50)       DEFAULT NULL COMMENT '更新人姓名',
    `revised_time`           datetime          DEFAULT NULL COMMENT '更新时间',
    `deleted`                tinyint  NOT NULL DEFAULT '0' COMMENT '逻辑删除 0 否 1是',
    PRIMARY KEY (`fabric_id`) USING BTREE
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8mb4
  COLLATE = utf8mb4_general_ci
  ROW_FORMAT = DYNAMIC COMMENT ='AI设计任务-推荐面料';

CREATE TABLE `ai_design_task_label`
(
    `id`               bigint   NOT NULL COMMENT '主键',
    `task_id`          bigint   NOT NULL COMMENT '任务id',
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
  ROW_FORMAT = DYNAMIC COMMENT ='AI设计任务-标签';

CREATE TABLE `ai_design_task_picture`
(
    `picture_id`     bigint  NOT NULL COMMENT '图片id',
    `task_id`        bigint  NOT NULL COMMENT '任务id',
    `picture_url`    varchar(256)     DEFAULT NULL COMMENT '生成图',
    `repair_img_url` varchar(256)     DEFAULT NULL COMMENT '修复图',
    `group_num`      int              DEFAULT NULL COMMENT '组号',
    `serial_num`     int              DEFAULT NULL COMMENT '序号',
    `tenant_id`      bigint           DEFAULT NULL COMMENT '租户ID',
    `creator_id`     bigint           DEFAULT NULL COMMENT '创建人ID',
    `creator_name`   varchar(50)      DEFAULT NULL COMMENT '创建人姓名',
    `created_time`   datetime         DEFAULT NULL COMMENT '创建时间',
    `reviser_id`     bigint           DEFAULT NULL COMMENT '更新人ID',
    `reviser_name`   varchar(50)      DEFAULT NULL COMMENT '更新人姓名',
    `revised_time`   datetime         DEFAULT NULL COMMENT '更新时间',
    `deleted`        tinyint NOT NULL DEFAULT '0' COMMENT '逻辑删除：0-否；1-是',
    PRIMARY KEY (`picture_id`)
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8mb4
  COLLATE = utf8mb4_general_ci
  ROW_FORMAT = DYNAMIC COMMENT ='AI设计任务-结果图';