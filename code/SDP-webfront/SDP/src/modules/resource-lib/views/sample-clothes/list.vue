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
        <template #checkerIdList>
          <el-select
            v-model="params.checkerIdList"
            multiple
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
        key="el-table-key"
        v-loading="tableLoading"
        :data="tableData"
        style="width: 100%"
        row-key="checkCountId"
        border
        :tree-props="{ children: 'subItemList', hasChildren: 'hasChildren' }"
        class="tw-h-full"
        lazy
        :load="rowLoadHandle"
      >
        <el-table-column
          prop="checkCountId"
          label="序号"
          align="center"
          min-width="100"
        >
          <template #default=" { row } ">
            <span>{{ getRandomRank(row.checkCountId) }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="versionNo"
          label="版本号"
          align="center"
          min-width="60"
        >
          <template #default="{ row }">
            <el-button
              v-if="$has(permissionConfig.YLHS)"
              type="text"
              @click="showSampleTable(row)"
            >
              {{ row.versionNo }}
            </el-button>
            <span v-else>
              {{ row.versionNo }}
            </span>
          </template>
        </el-table-column>
        <el-table-column
          prop="pictureUrlList"
          label="唛架内容"
          align="left"
          min-width="180"
        >
          <template #default="{ row }">
            <uploader
              v-model="row._pictureUrlList"
              size="mini"
              :use-wrapper="false"
              :check-accept="true"
              :download="true"
              list-position="prepend"
              list-type="text"
              :disabled="true"
            />
            <!-- <p
              v-for="(item, i) of getMakeFrameFile(row.pictureUrlList, PICTURE_TYPE.MARK_FRAME)"
              :key="item"
            >
              <a
                :href="item"
                :download="item"
                target="_blank"
              >{{ `${i+1}-唛架文件` }}</a>
            </p> -->
            <!-- <ImageViewer
              v-if="useNormalizePictureUrl(row.pictureUrlList, PICTURE_TYPE.MARK_FRAME)[0]"
              :list="useNormalizePictureUrl(row.pictureUrlList, PICTURE_TYPE.MARK_FRAME)"
            >
              <template #default="{ view }">
                <el-image
                  :src="getResizePicture(row.pictureUrlList, PICTURE_TYPE.MARK_FRAME)"
                  class="img-thumbnail__table"
                  fit="cover"
                  @click="view"
                />
              </template>
            </ImageViewer> -->
          </template>
        </el-table-column>
        <el-table-column
          prop="designCode"
          label="SKC"
          align="center"
          min-width="120"
        >
          <template #default="{ row }">
            <sc-copy-text :text="row.designCode" />
          </template>
        </el-table-column>
        <el-table-column
          prop="styleCode"
          label="款式号"
          align="center"
          min-width="110"
        >
          <template #default="{ row }">
            <sc-copy-text :text="row.styleCode" />
          </template>
        </el-table-column>
        <el-table-column
          prop="categoryName"
          label="款式品类"
          align="center"
          min-width="100"
        />
        <!-- <el-table-column
          prop="regionName"
          label="所属区域"
          align="center"
          min-width="80"
        /> -->
        <el-table-column
          prop="pictureUrlList"
          label="款式图片"
          align="center"
          min-width="100"
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
          prop="checkerName"
          label="核算师"
          align="center"
          min-width="70"
        />
        <el-table-column
          prop="createdTime"
          label="创建时间"
          align="center"
          min-width="80"
        >
          <template #default="{ row }">
            {{ $filters.formatTime(row.createdTime) }}
          </template>
        </el-table-column>
        <el-table-column
          prop="operationLogList"
          label="操作记录"
          align="center"
          min-width="120"
          fixed="right"
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
    <SampleTable
      v-model="sampleTableData.visible"
      :picture-url-list="sampleTableData.pictureUrlList"
      :bom-order-material-list="sampleTableData.bomOrderMaterialList"
    />
  </sc-app-page>
</template>
<script lang="ts">
import type { Ref } from 'vue';
import { defineComponent, ref, reactive, onMounted, computed } from 'vue';
import { useList } from '@/hooks/use-list';
import { getSampleMaterialPlan, getSampleMaterialPlanSubItem } from '@/modules/resource-lib/api';
import type {
  ISampleMaterialPlanPageListItem,
  ISampleMaterialPlanPageReq,
  IResourceLibOperationLogListItem,
} from '@/modules/resource-lib/api/types';
import { fuzzyQueryUser } from '@/api/user';
import { desigGroupDataList } from '@/api/basis';
import type { IUserQueryFindPageResListItem } from '@/api/user/index.d';
import type { IDesignerGroupDataListItem } from '@/api/basis/types';
import {
  PICTURE_TYPE,
} from '@/modules/resource-lib/constant';
import { REGION_LIST } from '@/constant';
// import AreaSelection from '@/modules/resource-lib/components/area-selection.vue';
// import LogDialog from '@/modules/resource-lib/components/log-dialog.vue';
import LogDrawer from '@/modules/common/components/log-drawer';
import SampleTable from './components/sample-table.vue';
import {
  useNormalizePictureUrl,
  useNormalizeDesignFilePictureUrl,
  getResizePicture
} from '@/modules/resource-lib/composables/normalize-picture-url';
import usePermissionConfig from './hooks/use-permission-config';
import useSearchConfig from './hooks/use-search-config';
import { useDictionary } from '@/hooks/use-dictionary';
import { DICTIONARY_KEY } from '@/constant/dictionary';
import { IDictionaryItem } from '@/hooks/use-dictionary/types';

interface IListItem extends ISampleMaterialPlanPageListItem {
  // 唛架文件
  _pictureUrlList?: any[];
}

export default defineComponent({
  components: {
    // AreaSelection,
    // LogDialog,
    LogDrawer,
    SampleTable,
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
    const formatVersionNo = (list: ISampleMaterialPlanPageListItem[]) => {
      list.forEach((item) => {
        item.hasChildren = Number(item.versionNo) > 1;
      });
      setTableExpendCloseWhenResearch();
    };
    const filterMakeFile = (list: IListItem[]) => {
      list.forEach((item: IListItem) => {
        item._pictureUrlList = item.pictureUrlList
          .filter(v => v.samplePictureType === PICTURE_TYPE.MARK_FRAME)
          .map((v, i) => {
            const type = v.pictureUrl?.split('.')?.pop?.() ?? '';
            return { ...v, url: v.pictureUrl, name: `${i + 1}-唛架文件.${type}` };
          });
      });
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
    } = useList<ISampleMaterialPlanPageListItem, ISampleMaterialPlanPageReq>({
      request: {
        api: getSampleMaterialPlan,
        params: {
          designCodeLike: '',
          styleCodeLike: '',
          checkerIdList: [],
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
          // 过滤出唛架文件到 _pictureUrlList
          filterMakeFile(list);
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
    const showLogDialog = (row: ISampleMaterialPlanPageListItem) => {
      logDialogData.data = [...row.operationLogList];
      logDialogData.visible = true;
    };

    const sampleTableData = reactive({
      visible: false,
      pictureUrlList: [] as ISampleMaterialPlanPageListItem['pictureUrlList'],
      bomOrderMaterialList: [] as ISampleMaterialPlanPageListItem['bomOrderMaterialList'],
    });
    const showSampleTable = (row: ISampleMaterialPlanPageListItem) => {
      sampleTableData.visible = true;
      sampleTableData.pictureUrlList = row.pictureUrlList;
      sampleTableData.bomOrderMaterialList = row.bomOrderMaterialList;
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
      const { data: list } = await getSampleMaterialPlanSubItem({ parentId });
      filterMakeFile(list);
      resolve(list);
    };

    onMounted(() => {
      handleSearch();
    });

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
      sampleTableData,
      showSampleTable,
      region,
      areaSelectionRef,
      categoryTreeList,
      searchUser,
      users,
      searchDesignerGroup,
      designerGroupLists,
      PICTURE_TYPE,
      useNormalizePictureUrl,
      useNormalizeDesignFilePictureUrl,
      getRandomRank,
      rowLoadHandle,
      showTable,
      permissionConfig,
      getResizePicture,

      getMakeFrameFile(list: any[], type: PICTURE_TYPE) {
        return list.filter(v => v.samplePictureType === type).map(v => v.pictureUrl);
      },
    };
  },
});
</script>
<style lang="scss" scoped>
//
</style>
