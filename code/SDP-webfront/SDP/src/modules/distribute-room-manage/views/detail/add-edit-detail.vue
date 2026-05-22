<template>
  <div class="cooperation-opera">
    <sc-app-page>
      <template #fheader>
        <el-row
          style="width: 100%"
          type="flex"
          justify="space-between"
          class="tw-items-center tw-mb-15px"
        >
          <h3 class="tw-font-bold tw-text-16px">
            版房详情
          </h3>
          <div>
            <router-link
              v-if="operate === 'detail' && $has(permissionConfigDetail.BFBJ)"
              style="margin-right: 20px"
              :to="getEditRouterLink()"
            >
              <el-button type="text">
                编辑
              </el-button>
            </router-link>

            <el-button
              v-if="operate !== 'add'"
              type="text"
              @click="showDrawer = true"
            >
              操作日志
            </el-button>
          </div>
        </el-row>
      </template>
      <template #main>
        <el-form
          ref="cooperationFormRef"
          :model="cooperationForm"
          :rules="(formRules as any)"
          :disabled="operate === 'detail'"
          label-width="110px"
          size="small"
        >
          <el-tabs v-model="activeName" class="reset-tabs">
            <el-tab-pane label="基本信息" name="baseInfo">
              <!-- 基本信息 -->
              <BaseInfo
                v-model:state="state"
                v-model:repeatRoomId="repeatRoomId"
                v-model:repeatRoomType="repeatRoomType"
                v-model:cooperationForm="cooperationForm"
              />
              <!-- 服务信息 -->
              <!-- <ServeInfo
                v-model:cooperationForm="cooperationForm"
                :clothe-category="clotheCategory"
              /> -->

              <!-- 业务归属 -->
              <BusinessOwnership v-model:cooperationForm="cooperationForm" />

              <!-- 财务信息 -->
              <FinancialInfo
                v-model:cooperationForm="cooperationForm"
                v-model:isSubmiting="isSubmiting"
              />

              <el-row
                type="flex"
                justify="center"
                style="width: 100%"
                class="tw-pt-10px"
              >
                <div
                  v-if="operate !== 'detail'"
                  class="flex-justify-center flex flex-align-center submit-btn"
                >
                  <el-button size="small" @click="handleCancel">
                    取消
                  </el-button>

                  <el-button
                    type="primary"
                    size="small"
                    @click="handleSubmit"
                  >
                    保存
                  </el-button>
                </div>
                <div v-else class="flex-justify-center flex flex-align-center submit-btn">
                  <router-link :to="getListRouterLink()">
                    <el-button size="small">
                      关闭
                    </el-button>
                  </router-link>
                </div>
              </el-row>
            </el-tab-pane>
            <el-tab-pane
              v-if="!isPartTimeRoom()"
              label="角色权限"
              name="roleInfo"
              lazy
            >
              <!-- 角色权限信息 -->
              <RoleAuth
                v-model:cooperationForm="cooperationForm"
                :clothe-category="clotheCategory"
                :player-list="playerList"
                :added-room-id="addedRoomId"
                @refreshPlaylist="getPlaylist"
              />
            </el-tab-pane>
          </el-tabs>
        </el-form>
        <!-- 日志记录 -->
        <LogDrawer v-model:showDrawer="showDrawer" :state="state" />
      </template>
    </sc-app-page>
  </div>
</template>
<script lang="ts">
import { computed, defineComponent, reactive, ref } from 'vue';
import {
  formatPhoneHide,
  isPartTimeRoom,
  getEditPath,
  getListPath,
  getExternalRoomType,
} from '@/modules/distribute-room-manage/utils';
import { cooperationFormItem } from './config/cooperation-form';
import { cloneDeep } from 'lodash-es';
import {
  updateOutCloudRoomList,
  getOutCloudRoomDetail,
  addOutCloudRoom,
  getRoomTeam,
} from '@/modules/distribute-room-manage/api';

import type {
  IClothingRoomDetailClothingRoomInfoVo,
  IClothingRoomDetailClothingRoomLogVosItem,
  IClothingRoomRoomTeamItem,
} from '@/modules/distribute-room-manage/api/types';

import { useRoute, useRouter } from 'vue-router';
import { ElMessage, ElMessageBox, FormRules } from 'element-plus';
import BaseInfo from './components/base-info.vue';
// import ServeInfo from './components/serve-info.vue';
import FinancialInfo from './components/financial-info.vue';
import RoleAuth from './components/role-auth.vue';
import BusinessOwnership from './components/business-ownership.vue';
import LogDrawer from './components/log-drawer.vue';
import * as FormValidator from '../../utils/form-validator';
import { usePermissionDetail } from '../hooks/use-permission-config';
import { useDictionary } from '@/hooks/use-dictionary';
import { DICTIONARY_KEY } from '@/constant/dictionary';

type TCooperationForm = typeof cooperationFormItem;

interface ValidateError {
  message: string;
  field: string;
}

type FieldErrorList = Record<string, ValidateError[]>;

interface Callback {
  (isValid?: boolean | Error, invalidFields?: FieldErrorList): void;
}

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

export default defineComponent({
  name: 'AddEditDeatil',
  components: {
    BaseInfo,
    RoleAuth,
    // ServeInfo,
    BusinessOwnership,
    FinancialInfo,
    LogDrawer,
  },
  setup() {
    const { getDictionaryOptions } = useDictionary();
    const route = useRoute();
    const query = computed(() => {
      return route.query as Record<string, string>;
    });
    const { operate, id } = query.value;
    const currentRouter = useRouter();

    const cooperationFormRef = ref();
    const permissionConfigDetail = usePermissionDetail();

    const state = reactive({
      logs: [] as IClothingRoomDetailClothingRoomLogVosItem[],
      // 品类树
      repeatRoomName: '',
    });
    const showDrawer = ref(false);
    const repeatRoomId = ref('');
    const repeatRoomType = ref('');
    const isSubmiting = ref({
      state: false,
    });

    // 校验
    // validator other API
    const cooperationForm = ref<TCooperationForm>(cloneDeep(cooperationFormItem));
    const checkAddressDetail = (rule: FormRules, value: string, callback: Callback) => {
      return FormValidator.checkAddressDetail(cooperationForm, rule, value, callback);
    };

    const checkDailyAverage = (rule: FormRules, value: string, callback: Callback) => {
      return FormValidator.checkDailyAverage(cooperationForm, rule, value, callback);
    };

    const formRules = reactive({
      roomName: [{ required: true, message: '请输入版房名称', trigger: 'blur' }],
      roomContactName: [{ required: true, message: '请输入联系人', trigger: 'blur' }],
      roomContactPhone: [
        { required: true, message: '请输入联系电话', trigger: 'blur' },
        { required: true, validator: FormValidator.checkPhone, trigger: 'blur' },
      ],
      addressDetail: [{ required: true, validator: checkAddressDetail }],
      dailyAverage: [{ required: true, validator: checkDailyAverage }],
      // serviceType: [{ required: true, message: '请选择服务类型', trigger: 'change' }],
      // goodCategorys: [{ required: true, message: '请选择擅长品类', trigger: 'change' }],
      accountType: [{ required: true, message: '请选择账户类型', trigger: ['blur', 'change'] }],
      accountName: [{ required: true, message: '请输入账户名称', trigger: 'blur' }],
      bankCardNumber: [{ required: true, message: '请输入银行账号或支付宝账号', trigger: 'blur' }],
      regionId: [{ required: true, message: '请选择业务归属', trigger: ['change', 'blur'] }],
    });

    // 校验

    // 取消
    const handleCancel = () => {
      ElMessageBox.confirm('确认放弃本次操作内容并关闭页面？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(() => {
          currentRouter.back();
        })
        .catch(() => {});
    };

    // 字典相关
    // const {
    //   batchDictListMap,
    // } = useDictionary([
    //   'pims_category',
    // ]);

    // 款式品类
    const clotheCategory = computed(() => {
      return getDictionaryOptions(DICTIONARY_KEY.PIMS_CATEGORY) || [];
    });

    // 后端返回的原始队友，提交保存时需要比对出，新增、删除、编辑的type（1:添加、2：删除、3：编辑）
    const originalPlayerList = ref([] as IClothingRoomRoomTeamItem[]);
    const playerList = ref([] as IClothingRoomRoomTeamItem[]);

    const getPlaylist = async () => {
      // 获取保存一份后端返回的队员
      const roomId = id;
      const res = await getRoomTeam(roomId);
      const playLists = res.data;
      // console.log(playLists);

      originalPlayerList.value = playLists ?? [];
      // 编辑的队员，队员需要根据type区分（1:添加、2：删除、3：编辑）
      playerList.value = originalPlayerList.value.map((item) => {
        item.goodAtCategorys = item.goodAtCategory?.map(it => it.split('-'));

        item.userRoleList = item.userRoles?.map((it: any) => it.roleCode);
        return item;
      });
    };

    // 详情
    const outCloudRoomDetail = async () => {
      const {
        data: { clothingRoomInfoVo, clothingRoomLogVos },
      } = await getOutCloudRoomDetail(id);

      // 队员的获取，兼职人员除外
      if (!isPartTimeRoom()) {
        getPlaylist();
      }

      // 详情数据
      cooperationForm.value = clothingRoomInfoVo as TClothingRoomInfoVo;
      // 身份证图片赋值
      [
        cooperationForm.value.idCardFrontImage,
        cooperationForm.value.idCardBackImage
      ] = clothingRoomInfoVo.idCardPictureUrl;
      // 银行图片赋值
      [
        cooperationForm.value.bankFrontImage,
        cooperationForm.value.bankBackImage
      ] = clothingRoomInfoVo.bankCardPictureUrl;
      state.logs = clothingRoomLogVos || [];
      // 擅长品类转换
      cooperationForm.value.goodCategorys = clothingRoomInfoVo.goodAtCategory.map(item => item.split('-'));
    };

    const init = () => {
      if (operate !== 'add') {
        outCloudRoomDetail();
      }
    };

    init();

    // 提交 添加角色权限（和队员）、业务归属、版房类型、版房联系人、电话
    // 队员需要根据type区分新增、编辑、删除（1:添加、2：删除、3：编辑）
    const addedRoomId = ref('');
    const handleSubmit = async () => {
      isSubmiting.value.state = true;
      await cooperationFormRef.value.validate();

      if (repeatRoomId.value && repeatRoomId.value !== cooperationForm.value.roomId) {
        ElMessage.error('该手机号已经存在版房了');
        return;
      }

      const params = Object.assign({}, cooperationForm.value);

      params.goodAtCategory = (params.goodCategorys || []).map(item => item.join('-'));
      params.idCardPictureUrl = [params.idCardFrontImage, params.idCardBackImage];
      params.bankCardPictureUrl = [params.bankFrontImage, params.bankBackImage];

      // 传入版房类型，从详情中获取 | 当前页面类型
      params.externalRoomEnum = params.externalRoomEnum || getExternalRoomType();

      operate === 'add'
        ? await addOutCloudRoom(params)
        : await updateOutCloudRoomList(params);

      ElMessage.success('保存成功！');

      if (operate === 'add') {
        addedRoomId.value = params.roomId;
      }
    };

    const getEditRouterLink = () => {
      const path = getEditPath();
      return {
        path,
        query: {
          operate: 'edit',
          id,
        },
      };
    };

    const getListRouterLink = () => {
      const path = getListPath();
      return {
        path,
      };
    };

    // 基本信息
    const activeName = ref('baseInfo');

    return {
      state,
      // 表单ref
      cooperationFormRef,

      // 表单对象
      cooperationForm,
      // 表单校验
      formRules,
      // 页面类型
      operate,
      // 提交
      handleSubmit,
      handleCancel,

      formatPhoneHide,
      // 重复版房ID
      repeatRoomId,
      // 擅长品类
      clotheCategory,
      // 日志显示
      showDrawer,
      playerList,
      id,
      getEditRouterLink,
      getListRouterLink,
      repeatRoomType,
      isSubmiting,
      activeName,
      isPartTimeRoom,
      getPlaylist,
      permissionConfigDetail,
      addedRoomId,
    };
  },
});
</script>
<style lang="scss" scoped>
.cooperation-opera {
  h2 {
    font-size: 16px;
    font-weight: bold;
    line-height: 30px;
  }
  .detail-phone {
    min-width: 300px;
    height: 32px;
    border: 1px solid #e4e7ed;
    border-radius: 4px;
    cursor: not-allowed;
    background: #f5f7fa;
    color: #c0c4cc;
    padding-left: 15px;
  }
  :deep {
    .image-item-actions {
      display: flex;
      position: absolute;
      left: 0;
      top: 0;
      right: 0;
      /* stylelint-disable-next-line declaration-block-no-redundant-longhand-properties */
      bottom: 0;
      background-color: rgba(0, 0, 0, 0.5);
      justify-content: center;
      align-items: center;
      opacity: 0;
      transition: opacity 0.3s;
      > span {
        display: inline-block;
        position: initial;
        padding: 5px;
        margin: 0 3px;
        color: #fff;
        font-size: 20px;
        cursor: pointer;
        opacity: 0.8;
        transition: opacity 0.3s;
      }
      &:hover {
        opacity: 1;
      }
    }
    .el-image {
      display: block;
      width: 100%;
      height: 100%;
    }
    .image-slot {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      height: 100%;
      background: #f0f0f0;
      color: #ccc;
      font-size: 12px;
    }
    .idcard-imgs {
      margin-top: -40px;
    }
    .financial-images {
      .image-item {
        display: inline-block;
        position: relative;
        width: 88px;
        height: 56px;
        margin: 5px;
      }
      .image-item:nth-child(1) {
        margin-left: 0;
      }
      .image-type {
        position: absolute;
        left: 0;
        right: 0;
        bottom: 0;
        padding: 2px;
        background: rgba(0, 0, 0, 0.5);
        color: #fff;
        text-align: center;
        font-size: 12px;
        line-height: 1;
      }
    }
  }
}
</style>
<style lang="scss">
.cooperation-opera {
  .form-item-inner {
    .el-form-item--small.el-form-item {
      margin-bottom: 0;
    }
  }
  .good-category {
    .el-cascader {
      width: 100%;
    }
  }
  .reset-tabs {
    .el-tabs__item {
      font-weight: bold;
      font-size: 18px;
    }
  }
}
</style>
