alter table sdp_curation.ai_design_task
    add promise_enhanced tinyint(1) comment '履约增强：0-否；1-是' after face_repair;

alter table sdp_curation.ai_design_task
    add parent_bus_id              bigint                  null comment '父业务id' after bus_id;


alter table sdp_curation.inspiration
    add inspiration_brand varchar(500) comment '灵感图品牌' after inspiration_image_source;


alter table sdp_curation.picking_ai_design_style
    add column product_theme_name varchar(500) comment '商品主题名称（来自字典）' after cargo_tray_code,
    add column product_theme_code varchar(500) comment '商品主题编码（来自字典）' after cargo_tray_code;



alter table sdp_curation.inspiration
    add inspiration_brand_code varchar(500) comment '灵感图品牌code' after inspiration_image_source,
    add inspiration_image_source_code varchar(500) comment '灵感图来源code' after inspiration_image_source;