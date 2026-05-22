CREATE TABLE `mq_log` (
                          `log_id` bigint NOT NULL COMMENT '主键',
                          `bus_id` bigint DEFAULT NULL COMMENT '业务标识',
                          `sub_bus_id` bigint DEFAULT NULL COMMENT '业务子标识',
                          `task_code` varchar(50) COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '任务编码',
                          `mq_time` datetime DEFAULT NULL COMMENT '推送时间',
                          `state` tinyint DEFAULT NULL COMMENT '1-成功 0-失败',
                          `msg` text COLLATE utf8mb4_general_ci COMMENT '报文',
                          PRIMARY KEY (`log_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='mq 日志表';
