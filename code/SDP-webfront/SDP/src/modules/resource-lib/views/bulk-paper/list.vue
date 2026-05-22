<template>
  <sc-app-page>
    <template #fheader>
      <sc-search-area
        :config="searchConfig"
        v-model="params"
        label-width='120px'
        @handleSearch="handleSearch"
        @handle-reset="handleReset"
      >
        <template #category>
          <el-cascader
            v-model="params.category"
            clearable
            :options="(categoryTreeList as any)"
            :props="{
              label: 'label',
              value: 'value',
              checkStrictly: true
            }"
            style="width: 100%;"
          />
        </template>
      </sc-search-area>
    </template>
    <!-- <template #header>
      <operation>
        <AreaSelection ref="areaSelectionRef" @cityChange="handleSearch" />
      </operation>
    </template> -->
    <template #main>
      <el-table
        v-if="showTable"
        key="el-table"
        v-loading="tableLoading"
        :data="tableData"
        style="width: 100%;"
        row-key="prodDesignId"
        border
        :tree-props="{ children: 'subItemList', hasChildren: 'hasChildren' }"
        class="tw-h-full"
        lazy
        :load="rowLoadHandle"
      >
        <el-table-column
          prop="prodDesignId"
          label="序号"
          align="center"
        >
          <template #default=" { row } ">
            <span>{{ getRandomRank(row.prodDesignId) }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="versionNo"
          label="版本号"
          align="center"
        />
        <el-table-column
          prop="designFileName"
          label="纸样文件"
          align="center"
        >
          <template #default=" { row } ">
            <el-button
              v-if="fileDialogVisible(row)"
              type="text"
              @click="showFileDialog(row)"
            >
              查看
            </el-button>
            <ImageViewer
              v-else-if="row.designFilePictureList.length === 1"
              :list="useNormalizeDesignFilePictureUrl(row.designFilePictureList)"
            >
              <template #default="{ view }">
                <el-button
                  v-if="$has(permissionConfig.XZ)"
                  type="text"
                  @click="view"
                >
                  {{ row.designFilePictureList[0].designFileName }}
                </el-button>
                <span v-else>
                  {{ row.designFilePictureList[0].designFileName }}
                </span>
              </template>
            </ImageViewer>
            <span v-else-if="row.designFileLinkList.length === 1">
              <el-button
                v-if="$has(permissionConfig.XZ)"
                type="text"
                @click="handleDownloadFile(row.designFileLinkList[0])"
              >{{ row.designFileLinkList[0].designFileName }}</el-button>
              <span v-else>
                {{ row.designFileLinkList[0].designFileName }}
              </span>
            </span>
          </template>
        </el-table-column>
        <el-table-column
          prop="styleCode"
          label="款式号"
          align="center"
        >
          <template #default=" { row } ">
            <sc-copy-text :text="row.styleCode" />
            <el-tag
              v-if="row.sampleSwapProd === YES_NO_ENUM.YES"
              effect="dark"
            >
              转大货
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column
          prop="categoryName"
          label="款式品类"
          align="center"
        />
        <!-- <el-table-column
          prop="regionName"
          label="所属区域"
          align="center"
        /> -->
        <el-table-column
          prop="pictureUrlList"
          label="款式图片"
          align="center"
        >
          <template #default="{ row }">
            <ImageViewer
              v-if="useNormalizePictureUrl(row.pictureUrlList)[0]"
              :list="useNormalizePictureUrl(row.pictureUrlList)"
            >
              <template #default="{ view }">
                <el-image
                  :src="getResizePicture(row.pictureUrlList)"
                  class="img-thumbnail__table"
                  fit="cover"
                  @click="view"
                />
              </template>
            </ImageViewer>
          </template>
        </el-table-column>
        <el-table-column
          prop="createdTime"
          label="创建时间"
          align="center"
        >
          <template #default="{ row }">
            {{ $filters.formatTime(row.createdTime) }}
          </template>
        </el-table-column>
        <el-table-column
          prop="operationLogList"
          label="操作记录"
          align="center"
          fixed="right"
          width="200"
        >
          <template #default="{ row }">
            <template v-if="row.operationLogList.length > 0">
              {{ row.operationLogList[0].creatorName }},
              {{ $filters.formatTime(row.operationLogList[0].operationTime) }},
              {{ row.operationLogList[0].content }}
            </template>
            <el-button
              v-if="$has(permissionConfig.RZ)"
              class="margin-left-10"
              type="text"
              @click="showLogDialog(row)"
            >
              更多
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </template>
    <template #ffooter>
      <el-row
        style="width: 100%"
        justify="end"
      >
        <pagination
          :total="tableTotal"
          :current-page="params.pageNum"
          :size="params.pageSize"
          @current-change="handleCurrentChange"
          @size-change="handleSizeChange"
        />
      </el-row>
    </template>
    <!-- <LogDialog
      :logLists="logDialogData.data"
      v-model="logDialogData.visible"
    /> -->
    <LogDrawer
      v-model="logDialogData.visible"
      log-type="RESOURCELIB"
      :time-key="('operationTime' as any)"
      content-key="content"
      :data-list="logDialogData.data"
    />
    <FileDialog
      v-model="fileDialogData.visible"
      :data="fileDialogData.data"
    />
  </sc-app-page>
</template>
<script lang="ts">
import { defineComponent, ref, reactive, onMounted, computed } from 'vue';
import { useList } from '@/hooks/use-list';
import { getProdDesignFile, getProdDesignFileSubItem } from '@/modules/resource-lib/api';
import type {
  IProdDesignFilePageReq,
  IProdDesignFilePageListItem,
  IResourceLibOperationLogListItem,
} from '@/modules/resource-lib/api/types';
// import AreaSelection from '@/modules/resource-lib/components/area-selection.vue';
// import LogDialog from '@/modules/resource-lib/components/log-dialog.vue';
import LogDrawer from '@/modules/common/components/log-drawer';
import FileDialog, { fileDialogVisible, handleDownloadFile } from './components/file-dialog.vue';
import {
  useNormalizePictureUrl,
  useNormalizeDesignFilePictureUrl,
  getResizePicture
} from '@/modules/resource-lib/composables/normalize-picture-url';
import { REGION_LIST, YES_NO_ENUM } from '@/constant/index';
import usePermissionConfig from './hooks/use-permission-config';
import useSearchConfig from './hooks/use-search-config';
import { useDictionary } from '@/hooks/use-dictionary';
import { DICTIONARY_KEY } from '@/constant/dictionary';
import { IDictionaryItem } from '@/hooks/use-dictionary/types';

export default defineComponent({
  components: {
    // AreaSelection,
    // LogDialog,
    LogDrawer,
    FileDialog,
  },
  setup() {
    const { searchConfig } = useSearchConfig();
    const collapse = ref(true);
    const region = ref(REGION_LIST.map(item => item.value));
    const areaSelectionRef = ref();
    const showTable = ref(true);
    const permissionConfig = usePermissionConfig();
    const setTableExpendCloseWhenResearch = () => {
      showTable.value = false;
      setTimeout(() => {
        showTable.value = true;
      }, 10);
    };
    const formatVersionNo = (list: IProdDesignFilePageListItem[]) => {
      list.forEach((item) => {
        item.hasChildren = Number(item.versionNo) > 1;
      });
      setTableExpendCloseWhenResearch();
    };

    const {
      params,
      tableTotal,
      tableData,
      tableLoading,
      handleSearch,
      handleReset,
      handleSizeChange,
      handleCurrentChange,
    } = useList< IProdDesignFilePageListItem, IProdDesignFilePageReq>({
      request: {
        api: getProdDesignFile,
        params: {
          styleCodeLike: '',
          versionNo: '',
          category: '',
          regionIdList: region.value,
          pageNum: 1,
          pageSize: 20,
        },
        handleParams: (paramsObj) => {
          // paramsObj.regionIdList = areaSelectionRef.value.getRegionList();
          paramsObj.regionIdList = undefined;
          const category = (paramsObj.category || []) as [];
          paramsObj.category = category.join('-');
          return paramsObj;
        },
      },
      response: {
        handleResponseData(list) {
          formatVersionNo(list);
          return list;
        },
      },
    });
    // 款式品类
    const { getDictionaryOptions } = useDictionary();
    const categoryTreeList = computed(() => {
      const arr = getDictionaryOptions(DICTIONARY_KEY.PIMS_CATEGORY, undefined, undefined, true) || [];
      function setDisabled(list: IDictionaryItem[]) {
        list.forEach((item) => {
          if (item.children) {
            setDisabled(item.children ?? []);
          }
          item.disabled = false;
        });
      }
      setDisabled(arr);
      return arr;
    });

    const logDialogData = reactive({
      visible: false,
      data: [] as IResourceLibOperationLogListItem[],
    });
    const showLogDialog = (row: IProdDesignFilePageListItem) => {
      logDialogData.data = [...row.operationLogList];
      logDialogData.visible = true;
    };

    const fileDialogData = reactive({
      visible: false,
      data: {} as IProdDesignFilePageListItem,
    });
    const showFileDialog = (row: IProdDesignFilePageListItem) => {
      fileDialogData.data = row;
      fileDialogData.visible = true;
    };

    const rowLoadHandle = async (row: any, treeNode: any, resolve: any) => {
      const { parentId = '' } = row;
      const { data: list } = await getProdDesignFileSubItem({ parentId });
      resolve(list);
    };

    const init = () => {
      onMounted(() => {
        handleSearch();
      });
    };

    init();

    const getRandomRank = (id: string) => {
      const year = (`${new Date().getFullYear()}`).substring(2);
      const rank = year + id.substring(id.length - 6);
      return rank;
    };

    return {
      searchConfig,
      collapse,
      params,
      tableTotal,
      tableData,
      tableLoading,
      handleSearch,
      handleReset,
      handleSizeChange,
      handleCurrentChange,
      region,
      areaSelectionRef,
      categoryTreeList,
      logDialogData,
      showLogDialog,
      fileDialogData,
      showFileDialog,
      useNormalizePictureUrl,
      useNormalizeDesignFilePictureUrl,
      handleDownloadFile,
      fileDialogVisible,
      getRandomRank,
      rowLoadHandle,
      showTable,
      permissionConfig,
      getResizePicture,
      YES_NO_ENUM,
    };
  },
});
</script>
<style scoped lang="scss">
//
</style>
