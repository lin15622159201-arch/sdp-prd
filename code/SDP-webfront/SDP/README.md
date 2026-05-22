# fashion-design

## 项目结构

src
- api 全局API，例如openAPI之类的
- assets 资源
- components 全局组件
- constant 全局常量或者枚举
- core 核心层 例如网络，桥
- hooks 全局hooks
- layouts 全局布局
- modules 业务模块
    - order-manage 根据菜单一级命名
        - router.ts 模块路由
        - after-sale 根据菜单二级命名
            - api 该模块相关接口定义
            - components 业务组件
            - constant 业务枚举等常量定义
            - store 业务模块的状态管理
            - use-permission-config.ts 权限控制
            - views 业务页面
                - add 对应最终级页面
                - list 对应最终级页面
                - detail 对应最终级页面
                    - hooks 页面逻辑拆分
                    - components 页面逻辑拆分组件，一般不具备复用性
                        - 组件名为目录
                            - index.vue
                            - type.ts
                    - index.vue 页面首页
                    - types.ts 页面类型定义

## 路由配置

### 示例
```js
{
  path: '/url',
  name: 'Url',
  component: () => import('@/views/*.vue'),
  meta: {
    auth: true,
    activeMenu: '',
  }
}
```
### 配置说明
- path: 路径
- name: 路由名称, 
- component: 页面组件路径
- meta: 路由元信息
  - auth: 是否需要验证登录. 默认 false
  - activeMenu: 侧边导航高亮显示的路径
  - activeTab: tab栏关联routeName 影响tab的文案 优先级activeTab > activeMenu > routeName
  - title: 页面标题(推荐设置)作用于面包屑
  - breadcrumb: 是否在面包屑中显示. 默认是 true
  - isKeepAlive: 是否缓存路由 默认是 true

## 工具类使用说明

### 全局函数
- $filters
    - 获取枚举标签 getEnumLabel
    - 时间格式化 formatTime
    - 金额格式化 toThousands
- $has 根据用户权限判断是否渲染
```jsx
    /* 
     * this指的是vue实例
     * 详情src/core/plugins/filters.ts
     */
    // jsx render写法
    this.$filters.getEnumLabel(list, val);
    this.$filters.formatTime(date);
    this.$filters.toThousands(num);
    this.$has(按钮code值)&&<div/>
    // 模板写法
    {{$filters.getEnumLabel(list, val)}}
```

### 其他工具类
- 优先使用@toy/utils，包含校验规则、日期格式化、数值格式化等
- 全局hooks
    - useList 列表工具钩子
        - 示例
            ```jsx
            const {
                params, // 请求参数
                tableTotal, // 数据总条数
                tableData, // 请求返回的列表数据
                tableLoading, // 是否正在请求中
                handleSearch, // 触发请求
                handleReset, // 重置参数
                handleSizeChange, // 切换pageSize
                handleCurrentChange, // 切换pageNum
            } = useList<接口Response声明, 接口Request声明>({
                request: {
                    // 分页参数对应的key值 默认值：pageNum
                    pageNumKey: 'pageNum',
                    // 分页参数对应的key值 默认值：pageSize
                    pageSizeKey: 'pageSize',
                    // 获取数据后的列表数据的索引 默认值：data.list
                    tableDataKey: 'data.list',
                    // 获取数据后的总条数的索引 默认值：data.total
                    totalKey: 'data.total',
                    api: 接口方法,
                    params: {
                        supplierCode: '',
                        pageNum: 1,
                        pageSize: 10,
                    },
                    handleParams(paramsObj) {
                        return {
                            ...paramsObj,
                            state: currentState.value, // 请求携带额外的参数
                        };
                    },
                },
            });
            ```
    - useDictionary 获取数据字典
        - 示例
        ```jsx
            import { useDictionary } from '@/hooks/use-dictionary';
            import {
                // 自定义数据字典枚举值，如果使用到需要去store里面去处理对应逻辑
                CUSTOM_DICTIONARY_KEY,
                // 数据字典枚举值 使用到的数据字典需要在枚举内定义
                DICTIONARY_KEY,
            } from '@/constant/dictionary';
            setup(){
                const {
                    getDictionaryOptions,
                } = useDictionary();
                // 获取数据字典
                const BANK_CARD_TYPE_OPTIONS = computed(() => getDictionaryOptions(DICTIONARY_KEY.PIMS_BANK_CARD_TYPE));
            }
        ```
    - useKeepAlive 清除keep组件缓存
        - 示例
        ```jsx
            import { useKeepAlive } from '@toy/business-components';
            setup(){
                const { removeCurRouteCache, removeTargetCache } = useKeepAlive();
                // removeCurRouteCache() 清除当前路由缓存
                // removeTargetCache(routeName) 清除目标路由缓存
            }
        ```
## 权限配置
[权限资源配置表](https://zhijing19.feishu.cn/sheets/EPRnsfHKehrUyPthmT7cQPa7nKd)
### 示例
```js
import { computed } from 'vue';
import { has } from '@/core/plugins/filter';

export const usePermissionConfig = () => {
  const codeMap = {
    'CCS-KHGL-KHGJ-ZYKH': 'CCS-KHGL-KHGJ-ZYKH',
  };
  return {
    /*
    * 转移客户
    * 控制：客户管理-客户跟进-转移客户
    * 跳转路由名称：
    * */
    CAN_CREATE: computed(() => has(codeMap['CCS-KHGL-KHGJ-ZYKH'])),
  };
};
```
## 其他说明

### iframe对接

- SSO新增菜单 前端路径为Webview?path=${对应页面的hash} 前端路径为Webview?path=/#/workGroup/index

### 依赖文档地址

- [BusinessComponents](https://toy-monorepo.textile-story.com/businesscomponents/)
- [ToyUtils](https://toy-monorepo.textile-story.com/utils/)
- [ToyUse](https://toy-monorepo.textile-story.com/vuse/)
