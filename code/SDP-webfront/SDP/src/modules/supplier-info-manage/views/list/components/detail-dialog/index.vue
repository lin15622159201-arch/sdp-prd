<template>
  <el-dialog
    :modelValue="props.visible"
    title="查看"
    :close-on-click-modal="false"
    :destroy-on-close="true"
    @close="handleClose"
    @open="handleOpen"
    :width="1200"
    class="el-dialog-inner-scroll"
  >
    <div>
      <div>
        <el-tabs v-model="activeName" class="reset-tabs">
          <el-tab-pane label="基本信息" name="baseInfo">
            <page-card>
              <ResponsiveRow>
                <el-form-item label="供应商名称：">{{ cooperationForm.roomName }}</el-form-item>
                <el-form-item label="负责人：">{{ cooperationForm.roomContactName }}</el-form-item>
                <el-form-item label="联系电话：">{{ cooperationForm.roomContactPhone }}</el-form-item>
                <el-form-item label="经营类型：">
                  {{ $filters.getEnumLabel(OPERATION_TYPE_LIST, cooperationForm.operationType!) }}
                </el-form-item>
                <el-form-item label="供应商地址：">
                  {{ cooperationForm.roomAddressProvince }}
                  {{ cooperationForm.roomAddressCity }}
                  {{ cooperationForm.roomAddressArea }}
                  {{ cooperationForm.roomDetailAddress }}
                </el-form-item>
              </ResponsiveRow>
            </page-card>
          </el-tab-pane>
          <el-tab-pane label="员工账号" name="roleInfo">
            <page-card>
              <div>
                <sc-table
                  height="100%"
                  :data="playerList"
                  :columns="tableColumns"
                />
              </div>
            </page-card>
          </el-tab-pane>
        </el-tabs>
      </div>
      <div class="tw-flex tw-flex-justify-end tw-py-10px">
        <el-button @click="handleClose">关闭</el-button>
      </div>
    </div>
  </el-dialog>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue';
import { useListColumns } from './hooks/use-table-columns';
import { getOutCloudRoomDetail, getRoomTeam } from '@/modules/distribute-room-manage/api';
import { cloneDeep } from 'lodash-es';
import { cooperationFormItem } from '@/modules/distribute-room-manage/views/detail/config/cooperation-form';
import type {
  IClothingRoomDetailClothingRoomInfoVo,
  IClothingRoomRoomTeamItem
} from '@/modules/distribute-room-manage/api/types';
import { OPERATION_TYPE_LIST } from '@/modules/distribute-room-manage/constant';

type TCooperationForm = typeof cooperationFormItem;

interface TClothingRoomInfoVo extends IClothingRoomDetailClothingRoomInfoVo {
  bankFrontImage: string;
  bankBackImage: string;
  idCardFrontImage: string;
  idCardBackImage: string;
  idCardImage: string;
  goodCategory: string[];
  goodCategorys: string[][];
  goodAtCategory: string[];
  roomContactId: string;
  busTypes: string[];
}

const props = defineProps({
  visible: {
    type: Boolean,
    required: true,
  },
  id: {
    type: String,
  }
});
const emits = defineEmits(['update:visible', 'confirm']);
const activeName = ref('baseInfo');
const cooperationForm = ref<TCooperationForm>(cloneDeep(cooperationFormItem));
const originalPlayerList = ref([] as IClothingRoomRoomTeamItem[]);
const playerList = ref([] as IClothingRoomRoomTeamItem[]);

const handleClose = () => {
  emits('update:visible', false);
};

const getPlaylist = async () => {
  // 获取保存一份后端返回的队员
  const roomId = props.id;
  const res = await getRoomTeam(roomId!);
  const playLists = res.data;

  originalPlayerList.value = playLists ?? [];
  // 编辑的队员，队员需要根据type区分（1:添加、2：删除、3：编辑）
  playerList.value = originalPlayerList.value.map((item) => {
    item.goodAtCategorys = item.goodAtCategory.map(it => it.split('-'));

    item.userRoleList = item.userRoles?.map((it: any) => it.roleCode);
    return item;
  });
};

// 详情
const outCloudRoomDetail = async () => {
  const {
    data: { clothingRoomInfoVo },
  } = await getOutCloudRoomDetail(props.id!);

  getPlaylist();
  // 详情数据
  cooperationForm.value = clothingRoomInfoVo as TClothingRoomInfoVo;
};

const handleOpen = async () => {
  outCloudRoomDetail();
};

const roomId = computed(() => {
  return props.id!;
});
const { tableColumns } = useListColumns({
  roomId,
  reloadFn: () => {
    outCloudRoomDetail();
  },
  getPlaylist: () => {
    getPlaylist();
  }
});

</script>

<style lang="scss">
.reset-tabs {
    .el-tabs__item {
      font-weight: bold;
      font-size: 18px;
    }
  }
</style>
