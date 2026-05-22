-- ----------------------------
-- Table structure for sdp_curation
-- ----------------------------
-- -----------DDL-----------------
ALTER TABLE inspiration
    ADD COLUMN source_image_name varchar(256) null comment '灵感图原图名称' AFTER `source_image`;
ALTER TABLE ai_design_task
    ADD COLUMN inspiration_image_name varchar(256) null comment '灵感图名称' AFTER `inspiration_image`;
-- -----------DDL-----------------