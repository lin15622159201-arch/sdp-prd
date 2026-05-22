<template>
  <sc-app-page>
    <template #fheader>
      <sc-search-area
        :config="searchConfig"
        v-model="params"
        label-width="120px"
        @handle-search="handleSearch"
        @handle-reset="handleReset"
      >
        <template #designerId>
          <el-select
            v-model="params.designerId"
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
        key="el-table"
        v-loading="tableLoading"
        :data="tableData"
        style="width: 100%;"
        row-key="bomId"
        border
        :tree-props="{ children: 'subBomOrderListVO', hasChildren: 'hasChildren' }"
        class="tw-h-full"
        lazy
        :load="rowLoadHandle"
      >
        <el-table-column
          prop="bomId"
          label="序号"
          align="center"
        >
          <template #default=" { row } ">
            <span>{{ getRandomRank(row.bomId) }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="designCode"
          label="SKC"
          align="center"
        >
          <template #default="{ row }">
            <sc-copy-text :text="row.designCode" />
          </template>
        </el-table-column>
        <el-table-column
          prop="styleCode"
          label="款式号"
          align="center"
        />
        <el-table-column
          prop="versionNo"
          label="版本号"
          align="center"
        />
        <el-table-column
          label="bom表"
          align="center"
        >
          <template #default="{ row }">
            <span
              v-if="$has(permissionConfig.BOM)"
              class="a-link"
              @click="showBomTable(row)"
            >
              查看
            </span>
            <span v-else>查看</span>
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
          prop="designerName"
          label="设计师"
          align="center"
        />
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
          prop="logJson"
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
    <BomTable
      v-model="bomTableData.visible"
      :data="bomTableData.data"
    />
  </sc-app-page>
</template>
<script lang="ts">
import type { Ref } from 'vue';
import { defineComponent, ref, reactive, onMounted, computed } from 'vue';
import { useList } from '@/hooks/use-list';
import { getBomOrderPage, getBomOrderPageSubItem } from '@/modules/resource-lib/api';
import type {
  IOrderPageListItem,
  IOrderPageReq,
  IResourceLibOperationLogListItem,
} from '@/modules/resource-lib/api/types';
import LogDrawer from '@/modules/common/components/log-drawer';
import BomTable from './components/bom-table.vue';
import { fuzzyQueryUser } from '@/api/user';
import { desigGroupDataList } from '@/api/basis';
import type { IUserQueryFindPageResListItem } from '@/api/user/index.d';
import type { IDesignerGroupDataListItem } from '@/api/basis/types';
import { REGION_LIST } from '@/constant/index';
import { useNormalizePictureUrl, getResizePicture } from '@/modules/resource-lib/composables/normalize-picture-url';
import usePermissionConfig from './hooks/use-permission-config';
import useSearchConfig from './hooks/use-search-config';
import { useDictionary } from '@/hooks/use-dictionary';
import { DICTIONARY_KEY } from '@/constant/dictionary';
import { IDictionaryItem } from '@/hooks/use-dictionary/types';

export default defineComponent({
  components: {
    LogDrawer,
    BomTable,
  },
  setup() {
    const { searchConfig } = useSearchConfig();
    const collapse = ref(true);
    const region = ref(REGION_LIST.map(item => item.value));
    const areaSelectionRef = ref();
    const showTable = ref(true);

    const users: Ref<IUserQueryFindPageResListItem[]> = ref([]);
    const designerGroupLists = ref([] as IDesignerGroupDataListItem[]);
    const permissionConfig = usePermissionConfig();

    const setTableExpendCloseWhenResearch = () => {
      showTable.value = false;
      setTimeout(() => {
        showTable.value = true;
      }, 10);
    };

    const formatVersionNo = (list: IOrderPageListItem[]) => {
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
    } = useList<IOrderPageListItem, IOrderPageReq>({
      request: {
        api: getBomOrderPage,
        params: {
          designCode: '',
          designerId: '',
          designerGroup: '',
          category: '',
          versionNo: '',
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
    const showLogDialog = (row: IOrderPageListItem) => {
      logDialogData.data = [...row.logJson];
      logDialogData.visible = true;
    };

    const bomTableData = reactive({
      visible: false,
      data: {} as IOrderPageListItem,
    });
    const showBomTable = (row: IOrderPageListItem) => {
      bomTableData.visible = true;
      bomTableData.data = row;
    };

    const rowLoadHandle = async (row: any, treeNode: any, resolve: any) => {
      const { parentId = '' } = row;
      const { data: list } = await getBomOrderPageSubItem({ parentId });
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
      showLogDialog,
      logDialogData,
      bomTableData,
      showBomTable,
      region,
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
    };
  },
});
</script>
<style lang="scss" scoped>
.a-link{
  cursor: pointer;
  color:#66b1ff
}
</style>
