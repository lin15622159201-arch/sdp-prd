<template>
  <div>
    <div
      class="tw-text-[14px] tw-color-[#18181A] tw-font-bold tw-mb-[11px]"
    >
      矩形选取
    </div>
    <div class="tw-flex tw-mt-[10px]">
      <el-input
        :formatter="(value: number) => `宽 ${Math.round(value)}`"
        :parser="(value: string) => value.replace(/\宽\s?|[^\d]/g, '')"
        v-model="activeRect.width"
        class="tw-mr-[5px]"
      />
      <el-input
        :formatter="(value: number) => `高 ${Math.round(value)}`"
        :parser="(value: string) => value.replace(/\高\s?|[^\d]/g, '')"
        v-model="activeRect.height"
      />
    </div>
    <div class="tw-flex tw-flex-justify-between tw-mt-16px">
      <el-button
        type="danger"
        class="tw-w-110px"
        @click="activeRect.deleteRect"
      >
        删除
      </el-button>
      <el-button
        type="primary"
        class="tw-w-110px"
        @click="activeRect.addRect(0, 0)"
      >
        确定
      </el-button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { useEditorStore } from '../../store/useEditorStore';

const props = defineProps({
  /** 是否是多个矩形选区 */
  isMultiple: {
    type: Boolean,
    default: false,
  }
});
const { rect, multipleRect } = useEditorStore();

const activeRect = computed(() => {
  return props.isMultiple ? multipleRect : rect;
});

</script>
