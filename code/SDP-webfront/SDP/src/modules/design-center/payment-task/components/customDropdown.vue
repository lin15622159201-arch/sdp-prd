<template>
  <div>
    <el-popover
      :visible="backgroundVisible"
      placement="bottom"
      :width="300"
    >
      <div class="dropdown-item">
        <div class="tw-font-700 tw-m-b-20px">{{ title }}</div>
        <el-form
          @submit.prevent
          ref="formRef"
          :model="form"
          label-width="auto"
        >
          <el-form-item
            v-for="item in config.filter(v => v.type !== 'input')"
            :key="item.value"
            :label="item.label"
            :prop="item.value"
            :rules="[
              { required: false, message: '请选择', trigger: 'change' },
            ]"
          >
            <el-select
              class="tw-w-100% tw-m-l-10px"
              v-model="form[item.value]"
              clearable
              filterable
              placeholder="请选择"
              @change="getNameChange($event, item.name, item.options, item)"
            >
              <el-option
                v-for="items in item.options"
                :key="items.value"
                :label="items.label"
                :value="items.value || ''"
              />
            </el-select>
          </el-form-item>
          <el-form-item
            v-for="item in config.filter(v => v.type === 'input')"
            v-show="form[item.correlation] && form[item.correlation] !== '1'"
            :key="item.value"
            :label="form[item.correlation] === '2' ? '套装件数' : '单品数量'"
            :prop="item.value"
          >
            <el-input-number
              class="tw-w-100% tw-m-l-10px"
              v-model="form[item.value]"
              :min="1"
              :max="9999999"
              :precision="0"
              :step="1"
            />
          </el-form-item>
        </el-form>
      </div>
      <div style="text-align: right; margin: 0">
        <el-button
          size="small"
          @click="reset"
        >重置</el-button>
        <el-button
          size="small"
          type="primary"
          @click="backgroundItemFun"
        >保存</el-button>
        <!-- <el-button
          size="small"
          type="primary"
          @click="backgroundItemFun"
        >
          确认
        </el-button> -->
      </div>
      <template #reference>
        <div
          @click="backgroundFun"
          class="popover-box"
          style="cursor: pointer;width: 100%"
        >
          <div style="pointer-events: none">
            <div class="select-pointer-events">
              <el-select
                readonly
                class="tw-w-100px"
                v-model="showText"
                :placeholder="placeholder"
              >
                <el-option
                  :label="title"
                  :value="title"
                />
              </el-select>
            </div>
          </div>
        </div>
      </template>
    </el-popover>
  </div>
</template>

<script lang="ts" setup>
import { defineProps, watch, ref, PropType, defineEmits, defineModel, computed } from 'vue';
import { ElForm } from 'element-plus';


const dynamicLabel = ref<string>('');
const formRef = ref<InstanceType<typeof ElForm>>();
const emit = defineEmits<{
  (event: 'setTitText'): void;
}>();


const props = defineProps({
  config: {
    type: Array as PropType<any[]>,
    default: () => []
  },
  title: {
    type: String,
    default: '',
  },
  placeholder: {
    type: String,
    default: '请选择',
  },
});
const backgroundVisible = ref(false);
const form = defineModel({
  type: Object as PropType<any>,
  default: {},
});
const showText: any = defineModel<string>('showText');
const backgroundItemFun = async () => {
  // await formRef.value?.validate();
  props.config.forEach((v: any) => {
    if (form.value[v.value]) {
      emit('setTitText');
    }
  });
  backgroundVisible.value = false;
};
const reset = () => {
  props.config.forEach((v: any) => {
    form.value[v.value] = '';
    form.value[v.name] = '';
  });
  showText.value = '';
};
const backgroundFun = () => {
  backgroundVisible.value = true;
};
const getNameChange = (e:any, keyName: string, list: any, item: any) => {
  form.value[keyName] = list.find((v: { value: string; }) => v.value === e)?.label;
  if (item.name === 'skuClassName' && form.value[keyName] === '单品') {
    form.value.suitPiece = undefined;
  }
};
</script>

<style scoped>
.select-pointer-events :deep(.el-input__suffix-inner) {
  pointer-events: none;
}
</style>
