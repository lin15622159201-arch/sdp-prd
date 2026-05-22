import { computed, ref } from 'vue';
import { fuzzyQueryUser } from '@/api/user/index';
import { getResponsibleDepartment } from './api/index';
import type {
  IResponsibleDepartmentPageListItem as ListItem,
  PostWebV1AnomalySaveApiReq,
} from './api/types';
import { useFuzzy, useResetRef } from '@toy/v-use';
import { ILabelListItem } from '@/types/utils';
import { DICTIONARY_KEY } from '@/constant/dictionary';
import { useDictionary } from '@/hooks/use-dictionary';
import { YES_NO_ENUM } from '@/constant';
import { CLOTHES_STEP_ENUM } from './constant';

interface IErrorFormItem extends PostWebV1AnomalySaveApiReq {
  /**
   * 异常发起人
   */
  sponsorName?: string;
  /**
   * 发起环节
   */
  processStep?: string;
  /**
   * 发起异常所在环节，这里固定=700， REPAIR(700,"返修环节"),
   */
  clothesStep: CLOTHES_STEP_ENUM;
}

export const useErrorForm = () => {
  const { getDictionaryOptions } = useDictionary();

  /** 异常类型ops */
  const PLM_SAMPLE_EXCEPTION_TYPE_OPTIONS = computed(() => {
    return getDictionaryOptions(DICTIONARY_KEY.PLM_SAMPLE_EXCEPTION_TYPE) || [];
  });
  const [errorFormData, resetForm] = useResetRef<IErrorFormItem>({
    clothesId: '', // 版单id
    sponsorName: '', // 发起人姓名
    exceptionTypeCode: '', // 异常类型编码
    exceptionTypeName: '', // 异常类型名称
    responsibleDepartment: '', // 责任人部门
    responsibleDepartmentCode: '', // 责任人部门编码
    responsibleId: '', // 责任人id
    responsibleName: '', // 责任人姓名
    exceptionDesc: '', // 异常描述
    exceptionPictureList: [], // 异常图片
    launchBuzType: null, // 发起异常类型
    launchBuzId: '', // 发起类型业务ID
    processStep: '', // 发起环节
    clothesStep: CLOTHES_STEP_ENUM.REPAIR, // 发起异常所在环节
    canSyncExt: YES_NO_ENUM.NO,
  });

  const errorFormRules = {
    sponsorName: [
      { required: true, message: '不能为空' },
    ],
    responsibleDepartmentCode: [
      { required: true, message: '不能为空' },
    ],
    exceptionTypeCode: [
      { required: true, message: '不能为空' },
    ],
    responsibleId: [
      { required: true, message: '不能为空' },
    ],
    exceptionPictureList: [
      { required: true, message: '不能为空' },
    ],
    exceptionDesc: [
      { required: true, message: '不能为空' },
    ],
  };

  const {
    fuzzyLoading,
    fuzzyResponse,
    fuzzyRemoteMethod,
  } = useFuzzy({
    params: { keyword: '' },
    keywordKey: 'keyword',
    api: fuzzyQueryUser,
    beforeResponse(res) {
      return res.data?.list?.map((user) => {
        const { name: label, id: value } = user;
        return { ...user, label, value };
      });
    },
  });

  const responsibleDepartmentOptions = ref<ILabelListItem<string>[]>([]);
  const getResponsibleDepartmentOptions = async () => {
    try {
      const { data } = await getResponsibleDepartment({
        isEnabled: '1', // 状态: 0-停用 、1-启用
        pageNum: 1,
        pageSize: 1000,
      });
      responsibleDepartmentOptions.value = data?.list?.map((row: ListItem) => {
        const { departmentName: label, departmentCode: value } = row;
        return {
          label,
          value,
        };
      }) || [];
    } catch (error) {
      console.error(error);
      responsibleDepartmentOptions.value = [];
    } finally {
      //
    }
  };
  const changeDepartment = (val: string) => {
    errorFormData.value.responsibleDepartmentCode = val;
    const c = responsibleDepartmentOptions.value.find(
      item => item.value === val,
    );
    if (c) {
      errorFormData.value.responsibleDepartment = c.label;
    }
  };
  getResponsibleDepartmentOptions();

  return {
    fuzzyLoading,
    fuzzyResponse,
    fuzzyRemoteMethod,
    PLM_SAMPLE_EXCEPTION_TYPE_OPTIONS,
    resetForm,
    errorFormData,
    errorFormRules,
    responsibleDepartmentOptions,
    changeDepartment,
  };
};
