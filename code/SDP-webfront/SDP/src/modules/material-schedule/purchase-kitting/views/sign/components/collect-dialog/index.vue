<template>
  <div class="error-dialog">
    <el-dialog
      v-model="show"
      width="1200px"
      :title="title"
      :close-on-click-modal="false"
      center
      append-to-body
      @close="close()"
    >
      <sc-table
        :columns="columns"
        :data="data"
      />
      <div class="tw-flex tw-flex-justify-center" style="width:100%;padding-top:30px">
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

<script lang="ts">
import { defineComponent, computed, PropType } from 'vue';
import { opsDict } from '@/hooks-transfer/dictionary';
import { useColumns } from './hooks/use-columns';
import { IListItem } from '../../types';

export default defineComponent({
  components: {
  },
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
    code: {
      type: String,
      default: '',
    },
    data: {
      type: Array as PropType<IListItem[]>,
      default: () => ([]),
    },
    title: {
      type: String,
      default: '齐套单签收',
    },
  },
  emits: ['update:visible', 'confirm'],
  setup(props, { emit }) {
    const show = computed({
      get: () => props.visible,
      set: (value: boolean) => emit('update:visible', value),
    });

    const { columns } = useColumns();
    const close = () => {
      show.value = false;
    };

    const confirm = async () => {
      emit('confirm', props.code);
    };

    return {
      columns,
      opsDict,
      show,
      close,
      confirm,
    };
  },
});
</script>
