# v2.8.2 变更模块清单

| 序号 | 模块名称 | module_id | 变更类型 | 基线版本 | 目标版本 |
|------|---------|-----------|---------|---------|---------|
| 1 | 图片更新任务 | image-update | 功能优化 | v2.7.1 | v2.8.2 |
| 2 | 款式管理 | style-management | 实体新增 + 页面调整 | v2.8.1 | v2.8.2 |

> 需求8（营销图店铺维度多组）：
> - image-update：新增目标店铺字段，审核权限改为仅创建人，图片写入逻辑分支（有店铺→skc_store_material，无店铺→prototype_material）
> - style-management：新增 skc_store_material 实体（唯一索引 prototype_id+store_id），SKC详情页营销图改为多组列表展示
