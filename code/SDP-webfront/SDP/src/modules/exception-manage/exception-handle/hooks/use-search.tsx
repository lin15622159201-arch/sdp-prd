import { IConfigItem } from '@/components/search-area';
import { ref, watchEffect } from 'vue';
import useDict from './use-dict';
import { EXCEPTION_CANCEL_STEP_LIST, EXCEPTION_SAMPLE_TYPE_LIST, EXCEPTION_STEP_LIST } from '../constant';
import { useErrorForm } from '@/modules/common/components/error-dialog';

const { responsibleDepartmentOptions } = useErrorForm();
const { PLM_SAMPLE_EXCEPTION_TYPE_OPTIONS, PLM_EXCEPTION_STEP_OPTIONS } = useDict();

export const useSearch = () => {
  const searchConfig = ref<IConfigItem[]>(
    [
      {
        name: 'SKC：',
        component: 'input',
        valueName: 'designCode',
        placeholder: '请输入SKC',
        clearable: true,
        isHiden: false,
      },
      // {
      //   name: '技术组别：',
      //   slotName: 'techniqueGroup',
      //   valueName: 'techniqueGroupCodeList',
      // },
      {
        id: 'sampleClothingExceptionTypeList',
        name: '异常类型：',
        component: 'select',
        valueName: 'sampleClothingExceptionTypeList',
        placeholder: '请选择异常类型',
        options: PLM_SAMPLE_EXCEPTION_TYPE_OPTIONS.value,
        clearable: true,
        isHiden: false,
        multiple: true,
      },
      {
        id: 'exceptionProcessStepList2',
        name: '发起阶段：',
        component: 'select',
        valueName: 'exceptionProcessStepList2',
        placeholder: '请选择发起阶段',
        options: PLM_EXCEPTION_STEP_OPTIONS.value,
        clearable: true,
        isHiden: false,
        multiple: true,
      },
      {
        name: '设计师：',
        slotName: 'designerIdList',
        valueName: 'designerIdList',
      },
      {
        name: '设计组别：',
        slotName: 'designerGroupCodeList',
        valueName: 'designerGroupCodeList',
      },
      {
        name: '纸样师：',
        slotName: 'patternMakerIdList',
        valueName: 'patternMakerIdList',
      },
      {
        name: '打版类型：',
        component: 'select',
        valueName: 'sampleTypeList',
        placeholder: '请选择',
        options: EXCEPTION_SAMPLE_TYPE_LIST,
        clearable: true,
        isHiden: false,
        multiple: true,
      },
      {
        // excluding:['已取消']
        id: 'timeConsuming',
        name: '当前耗时：',
        slotName: 'timeConsuming',
        isHiden: false,
      },
      {
        // excluding:['已取消']
        id: 'sponsorIdList',
        name: '发起人：',
        slotName: 'sponsorIdList',
      },
      {
        // excluding:['已取消']
        id: 'departmentIdList',
        name: '责任部门：',
        component: 'select',
        valueName: 'departmentIdList',
        placeholder: '请选择',
        options: responsibleDepartmentOptions.value,
        clearable: true,
        isHiden: false,
        multiple: true,
      },
      {
        // excluding:['已取消']
        name: '责任人：',
        slotName: 'responsibleIdList',
        id: 'responsibleIdList',
      },
      {
        // including：['全部']
        id: 'exceptionState',
        name: '异常环节：',
        component: 'select',
        valueName: 'exceptionState',
        placeholder: '请选择',
        options: EXCEPTION_STEP_LIST,
        clearable: true,
        isHiden: false,
      },
      {
        // including：['处理中']
        name: '处理人：',
        slotName: 'handlerIdList',
        id: 'handlerIdList',
        isHiden: true,
      },
      {
        // excluding:['全部'，'已取消']
        id: 'createdTime',
        name: '创建时间：',
        component: 'datePicker',
        valueName: ['createdTimeStart', 'createdTimeEnd'],
        placeholder: ['开始日期', '结束日期'],
        isHiden: true,
      },
      // 以下只在已取消中展示
      {
        id: 'cancelTime',
        name: '取消时间：',
        component: 'datePicker',
        valueName: ['cancelTimeStart', 'cancelTimeEnd'],
        placeholder: ['开始日期', '结束日期'],
        isHiden: true,
      },
      {
        name: '取消人：',
        slotName: 'cancelerIdList',
        id: 'cancelerIdList',
        isHiden: true,
      },
      {
        id: 'cancelProcessStepList',
        name: '取消环节：',
        component: 'select',
        valueName: 'cancelProcessStepList',
        placeholder: '请选择',
        options: EXCEPTION_CANCEL_STEP_LIST,
        clearable: true,
        multiple: true,
        isHiden: true,
      },
    ]
  );

  watchEffect(() => {
    if (PLM_SAMPLE_EXCEPTION_TYPE_OPTIONS.value.length) {
      const c = searchConfig.value.findIndex(item => item.id === 'sampleClothingExceptionTypeList');
      if (c > -1) {
        searchConfig.value[c].options = PLM_SAMPLE_EXCEPTION_TYPE_OPTIONS.value;
      }
    }

    if (PLM_EXCEPTION_STEP_OPTIONS.value.length) {
      const c = searchConfig.value.findIndex(item => item.id === 'exceptionProcessStepList2');
      if (c > -1) {
        searchConfig.value[c].options = PLM_EXCEPTION_STEP_OPTIONS.value;
      }
    }
    if (responsibleDepartmentOptions.value.length) {
      const c = searchConfig.value.findIndex(item => item.id === 'departmentIdList');
      if (c) {
        searchConfig.value[c].options = responsibleDepartmentOptions.value;
      }
    }
  });

  return {
    searchConfig,
  };
};
