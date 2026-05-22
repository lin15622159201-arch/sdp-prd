<template>
  <sc-app-page>
    <template #main>
      <div class="tw-h-full">
        <div class="tw-w-full tw-mb-10px">
          <p class="tw-font-size-[20px] tw-mb-10px">
            {{ spuDetail?.styleCode }}
          </p>
          <section class="tw-flex">
            <div class="tw-flex tw-gap-20px tw-mr-10px">
              <section class="tw-flex tw-flex-col tw-flex-items-center">
                <custom-image
                  fit="cover"
                  v-if="spuDetail?.designPicture?.length"
                  class='tw-w-120px tw-h-150px'
                  :src="$filters.ossUrl(spuDetail?.designPicture[0], 300)"
                  :preview-src-list="spuDetail?.designPicture"
                />
                <p style="margin-top: 6px">
                  设计图（{{ spuDetail?.designPicture?.length || 0 }}）
                </p>
              </section>
            </div>

            <el-descriptions :column="4" class="tw-flex-1">
              <el-descriptions-item label="款式品类：">
                {{ spuDetail?.styleInfo?.categoryName || "-" }}
              </el-descriptions-item>
              <el-descriptions-item label="SPU创建人员：">
                {{ spuDetail?.styleInfo?.creatorName || "-" }}
              </el-descriptions-item>
              <el-descriptions-item label="波段：">
                {{ spuDetail?.styleInfo?.waveBandName || "-" }}
              </el-descriptions-item>
              <el-descriptions-item label="织造方式：">
                {{ spuDetail?.styleInfo?.weaveMode || "-" }}
              </el-descriptions-item>
              <el-descriptions-item label="期望成本：">
                {{ spuDetail?.styleInfo?.suggestedSellingPrice || "-" }}元
              </el-descriptions-item>
              <el-descriptions-item label="供给方式：">
                {{ spuDetail?.styleInfo?.supplyModeName || "-" }}
              </el-descriptions-item>
            </el-descriptions>
          </section>
        </div>
        <Tabs
          v-model="activeTab"
          :config="tabList"
          :border="false"
          class="tw-py-15px"
          :font-size="15"
          @change="handleChangeTab"
        />
        <template v-if="activeTab === 1">
          <sc-detail-card
            title="打版参考尺寸"
            class="tw-mb-8px tw-px-0! tw-py-0!"
          >
            <el-form
              label-suffix="："
              label-width="130px"
              :model="sizeFormData"
              ref="formElRef"
              :disabled="isView"
            >
              <el-row>
                <el-col :span="8">
                  <el-form-item
                    label="版房品类"
                    prop="roomCategory"
                    :rules="[{ required: true, message: '请选择', trigger: 'change' }]"
                  >
                    <el-select v-model="sizeFormData.roomCategory" @change="handleRoomChange">
                      <el-option
                        v-for="item in categoryPriceList"
                        :key="item.value"
                        :value="item.value"
                        :label="item.label"
                      />
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="8">
                  <el-form-item
                    label="引用模板"
                    prop="referSizeTemplate"
                  >
                    <div class="tw-flex tw-w-full">
                      <query-select
                        v-model="sizeFormData.referSizeTemplate"
                        placeholder='请输入'
                        :method="templatePage"
                        clearable
                        :needInitSearch="true"
                        :config="{
                          labelKey: 'templateName',
                          valueKey: 'templateCode',
                          keywordQueryKey: 'templateName',
                          valueQueryKey: 'templateCode',
                          dataKey: 'data.list',
                          codeKey: 'templateCode',
                        }"
                        :queryParams="{ pageNum: 1, pageSize: 1000, isEnabled: YES_NO_ENUM.YES }"
                      />
                      <el-button
                        class="tw-w-[88px] tw-flex-1 tw-ml[6px]"
                        type="primary"
                        @click="() => handleSizeReference(sizeFormData.referSizeTemplate)"
                      >引用</el-button>
                    </div>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item
                    label="纸样尺寸"
                    prop="patternSize"
                    :rules="[{ required: true, message: '请选择', trigger: 'change' }]"
                  >
                    <el-select
                      v-model="sizeFormData.patternSize"
                      placeholder="请选择"
                    >
                      <el-option
                        v-for="item in patternList"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                      />
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
            <el-form
              ref="sizeTableFormRef"
              :model="{ sizeTableList }"
              scroll-to-error
              class="tw-mt-10px"
              :disabled="isView"
            >
              <el-table
                :data="sizeTableList"
                border
                class="reset-form-item-top"
                row-key="id"
              >
                <el-table-column
                  minWidth="120px"
                  align="center"
                >
                  <template #header>
                    <span class="required">部位</span>
                  </template>
                  <template #default="{ row, $index }">
                    <el-form-item
                      :prop="`sizeTableList[${$index}].positionCode`"
                      :rules="{ required: true, message: '请选择部位', trigger: 'change' }"
                    >
                      <el-select
                        filterable
                        v-model="row.positionCode"
                        @change="$event => handleChangePart($event, row, $index)"
                      >
                        <el-option
                          v-for="item of partList"
                          :key="item.partsSizeCode"
                          :label="item.clothesPartsName"
                          :value="item.partsSizeCode"
                        />
                      </el-select>
                    </el-form-item>
                  </template>
                </el-table-column>
                <el-table-column label="尺寸维度" minWidth="120px">
                  <template #default="{ row }">{{ row.dimension }}</template>
                </el-table-column>
                <el-table-column
                  align="center"
                >
                  <template #header>
                    <span class="required">量法</span>
                  </template>
                  <template #default="{ row, $index }">
                    <el-form-item
                      :prop="`sizeTableList[${$index}].measuringMethod`"
                      :rules="{ required: true, message: '请输入量法', trigger: ['blur', 'change'] }"
                    >
                      <el-autocomplete
                        v-model="row.measuringMethod"
                        :fetch-suggestions="(_, callback) => querySearchMeasureWay(row.positionCode, callback)"
                        clearable
                        fit-input-width
                        :ref="el => setAutoCompleteRef(el, $index)"
                      />
                    </el-form-item>
                  </template>
                </el-table-column>
                <el-table-column
                  minWidth="120px"
                  align="center"
                >
                  <template #header>
                    <div>
                      <p>
                        <span class="required">纸样尺寸</span>
                      </p>
                      <p>{{ sizeFormData.patternSize }}</p>
                    </div>
                  </template>
                  <template #default="{ row, $index }">
                    <el-form-item
                      :prop="`sizeTableList[${$index}].paperSize`"
                      :rules="{ required: true, message: '请输入纸样尺寸', trigger: ['blur', 'change'] }"
                    >
                      <input-number
                        v-model="row.paperSize"
                        :precision="1"
                        :maxLength="7"
                        :min="0"
                        :max="9999.9"
                      />
                    </el-form-item>
                  </template>
                </el-table-column>
                <el-table-column
                  minWidth="120px"
                  align="center"
                >
                  <template #header>
                    <span class="required">允差范围</span>
                  </template>
                  <template #default="{ row, $index }">
                    <el-form-item
                      :prop="`sizeTableList[${$index}].tolerance`"
                      :rules="{ required: true, message: '请输入允差范围', trigger: ['blur', 'change'] }"
                    >
                      <div class="tw-flex tw-align-center">
                        <span class="tw-mr[4px]">±</span>
                        <input-number
                          v-model="row.tolerance"
                          :precision="2"
                          :min="0"
                          :max="999.99"
                          :ref="el => setInputRef(el, $index)"
                        />
                      </div>
                    </el-form-item>
                  </template>
                </el-table-column>
                <el-table-column
                  label="备注"
                  min-width="120px"
                  align="center"
                >
                  <template #default="{ row }">
                    <div>
                      <el-input
                        type="textarea"
                        v-model="row.remark"
                        resize="none"
                        :autosize="{ minRows: 1, maxRows: 2 }"
                      />
                    </div>
                  </template>
                </el-table-column>
                <el-table-column
                  label="操作"
                  width="80px"
                  align="center"
                >
                  <template #default="{ row, $index }">
                    <el-button
                      text
                      type="primary"
                      @click="handleAddSize($index, row)"
                    >
                      <el-icon><Plus /></el-icon>
                    </el-button>
                    <el-button
                      text
                      type="danger"
                      :disabled="sizeTableList.length === 1"
                      @click="handleRemoveSize($index)"
                    >
                      <el-icon><Minus /></el-icon>
                    </el-button>
                  </template>
                </el-table-column>
              </el-table>
            </el-form>
          </sc-detail-card>
          <sew-require-card
            title="工艺说明要求"
            v-model:sewFormData="sewFormData"
            ref="sewRequireRef"
            :disabled="isView"
          />
          <div class="tw-flex tw-flex-justify-center tw-mt-20px tw-mb-20px">
            <template v-if="isView">
              <el-button @click="goBack">返回</el-button>
            </template>
            <template v-else>
              <el-button @click="goBack">取消</el-button>
              <el-button type="primary" @click="handleSave">提交</el-button>
            </template>
          </div>
        </template>
        <template v-if="activeTab === 2">
          <boom-list-table :bomList="bomList" />
        </template>
      </div>
    </template>
    <el-dialog
      v-model="dialogVisible"
      title="选择模板"
      width="400px"
      align-center
      :close-on-click-modal="false"
    >
      <div style="max-height: 300px; overflow-y: auto;">
        <p>请选择要使用的工艺模板：</p>
        <el-radio-group v-model="selectedTemplateId">
          <div
            v-for="item in templateList"
            :key="item.templateId"
            class="tw-my-2 tw-mr-10px"
          >
            <el-radio :label="item.templateId">{{ item.templateName }}</el-radio>
          </div>
        </el-radio-group>
      </div>
      <template #footer>
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="confirmSelection">确定</el-button>
      </template>
    </el-dialog>
  </sc-app-page>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue';
import { ElForm, ElMessage, ElMessageBox, ElRadioGroup, ElRadio } from 'element-plus';
import { Plus, Minus } from '@element-plus/icons-vue';
import { useRouter, useRoute } from 'vue-router';
import { usePrintSizeData } from '@/modules/clothes-center/hooks/use-print-size-data';
import { useDictionary } from '@/hooks/use-dictionary';
import sewRequireCard from '@/modules/clothes-center/components/sew-require-card/index.vue';
import { auditCraftOrderDetail, auditCraftOrderSave, designCommonLatestSubmitWithSpu } from '../../api';
import {
  IAuditCraftOrderDetailRes,
  IAuditCraftOrderSaveReqSewRequireItem,
  IDesignCommonLatestSubmitWithSpuRes,
} from '../../api/types';
import { DICTIONARY_KEY } from '@/constant/dictionary';
import {
  ITemplateDetailedInfoResSizeInfoJsonsItem
} from '@/modules/clothes-center/api/types';
import { templatePage } from '@/modules/clothes-center/api';
import { clothesPartsSize } from '@/api/basis';
import { YES_NO_ENUM } from '@/constant';
import { IClothesPartsSizeListRes } from '@/api/basis/types';
import { tailRequireDefault, cuttingRequireDefault } from '@/modules/clothes-center/constant';
import boomListTable from '@/modules/clothes-center/components/boom-list-table/index.vue';
import { bomSpuNormalSkc } from '@/modules/clothes-center/components/boom-list-table/api';
import {
  auditCraftTemplateListBaseInfo,
  auditCraftTemplateGetDetailById
} from '@/modules/clothes-center/components/sew-require-card/api';
import useSewTableList from '@/modules/clothes-center/components/sew-require-card/hooks/use-table-list';

interface ISewFormData {
  cuttingRequire: string;
  tailRequire: string;
  referStyleTemplateCode: string;
  referStyleTemplateName: string;
  referComponentTemplateCode: string;
  referComponentTemplateName: string;
  sewingRequireList: IAuditCraftOrderSaveReqSewRequireItem[];
}

const $router = useRouter();
const route = useRoute();
const { getDictionaryOptions } = useDictionary();
const { convertToArray, setDefaultSewingList, convertToTree } = useSewTableList();

const auditCraftOrderId = route.params.id as unknown as string;
const isView = computed(() => route.name === 'ClothesCenterAuditCraftTaskDetail');
const detailData = ref<IAuditCraftOrderDetailRes>({});

const sewFormData = ref<ISewFormData>({
  cuttingRequire: '',
  tailRequire: '',
  referStyleTemplateCode: '',
  referStyleTemplateName: '',
  referComponentTemplateCode: '',
  referComponentTemplateName: '',
  sewingRequireList: [],
});
const sizeFormData: any = ref({
  referSizeTemplate: '',
  referenceTemplate: '',
  roomCategory: '',
  roomCategoryName: '',
  paperPatternSize: '',
  categoryPrice: '',
  patternSize: '',
  sizeTable: [],
});

// 部位
const partList = ref<IClothesPartsSizeListRes>([]);
const getParts = async () => {
  const { data = [] } = await clothesPartsSize({
    isEnabled: YES_NO_ENUM.YES
  });
  partList.value = data;
};

// 版房品类
const categoryPriceList = computed(() => {
  // 获取版房品类
  const list = getDictionaryOptions(DICTIONARY_KEY.PROTOTYPE_CATEGORY);
  // 显示可选的版房品类
  return list;
  // return list.filter(v => !v.disabled);
});

// 纸样尺寸
const patternList = computed(() => {
  const list = getDictionaryOptions(DICTIONARY_KEY.PLM_STANDARY_SIZE);
  if (!detailData.value?.sizeStandardCode) return [];
  const row = list
    .find(v => v.value === detailData.value?.sizeStandardCode)?.children?.[0];
  if (!row) return [];
  return row.label.split(',').map(v => ({
    label: v,
    value: v
  }));
});
const sizeTableList = ref<Array<ITemplateDetailedInfoResSizeInfoJsonsItem>>([]);
// 尺寸表操作
const {
  handleAddSize,
  handleRemoveSize,
  handleSizeReference,
  querySearchMeasureWay,
  handleChangePart,
  setAutoCompleteRef,
  setInputRef,
} = usePrintSizeData({
  sizeTableList,
  partList,
});

const bomList = ref();
const activeTab = ref(1);
const tabList = computed(() => [
  {
    label: '审版工艺单',
    value: 1,
  },
  {
    label: '开发bom',
    value: 2,
  },
]);

// 返回
const goBack = () => {
  $router.push({
    name: 'ClothesCenterAuditCraftTaskList',
  });
};

// 查询审版工艺款式（模板）基本信息
const templateList = ref();
const getTemplateList = async () => {
  const res = await auditCraftTemplateListBaseInfo({
    roomCategory: sizeFormData.value.roomCategory,
    state: '1'
  });
  templateList.value = res.data || [];
};

// 根据ID查询审版工艺款式（模板）明细
const templateDetail = ref();
const getTemplateListDetail = async (id: string) => {
  const res = await auditCraftTemplateGetDetailById({
    templateId: id,
  });
  templateDetail.value = res.data || {};
};

const selectedTemplateId = ref();
const dialogVisible = ref(false);
const confirmSelection = async () => {
  if (selectedTemplateId.value) {
    await getTemplateListDetail(selectedTemplateId.value);
    const { detailJson } = templateDetail.value;
    if (detailJson.length) {
      sewFormData.value.sewingRequireList = convertToArray(detailJson) as any;
    }
  }
  dialogVisible.value = false; // 关闭弹窗
};
const setSewFormData = async () => {
  if (!templateList.value) return;
  if (templateList.value.length > 1) {
    // 若有多个模板，则需要选择,弹窗勾选
    dialogVisible.value = true;
  } else {
    // 若只有一个模版，直接带入内容
    const id = templateList.value[0].templateId;
    await getTemplateListDetail(id);
    const { detailJson } = templateDetail.value;
    if (detailJson.length) {
      sewFormData.value.sewingRequireList = convertToArray(detailJson) as any;
    }
  }
};
const handleRoomChangeValue = () => {
  const find = categoryPriceList.value.find(v => v.value === sizeFormData.value.roomCategory);
  sizeFormData.value.roomCategoryName = find?.label || '';
};

const handleRoomChange = async () => {
  selectedTemplateId.value = '';
  const { sewingRequireList } = sewFormData.value;
  // 若下方车缝要求为空表单，选择版房品类后则直接带入内容；只有1条数据时且都为空则是默认数据，不需要提示
  if (!sewingRequireList.length || (sewingRequireList.length === 1 && (sewingRequireList[0].componentName === ''
    && sewingRequireList[0].structuralDesc === ''
    && sewingRequireList[0].sewingRequires === ''))) {
    await getTemplateList();
    await setSewFormData();
    handleRoomChangeValue();
    return;
  }
  ElMessageBox.confirm(
    '是否需要替换工艺说明内容？',
    '提示',
    {
      confirmButtonText: '是',
      cancelButtonText: '否',
      type: 'warning',
    }
  ).then(async () => {
    await getTemplateList();
    await setSewFormData();
    handleRoomChangeValue();
  }).catch(() => {
    // 用户点击"否"，仅切换版房品类
    handleRoomChangeValue();
  });
};

const formElRef = ref<InstanceType<typeof ElForm>>();
const sizeTableFormRef = ref<InstanceType<typeof ElForm>>();
const sewRequireRef = ref();

const handleSave = async () => {
  await Promise.all([
    formElRef.value?.validate(),
    sizeTableFormRef.value?.validate(),
    sewRequireRef.value?.validateForm(),
  ]);
  const sewingRequireList = convertToTree(sewFormData.value.sewingRequireList as any);
  await auditCraftOrderSave({
    auditCraftOrderId,
    cuttingRequire: sewFormData.value.cuttingRequire,
    tailRequire: sewFormData.value.tailRequire,
    referSize: {
      referSizeTemplate: sizeFormData.value.referSizeTemplate,
      roomCategory: sizeFormData.value.roomCategory,
      roomCategoryName: sizeFormData.value.roomCategoryName,
      patternSize: sizeFormData.value.patternSize!,
      sizeTable: (sizeTableList.value || []).map(listItem => ({
        positionCode: listItem.positionCode,
        positionName: listItem.positionName,
        dimension: listItem.dimension,
        measuringMethod: listItem.measuringMethod,
        tolerance: listItem.tolerance,
        patternSize: listItem.paperSize!,
        remark: listItem.remark || '',
      })),
    },
    sewRequire: sewingRequireList.map((v: any) => ({
      componentId: v.componentId,
      componentName: v.componentName,
      structurals: v?.children.map((item: any) => ({
        desc: item.structuralDesc,
        sewingRequires: item?.children.map((it: any) => ({ desc: it.sewingRequires })),
      }))
    }))
  });
  ElMessage.success('操作成功');
  goBack();
};

const getDetailInfo = async () => {
  const { data } = await auditCraftOrderDetail({ auditCraftOrderId });
  detailData.value = data;
  // 初始化整合裁剪数据
  sewFormData.value = {
    referStyleTemplateCode: '',
    referStyleTemplateName: '',
    referComponentTemplateCode: '',
    referComponentTemplateName: '',
    cuttingRequire: data?.cuttingRequire || cuttingRequireDefault,
    tailRequire: data?.tailRequire || tailRequireDefault,
    sewingRequireList: data?.sewRequire?.length
      ? convertToArray(data?.sewRequire as any) as any
      : setDefaultSewingList(`${Date.now()}`)
  };
  // 初始化整合尺寸数据
  sizeFormData.value = data?.referSize || {};
  sizeTableList.value = (data?.referSize?.sizeTable || []).map((item, index) => ({
    position: item.position ?? '',
    positionCode: item.positionCode ?? '',
    positionName: item.positionName ?? '',
    dimension: item.dimension ?? '',
    measuringMethod: item.measuringMethod ?? '',
    paperSize: item.patternSize ?? '',
    remark: item.remark ?? '',
    tolerance: item.tolerance ?? '',
    id: `${Date.now()}${index}`,
  }));
  if (sizeTableList.value.length === 0) {
    sizeTableList.value.push({
      position: '',
      positionCode: '',
      positionName: '',
      dimension: '',
      paperSize: '',
      measuringMethod: '',
      remark: '',
      tolerance: '',
      id: `${Date.now()}`
    });
  }
  formElRef.value?.resetFields();
};

const spuDetail = ref<IDesignCommonLatestSubmitWithSpuRes>();
const getSpuDetail = async () => {
  const { styleCode = '' } = detailData.value;
  if (!styleCode) return;
  const { data } = await designCommonLatestSubmitWithSpu(styleCode);
  spuDetail.value = data;
};

const getBomList = async () => {
  const { data } = await bomSpuNormalSkc({
    styleCode: detailData.value.styleCode || '',
  });
  bomList.value = data || [];
};

const init = async () => {
  getParts();
  await getDetailInfo();
  getSpuDetail();
  getBomList();
};

const handleChangeTab = () => {
};

init();

</script>

<style lang="scss" scoped>
.reset-form-item-bottom {
  :deep(.el-form-item) {
    margin-bottom: 0;
    margin-right: 0;
  }
}
.reset-form-item-top {
  :deep(.el-form-item) {
    margin-top: 18px;
  }
  :deep(.el-form-item__content) {
    margin-left: 0 !important;
  }
}
</style>
