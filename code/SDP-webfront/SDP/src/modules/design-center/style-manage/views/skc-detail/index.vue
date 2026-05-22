<template>
  <sc-app-page :main="{ style: { padding: 0, background: 'transparent' } }">
    <template #main>
      <el-scrollbar>
        <div class='container' v-if="detail">
          <div
            class='panel spu_info'
          >
            <div class='header'>
              <div class="left">
                <div class='title'>{{detail?.prototypeInfo?.designCode}}</div>
                <el-tag type="warning">{{detail?.styleInfo?.supplyModeName}}</el-tag>
                <el-tag type="danger" v-if="detail?.prototypeInfo?.isCanceled">取消</el-tag>
                <el-tag type="success" v-if="detail?.prototypeInfo?.isOnSale">动销</el-tag>
              </div>
              <div class="right">
                <el-button
                  type="primary"
                  v-if="!readOnly && BJSPU"
                  @click="handleUpdateSpu(detail?.styleInfo?.designStyleId ?? '', false)"
                >编辑SPU信息</el-button>
              </div>
            </div>
            <div class='content'>
              <sc-responsive-row
                :col="{
                  xs: 12,
                  sm: 12,
                  md: 8,
                  lg: 6,
                  xl: 6
                }"
              >
                <el-form-item label="设计师:">
                  {{detail?.prototypeInfo?.designerName}}
                </el-form-item>
                <el-form-item label="设计组:">
                  {{detail?.prototypeInfo?.designerGroup}}
                </el-form-item>
                <el-form-item label="SPU创建时间:">
                  {{$filters.formatTime(detail?.styleInfo?.createdTime)}}
                </el-form-item>
                <el-form-item label="SKC创建时间:">
                  {{$filters.formatTime(detail?.prototypeInfo?.skcCreatedTime || '')}}
                </el-form-item>
                <el-form-item label="品类:">
                  {{detail?.styleInfo?.categoryName}}
                </el-form-item>
                <el-form-item label="SPU:">
                  {{detail?.styleInfo?.styleCode}}
                </el-form-item>
                <el-form-item label="SPU创建人员:">
                  {{detail?.styleInfo?.creatorName}}
                </el-form-item>
                <el-form-item label="波段:">
                  {{detail?.styleInfo?.waveBandName}}
                </el-form-item>
                <el-form-item label="款式标签:">
                  {{detail?.styleInfo?.styleLabelName}}
                </el-form-item>
                <el-form-item label="款式级别:">
                  {{detail?.styleInfo?.styleLevelName}}
                </el-form-item>
                <el-form-item label="店铺:">
                  {{detail?.styleInfo?.storeName}}
                </el-form-item>
                <el-form-item label="款式类型:">
                  {{detail?.styleInfo?.designTypeName}}
                </el-form-item>
                <el-form-item label="品质等级:">
                  {{detail?.styleInfo?.qualityLevelName}}
                </el-form-item>
                <el-form-item label="织造方式:">
                  {{detail?.styleInfo?.weaveModeName}}
                </el-form-item>
                <el-form-item label="季节:">
                  {{ detail?.styleInfo?.seasonName }}
                </el-form-item>
                <el-form-item label="尺码组:">
                  {{detail?.styleInfo?.sizeStandardName}}
                </el-form-item>
                <el-form-item label="印花类型:">
                  {{detail?.styleInfo?.printingName}}
                </el-form-item>
                <el-form-item label="视觉形式:">
                  {{detail?.styleInfo?.visualFormName}}
                </el-form-item>
                <el-form-item label="版型:">
                  {{detail?.styleInfo?.patternName}}
                </el-form-item>
                <el-form-item label="风格:">
                  {{detail?.styleInfo?.clothingStyleName}}
                </el-form-item>
                <el-form-item label="弹性:">
                  {{detail?.styleInfo?.elasticName}}
                </el-form-item>
                <el-form-item label="面料池使用范围:">
                  {{detail?.styleInfo?.sceneName}}
                </el-form-item>
                <el-form-item label="SKU分类:">
                  {{detail?.styleInfo?.skuClassName}}
                </el-form-item>
                <el-form-item
                  v-if="detail?.styleInfo?.skuClassName && detail?.styleInfo?.skuClassName !== '单品'"
                  :label="`${detail?.styleInfo?.skuClassName === '套装' ? '套装件数' : '单品数量'}:`"
                >
                  {{detail?.styleInfo?.suitPiece}}
                </el-form-item>
                <el-form-item label="项目类型:">
                  {{detail?.styleInfo?.projectTypeName}}
                </el-form-item>
                <el-form-item
                  label="商品链接:"
                  :col="{
                    xs: 24, sm: 24, md: 16, lg: 12, xl: 12
                  }"
                >
                  {{detail?.styleInfo?.commodityLink}}
                </el-form-item>
              </sc-responsive-row>
            </div>
          </div>
          <el-tabs v-model="activeTab" class="skc-tabs">
            <el-tab-pane label="基础信息" name="base">
              <div class="tab-content">
                <div
                  class="tw-flex tw-gap-10px"
                >
                  <div
                    class="panel tw-flex-1 inspiration_info"
                  >
                    <div class="header">
                      <div class="left">
                        <div class="title">营销图</div>
                      </div>
                      <div class="right">
                        <el-button
                          type="primary"
                          text
                          v-if="!readOnly"
                          @click="handleCopyImage"
                        >复制到设计图</el-button>
                      </div>
                    </div>
                    <div class="ul">
                      <Uploader
                        class="tw-ml-[-5px]"
                        v-model="materialInfoImg"
                        :disabled="readOnly"
                        uploader-style="button"
                        :limit="10"
                        :accept="'.png, .jpg, .jpeg'"
                        :size-limit="20"
                        :tips="''"
                      />
                    </div>
                  </div>
                </div>
                <div
                  class="tw-flex tw-gap-10px"
                >
                  <div
                    class="panel tw-flex-1 inspiration_info"
                  >
                    <div class="header">
                      <div class="left">
                        <div class="title">设计图</div>
                      </div>
                    </div>
                    <div class="ul">
                      <Uploader
                        class="tw-ml-[-5px]"
                        :disabled="readOnly"
                        v-model="detail.prototypeInfo.designPicture"
                        uploader-style="button"
                        :limit="10"
                        :accept="'.png, .jpg, .jpeg'"
                        :size-limit="20"
                        :tips="''"
                      />
                    </div>
                  </div>
                </div>
                <div
                  class="tw-flex tw-gap-10px"
                >
                  <div
                    class="panel tw-flex-1 inspiration_info"
                  >
                    <div class="header">
                      <div class="left">
                        <div class="title">视频</div>
                      </div>
                    </div>
                    <div class="ul">
                      <Uploader
                        class="tw-ml-[-5px]"
                        v-model="materialInfoVideo"
                        :disabled="readOnly"
                        uploader-style="button"
                        :limit="1"
                        :accept="'.mp4, .mov, .avi'"
                        :size-limit="50"
                        :tips="''"
                      />
                    </div>
                  </div>
                </div>
                <el-form
                  label-width="100px"
                  class="tw-flex-1"
                  ref="formEl"
                  :model="detail?.prototypeInfo"
                  :rules="rules"
                >
                  <div
                    class='panel style_info'
                  >
                    <div class='header'>
                      <div class="left">
                        <div class='title'>开发信息</div>
                      </div>
                    </div>
                    <div class="tw-flex tw-flex-col tw-gap-10px">
                      <div class="panel border">
                        <sc-responsive-row>
                          <el-form-item label="颜色" prop="colorCodes">
                            <ColorCascader
                              v-model="(detail.prototypeInfo.colorCodes)"
                              clearable
                              class='tw-w-100%'
                              show-all-levels
                              :colorProps="colorProps"
                              :disabled="readOnly"
                            />
                          </el-form-item>
                          <el-form-item label="尺码" prop="sampleSize">
                            <el-select
                              v-model="detail.prototypeInfo.sampleSize"
                              :disabled="readOnly"
                            >
                              <el-option
                                v-for="item in PLM_STANDARY_SIZE"
                                :key="item.value"
                                :value="item.value"
                                :label="item.label"
                              />
                            </el-select>
                          </el-form-item>
                          <el-form-item label="是否拼接" prop="isSplicing">
                            <el-radio-group
                              v-model='detail.prototypeInfo.isSplicing'
                              :disabled="readOnly"
                            >
                              <el-radio :value='true'>是</el-radio>
                              <el-radio :value='false'>否</el-radio>
                            </el-radio-group>
                          </el-form-item>
                          <el-form-item label="制作方式" prop="makeClothesType">
                            <el-radio-group
                              v-model='detail.prototypeInfo.makeClothesType'
                              :disabled="readOnly"
                            >
                              <el-radio :value='1'>实物样</el-radio>
                              <el-radio :value='2'>3D样</el-radio>
                            </el-radio-group>
                          </el-form-item>
                          <el-form-item label="前置拆版" prop="preDisassemblyState">
                            <el-radio-group
                              v-model='detail.prototypeInfo.preDisassemblyState'
                              :disabled="readOnly"
                            >
                              <el-radio :value='1'>是</el-radio>
                              <el-radio :value='0'>否</el-radio>
                            </el-radio-group>
                          </el-form-item>
                        </sc-responsive-row>
                      </div>
                      <div class="panel remark_panel border clear-form-margin">
                        <div class="sub_title">备注</div>
                        <div class="content">
                          <div class="item">
                            <div class="label">车缝备注</div>
                            <el-form-item label-width="0" prop="sewingRemark">
                              <el-input
                                :disabled="readOnly"
                                type="textarea"
                                :rows="4"
                                :maxlength="200"
                                resize="none"
                                v-model="detail.prototypeInfo.sewingRemark"
                              />
                            </el-form-item>
                          </div>
                          <div class="item">
                            <div class="label">裁剪工艺备注</div>
                            <el-form-item label-width="0" prop="cuttingRemark">
                              <el-input
                                :disabled="readOnly"
                                type="textarea"
                                :rows="4"
                                :maxlength="200"
                                resize="none"
                                v-model="detail.prototypeInfo.cuttingRemark"
                              />
                            </el-form-item>
                          </div>
                          <div class="item">
                            <div class="label">版型备注</div>
                            <el-form-item label-width="0" prop="typeRemark">
                              <el-input
                                :disabled="readOnly"
                                type="textarea"
                                :rows="4"
                                :maxlength="200"
                                resize="none"
                                v-model="detail.prototypeInfo.typeRemark"
                              />
                            </el-form-item>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </el-form>
              </div>
            </el-tab-pane>
            <el-tab-pane label="BOM" name="bom">
              <div class="tab-content tw-flex" style="flex-direction: initial;">
                <div class="panel tw-w-50%">
                  <!-- <div class="header">
                    <div class="left">
                      <div class="title">物料信息</div>
                    </div>
                  </div> -->
                  <el-table
                    :data="detail?.prototypeInfo.bomList"
                    border
                    style="width: 100%"
                  >
                    <el-table-column
                      prop="demandType"
                      label="类型"
                      width="120"
                    >
                      <template #default="{ row }">
                        <div>{{ DEMAND_TYPE_LIST?.find(v => v.value === row.demandType)?.label }}</div>
                      </template>
                    </el-table-column>
                    <el-table-column label="物料信息">
                      <template #default="{ row }">
                        <div class="material-info">
                          <div class="material-item">
                            <span class="material-label">SPU:</span>
                            <span class="material-value">{{ row.commodityCode || '-' }}</span>
                          </div>
                          <div class="material-item">
                            <span class="material-label">SKU:</span>
                            <span class="material-value">{{ row.skuCode || '-' }}</span>
                          </div>
                        </div>
                      </template>
                    </el-table-column>
                  </el-table>
                </div>
                <div v-if="!detail?.prototypeInfo.patternPictureUrl" class="tw-w-50% tw-flex tw-flex-col tw-flex-center-y">花型图：-</div>
                <div v-else class="tw-w-50% tw-flex tw-flex-col tw-flex-center-y">
                  <div>花型图id：{{detail?.prototypeInfo.patternPictureId }}</div>
                  <el-image
                    :class="`tw-w-160px tw-h-160px tw-m-t-10px tw-m-b-10px`"
                    :src="detail?.prototypeInfo.patternPictureUrl"
                    :initial-index="0"
                    :preview-src-list="[detail?.prototypeInfo.patternPictureUrl]"
                    fit="contain"
                  />
                  <el-button
                    type="primary"
                    text
                    @click="handleDownloadImages(detail?.prototypeInfo.patternPictureUrl)"
                  >下载</el-button>
                </div>
              </div>
            </el-tab-pane>
            <el-tab-pane label="款式记录" name="record">
              <div class="tab-content">
                <div class="panel">
                  <div class="header">
                    <div class="left">
                      <div class="title">核价信息</div>
                    </div>
                  </div>
                  <el-table
                    :data="priceRecordData"
                    border
                    style="width: 100%"
                  >
                    <el-table-column
                      prop="priceOrderNo"
                      label="核价单号"
                      min-width="150"
                    />
                    <el-table-column
                      prop="totalCost"
                      label="对厂总价结算不加成"
                      min-width="150"
                    >
                      <template #default="{ row }">
                        <span v-if="row.totalCost">¥ {{ row.totalCost }}</span>
                        <span v-else>-</span>
                      </template>
                    </el-table-column>
                    <el-table-column
                      prop="checkPriceTime"
                      label="核价完成时间"
                      min-width="180"
                    >
                      <template #default="{ row }">
                        {{ row.checkPriceTime ? $filters.formatTime(row.checkPriceTime) : '-' }}
                      </template>
                    </el-table-column>
                  </el-table>
                </div>
              </div>
            </el-tab-pane>
          </el-tabs>
        </div>
      </el-scrollbar>
    </template>
    <template #ffooter>
      <el-row class='tw-w-100%' justify="end">
        <el-button
          @click="handleCancel"
        >
          返回
        </el-button>
        <el-button
          type="primary"
          v-if="!readOnly"
          @click="handleConfirm"
        >
          提交
        </el-button>
      </el-row>

    </template>
  </sc-app-page>
</template>
<script lang="ts" setup>
import { computed, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { getSkcDetail, updateSkcInfo, latestBaseInfo, postDesignPriceProduceInfoApi } from '../../api';
import { IColorItem } from './types';
import { ElForm, ElMessage, FormRules } from 'element-plus';
import { PrototypeManageSaveReqMaterialInfoItem, PrototypeManageSaveReqColorInfoListItem } from '../../api/types';
import { useDictionary } from '@/hooks/use-dictionary';
import { DICTIONARY_KEY } from '@/constant/dictionary';
import { useUpdateSPU } from '../../hook/use-update-spu';
import { isEmpty } from '@toy/utils';
import { usePermissionConfig } from '../../use-permission-config';
import { DEMAND_TYPE_LIST } from '../list/constant';
import { exportByBlob } from '@/core/utils/file-download';


const materialInfoImg = ref<{ url: string; }[]>([]);
const materialInfoVideo = ref<{ url: string; }[]>([]);
const $route = useRoute();
const $router = useRouter();
const readOnly = ref(true);
const formEl = ref<InstanceType<typeof ElForm>>();
const detail = ref<any>();
const { BJSPU } = usePermissionConfig();
const activeTab = ref('base');
const bomData = ref<any[]>([]);
const priceRecordData = ref<any[]>([]);

const colorProps = {
  label: 'label',
  value: 'value',
  multiple: true,
};
// 提交需要校验的字段
const rulesNameKeyList: string[] = ['categoryName', 'styleLabelName', 'storeName', 'sizeStandardName', 'styleLevelName', 'qualityLevelName', 'weaveModeName', 'clothingStyleName', 'printingName', 'seasonName', 'patternName', 'elasticName', 'visualFormName'];

const rules: FormRules = {
  designPicture: {
    required: true,
    message: '设计图不能为空'
  },
  colorCodes: {
    required: true,
    validator: (_rules, val, cb) => {
      if ((val?.length ?? 0) === 0) {
        cb('颜色不能为空');
      } else if (val.length > 6) {
        cb('最多只能选6个颜色');
      } else {
        cb();
      }
    }
  },
  sampleSize: {
    required: true,
    message: '尺码不能为空'
  },
  isSplicing: {
    required: true,
    message: '选项不能为空'
  },
  makeClothesType: {
    required: true,
    message: '制作方式不能为空'
  },
  preDisassemblyState: {
    required: true,
    message: '前置拆版不能为空'
  },
};
const { getDictionaryOptions, getDictionaryOptionsSync } = useDictionary();
const { handleUpdateSpu } = useUpdateSPU({
  reloadFn() {
    getInfo();
  },
});
const PLM_STANDARY_SIZE = computed(() => {
  const list = getDictionaryOptions(DICTIONARY_KEY.PLM_STANDARY_SIZE);
  if (!detail.value?.styleInfo.sizeStandardCode) return [];
  const row = list
    .find(v => v.value === detail.value?.styleInfo.sizeStandardCode)?.children?.[0];
  const default_value = list
    .find(v => v.value === detail.value?.styleInfo.sizeStandardCode)?.attributes?.find(v => v.code === 'default_value')?.name;
  if (!row) return [];
  return row.label.split(',').map((v: string) => ({
    label: v,
    value: v,
    default: v === default_value,
  }));
});
watch([() => PLM_STANDARY_SIZE.value, () => detail.value?.prototypeInfo], () => {
  if (!detail.value?.prototypeInfo?.sampleSize && detail.value?.prototypeInfo) {
    detail.value.prototypeInfo.sampleSize = PLM_STANDARY_SIZE.value.find(v => v.default)?.value;
  }
  if (PLM_STANDARY_SIZE.value.length && detail.value?.prototypeInfo?.sampleSize && !PLM_STANDARY_SIZE.value.some(v => v.value === detail.value?.prototypeInfo?.sampleSize)) {
    detail.value.prototypeInfo.sampleSize = '';
  }
}, {
  immediate: true,
});
const CLOTHING_COLOR = ref<IColorItem[]>([]);
const getColors = async () => {
  const list = await getDictionaryOptionsSync(DICTIONARY_KEY.CLOTHING_COLOR);
  const colors: IColorItem[] = [];
  list.forEach((v) => {
    const curColorList: IColorItem[] = [];
    v.children?.forEach((it) => {
      if (it.attributes?.length === 0) return;
      const colorAbbrCode = it.attributes?.find(item => item.code === 'YWSX')?.name!;
      const colorEnglishName = it.attributes?.find(item => item.code === 'YWFY')?.name!;
      const colorNumber = it.attributes?.find(item => item.code === 'SH')?.name!;
      if (isEmpty(colorAbbrCode) || isEmpty(colorNumber)) return;
      curColorList.push({
        ...it,
        pathCode: `${v.value}-${it.value}`,
        colorNumber,
        colorEnglishName,
        colorAbbrCode,
        children: [],
      });
    });
    if (curColorList.length) {
      colors.push({
        ...v,
        children: curColorList,
        colorEnglishName: '',
        pathCode: '',
        colorAbbrCode: '',
        colorNumber: '',
      });
    }
  });
  CLOTHING_COLOR.value = colors;
};
const CLOTHING_COLOR_MAP = computed(() => {
  const map = new Map<string, IColorItem>();
  CLOTHING_COLOR.value.forEach((v) => {
    v.children.forEach((it) => {
      map.set(it.value, it);
      map.set(it.pathCode, it);
    });
  });
  return map;
});
const getInfo = async () => {
  const designCode = $route.params.designCode as string;
  const { data } = await getSkcDetail({ prototypeId: designCode, isEdit: '0' });
  const colorCodes: Array<string[]> = [];
  (data.prototypeInfo.colorInfoList || []).forEach((v: any) => {
    if (CLOTHING_COLOR_MAP.value.has(v.colorCode!)) {
      const row = CLOTHING_COLOR_MAP.value.get(v.colorCode!)!;
      colorCodes.push(row.pathCode.split('-'));
    }
  });
  detail.value = {
    ...data,
    prototypeInfo: {
      ...data.prototypeInfo,
      designPicture: data.prototypeInfo.designPicture ? data.prototypeInfo.designPicture.map((url: string) => {
        return {
          url,
        };
      }) : [],
      colorCodes,
    }
  };
  const materialList = data?.prototypeInfo?.materialInfo ?? [];
  /**
   * materialType表示materialInfo集合的类型
   * 0 : 图片类型
   * 1 ：视频类型
   */
  materialInfoImg.value = materialList
    ?.filter(v => v.materialType === 0)
    ?.map(v => ({ url: v.materialUrl || '' }));
  materialInfoVideo.value = materialList
    ?.filter(v => v.materialType === 1)
    ?.map(v => ({ url: v.materialUrl || '' }));
  // 获取BOM和核价信息
  await Promise.all([
    getPriceRecordInfo(designCode),
  ]);
};

// 获取核价信息
const getPriceRecordInfo = async (designCode: string) => {
  // try {
  //   const { data } = await postDesignPriceProduceInfoApi({ designCodeList: [designCode] });
  //   const record = data?.[0];
  //   if (record?.priceOrderInfo) {
  //     priceRecordData.value = [{
  //       priceOrderNo: record.priceOrderInfo.designCode || '-',
  //       totalCost: record.priceOrderInfo.totalCost || '-',
  //       checkPriceTime: record.priceOrderInfo.checkPriceTime || '-',
  //     }];
  //   } else {
  //     priceRecordData.value = [];
  //   }
  // } catch (error) {
  //   priceRecordData.value = [];
  // }
};

const init = async () => {
  readOnly.value = $route.name === 'DesignCenterStyleManageSkcDetail';
  await getColors();
  getInfo();
};
init();
const handleCopyImage = () => {
  if (!materialInfoImg.value.length) {
    ElMessage.warning('请最少上传一张图片再执行此操作');
    return;
  }
  detail.value.prototypeInfo.designPicture = [];
  materialInfoImg.value.forEach((v) => {
    detail.value.prototypeInfo.designPicture.push({
      url: v.url,
    });
  });
};

const handleConfirm = async () => {
  let mag = '';
  rulesNameKeyList.forEach((v: string) => {
    if (!detail.value?.styleInfo?.[v]) {
      mag = '请先完善SPU信息';
    }
  });
  if (detail.value?.styleInfo?.skuClassName && detail.value?.styleInfo?.skuClassName !== '单品' && !detail.value?.styleInfo?.suitPiece) {
    mag = '请先完善SPU信息';
  }
  if (whetherToModify.value <= 1) {
    ElMessage.warning('当前页面并无任何操作');
    return;
  }
  if (mag) {
    ElMessage.warning(mag);
    return;
  }
  await formEl.value?.validate();
  const colorInfoList: PrototypeManageSaveReqColorInfoListItem[] = [];
  detail.value?.prototypeInfo.colorCodes.forEach((v: any) => {
    if (
      v.length === 2
      && CLOTHING_COLOR_MAP.value.has(v.join('-'))
    ) {
      const row = CLOTHING_COLOR_MAP.value.get(v.join('-'))!;
      if (row) {
        colorInfoList.push({
          colorAbbrCode: row.colorAbbrCode,
          colorNumber: row.colorNumber,
          colorEnglishName: row.colorEnglishName,
          colorCode: row.value,
          color: row.label
        });
      }
    }
  });
  const materialInfo: PrototypeManageSaveReqMaterialInfoItem[] = [];
  materialInfoImg.value.forEach((v: { url: string; }) => {
    materialInfo.push({
      styleCode: detail.value?.styleInfo?.styleCode,
      materialUrl: v.url,
      materialType: 0,
    });
  });
  materialInfoVideo.value.forEach((v: { url: string; }) => {
    materialInfo.push({
      styleCode: detail.value?.styleInfo?.styleCode,
      materialUrl: v.url,
      materialType: 1,
    });
  });
  await updateSkcInfo({
    designCode: detail.value?.prototypeInfo.designCode,
    prototypeId: detail.value?.prototypeInfo?.prototypeId,
    latestVersionNum: detail.value?.prototypeInfo.latestVersionNum,
    colorInfoList,
    designPicture: detail.value?.prototypeInfo.designPicture.map((v: { url: string; }) => v.url),
    sizeStandard: detail.value?.styleInfo?.sizeStandardName,
    sizeStandardCode: detail.value?.styleInfo?.sizeStandardCode,
    sampleSize: detail.value?.prototypeInfo?.sampleSize,
    cuttingRemark: detail.value?.prototypeInfo?.cuttingRemark,
    sewingRemark: detail.value?.prototypeInfo.sewingRemark,
    typeRemark: detail.value?.prototypeInfo?.typeRemark,
    isSplicing: detail.value?.prototypeInfo.isSplicing,
    makeClothesType: detail.value?.prototypeInfo.makeClothesType,
    preDisassemblyState: detail.value?.prototypeInfo.preDisassemblyState,
    materialInfo,
    color: colorInfoList.map(v => v.color).join('、'),
  });
  ElMessage.success('操作成功');
  $router.go(-1);
};
const handleCancel = () => {
  $router.push({
    name: 'DesignCenterStyleManageList'
  });
};

const whetherToModify = ref<number>(0);
watch(
  [
    () => materialInfoImg.value,
    () => materialInfoVideo.value,
    () => detail.value?.prototypeInfo,
  ],
  () => {
    whetherToModify.value += 1;
  },
  {
    deep: true,
    immediate: false
  }
);
// 下载图片
const handleDownloadImages = (url: string) => {
  exportByBlob({
    method: 'get',
    url,
    filename: url,
    loading: false,
  });
};

</script>
<style lang="scss" scoped>
:deep(.el-scrollbar__view) {
  height: 100%;
}
.container {
  display: flex;
  flex-direction: column;
  gap: 10px;
  height: 100%;
  // padding: 20px;
  .skc-tabs {
    background-color: #fff;
    padding: 10px;
    border-radius: 2px;
    :deep(.el-tabs__header) {
      margin-bottom: 15px;
    }
    :deep(.el-tabs__content) {
      overflow: visible;
    }
  }
  .tab-content {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  .material-info {
    padding: 8px 0;
    .material-item {
      display: flex;
      gap: 8px;
      margin-bottom: 8px;
      &:last-child {
        margin-bottom: 0;
      }
      .material-label {
        color: #606266;
        font-weight: 500;
        min-width: 40px;
      }
      .material-value {
        color: #303133;
      }
    }
  }
  .panel {
    padding: 10px;
    border-radius: 2px;
    background-color: #fff;
    &.border {
      border: 1px solid var(--el-border-color);
    }
    .header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 10px;
      padding-bottom: 15px;
      .left {
        display: flex;
        align-items: center;
        gap: 8px;
        .title {
          font-size: 18px;
          font-weight: bold;
          padding-right: 10px;
        }
      }
    }
    .sub_title {
      font-size: 14px;
      font-weight: bold;
      padding-bottom: 10px;
    }
  }
  .spu_info {
    .content {
      display: flex;
      align-content: start;
      // gap: 15px;
      flex-wrap: wrap;
      :deep(.el-form-item--default) {
        margin-bottom: 5px;
      }
    }
  }
  .inspiration_info {
    .ul {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      .li {
        width: 100px;
        height: 100px;
        border-radius: 4px;
      }
    }
  }
  .style_info {
    min-height: 100%;
    padding-bottom: 30px;
    .remark_panel {
      .content {
        display: flex;
        border: 1px solid var(--el-border-color);
        border-radius: 2px;
        .item {
          flex: 1;
          border-right: 1px solid var(--el-border-color);
          &:last-child {
            border-right: none;
          }
          .label {
            text-align: center;
            line-height: 28px;
            border-bottom: 1px solid var(--el-border-color);
          }
          :deep(.el-textarea__inner) {
            box-shadow: none;
          }
        }
      }
    }
  }
}
</style>
