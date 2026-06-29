---
module_id: style-log-center
module_name: 款式日志中心
version: v1.0.0
status: draft
owner: _待填写_
last_updated: '2026-06-29'
depends_on:
  - module: style-management
    type: hard
    use_case: 接收款式管理模块的日志写入请求（SPU/SKC 变更、集成事件）
  - module: spot-goods
    type: hard
    use_case: 接收现货管理模块的日志写入请求
  - module: auth
    type: hard
    use_case: 查询时校验用户权限和数据范围
exposed_api:
  - module: style-management
    type: hard
    use_case: 提供日志写入 API（record_change）；提供日志查询 API（query_logs）
  - module: spot-goods
    type: hard
    use_case: 提供日志写入 API（record_change）；提供日志查询 API（query_logs）
related_features:
  - "款式管理（SPU/SKC 变更追踪）"
  - "现货管理（商品变更追踪）"
  - "PLM 系统（推送事件记录）"
  - "UACS 权限系统（日志查询数据范围）"
---

# 款式日志中心

## 1. 模块概述

为款式/商品模块提供统一的变动追踪能力，支持设计师/跟单自查"某款式具体改了什么字段"、以及管理层跨款式的操作审计，实现从问题发生到定位变更根因的闭环。

**职责边界**

做什么：
- 记录 SPU 基本信息变更（字段级 before/after）
- 记录 SKC 属性变更、状态流转（字段级 before/after）
- 记录 SPU/SKC 的图片/视频素材替换（前后缩略图/文件信息对比）
- 记录集成事件（PLM 推送、上架推送、测价通过/撤销），事件级粒度
- 提供两级查询入口：款式/SKC 详情页内嵌 Tab（单条记录自查）+ 独立日志中心页（全局审计）


**与相邻模块的分工**

| 模块 | 分工 |
|------|------|
| 款式管理 | 业务操作发生方，负责调用日志写入 API；本模块只负责存储和查询 |
| 现货管理 | 同上 |
| 操作日志（原有抽屉） | 原有 SKC 操作日志抽屉由本模块日志 Tab 统一替代，原表数据迁移由研发确认 |

**对接关系**

| 关系类型 | 关联模块/系统 | 交互方式 | 关键数据 |
|---------|------------|---------|---------|
| 上游依赖 | 款式管理 | API 调用（写入） | SPU/SKC 变更事件 |
| 上游依赖 | 现货管理 | API 调用（写入） | SPU/SKC 变更事件 |
| 上游依赖 | UACS 权限系统 | API 调用 | 用户数据范围权限 |
| 下游依赖 | 款式管理 | API 提供（查询） | 日志列表、变更详情 |
| 下游依赖 | 现货管理 | API 提供（查询） | 日志列表、变更详情 |
| 旁路系统 | PLM 系统 | 事件记录（只写） | 推送状态、结果消息 |

**核心业务流程**

```mermaid
flowchart TD
    A[用户/系统触发变更] --> B{变更类型}
    B -->|字段变更 SPU/SKC| C[比较前后字段值]
    B -->|素材变更 图片/视频| D[记录素材替换事件]
    B -->|集成事件 PLM/上架/测价| E[记录事件类型和结果]
    C --> F[写入日志记录 + 字段 diff 列表]
    D --> G[写入日志记录 + 素材前后引用]
    E --> H[写入日志记录 + 事件描述]
    F & G & H --> I[(style_change_log)]
    I --> J{查询入口}
    J -->|设计师/跟单自查| K[款式/SKC 详情页 - 变更日志 Tab]
    J -->|管理层审计| L[独立日志中心页面]
    K --> M[按 SKC/SPU 筛选 + 展示字段 diff]
    L --> N[跨款式全局查询 + 多维筛选]
```

---

## 2. 页面概述

| 页面名称 | 页面类型 | 入口/路径 | 交互形式 | 说明 |
|---------|---------|---------|---------|------|
| 日志中心 | 列表页 | 设计中心 → 日志中心 | 页面跳转 | 全局日志查询，支持跨 SPU/SKC 检索，适合管理层审计 |
| 操作日志抽屉 | 抽屉 | 款式列表 → 「操作日志」 | 抽屉 | 展示当前 SKC + 所属 SPU 的合并变更日志，时间线排列，用标签区分维度 |
| 变更日志 Tab（款式详情） | Tab 页 | SKC 详情页 → 「变更日志」Tab | Tab 切换 | 同操作日志抽屉内容，嵌入 SKC 详情页 Tab |
| 变更详情 | 详情弹窗 | 日志列表 → 点击「查看详情」 | 弹窗 | 展示单条日志的完整字段级 diff 或素材前后对比 |

---

## 3. 权限说明

### 功能权限

| 操作 | 权限码 | 说明 |
|------|--------|------|
| 查看日志中心 | `SDP-SJZX-RZGL-CK` | 访问独立日志中心页面 |
| 查看变更详情 | `SDP-SJZX-RZGL-CKXQ` | 展开单条日志的字段 diff 详情 |

> SKC 详情页内嵌的「变更日志 Tab」复用款式管理模块的 `SDP-SJZX-KSGL-CKXQ`（查看详情）权限，无需单独配置。

### 数据范围权限

| 权限码 | 说明 |
|--------|------|
| `SDP-SJZX-KSGL-QBFZ` | 查看全部款式日志（管理层/运营） |
| `SDP-SJZX-KSGL-QBZN` | 仅查看本组款式日志 |
| `SDP-SJZX-KSGL-QBWD` | 仅查看我的款式日志 |

> 数据范围权限复用款式管理模块的现有权限码，日志查询时按相同口径过滤。

---

## 4. 状态机

本模块为只写日志存储，日志记录一经写入不可修改，无状态流转。

---

## 5. 数据模型

### 5.1 实体关系

```mermaid
erDiagram
    style_change_log {
        bigint log_id PK
        string entity_type
        bigint entity_id
        string entity_code
        string action_type
        string action_category
        int operator_id FK
        string operator_name
        datetime operated_at
        json field_diffs
        json event_detail
    }
    style_change_log_field {
        bigint field_id PK
        bigint log_id FK
        string field_name
        string field_label
        string field_type
        string before_value
        string after_value
        string before_display
        string after_display
    }
    design_style ||--o{ style_change_log : "SPU日志"
    prototype ||--o{ style_change_log : "SKC日志"
    style_change_log ||--o{ style_change_log_field : "字段变更明细"
```

### 5.2 日志主表（style_change_log）

#### 系统字段

| 字段名 | 中文名 | 分类 | 类型 | 必填 | 说明 |
|-------|-------|------|------|------|------|
| log_id | 日志 ID | 系统 | 整数 | 自动 | 主键，雪花 ID |
| created_at | 写入时间 | 系统 | 日期时间 | 自动 | 日志写入时间，UTC |
| tenant_id | 租户 ID | 系统 | 整数 | 自动 | 多租户隔离 |

#### 实体标识

| 字段名 | 中文名 | 分类 | 类型 | 必填 | 说明 |
|-------|-------|------|------|------|------|
| entity_type | 实体类型 | 业务 | 枚举 | 是 | SPU / SKC |
| entity_id | 实体 ID | 业务 | 整数 | 是 | design_style_id 或 prototype_id |
| entity_code | 实体编码 | 业务 | 短文本 | 是 | style_code 或 design_code，冗余存储便于查询 |
| spu_id | 关联 SPU ID | 业务 | 整数 | 是 | 当 entity_type=SKC 时，记录所属 SPU ID；entity_type=SPU 时与 entity_id 相同 |
| spu_code | 关联 SPU 编码 | 业务 | 短文本 | 是 | 冗余存储，便于跨维度查询 |

#### 操作信息

| 字段名 | 中文名 | 分类 | 类型 | 必填 | 说明 |
|-------|-------|------|------|------|------|
| action_type | 操作类型 | 业务 | 枚举 | 是 | 见操作类型枚举 |
| action_category | 操作大类 | 业务 | 枚举 | 是 | FIELD_CHANGE（字段变更）/ MEDIA_CHANGE（素材变更）/ INTEGRATION_EVENT（集成事件） |
| operator_id | 操作人 ID | 管理 | 引用 | 是 | 人工操作取登录用户 ID；系统自动操作填 0 |
| operator_name | 操作人姓名 | 管理 | 短文本 | 是 | 冗余存储 |
| operated_at | 操作时间 | 管理 | 日期时间 | 是 | 业务操作发生时间（非日志写入时间） |
| source_module | 来源模块 | 管理 | 短文本 | 是 | 写入方标识，如 style-management / spot-goods |
| remark | 备注 | 业务 | 短文本 | 否 | 操作时填写的原因/备注，如取消 SKC 原因 |

#### 变更内容（冗余存储，便于列表预览）

| 字段名 | 中文名 | 分类 | 类型 | 必填 | 说明 |
|-------|-------|------|------|------|------|
| change_summary | 变更摘要 | 业务 | 短文本 | 是 | 供列表预览，如"修改了 销售季、责任设计师"；集成事件填事件描述 |
| changed_field_count | 变更字段数 | 业务 | 整数 | 否 | FIELD_CHANGE 类型时填写 |
| event_result | 事件结果 | 业务 | 枚举 | 否 | INTEGRATION_EVENT 类型时填写：SUCCESS / FAILED / PENDING |
| event_message | 事件消息 | 业务 | 短文本 | 否 | 失败原因或补充说明 |

---

**操作类型枚举（action_type）**

| 枚举值 | 中文名 | action_category | 适用实体 |
|-------|-------|----------------|---------|
| `SPU_EDIT` | 编辑 SPU 基本信息 | FIELD_CHANGE | SPU |
| `SPU_SUBMIT` | 提交款式资料 | FIELD_CHANGE | SPU |
| `SPU_DESIGNER_CHANGE` | 设计师变更 | FIELD_CHANGE | SPU |
| `SKC_CREATE` | 创建 SKC | FIELD_CHANGE | SKC |
| `SKC_EDIT` | 编辑 SKC 信息 | FIELD_CHANGE | SKC |
| `SKC_CANCEL` | 取消 SKC | FIELD_CHANGE | SKC |
| `MEDIA_MARKETING_PIC` | 营销图变更 | MEDIA_CHANGE | SKC |
| `MEDIA_VIDEO` | 视频变更 | MEDIA_CHANGE | SPU |
| `PLM_PUSH` | 推送 PLM | INTEGRATION_EVENT | SKC |
| `LISTING_PUSH` | 推送上架 | INTEGRATION_EVENT | SKC |
| `PRICE_CHECK` | 核价 | INTEGRATION_EVENT | SKC |
| `PROTO_DISASSEMBLE` | 拆版完成 | INTEGRATION_EVENT | SKC |
| `PRICE_APPROVE` | 测价通过 | INTEGRATION_EVENT | SKC |
| `PRICE_REVOKE` | 测价撤销 | INTEGRATION_EVENT | SKC |

---

### 5.3 字段变更明细表（style_change_log_field）

> 仅 `action_category = FIELD_CHANGE` 的日志记录写入明细表；每个变更字段对应一行。

| 字段名 | 中文名 | 分类 | 类型 | 必填 | 说明 |
|-------|-------|------|------|------|------|
| field_id | 明细 ID | 系统 | 整数 | 自动 | 主键，雪花 ID |
| log_id | 日志 ID | 系统 | 引用 | 是 | FK → style_change_log.log_id |
| field_name | 字段名 | 业务 | 短文本 | 是 | 技术字段名，如 season_name |
| field_label | 字段中文名 | 业务 | 短文本 | 是 | 展示用，如"销售季" |
| field_type | 字段展示类型 | 业务 | 枚举 | 是 | TEXT（文本）/ STATUS（状态）/ MEDIA（素材） |
| before_value | 变更前原始值 | 业务 | 短文本 | 否 | 原始存储值（用于程序逻辑），为空表示新增字段 |
| after_value | 变更后原始值 | 业务 | 短文本 | 否 | 变更后存储值，为空表示字段被清除 |
| before_display | 变更前展示值 | 业务 | 短文本 | 否 | 用于页面展示的可读值，如枚举的中文名 |
| after_display | 变更后展示值 | 业务 | 短文本 | 否 | 用于页面展示的可读值 |

---

### 5.4 素材变更记录规范

> 素材变更（`action_category = MEDIA_CHANGE`）不写入 `style_change_log_field` 明细表，而是在 `style_change_log` 的 `event_detail` JSON 字段中存储以下结构：

```json
{
  "media_type": "MARKETING_PIC",
  "before": [
    { "file_id": "oss://...", "thumbnail_url": "https://...", "file_name": "marketing_01.jpg" }
  ],
  "after": [
    { "file_id": "oss://...", "thumbnail_url": "https://...", "file_name": "marketing_02.jpg" }
  ]
}
```

- `before` 为空数组表示新增素材；`after` 为空数组表示删除素材
- 视频类型额外记录 `cover_url`（封面帧）代替缩略图

---

## 6. 日志中心页（全局审计入口）

### 页面说明

独立页面，路径为设计中心 → 日志中心。展示全部款式/SKC 的变更日志，支持多维筛选，面向管理层和运营人员做操作审计。

### 筛选条件

| 筛选项 | 类型 | 说明 |
|-------|------|------|
| 款式编号/名称 | 文本搜索 | 模糊匹配 style_code、entity_code |
| 实体类型 | 单选 | 全部 / SPU / SKC |
| 操作大类 | 多选 | 字段变更 / 素材变更 / 集成事件 |
| 操作类型 | 多选 | 根据操作大类联动展示枚举 |
| 操作人 | 下拉搜索 | 按操作人筛选 |
| 操作时间 | 日期范围 | 最大范围 90 天 |
| 品类 | 下拉 | 按 SPU 品类筛选 |

### 列表展示字段

| 列名 | 说明 |
|-----|------|
| 维度标签 | SPU / SKC 彩色标签 |
| 款式/SKC 编码 | 可点击跳转 SKC 详情页 |
| 操作时间 | `operated_at`，精确到分钟 |
| 操作人 | `operator_name`；系统自动操作显示"系统" |
| 操作内容 | `change_summary` 预览；集成事件显示事件标签（如"PLM推送"）+ 结果状态 |
| 操作 | 「查看详情」— 打开变更详情弹窗 |

- 默认排序：`operated_at` 降序
- 分页：每页 20 条

### 关键业务规则

- 列表数据按用户数据范围权限过滤（`SDP-SJZX-KSGL-QBFZ/QBZN/QBWD`）
- 操作类型下拉选项根据操作大类联动：选择"集成事件"后，操作类型只展示 PLM推送/推送上架/Agent任务/核价

### 异常处理

| 场景 | 处理方式 |
|-----|---------|
| 无数据 | 展示空状态插图 + "暂无日志记录"提示，不展示操作引导 |
| 查询超时（>10s） | 显示超时提示 + "重新查询"按钮 |
| 权限不足 | 页面显示无权限提示，不展示任何日志数据 |

---

## 7. 操作日志抽屉 / 变更日志 Tab

两个入口共用同一套数据和展示逻辑，差异仅在交互形式：
- **操作日志抽屉**：从款式管理列表点击「操作日志」触发，以抽屉形式呈现
- **变更日志 Tab**：嵌入 SKC 详情页，以 Tab 形式呈现

### 页面说明

展示当前 SKC 及其所属 SPU 的**合并变更日志**，按 `operated_at` 时间线降序排列，每条记录用「SPU」/「SKC」标签标注维度，面向设计师/跟单日常自查，无需切换即可看到该款式所有相关变动。

**查询逻辑**：返回满足以下任一条件的日志记录：
1. `entity_type = SKC` AND `entity_id = 当前 prototype_id`
2. `entity_type = SPU` AND `entity_id = 当前 SKC 所属 design_style_id`

### Tab 内筛选条件

| 筛选项 | 类型 | 说明 |
|-------|------|------|
| 操作大类 | 单选 Tab | 全部 / 字段变更 / 素材变更 / 集成事件 |
| 时间范围 | 日期范围 | 默认最近 30 天 |

### 列表展示字段

同日志中心页列表，去掉"款式/SKC 编码"列（当前上下文已明确），「维度标签」列保留（区分 SPU/SKC 记录）。

### 关键业务规则

- 合并展示当前 SKC 和所属 SPU 的日志，不支持跨 SKC 查询
- Tab / 抽屉入口复用款式管理模块的 `SDP-SJZX-KSGL-CKXQ` 权限

### 异常处理

| 场景 | 处理方式 |
|-----|---------|
| 无日志记录 | 展示"暂无变更记录"提示 |
| 加载失败 | 展示加载失败提示 + "重试"按钮，不影响详情页其他 Tab |

---

## 8. 变更详情弹窗

### 页面说明

点击列表中「查看详情」后弹出，展示单条日志的完整变更内容。

### 展示规则

**字段变更（FIELD_CHANGE）**

- 展示方式：表格形式，每行一个变更字段
- 列：字段名 | 变更前 | 变更后
- 状态字段（field_type = STATUS）：前后值用颜色区分（红色→绿色或反之）
- 若变更前为空：显示"—"（表示新增字段值）
- 若变更后为空：显示"—"（表示字段被清除）

**素材变更（MEDIA_CHANGE）**

- 图片：左右分栏，左侧"变更前"展示旧图缩略图列表，右侧"变更后"展示新图缩略图列表
- 视频：展示封面帧 + 文件名；无封面时显示视频图标占位
- 新增素材：左侧显示"—"；删除素材：右侧显示"—"

**集成事件（INTEGRATION_EVENT）**

- 展示事件类型、结果状态（成功/失败/处理中）、事件时间
- 失败时展示 `event_message` 原因说明

### 示例

**示例1：编辑 SPU 基本信息（SPU_EDIT）**

日志主记录：

| 字段 | 值 |
|-----|---|
| entity_type | SPU |
| action_type | SPU_EDIT |
| operator_name | 王小明 |
| operated_at | 2026-06-28 14:32 |
| change_summary | 修改了 销售季、款式等级 |
| changed_field_count | 2 |

字段变更明细（style_change_log_field）：

| field_label | field_type | before_display | after_display |
|------------|-----------|---------------|--------------|
| 销售季 | TEXT | 2024春夏 | 2024秋冬 |
| 款式等级 | TEXT | A级 | S级 |

页面渲染效果（变更详情弹窗中的表格）：

| 字段 | 变更前 | 变更后 |
|-----|-------|-------|
| 销售季 | 2024春夏 | 2024秋冬 |
| 款式等级 | A级 | S级 |

---

**示例2：SKC 状态流转（PLM_PUSH 失败）**

日志主记录：

| 字段 | 值 |
|-----|---|
| entity_type | SKC |
| action_type | PLM_PUSH |
| action_category | INTEGRATION_EVENT |
| operator_name | 李设计 |
| operated_at | 2026-06-27 09:15 |
| change_summary | PLM推送失败 |
| event_result | FAILED |
| event_message | PLM系统返回：BOM资料不完整，缺少面料成分 |

页面渲染效果（集成事件详情）：

```
事件类型：推送 PLM
结果：❌ 失败
时间：2026-06-27 09:15
原因：PLM系统返回：BOM资料不完整，缺少面料成分
```

---

**示例3：营销图替换（MEDIA_MARKETING_PIC）**

日志主记录：

| 字段 | 值 |
|-----|---|
| entity_type | SKC |
| action_type | MEDIA_MARKETING_PIC |
| action_category | MEDIA_CHANGE |
| operator_name | 张跟单 |
| operated_at | 2026-06-26 16:45 |
| change_summary | 替换了营销图（2张→3张） |
| event_detail | 见下方 JSON |

event_detail 存储内容：

```json
{
  "media_type": "MARKETING_PIC",
  "before": [
    { "file_id": "oss://...", "thumbnail_url": "https://cdn.../a1_thumb.jpg", "file_name": "marketing_01.jpg" },
    { "file_id": "oss://...", "thumbnail_url": "https://cdn.../a2_thumb.jpg", "file_name": "marketing_02.jpg" }
  ],
  "after": [
    { "file_id": "oss://...", "thumbnail_url": "https://cdn.../b1_thumb.jpg", "file_name": "new_01.jpg" },
    { "file_id": "oss://...", "thumbnail_url": "https://cdn.../b2_thumb.jpg", "file_name": "new_02.jpg" },
    { "file_id": "oss://...", "thumbnail_url": "https://cdn.../b3_thumb.jpg", "file_name": "new_03.jpg" }
  ]
}
```

页面渲染效果（左右分栏对比）：

```
变更前（2张）          变更后（3张）
[缩略图 a1]           [缩略图 b1]
[缩略图 a2]           [缩略图 b2]
                      [缩略图 b3]
```

### 异常处理

| 场景 | 处理方式 |
|-----|---------|
| 详情加载失败 | 弹窗内展示"加载失败，请重试" + 重试按钮 |
| 素材缩略图加载失败 | 图片位置展示灰色占位图 + 文件名文字 |

---

## 更新记录

| 变更时间 | 变更版本 | 变更类型 | 变更内容 | 涉及章节 |
|---------|---------|---------|---------|---------|
| 2026-06-29 | v1.0.0 | 新增 | 款式日志中心模块初始版本，支持 SPU/SKC 字段级变更追踪、素材前后对比、集成事件记录；提供独立日志中心页和详情页内嵌 Tab 两级入口 | 全部 |