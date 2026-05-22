<script lang="tsx">
import { computed, defineComponent, PropType, ref, watch } from 'vue';
import { ILeftMenuTreeItem } from './type';

export default defineComponent({
  emits: ['change-menu', 'update:active-menu'],
  name: 'LeftMenuTree',
  components: {
    //
  },
  props: {
    /** 宽度 */
    width: {
      type: String,
      default: '180px',
    },
    /** 导航列表 */
    list: {
      type: Array as PropType<ILeftMenuTreeItem[]>,
      default: () => [],
    },
    /** 激活菜单 */
    activeMenu: {
      type: String,
      default: '',
    },
    /** 是否展示菜单上的数量，默认展示 */
    isShowCount: {
      type: Boolean,
      default: true,
    }
  },

  setup(props, { emit }) {
    const activeMenu_ = computed({
      get() {
        return props.activeMenu;
      },
      set(val) {
        emit('update:active-menu', val);
      }
    });

    const handleSelectedMenuItem = (key: string) => {
      activeMenu_.value = key;
      emit('change-menu', key);
    };

    // 默认全部展开
    const defaultOpeneds = ref<string[]>([]);
    watch(() => props.list, () => {
      defaultOpeneds.value = [];

      (function deepMap(list: ILeftMenuTreeItem[]) {
        list.forEach((item) => {
          const { resourceUrl, childList } = item;

          if (resourceUrl && !defaultOpeneds.value.includes(resourceUrl)) {
            defaultOpeneds.value.push(resourceUrl);
          }

          if (childList?.length) {
            deepMap(childList);
          }
        });
      }(props.list));
    }, {
      immediate: true,
    });

    return {
      activeMenu_,
      defaultOpeneds,
      handleSelectedMenuItem,
    };
  },
  render() {
    const getCount = (count?: string | number, isCount: boolean = true) => {
      const defaultCount = isCount ? '（0）' : '';
      return count ? `（${count}）` : defaultCount;
    };
    const MenuItemRender = (item: ILeftMenuTreeItem) => {
      return (
        <el-menu-item
          index={item.resourceUrl}
          v-slots={{
            title() {
              return item.resourceName + getCount(item.count, item.isCount);
            },
          }}
        />
      );
    };
    const subMenuRender = (item: ILeftMenuTreeItem) => {
      if (!item.childList || item.childList.length === 0) return MenuItemRender(item);

      return (
        <el-sub-menu
          index={item.resourceUrl}
          key={item.resourceUrl}
          v-slots={{
            title() {
              return (
                <span>
                  {item.resourceName + getCount(item.count)}
                </span>
              );
            },
            default() {
              return item.childList!.map(subMenuRender);
            },
          }}
        />
      );
    };
    return (
      <el-aside width={this.width} class='tw-h-full menu-tree-wrapper'>
        <el-scrollbar>
          <el-menu
            class='app-child-menu'
            default-active={this.activeMenu_}
            default-openeds={this.defaultOpeneds}
            onSelect={this.handleSelectedMenuItem}
          >
            {
              this.$props.list.map(subMenuRender)
            }
          </el-menu>
        </el-scrollbar>
      </el-aside>
    );
  }
});
</script>

<style lang="scss" scoped>
 .menu-tree-wrapper {
    padding: 5px;
    overflow-x: hidden;
    box-shadow: 6px 0 6px rgba(0, 21, 41, 0.15);
    background-color: #fff;
    border-top-left-radius: 4px;
    border-bottom-left-radius: 4px;
    margin-right: 10px;
    .app-child-menu {
      border: 0;
      :deep(.el-menu-item), :deep(.el-sub-menu__title), :deep(.el-menu-item-group__title) {
        height: 30px;
        line-height: 30px;
        font-size: 12px;
        color: #333;
        margin-bottom: 0;
        // padding: 0 5px !important;
        &:hover {
        // background: #fff;
        // color: #409eff;
        i {
            // color: #409eff;
          }
        }
      }
      // :deep(.is-active) {
      //   color: var(--el-color-primary) !important;
      // }
    }
    :deep(.el-menu--vertical .el-menu-item.is-active) {
      color: var(--el-color-primary);
    }
    :deep(.el-menu--vertical .el-sub-menu.is-active>.el-sub-menu__title) {
      color: #333 !important;
      font-weight: normal !important;
    }
    :deep(.el-menu--vertical) {
      padding: 0;
    }
  }
</style>
