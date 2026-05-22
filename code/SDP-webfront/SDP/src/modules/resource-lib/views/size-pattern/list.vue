<template>
  <sc-app-page>
    <template #fheader>
      <sc-search-area
        :config="searchConfig"
        v-model="params"
        label-width="120px"
        @handle-reset="handleReset"
        @handle-search="handleSearch"
      >
        <template #patternMakerId>
          <el-select
            v-model="params.patternMakerId"
            filterable
            remote
            clearable
            placeholder="请输入"
            :remote-method="searchUser"
          >
            <el-option
              v-for="item in users"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </template>
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
      <Operation>
        <AreaSelection ref="areaSelectionRef" @cityChange="handleSearch" />
      </Operation>
    </template> -->
    <template #main>
      <el-table
        v-if="showTable"
        v-loading="tableLoading"
        :data="tableData"
        style="width: 100%"
        row-key="patternSizeId"
        border
        :tree-props="{ children: 'subPatternClothesSizeVO', hasChildren: 'hasChildren' }"
        class="tw-h-full"
        lazy
        :load="rowLoadHandle"
      >
        <el-table-column
          prop="patternSizeId"
          label="序号"
          align="center"
        >
          <template #default=" { row } ">
            <span>{{ getRandomRank(row.patternSizeId) }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="versionNo"
          label="版本号"
          align="center"
        />
        <el-table-column
          prop="subPatternClothesSizeVO"
          label="尺寸表"
          align="center"
        >
          <template #default="{ row }">
            <el-button
              v-if="$has(permissionConfig.CCB)"
              type="text"
              @click="showSizeTable(row)"
            >
              查看
            </el-button>
            <span v-else>查看</span>
            <el-button type="text" @click="downloadTable(row)">
              下载
            </el-button>
          </template>
        </el-table-column>
        <el-table-column
          prop="designCode"
          label="SKC"
          align="center"
          width="160"
        >
          <template #default="{ row }">
            <sc-copy-text :text="row.designCode" />
            <!-- <p>{{ $filters.formatTime(row.skcCreatedTime) }}</p> -->
          </template>
        </el-table-column>
        <!-- <el-table-column
          prop="color"
          label="颜色"
          align="center"
        /> -->
        <el-table-column
          prop="styleCode"
          label="款式号"
          align="center"
        />
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
          prop="pictureUrl"
          label="款式图片"
          align="center"
        >
          <template #default="{ row }">
            <ImageViewer
              v-if="useNormalizePictureUrl(row.pictureUrl)[0]"
              :list="useNormalizePictureUrl(row.pictureUrl)"
            >
              <template #default="{ view }">
                <el-image
                  :src="getResizePicture(row.pictureUrl)"
                  class="img-thumbnail__table tw-w-70px tw-h-70px"
                  fit="cover"
                  @click="view"
                />
              </template>
            </ImageViewer>
          </template>
        </el-table-column>
        <el-table-column
          prop="patternMakerName"
          label="纸样师"
          align="center"
        />
        <el-table-column
          prop="createdTime"
          label="创建时间"
          align="center"
          width="160"
        >
          <template #default="{ row }">
            {{ $filters.formatTime(row.createdTime) }}
          </template>
        </el-table-column>
        <el-table-column
          label="操作记录"
          align="center"
          fixed="right"
          width="200"
        >
          <template #default="{ row }">
            <template v-if="row.logJson.length > 0">
              {{ row.logJson[0].creatorName }},
              {{ $filters.formatTime(row.logJson[0].operationTime) }},
              {{ row.logJson[0].content }}
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
    <SizeTable
      v-model="sizeTableData.visible"
      :category-name="sizeTableData.categoryName"
      :data="sizeTableData.list"
      :row="sizeTableData.row"
    />

    <export-table
      ref="exportTableRef"
      :category-name="sizeTableData.categoryName"
      :data="sizeTableData.list"
      :row="sizeTableData.row"
      :design-code="sizeTableData.designCode"
      :style-code="sizeTableData.styleCode"
    />
  </sc-app-page>
</template>
<script lang="ts">
import type { Ref } from 'vue';
import { defineComponent, ref, reactive, onMounted, defineAsyncComponent, nextTick, computed } from 'vue';
import { useList } from '@/hooks/use-list';
import { getPatternClothesSize, getPatternClothesSizeSubItem } from '@/modules/resource-lib/api';
import type {
  IPatternClothesSizePageReq,
  IPatternClothesSizePageListItem,
  IResourceLibOperationLogListItem,
} from '@/modules/resource-lib/api/types';
import SizeTable from './components/size-table.vue';
import { fuzzyQueryUser } from '@/api/user';
import { desigGroupDataList } from '@/api/basis';
import type { IUserQueryFindPageResListItem } from '@/api/user/index.d';
import type { IDesignerGroupDataListItem } from '@/api/basis/types';
import { REGION_LIST } from '@/constant';
// import LogDialog from '@/modules/resource-lib/components/log-dialog.vue';
import LogDrawer from '@/modules/common/components/log-drawer';
// import AreaSelection from '@/modules/resource-lib/components/area-selection.vue';
import { useNormalizePictureUrl, getResizePicture } from '@/modules/resource-lib/composables/normalize-picture-url';
import { useRoute } from 'vue-router';
import usePermissionConfig from './hooks/use-permission-config';
import useSearchConfig from './hooks/use-search-config';
import { ElMessage } from 'element-plus';
import { useDictionary } from '@/hooks/use-dictionary';
import { DICTIONARY_KEY } from '@/constant/dictionary';
import { IDictionaryItem } from '@/hooks/use-dictionary/types';

const ExportTable = defineAsyncComponent(() => import('./components/export-table.vue'));

export default defineComponent({
  components: {
    // AreaSelection,
    // LogDialog,
    LogDrawer,
    SizeTable,
    ExportTable,
  },
  setup() {
    const { searchConfig } = useSearchConfig();
    // const collapse = ref(true);
    const region = ref(REGION_LIST.map(item => item.value));
    const areaSelectionRef = ref();

    const showTable = ref(true);
    const currentRoute = useRoute();
    const { designCode: _designCode } = currentRoute.query;

    const users: Ref<IUserQueryFindPageResListItem[]> = ref([]);
    const designerGroupLists = ref([] as IDesignerGroupDataListItem[]);
    const permissionConfig = usePermissionConfig();
    const setTableExpendCloseWhenResearch = () => {
      showTable.value = false;
      setTimeout(() => {
        showTable.value = true;
      }, 10);
    };
    const formatVersionNo = (list: IPatternClothesSizePageListItem[]) => {
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
    } = useList<IPatternClothesSizePageListItem, IPatternClothesSizePageReq>({
      request: {
        api: getPatternClothesSize,
        params: {
          designCode: _designCode as string,
          patternMakerId: '',
          designerGroup: '',
          category: '',
          versionNo: '',
          regionIdList: region.value,
          styleCode: '',
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

    /**
   * 内部品类列表
   */
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
    const showLogDialog = (row: IPatternClothesSizePageListItem) => {
      logDialogData.data = [...row.logJson];
      logDialogData.visible = true;
    };

    const sizeTableData = reactive({
      visible: false,
      categoryName: '',
      list: [] as IPatternClothesSizePageListItem['patternClothesSizeList'],
      row: {} as IPatternClothesSizePageListItem,
      designCode: '',
      styleCode: '',
    });
    const exportTableRef = ref<InstanceType<typeof ExportTable>>();

    const showSizeTable = (row: IPatternClothesSizePageListItem) => {
      sizeTableData.visible = true;
      sizeTableData.categoryName = row.categoryName;
      sizeTableData.list = row.patternClothesSizeList;
      sizeTableData.row = { ...row };
    };

    const downloadTable = async (row: IPatternClothesSizePageListItem) => {
      sizeTableData.categoryName = row.categoryName;
      sizeTableData.list = row.patternClothesSizeList;
      sizeTableData.row = { ...row };
      sizeTableData.designCode = row.designCode;
      sizeTableData.styleCode = row.styleCode;
      await nextTick();
      ElMessage.warning('表格数据正在加载中，请耐心等待...');
      exportTableRef.value?.exportData();
    };

    const searchUser = async (keyword: string) => {
      if (!keyword) {
        return;
      }
      const res = await fuzzyQueryUser({ keyword });
      users.value = res.data?.list ?? [];
    };

    const searchDesignerGroup = async (keyword: string) => {
      const res = await desigGroupDataList({ designerGroupName: keyword });
      designerGroupLists.value = res.data;
    };

    const rowLoadHandle = async (row: any, treeNode: any, resolve: any) => {
      const { parentId = '' } = row;
      const { data: list } = await getPatternClothesSizeSubItem({ parentId });
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
      // collapse,
      searchConfig,
      params,
      tableTotal,
      tableData,
      tableLoading,
      handleSearch,
      handleReset,
      handleSizeChange,
      handleCurrentChange,
      showLogDialog,
      logDialogData,
      showSizeTable,
      sizeTableData,
      areaSelectionRef,
      categoryTreeList,
      searchUser,
      users,
      searchDesignerGroup,
      designerGroupLists,
      useNormalizePictureUrl,
      getRandomRank,
      rowLoadHandle,
      showTable,
      permissionConfig,
      getResizePicture,
      downloadTable,
      exportTableRef,
    };
  },
});
</script>
<!-- <style lang="scss" scoped>
.a-link{
  cursor: pointer;
  color:#66b1ff
}
</style> -->
