<template>
  <div class="error-dialog">
    <el-dialog
      v-model="show"
      width="1200px"
      :title="title"
      :close-on-click-modal="false"
      append-to-body
      @close="close()"
    >
      <sc-table
        height="100%"
        :data="data"
        :columns="tableColumns"
      />
      <div class="tw-flex tw-justify-center" style="width:100%;padding-top:30px">
        <el-button @click="close">
          取消
        </el-button>
        <el-button type="primary" @click="confirm">
          确定
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { useListColumns } from '../hooks/use-table-columns';

const { tableColumns } = useListColumns();
const props = defineProps({
  visible: {
    type: Boolean,
    default: false,
  },
  code: {
    type: String,
    default: '',
  },
  data: {
    type: Array,
    default: () => ([]),
  },
  title: {
    type: String,
    default: '齐套单签收',
  },
  batchDictListMap: {
    type: Object,
    default: () => ({}),
  },
});
const emits = defineEmits(['update:visible', 'confirm']);

const show = computed({
  get: () => props.visible,
  set: (value: boolean) => emits('update:visible', value),
});
const close = () => {
  show.value = false;
};
const confirm = async () => {
  emits('confirm');
};

</script>
