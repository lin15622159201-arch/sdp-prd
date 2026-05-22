alter table sdp_curation.inspiration
    add column expected_cost_price decimal(6, 2) comment '期望成本价' after sale_price;

alter table sdp_curation.picking_ai_design_result
    add column scene_code varchar(255) comment '场景code',
add column scene_name varchar(255) comment '场景名称';


alter table sdp_curation.picking_ai_design_style
    add column scene_code varchar(255) comment '场景code',
add column scene_name varchar(255) comment '场景名称';