<template>
  <div class="app-box">
    <div class="bth-flex">
      <el-button
        class="tw-mr-4"
        :icon="ArrowLeft"
        @click="goToPath"
        link
      />
      <el-button
        class="l-auto"
        type="primary"
        @click="submit"
      >
        创建款式
      </el-button>
    </div>
    <div class="table-box">
      <el-form
        ref="formRef"
        class="tw-h-100%"
        :model="tableData"
      >
        <!-- <sc-table
          class="tw-hidden-100% tw-overflow-scroll table-border-color"
          :data="tableData.slice(0, initIndex)"
          :columns="tableColumns"
          @scroll="handleElementTableScroll"
          key-field="mainImgUrl"
          :border="true"
        /> -->
        <VirtualTable
          v-loading="!tableData.length"
          element-loading-text="加载中..."
          element-loading-background="rgba(122, 122, 122, 0.8)"
          @batchFill="setForms"
          :data="tableData" 
          :item-height="121"
          :columns="tableColumns"
          :container-height="offsetHeight - 10"
          class="tw-h-100% tw-w-100%"
          :buffer-size="1"
        />
      </el-form>
    </div>
    <el-image-viewer
      v-if="showPreview"
      :url-list="imgUrl"
      show-progress
      :initial-index="0"
      @close="showPreview = false"
    />
    
  </div>
</template>

<script lang="ts" setup>
import { onUnmounted, ref, nextTick, PropType, defineProps, watch, computed, defineEmits, onMounted } from 'vue';
import ImageuploadcontrolUpgrade from '@/components/image-upload-control-upgrade/index.vue';
import { ArrowLeft } from '@element-plus/icons-vue';
import { useRouter } from 'vue-router';
import { useTableColumns } from './hooks/use-batchPayment-columns';
import CustomDropdown from '../../components/customDropdown.vue';
import usePersistTempData from './hooks/usePersistTempData';
import { IListItem } from './types';
import { developStyleBatchDevelopApi } from '../../api/index';
import { DevelopStyleBatchDevelopReqItem } from '../../api/types';
import { ElMessage, ElForm, ElMessageBox } from 'element-plus';
import VirtualTable from '../../components/virtualTable.vue';
import { generateCurlCommand, copyToClipboard, downloadTextFile } from '@/core/utils/curl-generator';


const showText1 = ref('');
const showText2 = ref('');
const showText3 = ref('');
const showText4 = ref('');
const formRef = ref<InstanceType<typeof ElForm> | null>();
const { get, remove } = usePersistTempData();
const showPreview = ref(false);
const imgUrl = ref<string[]>([]);
const router = useRouter();
const sum = ref();
const goBack = () => {};
const form = ref<any>({});
const ruleTableForm = ref<{ tableList: any[]; }>({
  tableList: [],
});
const goToPath = () => {
  router.replace('/design-center/payment-task/task-list');
};
const submit = async () => {
  let mag = '';
  tableData.value.forEach((item: DevelopStyleBatchDevelopReqItem, index: number) => {
    if (!mag && (
      !item.categoryList?.length
      || !item.colorList?.length
      || !item.storeId
      || !item.styleLabelCode
      || !item.styleLevelCode
      || !item.visualFormCode
      || !item.clothingStyleCode
      || !item.seasonCode
      || !item.printingCode
      || !item.sizeStandardCode
      || !item.weaveModeCode
      || !item.qualityLevelCode
      || !item.patternName
      || !item.styleLabelName)) {
      mag = `第${index + 1}行数据存在必填项未填写`;
    }
  });
  if (mag) {
    ElMessage.error(mag);
    await formRef.value?.validate();
    return;
  }
  await formRef.value?.validate();
  // console.log(styleType);
  /** 现货款 */
  // SPOT_STYLE = 'SPOT_STYLE',
  const requestData = tableData.value.map((info: any) => {
    return {
      ...info,
      colorList: info.styleType === 'SPOT_STYLE' ? [info?.colorList?.[0]] : info.colorList,
      skcs: info.styleType === 'SPOT_STYLE' ? [info.skcs[0]] : info.skcs,
      styleType: productTag.value.find((pr: { label: string; }) => pr.label === info.styleLabelName)?.attributes?.find((pr1: { code: string; }) => pr1.code === 'clothType')?.name ?? '',
    };
  });
  
  // 构建请求信息用于生成cURL
  const apiUrl = '/sdp-curation/web/v1/develop-style/batch-develop';
  const requestHeaders: Record<string, string> = {
    'Content-Type': 'application/json',
    'System-Code': 'SDP',
    'Client-Code': 'WEB',
  };
  
  developStyleBatchDevelopApi(requestData).then(() => {
    ElMessage.success('操作成功');
    goToPath();
  }).catch((err: Error) => {
    const curlCommand = generateCurlCommand({
      method: 'PUT',
      url: `${window.location.origin}${apiUrl}`,
      headers: requestHeaders,
      data: requestData,
    });
    
    // 显示错误对话框
    ElMessageBox.confirm(
      '请求出错',
      '',
      {
        confirmButtonText: '复制并下载错误信息',
        cancelButtonText: '取消',
        distinguishCancelAndClose: true,
        type: 'error',
        showCancelButton: true,
        showConfirmButton: true,
        closeOnClickModal: false,
        closeOnPressEscape: true,
      }
    ).then(() => {
      copyToClipboard(curlCommand).then(() => {
        const now = new Date();
        const timestamp = `${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, '0')}${String(now.getDate()).padStart(2, '0')}${String(now.getHours()).padStart(2, '0')}${String(now.getMinutes()).padStart(2, '0')}`;
        const filename = `错误日志${timestamp}.txt`;
        downloadTextFile(curlCommand, filename);
        ElMessage.success(`错误日志已下载：${filename}`);
      }).catch(() => {
        ElMessage.error('复制失败，请手动复制');
      });
    });
  });
};
const formData = ref<any>({});
const {
  tableColumns,
  tableData,
  plmClothingBand,
  searchConfig,
  consumerSalesConfig,
  classificationConfig,
  productionLabelConfig,
  pimsCategory,
  CLOTHING_COLOR,
  CLOTHING_COLOR_MAP,
  productTag,
} = useTableColumns({
  lookImg(url: string[]) {
    imgUrl.value = url;
    showPreview.value = true;
  },
  setForm(formDatas: any) {
    formData.value = formDatas;
  },
});
const form1 = ref<any>({});
const setForms = () => {
  const formDatas: any = formData.value;
  const data = formDatas?.categoryCode && formDatas?.categoryCode.length && findNodeByCodePath(formDatas?.categoryCode, pimsCategory.value);
  const colorInfoList: any = [];
  (formDatas?.colors ?? []).forEach((v: any) => {
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
  try {
    Object.keys(formDatas).forEach((key: string) => {
      const value = formDatas[key];
      if (!value && value !== 0) {
        delete formDatas[key];
      }
    });
  } catch {
    console.error('批量填写表单赋值异常');
  }
  tableData.value = tableData.value.map((v: any) => {
    return {
      ...v,
      ...formDatas,
      skcs: colorInfoList.length ? colorInfoList.map((v1: { color: string; colorEnglishName: string; colorCode: string; }) => {
        return {
          color: v1.color,
          colorEnName: v1.colorEnglishName,
          colorCode: v1.colorCode,
        };
      }) : v.skcs,
      colorList: (formDatas?.colors && formDatas?.colors.length) ? formDatas?.colors : v.colorList,
      categoryCode: (formDatas?.categoryCode && formDatas?.categoryCode.length) ? (formDatas?.categoryCode ?? []).join('-') : v.categoryCode,
      categoryName: (data && data.length) ? data?.join('-') : v.categoryName,
      categoryList: (formDatas?.categoryCode && formDatas?.categoryCode.length) ? formDatas?.categoryCode : v.categoryList,
      styleType: formDatas.styleLabelName ? (productTag.value.find((pr: { label: string; }) => pr.label === formDatas.styleLabelName)?.attributes?.find((pr1: { code: string; }) => pr1.code === 'clothType')?.name ?? '') : (v.styleType || ''),
    };
  });
  formRef.value?.clearValidate();
};
const pimsCategoryProps = {
  label: 'label',
  value: 'value',
  multiple: false,
};
const colorProps = {
  label: 'label',
  value: 'value',
  multiple: true,
};
const readOnly = ref(false);
// setTimeout(() => {
//   console.log(CLOTHING_COLOR.value);
// }, 5000);
const changeColor = (list: any) => {
  if (list.length > 6) {
    ElMessage.error('不超过六种颜色');
    form1.value.colors = form1.value.colors.slice(0, 6);
  }
};

// onUnmounted(() => {
//   remove('identifyStatus-page-data');
// });

const findNodeByCodePath = (codePath: any, options: any) => {
  if (!codePath || codePath.length === 0) return [];
  let currentOptions = options;
  const namePath = [];
  // eslint-disable-next-line
  for (const code of codePath) {
    // 查找当前层级中code匹配的节点
    const foundNode = currentOptions.find((item: { value: string; }) => item.value === code);
    if (!foundNode) {
      return [];
    }
    namePath.push(foundNode.label);
    currentOptions = foundNode.children || [];
  }
  return namePath;
};
const categoryCodeChange = (e: any) => {
  // const data = findNodeByCodePath(e, pimsCategory.value);
  // tableData.value = tableData.value.map((v: any) => {
  //   return {
  //     ...v,
  //     categoryCode: e.join('-'),
  //     categoryName: (data || []).join('-'),
  //     categoryList: e,
  //   };
  // });
};
const rowHeight = ref<number>(117);
const startIndex = ref<number>(0);
const bufferSize = ref<number>(2);
// const visibleData = tableData.value.slice(0, 10);
const handleElementTableScroll = (event: any) => {
  // Element表格的滚动处理
  // const { scrollTop } = event;
  // console.log('scrollTop', scrollTop);
  // startIndex.value = Math.floor(scrollTop / rowHeight.value);
};
const tableHeight = ref(700);
// const visibleCount = computed(() => {
//   return Math.ceil(tableHeight.value / rowHeight.value);
// });
// const endIndex = computed(() => {
//   return Math.min(startIndex.value + visibleCount.value + bufferSize.value * 2, tableData.value.length);
// });

const offsetHeight = ref(0);
let resizeTimer: any;
window.addEventListener('resize', () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => {
    const tableBox: any = document.querySelector('.table-box');
    offsetHeight.value = tableBox?.offsetHeight;
  }, 100); // 100毫秒防抖延迟
});
onMounted(() => {
  const tableBox: any = document.querySelector('.table-box');
  offsetHeight.value = tableBox?.offsetHeight;
});
</script>

<style lang="scss" scoped>
.app-box {
  display: flex;
  flex-direction: column;
  overflow: hidden;
  width: 100%;
  height: 100%;
}
.bth-flex {
  display: flex;
  align-items: center;
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  background: #fff;
}
.l-auto {
  margin-left: auto;
}
.w-200 {
  width: 200px;
}
.label-m {
  margin: 0 10px 0 40px;
}
.table-box {
  flex: 1;
  overflow: hidden;
  background-color: #fff;
  padding: 10px;
}
.footer {
  display: flex;
  align-items: center;
  margin-top: 10px;
  padding: 10px;
  background: #fff;
}
.bth-text {
  cursor: pointer;
  color: #605CE5;
}
.tb-coll {
  display: flex;
  align-items: center;
  background-color: #fff;
  padding: 10px 10px 0;
  color: gray;
}
.tb-cill-l {
  margin-left: auto;
  margin-right: 20px;
}

</style>
<style>
.no-header-dialog .el-dialog__header {
  display: none !important;
}
.no-header-dialog .el-scrollbar {
  padding: 0;
}
.no-wrap {
  white-space: nowrap;
}
.after {
  position: relative;
}
.after::after {
  content: '*';
  display: block;
  position: absolute;
  left: -10px;
  top: 1px;
  color: red;
}
.table-border-color {
  height: calc(100vh - 180px);
}
</style>
<style>
.mylabelName {
  position: relative;
}
.mylabelName::after {
  content: '*';
  display: block;
  position: absolute;
  left: 1px;
  top: 8px;
  color: red;
}
</style>
