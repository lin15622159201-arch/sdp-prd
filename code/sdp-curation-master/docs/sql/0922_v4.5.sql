-- ----------------------------
-- Table structure for sdp_curation
-- ----------------------------
-- -----------DDL-----------------
ALTER TABLE `inspiration`
ADD COLUMN  tenant_id              bigint             default 1       not null  comment '租户id' AFTER `deleted`;
-- -----------DDL-----------------

-- -----------DML-----------------
-- -----------DML-----------------