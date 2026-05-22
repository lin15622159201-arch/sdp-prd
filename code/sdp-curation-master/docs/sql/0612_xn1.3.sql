-- ----------------------------
-- Table structure for sdp_curation
-- ----------------------------
-- -----------DDL-----------------
ALTER TABLE ai_design_task
    ADD COLUMN fast_forward tinyint null comment '是否使用加速推理：0-否；1-是；' AFTER `mode_name`;
ALTER TABLE inspiration
    ADD COLUMN fast_forward tinyint null comment '是否使用加速推理：0-否；1-是；' AFTER `popular_name`;
-- -----------DDL-----------------