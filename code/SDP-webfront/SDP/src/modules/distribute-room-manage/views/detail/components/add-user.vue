<template>
  <!-- 新增队员 dialog -->
  <el-dialog
    v-model="dialogVisibleRef"
    title="新增队员"
    center
    top="5vh"
    :show-close="false"
    custom-class="el-dialog-inner-scroll dialog-width-medium"
    :close-on-click-modal="false"
    append-to-body
    @close="handleClose"
  >
    <el-form
      ref="playerForm"
      label-width="95px"
      :model="playerListItemRef"
      size="small"
      :rules="(playerRules as any)"
    >
      <el-form-item label="姓名" prop="userName">
        <el-input v-model="playerListItemRef.userName" placeholder="请输入姓名" />
      </el-form-item>
      <el-form-item label="手机号" prop="phone">
        <el-input
          v-model="playerListItemRef.phone"
          :disabled="playerListItemRef.userId ? true : false"
          maxlength="11"
          placeholder="请输入手机号"
        />
      </el-form-item>
      <el-form-item label="角色" prop="userRoleList">
        <el-checkbox-group v-model="playerListItemRef.userRoleList">
          <el-checkbox
            v-for="item of roleList"
            :key="item.roleCode"
            :label="item.roleCode"
          >
            {{ item.roleName }}（{{item.systemName}}）
          </el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <!-- <el-form-item
        label="服务类型"
        prop="serviceType"
      >
        <el-checkbox-group v-model="playerListItemRef.serviceType">
          <el-checkbox
            v-for="(item, key) in SERVICETYPEMAP"
            :key="key"
            :label="item"
          >
            {{ item }}
          </el-checkbox>
        </el-checkbox-group>
      </el-form-item> -->
      <!-- <el-form-item
        label="擅长品类"
        prop="goodAtCategorys"
      >
        <el-cascader
          v-model="playerListItemRef.goodAtCategorys"
          style="width:100%"
          :options="(clotheCategory as any)"
          :props="{
            label: 'label',
            value: 'label',
            multiple: true
          }"
          clearable
        />
      </el-form-item> -->
    </el-form>
    <template #footer>
      <el-button
        size="small"
        @click="handleClose"
      >
        取消
      </el-button>
      <el-button
        type="primary"
        size="small"
        @click="handleSaveMember"
      >
        确定
      </el-button>
    </template>
  </el-dialog>
</template>

<script lang="ts">
import type { PropType } from 'vue';
import { defineComponent, ref, computed, watch, toRefs } from 'vue';
import {
  USER_MANAGEMENT_ROOM_ROLE_LIST,
  USER_MANAGEMENT_ROOM_ADMIN_ROLE_LIST,
  USER_MANAGEMENT_ROOM_REGION_LIST,
  USER_MANAGEMENT_ROOM_TYPE_ENUM,
  SERVICETYPEMAP,
} from '../../../constant';
import { cloneDeep } from 'lodash-es';
import * as FormValidator from '../../../utils/form-validator';
import type {
  IClothingRoomQueryRoleItem,
  IClothingRoomAddRoomUserUserRolesItem,
  IClothingRoomRoomTeamItem,
} from '@/modules/distribute-room-manage/api/types';
import { queryRoles, addRoomUser, updateRoomUser } from '@/modules/distribute-room-manage/api';
import { FormRules } from 'element-plus';

interface ValidateError {
  message: string;
  field: string;
}

type FieldErrorList = Record<string, ValidateError[]>;

interface Callback {
  (isValid?: boolean | Error, invalidFields?: FieldErrorList): void;
}

interface IPlayerItem {
  phone: string;
}

export default defineComponent({
  components: {

  },
  props: {
    dialogVisible: {
      type: Boolean,
      default: false,
    },
    playerList: {
      type: Array,
      default: () => [],
    },
    playerListItem: {
      type: Object as PropType<IClothingRoomRoomTeamItem>,
      default: () => ({}),
    },
    defaultItem: {
      type: Object,
      default: () => ({}),
    },
    clotheCategory: {
      type: Array,
      default: () => [],
    },
    cooperationForm: {
      type: Object,
      default: () => ({}),
    },
    isEdit: {
      type: Boolean,
      default: false,
    },
    currentIndex: {
      type: Number,
      default: -1,
    },
    operate: {
      type: String,
      default: '',
    },
  },
  setup(props, { emit }) {
    const dialogVisibleRef = computed({
      get() {
        return props.dialogVisible;
      },
      set(value) {
        emit('update:dialogVisible', value);
      },
    });

    const playerListItemRef = computed<IClothingRoomRoomTeamItem>({
      get() {
        return props.playerListItem;
      },
      set(value) {
        emit('update:playerListItem', value);
      },
    });

    const playerForm = ref();
    const roleList = ref<IClothingRoomQueryRoleItem []>([]);
    const { roomId } = toRefs(props.cooperationForm);
    // 取消
    const handleClose = () => {
      dialogVisibleRef.value = false;
      playerListItemRef.value = { ...props.defaultItem } as IClothingRoomRoomTeamItem;
      playerForm.value.resetFields();
    };

    // 队员电话列表，用于校验是否存在相同的号码
    const phoneList = computed(() => {
      const { playerList, isEdit, currentIndex } = props;
      return (playerList as IPlayerItem[]).map((item, index) => {
        if (isEdit && currentIndex === index) {
          return null;
        }
        return item.phone;
      });
    });

    // 检查是否是管理员的电话
    const checkAdminPhone = (_rule: FormRules, value: string, callback: Callback) => {
      const isAdminPhone = props.cooperationForm.roomContactPhone === value;

      // 管理员手机校验
      if (isAdminPhone) {
        return callback(new Error('该手机号码已作为管理员联系电话，请重新输入'));
      }
      // 队员号码重复校验
      if (phoneList.value.includes(value)) {
        return callback(new Error('该手机号码已存在，请重新输入'));
      }
      return callback();
    };

    const getUserRoles = (userRoleList: string[]) => {
      const arr: IClothingRoomAddRoomUserUserRolesItem[] = [];
      userRoleList.forEach((roleCode: string) => {
        roleList.value.forEach((it) => {
          if (roleCode === it.roleCode) {
            arr.push({
              roleId: it.roleId,
              roleCode: it.roleCode,
              roleName: it.roleName,
            });
          }
        });
      });
      return arr;
    };

    // 请求接口，新增或修改
    const requestApi: any = () => {
      const player = cloneDeep(playerListItemRef.value);
      const { goodAtCategorys, phone, serviceType, userName, userId, userRoleList, externalRoomEnum } = player as any;
      const _goodAtCategorys = goodAtCategorys.map((it: string[]) => it.join('-'));

      if (props.isEdit) {
        // 编辑
        return updateRoomUser({
          userId,
          userName,
          roomId: props.cooperationForm.roomId,
          externalRoomCode: externalRoomEnum,
          userRoles: getUserRoles(userRoleList),
          serviceType,
          goodAtCategory: _goodAtCategorys,
        });
      }
      // 新增
      return addRoomUser({
        roomId: props.cooperationForm.roomId,
        roomCode: props.cooperationForm.roomCode,
        externalRoomCode: externalRoomEnum,
        userName,
        phone,
        userRoles: getUserRoles(userRoleList),
        serviceType,
        goodAtCategory: _goodAtCategorys,
      });
    };

    // 添加用户信息
    const handleSaveMember = async () => {
      await playerForm.value.validate();

      await requestApi();

      emit('refreshList');

      handleClose();
    };

    // 当前租户可选的角色
    const getRoleList = async () => {
      if (!roomId.value && props.operate === 'add') {
        // ElMessage.warning('请完善版房名称后，再设置角色权限');
        return;
      }
      const { data } = await queryRoles({
        companyId: roomId.value,
        systemCode: 'CSDP',
      });
      const { data: paiyiData } = await queryRoles({
        companyId: roomId.value,
        systemCode: 'paiyi',
      });
      const list = [...data];
      paiyiData?.forEach((item) => {
        // 合并角色并过滤重复项
        if (data.some(i => i.roleId === item.roleId)) return;
        list.push(item);
      });

      roleList.value = list;
    };

    getRoleList();

    watch(() => roomId.value, () => {
      getRoleList();
    });

    return {
      USER_MANAGEMENT_ROOM_ROLE_LIST,
      USER_MANAGEMENT_ROOM_ADMIN_ROLE_LIST,
      USER_MANAGEMENT_ROOM_REGION_LIST,
      USER_MANAGEMENT_ROOM_TYPE_ENUM,
      SERVICETYPEMAP,

      dialogVisibleRef,
      playerListItemRef,
      handleClose,
      handleSaveMember,

      playerForm,
      roleList,

      playerRules: {
        userName: [{ required: true, message: '请输入姓名', trigger: ['blur', 'change'] }],
        phone: [
          { required: true, validator: FormValidator.checkPhone, trigger: ['blur', 'change'] },
          { required: true, validator: checkAdminPhone, trigger: ['blur', 'change'] },
        ],
        userRoleList: [{ required: true, message: '请选择角色', trigger: ['blur', 'change'] }],
        // serviceType: [{ required: true, message: '请选择服务类型', trigger: ['blur', 'change'] }],
        // goodAtCategorys: [{ required: true, message: '请选择擅长品类', trigger: ['blur', 'change'] }],
      },
    };
  },
});
</script>
