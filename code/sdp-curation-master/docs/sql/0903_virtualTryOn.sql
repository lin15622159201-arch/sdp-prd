-- ----------------------------
-- Table structure for sdp_curation
-- ----------------------------
-- -----------DDL-----------------
ALTER TABLE `style_gen_task`
    ADD COLUMN bg_img_info json null comment '背景图信息' AFTER `bg_img_url`;
ALTER TABLE `style_gen_task`
    ADD COLUMN model_img_info json null comment '模特图信息' AFTER `model_img_url`;
-- -----------DDL-----------------