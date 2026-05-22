<template>
  <sc-app-page>
    <template #main>
      <div class="tw-h-full">
        <el-row>
          <el-col :span="6">
            <sc-detail-item label="SKC：">
              {{ detailInfoData.designCode }}
            </sc-detail-item>
          </el-col>
          <el-col :span="6">
            <sc-detail-item label="SPU：">
              {{ detailInfoData.styleCode }}
            </sc-detail-item>
          </el-col>
          <el-col :span="6">
            <sc-detail-item label="设计师：">
              {{ detailInfoData.designerName }}
            </sc-detail-item>
          </el-col>
          <el-col :span="6">
            <sc-detail-item label="设计组：">
              {{ detailInfoData.designerGroup }}
            </sc-detail-item>
          </el-col>
          <el-col :span="6">
            <sc-detail-item label="颜色：">
              {{ detailInfoData.color }}
            </sc-detail-item>
          </el-col>
          <el-col :span="6">
            <sc-detail-item label="供给方式：">
              {{ detailInfoData.supplyModeName }}
            </sc-detail-item>
          </el-col>
          <el-col :span="6">
            <sc-detail-item label="品类：">
              {{ detailInfoData.categoryName }}
            </sc-detail-item>
          </el-col>
          <el-col :span="6">
            <sc-detail-item label="打版类型：">
              {{ detailInfoData.sampleType ? getLabelByVal(SAMPLE_TYPE_LIST, detailInfoData.sampleType) : '' }}
            </sc-detail-item>
          </el-col>
          <el-col :span="6">
            <sc-detail-item label="打版尺码：">
              {{ detailInfoData.sampleSize }}
            </sc-detail-item>
          </el-col>
          <el-col :span="6">
            <sc-detail-item label="纸样师：">
              {{ detailInfoData.patternMakerName }}
            </sc-detail-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <detail-title title="设计图" class="tw-my-[10px]" />
            <div class='tw-pt-5px tw-flex tw-flex-wrap tw-gap-5px'>
              <custom-image
                class='tw-w95px tw-h95px tw-rounded-4px'
                v-for="(item, index) in detailInfoData.designPictureList"
                :key="index"
                :src="item.url"
                fit="cover"
                :initial-index="index"
                :preview-src-list="detailInfoData.designPictureList.map(v => v.url)"
              />
              <custom-image
                class='tw-w95px tw-h95px tw-rounded-4px'
                v-if="detailInfoData.designPictureList.length === 0"
                src=""
                fit="cover"
              />
            </div>
          </el-col>
          <el-col :span="12">
            <detail-title title="上架图" class="tw-my-[10px]" />
            <div class='tw-pt-5px tw-flex tw-flex-wrap tw-gap-5px'>
              <custom-image
                class='tw-w95px tw-h95px tw-rounded-4px'
                v-for="(item, index) in detailInfoData.shelvePictureList"
                :key="index"
                :src="item.url"
                fit="cover"
                :initial-index="index"
                :preview-src-list="detailInfoData.shelvePictureList.map(v => v.url)"
              />
              <custom-image
                class='tw-w95px tw-h95px tw-rounded-4px'
                v-if="detailInfoData.shelvePictureList.length === 0"
                src=""
                fit="cover"
              />
            </div>
          </el-col>
        </el-row>
        <el-form
          label-suffix="："
          label-width="100px"
          :model="detailInfoData"
          ref="formElRef"
          class="tw-mt-[20px]"
          :disabled="isView"
        >
          <el-row>
            <el-col :span="24">
              <el-form-item
                label="纸样文件"
                prop="urls"
                :rules="[{ required: true, message: '请选择', trigger: 'change' }]"
              >
                <div class="tw-flex tw-w-[50%]">
                  <Uploader
                    v-model="detailInfoData.urls"
                    :limit="1"
                    accept=".prj,.dxf"
                    :size-limit="100"
                    size="mini"
                    listType="text"
                    :paste="false"
                    :use-wrapper="false"
                    :multiple="false"
                    :download="true"
                    tips="文件不超过100MB，格式为.dxf/.prj"
                    :before-upload="handleBeforeUpload"
                  >
                    <template #default>
                      <div style="word-break: break-all; line-height: 1.2;">
                        <el-button size="small" :disabled="isView">
                          点击上传
                        </el-button>
                      </div>
                    </template>
                  </Uploader>
                </div>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item
                label="裁剪方法"
                prop="cuttingMethodCode"
                :rules="[{ required: true, message: '请选择', trigger: 'change' }]"
              >
                <el-select
                  v-model="detailInfoData.cuttingMethodCode"
                  placeholder="请选择"
                  @change="(val: string) => {
                    if (isEmpty(val)) {
                      detailInfoData.cuttingMethod = '';
                    } else {
                      const row = cuttingMethodOpts.find(v => v.code === val);
                      if (row) {
                        detailInfoData.cuttingMethod = row.desc;
                      }
                    }
                  }"
                >
                  <el-option
                    v-for="item in cuttingMethodOpts"
                    :key="item.code"
                    :label="item.desc"
                    :value="item.code"
                    :disabled="item.disabled"
                  />
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <el-form
          label-suffix="："
          label-width="100px"
          :model="detailInfoData"
          ref="sizeFormRef"
          class="tw-mt-[20px]"
          :disabled="isView"
        >
          <detail-title title="尺寸表" class="tw-my-[10px]" />
          <el-row>
            <el-col :span="8">
              <el-form-item
                label="样衣尺寸"
                prop="sampleClothesSize"
                :rules="[{ required: true, message: '请选择', trigger: 'change' }]"
              >
                <el-select
                  v-model="detailInfoData.sampleClothesSize"
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
            <el-col :span="8">
              <el-form-item
                label="纸样尺寸"
                prop="patternSize"
                :rules="[{ required: true, message: '请选择', trigger: 'change' }]"
              >
                <el-select
                  v-model="detailInfoData.patternSize"
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
          <div
            class="tw-text-12px tw-pl-25px tw-pb-20px tw-color-danger tw-mt--5px"
            v-if="detailInfoData.patternSize !== detailInfoData.requirementSampleClothesSize
              || detailInfoData.sampleClothesSize !== detailInfoData.requirementSampleClothesSize"
          >
            尺码与打版需求尺码：
            {{detailInfoData.sizeStandard}}
            {{detailInfoData.requirementSampleClothesSize}}
            不一致，请注意数据准确性
          </div>
          <el-row>
            <el-col :span="8">
              <el-form-item
                label="引用模板"
                prop="templates"
              >
                <div class="tw-flex tw-w-full">
                  <query-select
                    v-model="detailInfoData.modelSizeTemplateCode"
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
                    }"
                    :queryParams="{ pageNum: 1, pageSize: 1000, isEnabled: YES_NO_ENUM.YES }"
                  />
                  <el-button
                    class="tw-w-[88px] tw-flex-1 tw-ml[6px]"
                    type="primary"
                    @click="() => handleSizeReference(detailInfoData.modelSizeTemplateCode)"
                  >引用</el-button>
                </div>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <el-form
          ref="sizeTableFormRef"
          :model="{ sizeTableList }"
          scroll-to-error
          class="tw-mt-10px clear-form-margin"
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
                    <span class="required">样衣尺寸</span>
                  </p>
                  <p>{{ detailInfoData.sampleClothesSize }}</p>
                </div>
              </template>
              <template #default="{ row, $index }">
                <el-form-item
                  :prop="`sizeTableList[${$index}].sampleClothesSize`"
                  :rules="{ required: true, message: '请输入纸样尺寸', trigger: ['blur', 'change'] }"
                >
                  <input-number
                    v-model="row.sampleClothesSize"
                    :precision="1"
                    :min="0"
                    :max="9999.99"
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
                  <p>{{ detailInfoData.patternSize }}</p>
                </div>
              </template>
              <template #default="{ row, $index }">
                <el-form-item
                  :prop="`sizeTableList[${$index}].patternSize`"
                  :rules="{ required: true, message: '请输入纸样尺寸', trigger: ['blur', 'change'] }"
                >
                  <input-number
                    v-model="row.patternSize"
                    :precision="1"
                    :min="0"
                    :max="9999.99"
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
              width="120px"
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
      </div>
    </template>
    <template #ffooter>
      <div class="tw-w-full tw-flex tw-justify-end">
        <el-button @click="handleGoBack">
          返回
        </el-button>
        <el-button
          type="primary"
          @click="handleSubmitForm()"
          v-if="!isView"
        >
          提交
        </el-button>
      </div>
    </template>
  </sc-app-page>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue';
import { usePrintSizeData } from '@/modules/clothes-center/hooks/use-print-size-data';
import { useDictionary } from '@/hooks/use-dictionary';
import { DICTIONARY_KEY } from '@/constant/dictionary';
import { useRouter, useRoute } from 'vue-router';
import { ElForm, ElMessage, ElAutocomplete } from 'element-plus';
import { Plus, Minus } from '@element-plus/icons-vue';
import {
  patternClothesDetail,
  patternClothesConfirm,
  patternClothesCraft,
} from '../../api';
import {
  IPatternClothesConfirmReq,
} from '../../api/types';
import { useCutting } from './hooks/use-cutting-dialog';
import {
  ITemplateDetailedInfoResSizeInfoJsonsItem
} from '@/modules/clothes-center/api/types';
import { templatePage } from '@/modules/clothes-center/api';
import { getLabelByVal } from '@/core/plugins/filter';
import { SAMPLE_TYPE_LIST } from '@/modules/clothes-center/constant';
import { IClothesPartsSizeListRes } from '@/api/basis/types';
import { clothesPartsSize } from '@/api/basis';
import { YES_NO_ENUM } from '@/constant';
import { IDetail } from './types';
import { isEmpty } from '@toy/utils';
import { IFileData } from '@/components/uploader/packages/types';

const router = useRouter();
const route = useRoute();

const patternId = route.params.id as string;
const isView = computed(() => route.name === 'ClothesCenterPatternTaskDetail');

const sizeTableFormRef = ref<InstanceType<typeof ElForm> | null>(null);
const sizeFormRef = ref<InstanceType<typeof ElForm> | null>(null);
const formElRef = ref<InstanceType<typeof ElForm> | null>(null);

const { getDictionaryOptions } = useDictionary();

// 获取裁剪方法下拉
const cuttingMethodOpts = computed(() => {
  return getDictionaryOptions(DICTIONARY_KEY.BOM_CUTTING_METHOD).map((item) => {
    return {
      code: item.value,
      desc: item.label,
      disabled: item.disabled,
    };
  }) || [];
});

// 部位
const partList = ref<IClothesPartsSizeListRes>([]);
const getParts = async () => {
  const { data = [] } = await clothesPartsSize({
    isEnabled: YES_NO_ENUM.YES
  });
  partList.value = data;
};

const detailInfoData = ref<IDetail>({
  designPictureList: [],
  shelvePictureList: [],
  craftList: [],
  patternClothesSizeList: [],
  secondCraftList: [],
  shelvePicture: {
    spuShelvePictureList: [],
    skcShelvePictureList: []
  },
});

// 纸样尺寸
const patternList = computed(() => {
  const list = getDictionaryOptions(DICTIONARY_KEY.PLM_STANDARY_SIZE);
  if (!detailInfoData.value?.sizeStandardCode) return [];
  const row = list
    .find(v => v.value === detailInfoData.value?.sizeStandardCode)?.children?.[0];
  if (!row) return [];
  return row.label.split(',').map(v => ({
    label: v,
    value: v
  }));
});

const sizeTableList = ref<Array<ITemplateDetailedInfoResSizeInfoJsonsItem & {
  patternSize: string;
  sampleClothesSize: string;
}>>([]);

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
  partList
});

const handleGoBack = () => {
  const query = {} as { [key: string]: string; };
  if (route.query?.componentName) {
    query.componentName = route.query.componentName as string;
  }
  if (route.query?.state) {
    query.state = route.query.state as string;
  }
  router.push({
    name: 'ClothesCenterPatternTask',
    query
  });
};

const submitData = ref<IPatternClothesConfirmReq>();
const { handleOpenDialog } = useCutting({
  onSubmit: async (secondCraftList) => {
    const params = {
      ...submitData.value!,
      secondCraftList,
    };
    await patternClothesConfirm(params);
    ElMessage.success('提交成功');
    handleGoBack();
  }
});
const handleSubmitForm = async () => {
  await Promise.all([
    formElRef.value?.validate(),
    sizeFormRef.value?.validate(),
    sizeTableFormRef.value?.validate(),
  ]);
  const { data } = await patternClothesCraft({ patternId });
  const params: IPatternClothesConfirmReq = {
    patternId,
    bomId: data.bomId!,
    patternFileUrl: detailInfoData.value?.urls?.[0]?.url!,
    patternFileName: detailInfoData.value?.urls?.[0]?.name,
    cuttingMethodCode: detailInfoData.value?.cuttingMethodCode,
    cuttingMethod: detailInfoData.value?.cuttingMethod,
    modelSizeTemplateCode: detailInfoData.value?.modelSizeTemplateCode,
    sampleClothesSize: detailInfoData.value?.sampleClothesSize!,
    patternSize: detailInfoData.value?.patternSize!,
    patternClothesSizeList: (sizeTableList.value).map(item => ({
      positionCode: item.positionCode ?? '',
      positionName: item.positionName ?? '',
      dimension: item.dimension ?? '',
      measuringMethod: item.measuringMethod ?? '',
      remark: item.remark ?? '',
      tolerance: item.tolerance ?? '',
      patternSize: item.patternSize,
      sampleClothesSize: item.sampleClothesSize
    })),
    secondCraftList: data.secondCraftList,
  };
  if (data?.secondCraftList?.length) {
    submitData.value = params;
    handleOpenDialog(data.secondCraftList);
  } else {
    await patternClothesConfirm(params);
    ElMessage.success('提交成功');
    handleGoBack();
  }
};

const getDetailInfo = async () => {
  const { data } = await patternClothesDetail({ patternId });
  const { spuShelvePictureList = [], skcShelvePictureList = [] } = data?.shelvePicture || {};
  detailInfoData.value = {
    ...(data || {}),
    urls: data.patternFileUrl ? [{ url: data.patternFileUrl!, name: data.patternFileName }] : [],
    designPictureList: data.designPictureList?.map(url => ({
      url,
    })) || [],
    shelvePictureList: [...spuShelvePictureList, ...skcShelvePictureList].map(url => ({
      url,
    })) || [],
  };
  sizeTableList.value = (data?.patternClothesSizeList || []).map((item, index) => ({
    position: item.positionCode ?? '',
    positionCode: item.positionCode ?? '',
    positionName: item.positionName ?? '',
    dimension: item.dimension ?? '',
    measuringMethod: item.measuringMethod ?? '',
    remark: item.remark ?? '',
    tolerance: item.tolerance ?? '',
    sampleClothesSize: item.sampleClothesSize ?? '',
    patternSize: item.patternSize ?? '',
    id: `${Date.now()}${index}`,
  }));
  if (sizeTableList.value.length === 0) {
    sizeTableList.value.push({
      position: '',
      positionCode: '',
      positionName: '',
      dimension: '',
      measuringMethod: '',
      remark: '',
      tolerance: '',
      sampleClothesSize: '',
      patternSize: '',
      id: `${Date.now()}`,
    });
  }
  /**
   * 先去掉，看后台情况
   * 如果是是正常打版/复色打版，并且是首次编辑（状态=待提交的）则根据styleCode获取
   * 尺寸表相关的信息回填回去
   * */
  // if (
  //   [SAMPLE_TYPE_ENUM.NORMAL, SAMPLE_TYPE_ENUM.MULTICOLOR].includes(data.sampleType as SAMPLE_TYPE_ENUM)
  // && data.patternVersionNum === '1') {
  //   const { data: auditDetail } = await patternClothesGetLatestPassAuditPatternByStyleCode(data.styleCode!);
  //   console.log('auditDetail==', auditDetail);
  // }

  formElRef.value?.resetFields();
  sizeFormRef.value?.resetFields();
};

const handleBeforeUpload = (file: IFileData) => {
  const formatReg = /^(prj|dxf)$/i;
  const name = file.name || '';
  const [fileName = '', fileType = ''] = name?.split('.') || [];
  const skcReg = new RegExp(detailInfoData.value.designCode || '', 'i');
  const valid = skcReg.test(fileName) && formatReg.test(fileType);
  // const valid = formatReg.test(fileType);
  if (!valid) {
    ElMessage({
      type: 'error',
      message: '上传的纸样文件名称必须包含所勾选数据的SKC，且为 prj 或 dxf 格式',
      // message: '上传的纸样文件必须为 prj 或 dxf 格式',
      duration: 3000,
    });
    return Promise.reject(false);
  }
  return file;
};

const init = () => {
  getParts();
  getDetailInfo();
};
init();

</script>
