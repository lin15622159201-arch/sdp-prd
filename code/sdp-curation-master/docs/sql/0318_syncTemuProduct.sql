-- ----------------------------
-- Table structure for sdp_curation
-- ----------------------------
-- -----------DDL-----------------
create table product_sync_log
(
    log_id        bigint                  not null comment '主键id'
        primary key,
    product_id    bigint       default 0  not null comment '商品id',
    shop_id       bigint       default 0  not null comment '店铺ID',
    platform_code varchar(128) default '' not null comment '平台编码',
    skc_code      varchar(64)  default '' not null comment 'SKC编码',
    content       json null comment '日志内容',
    sync_status   tinyint      default 1 null comment '同步给业务状态：0-未同步；1-已同步',
    sync_time     datetime null comment '同步时间',
    sync_times    int          default 0 null comment '同步次数',
    batch_no      varchar(64) null comment '批次号',
    message       varchar(256) null comment '信息备注',
    tenant_id     bigint null comment '租户ID',
    creator_id    bigint unsigned              null comment '创建人ID',
    creator_name  varchar(50) null comment '创建人姓名',
    created_time  datetime null comment '创建时间',
    reviser_id    bigint unsigned              null comment '更新人ID',
    reviser_name  varchar(50) null comment '更新人姓名',
    revised_time  datetime null comment '更新时间',
    deleted       tinyint unsigned default '0' not null comment '逻辑删除：0-否；1-是'
) comment '商品同步日志表' row_format = DYNAMIC;
create index idx_created_time
    on product_sync_log (created_time);
create index idx_product_id
    on product_sync_log (product_id);
create index idx_shop_id
    on product_sync_log (shop_id);


create table temu_price_review_order
(
    review_id       bigint            not null comment '主键id'
        primary key,
    order_id        bigint  default 0 not null comment '核价单id',
    shop_id         bigint  default 0 not null comment '店铺ID',
    platform_sku_id bigint            not null comment '平台SKU ID',
    currency_type   varchar(16) null comment '币种 (CNY: 人民币, USD: 美元) (默认人民币)',
    suggest_price   decimal(18, 10) null comment '建议价格，单位 人民币：分，美元：美分',
    supply_price    decimal(18, 10) null comment '申报价格，单位 人民币：分，美元：美分',
    site_id         json null comment '站点ID',
    order_status    tinyint default 1 null comment '核价单状态',
    can_bargain     tinyint default 1 null comment '是否可重新报价',
    sync_status     tinyint default 1 null comment '同步给业务状态：0-未同步；1-已同步',
    sync_time       datetime null comment '同步时间',
    sync_times      int     default 0 null comment '同步次数',
    message         varchar(256) null comment '信息备注',
    tenant_id       bigint null comment '租户ID',
    creator_id      bigint unsigned              null comment '创建人ID',
    creator_name    varchar(50) null comment '创建人姓名',
    created_time    datetime null comment '创建时间',
    reviser_id      bigint unsigned              null comment '更新人ID',
    reviser_name    varchar(50) null comment '更新人姓名',
    revised_time    datetime null comment '更新时间',
    deleted         tinyint unsigned default '0' not null comment '逻辑删除：0-否；1-是'
) comment 'Temu核价单表' row_format = DYNAMIC;
create index idx_created_time
    on temu_price_review_order (created_time);
create index idx_platform_sku_id
    on temu_price_review_order (platform_sku_id);
create index idx_shop_id
    on temu_price_review_order (shop_id);
create index idx_order_id
    on temu_price_review_order (order_id);

ALTER TABLE product_sku_site_supplier_price
    MODIFY supplier_price decimal (18, 10) null comment '站点申报价格，单位 人民币：分，美元：美分';

ALTER TABLE product_sku_site_supplier_price
    ADD COLUMN supply_price decimal(18, 10) null comment '站点供货价格，单位 人民币：分，美元：美分' AFTER `supplier_price`;
-- -----------DDL-----------------