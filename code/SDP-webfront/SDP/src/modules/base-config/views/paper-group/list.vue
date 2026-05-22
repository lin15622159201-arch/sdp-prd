<template>
  <sc-app-page>
    <template #main>
      <el-container class="tw-h-full">
        <el-aside
          width="220px"
          class="nav"
        >
          <el-form>
            <el-form-item label-width="50px">
              <el-button
                v-if="$has(permissionConfig.XZZB)"
                type="primary"
                @click="handleCreate()"
              >
                新增纸样组别
              </el-button>
            </el-form-item>
          </el-form>

          <el-divider />
          <div
            v-for="(item, index) in groupLists"
            :key="index"
            :class="['group-row', { active: activeGroupIndex === index }]"
          >
            <span @click="onClickGroup(item, index)">
              {{ item.groupName }}
            </span>
            <span class="oprate">
              <el-icon
                v-if="$has(permissionConfig.BJZB)"
                style="margin-right:15px"
                @click="showEdit(item)"
              >
                <Edit />
              </el-icon>
              <el-icon
                v-if="$has(permissionConfig.SCZB)"
                @click="handleDelete(item)"
              >
                <Delete />
              </el-icon>
            </span>
          </div>
        </el-aside>

        <el-container class="layout-right">
          <el-form
            :inline="true"
            :model="params"
            @submit.prevent
            @keyup.enter="handleQuery()"
          >
            <el-form-item
              label="纸样师"
              prop="userName"
            >
              <el-input
                v-model="params.userName"
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
                @click="handleResetQuery"
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
                新增人员
              </el-button>
            </div>
          </div>
          <el-table
            v-loading="tableLoading"
            border
            tooltip-effect="dark"
            class="tw-h-full"
            :data="tableData"
          >
            <el-table-column
              label="序号"
              min-width="80"
              align="center"
              type="index"
            />
            <el-table-column
              label="员工编码"
              min-width="80"
              prop="userCode"
              align="center"
            />
            <el-table-column
              label="纸样师"
              min-width="140"
              prop="userName"
              align="center"
            />
            <el-table-column
              label="手机号码"
              min-width="100"
              prop="phone"
              align="center"
            />
            <!-- <el-table-column
              label="所属区域"
              min-width="80"
              prop="regionName"
              align="center"
            /> -->
            <el-table-column
              label="纸样组别"
              min-width="120"
              prop="groupName"
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
      :group-code="(params.groupCode as string)"
      @refreshList="handleQuery(params.pageNum)"
    />
    <UserTransfor
      :id="transforData.id"
      v-model="transforData.visible"
      :group-lists="groupLists"
      :group-code="(params.groupCode as any)"
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
import { getGroupPage, deleteGroup, getGroupUserList, groupUserDelete } from './api';
import { useHandleDelete } from '../../utils/index';
import type { IGroupPageListItem, IGroupUserPageReq, IGroupUserPageListItem } from './api/type';
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
      groupName: '',
      regionName: '',
      regionId: '',
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
    } = useList<IGroupUserPageListItem, IGroupUserPageReq>({
      request: {
        api: getGroupUserList,
        params: {
          pageNum: 1,
          pageSize: 50,
          groupType: 'GROUP_TYPE_PATTERN',
          userName: '',
        },
      },
    });

    const handleQuery = (pageNum?: number) => {
      if (activeGroup.groupName) {
        handleSearch(pageNum);
      }
    };

    const handleResetQuery = () => {
      params.value.userName = '';
      params.value.groupType = 'GROUP_TYPE_PATTERN';
      params.value.pageNum = 1;
      params.value.pageSize = 50;
      handleSearch();
    };

    const permissionConfig = usePermissionConfig();
    const groupLists = ref<IGroupPageListItem[]>([]);
    const getLists = async () => {
      try {
        const res = await getGroupPage({
          pageSize: '1000',
        });
        groupLists.value = res.data?.list;
        if (res.data?.list && res.data?.list?.[0]) {
          const curGroup = res.data?.list?.[0];
          activeGroup.groupName = curGroup.groupName;
          activeGroup.regionName = curGroup.groupName;
          activeGroup.regionId = curGroup.groupName;
          params.value.groupCode = curGroup.groupCode;
          handleQuery();
        }
      } catch (err) {
        // navLoading.value = false;
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
    const showEdit = (row: IGroupPageListItem) => {
      editData.isEdit = true;
      editData.data = { ...row };
      editData.visible = true;
    };

    // 删除
    const handleDelete = (row: IGroupPageListItem) => {
      useHandleDelete({
        id: row.groupId,
        api: deleteGroup,
        callback: getLists,
      });
    };

    const onClickGroup = (item: IGroupPageListItem, index: number) => {
      activeGroup.groupName = item.groupName;
      activeGroupIndex.value = index;
      params.value.groupCode = item.groupCode;
      handleQuery();
    };

    const userDelete = (row: IGroupUserPageListItem) => {
      useHandleDelete({
        id: row.groupUserId,
        api: groupUserDelete,
        callback: () => handleQuery(params.value.pageNum!),
      });
    };

    const transforData = reactive({
      visible: false,
      id: '',
    });
    const userTransfor = (row: IGroupUserPageListItem) => {
      transforData.visible = true;
      transforData.id = row.groupUserId;
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
        handleResetQuery,
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
  padding-top: 10px;
  padding-bottom: 10px;
  display: flex;
  justify-content: space-between;
  padding-right: 10px;
  cursor: pointer;
  .oprate{
    color: var(--el-color-primary);
  }
  &.active{
    color:var(--el-color-primary);
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
