# SDP一款多商品\-设计文档

# 一、需求及设计

# 1\.1、需求解析



# 1\.2、需求原型引用

@林廷威[一款多商品方案](https://zhijing19.feishu.cn/wiki/V4rOwWc89is32kkUajlcuhINnTh)

# 二、业务模块设

## 系统分工 

需求评审：04\-23

设计：

后端开发：

前端开发：

联调：

冒烟：

测试：

验收：

上线：



### 三、**代码分支**内容参数：

#### 后端

|**zadi命名空间**|**模块**|**服务名**|提测分支|UAT分支|灰度分支|生产分支|**执行人**|**完成状态**|编码|
|---|---|---|---|---|---|---|---|---|---|
|sdp|商品服务|sdp\-curation||||||||

#### **前端 **

|**模块**|**服务名**|开发分支|提测分支|UAT分支|灰度分支|生产分支|**执行人**|**完成状态**|
|---|---|---|---|---|---|---|---|---|
||||||||||



## 2\.1 业务逻辑设计

### 待上架

1. 将原来上架款SPU（style\_on\_shelves），SKC表（skc\_on\_shelves）定义为首次发布的款信息快照表，新增款式发布表（SPU,SKC维度）记录每次发布的信息（店铺，轮播图，价格，附件，审核结果等），实现同一款式多店铺发布

|SPU|SKC|
|---|---|
|![Image](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=OTE4Njc5NjFjNzRhOWRhOTA2MTc3MDRlMGI5YzViYTRfMzcxM2FkM2M0NzdiNGVhMDA5OTY4YWNjOGVjMWQ5MjhfSUQ6NzYzMzM1MjM4NjUwMDc5MTUwM18xNzgwOTk1OTg0OjE3ODEwODIzODRfVjM)<br>|<br>![Image](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=NjFkMTI0NDIwZTU3YTE2NjIyZWY1ZTgzYmExNmFiNWFfNjNmYzBkZGFjYTk3MzdhYTFhMWUzNzY5NmU5ZTJhNTRfSUQ6NzYzMzM0MzE3NjI2NzYxNTQyOF8xNzgwOTk1OTg0OjE3ODEwODIzODRfVjM)|

SQL

```TypeScript
CREATE TABLE `publish_style_skc`  (
                          `publish_skc_id` bigint NOT NULL COMMENT '款式SKC发布记录ID',
                          `publish_spu_id` bigint NULL DEFAULT NULL COMMENT '款式SPU发布记录ID',
                          `skc_id` bigint NULL DEFAULT NULL COMMENT '源款式SKCID',
                          `style_id` bigint UNSIGNED NULL DEFAULT NULL COMMENT '源款式SPUID',
                          `skc_code` varchar(80) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT 'SKC编码',
                          `skc_name` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT 'SKC名称',
                          `on_shelves_status` int NULL DEFAULT 0 COMMENT '上架状态：1-上架；0-下架；',
                          `spliced` int NULL DEFAULT 0 COMMENT '是否拼接：1-拼接；；',
                          `show_detail` tinyint NULL DEFAULT 1 COMMENT '是否要展示出来，0-不展示，1-展示',
                          `main_img_url` varchar(512) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT '' COMMENT '主图url',
                          `color` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '颜色名称',
                          `size_standard_code` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '尺码标准编号',
                          `size_standard_name` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '尺码标准',
                          `size_name` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '尺码',
                          `size_code` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '尺码编码',
                          `pre_disassembly_state` tinyint(1) NULL DEFAULT NULL COMMENT '前置拆版状态 0=否 1=是',
                          `price_passed_state` tinyint(1) NULL DEFAULT 0 COMMENT '测价通过状态 0=否 1=是',
                          `price_passed_time` datetime NULL DEFAULT NULL COMMENT '测价通过时间',
                          `disassembly_finished` tinyint(1) NULL DEFAULT 0 COMMENT '拆版是否完成 0=否 1=是',
                          `disassembly_finished_time` datetime NULL DEFAULT NULL COMMENT '拆版完成时间',
                          `attachment` json NULL COMMENT '附件',
                          `message` varchar(256) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '信息备注',
                          `creator_id` bigint UNSIGNED NULL DEFAULT NULL COMMENT '创建人ID',
                          `creator_name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '创建人姓名',
                          `created_time` datetime NULL DEFAULT NULL COMMENT '创建时间',
                          `reviser_id` bigint UNSIGNED NULL DEFAULT NULL COMMENT '更新人ID',
                          `revised_time` datetime NULL DEFAULT NULL COMMENT '更新时间',
                          `reviser_name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '更新人姓名',
                          `deleted` tinyint UNSIGNED NOT NULL DEFAULT 0 COMMENT '逻辑删除：0-否；1-是',
                          `tenant_id` bigint NULL DEFAULT NULL COMMENT '租户ID',
                          PRIMARY KEY (`publish_skc_id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT = '款式SKC发布表' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for publish_style_spu
-- ----------------------------
CREATE TABLE `publish_style_spu`  (
                      `publish_spu_id` bigint NOT NULL COMMENT '款式SPU发布记录ID',
                      `style_id` bigint NULL DEFAULT NULL COMMENT '源款式SPUID',
                      `style_code` varchar(80) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '款号',
                      `style_type` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT '' COMMENT '开款类型',
                      `source_type` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT '' COMMENT '数据来源',
                      `review_status` tinyint NULL DEFAULT 0 COMMENT '审核状态，0-待审核，1-已通过，2-已驳回',
                      `release_status` tinyint NULL DEFAULT NULL COMMENT '发布状态，0-待发布，1-发布中，2-已发布，3-发布失败',
                      `store_id` bigint NULL DEFAULT NULL COMMENT '店铺id',
                      `store_name` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '店铺名称',
                      `size_standard_code` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '尺码标准编号',
                      `size_standard_name` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '尺码标准',
                      `style_ingredient` json NULL COMMENT '成分',
                      `attachment` json NULL COMMENT '附件[]字符串数组',
                      `size_attachment` json NULL COMMENT '尺码附件[]字符串数组',
                      `review_user_id` bigint NULL DEFAULT NULL COMMENT '审核人ID',
                      `review_user_name` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '审核人名称',
                      `review_time` datetime NULL DEFAULT NULL COMMENT '审核时间',
                      `review_fail_reason` varchar(256) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '审核不通过原因',
                      `release_fail_reason` varchar(256) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '发布失败原因',
                      `shop_review_status` tinyint NOT NULL DEFAULT 0 COMMENT '店铺审核状态，1-已通过，2-已驳回，0-未审核',
                      `shop_review_user_id` bigint NULL DEFAULT NULL COMMENT '店铺审核人ID',
                      `shop_review_user_name` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '店铺审核人名称',
                      `shop_review_time` datetime NULL DEFAULT NULL COMMENT '店铺审核时间',
                      `shop_review_fail_reason` varchar(512) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '店铺审核驳回原因',
                      `latest_push_time` datetime NULL DEFAULT NULL COMMENT '最近一次操作发布商品时间',
                      `english_title` varchar(256) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '英文标题',
                      `chinese_title` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '中文标题',
                      `on_shelves_tag` json NULL COMMENT '上架标签',
                      `on_shelves_times` int NULL DEFAULT NULL COMMENT '当前SPU在同个店铺的第N次上架',
                      `secondary_reason_code` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '二次上架原因编码',
                      `secondary_reason_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '二次上架原因',
                      `message` varchar(256) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '信息备注',
                      `creator_id` bigint UNSIGNED NULL DEFAULT NULL COMMENT '创建人ID',
                      `creator_name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '创建人姓名',
                      `created_time` datetime NULL DEFAULT NULL COMMENT '创建时间',
                      `reviser_id` bigint UNSIGNED NULL DEFAULT NULL COMMENT '更新人ID',
                      `reviser_name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '更新人姓名',
                      `revised_time` datetime NULL DEFAULT NULL COMMENT '更新时间',
                      `deleted` tinyint UNSIGNED NOT NULL DEFAULT 0 COMMENT '逻辑删除：0-否；1-是',
                      `tenant_id` bigint NULL DEFAULT NULL COMMENT '租户ID',
                      PRIMARY KEY (`publish_spu_id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT = '款式SPU发布表' ROW_FORMAT = Dynamic;
```

```SQL
ALTER TABLE `sdp_curation`.`product` 
ADD COLUMN `publish_spu_id` bigint NULL COMMENT '款式SPU发布ID' AFTER `style_code`;
```

```SQL
ALTER TABLE `sdp_curation`.`style_review_log` 
ADD COLUMN `publish_spu_id` bigint NULL COMMENT '款式SPU发布ID' AFTER `style_id`;
```



2. 数据同步

复制原待上架表style\_on\_shelves数据到新的SPU发布表publish\_style\_spu

复制原待上架表skc\_on\_shelves数据到新的SKC发布表publish\_style\_skc

复制product表的style\_id到新增字段publish\_spu\_id



3. 修改设计款，现货款和组合商品的发布逻辑（首次发布），记录到待上架表同时记录到发布表（后续从商品列表复制，则只写发布表）

款式管理批量上架入口 tech\.tiangong\.sdp\.controller\.PrototypeController\#batchOnShelves

现货批量上架入口 tech\.tiangong\.sdp\.controller\.SpotStyleTaskController\#batchOnShelves

组合商品批量上架入口

4. 修改待上架列表查询，详情，编辑，审核等接口

以publish\_style\_spu为主style\_on\_shelves作为上架信息的基础信息表

界面操作单个上架记录则以publish\_spu\_id为主键参数

上架图片信息表style\_skc\_on\_shelves\_picture暂时不需要改动，因为其内容是以设计款和现货款为准进行增减，待上架界面并不能修改这里的图片，而且没有用源SPUID和源SKCID作为主键，使用时都是以源SKC维度进行查询 （待审核时编辑图片 TODO）

5. 提供方法给商品列表进行复制待上架商品

根据商品product关联的publish\_spu\_id,找到对应SPU的发布信息并复制出新的发布记录（SPU,SKC维度），同时记录当前是第几次发布on\_shelves\_times（复制商品的内容时判断SPU和SKC是否存在款式管理，YOC接口调整）

```Java
*/***
* * 复制待发布SPU*
* */*
@Data
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode(callSuper = true)
public class CopyPublishStyleSpuReq {

    @Serial
    private static final long *serialVersionUID *= 8739452072134486893L;

    */***
*     * 发布SPUID*
*     */*
*    *@NotNull(message = "发布SPUID不能为空")
    private Long publishSpuId;
    */***
*     * 店铺ID*
*     */*
*    *@NotNull(message = "店铺ID不能为空")
    private Long shopId;
    */***
*     * 二次上架原因编码*
*     */*
*    *@NotBlank(message = "二次上架原因编码不能为空")
    private String secondaryReasonCode;

    */***
*     * 二次上架原因*
*     */*
*    *@NotBlank(message = "二次上架原因不能为空")
    private String secondaryReason;

}
```

6. 增加首次上架，二次上架标签

```Java
*/***
* * 上架标签*
* */*
@Getter
@AllArgsConstructor
public enum OnShelvesTagEnum {
    *FIRST_TIME*("首次上架"),
*SECONDARY*("二次上架"),
    ;
    private final String code;

    public static OnShelvesTagEnum from(final String code) {
        return Arrays.*stream*(*values*())
                .filter(t -> Objects.*equals*(t.getCode(), code)).findFirst().orElseThrow(() ->
                        new IllegalArgumentException("OnShelvesTagEnum not found by code " + code));
    }
}
```

7. 审核待发布款式

- 日志增加字段记录审核对应的款式SPU发布ID

- 对应product\_spu记录款式SPU发布ID

相关查询接口也要以publishSpuId作为入参

```SQL
ALTER TABLE `sdp_curation`.`style_review_log` 
ADD COLUMN `publish_spu_id` bigint NULL COMMENT '款式发布SPUID' AFTER `style_id`;
```

### 商品列表

复制商品到待上架列表

1. 根据SPU编码查询到源款信息（SPU,SKC）生成待上架对象StyleOnShelves，再通过StyleOnShelves生成对应的待发布对象（注意变更店铺ID）

2. 复制源商品最近一次审核记录，根据记录内容生成创建商品入参（模拟编辑保存或者审核待上架对象）。（注意变更店铺ID）

## 2\.2 HTTP接口设计

web接口

|接口|描述|yapi|对接人|
|---|---|---|---|
|待上架列表||https://yapi\.textile\-story\.com/project/1361/interface/api/116911||
|状态统计||https://yapi\.textile\-story\.com/project/1361/interface/api/116920||
|款式SPU发布详情\(只返回可见的SKC\)||https://yapi\.textile\-story\.com/project/1361/interface/api/116929||
|~~审核~~||~~https://yapi\.textile\-story\.com/project/1361/interface/api/116938~~||
|查询审核内容||https://yapi\.textile\-story\.com/project/1361/interface/api/116947||
|推送店家审核||https://yapi\.textile\-story\.com/project/1361/interface/api/117028||
|复制商品到待上架||https://yapi\.textile\-story\.com/project/1361/interface/api/116992||
|批量发布前校验平台上是否已经有同款商品||https://yapi\.textile\-story\.com/project/1361/interface/api/113617||
|批量发布或关联平台商品||https://yapi\.textile\-story\.com/project/1361/interface/api/113599||
|查询款审核信息\-V2||https://yapi\.textile\-story\.com/project/1361/interface/api/117001||
|款式SPU发布详情\(全部SKC\)||https://yapi\.textile\-story\.com/project/1361/interface/api/117094||
|根据SPU发布ID查询商品详情信息||https://yapi\.textile\-story\.com/project/1361/interface/api/117196||



Fegin接口

```XML

```





## 2\.3 MQ设计



## 2\.4 数据库设计

https://gitlab\-scm\.jzcang\.cn/xiniu/backend/sdp\-curation/\-/blob/feature/0429\-publish/docs/sql/sdp\_v0429\-publish\.sql

## 2\.6 配置



## 2\.7  ES Mapping



## 2\.8 XXL\-JOB



## 2\.9 数据处理



