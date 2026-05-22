-- ----------------------------
-- Table structure for sdp_curation
-- ----------------------------
-- -----------DDL-----------------
ALTER TABLE product_sku
    ADD COLUMN packing_list JSON null  comment '包装清单' AFTER `sku_classification`;
ALTER TABLE product_sku
    ADD COLUMN individually_packed tinyint unsigned             null comment '是否独立包装，当sku分类为同款多件装或混合套装时，必填' AFTER `sku_classification`;
ALTER TABLE product_sku
    ADD COLUMN number_of_pack    int                          null comment ' 包装数量(对应Temu内计共含),2：同款多件装，3：混合套装时候' AFTER `number_of_pieces`;
-- -----------DDL-----------------