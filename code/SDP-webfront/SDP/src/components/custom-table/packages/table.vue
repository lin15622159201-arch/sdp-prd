<script lang="tsx">
import type { PropType } from 'vue';
import { defineComponent, ref, toRef, computed, watch } from 'vue';
import type { ElTable, ElForm, FormValidateCallback } from 'element-plus';
import CustomTableColumn from './table-column.vue';
import useRowHidden from '../hooks/use-row-hidden';
import { useRowId } from '../hooks/use-row-id';

import type { IColumnProp, Pagination } from '../types';
import logger from '../utils/logger';

type FormInstance = InstanceType<typeof ElForm>;

export default defineComponent({
  name: 'CustomTable',
  components: {
    CustomTableColumn
  },
  props: {
    data: {
      type: Array as PropType<any[] /** 不知道数据的格式 */>,
      default: () => ([]),
    },
    tooltipEffect: {
      type: String,
      default: 'dark',
    },
    border: {
      type: Boolean,
      default: true,
    },
    highlightCurrentRow: {
      type: Boolean,
      default: false,
    },
    /**
     * 配置highlightCurrentRow时需要
     */
    idKey: String,
    column: {
      type: Array as PropType<IColumnProp[]>,
      default: () => [],
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
    formModelExtender: {
      type: Object,
      default: () => ({}),
    },
    // 选择拦截
    selectFilter: Function as PropType<(item: any) => Boolean>,
  },
  emits: ['current-change', 'selection-change'],
  setup(props, { emit }) {
    const cxTable = ref<InstanceType<typeof ElTable>>();
    const cxFormRef = ref<FormInstance>();
    const currentRow = ref<any /** 不知道数据的格式 */>(null);
    const currentId = ref<string | number>('');

    const handleCurrentChange = (row: any /** 不知道数据的格式 */) => {
      currentRow.value = row;
      currentId.value = row?.[props.idKey!] ?? '';
      emit('current-change', row);
    };

    const handleSelectionChange = (list: any[]) => {
      if (props.selectFilter) {
        const selectedList: any = [];
        list.forEach((item) => {
          if (props.selectFilter?.(item)) {
            selectedList.push(item);
          } else {
            cxTable.value!.toggleRowSelection(item, false);
          }
        });
        emit('selection-change', selectedList);
      } else {
        emit('selection-change', list);
      }
    };

    const {
      toggleRowHidden,
      getStatus,
    } = useRowHidden(toRef(props, 'column'));
    const { uuidList } = useRowId(props);

    const columns = computed(() => {
      return props.column.filter((item) => {
        return !(item.prop && getStatus(item.prop as string, item.hidden));
      });
    });

    const scrollIntoView = (field: string) => {
      (cxFormRef.value?.$el as HTMLElement)
        ?.querySelector(`[field="${field}"]`)
        ?.scrollIntoView({
          behavior: 'smooth',
          block: 'center',
          inline: 'center',
        });
    };

    /**
     * 表单验证
     * @param useScrollToField boolean
     * 是否定位到（第一个）错误的字段 [default false]
     * @param callback function
     */
    const validate = async (useScrollToField?: boolean, callback?: FormValidateCallback) => {
      if (!props.useFormValidation) {
        return true;
      }

      if (useScrollToField === true) {
        try {
          return await cxFormRef.value?.validate(callback);
        } catch (error) {
          const fieldObj = error as Record<string, IColumnProp['rules']>;
          const errId = Object.keys(fieldObj)[0];

          scrollIntoView(errId);

          return Promise.reject(error);
        }
      }
      return cxFormRef.value!.validate(callback);
    };

    const validateField: FormInstance['validateField'] = (...arg) => {
      if (!cxFormRef.value) {
        logger.warn('el-form 未使用，请检查 [useFormValidation] 是否设置为 true');
        return Promise.resolve(true);
      }
      return cxFormRef.value?.validateField(...arg);
    };

    const resetFields: FormInstance['resetFields'] = (...arg) => {
      if (!cxFormRef.value) {
        logger.warn('el-form 未使用，请检查 [useFormValidation] 是否设置为 true');
      }
      return cxFormRef.value?.resetFields(...arg);
    };

    const clearValidate: FormInstance['clearValidate'] = (...arg) => {
      if (!cxFormRef.value) {
        logger.warn('el-form 未使用，请检查 [useFormValidation] 是否设置为 true');
      }
      return cxFormRef.value?.clearValidate(...arg);
    };

    const formModel = computed(() => {
      if (props.useFormValidation) {
        return {
          data: props.data,
          ...props.formModelExtender,
        };
      }
      return undefined;
    });

    watch(() => props.useFormValidation, (val) => {
      if (!val) {
        resetFields();
      }
    });

    return {
      uuidList,
      formModel,
      columns,
      toggleRowHidden,
      getStatus,
      cxTable,
      cxFormRef,
      currentId,
      currentRow,
      handleCurrentChange,
      handleSelectionChange,
      setCurrentRow(row: any) {
        cxTable.value!.setCurrentRow(row);
      },
      toggleRowSelection(row: any, selected: boolean) {
        cxTable.value!.toggleRowSelection(row, selected);
      },
      clearSelection() {
        cxTable.value!.clearSelection();
      },
      // form表单方法
      validate,
      validateField,
      resetFields,
      clearValidate,
    };
  },
  render() {
    const radioRender = () => {
      if (!this.$props.highlightCurrentRow || !this.$props.idKey) return null;

      return (
        <el-table-column
          width='35'
          align='center'
          v-slots={{
            default: ({ row }: any) => {
              return (
                <el-radio
                  v-model={this.currentId}
                  label={row[this.$props.idKey as string]}
                >
                  &nbsp;
                </el-radio>
              );
            },
          }}
        />
      );
    };

    const setTableProps = () => {
      const _props = Object.assign({}, this.$props, this.$attrs);

      Reflect.deleteProperty(_props, 'column');
      Reflect.deleteProperty(_props, 'formmodelextender');
      return _props;
    };

    const tableRender = () => {
      return (
        <el-table
          ref='cxTable'
          {
            ...setTableProps()
          }
          onCurrentChange={this.handleCurrentChange}
          onSelectionChange={this.handleSelectionChange}
        >
          {
            radioRender()
          }
          {
            this.$slots.default
              ? this.$slots.default()
              : this.columns.map((item) => {
                // if (item.prop && this.getStatus(item.prop, item.hidden)) return null;

                return (
                  <custom-table-column
                    key={item.prop || item.slotKey || item.rowKey}
                    column-item={item}
                    uuidList={this.uuidList}
                    pagination={this.pagination}
                    useFormValidation={this.useFormValidation}
                    v-slots={this.$slots}
                  />
                );
              })
          }
        </el-table>
      );
    };

    const formRender = () => {
      if (!this.useFormValidation) {
        return tableRender();
      }

      return (
        <el-form model={this.formModel} ref='cxFormRef'>
          {
            tableRender()
          }
        </el-form>
      );
    };

    return formRender();
  },
});
</script>
