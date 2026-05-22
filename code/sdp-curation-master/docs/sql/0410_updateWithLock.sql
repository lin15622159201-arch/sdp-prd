-- ----------------------------
-- Table structure for sdp_curation
-- ----------------------------
-- -----------DDL-----------------
ALTER TABLE prototype
    ADD COLUMN version INT DEFAULT 0 NOT NULL COMMENT '版本号' AFTER prototype_id;
ALTER TABLE product
    ADD COLUMN version INT DEFAULT 0 NOT NULL COMMENT '版本号' AFTER product_id;
ALTER TABLE product_skc
    ADD COLUMN version INT DEFAULT 0 NOT NULL COMMENT '版本号' AFTER product_skc_id;
-- -----------DDL-----------------
