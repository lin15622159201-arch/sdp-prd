<script lang="tsx">
import type { PropType } from 'vue';
import { defineComponent, computed, onMounted, nextTick, h } from 'vue';
import CustomTooltip from './tooltip.vue';

import { filters } from '@/core/plugins/filter';
import logger from '../utils/logger';

import type { IColumnProp, IImageConfig, TRender, Pagination } from '../types';

interface IImageViewer {
  view: (i?: number) => void;
}

export default defineComponent({
  name: 'CustomTableColumn',
  components: {
    CustomTooltip,
  },
  props: {
    columnItem: {
      type: Object as PropType<IColumnProp>,
      default: () => ({}),
    },
    /**
     * 是否使用 序号累计（分页时序号为累加状态）
     */
    pagination: {
      type: Object as PropType<Pagination>,
    },
    /**
     * 是否使用表单验证
     */
    useFormValidation: {
      type: Boolean,
      default: false,
    },
    uuidList: {
      type: Array as PropType<Record<string, string>[]>,
      default: () => [],
    },
  },
  setup(props) {
    const checkedAccumulation = () => {
      nextTick(() => {
        const { pagination, columnItem } = props;

        if (
          columnItem.accumulation
            && columnItem.type === 'index'
            && (!pagination || !pagination?.pageNum || !pagination?.pageSize)
        ) {
          logger.warn('是否使用 序号累计 功能，但是[pagination]有误：', pagination);
        }
      });
    };

    onMounted(() => {
      if (process.env.NODE_ENV === 'development') {
        checkedAccumulation();
      }
    });
  },
  render() {
    const { columnItem } = this.$props;

    const hasIndexAccumulation = computed(() => {
      return !!(this.pagination?.pageNum
        && this.pagination?.pageSize
        && columnItem.accumulation
        && columnItem.type === 'index');
    });

    // 获取selectable
    const getSelectable = (row: any) => {
      if (row.selectable) {
        return (_row: any, index: number) => row.selectable(_row, index);
      }
      return null;
    };

    const imageRender = (item: IColumnProp, row: any) => {
      const _imageConfig = (item.imageConfig || {}) as IImageConfig;
      const imageList: string[] = (() => {
        const val = row[item.prop!];

        if (typeof val === 'string') {
          return val.split(',').filter(Boolean);
        }

        if (Array.isArray(val)) {
          return val.map((item2) => {
            if (typeof item2 === 'string') {
              return item2;
            }
            return item2?.[_imageConfig.propKey! || 'url'] ?? '';
          }).filter(Boolean);
        }

        return [val?.[_imageConfig.propKey! || ''] ?? ''].filter(Boolean);
      })();

      if (!imageList.length) return '-';

      return (
        <image-viewer
          list={imageList}
          v-slots={{
            default: (_row: IImageViewer) => {
              return (
                imageList.slice(0, _imageConfig.showNum || 1).map((url, i) => {
                  return (
                    <el-image
                      lazy={false}
                      {..._imageConfig}
                      class='img-thumbnail__table'
                      src={this.$filters.ossUrl(url, 80)}
                      fit='cover'
                      onClick={() => _row.view(i)}
                    />
                  );
                })
              );
            },
          }}
        />
      );
    };

    const getShowOverflowTooltip = (item: IColumnProp): boolean | void => {
      return item.showOverflowTooltip || item['show-overflow-tooltip'];
    };

    const getSlots = (item: IColumnProp) => {
      const hasRules = this.useFormValidation && !(item.children?.length || !item.prop || !item.rules);

      const formItemRender = (index: number, render: () => any) => {
        if (!hasRules) {
          return render();
        }

        const formItemProp = Object.create(null);

        if (this.useFormValidation) {
          const field = `data[${index}].${item.prop as string}`;

          formItemProp.rules = item.rules;
          formItemProp.field = field;
          formItemProp.prop = field;
        }
        const uuidData = this.uuidList[index];

        return (
          <el-form-item
            {
              ...formItemProp
            }
            key={item.prop && uuidData && uuidData[item.prop]}
            class='column-form-item__mini'
          >
            {
              render()
            }
          </el-form-item>
        );
      };

      return {
        header: (() => {
          if ((item.headerRender && typeof item.headerRender === 'function')) {
            const headerRender = item!.headerRender as TRender;

            return (scoped: any) => headerRender({
              row: scoped.row,
              index: scoped.$index,
              column: { ...item },
            });
          }

          if (hasRules) {
            const isRequired = (() => {
              if (Array.isArray(item.rules)) {
                return item.rules.some(_i => _i.required);
              }
              return !!item.rules?.required;
            })();

            return () => h('div', {
              class: {
                required: isRequired && this.useFormValidation,
              },
            }, item.label);
          }
          return undefined;
        })(),
        default: (!item.type || item.type === 'expand') || hasIndexAccumulation.value
          ? ({ row, $index }: any) => {
            return formItemRender($index, () => {
              const showOverflowTooltip = getShowOverflowTooltip(item);
              const _rendCtx = () => {
                if (item.render) {
                  return item.render({
                    row,
                    index: $index,
                    column: { ...item },
                  });
                }

                if (item?.children) {
                  // eslint-disable-next-line no-use-before-define
                  return item!.children.map(it => columnRender(it));
                }

                if (item.slotKey && this.$slots[item.slotKey]) {
                  const slotKey = item.slotKey as string;
                  return this.$slots[slotKey]?.({
                    row,
                    $index,
                    index: $index,
                    column: { ...item },
                    value: row[item.prop!],
                    propKey: item.prop,
                  });
                }

                if (item.imageConfig) {
                  return imageRender(item, row);
                }

                if (item.enum) {
                  return filters.getEnumLabel(item.enum, row[item.prop!]) || '-';
                }

                if (item.isTime) {
                  const fmt = typeof item.isTime === 'string'
                    ? item.isTime
                    : undefined;
                  return filters.formatTime(row[item.prop!], fmt) || '-';
                }
                const _res = row[item.prop!];
                return !_res && _res !== 0 ? '-' : _res;
              };

              if (hasIndexAccumulation.value) {
                const { pageNum, pageSize } = this.pagination || {};
                return (pageNum! - 1) * pageSize! + ($index + 1);
              }

              if (showOverflowTooltip) {
                return (
                  <custom-tooltip
                    v-slots={{
                      default: () => {
                        return _rendCtx();
                      },
                    }}
                    effect={item.tooltipEffect || item['tooltip-effect']}
                    placement={item.filterPlacement || item['filter-placement']}
                  />
                );
              }
              return _rendCtx();
            });
          }
          : undefined,
      };
    };

    function columnRender(_columnItem: IColumnProp) {
      const _columnItemOpts = { ..._columnItem };
      delete _columnItemOpts.children;

      return (
        <el-table-column
          {
            ..._columnItemOpts
          }
          label={_columnItem.label || ''}
          prop={_columnItem.prop}
          width={_columnItem.width}
          fixed={_columnItem.fixed}
          minWidth={_columnItem.minWidth}
          type={hasIndexAccumulation.value ? undefined : _columnItem.type}
          reserveSelection={_columnItem.reserveSelection}
          selectable={getSelectable(_columnItem)}
          v-slots={getSlots(_columnItem)}
          showOverflowTooltip={false}
        />
      );
    }

    return columnRender(columnItem);
  },
});
</script>

<style lang="scss" scoped>
.column-form-item {
  &__mini {
    margin-top: 18px;
  }
}
</style>
