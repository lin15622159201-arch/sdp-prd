<template>
  <!-- 返修 -->
  <div class="repair-dialog">
    <el-dialog
      :modelValue="show"
      width="1000px"
      :title="title"
      :close-on-click-modal="false"
      center
      append-to-body
      @close="close()"
      @open="open()"
    >
      <el-form
        label-width="130px"
        :model="formData"
        ref="formElRef"
        label-position="right"
      >
        <el-form-item
          label="返修原因"
          prop="repairReasonCode"
          :rules="[{ required: true, message: '请选择 返修原因' }]"
        >
          <el-select
            v-model="formData.repairReasonCode"
            placeholder="请选择"
            @change="handleChange"
          >
            <el-option
              v-for="item in repairReasonNameList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item
          label="返修责任方"
          prop="responsibleParty"
          :rules="[{ required: true, message: '请选择 返修责任方' }]"
        >
          <query-select
            v-model="formData.responsibleParty"
            placeholder='请选择复版责任方'
            :method="reworkResponsibilityPage"
            :need-init-search="true"
            :config="{
              labelKey: 'reworkingDuty',
              valueKey: 'code',
              keywordQueryKey: 'reworkingDuty',
              valueQueryKey: 'reworkingDuty',
              dataKey: 'data.list',
              showCode: false,
            }"
            :queryParams="{ state: YES_NO_ENUM.YES, pageNum: 1, pageSize: 1000 }"
            @change="handleResponsiblePartyChange"
          />
        </el-form-item>
        <el-form-item
          label="返修类型"
          prop="repairTypes"
          :rules="[{ required: true, message: '请选择 返修类型' }]"
        >
          <el-checkbox-group v-model="formData.repairTypes">
            <el-checkbox
              v-for="(item) in repairTypeOptions"
              :key="item.value"
              :label="item.value"
            >
              {{ item.label }}
            </el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item
          label="返修描述"
          prop="repairDescription"
          :rules="[{ required: true, message: '请输入', trigger: 'blur' }]"
        >
          <el-input
            v-model="formData.repairDescription"
            :rows="5"
            type="textarea"
            placeholder="请输入"
            resize="none"
            :maxlength="300"
          />
        </el-form-item>
        <template v-if="formData.repairTypes?.length !== 0">
          <div class="tw-pl[40px] tw-w-full tw-mb[18px]">返修预估耗时</div>
          <el-row>
            <el-col
              v-if="formData.repairTypes?.includes(SAMPLE_REFER_NUMTYPE_ENUM.PAPER)"
              :span="8"
            >
              <el-form-item
                label="预估纸样耗时"
                prop="patternCostTime"
                :rules="[{ required: true, message: '请选择 预估纸样耗时' }]"
              >
                <el-select
                  v-model="formData.patternCostTime"
                  placeholder="请选择"
                >
                  <el-option
                    v-for="item in timeOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col
              v-if="formData.repairTypes?.includes(SAMPLE_REFER_NUMTYPE_ENUM.CAR)"
              :span="8"
            >
              <el-form-item
                label="预估车版耗时"
                prop="sewCostTime"
                :rules="[{ required: true, message: '请选择 预估车版耗时' }]"
              >
                <el-select
                  v-model="formData.sewCostTime"
                  placeholder="请选择"
                >
                  <el-option
                    v-for="item in timeOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col
              v-if="formData.repairTypes?.includes(SAMPLE_REFER_NUMTYPE_ENUM.THREE_DIMENSION)"
              :span="8"
            >
              <el-form-item
                label="预估3D耗时"
                prop="dimensionCostTime"
                :rules="[{ required: true, message: '请选择 预估3D耗时' }]"
              >
                <el-select
                  v-model="formData.dimensionCostTime"
                  placeholder="请选择"
                >
                  <el-option
                    v-for="item in timeOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col
              :span="8"
              v-if="formData.repairTypes!.includes(SAMPLE_REFER_NUMTYPE_ENUM.CAR)"
            >
              <el-form-item
                label="返修件数"
                prop="repairNum"
                :rules="[
                  { required: true, message: '请输入 返修件数' },
                  {
                    validator: (rule, value, callback) => {
                      if (value === '0') {
                        callback(new Error('当前返修类型为车版，返修件数不能为0'));
                      } else {
                        callback();
                      }
                    },
                    trigger: ['blur', 'change']
                  }
                ]"
              >
                <input-number
                  v-model="formData.repairNum"
                  :precision="0"
                  :min="0"
                  :max="+props.sampleAmount"
                />
              </el-form-item>
            </el-col>
          </el-row>
        </template>
      </el-form>
      <template #footer>
        <el-button @click="close">
          取消
        </el-button>
        <el-button type="primary" @click="confirm">
          确定
        </el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
import type { PropType } from 'vue';
import { computed, ref } from 'vue';
import {
  SAMPLE_REFER_NUMTYPE_ENUM,
  SAMPLE_TYPE_ENUM,
  SAMPLE_REFER_NUMTYPE_LIST,
  MAKE_CLOTHES_TYPE_ENUM
} from '@/modules/clothes-center/constant/index';
import { getLabelByVal } from '@/core/plugins/filter';
import { useDictionary } from '@/hooks/use-dictionary';
import type { ISampleAuditBaseInfoResRepairInfo } from '@/modules/clothes-center/views/style-audit/api/types';
import { ElForm } from 'element-plus';
import { reworkResponsibilityPage } from '@/modules/clothes-center/api';
import { YES_NO_ENUM } from '@/constant';
import { DICTIONARY_KEY } from '@/constant/dictionary';
import { IRepairData } from '../types';

const props = defineProps({
  visible: {
    type: Boolean,
    default: false,
  },
  data: {
    type: Object as PropType<IRepairData>,
    default: () => ({}),
  },
  title: {
    type: String,
    default: '发起返修',
  },
  sampleAmount: { /* 打版件数 */
    type: [String, Number],
    default: 9999,
  },
  sampleMode: {
    type: String as PropType<SAMPLE_TYPE_ENUM>,
    default: '',
  },
  /** 制作方式：0-仅纸样 1-实物样 2-3D样 */
  makeClothesType: {
    type: [String, Number],
    default: '',
    required: true,
  },
});
const emits = defineEmits(['update:visible', 'confirm']);

const show = computed({
  get: () => props.visible,
  set: (value: boolean) => emits('update:visible', value),
});

const { getDictionaryOptions } = useDictionary();
const repairReasonNameList = computed(() => getDictionaryOptions(DICTIONARY_KEY.PLM_REPAIR_REASON) || []);
const formElRef = ref<InstanceType<typeof ElForm> | null>(null);
const timeOptions = ref([
  { label: '0.5', value: '0.5' },
  { label: '1', value: '1' },
  { label: '1.5', value: '1.5' },
  { label: '2', value: '2' },
  { label: '2.5', value: '2.5' },
]);
const formData = ref<ISampleAuditBaseInfoResRepairInfo>({
  repairReasonCode: '', // 返修原因编码（字典获取）
  repairReasonName: '', // 返修原因名称（字典获取）
  responsibleParty: '', // 返修责任方(1:版房原因、2:设计师原因、3:客户要求)
  responsiblePartyName: '', // 返修责任方
  repairDescription: '', // 返修描述
  estimatedTime: '', //  预估耗时（单位：h）
  repairNum: '', // 返修件数
  repairTypes: [], // 返修类型: 1,仅纸样; 2,仅车版; 3,纸样+车版;
  patternCostTime: '', // 预估纸样耗时（单位：h）: 返修类型为仅纸样 或 纸样+车版 时 必填v
  sewCostTime: '', // 预估车版耗时（单位：h）: 返修类型为仅车版 或 纸样+车版 时 必填
  // isMakeClothing: true, // 是否打版
  // describe: '',
});

/* 返修类型 */
const repairTypeOptions = ref<any[]>([]);
const typeMap = {
  [MAKE_CLOTHES_TYPE_ENUM.PAPER]: [
    SAMPLE_REFER_NUMTYPE_ENUM.PAPER
  ],
  [MAKE_CLOTHES_TYPE_ENUM.THREE]: [
    SAMPLE_REFER_NUMTYPE_ENUM.PAPER,
    SAMPLE_REFER_NUMTYPE_ENUM.THREE_DIMENSION,
  ],
  [MAKE_CLOTHES_TYPE_ENUM.ACTUAL]: [
    SAMPLE_REFER_NUMTYPE_ENUM.PAPER,
    SAMPLE_REFER_NUMTYPE_ENUM.CAR,
  ],
  [MAKE_CLOTHES_TYPE_ENUM.THREE_AND_ACTUAL]: [
    SAMPLE_REFER_NUMTYPE_ENUM.PAPER,
    SAMPLE_REFER_NUMTYPE_ENUM.CAR,
    SAMPLE_REFER_NUMTYPE_ENUM.THREE_DIMENSION,
  ],
};
const mapCodeToRepairTypeOptions = (codes: SAMPLE_REFER_NUMTYPE_ENUM[] = []) => {
  const maskTypes = typeMap[props.data.makeClothesType];
  repairTypeOptions.value = codes
    .filter(code => maskTypes.includes(code))
    .map((code) => {
      return { label: getLabelByVal(SAMPLE_REFER_NUMTYPE_LIST, code), value: code };
    });
};

const close = () => {
  show.value = false;
  formElRef.value?.resetFields();
};

// open 时，如果 formData 没有值则重新从 props 中取，重新生成 form
const open = () => {
  formData.value.repairDescription = (props.data as any)?.questionDescription || '';
};

const confirm = async () => {
  await formElRef.value?.validate();
  emits('confirm', formData.value);
};

const handleResponsiblePartyChange = (val: string, opt: any) => {
  formData.value.responsiblePartyName = opt?.reworkingDuty || '';
  formData.value.repairTypes = [];
  formData.value.patternCostTime = '';
  formData.value.sewCostTime = '';
  /* 显示返修类型 */
  mapCodeToRepairTypeOptions(opt?.repairTypes);
};

const handleChange = () => {
  const find = repairReasonNameList.value.find(item => item.value === formData.value.repairReasonCode);
  formData.value.repairReasonName = find?.label || '';
};
</script>
