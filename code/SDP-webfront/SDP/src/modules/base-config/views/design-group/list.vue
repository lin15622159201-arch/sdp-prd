<template>
  <sc-app-page :laside="{ style: 'width: 220px' }">
    <template #laside>
      <div class="tw-flex tw-flex-col tw-h-100%">
        <div class="tw-flex tw-justify-center">
          <el-button
            v-if="$has(permissionConfig.XZSJZB)"
            type="primary"
            size="default"
            class='tw-mx-auto'
            @click="handleCreate()"
          >
            新增设计组别
          </el-button>
        </div>
        <el-divider class='tw-my-15px' />
        <el-scrollbar class="tw-flex-1 tw-min-h-0">
          <div
            v-for="(item, index) in groupLists"
            :key="index"
            :class="['group-row', { active: activeGroupIndex === index }]"
          >
            <span class="tw-h-full tw-flex-1 tw-py-3 tw-pl-2" @click="onClickGroup(item as any, index)">
              {{ item.designerGroupName }}
            </span>
            <span class="oprate">
              <el-icon
                v-if="$has(permissionConfig.BJSJZB)"
                style="margin-right:15px"
                @click="showEdit(item as any)"
              >
                <Edit />
              </el-icon>
              <el-icon

                v-if="$has(permissionConfig.SCSJZB)"
                @click="handleDelete(item as any)"
              >
                <Delete />
              </el-icon>
            </span>
          </div>
        </el-scrollbar>
      </div>
    </template>
    <template #main>
      <el-container class="tw-h-full">
        <el-container class="layout-right">
          <el-form
            :inline="true"
            :model="params"
            @submit.prevent
            @keyup.enter="handleQuery()"
          >
            <el-form-item
              label="员工姓名"
              prop="designerName"
            >
              <el-input
                v-model="params.designerName"
                placeholder="请输入"
                clearable
                style="width:300px"
              />
            </el-form-item>

            <el-form-item label-width="40px">
              <el-button
                type="primary"
                @click="handleQuery()"
              >
                查询
              </el-button>
              <el-button
                @click="handleReset()"
              >
                重置
              </el-button>
            </el-form-item>
          </el-form>
          <el-divider />
          <div>
            <div class="right-add">
              <el-button
                v-if="$has(permissionConfig.XZYG)"
                type="primary"
                @click="userAdd()"
              >
                新增员工
              </el-button>
            </div>
          </div>
          <el-table
            v-loading="tableLoading"
            border
            tooltip-effect="dark"
            :data="tableData"
            calss="tw-h-full"
          >
            <el-table-column
              label="员工编码"
              min-width="80"
              prop="designerCode"
              align="center"
            />
            <el-table-column
              label="员工姓名"
              min-width="140"
              prop="designerName"
              align="center"
            />
            <el-table-column
              label="手机号码"
              min-width="100"
              prop="mobilePhone"
              align="center"
            />
            <el-table-column
              label="所属组别"
              min-width="80"
              prop="designerGroupName"
              align="center"
            />
            <el-table-column
              label="操作"
              width="200"
              align="center"
              fixed="right"
            >
              <template #default="{ row }">
                <el-button
                  v-if="$has(permissionConfig.SCYG)"
                  type="text"
                  @click="userDelete(row)"
                >
                  删除
                </el-button>
                <el-button
                  v-if="$has(permissionConfig.ZYYG)"
                  type="text"
                  @click="userTransfor(row)"
                >
                  转移
                </el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-container>
      </el-container>
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
          :size="params.pageSize"
          @current-change="handleCurrentChange"
          @size-change="handleSizeChange"
        />
      </el-row>
    </template>
    <EditDialog
      v-model="editData.visible"
      :data="(editData.data as any)"
      :is-edit="editData.isEdit"
      @refreshList="getLists()"
    />
    <UserDialog
      v-model="addUserData.visible"
      :data="addUserData.data"
      :designer-group-code="params.designerGroupCode"
      :designer-group-name="activeGroup.designerGroupName"
      @refreshList="handleQuery(params.pageNum)"
    />
    <UserTransfor
      :id="transforData.id"
      v-model="transforData.visible"
      :group-lists="groupLists"
      :designer-group-code="params.designerGroupCode"
      @refreshList="handleQuery(params.pageNum)"
    />
  </sc-app-page>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue';
import { useList } from '@/hooks/use-list';
import EditDialog from './components/edit-dialog.vue';
import UserDialog from './components/user-dialog.vue';
import UserTransfor from './components/user-transfor.vue';
import { getGroupList, deleteGroup, getDesignerList, designerDelete } from './api';
import { useHandleDelete } from '../../utils/index';
import type { IDesignerPageReq, IDesignerPageListItem, IDesignerGroupDataListRes } from './api/type';
import usePermissionConfig from './hooks/use-permission-config';
import { Edit, Delete } from '@element-plus/icons-vue';

export default defineComponent({
  components: {
    EditDialog,
    UserDialog,
    UserTransfor,
    Edit,
    Delete,
  },
  setup() {
    const activeGroupIndex = ref(0);
    const activeGroup = reactive({
      designerGroupName: '',
    });

    const {
      params,
      tableTotal,
      tableData,
      tableLoading,
      handleSearch,
      handleReset,
      handleSizeChange,
      handleCurrentChange,
    } = useList<IDesignerPageListItem, IDesignerPageReq>({
      request: {
        api: getDesignerList,
        params: {
          pageNum: 1,
          pageSize: 20,
          designerGroupCode: '',
          designerName: '',
        },
        handleCustomReset: (paramsObj, requestParams) => {
          const _paramsObj = {
            ...requestParams,
            designerGroupCode: paramsObj.designerGroupCode,
          };
          return _paramsObj;
        },
      },
    });

    const handleQuery = (pageNum?: number) => {
      if (activeGroup.designerGroupName) {
        handleSearch(pageNum);
      }
    };

    const permissionConfig = usePermissionConfig();
    const groupLists = ref<IDesignerGroupDataListRes>([]);
    const getLists = async () => {
      const res = await getGroupList({});
      groupLists.value = res.data;
      if (res.data && res.data[0]) {
        activeGroup.designerGroupName = res.data[0].designerGroupName;
        params.value.designerGroupCode = res.data[0].designerGroupCode;
        handleQuery();
      }
    };

    const init = () => {
      getLists();
    };

    // 初始化
    init();

    const editData = reactive({
      isEdit: true,
      visible: false,
      data: {},
    });
    // 创建
    const handleCreate = () => {
      editData.isEdit = false;
      editData.data = {};
      editData.visible = true;
    };
    // 修改
    const showEdit = (row: IDesignerPageListItem) => {
      editData.isEdit = true;
      editData.data = { ...row };
      editData.visible = true;
    };

    // 删除
    const handleDelete = (row: IDesignerPageListItem) => {
      useHandleDelete({
        id: row.id,
        api: deleteGroup,
        callback: getLists,
      });
    };

    const onClickGroup = (item: IDesignerPageListItem, index: number) => {
      activeGroup.designerGroupName = item.designerGroupName;
      activeGroupIndex.value = index;
      params.value.designerGroupCode = item.designerGroupCode;
      handleQuery();
    };

    const userDelete = (row: IDesignerPageListItem) => {
      useHandleDelete({
        id: row.id,
        api: designerDelete,
        callback: () => handleQuery(params.value.pageNum),
      });
    };

    const transforData = reactive({
      visible: false,
      id: '',
    });
    const userTransfor = (row: IDesignerPageListItem) => {
      transforData.visible = true;
      transforData.id = row.id;
    };
    const addUserData = reactive({
      visible: false,
      data: {},
    });
    const userAdd = () => {
      addUserData.visible = true;
      addUserData.data = {};
    };

    return (
      {
        activeGroupIndex,
        params,
        tableTotal,
        tableData,
        tableLoading,
        handleQuery,
        handleReset,
        handleSizeChange,
        handleCurrentChange,
        showEdit,
        handleDelete,
        editData,
        handleCreate,
        groupLists,
        getLists,
        onClickGroup,
        userDelete,
        userTransfor,
        userAdd,
        addUserData,
        activeGroup,
        transforData,
        permissionConfig,

      }
    );
  },
});
</script>

<style lang="scss" scoped>

.group-row{
  display: flex;
  align-items: center;
  padding-right: 10px;
  cursor: pointer;
  border-radius: 4px;
  .oprate{
    color: var(--el-color-primary);
  }
  &.active{
    color:var(--el-color-primary);
    font-weight: bold;
  }
  &:hover {
    color: var(--el-color-primary);
    background-color: var(--el-color-primary-light-9);
  }
}
.layout-right{
  display: flex;
  flex-direction: column;
  margin-left: 50px;
}
.right-add{
  text-align: right;
  height: 50px;
}
.link-color{
  color:#108ee9;
}

</style>
