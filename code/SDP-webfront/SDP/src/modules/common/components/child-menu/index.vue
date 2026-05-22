<script lang="tsx">
import type { PropType } from 'vue';
import { defineComponent, ref, computed, watch } from 'vue';
import { IMathMenuItem, TRenderFunc } from './types';
import { useRoute, useRouter } from 'vue-router';

const getResourceUrlByComponentName = (
  componentName: string,
  menus: IMathMenuItem[]
): string | null => {
  const findUrl = (menuList: IMathMenuItem[]): string | null => {
    return menuList.reduce<string | null>((acc: any, menu: IMathMenuItem) => {
      if (acc) return acc; // 如果已经找到，直接返回
      if (menu.componentName === componentName) return menu.resourceUrl;
      if (menu.childList) return findUrl(menu.childList); // 递归查找子菜单
      return null;
    }, null);
  };

  return findUrl(menus);
};

export default defineComponent({
  name: 'ChildMenu',
  props: {
    list: {
      type: Array as PropType<IMathMenuItem[]>,
      default: () => ([]),
    },
  },
  setup(props) {
    const currentRouter = useRoute();
    const router = useRouter();
    // 默认全部展开
    const defaultOpeneds = ref<string[]>([]);

    const activeMenu = computed(() => {
      const componentName = currentRouter.query.componentName as string;
      return getResourceUrlByComponentName(componentName, props.list);
    });
    props.list.forEach((item) => { item.resourceUrl = item.resourceUrl?.toLowerCase(); });

    watch(() => props.list, () => {
      defaultOpeneds.value = [];

      (function deepMap(list: IMathMenuItem[]) {
        list.forEach((item) => {
          const { resourceUrl, childList, groups } = item;

          if (resourceUrl && !defaultOpeneds.value.includes(resourceUrl)) {
            defaultOpeneds.value.push(resourceUrl);
          }

          if (childList?.length) {
            deepMap(childList);
          }
          if (groups?.length) {
            groups.forEach((groupsItem) => {
              if (groupsItem.childList?.length) {
                deepMap(groupsItem.childList);
              }
            });
          }
        });
      }(props.list));
    }, {
      immediate: true,
    });

    return {
      defaultOpeneds,
      activeMenu,
      router,
    };
  },
  render() {
    const MenuItemWrapper = (item: IMathMenuItem, renderFunc: TRenderFunc) => {
      // if (item.resourceUrl) {
      //   return (
      //     <el-link to={item.resourceUrl}>
      //       {renderFunc()}
      //     </el-link>
      //   );
      // }
      return (
        <div>{renderFunc()}</div>
      );
    };

    const getCount = (count?: string | number, isCount: boolean = true) => {
      const defaultCount = isCount ? '（0）' : '';
      return count ? `（${count}）` : defaultCount;
    };

    const MenuItemRender = (item: IMathMenuItem) => {
      return MenuItemWrapper(item, () => {
        return (
          <el-menu-item
            index={item.resourceUrl}
            v-slots={{
              title() {
                return item.resourceName + getCount(item.count, item.isCount);
              },
            }}
            onClick={() => {
              if (item.componentName) {
                this.router.replace({
                  query: {
                    componentName: item.componentName, // 更新路由参数
                  },
                });
              }
            }}
          />
        );
      });
    };

    const subMenuRender = (item: IMathMenuItem) => {
      if (!item.childList?.length && !item.groups) return MenuItemRender(item);
      return (
        <el-sub-menu
          index={item.resourceUrl}
          key={item.resourceUrl}
          v-slots={{
            title() {
              return (
                <span>
                  {item.resourceName}
                  {getCount(item.count)}
                </span>
              );
            },
            default() {
              if (Array.isArray(item.groups)) {
                return (
                  item.groups!.map((group) => {
                    return (
                      <el-menu-item-group
                        key={group.name}
                        v-slots={{
                          title() {
                            return group?.name;
                          },
                          default() {
                            return (group?.childList || []).map(subMenuRender);
                          }
                        }}
                      />
                    );
                  })
                );
              }
              return (
                item.childList!.map(subMenuRender)
              );
            },
          }}
        />
      );
    };
    return (
      <el-menu
        class='app-child-menu'
        default-active={this.activeMenu}
        default-openeds={this.defaultOpeneds}
        size='small'
      >
        {
          this.$props.list.map(subMenuRender)
        }
      </el-menu>
    );
  }
});
</script>

<style scoped lang="scss">
.app-child-menu {
  --el-menu-item-height: 34px!important;

  padding: 0;
  border: 0;
  :deep(.el-menu) {
    --el-menu-level-padding: 20px;
  }
  :deep(.el-menu-item) {
    --el-menu-item-height: 34px;

    margin-bottom: 0;
  }
  :deep(.el-sub-menu__title) {
    --el-menu-item-height: 34px;

    margin-bottom: 0;
  }

}
</style>
