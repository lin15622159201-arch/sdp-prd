<script lang="ts" setup>
import { ref, computed } from 'vue';
import type { AutocompleteFetchSuggestionsCallback, ElForm } from 'element-plus';
import { ElMessage } from 'element-plus';
import { useRouter } from 'vue-router';
import { YES_NO_STRING_ENUM } from '@/constant';
import useDetail from './hooks/use-detail';
import useSizeTemplate from './hooks/use-size-template';
import useComposeHandle from './hooks/use-compose-handle';
import { saveSizeTempalteDetail, saveSizeTempalteDetailUpdateApi } from './api';
import type {
  ITemplateDetailedInfoSizeInfoJsonsItem,
} from './api/type';
import type { IColumnProp, TableInstanceRef } from '@/components/custom-table/types';
import { SIZE_DIMENSION_LIST } from '../../constant';

const router = useRouter();

const formRef = ref<InstanceType<typeof ElForm>>();
const tableRef = ref<TableInstanceRef>();

const {
  categoryTreeList,
  categoryData,
  detailInfo,
  templateCode,

  handleGetDetail,
  handleReset,
  handleCategory,
  setSizeListDefaultData,
} = useDetail();
const {
  templateListData,
  handleSearchTemplate,
} = useSizeTemplate({
  threeCategory: computed(() => detailInfo.value.threeCategory || ''),
});

const {
  getDisabled,
  handleCheck,

  partsMeasurementVOListMap,

  positionList,
  handlePositionChange,
  filterMethod,
} = useComposeHandle(computed(() => detailInfo.value.sizeInfoJsons!));

const selectTemplateCode = ref('');

const isContinue = ref(YES_NO_STRING_ENUM.NO);

const handleCopy = async () => {
  if (!selectTemplateCode.value) return;
  if (selectTemplateCode.value === detailInfo.value.templateCode) return;

  const baseData = Object.create(null);
  // 保留旧模板名称，复制模板不复制名字
  baseData.templateName = detailInfo.value.templateName || '';
  // 编辑情况下，不要修改当前的id
  if (templateCode.value) {
    baseData.id = detailInfo.value.id;
  }

  await handleGetDetail(selectTemplateCode.value);
  Object.assign(detailInfo.value, baseData);
};

const querySearch = (cb: AutocompleteFetchSuggestionsCallback, position?: string) => {
  if (!position) {
    cb([]);
  }
  const partsMeasurementVOList = partsMeasurementVOListMap.value[position!] || [];
  // const _queryString = queryString.trim().toLocaleLowerCase();

  cb(partsMeasurementVOList);
};

const column: IColumnProp<ITemplateDetailedInfoSizeInfoJsonsItem>[] = [
  {
    fixed: 'left',
    slotKey: 'operation',
    label: '操作',
    width: '100px',
  },
  {
    label: '部位',
    slotKey: 'position',
    prop: 'position',
    rules: {
      required: true,
      message: '请选择部位',
      trigger: 'change',
    },
  },
  {
    label: '尺寸维度',
    prop: 'dimension',
    enum: SIZE_DIMENSION_LIST,
  },
  {
    label: '量法',
    slotKey: 'measureMethod',
    prop: 'measureMethod',
    rules: {
      required: true,
      message: '请选择量法',
      trigger: 'change',
    },
  },
  {
    label: '允差范围',
    prop: 'errorRange',
    render({ row }) {
      return `± ${row.errorRange ?? ''}`;
    },
  },
];

const delRow = (index: number) => {
  detailInfo.value.sizeInfoJsons?.splice(index, 1);
};

const reset = () => {
  selectTemplateCode.value = '';
  handleReset();
  setTimeout(() => {
    formRef.value?.clearValidate();
    tableRef.value?.clearValidate();
  });
};

const handleSave = async () => {
  await formRef.value?.validate();
  await tableRef.value?.validate(true);

  const { id, templateName, threeCategory, threeCategoryCode, sizeInfoJsons } = detailInfo.value;

  if (!sizeInfoJsons?.length) {
    ElMessage.warning('尺寸表至少有一条内容');
    return;
  }

  const ajaxData = {
    templateName: templateName!,
    threeCategory: threeCategory!,
    threeCategoryCode: threeCategoryCode!,
    sizeInfoJsons: sizeInfoJsons!,
  };
  // 新增
  if (!templateCode.value) {
    await saveSizeTempalteDetail(ajaxData);
  } else {
    (ajaxData as any).id = id;
    await saveSizeTempalteDetailUpdateApi(ajaxData);
  }

  ElMessage.success('操作成功');

  if (isContinue.value === YES_NO_STRING_ENUM.NO) {
    router.back();
  } else {
    // 继续新增
    reset();
  }
};
</script>

<template>
  <sc-app-page>
    <template #fheader>
      <el-form
        ref="formRef"
        class="fixed-el-form-item-height"
        label-width="110px"
        :model="detailInfo"
        :rules="{
          templateName: [
            {
              required: true,
              message: '请输入模板名称',
              trigger: ['change', 'blur'],
            }
          ],
          threeCategory: [
            {
              required: true,
              message: '请选择商品三级品类',
              trigger: ['change', 'blur'],
            }
          ]
        }"
      >
        <el-form-item label="模板名称" prop="templateName">
          <el-input
            v-model.trim="detailInfo.templateName"
            placeholder="请输入模板名称"
            maxlength="50"
          />
        </el-form-item>

        <el-form-item label="商品三级品类" prop="threeCategory">
          <el-cascader
            v-model="categoryData"
            style="width: 100%"
            :show-all-levels="false"
            :options="(categoryTreeList as any)"
            :props="{
              label: 'label',
              value: 'value',
            }"
            @change="handleCategory"
          />
        </el-form-item>

        <el-form-item label="引用尺寸模板">
          <el-select
            v-model="selectTemplateCode"
            filterable
            remote
            reserve-keyword
            placeholder="请输入模板名称搜索"
            :remote-method="handleSearchTemplate"
            :loading="templateListData.loading"
            class="tw-w-180px"
          >
            <el-option
              v-for="item in templateListData.list"
              :key="item.templateCode"
              :value="item.templateCode"
              :label="item.templateName"
              :disabled="detailInfo.templateCode === item.templateCode"
            />
          </el-select>
        </el-form-item>
        <el-form-item label-width="10px">
          <el-button
            type="primary"
            :disabled="!selectTemplateCode"
            @click="handleCopy"
          >
            复制
          </el-button>
        </el-form-item>
      </el-form>
    </template>

    <template #main>
      <el-tabs type="border-card" class="data-tabs">
        <el-tab-pane
          label="尺寸表"
        >
          <custom-table
            ref="tableRef"
            :column="column"
            :data="detailInfo.sizeInfoJsons"
            :use-form-validation="true"
          >
            <template #operation="{ index }">
              <el-button type="text" @click="setSizeListDefaultData">
                添加
              </el-button>
              <el-button
                v-if="detailInfo.sizeInfoJsons!.length > 1"
                type="text"
                class="text-color-danger"
                @click="delRow(index)"
              >
                删除
              </el-button>
            </template>
            <template #position="{ row, index }">
              <el-select
                v-model="row.position"
                filterable
                :filter-method="filterMethod"
                @change="handlePositionChange($event, index)"
              >
                <el-option
                  v-for="item in positionList"
                  :key="item.id"
                  :label="item.clothesPartsName"
                  :value="item.clothesPartsName"
                  :disabled="getDisabled(index, item.clothesPartsName)"
                />
              </el-select>
            </template>

            <template #measureMethod="{ row, index }">
              <el-autocomplete
                v-model.trim="row.measureMethod"
                style="width: 100%;"
                :fetch-suggestions="(queryString: string, cb: AutocompleteFetchSuggestionsCallback) => querySearch(cb, row.position)"
                placeholder="请输入量法"
                maxlength="50"
                :title="row.measureMethod"
                @change="handleCheck(index)"
                @select="handleCheck(index)"
              >
                <template #default="{ item = {} }">
                  <p :title="item.measuringMethod" class="autocomplete-text">
                    {{ item.measuringMethod || '-' }}
                  </p>
                </template>
              </el-autocomplete>
            </template>
          </custom-table>
        </el-tab-pane>
      </el-tabs>
      <div
        class="footer-row"
      >
        <div v-show="!templateCode">
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
          type="primary"
          class="footer-btn"
          @click="handleSave"
        >
          保存
        </el-button>
        <el-button v-show="!templateCode" @click="reset">
          重置
        </el-button>
      </div>
    </template>
  </sc-app-page>
</template>

<style lang="scss" scoped>
/* stylelint-disable order/order */
/* stylelint-disable order/properties-order */
.data-tabs {
  box-shadow: none;
}
.footer-row {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  height: 50px;
  border: 1px solid var(--el-border-color-base);
  border-top: 0;
  padding: 0 15px;
}
.footer-btn {
  margin-left: 40px
}
.autocomplete-text {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  /* stylelint-disable-next-line declaration-empty-line-before */
  margin: 0 -20px;
  padding: 0 15px;
}
.footer-title {
  display: inline-block;
  width: 100px;
  color: var(--el-text-color-regular);
  font-size: 14px;
}
</style>
