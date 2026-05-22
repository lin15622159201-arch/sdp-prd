-- SPU字段变更日志表
-- 每次SPU编辑时，自动记录有变更的字段及其新旧值
CREATE TABLE `design_style_field_log`
(
    `id`              bigint                                                        NOT NULL COMMENT '主键ID',
    `design_style_id` bigint                                                        NOT NULL COMMENT 'SPU ID',
    `style_code`      varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci  DEFAULT NULL COMMENT 'SPU编码',
    `version_num`     int                                                           NOT NULL COMMENT '变更后的版本号',
    `field_name`      varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci  NOT NULL COMMENT '字段名（Java属性名）',
    `field_label`     varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci  NOT NULL COMMENT '字段中文名',
    `old_value`       text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci         DEFAULT NULL COMMENT '旧值',
    `new_value`       text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci         DEFAULT NULL COMMENT '新值',
    `tenant_id`       varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci  NOT NULL DEFAULT '1' COMMENT '租户ID',
    `creator_id`      bigint                                                        NOT NULL COMMENT '操作人ID',
    `creator_name`    varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci  NOT NULL COMMENT '操作人名称',
    `create_time`     datetime                                                      NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    PRIMARY KEY (`id`),
    KEY `idx_design_style_id` (`design_style_id`),
    KEY `idx_style_code` (`style_code`),
    KEY `idx_version_num` (`design_style_id`, `version_num`)
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8mb4
  COLLATE = utf8mb4_general_ci COMMENT ='SPU字段变更日志表';
