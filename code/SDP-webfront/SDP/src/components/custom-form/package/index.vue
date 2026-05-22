<template>
  <section
    class="custom-form"
    :class="{
      folding,
      open,
      'fheader-mode': foldingMode === 'fheader'
    }"
  >
    <el-form
      v-bind="$attrs"
      ref="ElementFormRef"
      :model="form.model_"
      @keyup.enter="$emit('enter')"
    >
      <!-- form scope loop-->
      <template v-for="(FormScope, i) in UI_" :key="i">
        <el-row
          v-if="FormScope.show === void 0 || FormScope.show"
          :style="{ width: FormScope.width || '100%' }"
          :gutter="foldingMode === 'fheader' ? 10 : 0"
        >
          <!-- form item loop-->
          <template v-for="(item, d) in FormScope.items" :key="d">
            <el-col
              v-if="
                (!folding || (open || item.stay))
                  && (item.show === void 0 || item.show)
              "
              v-bind="Object.assign({
                xs: 24, sm: 24, md: 24, lg: 24, xl: 24
              }, FormScope.col || layoutCol || {})"
            >
              <el-form-item
                class="fade-enter"
                :label="renderLabel(item)"
                :prop="item.key"
                :rules="typeof item.rules !== 'boolean'
                  ? item.rules
                  : { required: item.rules, message: `${item.label} 为必填项`, trigger: 'blur' }"
                :label-width="item.labelWidth"
                :required="item.required"
              >
                <!-- slot 自定义插槽 -->
                <template v-if="item.slot && $slots[item.slot]">
                  <slot
                    :name="item.slot"
                    :model="model"
                    :item="item"
                  />
                </template>

                <!-- type 模板 -->
                <template v-else-if="item.type && ishasTempComponent(item.type)">
                  <component :is="`cu-${item.type}`" :item="item" />
                </template>

                <!-- type 未匹配 -->
                <template v-else>
                  {{ unkownItem(item) }}
                </template>

                <!-- tooltip -->
                <el-tooltip
                  v-if="item.customParams?.tooltip"
                  :content="item.customParams?.tooltip"
                  placement="bottom"
                  effect="light"
                >
                  <el-button
                    type="primary"
                    text
                    class="tooltip-block tooltip-button"
                  >
                    <el-icon>
                      <warning />
                    </el-icon>
                    {{ item.customParams?.paper || '查看提示' }}
                  </el-button>
                </el-tooltip>

                <!-- warning string -->
                <p
                  v-if="item.customParams?.warning"
                  class="warning-string"
                  :style="{ color: item.customParams?.color || '#e6a23c' }"
                >
                  {{ item.customParams?.warning }}
                </p>
              </el-form-item>
            </el-col>
          </template>

          <!-- app-page fheader 按钮区域-->
          <el-col
            v-if="($slots.buttons || folding) && foldingMode === 'fheader'"
            v-bind="Object.assign({
              xs: 24, sm: 24, md: 24, lg: 24, xl: 24
            }, FormScope.col || layoutCol || {})"
          >
            <el-form-item label-width="40px">
              <div class="buttons is-fheader-buttons">
                <slot name="buttons" />
                <!-- 由 app-page fheader 插入展开按钮 -->
              </div>
            </el-form-item>
          </el-col>
        </el-row>
      </template>
    </el-form>
    <!-- form inner 按钮区域 -->
    <div
      v-if="($slots.buttons || folding) && foldingMode === 'inner'"
      class="buttons"
      :class="{ 'folding-button': folding, 'button-center': buttonPosition === 'center' }"
    >
      <slot name="buttons" />
      <el-button v-if="folding" @click="open = !open">
        <span>{{ open ? '收起' : '展开' }}</span>
        <el-icon :size="12">
          <arrow-up v-if="open" />
          <arrow-down v-else />
        </el-icon>
      </el-button>
    </div>
  </section>
</template>

<script lang="ts">
import type { PropType } from 'vue';
import {
  defineComponent, ref, toRaw, toRef,
  getCurrentInstance, provide, watch, onBeforeUnmount,
} from 'vue';
import type { FormItem, CustomFormVM, FormItemType, FormContext } from './Form';
import type CustomFormClass from './Form';
import { formItemTypeArray } from './Form';
import type { CustomObj } from '../hooks/use-dict';
import { ArrowDown, ArrowUp, Warning } from '@element-plus/icons-vue';
import type { ElForm } from 'element-plus';
import * as Templates from './form-item/index';
import { toCamelCased } from './form-item/extends';
// import * as API from '@/api/dict/index';
import * as _ from 'lodash-es';
import { useUploaderFormat } from '../hooks/use-uploader-format/index';

export default defineComponent({
  name: 'CustomForm',
  components: {
    ArrowDown,
    ArrowUp,
    ...Templates,
    Warning,
  },
  props: {
    form: { // form 实例 (CustomFormClass instance)
      required: true,
      type: Object as PropType<CustomFormClass>,
      default: () => ({
        vm: {},
        model: {},
        UI: [],
      }),
    },
    dictList: { // useDictionary 提供 batchDictListMap 字典集合
      type: Object as PropType<CustomObj>,
      default: () => ({}),
    },
    folding: { // 折叠功能
      type: Boolean,
      default: false,
    },
    defaultOpen: { // 展开状态初始值
      type: Boolean,
      default: false,
    },
    foldingMode: {
      type: String as PropType<'inner' | 'fheader'>, // 折叠模式（外部 collapse 控制， 内部 open 控制）
      default: 'inner',
    },
    collapse: {
      type: Boolean,
      default: false, // app-page Fheader 传入
    },
    buttonPosition: {
      type: String as PropType<'center' | 'right'>,
      default: 'right',
    },
    layoutCol: {
      type: Object as PropType<CustomObj>,
      default: () => ({}),
    },
  },
  emits: ['success', 'fail', 'reset', 'enter'],
  setup(props, { emit }) {
    const vm = getCurrentInstance() as CustomFormVM;
    const UI_ = toRef(props.form, 'UI');
    const dictList_ = toRef(props, 'dictList');
    const ElementFormRef = ref<InstanceType<typeof ElForm> | null>(null);

    const model = toRef(props.form, 'model');

    /* Form context */
    provide<FormContext>('form-context', {
      form: props.form,
      dictList: dictList_,
      vm,
      ElementFormRef,
      model,
      UI: UI_,
    });

    /* template 注册校验 */
    const ishasTempComponent = (type: FormItemType | string): boolean => {
      if (!type) return false;
      const componentkey = toCamelCased(`Cu-${type}`);
      const ishas = !!(vm && vm.components && vm.components[componentkey]);
      const message = `<custom-form/> component: \n
                      "${componentkey}" not import, by /custom-form/template/index.ts`;
      !ishas && console.warn(message);
      return ishas;
    };

    const unkownItem = (item: FormItem) => {
      const message = `<custom-form/> component: \n
                      this item is invalid , ${JSON.stringify(item)}, need 'key' or 'slot'`;
      console.warn(message);
      return '';
    };

    const renderLabel = (item: FormItem) => {
      return !+item.labelWidth! && !item.label ? '' : `${item.label}：`;
    };

    // 折叠
    const open = ref(props.defaultOpen);
    const stop = watch(() => props.collapse, (collapse) => {
      open.value = collapse;
    });
    onBeforeUnmount(() => {
      stop();
    });

    const validate = async () => {
      try {
        const res = await ElementFormRef.value!.validate();
        return Promise.resolve(res);
      } catch (e) {
        return Promise.reject(e);
      }
    };

    // uploader 信息采集，同步 model
    const getUploadRes = async () => {
      const [uploaders, uploaderFiles] = await Promise.all([
        props.form.getItemsByType('uploader'),
        props.form.getItemsByType('uploader-file'),
      ]);
      [...uploaders, ...uploaderFiles].forEach((item: FormItem) => {
        const formatType = item.uploadOutputFormat;
        const fileList = toRaw(item.upload!.files || []);
        model.value[item.key] = formatType ? useUploaderFormat.utils.origin(formatType, fileList) : fileList;
      });
    };

    // model keyPath代理值清洗
    type cleanModel = Record<string, any>;
    const cleaningModel = async (data: cleanModel) => {
      Object.keys(data || {}).forEach((key: string) => {
        if (/\.+/.test(key)) delete data[key];
      });
      return data;
    };

    const submitForm = async (temporary = false) => {
      try {
        if (!temporary) { // 非临时获取
          await validate();
        }
        await getUploadRes();
        const cloneData = _.cloneDeep(toRaw(model.value));
        const _cloneData = await cleaningModel(cloneData);
        emit('success', _cloneData);
        return Promise.resolve(_cloneData);
      } catch (e) {
        // 展开表单显示异常信息
        props.folding && (open.value = true);
        emit('fail', e);
        return Promise.reject(e);
      }
    };

    const resetForm = () => {
      emit('reset');
      ElementFormRef.value!.resetFields();
    };

    return {
      model,
      UI_,
      submitForm,
      resetForm,
      ElementFormRef,
      validate,
      open,
      formItemTypeArray,
      ishasTempComponent,
      unkownItem,
      renderLabel,
    };
  },
});
</script>

<style scoped lang="scss">
.custom-form {
  position: relative;
  .el-form-item__content {
    > .flex {
      width: 100%;
    }
    > section {
      width: 100%;
    }
  }
  .folding-button {
    // position: absolute;
    // right: 0;
    // bottom: 0;
  }
  .buttons {
    display: flex;
    justify-content: flex-end;
    // height: 28px;
    margin: 15px 0;
  }
  .is-fheader-buttons {
    margin: 0;
    justify-content: flex-start;
  }
  .button-center {
    justify-content: center;
  }
  :deep(.el-select) {
    width: 100%;
  }
  :deep(.el-cascader) {
    width: 100%;
  }
  :deep(.el-date-editor.el-input, .el-date-editor.el-input__inner) {
    width: 100%;
  }
  :deep(.el-input.is-disabled .el-input__inner) {
    color: #333;
  }
  :deep(.el-textarea.is-disabled .el-textarea__inner) {
    color: #333;
  }
  :deep(.el-radio__input.is-disabled + span.el-radio__label) {
    color: #333;
  }
}
.folding {
  .folding-button {
    :deep(span) {
      line-height: 1;
      display: flex;
      .el-icon {
        margin-left: 5px;
      }
    }
  }
}

// .open {
//   padding-bottom: 47px;
// }
.tooltip-button {
  display: flex;
  align-items: center;
  :deep(.el-icon) {
    margin-right: 5px;
  }
}
.tooltip-block {
  padding: 0;
  min-height: 20px;
  color: #409eff;
  line-height: 1.5em;
  cursor: pointer;
}
.warning-string {
  font-size: 12px;
  color: #e6a23c;
}

// .fheader-mode {
//   padding-bottom: 10px;
// }
</style>
