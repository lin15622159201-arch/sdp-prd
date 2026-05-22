<template>
  <page-card>
    <div class="margin-top-10 margin-bottom-20">
      <div v-if="!isPartTimeRoom()">
        <el-row
          style="width:100%"
          type="flex"
          justify="end"
          class="tw-mb-10px"
        >
          <el-button
            :disabled="!canAdd"
            @click="handleAddMember()"
          >
            新增队员
          </el-button>
        </el-row>
        <el-table
          :data="playerList"
          border
        >
          <el-table-column
            width="55"
            type="index"
            label="序号"
            align="center"
          />
          <el-table-column
            prop="userName"
            label="姓名"
            align="center"
          />
          <el-table-column
            prop="phone"
            label="手机号"
            align="center"
          />
          <el-table-column
            prop="userRoles"
            label="角色"
            align="center"
          >
            <template #default="{ row }">
              <span
                v-for="(it, idx) of row.userRoles"
                :key="it"
              >
                <span v-if="idx !== 0">，</span>
                <span>
                  {{ it.roleName }}
                </span>
              </span>
            </template>
          </el-table-column>
          <!-- <el-table-column
            prop="serviceType"
            label="服务类型"
            align="center"
          >
            <template #default="{ row }">
              {{ row.serviceType.join('，') }}
            </template>
          </el-table-column> -->
          <!-- <el-table-column
            prop="goodAtCategory"
            label="擅长品类"
            align="center"
            show-overflow-tooltip
          >
            <template #default="{ row }">
              {{ computedCategory(row.goodAtCategorys) }}
            </template>
          </el-table-column> -->
          <el-table-column
            label="操作"
            align="center"
            width="150"
          >
            <template #default="{ row, $index }">
              <el-button
                text
                type="primary"
                size="small"
                @click="handleEditMember(row, $index)"
              >
                编辑
              </el-button>
              <el-button
                text
                type="primary"
                size="small"
                @click="handleChangeUserState(row)"
              >
                {{ row.isEnabled === '1' ? "停用" : '启用' }}
              </el-button>
              <!-- 新增版房 和 新增的队员 都无 重置密码 -->
              <el-button
                v-if="operate === 'edit' && row.userId"
                text
                type="primary"
                size="small"
                @click="handleResetMemberPassword(row)"
              >
                重置密码
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <!-- 新增队员 dialog -->
      <AddUser
        v-model:dialogVisible="dialogVisible"
        v-model:playerListItem="playerListItem"
        :player-list="playerList"
        :default-item="defaultItem"
        :clothe-category="clotheCategory"
        :cooperation-form="cooperationForm"
        :is-edit="isEdit"
        :current-index="currentIndex"
        :operate="operate"
        @refreshList="refreshList"
      />
    </div>
  </page-card>
</template>

<script lang="ts">
import type { PropType } from 'vue';
import { defineComponent, ref, computed, watch } from 'vue';
import {
  USER_MANAGEMENT_ROOM_ROLE_LIST,
  USER_MANAGEMENT_ROOM_ADMIN_ROLE_LIST,
  USER_MANAGEMENT_ROOM_REGION_LIST,
  USER_MANAGEMENT_ROOM_TYPE_ENUM,
} from '../../../constant';
import { ElMessage, ElMessageBox } from 'element-plus';

import {
  resetMenberPwd,
  changeUserEnableState,
} from '../../../api';

import type {
  IClothingRoomRoomTeamItem,
  IClothingRoomAddRoomUserUserRolesItem,
} from '../../../api/types';

import { isPartTimeRoom } from '../../../utils';
import { cloneDeep } from 'lodash-es';
import AddUser from './add-user.vue';
import { useRoute } from 'vue-router';
import { getLabelByVal } from '@/core/plugins/filter';

export default defineComponent({
  components: {
    AddUser,
  },
  props: {
    cooperationForm: {
      type: Object,
      default: () => ({}),
    },
    clotheCategory: {
      type: Array,
      default: () => [],
    },
    playerList: {
      type: Array as PropType<IClothingRoomRoomTeamItem[]>,
      default: () => [],
    },
    addedRoomId: {
      type: String,
      default: '',
    },

  },
  emits: ['update:cooperationForm', 'refreshPlaylist'],
  setup(props, { emit }) {
    const route = useRoute();
    const query = computed(() => {
      return route.query as Record<string, string>;
    });
    const { operate } = query.value;
    // 队员编辑
    const defaultItem = {
      userName: '',
      phone: '',
      userRoles: [] as IClothingRoomAddRoomUserUserRolesItem[],
      userRoleList: [] as string[],
      serviceType: [] as string[],
      goodAtCategory: [] as string[],
      goodAtCategorys: [] as string[][],
    } as IClothingRoomRoomTeamItem;

    // 新增队员弹框
    const dialogVisible = ref(false);

    const cooperationFormRef = computed({
      get() {
        return props.cooperationForm;
      },
      set(value) {
        emit('update:cooperationForm', value);
      },
    });

    // 重置队员密码
    const handleResetMemberPassword = async (row: IClothingRoomRoomTeamItem) => {
      await ElMessageBox.confirm('确定立即重置该队员密码？', '重置密码', { type: 'warning' });
      // 重置密码 后端支持 多个
      await resetMenberPwd(row.userId);
      ElMessage.success('已重置该队员密码');
    };

    // 显示擅长品类
    const computedCategory = (categoryList: string[]) => {
      const arr: string[] = categoryList.map((list) => {
        if (Array.isArray(list)) {
          return list.join('-');
        }
        return list;
      });
      return arr.join('，');
    };

    // 队员编辑
    const playerListItem = ref(defaultItem);
    // 是否新增
    const isEdit = ref(false);
    // 当前正在编辑的 index，新增时为 -1
    const currentIndex = ref(-1);

    // 点击新增队员
    const handleAddMember = () => {
      playerListItem.value = { ...defaultItem };
      isEdit.value = false;
      currentIndex.value = -1;
      dialogVisible.value = true;
    };

    // 编辑队员
    const handleEditMember = (row: IClothingRoomRoomTeamItem, index: number) => {
      isEdit.value = true;
      currentIndex.value = index;
      const rows = cloneDeep(row);
      playerListItem.value = rows;
      dialogVisible.value = true;
    };

    //  删除
    const handleChangeUserState = async (row: IClothingRoomRoomTeamItem) => {
      const openTxt = row.isEnabled === '1' ? '停用' : '启用';
      await ElMessageBox.confirm(`确定${openTxt}该队员？`, openTxt, { type: 'warning' });
      await changeUserEnableState(row.userId);
      emit('refreshPlaylist');
    };
    const canAdd = ref(false);
    const verifyExistRoom = async () => {
      if (operate === 'add') {
        if (props.addedRoomId) {
          canAdd.value = true;
        } else {
          canAdd.value = false;
          ElMessage.warning('请完善版房信息后，再设置角色权限');
        }
      } else {
        canAdd.value = true;
      }
    };
    const init = () => {
      verifyExistRoom();
    };
    init();

    watch(
      () => props.addedRoomId,
      () => {
        verifyExistRoom();
      },
      {
        immediate: true,
      },
    );

    const refreshList = () => {
      emit('refreshPlaylist');
    };

    return {
      USER_MANAGEMENT_ROOM_ROLE_LIST,
      USER_MANAGEMENT_ROOM_ADMIN_ROLE_LIST,
      USER_MANAGEMENT_ROOM_REGION_LIST,
      USER_MANAGEMENT_ROOM_TYPE_ENUM,
      cooperationFormRef,
      operate,
      handleResetMemberPassword,
      isPartTimeRoom,
      getLabelByVal,
      handleAddMember,
      handleEditMember,
      playerListItem,
      dialogVisible,
      defaultItem,
      computedCategory,
      handleChangeUserState,
      currentIndex,
      isEdit,
      refreshList,
      canAdd,
    };
  },
});
</script>

<style lang="scss" scoped>
//
</style>
