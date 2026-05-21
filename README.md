# SDP v2.0 系统功能文档

> 自动生成于 2026-05-08，共 61 个原型页面，8 个功能模块

## 模块导航

| 模块 | 文档 | 页面数 |
|------|------|--------|
| 选款中心 | [modules/product-selection.md](modules/product-selection.md) | 8 |
| 设计任务管理 | [modules/design-task.md](modules/design-task.md) | 6 |
| 款式管理 | [modules/style-management.md](modules/style-management.md) | 11 |
| 图片更新任务 | [modules/image-update.md](modules/image-update.md) | 8 |
| 现货管理 | [modules/spot-goods.md](modules/spot-goods.md) | 4 |
| Temu商品管理 | [modules/temu-product.md](modules/temu-product.md) | 16 |
| 尺码表管理 | [modules/size-chart.md](modules/size-chart.md) | 2 |
| 基础配置 | [modules/basic-config.md](modules/basic-config.md) | 6 |

## 文档结构

```
prd-output/
├── .meta/
│   ├── manifest.json       # 模块清单与依赖矩阵
│   ├── glossary.yml        # 统一术语表
│   └── template-module.md  # 标准模块模板
├── modules/               # 核心模块文档
├── cross-cutting/         # 跨模块关注点
├── revisions/             # 修订记录
└── README.md              # 本文件
```

## 使用说明

1. 每个模块文档包含 YAML Frontmatter + Markdown 正文
2. `depends_on` 声明模块间硬/软依赖关系
3. `exposed_api` 声明本模块提供的功能接口
4. 修改模块时，在 `revisions/` 目录下记录变更