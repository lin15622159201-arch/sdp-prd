<template>
  <el-dialog
    v-model="selfVisible"
    :title="title"
    center
    :show-close="true"
    custom-class="el-dialog-inner-scroll"
    :close-on-press-escape="false"
    :close-on-click-modal="false"
    append-to-body
    @close="handleClose"
  >
    <el-form
      ref="formRef"
      :model="formData"
      label-width="130px"
      :rules="rules"
    >
      <el-form-item
        label="返修/复版责任方"
        prop="reworkingDuty"
      >
        <el-input
          v-model="formData.reworkingDuty"
          placeholder="请输入"
          max-length="25"
          @keydown.enter.prevent="handleConfirm"
        />
      </el-form-item>

      <el-form-item
        label="计费规则"
        prop="payCostRule"
      >
        <el-radio-group v-model="formData.payCostRule">
          <el-radio :label="PAY_COST_RULE.CHARGING">
            计费
          </el-radio>
          <el-radio :label="PAY_COST_RULE.UNCHARGING">
            不计费
          </el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item
        label="收费规则"
        prop="receiveCostRule"
      >
        <el-radio-group v-model="formData.receiveCostRule">
          <el-radio :label="RECEIVE_COST_RULE.CHARGING">
            收费
          </el-radio>
          <el-radio :label="RECEIVE_COST_RULE.UNCHARGING">
            不收费
          </el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item
        label="返修计费影响"
        prop="repairChargingAffects"
      >
        <el-checkbox-group v-model="formData.repairChargingAffects" @change="onChangeRepairCharge">
          <el-checkbox
            v-for="item in REPAIR_CHARGE_AFFECT_LIST"
            :key="item.value"
            :label="item.value"
          >
            {{item.label}}
          </el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item
        label="返修类型"
        prop="repairTypes"
      >
        <el-checkbox-group v-model="formData.repairTypes">
          <el-checkbox
            v-for="item in REPAIR_CHARGE_AFFECT_LIST"
            :key="item.value"
            :label="item.value"
            :disabled="setRepairTypesDisable(item.value)"
          >
            {{item.label}}
          </el-checkbox>
        </el-checkbox-group>
      </el-form-item>

      <el-form-item
        v-if="showContinueItem"
        label="是否继续添加"
      >
        <el-radio-group v-model="isContinue">
          <el-radio :label="YES_NO_STRING_ENUM.YES">
            是
          </el-radio>
          <el-radio :label="YES_NO_STRING_ENUM.NO">
            否
          </el-radio>
        </el-radio-group>
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="handleClose">
        取 消
      </el-button>
      <el-button type="primary" @click="handleConfirm">
        确 定
      </el-button>
    </template>
  </el-dialog>
</template>

<script lang="ts">
import type { PropType } from 'vue';
import { defineComponent, ref, toRefs, computed, reactive, watch } from 'vue';
import { saveReworkResponsibility, updateReworkResponsibility } from '../api';
import { YES_NO_STRING_ENUM } from '@/constant';
import type { IReworkResponsibilityPageListItem } from '../api/type';
import useDialogVisible from '@/hooks-transfer/use-dialog-visible';
import {
  PAY_COST_RULE,
  RECEIVE_COST_RULE,
  REPAIR_CHARGE_AFFECT,
  REPAIR_CHARGE_AFFECT_LIST,
  REPAIR_TYPES_BY_AFFCT
} from '@/modules/base-config/constant';

export default defineComponent({
  props: {
    modelValue: {
      type: Boolean,
      required: true,
    },
    data: {
      type: Object as PropType<IReworkResponsibilityPageListItem>,
      required: true,
    },
    isEdit: {
      type: Boolean,
      required: true,
    },
  },
  emits: ['refreshList', 'update:modelValue'],
  setup(props, { emit }) {
    const { visible: selfVisible } = useDialogVisible(props, emit);
    const { isEdit } = toRefs(props);
    const title = computed(() => {
      return `返修/复版责任方 ${isEdit.value ? '修改' : '新增'}`;
    });
    const showContinueItem = computed(() => {
      return !isEdit.value;
    });
    const isContinue = ref(YES_NO_STRING_ENUM.NO);
    const formRef = ref();
    const defaultData = {
      dutyId: '',
      reworkingDuty: '',
      payCostRule: '' as PAY_COST_RULE,
      receiveCostRule: '' as RECEIVE_COST_RULE,
      repairChargingAffects: [] as REPAIR_CHARGE_AFFECT[],
      repairTypes: [] as REPAIR_CHARGE_AFFECT[],
    };
    const formData = reactive({
      ...defaultData,
    });
    // 关闭弹窗
    const handleClose = () => {
      selfVisible.value = false;
      formRef.value.resetFields();
      isContinue.value = YES_NO_STRING_ENUM.NO;
    };
    // 请求接口，新增或修改
    const requestApi = () => {
      const { dutyId, reworkingDuty, payCostRule, receiveCostRule, repairChargingAffects, repairTypes } = formData;
      const _repairTypes = [...repairTypes]?.sort();
      if (isEdit.value) {
        return updateReworkResponsibility({
          dutyId, reworkingDuty, payCostRule, receiveCostRule, repairChargingAffects, repairTypes: _repairTypes,
        });
      }
      // 新增
      return saveReworkResponsibility({
        reworkingDuty, payCostRule, receiveCostRule, repairChargingAffects, repairTypes: _repairTypes,
      });
    };
    const setFormData = (val: IReworkResponsibilityPageListItem) => {
      formData.dutyId = val.dutyId || '';
      formData.reworkingDuty = val.reworkingDuty || '';
      formData.payCostRule = val.payCostRule || '';
      formData.receiveCostRule = val.receiveCostRule || '';
      formData.repairChargingAffects = val.repairChargingAffects || [];
      formData.repairTypes = val.repairTypes || [];
    };
    // 确认保存
    const handleConfirm = async () => {
      await formRef.value.validate();
      await requestApi();

      if (isContinue.value === YES_NO_STRING_ENUM.NO || isEdit.value) {
        selfVisible.value = false;
      }
      formRef.value.resetFields();
      setFormData(defaultData as IReworkResponsibilityPageListItem);
      emit('refreshList');
    };

    const setRepairTypesDisable = (repairType: REPAIR_CHARGE_AFFECT) => {
      if (!formData.repairChargingAffects.length) {
        return false;
      }
      const repairTypes = new Set<REPAIR_CHARGE_AFFECT>();
      formData.repairChargingAffects.forEach((v) => {
        REPAIR_TYPES_BY_AFFCT?.[v]?.forEach((it) => {
          repairTypes.add(it);
        });
      });
      return !repairTypes.has(repairType);
    };

    const onChangeRepairCharge = () => {
      if (formData.repairTypes?.length > 0) {
        formData.repairTypes = [];
      }
    };

    watch(
      () => props.data,
      (val) => {
        setFormData(val);
      },
    );

    return {
      formRef,
      selfVisible,
      formData,
      isContinue,
      handleClose,
      handleConfirm,
      showContinueItem,
      title,
      rules: {
        reworkingDuty: [{ required: true, message: '请输入返修/复版责任方', trigger: ['blur'] }],
        payCostRule: [{ required: true, message: '请选择计费规则', trigger: ['blur'] }],
        receiveCostRule: [{ required: true, message: '请选择收费规则', trigger: ['blur'] }],
        repairChargingAffects: [{ required: true, message: '请选择返修计费影响', trigger: ['blur'] }],
        repairTypes: [{ required: true, message: '请选择返修类型', trigger: ['blur'] }],
      },
      YES_NO_STRING_ENUM,
      PAY_COST_RULE,
      RECEIVE_COST_RULE,
      REPAIR_CHARGE_AFFECT,
      setRepairTypesDisable,
      onChangeRepairCharge,
      REPAIR_CHARGE_AFFECT_LIST
    };
  },
});
</script>

<style lang="scss" scoped>

.responsible-name{
  :deep(.el-select){
    width: 100%;
  }
}

</style>
