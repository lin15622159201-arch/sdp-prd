<template>
  <!-- 异常发起 -->
  <el-dialog
    v-model="visible"
    width="800px"
    :title="title"
    :close-on-click-modal="false"
    center
    append-to-body
  >
    <el-form
      ref="formRef"
      :model="errorFormData"
      :rules="errorFormRules"
      :label-width="120"
    >
      <el-row>
        <el-col :span="12">
          <el-form-item label="发起环节：" prop="processStep">
            <el-input
              class="tw-w-full"
              v-model="errorFormData.processStep"
              disabled
            />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="发起人：" prop="sponsorName">
            <el-input
              class="tw-w-full"
              v-model="errorFormData.sponsorName"
              disabled
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="责任部门：" prop="responsibleDepartmentCode">
            <el-select
              v-model="errorFormData.responsibleDepartmentCode"
              placeholder="请选择"
              class="tw-w-full"
              clearable
              @change="changeDepartment"
            >
              <el-option
                v-for="item in responsibleDepartmentOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="责任人：" prop="responsibleId">
            <el-select
              v-model="errorFormData.responsibleId"
              placeholder="请选择"
              class="tw-w-full"
              clearable
              remote
              filterable
              :remote-method="fuzzyRemoteMethod"
              :loading="fuzzyLoading"
            >
              <el-option
                v-for="item in (fuzzyResponse as any)"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="异常类型：" prop="exceptionTypeCode">
            <el-select
              v-model="errorFormData.exceptionTypeCode"
              placeholder="请选择"
              class="tw-w-full"
              clearable
            >
              <el-option
                v-for="item in PLM_SAMPLE_EXCEPTION_TYPE_OPTIONS"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="异常图片：" prop="exceptionPictureList">
            <!-- @vue-ignore -->
            <Uploader
              v-model="errorFormData.exceptionPictureList"
              :limit="3"
              listPosition="prepend"
              :size-limit="15"
              size="mini"
              accept=".png,.jpg,.jpeg"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="异常描述：" prop="exceptionDesc">
            <el-input
              type="textarea"
              v-model="errorFormData.exceptionDesc"
              class="tw-w-full"
              :rows="4"
              clearable
              placeholder="请输入异常描述"
            />
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <template #footer>
      <el-button @click="close">
        取消
      </el-button>
      <el-button type="primary" @click="confirm">
        确定
      </el-button>
    </template>
  </el-dialog>
</template>

<script lang="ts">
import type { PropType } from 'vue';
import { defineComponent, nextTick, ref } from 'vue';
import { useErrorForm } from './index';
import { ElForm, ElMessage } from 'element-plus';
import { YES_NO_ENUM } from '@/constant/index';
import { useAccountStore } from '@/store/account';
import { CLOTHES_STEP_ENUM } from './constant';
import { cloneDeep } from 'lodash-es';
import { postWebV1AnomalySaveApi } from './api';

export default defineComponent({
  props: {
    modelValue: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: '异常发起',
    },
    /* (必须)
      发起异常类型  CLOTHES_STEP_ENUM
    */
    launchBuzType: {
      type: String as PropType<CLOTHES_STEP_ENUM>,
      required: true,
      default: '',
    },
    /*
    *发起类型业务ID：(必须)-clothesId
    * 纸样-patternId
      3D打版-dimensionId
      款式申版-sampleAuditId
      样衣返修-repairId
      版单交接-clothesId
      款式车版：
       齐套签收：clothesId
      车板分单： sewId
       裁剪：sewId
       裁片二次工艺：sewId
      车缝：sewId
      收货：sewId
      成品二次工艺：sewId
      质检：sampleQcId
    * */
    launchBuzId: {
      type: String,
      default: '',
      required: true,
    },
    /**
     * 发起异常所在环节, 默认是返修环节
     *  */
    clothesStep: {
      type: String as PropType<CLOTHES_STEP_ENUM>,
      default: CLOTHES_STEP_ENUM.REPAIR,
    },
    /**
     * 是否发送到外板房，0-不能，1-能, 默认0
     */
    canSyncExt: {
      type: String as PropType<YES_NO_ENUM>,
      default: YES_NO_ENUM.NO,
    }
  },
  emits: ['update:modelValue', 'send', 'success'],
  setup(props, { emit }) {
    const formRef = ref<InstanceType<typeof ElForm>>();
    const visible = ref(false);
    const {
      fuzzyLoading,
      fuzzyResponse,
      fuzzyRemoteMethod,
      errorFormData,
      errorFormRules,
      responsibleDepartmentOptions,
      PLM_SAMPLE_EXCEPTION_TYPE_OPTIONS,
      resetForm,
      changeDepartment
    } = useErrorForm();

    const accountStore = useAccountStore();

    const close = () => {
      resetForm();
      visible.value = false;
    };

    const confirm = async () => {
      console.log('errorFormData=', errorFormData.value);
      await formRef.value?.validate();
      const data = cloneDeep(errorFormData.value);
      delete data.sponsorName;
      delete data.processStep;
      data.exceptionPictureList = [];
      errorFormData.value.exceptionPictureList.forEach((p: any) => {
        data.exceptionPictureList.push(p.url);
      });

      const c = (fuzzyResponse.value as any).find((n: { value: string; }) => n.value === data.responsibleId);
      if (c) {
        data.responsibleName = c.label;
      }
      const e = PLM_SAMPLE_EXCEPTION_TYPE_OPTIONS.value.find(n => n.value === data.exceptionTypeCode);
      if (e) {
        data.exceptionTypeName = e.label;
      }
      data.clothesStep = props.clothesStep;
      await postWebV1AnomalySaveApi(data);
      ElMessage.success('发起异常成功');
      emit('send', data);
      emit('success', data);
      close();
    };

    /**
     * 初始化-发起异常弹窗
     * @param row 当前选中的行
     */
    const open = (row: Record<string, any> = {}) => {
      if (row.isAbnormal === YES_NO_ENUM.YES) {
        ElMessage.error('选中的数据中存在异常，请先处理异常数据！');
        return;
      }
      const { processStepDesc = '', processNodeDesc = '', processNodeStateDesc = '' } = row;
      const desc = processStepDesc ? `${processStepDesc}-${processNodeDesc}-${processNodeStateDesc}` : '';
      const { clothesId = '' } = row;
      errorFormData.value.clothesId = clothesId;
      errorFormData.value.processStep = desc;
      errorFormData.value.sponsorName = accountStore.account?.account?.name || '';
      errorFormData.value.launchBuzType = props.launchBuzType;
      errorFormData.value.launchBuzId = props.launchBuzId;
      errorFormData.value.clothesStep = props.clothesStep;
      errorFormData.value.canSyncExt = props.canSyncExt;
      visible.value = true;
      nextTick(() => {
        formRef.value?.clearValidate();
      });
    };

    return {
      formRef,
      fuzzyLoading,
      fuzzyResponse,
      fuzzyRemoteMethod,
      visible,
      close,
      errorFormData,
      errorFormRules,
      confirm,
      open,
      responsibleDepartmentOptions,
      PLM_SAMPLE_EXCEPTION_TYPE_OPTIONS,
      changeDepartment,
    };
  },
});
</script>

<style scoped lang="scss">
//
</style>
