<script lang="tsx">
import {
  defineComponent,
  useSlots,
  computed,
  ref,
  watchEffect,
  isRef,
  onUpdated,
  onMounted,
  nextTick,
} from 'vue';
import { isBoolean, cloneDeep, isFunction } from 'lodash-es';
import type { ElForm } from 'element-plus';
import type { VNode, Component, PropType } from 'vue';
import type { IFormConfig, IFormItemsType, IFormItemsSlot, IFormItemsBase } from '../types';

export default defineComponent({
  name: 'Operation',
  props: {
    modelValue: {
      type: Object,
    },
    // formInLine: Boolean,
    /**
     * 简单的表单配置
     * 只支持CheckBox相关
     */
    formConfig: {
      type: Object as PropType<IFormConfig<any>>,
      default: () => ({}),
    },
    /**
     * 调用 setItemsShowByKey 时，是否把隐藏的model设为原始值
     */
    setBaseData: {
      type: Boolean,
      default: true,
    },
  },
  emits: ['change', 'update:modelValue'],
  setup(props, { emit }) {
    const formConfigRef = computed(() => {
      return (isRef(props?.formConfig) ? props?.formConfig.value : props?.formConfig) as IFormConfig<any>;
    });

    const operationTopRef = ref<HTMLDivElement>();
    const operationTopHeight = ref(0);

    if (
      process.env.NODE_ENV === 'development'
       && !props.modelValue
       && formConfigRef.value.model
    ) {
      console.warn('[operation component]: 请修改使用v-model，取消使用 model -- ', formConfigRef.value.model);
    }

    const modelValueRef = computed<Record<string, any> | void>({
      get() {
        return props.modelValue;
      },
      set(val) {
        emit('update:modelValue', val);
      },
    });

    // if (process.env.NODE_ENV === 'development' && formConfigRef.value.model && !isRef(formConfigRef.value.model)) {
    //   console.warn(`model 必须是一个ref对象：${formConfigRef.value.model}`);
    // }
    const slots = useSlots();

    const formRef = ref<InstanceType<typeof ElForm>>();

    const hasCtt = computed(() => {
      return !!slots.content || !!formConfigRef.value?.items?.length;
    });

    const formConfigKeys = computed<string[]>(() => {
      return Array.from(formConfigRef.value?.items || [])
        .map(item => item.key as string);
    });

    const formConfKeyMap = computed(() => {
      const keyMap = Object.create(null) as Record<string, number>;

      Array.from(formConfigRef.value?.items || []).forEach((item, i) => {
        keyMap[item.key as string] = i;
      });

      return keyMap;
    });
    // 基础数据
    const baseData = cloneDeep(modelValueRef.value || formConfigRef.value?.model?.value || {});

    /**
     * 只用在使用formConfig情况下可以使用
     * keys 控制显隐的key，若为boolean则作为 isShow 参数
     * isShow 控制显隐
     */
    const setItemsShowByKey = (keysOrShow: string | string[] | boolean, isShow?: boolean) => {
      if (!formRef.value) {
        console.warn(`formRef: ${formRef.value}, ElForm实例没找到，请在formConfig 下使用`);
        return;
      }
      if (process.env.NODE_ENV === 'development') {
        console.warn('不建议使用 setItemsShowByKey，可在配置中使用 show 字段');
      }

      const getArr = (str: string | string[]) => (Array.isArray(str) ? str : [str]);

      const _keysIsBool = typeof keysOrShow === 'boolean';
      let _isShow = _keysIsBool ? keysOrShow : isShow;
      const _keys = _keysIsBool ? formConfigKeys.value : getArr(keysOrShow as string | string[]);

      _keys.forEach((key) => {
        const i = formConfKeyMap.value[key];
        const row = formConfigRef.value.items[i];
        if (!row) return;
        if (isFunction(row.show)) {
          console.warn(`key: ${row.key as string} 的 show 字段是一个 function，请自行处理显隐逻辑`);
          return;
        }
        _isShow = isBoolean(_isShow) ? _isShow : !row.show;

        if (isRef(row.show)) {
          row.show.value = _isShow;
        } else {
          row.show = _isShow;
        }
        // 当item隐藏时重置该值
        if (!row.show && props.setBaseData && Reflect.has(baseData, key)) {
          if (modelValueRef.value) {
            modelValueRef.value[key] = baseData[key];
          } else {
            const { model } = formConfigRef.value;

            if (model?.value) {
              model.value[key] = baseData[key];
            }
          }
        }
      });
    };

    const reset = () => {
      if (!formRef.value) {
        console.warn(`formRef: ${formRef.value}, ElForm实例没找到，请在formConfig 下使用`);
        return;
      }
      formRef.value!.resetFields();
    };

    watchEffect(() => {
      if (formConfigRef.value?.items?.length) {
        formConfigRef.value!.items.forEach((item) => {
          if (!isBoolean(item.show)) {
            item.show = true;
          }
        });
      }
    });

    /**
     * 只用在使用formConfig情况下可以使用
     *
     * 获取显示中的keys
     *
     * @returns string[]
     */
    const getItemShowKeys = () => {
      if (formConfigRef.value?.items?.length) {
        return formConfigRef.value!.items!
          .filter(item => item.show === true)
          .map(item => item.key as string);
      }
      return [];
    };

    /**
     * 只用在使用formConfig情况下可以使用
     *
     * 获取隐藏中的keys
     *
     * @returns string[]
     */
    const getItemHideKeys = () => {
      if (formConfigRef.value?.items?.length) {
        return formConfigRef.value!.items!
          .filter(item => item.show === false)
          .map(item => item.key as string);
      }
      return [];
    };

    const getOperationTopHeight = () => {
      nextTick(() => {
        operationTopHeight.value = operationTopRef.value?.offsetHeight || 0;
      });
    };

    onUpdated(() => {
      getOperationTopHeight();
    });
    onMounted(() => {
      getOperationTopHeight();
    });

    return {
      hasCtt,
      formRef,
      formConfigRef,
      modelValueRef,
      operationTopRef,
      operationTopHeight,

      setItemsShowByKey,
      reset,

      getItemShowKeys,
      getItemHideKeys,
    };
  },
  render() {
    /**
     * 处理使用配置的
     */
    const handleConfig = () => {
      const { items, model, change } = this.formConfigRef;
      // const _model = this.modelValueRef
      //   ? this.modelValueRef
      //   : (isRef(model) ? model.value : model) as Record<string, any>;
      const _model = (() => {
        if (typeof this.modelValueRef !== 'undefined') {
          return this.modelValueRef;
        }
        return (isRef(model) ? model.value : model) as Record<string, any>;
      })();

      const handleChange = (prop: string, val: string | number | boolean) => {
        change?.(prop, val);
        // 使用v-model 的模式会emit change
        if (typeof this.modelValueRef !== 'undefined') {
          this.$emit('change', prop, val);
        }
      };

      const isRadioCheckbox = (_type?: string) => _type === 'radio-checkbox' || _type === 'radioCheckbox';
      const isRadioGroup = (_type?: string) => _type === 'radio-group' || _type === 'radioGroup';

      const boxRender = (item: IFormItemsType) => {
        const opts = item.options || item.radio || item.checkbox || [];
        const _key = item.key as string;

        if (isRadioCheckbox(item.type)) {
          return (
            <radio-checkbox
              {...(item.props || {})}
              v-model={_model[_key]}
              options={opts}
              onChange={(val: string | number | boolean) => {
                handleChange(_key, val);
              }}
            />
          );
        }

        if (isRadioGroup(item.type)) {
          return (
            <el-radio-group
              {...(item.props || {})}
              v-model={_model[item.key as string]}
              onChange={(val: string | number | boolean) => {
                handleChange(_key, val);
              }}
            >
              {
                opts.map((_item) => {
                  return (
                    <el-radio label={_item.value}>
                      {_item.label}
                    </el-radio>
                  );
                })
              }
            </el-radio-group>
          );
        }

        return null;
      };

      const boxSlotRender = (slotName: string) => {
        if (slotName === 'content') {
          console.warn('插槽名称不能为 content, 因为组件已使用');
          return null;
        }
        if (typeof this.$slots[slotName] !== 'function') {
          console.warn(`不能找到插槽 ${slotName}`);
          return null;
        }

        return this.$slots[slotName]!({ model: _model });
      };

      const getShow = (isShow?: IFormItemsBase<any>['show']) => {
        if (isFunction(isShow)) {
          return isShow();
        }
        return isShow ?? true;
      };

      return (
        <el-form
          model={_model}
          inline
          class='operation-form'
          ref='formRef'
        >
          {
            items.map((item: IFormItemsSlot | IFormItemsType) => {
              // if (item.show === false) return null;

              return (
                <el-form-item
                  label={item.label}
                  prop={item.key}
                  key={item.key}
                  v-show={getShow(item.show)}
                >
                  {
                    (item as IFormItemsSlot)?.slot
                      ? boxSlotRender((item as IFormItemsSlot).slot)
                      : boxRender(item as IFormItemsType)
                  }
                </el-form-item>
              );
            })
          }
        </el-form>
      );
    };
    /**
     * 处理 slots 的
     */
    const handleCttSlot = () => {
      const cttSlots = this.$slots!.content!();

      (Array.from(cttSlots || []) as VNode[]).forEach((node) => {
        const { type } = node;
        const name = (type as Component).name || type;

        if (name === 'ElForm') {
          node.props = Object.assign(node.props || {}, {
            inline: true,
            class: 'operation-form',
          });
        }
      });
      return cttSlots;
    };

    const contentRender = () => {
      if (this.hasCtt) {
        if (this.$slots.content) {
          return handleCttSlot();
        }
        // 这里就是有使用formConfig
        return handleConfig();
      }
      return null;
    };

    return (
      <div class='page-operation'>
        <div ref='operationTopRef'>
          {
            this.$slots?.default?.()
          }
        </div>
        <el-divider v-show={this.hasCtt && this.operationTopHeight > 0} />
        {
          contentRender()
        }
      </div>
    );
  },
});
</script>

<style lang="scss" scoped>
.page-operation {
  box-shadow: 0 2px 12px 0 rgba(48, 48, 51, 0.05);
  border-radius: 4px;
  padding: 10px;
  border: 1px solid rgba(48, 48, 51, 0.05);
  // margin-top: -5px;
  :deep(.el-divider) {
    margin: 10px 0;
  }
  :deep(.condition-select__wrapper) {
    display: flex;
    .condition-select + .condition-select {
      margin-left: 45px;
    }
  }
  :deep(.operation-form) {
    margin-left: -45px;
    .el-form-item {
      margin-right: 10px;
      margin-bottom: 5px;
      margin-top: 5px;
      .el-form-item__label {
        font-weight: bold;
        font-size: 14px;
        margin-left: 45px;
      }
    }
  }
  :deep(.el-checkbox) {
    font-weight: normal;
  }
}
</style>
