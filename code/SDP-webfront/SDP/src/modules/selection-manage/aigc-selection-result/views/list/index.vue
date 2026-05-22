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
        <template #category>
          <el-cascader
            v-model="params.categorys"
            :options="categoryOptions"
            clearable
            class="tw-w-100%"
          />
        </template>
        <template #selector>
          <query-select-my
            ref="myQuerySelect"
            v-model="params.selectorName"
            model-type="name"
            @handleSearch="handleSearch"
          />
        </template>
        <template #creator>
          <query-select-my
            v-model="params.pickingCreatorName"
            model-type="name"
            @handleSearch="handleSearch"
          />
        </template>
        <template #styleNum>
          <el-input v-model="styleNum" />

        </template>
      </sc-search-area>
    </template>
    <template #header>
      <el-row justify="end">
        <div>
          <el-button
            v-if="DCTP"
            type="primary"
            @click="() => handleImgExport()"
            :loading="logddingImg"
          >
            {{ logddingImg ? '下载中...' : '导出图片' }}
          </el-button>
          <el-button
            v-if="DCXTSJ"
            @click="() => handleExport()"
            :loading="exportLoading"
          >
            导出修图数据
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
  </sc-app-page>
</template>
<script lang="ts" setup>
import { ref, computed, onMounted } from 'vue';
import { useList } from '@toy/v-use';
import { useSearch } from './hooks/use-search';
import { useUpImg } from './hooks/use-upImg';
import { useListColumns } from './hooks/use-table-columns';
import { CascaderOption, ElMessage } from 'element-plus';
import QuerySelectMy from '@/components/query-select-my/index.vue';
import { resultPage, resultExport, resultExportImageApi } from '@/modules/selection-manage/aigc-selection-result/api';
import { ITableItem } from './type';
import { PICK_STATE_ENUM } from '@/modules/selection-manage/aigc-selection-list/constant';
import { OPEN_STYLE_STATUS_ENUM } from '@/modules/selection-manage/aigc-selection-result/constant';
import { useDictionary } from '@/hooks/use-dictionary2';
import { DICTIONARY_KEY } from '@/constant/dictionary';
import { usePermissionConfig } from '../../use-permission-config';
import { useAccountStore } from '@/store/account';

interface UserQuerySelectComponent {
  handleSeeMe: () => void;
  // 可以添加其他方法或属性
}
const accountStore = useAccountStore();
const { getEnableDictionaryOptions } = useDictionary();
const categoryOptions = computed(() => {
  return getEnableDictionaryOptions(DICTIONARY_KEY.CATEGORY) as unknown as CascaderOption[];
});
const styleNum = ref('');
const { DCXTSJ, DCTP } = usePermissionConfig();
const { account } = accountStore;
const userName = account?.account?.name ?? '';
const myQuerySelect = ref<UserQuerySelectComponent | null>(null);
onMounted(() => {
  if (myQuerySelect.value) {
    myQuerySelect.value.handleSeeMe();
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
    api: resultPage,
    params: {
      categorys: [] as string[],
      suggestedCategoryCode: '',
      pickingCreatorName: '',
      selectorName: userName,
      pickingStartTime: '',
      pickingEndTime: '',
      inspirationSource: '',
      suggestedCountrySiteCode: '',
      imagePickingStartTime: '',
      imagePickingEndTime: '',
      pickingState: PICK_STATE_ENUM.YES,
      suggestedWaveBatchCode: '',
      openStyleState: '' as unknown as OPEN_STYLE_STATUS_ENUM,
      pageNum: 1,
      pageSize: 20,
    },
    handleParams(p) {
      const { categorys, ...other } = p;
      other.suggestedCategoryCode = [...(categorys || [])].pop() || '';
      other.styleCode = styleNum.value ? styleNum.value.split(',').filter(Boolean) : [];
      return other;
    },
    handleCustomReset(_, defaultParams) {
      styleNum.value = '';
      return defaultParams;
    },
  },
  response: {
    handleResponseData(list) {
      const res: ITableItem[] = list.map((i) => {
        const { pickingResultId, inspirationImage, pickingStyleResultDetails, suggestedShopName,
          suggestedCountrySiteName, openStyleState, selectorName, selectionTime,
          styleCode, styleEliminateReason, inspirationCode, designTaskCode, origin, postureFissionRefImgUrl, sourceImage, refImgUrl } = i;
        return {
          id: pickingResultId,
          inspirationCode,
          runCode: designTaskCode,
          inspirationImage,
          resultImgs: pickingStyleResultDetails.map(j => j.pictureUrl),
          shopName: suggestedShopName,
          countryName: suggestedCountrySiteName,
          paymenStatus: openStyleState,
          styleNum: styleCode,
          selector: selectorName,
          selectedTime: selectionTime,
          styleEliminateReason,
          origin,
          sourceImage,
          postureFissionRefImgUrl,
          refImgUrl,
        };
      });
      return res;
    },
  }
});
const { searchConfig } = useSearch();
const { tableColumns } = useListColumns();

const exportLoading = ref(false);
const handleExport = async () => {
  exportLoading.value = true;
  const { categorys, ...other } = params.value;
  other.suggestedCategoryCode = [...(categorys || [])].pop() || '';
  await resultExport(other).finally(() => {
    exportLoading.value = false;
  });
};

const init = () => {
  handleSearch();
};

init();
const logddingImg = ref(false);
// 导出图片
const handleImgExport = async () => {
  logddingImg.value = true;
  const res = await resultExportImageApi(params.value);
  const imgList: { url: string; name: string; }[] = [];
  const str: any = {};
  res.data.slice(0, 100).forEach((item: any, index: number) => {
    if (str[item.inspirationCode]) {
      str[item.inspirationCode].list = [...str[item.inspirationCode].list, ...item.images];
    } else {
      str[item.inspirationCode] = {
        group: item.images.length,
        list: item.images
      };
    }
  });
  Object.keys(str).forEach((i) => {
    str[i].list.forEach((item: any, index: number) => {
      imgList.push({
        url: item.pictureUrl,
        // name: `${i}_${Math.trunc(index / str[i].group) + 1}_${(index % str[i].group) + 1}${item.mainImageType === 1 ? '_主图' : ''}`
        name: `${i}_${item.groupNum}_${(index % str[i].group) + 1}${item.mainImageType === 1 ? '_主图' : ''}`
      });
    });
  });


  useUpImg(imgList, upImgOk);
};

const upImgOk = () => {
  logddingImg.value = false;
  ElMessage.success('导出成功，请在系统文件夹中查看');
};

</script>
