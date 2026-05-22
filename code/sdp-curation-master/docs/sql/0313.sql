alter table sdp_curation.ai_design_task
    add column mode_code varchar(250) comment '模型编码（字典配置编码）',
add column mode_name varchar(250) comment '模型名称（字典配置名称）';