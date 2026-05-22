<!--返修分单-->
<template>
  <el-dialog
    v-model="show"
    title="返修分单"
    width="440px"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    append-to-body
    @closed="close()"
  >
    <el-form
      ref="formRef"
      label-width="95px"
      :model="form"
      :rules="rules"
      class="app-fheader-custom-form"
    >
      <el-form-item label="返修分单：" prop="repairId">
        <el-select
          v-model="form.repairId"
          filterable
          remote
          placeholder="请输入关键词"
          :remote-method="fuzzyRemoteMethod"
          :loading="fuzzyLoading"
        >
          <el-option
            v-for="item in fuzzyResponse"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="close()">取 消</el-button>
        <el-button type="primary" @click="save()">确 定</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts">
import type { PropType } from 'vue';
import { computed, defineComponent, ref, nextTick } from 'vue';
import type { ElForm } from 'element-plus';
import { useDictionary } from '@/hooks-transfer/use-dict';
import { useFuzzy } from '@/components/custom-form';
import { clothingRoomList } from '@/api/basis';
import type { IListNameItem, IListNameReq, IListNameRes } from '@/api/basis/types';
import { EXCEPTION_SAMPLE_TYPE_ENUM } from '@/modules/exception-manage/exception-handle/constant';
import { YES_NO_STRING_ENUM } from '@/constant/global';
import { CLOTHING_INNER_ROOM_LIST, CLOTHING_ROOM_ENUMS } from '../../constant';

export default defineComponent({
  name: 'RepairAssign',
  props: {
    visible: {
      type: Boolean,
      default: true,
      require: true,
    },
    sampleType: {
      type: String as PropType<EXCEPTION_SAMPLE_TYPE_ENUM>,
      default: '',
    },
  },
  emits: ['update:visible', 'submit'],
  setup(props, { emit }) {
    const formRef = ref<InstanceType<typeof ElForm> | null>(null);
    const form = ref({ repairId: '' });

    // 字典相关
    const {
      batchDictListMap,
    } = useDictionary([
      'plm_cancel_purchase_reason',
    ]);

    const rules = {
      repairId: [{ required: true, message: '返修分单不能为空' }],
    };
    const show = computed({
      get: () => props.visible,
      set: (value: boolean) => emit('update:visible', value),
    });

    const {
      fuzzyLoading,
      fuzzyResponse,
      fuzzyRemoteMethod,
    } = useFuzzy<IListNameReq, IListNameRes>({
      params: { name: '', enable: 'YES' },
      keywordKey: 'name',
      API: clothingRoomList,
      beforeResponse(res) {
        return [
          { label: '内部', value: '1' },
          // 过滤出禁用状态的版房
          ...res.data.reduce((pre: any[], cur: IListNameItem) => {
            if (cur.enable === YES_NO_STRING_ENUM.YES) {
              const { roomName: label, roomId: value } = cur;
              pre.push({ ...cur, label, value });
            }
            return pre;
          }, []),
        ];
      },
    });
    const close = () => {
      show.value = false;
      nextTick(() => {
        formRef.value?.resetFields();
      });
    };

    const save = async () => {
      await formRef.value?.validate();
      const selectedObj = {
        label: form.value.repairId === CLOTHING_ROOM_ENUMS.INNER
          ? '内部'
          : fuzzyResponse.value.find(item => item.roomId === form.value.repairId)?.roomName,
        value: form.value.repairId,
      };
      emit('submit', selectedObj);
      close();
    };

    return {
      EXCEPTION_SAMPLE_TYPE_ENUM,
      CLOTHING_INNER_ROOM_LIST,
      formRef,
      rules,
      close,
      form,
      show,
      save,
      batchDictListMap,
      fuzzyLoading,
      fuzzyResponse,
      fuzzyRemoteMethod,
    };
  },
});
</script>

<style scoped lang="scss">
//
</style>
