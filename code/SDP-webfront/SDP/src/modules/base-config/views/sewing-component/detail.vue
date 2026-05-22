<script lang="ts" setup>
import { ref, computed, watch } from 'vue';
import type { ElForm } from 'element-plus';
import { ElMessage } from 'element-plus';
import { useRouter, useRoute } from 'vue-router';
import { YES_NO_STRING_ENUM, REGION_LIST } from '@/constant';
import {
  sewingComponentTemplatePag,
  sewingComponentTemplateCreate,
  sewingComponentTemplateDetail,
  sewingComponentTemplateUpdate,
} from './api';
import { column } from './hooks/use-columns';
import { useDictionary } from '@/hooks-transfer/use-dict';
import type {
  ISewingComponentTemplateCreateReq,
  ISewingComponentTemplateCreateReqSewingProcessListItem,
  ISewingComponentTemplatePageResListItem,
  ISewingComponentTemplateDetailResSewingProcessListItem,
} from './api/type';
import type { TableInstanceRef } from '@/components/custom-table/types';
import { isArray, cloneDeep } from 'lodash-es';
import { IFile } from '@/components/uploader/packages/types';
import type { IdictValuesItem } from '@/api/dict/types';
import { DEFAULT_MINUTE_WAGE, ENABLE_STATE } from '../../constant';
import { divide, formatFloat, times } from '@toy/utils';

interface templateData_type {
  loading: boolean;
  list: ISewingComponentTemplatePageResListItem[];
}
const router = useRouter();
const currentRoute = useRoute();

const formRef = ref<InstanceType<typeof ElForm>>();
const tableRef = ref<TableInstanceRef>();

// 字典
const { batchDictListMap } = useDictionary([
  'plm_sewing_type',
]);

// 车缝车种
const sewingTypeList = computed(() => batchDictListMap.value.plm_sewing_type);

const detailInfo = ref<ISewingComponentTemplateCreateReq>({
  sewingProcessList: [{
    minutelyPay: DEFAULT_MINUTE_WAGE,
  }],
});

const isContinue = ref(YES_NO_STRING_ENUM.NO);

// 添加一行数据
const addprocessline = (index: number) => {
  detailInfo.value.sewingProcessList?.splice(index + 1, 0, {
    minutelyPay: DEFAULT_MINUTE_WAGE,
  } as ISewingComponentTemplateCreateReqSewingProcessListItem);
};

// 删除一条车缝数据
const delRow = (index: number) => {
  detailInfo.value.sewingProcessList?.splice(index, 1);
};

// 工序款式模板数据
const templateListData = ref<templateData_type>({
  loading: false,
  list: [],
});
// 模板搜索
const handleSearchTemplate = async (query: string) => {
  if (!detailInfo.value.regionId) {
    ElMessage.warning('请先选择所属区域');
    return;
  }
  if (query) {
    templateListData.value.loading = true;
    const { data } = await sewingComponentTemplatePag({
      regionId: detailInfo.value.regionId,
      componentName: query,
      pageNum: 1,
      pageSize: 200,
    });
    const list: ISewingComponentTemplatePageResListItem[] = [];
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

const changeRegion = (val: string) => {
  REGION_LIST.forEach((item) => {
    if (item.value === val) {
      detailInfo.value.regionName = item.label;
    }
  });
  templateListData.value.list = [];
};

const changeSewingType = (val: string, index: number) => {
  sewingTypeList.value.forEach((item) => {
    if (item.valueCode === val) {
      detailInfo.value.sewingProcessList[index].plmSewingName = item.value;
    }
  });
};
const initList = (list: ISewingComponentTemplateDetailResSewingProcessListItem[], isAdd: boolean) => {
  const tlist: ISewingComponentTemplateCreateReqSewingProcessListItem[] = [];
  list.forEach((item) => {
    const tItem: ISewingComponentTemplateCreateReqSewingProcessListItem = {
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
      tItem.sewingProcessId = item.sewingProcessId;
    }
    tlist.push(tItem);
  });
  detailInfo.value.sewingProcessList = tlist;
};
// 获取详情
const getDetails = async (isAdd: boolean, id?: string) => {
  let componentId = '';
  if (id) {
    componentId = id;
  } else if (detailInfo.value.referenceId) {
    componentId = detailInfo.value.referenceId;
  } else {
    return;
  }
  const { data } = await sewingComponentTemplateDetail(componentId);
  // 复制
  initList(data.sewingProcessList, isAdd);
  if (id) {
    detailInfo.value.componentName = data.componentName;
    detailInfo.value.regionId = data.regionId;
    detailInfo.value.regionName = data.regionName;
  }
};
if (currentRoute.query.id) {
  getDetails(false, currentRoute.query.id as string);
}

const reset = () => {
  detailInfo.value.sewingProcessList = [{
    minutelyPay: DEFAULT_MINUTE_WAGE,
  }];
  detailInfo.value.componentName = '';
  detailInfo.value.referenceId = '';
  detailInfo.value.referenceName = '';
  detailInfo.value.regionId = '';
  detailInfo.value.regionName = '';
  setTimeout(() => {
    formRef.value?.clearValidate();
    tableRef.value?.clearValidate();
  });
};

const handleSave = async () => {
  if (!detailInfo.value.sewingProcessList?.length) {
    ElMessage.warning('明细至少有一条内容');
    return;
  }
  await formRef.value?.validate();
  await tableRef.value?.validate(true);

  const options: ISewingComponentTemplateCreateReq = {
    componentName: detailInfo.value.componentName,
    regionId: detailInfo.value.regionId,
    regionName: detailInfo.value.regionName,
    referenceId: detailInfo.value.referenceId,
    sewingProcessList: cloneDeep(detailInfo.value?.sewingProcessList)?.map((item) => {
      if (isArray(item.picture)) {
        item.picture = (item.picture as unknown as IFile[])?.[0]?.url ?? '';
      }
      return item;
    }),
  };
  if (currentRoute.query.id) {
    options.sewingComponentTemplateId = currentRoute.query.id as string;
    await sewingComponentTemplateUpdate(options);
  } else {
    await sewingComponentTemplateCreate(options);
  }
  ElMessage.success('操作成功');
  if (isContinue.value === YES_NO_STRING_ENUM.NO) {
    router.back();
  } else {
    // 继续新增
    reset();
  }
};

/**
 * @description 金额 = 分钟工资 * 工时
 * @param row 当前行
 */
const changeMinuteWageAndEstimatedTime = (
  row: ISewingComponentTemplateCreateReqSewingProcessListItem,
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
const changeAmount = (row: ISewingComponentTemplateCreateReqSewingProcessListItem) => {
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
  row: ISewingComponentTemplateCreateReqSewingProcessListItem,
  key: keyof ISewingComponentTemplateCreateReqSewingProcessListItem
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
watch(() => detailInfo.value.sewingProcessList, () => {
  if (detailInfo.value.sewingProcessList?.length && sewingTypeList.value?.length) {
    detailInfo.value.sewingProcessList?.forEach((item) => {
      if (item.plmSewingType && !checkSewingType(item.plmSewingType, sewingTypeList.value)) {
        item.plmSewingType = '';
      }
    });
  }
}, {
  deep: true,
});
watch(() => sewingTypeList.value, () => {
  if (detailInfo.value.sewingProcessList?.length && sewingTypeList.value?.length) {
    detailInfo.value.sewingProcessList?.forEach((item) => {
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
        :inline="true"
        :model="detailInfo"
        :rules="{
          regionId: [
            {
              required: true,
              message: '请选择所属区域',
              trigger: ['change', 'blur'],
            }
          ],
          componentName: [
            {
              required: true,
              message: '请输入工序部件',
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
            clearable
            placeholder="请选择所属区域"
            @change="changeRegion"
          >
            <el-option
              v-for="item of REGION_LIST"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>

        <el-form-item label="工序部件" prop="componentName">
          <el-input
            v-model.trim="detailInfo.componentName"
            clearable
            placeholder="请输入工序部件"
            maxlength="50"
          />
        </el-form-item>

        <el-form-item label="引用部件模版">
          <el-select
            v-model="detailInfo.referenceId"
            filterable
            remote
            clearable
            reserve-keyword
            placeholder="请输入模板名称搜索"
            :remote-method="handleSearchTemplate"
            :loading="templateListData.loading"
            class="modelSearch-select"
          >
            <el-option
              v-for="item in templateListData.list"
              :key="item.sewingComponentTemplateId"
              :value="item.sewingComponentTemplateId"
              :label="item.componentName"
            />
          </el-select>
          <el-button
            type="primary"
            :disabled="!detailInfo.referenceId"
            class="btn"
            @click="getDetails(true)"
          >
            复制
          </el-button>
        </el-form-item>
      </el-form>
    </template>

    <template #main>
      <div>
        <page-card title="工序明细">
          <custom-table
            ref="tableRef"
            :column="column"
            :data="detailInfo.sewingProcessList"
            :use-form-validation="true"
          >
            <template #operation="{ index }">
              <el-button type="text" @click="addprocessline(index)">
                添加
              </el-button>
              <el-button
                v-if="detailInfo.sewingProcessList!.length > 1"
                type="text"
                class="text-color-danger"
                @click="delRow(index)"
              >
                删除
              </el-button>
            </template>
            <template #picture="{ row }">
              <uploader
                v-model="row.picture"
                accept=".png,.jpg,.jpeg"
                :limit="1"
                :size-limit="20"
                :paste="false"
                size="mini"
              />
            </template>
            <template #processName="{ row }">
              <el-input
                v-model="row.processName"
                type="textarea"
              />
            </template>
            <template #plmSewingType="{ row, index }">
              <el-select
                v-model="row.plmSewingType"
                @change="(val) => changeSewingType(val, index)"
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
        <el-button
          v-if="!currentRoute.query.id"
          @click="reset"
        >
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
  justify-content: flex-end;
  align-items: center;
  height: 50px;
  padding: 0 15px;
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
.fixed-el-form-item-height .el-form-item .modelSearch-select {
  width: auto;
}
.btn {
  vertical-align: top;
  margin-left: 10px
}
.search-form {
  .el-input, .el-select {
    min-width:188px;
  }
}
</style>
