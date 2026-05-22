-- ----------------------------
-- Table structure for sdp_curation
-- ----------------------------
-- -----------DDL-----------------
ALTER TABLE product
    ADD COLUMN style_img_url varchar(512) null default '' comment '款式图' AFTER `material_img_url`;
ALTER TABLE product_skc
    ADD COLUMN sales_driving tinyint unsigned default   null comment '动销：0-否；1-是' AFTER `platform_skc_id`;
ALTER TABLE product_skc
    ADD COLUMN order_time datetime null comment '下单时间' AFTER `platform_skc_id`;
ALTER TABLE product_sku
    ADD COLUMN sales_driving tinyint unsigned default   null comment '动销：0-否；1-是' AFTER `platform_sku_id`;
ALTER TABLE product_sku
    ADD COLUMN order_time datetime null comment '下单时间' AFTER `platform_sku_id`;
-- -----------DDL-----------------