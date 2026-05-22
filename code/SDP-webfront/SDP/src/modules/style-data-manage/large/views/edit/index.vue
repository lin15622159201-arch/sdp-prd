<template>
  <sc-app-page :main="{ style: 'padding: 0' }">
    <template #fheader>
      <spu-info :spu-info="detailData.spuInfoVo" class="tw-mb-20px" />
    </template>
    <template #main>
      <el-scrollbar>
        <div class="tw-h-full tw-p-20px">
          <sc-detail-card
            title="大货纸样"
            class="tw-mb-8px tw-px-0! tw-py-0!"
          >
            <el-form
              ref="formElRef"
              label-suffix="："
              :model="formData"
              label-width="120px"
              :disabled="isView"
            >
              <el-form-item
                class="tw-w-700px"
                label="大货纸样"
                prop="patternList"
                :rules="[{ required: true, message: '请上传大货纸样', trigger: 'change' }]"
              >
                <Uploader
                  v-model="formData.patternList"
                  :limit="10"
                  accept=".prj,.dxf"
                  :size-limit="20"
                  size="mini"
                  download
                  listType="text"
                  tips="支持格式：.prj, .dxf，单个文件不能超过20MB"
                  :disabled="isView"
                />
                <div
                  v-if="!formData.patternList.length && isView"
                  class="tw-w-60"
                >
                  <custom-image
                    class="tw-w-120px tw-h-120px tw-mt-10px"
                    :src="resizeImgByWidth('', 200)"
                    fit="contain"
                    lazy
                  />
                </div>
              </el-form-item>
              <el-form-item
                class="tw-w-700px"
                label="大货唛架"
                prop="markList"
                :rules="[{ required: true, message: '请上传大货唛架', trigger: 'change' }]"
              >
                <Uploader
                  v-model="formData.markList"
                  :limit="10"
                  accept=".rar,.zip,.prj,.png,.jpg,.jpeg,.lay"
                  :size-limit="20"
                  size="mini"
                  download
                  listType="text"
                  tips="支持格式：.rar, .zip, .prj, .png, .jpg, .jpeg, .lay，单个文件不能超过20MB"
                  :disabled="isView"
                />
                <div
                  v-if="!formData.markList.length && isView"
                  class="tw-w-60"
                >
                  <custom-image
                    class="tw-w-120px tw-h-120px tw-mt-10px"
                    :src="resizeImgByWidth('', 200)"
                    fit="contain"
                    lazy
                  />
                </div>
              </el-form-item>
              <el-form-item
                v-if="fileDataFlag"
                class="tw-w-700px"
                label="工艺单"
                prop="craftAttachmentList"
              >
                <Uploader
                  v-model="formData.craftAttachmentList"
                  :limit="10"
                  accept=".rar,.zip,.doc,.docx,.pdf,.xlsx,.xls,.png,.jpg,.jpeg"
                  :size-limit="20"
                  size="mini"
                  download
                  listType="text"
                  tips="支持格式：.rar, .zip, .doc, .docx, .pdf, .xlsx, .xls, .png, .jpg, .jpeg，单个文件不能超过20MB"
                  :disabled="isView"
                />
                <div
                  v-if="!formData.craftAttachmentList.length && isView"
                  class="tw-w-60"
                >
                  <custom-image
                    class="tw-w-120px tw-h-120px tw-mt-10px"
                    :src="resizeImgByWidth('', 200)"
                    fit="contain"
                    lazy
                  />
                </div>
              </el-form-item>
            </el-form>
          </sc-detail-card>
          <sc-detail-card
            title="大货尺寸表"
            class="tw-mb-8px tw-px-0! tw-py-0!"
          >
            <el-form
              ref="sizeFormElRef"
              label-suffix="："
              :model="sizeFormData"
              :rules="sizeFormRules"
              label-width="120px"
              :disabled="isView"
            >
              <el-row>
                <el-col :span="8">
                  <el-form-item label="尺码标准" prop="sizeStandardCode">
                    <el-select
                      v-model="sizeStandard"
                      placeholder="请选择"
                      style="width: 100%;"
                      @change="triggerSizeStandardChange"
                    >
                      <el-option
                        v-for="item of plmStandardSizeList"
                        :key="item.valueCode"
                        :label="item.value"
                        :value="item.valueCode"
                      />
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="样衣尺寸" prop="sampleBaseYardage">
                    <el-select
                      v-model="sizeFormData.sampleBaseYardage"
                      style="width: 100%;"
                      @change="handleSizeHoppingChange()"
                    >
                      <el-option
                        v-for="item in sizeListItem.children"
                        :key="item.value"
                        :label="item.label"
                        :value="item.label"
                      />
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="纸样尺寸" prop="designBaseYardage">
                    <el-select
                      v-model="sizeFormData.designBaseYardage"
                      style="width: 100%;"
                    >
                      <el-option
                        v-for="item in sizeListItem.children"
                        :key="item.value"
                        :label="item.label"
                        :value="item.label"
                      />
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>
              <!-- 放码规则表格 -->
              <sc-table
                height="100%"
                class="tw-w-500px"
                :data="skipSizeTableList"
                :columns="skipSizeTableColumns"
              />
              <!-- 尺寸表 -->
              <sc-table
                height="100%"
                :data="sizeTableList"
                :columns="sizeTableColumns"
                class="tw-mt-4"
              />
            </el-form>
          </sc-detail-card>
          <sc-detail-card
            title="款式号型"
            class="tw-mb-8px tw-px-0! tw-py-0!"
          >
            <template #extra>
              <el-button
                @click="getLargeSizeType({
                  sizeStandardCodes: [detailData.clothingSizeType || ''],
                  categoryCode: detailData.styleType || '',
                })"
                class="tw-ml-6"
                :disabled="isView"
              >
                获取号型
              </el-button>
            </template>
            <!-- 尺寸表 -->
            <sc-table
              height="100%"
              :data="sizeTypeList"
              :columns="sizeTypeColumns"
              class="tw-mt-4"
            />
          </sc-detail-card>
          <template v-if="!fileDataFlag">
            <sew-require-card
              title="工艺指导书"
              v-model:sewFormData="sewFormData"
              ref="sewRequireRef"
              :disabled="isView"
            />
          </template>
        </div>
      </el-scrollbar>
    </template>
    <template #ffooter>
      <div class="tw-w-full tw-flex tw-justify-end">
        <template v-if="isView">
          <el-button @click="handleGoBack">
            返回
          </el-button>
        </template>
        <template v-else>
          <el-button @click="handleGoBack">
            取消
          </el-button>
          <el-button
            type="primary"
            @click="handleSubmitForm"
          >
            提交
          </el-button>
        </template>
      </div>
    </template>
  </sc-app-page>
</template>

<script lang="ts" setup>
import { computed, ref, toRef } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import type { ElForm } from 'element-plus';
import { useSizeFormData } from './hooks/use-size-form-data';
import {
  IPatternClothesQueryLastBySpuResCustomerSizeListItem as CustomerSizeListItem,
  IStyleInfoDetailRes, IStyleInfoSubmitReqStyleAttachmentReqsItem,
  IStyleInfoSubmitReqSizeCategoryReq,
  IAuditCraftOrderDetailByStyleCodeRes,
  IStyleInfoSubmitReqCraftBookReq,
} from '@/modules/style-data-manage/large/api/types';
import { useSkipSizeTable } from './hooks/use-skip-size-table';
import { useSizeTable } from './hooks/use-size-table';
import { cloneDeep } from 'lodash-es';
import useSizeSkip from './hooks/use-size-skip';
import sewRequireCard from '@/modules/clothes-center/components/sew-require-card/index.vue';
import useSizeHopping from '@/modules/style-data-manage/large/views/edit/hooks/use-size-hopping';
import { IFile } from '@/components/uploader/packages/types';
import {
  styleInfoDetail,
  styleInfoSubmit,
  auditCraftOrderDetailByStyleCode,
} from '@/modules/style-data-manage/large/api';
import { tailRequireDefault, cuttingRequireDefault } from '@/modules/clothes-center/constant';
import { ElMessage } from 'element-plus';
import { resizeImgByWidth } from '@/core/utils/helper';
import { useSizeTypeTable } from './hooks/use-size-type-table';
import { patternClothesGetLatestPassAuditPatternByStyleCode } from '@/modules/clothes-center/views/paper-task/api';
import SpuInfo from '@/modules/style-data-manage/components/spu-info/index.vue';
import useSewTableList from '@/modules/clothes-center/components/sew-require-card/hooks/use-table-list';

const router = useRouter();
const route = useRoute();
const { convertToArray, setDefaultSewingList, convertToTree } = useSewTableList();

const isView = computed(() => route.name === 'StyleDataManageLargeDetail');

const formElRef = ref<InstanceType<typeof ElForm> | null>(null); // 大货纸样
const sizeFormElRef = ref<InstanceType<typeof ElForm> | null>(null); // 大货尺寸表
const sewRequireRef = ref();

// 列表基础数据
const baseData = Object.freeze({
  /**
   * 主键
   */
  styleSizeDetailId: '',
  /**
   * 款式主表id
   */
  styleInfoId: '',
  /**
   * 部位
   */
  position: '',
  /**
   * 尺寸维度 1-X1、2-X2
   */
  sizeDimension: '',
  /**
   * 量法
   */
  measureWay: '',
  /**
   * 样衣尺寸
   */
  sampleSize: '',
  /**
   * 样衣尺寸基码
   */
  sampleBaseYardage: '',
  /**
   * 纸样尺寸
   */
  designSize: '',
  /**
   * 纸样尺寸基码
   */
  designBaseYardage: '',
  /**
   * 跳码系数
   */
  skipSizeQuotietyList: [],
  /**
   * 尺寸数据
   */
  sizeList: [],
  /**
   * 允差范围 CM
   */
  deviationRange: '',
});

// 工艺指导书
const sewFormData = ref<any>({
  cuttingRequire: '',
  tailRequire: '',
  referStyleTemplateCode: '',
  referStyleTemplateName: '',
  referComponentTemplateCode: '',
  referComponentTemplateName: '',
  sewingRequireList: [],
});
// [大货纸样]表单数据处理
const formData = ref({
  patternList: [] as IFile[],
  markList: [] as IFile[],
  craftAttachmentList: [] as IFile[],
});

// [大货尺寸表]表单数据处理
const {
  queryRef,
  sizeFormData,
  sizeStandard,
  plmStandardSizeList,
  sizeListItem,
  readonlyFormData,
  handleSizeStandardChange,
} = useSizeFormData();

// [大货尺寸表]表单校验
const sizeFormRules = ref({
  sizeStandardCode: [
    {
      required: true,
      trigger: ['change', 'blur'],
      validator: (rule: any, value: string, cb: any) => {
        if (!sizeFormData.value.sizeStandardCode) {
          cb(new Error('请选择尺码标准'));
        } else {
          cb();
        }
      }
    },
  ],
  sampleBaseYardage: [
    { required: true, message: '请选择样衣尺寸', trigger: ['change', 'blur'] },
  ],
  designBaseYardage: [
    { required: true, message: '请选择纸样尺寸', trigger: ['change', 'blur'] },
  ]
});

// [大货尺寸表]放码规则表格
const {
  tableColumns: skipSizeTableColumns,
  skipSizeTableList,
  setSkipSizeData, hasListData,
  getSkipSizeData,
  skipSizeData
} = useSkipSizeTable({
  readonlyFormData,
  selectSizeItem: sizeListItem,
  submitCb: () => {
    setSize();
  }
});
const {
  tableColumns: sizeTableColumns,
  sizeTableList,
  handleAddSize
} = useSizeTable({
  sizeFormData,
  sizeList: sizeListItem,
});
const { handleSetSkipSize } = useSizeSkip({
  sizeList: sizeTableList,
  sampleBaseYardage: toRef(readonlyFormData.value, 'sampleBaseYardage'),
});

const handleStandardChange = async (customerSizeList?: CustomerSizeListItem[]) => {
  await setSkipSizeData();
  try {
    const dataList = hasListData()
      ? getSkipSizeData()
      : [{ size: '', data: '' }];

    if (!sizeTableList.value.length) {
      sizeTableList.value.push(cloneDeep(baseData));
    }
    handleSetSkipSize(dataList);

    if (Array.isArray(customerSizeList) && customerSizeList.length) {
      // 对齐长度
      if (sizeTableList.value.length > customerSizeList.length) {
        sizeTableList.value.length = customerSizeList.length;
      } else if (sizeTableList.value.length < customerSizeList.length) {
        const diffNum = customerSizeList.length - sizeTableList.value.length;

        for (let i = 0; i < diffNum; i++) {
          handleAddSize(sizeTableList.value[0]);
        }
      }
      sizeTableList.value.forEach((item, i) => {
        const data = customerSizeList[i];
        item.position = data.positionName;
        item.sizeDimension = data.dimension;
        item.measureWay = data.measuringMethod;
        item.deviationRange = data.tolerance;
        item.designSize = data.patternSize;
        item.sampleSize = data.sampleClothesSize;
      });
    }
  } catch (err) {
    // const e = err as Error & {
    //   type?: string;
    // };
    // if (e.type === skipSizeRef.value!.ERR_TYPE) {
    //   ElMessage.warning(e.message);
    // } else {
    //   throw err;
    // }
  }
};

// [大货尺寸表]尺码标准切换处理
const triggerSizeStandardChange = async () => {
  await handleSizeStandardChange(() => {
    handleStandardChange();
    sizeFormElRef.value?.validateField('sizeStandardCode');
    skipSizeTableList.value.forEach((item) => {
      item.startSize = '';
      item.endSize = '';
    });
    // 当 尺码标准 变化时清空跳码
    sizeTableList.value.forEach((item) => {
      item.skipSizeQuotietyList = [];
      item.sizeList = [];
    });
  });
};

const setSize = () => {
  const getUniqueSizes = (arr: any) => {
    const sizes = new Set();
    arr.forEach((item: any) => {
      const [start, end] = item.size.split('-'); // 按 "-" 分割
      // 找到区间内的所有尺码
      const findStartIndex = sizeListItem.value.children.findIndex(sizeChildItem => sizeChildItem.value === start);
      const findEndIndex = sizeListItem.value.children.findIndex(sizeChildItem => sizeChildItem.value === end);
      const sliceList = sizeListItem.value.children.slice(findStartIndex, (findEndIndex + 1));
      sliceList.forEach((sizeChildItem: any) => {
        sizes.add(sizeChildItem.value); // 添加尺码
      });
    });
    return Array.from(sizes); // 转换为数组
  };
  const sizeJson = (getUniqueSizes(skipSizeData.value)).map((item: any) => {
    return {
      size: item,
      data: '',
    };
  });
  // 设置跳码系数
  const skipSizeQuotietyList = skipSizeData.value.map((item: any) => {
    return {
      size: item.size,
      data: '',
    };
  });

  sizeTableList.value.forEach((item) => {
    item.sizeList = cloneDeep(sizeJson);
    item.skipSizeQuotietyList = cloneDeep(skipSizeQuotietyList);
  });
};

const handleGoBack = () => {
  const query = {} as { [key: string]: string; };
  if (route.query?.componentName) {
    query.componentName = route.query.componentName as string;
  }
  if (route.query?.state) {
    query.state = route.query.state as string;
  }
  router.push({
    name: 'StyleDataManageLargeList',
    query
  });
};

const { handleSizeHoppingChange } = useSizeHopping(sizeTableList, sizeFormData, sizeListItem);
/**
 * 获取号型
 */
const { sizeTypeList, columns: sizeTypeColumns, getLargeSizeType } = useSizeTypeTable();

// 获取详情
const detailData = ref<IStyleInfoDetailRes>({} as IStyleInfoDetailRes);
// 旧数据标识
const fileDataFlag = computed(() => {
  /**
   * bizChannel = 3 统一是工艺指导书【表单】的方式提交
   * bizChannel = 2
   * 未提交的情况下 统一是工艺指导书【表单】的方式提交
   * 已提交的情况下 && craftBook 工艺指导书不等于空的 工艺指导书【表单】的方式提交
   * 已提交的情况下 && craftBook 工艺指导书等于空的 附件的方式提交
   */
  const { craftBook, bizChannel, state } = detailData.value;
  // eslint-disable-next-line vue/max-len
  if (state === '3' && bizChannel === '2' && (!craftBook || (typeof craftBook === 'object' && !Object.keys(craftBook).length))) {
    return true;
  }
  return false;
});
const inSkipSizeArr = () => {
  const skipSizeQuotietyList = skipSizeData.value;
  // 基码是否在跳码段内
  if (skipSizeData.value.length) {
    const startItem = skipSizeQuotietyList[0].size.split('-');
    const endItem = skipSizeQuotietyList[skipSizeQuotietyList.length - 1].size.split('-');
    const startSize = startItem[0];
    const endSize = endItem[1];
    const allSizeList = sizeListItem.value.children.map(item => item.value);
    const minSizeIndex = allSizeList.indexOf(startSize);
    const maxSizeIndex = allSizeList.indexOf(endSize);
    const baseSizeIndex = allSizeList.indexOf(sizeFormData.value.sampleBaseYardage as any);
    if (baseSizeIndex > maxSizeIndex || baseSizeIndex < minSizeIndex) {
      ElMessage.warning('基码不在跳码范围内，请重新选择');
      return false;
    }
  }
  return true;
};
// 提交
const handleSubmitForm = async () => {
  // 验证表单
  const validateForms = async () => {
    const validations = [formElRef.value?.validate(), sizeFormElRef.value?.validate()];
    if (!fileDataFlag.value) {
      validations.push(sewRequireRef.value?.validateForm());
    }
    await Promise.all(validations);
  };

  await validateForms();

  if (!inSkipSizeArr()) {
    return;
  }
  // 附件数据
  const buildStyleAttachmentReqs = () => {
    const createAttachmentItems = (list: IFile[], type: string) => list.map(item => ({
      styleInfoId: detailData.value.styleInfoId,
      attachmentType: type,
      attachmentUrl: item.url,
      attachmentName: item.name || '',
    } as IStyleInfoSubmitReqStyleAttachmentReqsItem));

    return [
      ...createAttachmentItems(formData.value.patternList, '3'), // 纸样文件
      ...createAttachmentItems(formData.value.markList, '4'), // 唛架文件
      ...(fileDataFlag.value ? createAttachmentItems(formData.value.craftAttachmentList, '1') : []), // 工艺单
    ];
  };
  // 工艺书数据
  const buildCraftBookReq = () => {
    if (fileDataFlag.value) return {};
    const sewingRequireList = convertToTree(sewFormData.value.sewingRequireList);
    return {
      cutDemand: sewFormData.value.cuttingRequire,
      tailDemand: sewFormData.value.tailRequire,
      sewDemands: sewingRequireList.map((v: any) => ({
        componentId: v.componentId,
        componentName: v.componentName,
        processStyleSewingDetail: v?.children.map((item: any) => ({
          componentName: v.componentName,
          structural: item.structuralDesc,
          sewingRequires: item?.children.map((it: any) => ({ desc: it.sewingRequires })),
        }))
      }))
    };
  };

  const styleAttachmentReqs = buildStyleAttachmentReqs();
  const craftBookReq = buildCraftBookReq() as IStyleInfoSubmitReqCraftBookReq;

  await styleInfoSubmit({
    styleInfoId: detailData.value.styleInfoId,
    styleCode: detailData.value.styleCode,
    styleAttachmentReqs,
    styleDetailSizeReq: {
      styleInfoId: detailData.value.styleInfoId,
      clothingSizeType: sizeFormData.value.sizeStandardCode,
      clothingSizeTypeName: sizeFormData.value.sizeStandard || '',
      recommendWeightJson: detailData.value.recommendWeightJson || '',
      list: (sizeTableList.value || []).map(item => ({
        ...item,
        sampleBaseYardage: sizeFormData.value.sampleBaseYardage!,
        designBaseYardage: sizeFormData.value.designBaseYardage!,
      })),
    },
    sizeCategoryReq: sizeTypeList.value?.[0] || {} as IStyleInfoSubmitReqSizeCategoryReq,
    craftBookReq,
  });
  ElMessage.success('提交成功');
  setTimeout(() => {
    handleGoBack();
  }, 1000);
};

// 首次编辑,默认获取审版工艺单中的数据
const getSewData = async () => {
  const { data } = await auditCraftOrderDetailByStyleCode({ styleCode: detailData.value.styleCode });
  const sewRequire = data?.sewRequire || [] as IAuditCraftOrderDetailByStyleCodeRes['sewRequire'];
  sewFormData.value = {
    cuttingRequire: data?.cuttingRequire || cuttingRequireDefault,
    tailRequire: data?.tailRequire || tailRequireDefault,
    referStyleTemplateCode: '',
    referStyleTemplateName: '',
    referComponentTemplateCode: '',
    referComponentTemplateName: '',
    sewingRequireList: sewRequire?.length
      ? convertToArray(sewRequire as any)
      : setDefaultSewingList(`${Date.now()}`)
  };
};

// 首次编辑获取最新SPU信息回填尺寸表
const getSizeList = async () => {
  const { data } = await patternClothesGetLatestPassAuditPatternByStyleCode(detailData.value.styleCode);

  sizeFormData.value.sizeStandard = data?.sizeStandard || ''; // 尺码标准
  sizeFormData.value.sizeStandardCode = data?.sizeStandardCode || ''; // 尺码标准编号
  sizeFormData.value.sampleBaseYardage = data?.sampleClothesSize || ''; // 样衣尺寸
  sizeFormData.value.designBaseYardage = data?.patternSize || ''; // 纸样尺寸

  sizeTableList.value = data?.patternClothesSizeList ? data.patternClothesSizeList.map(item => ({
    position: item.positionName || '',
    sizeDimension: item.dimension || '',
    measureWay: item.measuringMethod || '',
    sampleSize: item.sampleClothesSize || '',
    sampleBaseYardage: sizeFormData.value.sampleBaseYardage || '',
    designBaseYardage: sizeFormData.value.sampleBaseYardage || '',
    designSize: item.patternSize || '',
    deviationRange: item.tolerance || '',
    skipSizeQuotietyList: [],
    sizeList: [],
  })) : [{ ...baseData }];
};

const getDetail = async () => {
  const id = route.params.id as string;
  const { data } = await styleInfoDetail({ styleInfoId: id });
  detailData.value = data || {};
  formData.value.patternList = (data.styleAttachments || []).filter(item => item.attachmentType === '3').map((item) => {
    return {
      url: item.attachmentUrl,
      name: item.attachmentName || '',
    };
  }) as IFile[];
  formData.value.markList = (data.styleAttachments || []).filter(item => item.attachmentType === '4').map((item) => {
    return {
      url: item.attachmentUrl,
      name: item.attachmentName || '',
    };
  }) as IFile[];
  // eslint-disable-next-line vue/max-len
  formData.value.craftAttachmentList = (data.styleAttachments || []).filter(item => item.attachmentType === '1').map((item) => {
    return {
      url: item.attachmentUrl,
      name: item.attachmentName || '',
    };
  }) as IFile[];

  const [styleSizeDetailVo] = data.styleSizeDetailVos;

  if (styleSizeDetailVo) {
    skipSizeTableList.value = styleSizeDetailVo.skipSizeQuotietyList.map((item) => {
      const [startSize, endSize] = item.size.split('-');
      return {
        startSize,
        endSize,
      };
    });
  }
  if (data.sizeCategory?.sizeNumInfoList?.length) {
    sizeTypeList.value = [{ ...(data.sizeCategory || {}) }] as any;
  }
  // 首次编辑(待提交、版本为1)
  if (data.state === '1' && data.styleInfoVersion === '1') {
    getSewData();
    getSizeList();
  } else {
    const { craftBook } = data;
    sizeFormData.value.sizeStandard = data.clothingSizeTypeName || '';
    sizeFormData.value.sizeStandardCode = data.clothingSizeType || '';
    sizeFormData.value.sampleBaseYardage = styleSizeDetailVo?.sampleBaseYardage || '';
    sizeFormData.value.designBaseYardage = styleSizeDetailVo?.designBaseYardage || '';
    sizeTableList.value = data?.styleSizeDetailVos?.length ? data.styleSizeDetailVos : [{ ...baseData }];
    sewFormData.value = {
      cuttingRequire: craftBook?.cutDemand || cuttingRequireDefault,
      tailRequire: craftBook?.tailDemand || tailRequireDefault,
      referStyleTemplateCode: '',
      referStyleTemplateName: '',
      referComponentTemplateCode: '',
      referComponentTemplateName: '',
      sewingRequireList: craftBook?.sewDemands
        ? convertToArray(craftBook?.sewDemands as any, 'processStyleSewingDetail')
        : setDefaultSewingList(`${Date.now()}`)
    };
  }
  // 品类编码有值则自动获取号型，否则接口会报错提示
  if (data.styleType) {
    getLargeSizeType({
      sizeStandardCodes: [data.clothingSizeType || ''],
      categoryCode: data.styleType || '',
    });
  }
};

getDetail();

</script>
