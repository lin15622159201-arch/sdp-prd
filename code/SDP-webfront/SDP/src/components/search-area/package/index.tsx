import {
  onUnmounted,
  defineComponent,
  PropType,
  ref,
  provide,
  withKeys,
  nextTick,
  onBeforeUpdate,
  watch,
  onMounted
} from 'vue';
import { IConfigItem } from './types';
import keySelectSearch from '../../key-select-search/index.vue';
import styles from './style.module.scss';
import { ArrowDown, ArrowUp } from '@element-plus/icons-vue';
import { ColProps } from 'element-plus';

export default defineComponent({
  name: 'SearchArea',
  emits: ['handleSearch', 'update:modelValue', 'handleReset'],
  components: {
    ArrowDown,
    ArrowUp,
    keySelectSearch,
  },

  props: {
    cols: {
      type: Object as PropType<Partial<ColProps>>,
      default: () => ({}),
    },
    // 传入的配置项
    config: {
      type: Array as PropType<IConfigItem[]>,
      required: true,
    },

    // 传入的v-model值
    modelValue: {
      type: Object,
      required: true,
    },

    // // 默认显示的数量
    // showLength: {
    //   type: Number,
    //   default: 3,
    // },
    // 默认显示的数量
    labelWidth: {
      type: String,
      default: '96px',
    }
  },

  setup(props, { emit }) {
    // 标记
    provide<boolean>('searchMenu', true);
    // 控制展开收起
    const isOpen = ref(false);
    // 存放日期(可能有多个，保证每个都是唯一)
    const timeRange = ref<{
      [key: string]: string[];
    }>({});
    const showLength = ref(3);

    const $ResizeHandler = () => {
      if (!document.hidden) {
        const width = document.body.offsetWidth;
        if (width < 1200) {
          showLength.value = 2;
        } else if (width < 1920) {
          showLength.value = 3;
        } else {
          showLength.value = 4;
        }
      }
    };

    onMounted(() => {
      window.addEventListener('resize', $ResizeHandler);
      $ResizeHandler();
    });

    onUnmounted(() => {
      window.removeEventListener('resize', $ResizeHandler);
    });
    const setDateRange = () => {
      props.config.forEach((item) => {
        if (item.component === 'datePicker') {
          let range: string[] = [];
          if (props.modelValue[(item?.valueName as string[])?.[0] ?? '']) {
            range = [
              props.modelValue[(item?.valueName as string[])?.[0] ?? ''],
              props.modelValue[(item?.valueName as string[])?.[1] ?? '']
            ];
          }
          timeRange.value[(item?.valueName as string[])?.[0] ?? ''] = range;
        }
      });
    };

    watch(
      () => props.modelValue,
      () => {
        setDateRange();
      },
      {
        deep: true,
        immediate: true,
      },
    );

    // 点击展开/收起
    const handleOpenRetract = () => {
      const resizeEvent = new Event('resize');
      window.dispatchEvent(resizeEvent);
      isOpen.value = !isOpen.value;
    };
    // 更新值
    const updateValue = (value: string | string[], item: IConfigItem) => {
      if (['input', 'select', 'inputNumber'].includes(item.component!)) {
        emit('update:modelValue', {
          ...props.modelValue,
          [item.valueName as string]: value,
        });
      } else if (item.component === 'datePicker') {
        emit('update:modelValue', {
          ...props.modelValue,
          [(item.valueName as string[])?.[0]]: value?.[0] ?? '',
          [(item.valueName as string[])?.[1]]: value?.[1] ?? '',
        });
      }
    };
    // const keySelectSearchRef = ref<InstanceType<typeof keySelectSearch> | null>(null);
    const keySelectSearchRefs = ref<(InstanceType<typeof keySelectSearch> | null)[]>([]);
    const setItemRef = (el: InstanceType<typeof keySelectSearch> | null) => {
      keySelectSearchRefs.value.push(el);
    };
    const handleReset = async () => {
      // 重置日期
      Object.keys(timeRange.value).forEach((key) => {
        timeRange.value[key] = [];
      });
      keySelectSearchRefs.value?.forEach((each) => {
        each?.reset();
      });
      // keySelectSearchRef.value?.reset();
      await nextTick(); // 需要等到keySelectSearch的emit执行完
      emit('handleReset');
    };
    onBeforeUpdate(() => {
      keySelectSearchRefs.value = [];
    });
    return {
      showLength,
      isOpen,
      defaultTime: [new Date(2000, 1, 1, 0, 0, 0), new Date(2000, 2, 1, 23, 59, 59)],

      timeRange,
      handleReset,
      handleOpenRetract,
      updateValue,
      setItemRef,
    };
  },
  render() {
    const renderInput = (item: IConfigItem) => {
      return item.component === 'input' ? (
        <el-input
          placeholder='请输入'
          {...item}
          clearable={item.clearable ?? true}
          v-model={this.modelValue[item.valueName as string]}
          onInput={(value: string) => {
            const _value = value.trim();
            this.updateValue(_value, item);
          }}
        />
      ) : null;
    };
    const renderInputNumber = (item: IConfigItem) => {
      return item.component === 'inputNumber' ? (
        <input-number
          placeholder='请输入'
          {...item}
          clearable={item.clearable ?? true}
          v-model={this.modelValue[item.valueName as string]}
          onInput={(value: string) => {
            const _value = value.trim();
            this.updateValue(_value, item);
          }}
        />
      ) : null;
    };
    const renderSelect = (item: IConfigItem) => {
      return item.component === 'select' ? (
        <el-select
          placeholder='请选择'
          style={{ width: '100%' }}
          {...item}
          clearable={item.clearable ?? true}
          v-model={this.modelValue[item.valueName as string]}
          onChange={(value: string) => {
            this.updateValue(value, item);
          }}
        >
          {item.options?.map((it) => {
            return (
              <el-option
                label={it[item.optionLabel ?? 'label']}
                value={it[item.optionValue ?? 'value']}
              />
            );
          })}
        </el-select>
      ) : null;
    };
    const renderDatePicker = (item: IConfigItem) => {
      return item.component === 'datePicker' ? (
        <el-date-picker
          type={item.type ?? 'daterange'}
          range-separator='至'
          clearable={item.clearable ?? true}
          start-placeholder={item?.placeholder?.[0] ?? '开始日期'}
          end-placeholder={item?.placeholder?.[1] ?? '结束日期'}
          value-format={item.valueFormat ? item.valueFormat : 'YYYY-MM-DD HH:mm:ss'}
          default-time={this.defaultTime}
          v-model={this.timeRange[(item?.valueName as string[])?.[0] ?? '']}
          onChange={(value: string[]) => {
            this.updateValue(value, item);
          }}
          disabledDate={item.disabledDate ?? null}
        />
      ) : null;
    };
    const renderKeySelectSearch = (item: IConfigItem) => {
      return item.component === 'keySelect' ? (
        <keySelectSearch
          class={[styles['input-with-select'], 'tw-ml-[10px]']}
          ref={this.setItemRef}
          v-model={this.modelValue}
          onChange={(value: any) => {
            this.$emit('update:modelValue', value);
          }}
          keyList={item.keyList || []}
          placeholder={item.placeholder}
        />
      ) : null;
    };
    const handleSubmit = (e: Event) => {
      const event = e || window.event;
      if (event.preventDefault) {
        event.preventDefault();
      } else {
        window.event?.preventDefault();
      }
    };
    const globalCols = Object.assign({
      xs: 24,
      sm: 12,
      md: 12,
      lg: 8,
      xl: 6
    }, this.cols || {});
    return (
      <div class={styles.wrap}>
        <el-form
          class='tw-flex-1'
          label-width={this.labelWidth}
          onKeyup={withKeys(() => this.$emit('handleSearch'), ['enter'])}
          onSubmit={(e: Event) => handleSubmit(e)}
        >
          <el-row>
            {this.config
              .filter(item => !item.isHiden)
              .map((item: IConfigItem, index: number) => {
                const cols = Object.assign({}, globalCols, item.cols || {});
                return (
                  <el-col
                    {...cols}
                    v-show={index < this.showLength || (index >= this.showLength && this.isOpen)}
                  >
                    <el-form-item
                      label={item.name}
                      label-width={item.component === 'keySelect' ? '0px' : this.labelWidth}
                    >
                      {item.slotName ? (
                        <>{this.$slots?.[item.slotName]?.()}</>
                      ) : (
                        <>
                          {renderInput(item)}

                          {renderInputNumber(item)}

                          {renderSelect(item)}

                          {renderDatePicker(item)}

                          {renderKeySelectSearch(item)}
                        </>
                      )}
                    </el-form-item>
                  </el-col>
                );
              })}
          </el-row>
        </el-form>
        <div class={styles.btns}>
          {this.$slots?.prependButton?.()}
          <el-button
            class='tw-ml-[12px]'
            type='primary'
            onClick={() => {
              this.$emit('handleSearch');
            }}
          >
            查询
          </el-button>
          <el-button onClick={this.handleReset}>重置</el-button>
          {this.$slots?.appendButton?.()}
          {this.config.length > this.showLength && (
            <el-button
              class='tw-ml-[12px]'
              onClick={this.handleOpenRetract}
            >
              {this.isOpen ? '收起' : '展开'}
              <el-icon class='tw-ml-[5px]'>{this.isOpen ? <arrow-up /> : <arrow-down />}</el-icon>
            </el-button>
          )}
        </div>
      </div>
    );
  },
});
