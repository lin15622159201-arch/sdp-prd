<script lang="ts" setup>
import { ref, computed, watch } from 'vue';
import type { ElForm } from 'element-plus';
import { ElMessage } from 'element-plus';
import { useRoute, useRouter } from 'vue-router';
import { YES_NO_STRING_ENUM, REGION_LIST } from '@/constant';
import {
  getStyleTemplatePage,
  styleTemplateDetail,
  styleTemplateCreate,
  styleTemplateEdit,
} from './api';
import { column, anotherProcessColumn } from './hooks/use-columns';
import { useDictionary } from '@/hooks-transfer/use-dict';
import type {
  IStyleTemplateCreateReqProcessStyleAnotherProcessItem,
  IStyleTemplateCreateReq,
  ISewingComponentTemplateItem,
  IStyleTemplateCreateReqProcessStyleSwingsItem,
  IStyleTemplatePageResListItem,
  IStyleTemplateDetailRes,
} from './api/type';
import type { TableInstanceRef } from '@/components/custom-table/types';
import AddDialog from './components/addDialog.vue';
import { IFile } from '@/components/uploader/packages/types';
import { cloneDeep, isArray } from 'lodash-es';
import { DEFAULT_MINUTE_WAGE, ENABLE_STATE, PROCESS_ENUM } from '../../constant';
import { useDefaultRow } from './hooks/use-default-row';
import type { IdictValuesItem } from '@/api/dict/types';
import { divide, formatFloat, times } from '@toy/utils';

interface templateData_type {
  loading: boolean;
  list: IStyleTemplatePageResListItem[];
}

const router = useRouter();
const currentRoute = useRoute();

const formRef = ref<InstanceType<typeof ElForm>>();
const tableRef = ref<TableInstanceRef>();
const croppingRef = ref<TableInstanceRef>();
const croppingList = ref<IStyleTemplateCreateReqProcessStyleAnotherProcessItem[]>([]);
const afterRef = ref<TableInstanceRef>();
const afterList = ref<IStyleTemplateCreateReqProcessStyleAnotherProcessItem[]>([]);
const manualRef = ref<TableInstanceRef>();
const manualList = ref<IStyleTemplateCreateReqProcessStyleAnotherProcessItem[]>([]);

const lastReferenceId = ref<string | undefined>('');

// 字典
const { batchDictListMap } = useDictionary([
  'plm_umber_requirement_unit',
  'plm_sewing_type',
]);

// 车缝车种
const sewingTypeList = computed(() => batchDictListMap.value.plm_sewing_type);
// 单位
const requirementUnitList = computed(() => batchDictListMap.value.plm_umber_requirement_unit);

const detailInfo = ref<IStyleTemplateCreateReq>({
  processStyleSewings: [{
    minutelyPay: DEFAULT_MINUTE_WAGE,
  }],
} as IStyleTemplateCreateReq);

const isContinue = ref(YES_NO_STRING_ENUM.NO);

// 显示弹框
const showAddDialog = ref(false);

const addProcess = (list: ISewingComponentTemplateItem[]) => {
  const addList: IStyleTemplateCreateReqProcessStyleSwingsItem[] = [];
  list.forEach((item) => {
    addList.push({
      componentName: item.componentName,
      processName: item.processName,
      plmSewingType: item.plmSewingType,
      plmSewingName: item.plmSewingName,
      picture: (item.picture
        ? [
          {
            url: item.picture,
          },
        ]
        : []) as unknown as string,
      processDescribe: item.processDescribe,
      estimatedTime: item.estimatedTime,
      // 分钟工资
      minutelyPay: item.minutelyPay,
      // 金额
      amount: item.amount,
      remark: item.remark,
    });
  });
  detailInfo.value.processStyleSewings = addList.concat(detailInfo.value.processStyleSewings || []);
};

const openAddDialog = () => {
  if (!detailInfo.value.regionId) {
    ElMessage.warning('请先选择所属区域');
    return;
  }
  showAddDialog.value = true;
};

// 行数据默认值
const {
  sewingDefaultRow,
  cropDefaultRow,
  manualDefaultRow,
  afterDefaultRow,
} = useDefaultRow();

// 添加一行数据
const addprocessline = (type: string, idx: number) => {
  // 下一行
  const index = idx + 1;
  if (type === PROCESS_ENUM.CAR) {
    detailInfo.value.processStyleSewings?.splice(index, 0, {
      ...sewingDefaultRow,
    });
  } else if (type === PROCESS_ENUM.CROP) {
    croppingList.value.splice(index, 0, { ...cropDefaultRow });
  } else if (type === PROCESS_ENUM.AFTER) {
    afterList.value.splice(index, 0, { ...afterDefaultRow });
  } else if (type === PROCESS_ENUM.MANUAL) {
    manualList.value.splice(index, 0, { ...manualDefaultRow });
  }
};

// 删除一条车缝数据
const delRow = (type: string, index: number) => {
  if (type === PROCESS_ENUM.CAR) {
    detailInfo.value.processStyleSewings?.splice(index, 1);
  } else if (type === PROCESS_ENUM.CROP) {
    croppingList.value.splice(index, 1);
  } else if (type === PROCESS_ENUM.AFTER) {
    afterList.value.splice(index, 1);
  } else if (type === PROCESS_ENUM.MANUAL) {
    manualList.value.splice(index, 1);
  }
};

// 工序款式模板数据
const templateListData = ref<templateData_type>({
  loading: false,
  list: [],
});
// 工序款式模板搜索
const handleSearchTemplate = async (query: string) => {
  if (!detailInfo.value.regionId) {
    ElMessage.warning('请先选择所属区域');
    return;
  }
  if (query) {
    templateListData.value.loading = true;
    const { data } = await getStyleTemplatePage({
      regionId: detailInfo.value.regionId,
      styleName: query,
      pageNum: 1,
      pageSize: 200,
    });
    const list: IStyleTemplatePageResListItem[] = [];
    data.list.forEach((item) => {
      if (item.state === ENABLE_STATE.OPEN) {
        list.push(item);
      }
    });
    templateListData.value.list = list;
    templateListData.value.loading = false;
  } else {
    templateListData.value.list = [];
  }
};

const initList = (data: IStyleTemplateDetailRes, isAdd: boolean) => {
  // 车缝数据
  const list: IStyleTemplateCreateReqProcessStyleSwingsItem[] = [];

  data.processStyleSewings.forEach((item) => {
    const pItem: IStyleTemplateCreateReqProcessStyleSwingsItem = {
      componentName: item.componentName,
      processName: item.processName,
      plmSewingType: item.plmSewingType,
      plmSewingName: item.plmSewingName,
      picture: (item.picture
        ? [
          {
            url: item.picture,
          },
        ]
        : []) as unknown as string,
      processDescribe: item.processDescribe,
      estimatedTime: item.estimatedTime,
      // 分钟工资
      minutelyPay: item.minutelyPay,
      // 金额
      amount: item.amount,
      remark: item.remark,
    };
    if (!isAdd) {
      pItem.sewingProcessId = item.sewingProcessId;
    }
    list.push(pItem);
  });
  detailInfo.value.processStyleSewings = list;
  // 裁剪、后道、专机/手工数据
  const cList: IStyleTemplateCreateReqProcessStyleAnotherProcessItem[] = [];
  const aList: IStyleTemplateCreateReqProcessStyleAnotherProcessItem[] = [];
  const mList: IStyleTemplateCreateReqProcessStyleAnotherProcessItem[] = [];
  data.processStyleAnotherProcess.forEach((item) => {
    const anotherItem: IStyleTemplateCreateReqProcessStyleAnotherProcessItem = {
      processDescribe: item.processDescribe,
      dosage: formatFloat(item.dosage, { pos: 0 }),
      unit: item.unit,
      remark: item.remark,
      price: formatFloat(item.price, { pos: 2 }),
    };
    if (!isAdd) {
      anotherItem.anotherProcessId = item.anotherProcessId;
    }
    if (item.processStepCode === PROCESS_ENUM.CROP) {
      anotherItem.processStepCode = PROCESS_ENUM.CROP;
      anotherItem.processStepName = '裁剪';
      cList.push(anotherItem);
    } else if (item.processStepCode === PROCESS_ENUM.MANUAL) {
      anotherItem.processStepCode = PROCESS_ENUM.MANUAL;
      anotherItem.processStepName = '专机/手工';
      mList.push(anotherItem);
    } else if (item.processStepCode === PROCESS_ENUM.AFTER) {
      anotherItem.processStepCode = PROCESS_ENUM.AFTER;
      anotherItem.processStepName = '后道';
      aList.push(anotherItem);
    }
  });
  croppingList.value = cList;
  afterList.value = aList;
  manualList.value = mList;
};
// 获取明细
const getProcessDetails = async (isAdd: boolean, id?: string) => {
  let processId = '';
  if (id) {
    processId = id;
  } else {
    lastReferenceId.value = detailInfo.value.referenceId;
    if (detailInfo.value.referenceId) {
      processId = detailInfo.value.referenceId;
    } else {
      return;
    }
  }
  const { data } = await styleTemplateDetail(processId);
  /**
   * 复制数据
   */
  initList(data, isAdd);
  if (id) {
    detailInfo.value.regionId = data.regionId;
    detailInfo.value.regionName = data.regionName;
    detailInfo.value.styleName = data.styleName;
  }
};

const reset = () => {
  detailInfo.value.regionId = '';
  detailInfo.value.regionName = '';
  detailInfo.value.styleName = '';
  detailInfo.value.referenceId = '';
  detailInfo.value.processStyleSewings = [{
    minutelyPay: DEFAULT_MINUTE_WAGE,
  } as IStyleTemplateCreateReqProcessStyleSwingsItem];
  croppingList.value = [];
  afterList.value = [];
  manualList.value = [];
  // selectTemplateCode.value = '';
  // handleReset();
  setTimeout(() => {
    formRef.value?.clearValidate();
    tableRef.value?.clearValidate();
    croppingRef.value?.clearValidate();
    afterRef.value?.clearValidate();
    manualRef.value?.clearValidate();
  });
};

const handleChangeRegion = (val: string) => {
  const item = REGION_LIST.find(v => v.value === val);
  detailInfo.value.regionName = item?.label ?? '';
};

const handleChangeSewingType = (val: string, row: IStyleTemplateCreateReqProcessStyleSwingsItem) => {
  const item = sewingTypeList.value?.find(v => v.valueCode === val);
  row.plmSewingName = item?.value ?? '';
};

// 校验数据是否有效
const checkAnotherData = (list:
IStyleTemplateCreateReqProcessStyleAnotherProcessItem[]): IStyleTemplateCreateReqProcessStyleAnotherProcessItem[] => {
  const checkList: IStyleTemplateCreateReqProcessStyleAnotherProcessItem[] = [];
  list.forEach((item) => {
    if (item.dosage || item.price || item.processDescribe || item.remark || item.unit) {
      checkList.push({
        ...item,
      });
    }
  });
  return checkList;
};

const handleSave = async () => {
  if (!detailInfo.value.processStyleSewings?.length) {
    ElMessage.warning('车缝至少有一条内容');
    return;
  }
  await formRef.value?.validate();
  await tableRef.value?.validate(true);
  await croppingRef.value?.validate(true);
  await afterRef.value?.validate(true);
  await manualRef.value?.validate(true);

  const options: IStyleTemplateCreateReq = {
    styleName: detailInfo.value.styleName,
    regionId: detailInfo.value.regionId,
    regionName: detailInfo.value.regionName,
    referenceId: lastReferenceId.value,
    processStyleSewings: cloneDeep(detailInfo.value?.processStyleSewings)?.map((item) => {
      if (isArray(item.picture)) {
        item.picture = (item.picture as unknown as IFile[])?.[0]?.url ?? '';
      }
      return item;
    }),
    // processStyleAnotherProcess: croppingList.value.concat(afterList.value, manualList.value),
    processStyleAnotherProcess: [
      ...checkAnotherData(croppingList.value),
      ...checkAnotherData(afterList.value),
      ...checkAnotherData(manualList.value),
    ],
  };
  if (currentRoute.query.id) {
    options.processStyleTemplateId = currentRoute.query.id as string;
    await styleTemplateEdit(options);
  } else {
    await styleTemplateCreate(options);
  }
  ElMessage.success('操作成功');
  if (isContinue.value === YES_NO_STRING_ENUM.NO) {
    router.back();
  } else {
    // 继续新增
    reset();
  }
};
if (currentRoute.query.id) {
  getProcessDetails(false, currentRoute.query.id as string);
}

const changeMinuteWageAndEstimatedTime = (
  row: IStyleTemplateCreateReqProcessStyleSwingsItem,
) => {
  if (row.minutelyPay && row.estimatedTime) {
    row.amount = formatFloat(times(row.minutelyPay, row.estimatedTime), {
      pos: 2,
    });
  }
};

/**
 * @description 工时 = 金额 / 分钟工资，保留两位小数；分钟工资 = 金额 / 工时，保留两位小数；
 * @description 1、若工时有值，分钟没值，动态调整分钟工资；2、若分钟工资有值，工时没值，动态调整工时；3、若工时、分钟工资、金额都有值，改变金额，动态调整工时；
 * @param row 当前行
 */
const changeAmount = (row: IStyleTemplateCreateReqProcessStyleSwingsItem) => {
  if ((row.amount && row.minutelyPay && !row.estimatedTime) || (row.amount && row.minutelyPay && row.estimatedTime)) {
    row.estimatedTime = formatFloat(divide(row.amount, row.minutelyPay), {
      pos: 2,
    });
  } else if ((row.amount && row.estimatedTime && !row.minutelyPay)
  || (row.amount && row.estimatedTime && row.minutelyPay)) {
    row.minutelyPay = formatFloat(divide(row.amount, row.estimatedTime), {
      pos: 2,
    });
  }
};

const formatNumber = (
  row: IStyleTemplateCreateReqProcessStyleSwingsItem,
  key: keyof IStyleTemplateCreateReqProcessStyleSwingsItem
) => {
  const val = row[key];
  if (!val || Number.isNaN(Number(val))) {
    return;
  }
  row[key] = formatFloat(Number(val), {
    pos: 2,
  });
};
// 校验值是否存在字典中
const checkSewingType = (val: string, list: IdictValuesItem[]) => {
  return list?.find(n => n.valueCode === val);
};
watch(() => detailInfo.value.processStyleSewings, () => {
  if (detailInfo.value.processStyleSewings?.length && sewingTypeList.value?.length) {
    detailInfo.value.processStyleSewings?.forEach((item) => {
      if (item.plmSewingType && !checkSewingType(item.plmSewingType, sewingTypeList.value)) {
        item.plmSewingType = '';
      }
    });
  }
}, {
  deep: true,
});
watch(() => sewingTypeList.value, () => {
  if (detailInfo.value.processStyleSewings?.length && sewingTypeList.value?.length) {
    detailInfo.value.processStyleSewings?.forEach((item) => {
      if (item.plmSewingType && !checkSewingType(item.plmSewingType, sewingTypeList.value)) {
        item.plmSewingType = '';
      }
    });
  }
}, {
  deep: true,
});
</script>

<template>
  <sc-app-page>
    <template #fheader>
      <el-form
        ref="formRef"
        class="fixed-el-form-item-height search-form"
        :model="detailInfo"
        :inline="true"
        :rules="{
          regionId: [
            {
              required: true,
              message: '请选择所属区域',
              trigger: ['change', 'blur'],
            }
          ],
          styleName: [
            {
              required: true,
              message: '请输入工序款式名称',
              trigger: ['change', 'blur'],
            },
            {
              max: 50,
              message: '长度50以内',
              trigger: ['change', 'blur'],
            }
          ]
        }"
      >
        <el-form-item label="所属区域" prop="regionId">
          <el-select
            v-model="detailInfo.regionId"
            placeholder="请选择所属区域"
            clearable
            @change="handleChangeRegion"
          >
            <el-option
              v-for="item of REGION_LIST"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>

        <el-form-item label="工序款式名称" prop="styleName">
          <el-input
            v-model.trim="detailInfo.styleName"
            clearable
            placeholder="请输入工序款式名称"
            maxlength="50"
          />
        </el-form-item>

        <el-form-item label="引用工序款式模版">
          <div class="tw-flex tw-items-center">
            <el-select
              v-model="detailInfo.referenceId"
              filterable
              clearable
              remote
              reserve-keyword
              placeholder="请输入模板名称搜索"
              :remote-method="handleSearchTemplate"
              :loading="templateListData.loading"
            >
              <el-option
                v-for="item in templateListData.list"
                :key="item.processStyleTemplateId"
                :value="item.processStyleTemplateId"
                :label="item.styleName"
              />
            </el-select>
            <el-button
              type="primary"
              :disabled="!detailInfo.referenceId"
              class="btn"
              @click="getProcessDetails(true)"
            >
              复制
            </el-button>
          </div>
        </el-form-item>
      </el-form>
    </template>

    <template #main>
      <div>
        <page-card title="一、车缝">
          <template #header-left>
            <el-button
              type="primary"
              @click="openAddDialog"
            >
              添加部件
            </el-button>
          </template>
          <custom-table
            ref="tableRef"
            :column="column"
            :data="detailInfo.processStyleSewings"
            :use-form-validation="true"
          >
            <template #operation="{ index }">
              <div class="tw-flex">
                <el-button type="text" @click="addprocessline(PROCESS_ENUM.CAR, index)">
                  添加
                </el-button>
                <el-button
                  v-if="detailInfo.processStyleSewings!.length > 1"
                  type="text"
                  class="text-color-danger"
                  @click="delRow(PROCESS_ENUM.CAR, index)"
                >
                  删除
                </el-button>
              </div>
            </template>
            <template #componentName="{ row }">
              <el-input v-model="row.componentName" />
            </template>
            <template #processName="{ row }">
              <el-input
                v-model="row.processName"
                type="textarea"
              />
            </template>
            <template #picture="{ row }">
              <uploader
                v-model="row.picture"
                accept=".png, .jpg, .jpeg"
                :limit="1"
                :size-limit="20"
                :paste="false"
                size="mini"
              />
            </template>
            <template #plmSewingType="{ row }">
              <el-select
                v-model="row.plmSewingType"
                @change="handleChangeSewingType($event, row)"
              >
                <el-option
                  v-for="item of sewingTypeList"
                  :key="item.valueCode"
                  :label="item.value"
                  :value="item.valueCode!"
                />
              </el-select>
            </template>
            <template #processDescribe="{ row }">
              <el-input
                v-model="row.processDescribe"
                type="textarea"
                :rows="4"
              />
            </template>
            <template #estimatedTime="{ row }">
              <number-basis
                v-model="row.estimatedTime"
                :precision="2"
                :min="0"
                :max="999.99"
                @blur="() => {
                  formatNumber(row, 'estimatedTime')
                  changeMinuteWageAndEstimatedTime(row)
                }"
              />
            </template>
            <template #minutelyPay="{ row }">
              <number-basis
                v-model="row.minutelyPay"
                :precision="2"
                :min="0"
                :max="999.99"
                @blur="() => {
                  formatNumber(row, 'minutelyPay')
                  changeMinuteWageAndEstimatedTime(row)
                }"
              />
            </template>
            <template #amount="{ row }">
              <number-basis
                v-model="row.amount"
                :precision="2"
                :min="0"
                :max="999.99"
                @blur="() => {
                  formatNumber(row, 'amount');
                  changeAmount(row);
                }"
              />
            </template>
            <template #remark="{ row }">
              <el-input
                v-model="row.remark"
              />
            </template>
          </custom-table>
        </page-card>
        <page-card title="二、裁剪">
          <template #header-left>
            <el-button type="primary" @click="addprocessline(PROCESS_ENUM.CROP, croppingList.length)">
              添加
            </el-button>
          </template>
          <custom-table
            ref="croppingRef"
            :column="anotherProcessColumn"
            :data="croppingList"
            :use-form-validation="true"
          >
            <template #operation="{ index }">
              <div class="tw-flex">
                <el-button type="text" @click="addprocessline(PROCESS_ENUM.CROP, index)">
                  添加
                </el-button>
                <el-button
                  type="text"
                  class="text-color-danger"
                  @click="delRow(PROCESS_ENUM.CROP, index)"
                >
                  删除
                </el-button>
              </div>
            </template>
            <template #processDescribe="{ row }">
              <el-input
                v-model="row.processDescribe"
                type="textarea"
              />
            </template>
            <template #dosage="{ row }">
              <input-number
                v-model="row.dosage"
                :max="999"
                :min="1"
                :precision="0"
              />
            </template>
            <template #unit="{ row }">
              <el-select
                v-model="row.unit"
              >
                <el-option
                  v-for="item of requirementUnitList"
                  :key="item.value"
                  :value="item.valueCode!"
                  :label="item.value"
                />
              </el-select>
            </template>
            <template #price="{ row }">
              <input-number
                v-model="row.price"
                :precision="2"
                :max="999.99"
                :min="0.01"
              />
            </template>
            <template #remark="{ row }">
              <el-input
                v-model="row.remark"
              />
            </template>
          </custom-table>
        </page-card>
        <page-card title="三、后道">
          <template #header-left>
            <el-button type="primary" @click="addprocessline(PROCESS_ENUM.AFTER, afterList.length)">
              添加
            </el-button>
          </template>
          <custom-table
            ref="afterRef"
            :column="anotherProcessColumn"
            :data="afterList"
            :use-form-validation="true"
          >
            <template #operation="{ index }">
              <div class="tw-flex">
                <el-button type="text" @click="addprocessline(PROCESS_ENUM.AFTER, index)">
                  添加
                </el-button>
                <el-button
                  type="text"
                  class="text-color-danger"
                  @click="delRow(PROCESS_ENUM.AFTER, index)"
                >
                  删除
                </el-button>
              </div>
            </template>
            <template #processDescribe="{ row }">
              <el-input
                v-model="row.processDescribe"
                type="textarea"
              />
            </template>
            <template #dosage="{ row }">
              <input-number
                v-model="row.dosage"
                :max="999"
                :min="1"
                :precision="0"
              />
            </template>
            <template #unit="{ row }">
              <el-select
                v-model="row.unit"
              >
                <el-option
                  v-for="item of requirementUnitList"
                  :key="item.value"
                  :value="item.valueCode!"
                  :label="item.value"
                />
              </el-select>
            </template>
            <template #price="{ row }">
              <input-number
                v-model="row.price"
                :precision="2"
                :max="999.99"
                :min="0.01"
              />
            </template>
            <template #remark="{ row }">
              <el-input
                v-model="row.remark"
              />
            </template>
          </custom-table>
        </page-card>
        <page-card title="四、专机/手工">
          <template #header-left>
            <el-button type="primary" @click="addprocessline(PROCESS_ENUM.MANUAL, manualList.length)">
              添加
            </el-button>
          </template>
          <custom-table
            ref="manualRef"
            :column="anotherProcessColumn"
            :data="manualList"
            :use-form-validation="true"
          >
            <template #operation="{ index }">
              <div class="tw-flex">
                <el-button type="text" @click="addprocessline(PROCESS_ENUM.MANUAL, index)">
                  添加
                </el-button>
                <el-button
                  type="text"
                  class="text-color-danger"
                  @click="delRow(PROCESS_ENUM.MANUAL, index)"
                >
                  删除
                </el-button>
              </div>
            </template>
            <template #processDescribe="{ row }">
              <el-input
                v-model="row.processDescribe"
                type="textarea"
              />
            </template>
            <template #dosage="{ row }">
              <input-number
                v-model="row.dosage"
                :max="999"
                :min="1"
                :precision="0"
              />
            </template>
            <template #unit="{ row }">
              <el-select
                v-model="row.unit"
              >
                <el-option
                  v-for="item of requirementUnitList"
                  :key="item.value"
                  :value="item.valueCode!"
                  :label="item.value"
                />
              </el-select>
            </template>
            <template #price="{ row }">
              <input-number
                v-model="row.price"
                :precision="2"
                :max="999.99"
                :min="0.01"
              />
            </template>
            <template #remark="{ row }">
              <el-input
                v-model="row.remark"
              />
            </template>
          </custom-table>
        </page-card>
      </div>
      <div
        class="footer-row"
      >
        <div v-if="!currentRoute.query.id" class="next-contain">
          <span class="footer-title">是否继续添加</span>
          <el-radio-group v-model="isContinue">
            <el-radio :label="YES_NO_STRING_ENUM.YES">
              是
            </el-radio>
            <el-radio :label="YES_NO_STRING_ENUM.NO">
              否
            </el-radio>
          </el-radio-group>
        </div>

        <el-button v-if="!currentRoute.query.id" @click="reset">
          重置
        </el-button>
        <el-button
          type="primary"
          @click="handleSave"
        >
          保存
        </el-button>
      </div>
    </template>
    <AddDialog
      v-model="showAddDialog"
      :region-id="detailInfo.regionId"
      @success="addProcess"
    />
  </sc-app-page>
</template>

<style lang="scss" scoped>
.process-item {
  margin-bottom: 30px;
  &>h3 {
    margin-bottom: 10px;
    .el-button {
      margin-left: 10px;
    }
  }
}
.footer-row {
  display: flex;
  height: 50px;
  padding: 0 15px;
  justify-content: flex-end;
  align-items: center;
  border: 1px solid var(--el-border-color-base);
  border-top: 0;
}
.autocomplete-text {
  padding: 0 15px;
  margin: 0 -20px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.footer-title {
  display: inline-block;
  width: 100px;
  color: var(--el-text-color-regular);
  font-size: 14px;
}
.next-contain {
  margin-right: 20px;
}
.btn {
  margin-left: 10px;
}
.search-form {
  .el-input, .el-select {
    min-width:188px;
  }
}
</style>
