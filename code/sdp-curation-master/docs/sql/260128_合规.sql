CREATE TABLE `yoc_operation_log`
(
    `id`             bigint                                                       NOT NULL COMMENT '主键ID',
    `tenant_id`      varchar(32) COLLATE utf8mb4_general_ci                       NOT NULL COMMENT '租户ID',
    `operation_type` tinyint                                                      NOT NULL COMMENT '操作类型：1-审核通过，2-审核驳回，3-新增店铺，4-编辑店铺，5-启用店铺，6-停用店铺',
    `business_id`    bigint                                                                DEFAULT NULL COMMENT '业务ID（商品ID/店铺ID等）',
    `request_params` json                                                                  DEFAULT NULL COMMENT '请求参数',
    `creator_id`     bigint                                                       NOT NULL COMMENT '创建人ID',
    `creator_name`   varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '创建人名称',
    `create_time`    datetime                                                     NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    PRIMARY KEY (`id`),
    KEY              `idx_tenant_id` (`tenant_id`),
    KEY              `idx_business_id` (`business_id`),
    KEY              `idx_operation_type` (`operation_type`),
    KEY              `idx_create_time` (`create_time`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='YOC操作日志表';

ALTER TABLE
    `style_on_shelves`
    add
        shop_review_status tinyint default 0 not null comment '店铺审核状态: 0-未审核,1-已通过,2-已驳回',
add
  shop_review_user_id bigint null comment '店铺审核人ID',
add
  shop_review_user_name varchar(64) null comment '店铺审核人名称',
add
  shop_review_time datetime null comment '店铺审核时间',
add
  shop_review_fail_reason varchar(512) null comment '店铺审核驳回原因';