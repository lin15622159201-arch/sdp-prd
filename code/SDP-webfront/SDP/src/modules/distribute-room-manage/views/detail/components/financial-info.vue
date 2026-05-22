<template>
  <page-card title="财务信息">
    <ResponsiveRow v-if="!isPartTimeRoom()">
      <el-form-item
        key="paymentChannel"
        label="付款渠道"
        prop="paymentChannel"
        :rules="{ required: true, message: '请选择付款渠道', trigger: 'change' }"
      >
        <el-radio-group v-model="cooperationFormRef.paymentChannel">
          <el-radio
            v-for="item of PAYMENT_CHANNEL_LIST"
            :key="item.value"
            :label="item.value"
          >
            {{ item.label }}
          </el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item
        v-if="PAYMENT_CHANNEL_ENUM.ROOM_PAY === cooperationFormRef.paymentChannel"
        key="taxSubsidyFeeRate"
        label="税费补贴税率"
        prop="taxSubsidyFeeRate"
        :rules="{ required: true, message: '请选择税费补贴税率', trigger: 'change' }"
      >
        <el-select
          v-model="cooperationFormRef.taxSubsidyFeeRate"
        >
          <el-option
            v-for="(item, index) of plmTaxRateList"
            :key="index"
            :value="item.value"
            :label="`${item.value}%`"
          >
            <span>{{ item.value }}%</span>
          </el-option>
        </el-select>
      </el-form-item>
    </ResponsiveRow>
    <ResponsiveRow>
      <el-form-item
        label="账户类型"
        prop="accountType"
      >
        <el-radio-group v-model="cooperationFormRef.accountType">
          <el-radio :label="ACCOUNT_TYPE_ENUM.PRIVATE">
            私账
          </el-radio>
          <el-radio :label="ACCOUNT_TYPE_ENUM.OPEN">
            公账
          </el-radio>
          <el-radio :label="ACCOUNT_TYPE_ENUM.ALIPAY">
            支付宝
          </el-radio>
        </el-radio-group>
      </el-form-item>
    </ResponsiveRow>
    <ResponsiveRow>
      <el-form-item
        label="账户名称"
        prop="accountName"
      >
        <el-input
          v-model.trim="cooperationFormRef.accountName"
          maxlength="200"
          placeholder="请输入账户名称"
        />
      </el-form-item>
      <el-form-item
        label="银行/支付宝账号"
        prop="bankCardNumber"
        label-width="150px"
      >
        <el-input
          v-model.trim="cooperationFormRef.bankCardNumber"
          placeholder="请输入银行账号或支付宝账号"
          maxlength="30"
          :input="cooperationFormRef.bankCardNumber = cooperationFormRef.bankCardNumber.replace(/\s+/g, '')"
        />
      </el-form-item>
    </ResponsiveRow>
    <ResponsiveRow>
      <el-form-item
        label="开户支行"
        prop="openingBank"
        class="open-bank"
        :rules=" [
          { required: !isAlipay, message: '请输入开户支行', trigger: ['blur', 'change'] },
          { required: !isAlipay, validator: (checkBranchBank as any), trigger: ['blur', 'change'] },
        ]"
      >
        <el-input
          v-model="cooperationFormRef.openingBank"
          placeholder="请输入开户支行"
        />
      </el-form-item>

      <el-form-item
        label="银行名称"
        prop="bankName"
        label-width="150px"
        :rules=" [
          { required: !isAlipay, message: '请完善银行名称', trigger: ['blur', 'change'] }
        ]"
      >
        <el-input
          v-model.trim="cooperationFormRef.bankName"
          placeholder=""
          maxlength="18"
          :disabled="false"
        />
      </el-form-item>
    </ResponsiveRow>
    <ResponsiveRow>
      <el-form-item
        label="银行所在省"
        prop="bankProvince"
        :rules=" [
          { required: !isAlipay, message: '请完善银行所在省', trigger: ['blur', 'change'] }
        ]"
      >
        <el-input
          v-model.trim="cooperationFormRef.bankProvince"
          placeholder=""
          maxlength="18"
          :disabled="false"
        />
      </el-form-item>
      <el-form-item
        label="银行所在市"
        prop="bankCity"
        label-width="150px"
        :rules="[
          { required: !isAlipay, message: '请完善银行所在市', trigger: ['blur', 'change'] }
        ]"
      >
        <el-input
          v-model.trim="cooperationFormRef.bankCity"
          placeholder=""
          maxlength="18"
          :disabled="false"
        />
      </el-form-item>
    </ResponsiveRow>
    <ResponsiveRow>
      <el-form-item
        label="身份证号"
        prop="idCard"
        :rules="[{ required: false, validator: (checkIdCard as any), trigger: 'blur' }]"
      >
        <el-input
          v-model.trim="cooperationFormRef.idCard"
          placeholder="请输入与账户一致的身份证信息"
          maxlength="18"
        />
      </el-form-item>
      <el-form-item
        label="银行卡照片"
        class="financial-images "
        prop="bankImage"
        label-width="150px"
        :rules="[
          { required: !isAlipay, validator: (checkBankImage as any), trigger: ['blur', 'change'] }
        ]"
      >
        <div class="image-item">
          <el-image
            ref="bankFront"
            :src="$filters.ossUrl(cooperationFormRef.bankFrontImage, 180)"
            fit="cover"
          >
            <template #error>
              <div
                class="image-slot"
              >
                <span>暂无图片</span>
              </div>
            </template>
          </el-image>
          <el-input v-show="false" v-model="cooperationFormRef.bankFrontImage" />
          <div v-if="operate !== 'detail'" class="image-item-actions">
            <span
              v-if="cooperationFormRef.bankFrontImage"
              class="el-upload-list__item-preview"
              title="查看"
              @click="handlePreviewImage(cooperationFormRef.bankFrontImage)"
            >
              <el-icon>
                <ZoomIn />
              </el-icon>
            </span>
            <span
              class="el-upload-list__item-edit"
              title="编辑"
              @click="handleEditImage('bank', 'Front')"
            >
              <el-icon>
                <Edit />
              </el-icon>
            </span>
          </div>
          <div class="image-type">
            银行卡正面
          </div>
        </div>
        <div class="image-item">
          <el-image
            ref="bankBack"
            :src="$filters.ossUrl(cooperationFormRef.bankBackImage, 180)"
            fit="cover"
          >
            <template #error>
              <div
                class="image-slot"
              >
                <span>暂无图片</span>
              </div>
            </template>
          </el-image>
          <el-input v-show="false" v-model="cooperationFormRef.bankBackImage" />
          <div v-if="operate !== 'detail'" class="image-item-actions">
            <span
              v-if="cooperationFormRef.bankBackImage"
              class="el-upload-list__item-preview"
              title="查看"
              @click="handlePreviewImage(cooperationFormRef.bankBackImage)"
            >
              <el-icon>
                <ZoomIn />
              </el-icon>
            </span>
            <span
              class="el-upload-list__item-edit"
              title="编辑"
              @click="handleEditImage('bank', 'Back')"
            >
              <el-icon>
                <Edit />
              </el-icon>
            </span>
          </div>
          <div class="image-type">
            银行卡反面
          </div>
        </div>
      </el-form-item>
    </ResponsiveRow>
    <ResponsiveRow>
      <el-form-item
        label="身份证照片"
        prop="idCardImage"
        class="financial-images idcard-imgs"
        :rules="[{
          required: (idCardIsOk(cooperationFormRef.idCard) as boolean),
          validator: (checkIdCardImage as any)
        }]"
      >
        <div class="image-item">
          <el-image
            ref="idCardFront"
            :src="cooperationFormRef.idCardFrontImage"
            fit="cover"
          >
            <template #error>
              <div
                class="image-slot"
              >
                <span>暂无图片</span>
              </div>
            </template>
          </el-image>

          <div v-if="operate !== 'detail'" class="image-item-actions">
            <span
              v-if="cooperationFormRef.idCardFrontImage"
              class="el-upload-list__item-preview"
              title="查看"
              @click="handlePreviewImage(cooperationFormRef.idCardFrontImage)"
            >
              <el-icon>
                <Edit />
              </el-icon>
            </span>
            <span
              class="el-upload-list__item-edit"
              title="编辑"
              @click="handleEditImage('idCard', 'Front')"
            >
              <el-icon>
                <Edit />
              </el-icon>
            </span>
          </div>
          <div class="image-type">
            身份证正面
          </div>
        </div>
        <div class="image-item">
          <el-image
            ref="idCardBack"
            :src="cooperationFormRef.idCardBackImage"
            fit="cover"
          >
            <template #error>
              <div
                class="image-slot"
              >
                <span>暂无图片</span>
              </div>
            </template>
          </el-image>

          <div v-if="operate !== 'detail'" class="image-item-actions">
            <span
              v-if="cooperationFormRef.idCardBackImage"
              class="el-upload-list__item-preview"
              title="查看"
              @click="handlePreviewImage(cooperationFormRef.idCardBackImage)"
            >
              <el-icon>
                <ZoomIn />
              </el-icon>
            </span>
            <span
              class="el-upload-list__item-edit"
              title="编辑"
              @click="handleEditImage('idCard', 'Back')"
            >
              <el-icon>
                <Edit />
              </el-icon>
            </span>
          </div>
          <div class="image-type">
            身份证背面
          </div>
        </div>
      </el-form-item>
    </ResponsiveRow>
    <ImageEdit
      v-model:modelValue="editImage.visible"
      :title="editImage.title"
      :limit="editImage.limit"
      :images="editImage.images"
      size-limit="5"
      @change="handleImagesEditChange"
    />
  </page-card>
</template>

<script lang="ts">
import type { PropType } from 'vue';
import { defineComponent, ref, computed, reactive, toRefs } from 'vue';
import {
  USER_MANAGEMENT_ROOM_ROLE_LIST,
  USER_MANAGEMENT_ROOM_ADMIN_ROLE_LIST,
  USER_MANAGEMENT_ROOM_REGION_LIST,
  USER_MANAGEMENT_ROOM_TYPE_ENUM,
  ACCOUNT_TYPE_ENUM,
  PAYMENT_CHANNEL_LIST,
  PAYMENT_CHANNEL_ENUM,
} from '@/modules/distribute-room-manage/constant';
import { useEditImage } from '@/modules/distribute-room-manage/utils/use-edit-image';
import * as FormValidator from '@/modules/distribute-room-manage/utils/form-validator';
import ImageEdit from './image-edit.vue';
import type { cooperationFormItem } from '../config/cooperation-form';
import { ElMessageBox, FormRules } from 'element-plus';
import { ZoomIn, Edit } from '@element-plus/icons-vue';
import { isPartTimeRoom } from '@/modules/distribute-room-manage/utils';
import { useDictionary } from '@/hooks-transfer/use-dict';
import { useRoute } from 'vue-router';

type TCooperationForm = typeof cooperationFormItem;
interface ValidateError {
  message: string;
  field: string;
}

type FieldErrorList = Record<string, ValidateError[]>;

interface Callback {
  (isValid?: boolean | Error, invalidFields?: FieldErrorList): void;
}
interface TSubmit {
  state: boolean;
}

export default defineComponent({
  components: {
    ImageEdit,
    ZoomIn,
    Edit,
  },

  props: {
    cooperationForm: {
      type: Object as PropType<TCooperationForm>,
      default: () => ({} as TCooperationForm),
    },
    isSubmiting: {
      type: Object as PropType<TSubmit>,
      default: () => {},
    },
  },

  setup(props, { emit }) {
    const route = useRoute();
    const query = computed(() => {
      return route.query as Record<string, string>;
    });
    const { operate } = query.value;

    const { idCardFront, idCardBack, bankFront, bankBack } = toRefs(reactive({
      idCardFront: null,
      idCardBack: null,
      bankFront: null,
      bankBack: null,
    }));
    const branchBandNeedFix = ref(false);

    const cooperationFormRef = computed<TCooperationForm>({
      get() {
        return props.cooperationForm;
      },
      set(value) {
        emit('update:cooperationForm', value);
      },
    });
    const isSubmitingRef = computed<TSubmit>({
      get() {
        return props.isSubmiting;
      },
      set(value) {
        emit('update:isSubmiting', value);
      },
    });

    const isAlipay = computed(() => {
      return cooperationFormRef.value.accountType === ACCOUNT_TYPE_ENUM.ALIPAY;
    });

    // 校验
    const checkIdCard = (rule: FormRules, value: string, callback: Callback) => {
      return FormValidator.checkIdCard(rule, value, callback);
    };
    const checkBankImage = (rule: FormRules, value: string, callback: Callback) => {
      return FormValidator.checkBankImage(cooperationFormRef, rule, value, callback);
    };
    const checkIdCardImage = (rule: FormRules, value: string, callback: Callback) => {
      return FormValidator.checkIdCardImage(cooperationFormRef, rule, value, callback);
    };

    const verifyBankInfo = () => {
      if (operate === 'edit') {
        const { bankName, bankProvince, bankCity } = cooperationFormRef.value;
        branchBandNeedFix.value = false;
        if (!bankName || !bankProvince || !bankCity) {
          if (isAlipay.value) {
            return;
          }
          branchBandNeedFix.value = true;
          if (isSubmitingRef.value.state) {
            ElMessageBox.confirm('请输入正确的开户支行信息', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning',
            });
          }
          isSubmitingRef.value.state = false;
        }
      }
    };
    const checkBranchBank = (rule: FormRules, value: string, callback: Callback) => {
      verifyBankInfo();
      if (branchBandNeedFix.value) {
        return callback(new Error('请输入正确的开户支行信息'));
      }
      return callback();
    };

    // 编辑图片
    const {
      editImage,
      handlePreviewImage,
      handleEditImage,
      handleImagesEditChange,
    } = useEditImage(cooperationFormRef);

    // 字典相关
    const {
      batchDictListMap,
    } = useDictionary([
      'PLM-tax-rate',
    ]);
    const plmTaxRateList = computed(() => batchDictListMap.value['PLM-tax-rate']);

    return {
      operate,
      USER_MANAGEMENT_ROOM_ROLE_LIST,
      USER_MANAGEMENT_ROOM_ADMIN_ROLE_LIST,
      USER_MANAGEMENT_ROOM_REGION_LIST,
      USER_MANAGEMENT_ROOM_TYPE_ENUM,
      ACCOUNT_TYPE_ENUM,
      PAYMENT_CHANNEL_LIST,
      PAYMENT_CHANNEL_ENUM,

      plmTaxRateList,
      isPartTimeRoom,
      cooperationFormRef,

      editImage,
      handlePreviewImage,
      handleEditImage,
      handleImagesEditChange,

      // 预览Ref
      idCardFront,
      idCardBack,
      bankFront,
      bankBack,
      isAlipay,

      checkIdCard,
      checkBankImage,
      checkIdCardImage,
      checkBranchBank,
      idCardIsOk: FormValidator.idCardIsOk,
    };
  },
});
</script>

<style lang="scss" scoped>

  .open-bank{
    :deep(.el-select) {
      width: 100%;
    }
  }

</style>
