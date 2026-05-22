<template>
  <sc-app-page>
    <template #fheader>
      <sc-search-area
        v-model="params"
        :config="searchConfig"
        labelWidth="120px"
        @handleSearch="handleSearch"
        @handleReset="handleReset"
      >
        <template #selector>
          <query-select-my
            v-model="params.submitterName"
            model-type="name"
            @handleSearch="handleSearch"
          />
        </template>
        <template #creator>
          <user-query-select
            ref="userQuerySelect"
            v-model="params.creatorIds"
            multiple
            @handleSearch="handleSearch"
          />
        </template>
        <template #category>
          <div @click="categoryDialogFun" style="cursor: pointer;width: 100%">
            <div style="pointer-events: none">
              <div>
                <el-select
                  readonly
                  style="width: 100%"
                  v-model="params.identifiedCategoryName"
                  placeholder="请选择识别品类"
                >
                  <!-- <el-option
                    v-for="item in []"
                    :key="item.code"
                    :label="item.value"
                    :value="item.code"
                  /> -->
                </el-select>
              </div>
            </div>
          </div>
        </template>

      </sc-search-area>
    </template>
    <template #header>
      <el-row justify="space-between">
        <div>
          <sc-condition-select
            v-model="params.submitStatus"
            :condition-info="conditionResult"
            @conditionChange="handleSearch()"
          />
        </div>
        <div class="tw-flex">
          <el-button
            v-if="CXSB"
            @click="() => handleReIdentification()"
            :disabled="batchDisabled"
          >
            重新识别
          </el-button>
          <el-button
            v-if="DCSJ"
            @click="() => handleExport()"
            :loading="exportLoading"
          >
            导出数据
          </el-button>
          <el-button
            v-if="DRLGT"
            @click="() => handleImportDataOpenDialog()"
          >
            导入灵感图
          </el-button>
          <el-button
            v-if="TJRW && params.submitStatus === SUBMIT_STATUS_ENUM.WAIT"
            type="primary"
            @click="() => handleSubmit()"
            :disabled="batchDisabled"
          >
            提交任务
          </el-button>
          <el-button
            v-if="SC"
            type="danger"
            @click="handleRemove"
            :disabled="batchDisabled"
          >
            删除
          </el-button>
        </div>
      </el-row>
    </template>
    <template #main>
      <sc-table
        height="100%"
        key="aigc-result"
        :data="tableData"
        :columns="tableColumns"
      />
    </template>
    <template #ffooter>
      <el-row
        style="width: 100%"
        type="flex"
        justify="end"
      >
        <pagination
          :total="tableTotal"
          :current-page="params.pageNum"
          :page-size="params.pageSize"
          :page-sizes="[20, 50, 100]"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </el-row>
    </template>
    <task-config-dialog
      ref="taskConfigDialogRef"
      v-model="isShowSubmitDialog"
      :ids="selectIds"
      :selectItems="selectItems"
      :is-batch="isBatchSubmit"
      :task-data="submitTaskData"
      @success="() => handleSearch(params.pageNum)"
      @next="handleSubmitNext"
    />
    <el-dialog
      v-model="dialogFormVisible"
      title="编辑识别品类"
      width="500"
    >
      <el-form :model="form" ref="ElementFormRef">
        <el-form-item
          label="识别品类"
          label-width="100px"
          prop="categoryName"
          :rules="[{ required: true, message: '请选择识别品类', trigger: 'change' }]"
        >
          <div
            @click="identifiedCategoryFun"
            class="tw-w-100%"
            style="cursor: pointer;"
          >
            <div style="pointer-events: none">
              <div>
                <el-select
                  readonly
                  style="width: 100%"
                  v-model="form.categoryName"
                  placeholder="请选择识别品类"
                />
              </div>
            </div>
          </div>
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取消</el-button>
          <el-button type="primary" @click="identifiedCategoryConfirm">
            确定
          </el-button>
        </div>
      </template>
    </el-dialog>
  </sc-app-page>
</template>
<script lang="ts" setup>
import { ref, computed, onMounted } from 'vue';
import { useList } from '@toy/v-use';
import { useSearch } from './hooks/use-search';
import { useListColumns } from './hooks/use-table-columns';
import { useImportDataDialog } from './hooks/use-import-data-dialog';
import UserQuerySelect from '@/components/user-query-select/index.vue';
import QuerySelectMy from '@/components/query-select-my/index.vue';
import {
  inspirationPage,
  inspirationExport,
  inspirationRemove,
  reIdentification,
  inspirationEditImageApi,
  inspirationEditCategoryApi
} from '@/modules/inspiration-center/inspiration-source/api';
import {
  IDENTIFY_STATUS_ENUM,
  SUBMIT_STATUS_ENUM,
  DATA_SOURCE_ENUM,
} from '@/modules/inspiration-center/inspiration-source/constant';
import TaskConfigDialog from '@/modules/inspiration-center/inspiration-source/components/task-config-dialog.vue';
import { ITableItem, IImportSupplyOptions } from './type';
// @ts-ignore
// eslint-disable-next-line import/extensions
import { IInspirationPageRes, IInspirationPageResIdentifiedLabelItem, IInspirationPageResListItem } from '../../api/type';
import { useDictionary } from '@/hooks/use-dictionary2';
import { DICTIONARY_KEY } from '@/constant/dictionary';
import { usePermissionConfig } from '../../use-permission-config';
import { ElMessage, ElMessageBox, ElMessageBoxOptions } from 'element-plus';
import { useAccountStore } from '@/store/account';
import categoryDialog from '@/components/categoryDialog';
import { handleGetCategory } from './hooks/use-get-options';
import type { ElForm } from 'element-plus';

// 定义接口描述组件拥有的方法
interface UserQuerySelectComponent {
  defaultSeeMe: () => void;
  // 可以添加其他方法或属性
}
const userQuerySelect = ref<UserQuerySelectComponent | null>(null);
const accountStore = useAccountStore();
const { TJRW, DCSJ, DRLGT, SC, CXSB } = usePermissionConfig();
const { dictionaryNextTick, getDictionaryOptions } = useDictionary(
  [DICTIONARY_KEY.SUPPLY_MODE],
  { apiLoading: true },
);
const ElementFormRef = ref<InstanceType<typeof ElForm> | null>(null);
// getEnableDictionaryOptions 获取可用的
// getDictionaryOptions 获取全部
const supplyOptions = computed(() => getDictionaryOptions(DICTIONARY_KEY.SUPPLY_MODE));
const isShowSubmitDialog = ref(false);
const taskConfigDialogRef = ref<InstanceType<typeof TaskConfigDialog>>();
const { account } = accountStore;
const newId = account?.id ?? '';
onMounted(() => {
  if (userQuerySelect.value) {
    userQuerySelect.value.defaultSeeMe();
  }
});
const {
  params,
  tableTotal,
  tableData,
  handleSearch,
  handleReset,
  handleSizeChange,
  handleCurrentChange,
} = useList({
  request: {
    api: inspirationPage,
    params: {
      creatorIds: [newId],
      externalCategory: '',
      inspirationStartCreatedTime: '',
      inspirationEndCreatedTime: '',
      suggestedSupplyModeCode: '',
      inspirationSource: '',
      sourceCountrySiteCode: '',
      identifiedResult: '' as unknown as IDENTIFY_STATUS_ENUM,
      inspirationSubmitCount: null as unknown as number,
      submitStatus: SUBMIT_STATUS_ENUM.WAIT,
      creatorName: '',
      submitterName: '',
      dataSourceCode: '' as unknown as DATA_SOURCE_ENUM,
      planningSourceCode: '',
      pageNum: 1,
      pageSize: 20,
    },
  },
  response: {
    handleResponseData(list: IInspirationPageResListItem[]) {
      const res: any = list.map((i:IInspirationPageResListItem) => {
        const { inspirationId, planningSourceName, waveBatchName, inspirationImage, externalCategory, retailPrice,
          salePrice, inspirationImageSource, sourceCountrySiteName, suggestedSupplyModeCode, inspirationCreatedTime,
          dataSource, identifiedCategory, identifiedStatus, identifiedLabel, styleType, submitCount, waveBatchCode,
          submitStatus, inspirationCode, creatorName, creatorId, inspirationBrand, identifiedCategoryCode, styleSourceCode, styleSourceName } = i;
        const { label: supplyName = '' } = supplyOptions.value.find((j: IImportSupplyOptions) => j.value === suggestedSupplyModeCode) ?? {};
        return {
          id: inspirationId,
          isSelect: false,
          planSource: planningSourceName,
          waves: waveBatchName,
          wavesCode: waveBatchCode,
          inspirationImg: inspirationImage,
          outCategory: externalCategory,
          country: sourceCountrySiteName,
          inspirationImageSource,
          price: salePrice,
          uPrice: retailPrice,
          supplyName,
          supplyMode: suggestedSupplyModeCode,
          createdTime: inspirationCreatedTime,
          dataSource,
          category: identifiedCategory,
          result: identifiedStatus,
          styleType,
          inspirationCode,
          tags: identifiedLabel.map((j: IInspirationPageResIdentifiedLabelItem) => `${j.key}：${j.value}`),
          submitNum: submitCount,
          status: submitStatus,
          creatorName,
          creatorId,
          inspirationBrand,
          identifiedCategoryCode,
          styleSourceName,
          styleSourceCode,
        };
      });
      checkAll.value = false;
      isIndeterminate.value = false;
      return res;
    },
  }
});
const { searchConfig, conditionResult } = useSearch();
const { handleOpenDialog: handleImportDataOpenDialog } = useImportDataDialog({ handleSuccess: handleSearch });

const selectIds = ref<string[]>([]);
const submitTaskData = ref({} as ITableItem);
const isBatchSubmit = ref(false);
const batchDisabled = computed(() => !tableData.value.some((i:ITableItem) => i.isSelect));
// 重新识别
const handleReIdentification = () => {
  const listIds:string[] = tableData.value.filter((i:ITableItem) => i.isSelect && i.result === 2 && i.status === 0).map((i: ITableItem) => i.id);
  if (!listIds.length) {
    ElMessage({
      message: '请勾选【待提交】且识别结果为【识别失败】的灵感进行操作',
      type: 'warning',
    });
    return;
  }

  ElMessageBox.confirm(
    '是否要将选中的数据重新识别？',
    '提示',
    {
      confirmButtonText: '确认',
      cancelButtonText: '取消',
      type: 'warning',
      beforeClose: (action: 'confirm' | 'cancel' | 'close', instance: ElMessageBoxOptions | any, done: () => void): void => {
        if (action === 'confirm') {
          instance.confirmButtonLoading = true;
          reIdentification({
            inspirationIds: listIds
          }).then(() => {
            instance.confirmButtonLoading = false;
            done();
            handleSearch(1);
            ElMessage.success('识别成功');
          }).finally(() => {
            instance.confirmButtonLoading = false;
          });
        } else {
          done();
        }
      }
    },
  ).catch(() => {
    // 取消操作的处理
  });
};
const selectItems = ref<ITableItem[]>([]);
/** 打开提交任务弹窗 */
const handleSubmit = (id?: string, item?: ITableItem) => {
  if (id) {
    selectIds.value = [id];
    isBatchSubmit.value = false;
    submitTaskData.value = tableData.value.find((i: ITableItem) => i.id === id)!;
    if (item) {
      selectItems.value = [item];
    }
    taskConfigDialogRef.value?.handleShowGenerate('', item);
  } else {
    isBatchSubmit.value = true;
    selectIds.value = tableData.value.filter((i: ITableItem) => i.isSelect).map((i: ITableItem) => i.id);
    selectItems.value = tableData.value.filter((i: ITableItem) => i.isSelect);
    isShowSubmitDialog.value = true;
  }
};

/** 提交后查看下一下款 */
const handleSubmitNext = async (id: string) => {
  const idx = tableData.value.findIndex((i: ITableItem) => i.id === id);
  let nextId = tableData.value[idx + 1]?.id;
  let item:ITableItem = tableData.value[idx + 1];
  if (idx + 1 === tableData.value.length) {
    params.value.pageNum += 1;
    await handleSearch(params.value.pageNum);
    nextId = tableData.value[0]?.id;
    [item] = tableData.value;
  }
  if (nextId) {
    handleSubmit(nextId, item);
  } else {
    isShowSubmitDialog.value = false;
  }
};
const inspirationEditImageApiFun = (data: any) => {
  inspirationEditImageApi(data).then(() => {
    handleSearch(1);
    ElMessage.success('编辑成功');
  });
};
const dialogFormVisible = ref<boolean>(false);

const editorIdentifieCcategories = (id: string) => {
  dialogFormVisible.value = true;
  form.value.inspirationId = id;
};
const { tableColumns, checkAll, isIndeterminate, form } = useListColumns({
  tableData,
  handleSuccess: handleSearch,
  handleSubmit,
  inspirationEditImageApiFun,
  editorIdentifieCcategoriesFun: editorIdentifieCcategories,
});


const exportLoading = ref(false);
const handleExport = async () => {
  exportLoading.value = true;
  await inspirationExport(params.value).finally(() => {
    exportLoading.value = false;
  });
};


const handleRemove = async () => {
  let waitToRemove = tableData.value.filter((i: ITableItem) => i.isSelect && (i.status === SUBMIT_STATUS_ENUM.WAIT));

  if (waitToRemove.length === 0) {
    ElMessage.warning('只有待提交的灵感图才能删除');
    return;
  }

  // const { account } = accountStore;
  waitToRemove = waitToRemove.filter((i: ITableItem) => i.creatorId === account?.id);

  if (waitToRemove.length === 0) {
    ElMessage.warning('只有本人创建的灵感图才能删除');
    return;
  }

  await inspirationRemove(waitToRemove.map((i: ITableItem) => i.id));

  ElMessage.success('删除成功');
  handleSearch(1);
};

// 识别品类
const treeList = ref<any>([]);
const getCategoryList = async () => {
  treeList.value = await handleGetCategory();
};

const init = async () => {
  await dictionaryNextTick();
  handleSearch();
  getCategoryList();
};

init();


const categoryDialogFun = () => {
  categoryDialog(treeList.value, '', '').then((res: unknown) => {
    const r = res as IImportSupplyOptions;
    params.value.identifiedCategoryName = r.value;
    params.value.identifiedCategoryCode = r.code;
  });
};
const identifiedCategoryFun = () => {
  categoryDialog(treeList.value, '', '').then((res: unknown) => {
    const r = res as IImportSupplyOptions;
    form.value.categoryName = r.value || '';
    form.value.categoryCode = r.code || '';
    // params.value.identifiedCategoryCode = r.code;
  });
};

const identifiedCategoryConfirm = async () => {
  await ElementFormRef.value!.validate();
  inspirationEditCategoryApi([form.value]).then(() => {
    ElMessage.success('操作成功');
    handleSearch();
    dialogFormVisible.value = false;
  });
};
</script>
