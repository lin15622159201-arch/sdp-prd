ALTER TABLE `sdp_curation`.`submit_downstream_log`
    MODIFY COLUMN `wave_batch_code` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL COMMENT '波次code' AFTER `business_code`;

ALTER TABLE `sdp_curation`.`inspiration`
    ADD COLUMN `style_source_code` varchar(255) NULL COMMENT '款式来源code' AFTER `popular_name`,
ADD COLUMN `style_source_name` varchar(255) NULL COMMENT '款式来源name' AFTER `style_source_code`;

--修改选款数据-花型上身的来源编码
update picking_ai_design set origin='floral_pattern_apply' where origin='floral_pattern';
