-- ----------------------------
-- Table structure for butted
-- ----------------------------
-- -----------DDL-----------------
ALTER TABLE `style_gen_task`
    ADD COLUMN enable_followability decimal(18, 10)  default 0.0 comment '是否增强跟随性，默认不开启为0，跟随最强为1' AFTER `enable_distill`;
-- -----------DDL-----------------