ALTER TABLE sdp_curation.spot_style_task ADD `designer_id` BIGINT DEFAULT NULL COMMENT '设计师id【设计师】',
ADD `designer_code` VARCHAR ( 100 ) CHARACTER
SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '设计师编号【设计师】',
ADD `designer_name` VARCHAR ( 32 ) CHARACTER
SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '设计师名称【设计师】' AFTER `project_type_code`;



----------------------DML-----------------
UPDATE spot_style_task
SET designer_id = creator_id,
    designer_name = creator_name
WHERE
    designer_name IS NULL
  AND deleted = 0;