<template>
  <page-card>
    <ResponsiveRow>
      <el-form-item label="版房名称" prop="roomName">
        <!-- 只有新增可编辑 -->
        <!-- <el-select
          filterable
          remote
          reserve-keyword
          placeholder="请输入版房名称"
          :disabled="operate === 'edit'"
          v-model="cooperationFormRef.roomName"
          :remote-method="searchRoomByName"
          @change="onSelectRoom"
        >
          <el-option
            v-for="item in roomLists"
            :key="item.companyId"
            :label="item.companyName"
            :value="item.companyName"
          ></el-option>
        </el-select> -->
        <el-input
          v-model.trim="cooperationFormRef.roomName"
          placeholder="请输入版房名称"
          max-length="200"
        />
        <div>
          <router-link
            v-if="repeatRoomIdRef"
            :to="getEditRouterLink()"
            target="_blank"
          >
            <span class="color-red">
              该用户已关联版房：{{ stateRef.repeatRoomName }}
            </span>
          </router-link>
        </div>
      </el-form-item>

      <el-form-item label="联系人" prop="roomContactName">
        <el-input
          v-model.trim="cooperationFormRef.roomContactName"
          placeholder="请输入联系人"
          maxlength="50"
        />
      </el-form-item>

      <div>
        <el-form-item
          label="联系电话"
          prop="roomContactPhone"
          style="margin-bottom:4px;"
        >
          <el-input
            v-model.trim="cooperationFormRef.roomContactPhone"
            maxlength="11"
            placeholder="请输入联系电话"
            :disabled="operate === 'detail'"
            @blur="(handleValidatorRoomPhone as any)"
          />
        </el-form-item>
      </div>
    </ResponsiveRow>
    <ResponsiveRow
      :col="{
        props: {
          xs: 24, sm: 24, md: 24, lg: 24, xl: 24
        }
      }"
    >
      <el-form-item
        label="版房地址"
        prop="addressDetail"
      >
        <AddressPicker
          class="tw-flex-1"
          v-model:province="cooperationFormRef.roomAddressProvince"
          v-model:city="cooperationFormRef.roomAddressCity"
          v-model:area="cooperationFormRef.roomAddressArea"
          :prop-list="[
            'roomAddressProvince',
            'roomAddressCity',
            'roomAddressArea',
          ]"
        />
        <el-input
          class="tw-w-40% tw-ml-20px"
          v-model.trim="cooperationFormRef.roomDetailAddress"
          placeholder="详细地址，如街道门牌"
        />
      </el-form-item>
    </ResponsiveRow>
    <ResponsiveRow
      :col="{
        props: {
          xs: 24, sm: 24, md: 24, lg: 24, xl: 24
        }
      }"
    >
      <el-form-item
        label="日均产量"
        class="is-required"
        prop="dailyAverage"
      >
        <template #label>
          日均产量
          <span>
            <el-tooltip
              class="item"
              content="指女装/男装/童装分别的产量，“整件”即含纸样和车版日均可以完成的个数，“车版”即仅车版日均可完成的个数"
              placement="bottom-start"
            >
              <el-icon style="color:#f6b897;">
                <Warning />
              </el-icon>
            </el-tooltip>
          </span>
        </template>
        <div>
          <div class="tw-flex tw-mb-10px">
            <div>
              整件女装
              <NumberBasis
                v-model:modelValue.trim="cooperationFormRef.averageDailyOutput.wholeWomenClothing"
                :min="1"
                :max="999"
                style="width:100px"
                class="tw-ml-5px"
              />
              个
            </div>
            <div class="tw-ml-5px">
              /整件男装
              <NumberBasis
                v-model.trim="cooperationFormRef.averageDailyOutput.wholeMenClothing"
                :min="1"
                :max="999"
                style="width:100px"
                class="tw-ml-5px"
              />
              个
            </div>
            <div class="tw-ml-5px">
              /整件童装
              <NumberBasis
                v-model.trim="cooperationFormRef.averageDailyOutput.wholeChildrenClothing"
                :min="1"
                :max="999"
                class="tw-ml-5px"
                style="width:100px"
              />
              个
            </div>
          </div>
          <div class="tw-flex form-item-inner">
            <div class="">
              车版女装
              <NumberBasis
                v-model.trim="cooperationFormRef.averageDailyOutput.makeWomenClothing"
                style="width:100px"
                class="tw-ml-5px"
                :min="1"
                :max="999"
              />
              个
            </div>
            <div class="tw-ml-5px">
              /车版男装
              <NumberBasis
                v-model.trim="cooperationFormRef.averageDailyOutput.makeMenClothing"
                style="width:100px"
                class="tw-ml-5px"
                :min="1"
                :max="999"
              />
              个
            </div>
            <div class="tw-ml-5px">
              /车版童装
              <NumberBasis
                v-model.trim="cooperationFormRef.averageDailyOutput.makeChildrenClothing"
                class="tw-ml-5px"
                style="width:100px"
                :min="1"
                :max="999"
              />
              个
            </div>
          </div>
        </div>
      </el-form-item>
    </ResponsiveRow>
    <ResponsiveRow
      :col="{
        props: {
          xs: 24, sm: 24, md: 24, lg: 24, xl: 24
        }
      }"
    >
      <el-form-item
        label="人员配置"
        prop="personnelConfig"
      >
        <span class="tw-flex form-item-inner">
          <el-form-item
            prop="designMaster"
          >
            纸样师傅<NumberBasis
              v-model.trim="cooperationFormRef.personnelAllocation.designMaster"
              style="width:100px"
              class="tw-ml-5px"
              :min="1"
              :max="999"
            />
            人
          </el-form-item>
          <el-form-item
            prop="makeMaster"
            class="tw-ml-20px"
          >
            车版师傅<NumberBasis
              v-model.trim="cooperationFormRef.personnelAllocation.makeMaster"
              style="width:100px"
              class="tw-ml-5px"
              :min="1"
              :max="999"
            />
            人
          </el-form-item>
          <el-form-item
            prop="partTimeMaster"
            class="tw-ml-20px"
          >
            兼职纸样
            <NumberBasis
              v-model.trim="cooperationFormRef.personnelAllocation.partTimeMaster"
              class="tw-ml-5px"
              style="width:100px"
              :min="1"
              :max="999"
            />
            人
          </el-form-item>
          <el-form-item
            prop="partTimeMake"
            class="tw-ml-20px"
          >
            兼职车板<NumberBasis
              v-model.trim="cooperationFormRef.personnelAllocation.partTimeMake"
              class="tw-ml-5px"
              style="width:100px"
              :min="1"
              :max="999"
            />
            人
          </el-form-item>
        </span>
      </el-form-item>
    </ResponsiveRow>
    <ResponsiveRow
      :col="{
        props: {
          xs: 24, sm: 24, md: 24, lg: 24, xl: 24
        }
      }"
    >
      <el-form-item
        label="设备情况"
        prop="personnelConfig"
      >
        <el-input
          v-model.trim="cooperationFormRef.equipmentSituation"
          placeholder="该合作版房现有平车/打边车/冚车等各类设备情况，便于了解其可承接的范围及日产量"
          type="textarea"
          :rows="3"
          show-word-limit
          maxlength="600"
        />
      </el-form-item>
      <el-form-item
        v-if="isPartTimeRoom()"
        label="业务属性"
        prop="busTypes"
        :rules="[{ required: true, message: '请选择业务属性', trigger: 'blur' }]"
      >
        <!-- 个人兼职 -->
        <el-checkbox-group
          v-model="cooperationFormRef.busTypes"
        >
          <el-checkbox
            v-for=" item of BUSINESS_TYPE_LIST"
            :key="item.value"
            :label="item.value"
          >
            {{ item.label }}
          </el-checkbox>
        </el-checkbox-group>
      </el-form-item>
    </ResponsiveRow>
  </page-card>
</template>

<script lang="ts">
import type { PropType } from 'vue';
import { computed, defineComponent } from 'vue';
import {
  USER_MANAGEMENT_ROOM_ROLE_LIST,
  USER_MANAGEMENT_ROOM_ADMIN_ROLE_LIST,
  USER_MANAGEMENT_ROOM_REGION_LIST,
  USER_MANAGEMENT_ROOM_TYPE_ENUM,
  BUSINESS_TYPE_LIST,
} from '@/modules/distribute-room-manage/constant';
import { getDetailPath, isPartTimeRoom } from '@/modules/distribute-room-manage/utils';
import {
  validatorRoomPhone,
  // getCompanyPage,
} from '@/modules/distribute-room-manage/api';
import type {
  IClothingRoomDetailClothingRoomLogVosItem,
  // ICompanyPagePageDataItem,
} from '@/modules/distribute-room-manage/api/types';
import { Warning } from '@element-plus/icons-vue';
import type { cooperationFormItem } from '../config/cooperation-form';
import { useRoute } from 'vue-router';

interface MyEvent {
  target: {
    value: string;
  };
}

interface IState {
  logs?: IClothingRoomDetailClothingRoomLogVosItem[];
  repeatRoomName: string;
}

export default defineComponent({
  components: {
    Warning,
  },
  props: {
    state: {
      type: Object as PropType<IState>,
      default: () => {},
    },
    repeatRoomId: {
      type: String,
      default: '',
    },
    repeatRoomType: {
      type: String,
      default: '',
    },
    cooperationForm: {
      type: Object as PropType<typeof cooperationFormItem>,
      default: () => {},
    },
  },
  emits: [
    'update:cooperationForm',
    'update:state',
    'update:repeatRoomId',
    'update:repeatRoomType',
  ],
  setup(props, { emit }) {
    const route = useRoute();
    const query = computed(() => {
      return route.query as Record<string, string>;
    });
    const { operate } = query.value;
    const cooperationFormRef = computed<typeof cooperationFormItem>({
      get() {
        return props.cooperationForm;
      },
      set(value) {
        emit('update:cooperationForm', value);
      },
    });

    const stateRef = computed<IState>({
      get() {
        return props.state;
      },
      set(value) {
        emit('update:state', value);
      },
    });

    const repeatRoomIdRef = computed({
      get() {
        return props.repeatRoomId;
      },
      set(value) {
        emit('update:repeatRoomId', value);
      },
    });

    const verifyRepeat = async (phone: string) => {
      const { data } = await validatorRoomPhone(phone);
      // 就是当前的数据不管
      if (cooperationFormRef.value.roomId === data?.roomId) {
        return;
      }
      (stateRef.value as IState).repeatRoomName = data?.roomName || '';
      repeatRoomIdRef.value = data?.roomId || '';
      const roomType = data?.roomType || '';
      emit('update:repeatRoomType', roomType);
    };

    // 失焦校验电话查重版房
    const handleValidatorRoomPhone = async (e: MyEvent) => {
      if (String(e.target.value)?.length === 11) {
        verifyRepeat(e.target.value);
      }
    };

    const getEditRouterLink = () => {
      const path = getDetailPath();
      return {
        path,
        query: {
          operate: 'detail', id: repeatRoomIdRef.value,
        },
      };
    };

    // const roomLists = ref([] as ICompanyPagePageDataItem[]);
    // const searchRoomByName = async (value: string) => {
    //   const res = await getCompanyPage({
    //     companyName: value,
    //     currentPage: '1',
    //     pageSize: '999',
    //     systemCode: 'DES',
    //   });
    //   roomLists.value = res.data?.pageData;
    // };

    // const onSelectRoom = (value: string) => {
    //   const obj = roomLists.value.find(it => it.companyName === value);
    //   (cooperationFormRef as any).value.roomContactName = obj!.managerUsername;
    //   (cooperationFormRef as any).value.roomContactPhone = obj!.managerPhone;
    //   (cooperationFormRef as any).value.roomContactId = obj!.managerUserId;
    //   (cooperationFormRef as any).value.roomId = obj!.companyId;
    //   (cooperationFormRef as any).value.roomCode = obj!.companyCode;
    //   verifyRepeat(obj!.managerPhone);
    // };

    return {
      USER_MANAGEMENT_ROOM_ROLE_LIST,
      USER_MANAGEMENT_ROOM_ADMIN_ROLE_LIST,
      USER_MANAGEMENT_ROOM_REGION_LIST,
      USER_MANAGEMENT_ROOM_TYPE_ENUM,
      // 校验手机号
      handleValidatorRoomPhone,
      operate,
      cooperationFormRef,
      stateRef,
      repeatRoomIdRef,
      getEditRouterLink,
      isPartTimeRoom,
      // searchRoomByName,
      // roomLists,
      // onSelectRoom,
      // roleList,
      BUSINESS_TYPE_LIST,
    };
  },
});
</script>

<style lang="scss" scoped>
.color-red{
  color:#f56c6c;
}
</style>
