import { useDialog } from '@toy/business-components';
import { useResetRef } from '@toy/v-use';
import { ElForm, ElMessage, FormRules } from 'element-plus';
import { computed, nextTick, ref } from 'vue';
import { IDispatchTaskReq } from '../../../api/types';
import { ALLOCATE_TYPE_ENUM } from '../../../constant';
import { dispatchTask, reDispatchTask } from '../../../api';
import { designerUserList } from '@/api/basis';
import { IListItem } from '../types';
import { useDictionary } from '@/hooks/use-dictionary';
import { CUSTOM_DICTIONARY_KEY, DICTIONARY_KEY } from '@/constant/dictionary';
import { IDictionaryItem } from '@/hooks/use-dictionary/types';

interface IProps {
  reloadFn: () => void;
}

export const useDispatch = (props: IProps) => {
  const { reloadFn } = props;
  const { getDictionaryOptions } = useDictionary();
  const NATIONAL_OPTIONS = computed(() => {
    return getDictionaryOptions(DICTIONARY_KEY.NATIONAL) || [];
  });
  const PLM_CLOTHING_STYLE = computed(() => {
    return getDictionaryOptions(DICTIONARY_KEY.PLM_CLOTHING_STYLE) || [];
  });
  const JV_SCENE = computed(() => {
    return getDictionaryOptions(DICTIONARY_KEY.JV_SCENE) || [];
  });

  /** 货盘类型 */
  const TRAY_TYPE = computed(() => getDictionaryOptions(DICTIONARY_KEY.TRAY_TYPE));
  /** 波段 */
  const WAVE_BAND_CODE_LIST = computed(() => getDictionaryOptions(DICTIONARY_KEY.PLM_CLOTHING_BAND));
  const SHOP_LIST = computed(() => {
    return getDictionaryOptions(CUSTOM_DICTIONARY_KEY.SHOP_LIST) || [];
  });
  const [formData, reset] = useResetRef<Omit<IDispatchTaskReq, 'copyStyleInfo'> & {
    /** 是否仿款 */
    isImitation: boolean;
    /** 类型 */
    allocateType: ALLOCATE_TYPE_ENUM;
    copyStyleInfo: Omit<IDispatchTaskReq['copyStyleInfo'], 'suggestedStyleCode'> & {
      suggestedStyleCode: string[];
    };
  }>({
    designDemandIdList: [],
    allocateType: ALLOCATE_TYPE_ENUM.DISPATCH,
    designerId: '',
    isImitation: false,
    copyStyleInfo: {
      countrySiteCode: '',
      countrySiteName: '',
      storeId: '',
      storeName: '',
      suggestedStyle: '',
      suggestedStyleCode: [],
      sceneName: '',
      sceneCode: '',
      waveBandCode: '',
      waveBandName: '',
      palletTypeName: '',
      palletTypeCode: ''
    },
  });
  const formEl = ref<InstanceType<typeof ElForm>>();
  const rules = computed<FormRules>(() => ({
    'copyStyleInfo.countrySiteCode': {
      required: true,
      message: '请选择国家',
    },
    'copyStyleInfo.storeId': {
      required: true,
      message: '请选择店铺',
    },
    'copyStyleInfo.suggestedStyleCode': {
      required: true,
      message: '请选择风格',
    },
    'copyStyleInfo.sceneCode': {
      required: true,
      message: '请选择场景',
    },
    'copyStyleInfo.palletTypeCode': {
      required: true,
      message: '请选择货盘类型',
    },
    'copyStyleInfo.waveBandCode': {
      required: true,
      message: '请选择波段',
    },
    designerId: {
      required: !(formData.value.allocateType === ALLOCATE_TYPE_ENUM.DISPATCH && formData.value.isImitation),
      message: '请选择设计师',
    },
  }));
  const setFormEl = (el: any) => {
    formEl.value = el;
  };
  const find = (list: string[], arr: IDictionaryItem[], names: string[]) => {
    const [val, ...rest] = list;
    const row = arr.find(v => v.value === val);
    if (row) {
      names.push(row.label);
      if (rest.length && row.children?.length) {
        find(rest, row.children, names);
      }
    }
    return arr;
  };
  const { openDialog, closeDialog } = useDialog(() => ({
    title: '灵感任务分配',
    width: 550,
    onClose() {
      reset();
    },
    async onConfirm() {
      await formEl.value?.validate();
      const { copyStyleInfo, allocateType, ...rest } = formData.value;
      if (allocateType === ALLOCATE_TYPE_ENUM.DISPATCH_ALTER) {
        await reDispatchTask({
          ...rest
        });
      } else {
        const clothingStyleName: string[] = [];
        find(copyStyleInfo.suggestedStyleCode, PLM_CLOTHING_STYLE.value, clothingStyleName);
        await dispatchTask({
          ...rest,
          copyStyleInfo: {
            ...copyStyleInfo,
            suggestedStyle: clothingStyleName.at(-1)!,
            suggestedStyleCode: copyStyleInfo.suggestedStyleCode.at(-1)!,
          },
        });
      }
      ElMessage.success('操作成功');
      reloadFn();
      closeDialog();
    },
    render() {
      return (
        <el-form
          ref={setFormEl}
          model={formData.value}
          rules={rules.value}
          label-width={70}
        >
          {formData.value.isImitation && formData.value.allocateType === ALLOCATE_TYPE_ENUM.DISPATCH && (
            <div>
              <detail-title title='完善信息' />
              <el-row>
                <el-col span={12}>
                  <el-form-item label='国家' prop='copyStyleInfo.countrySiteCode'>
                    <el-select
                      v-model={formData.value.copyStyleInfo.countrySiteCode}
                      filterable
                      onChange={(val: string) => {
                        const row = NATIONAL_OPTIONS.value.find(item => item.value === val);
                        formData.value.copyStyleInfo.countrySiteName = row?.label || '';
                      }}
                    >
                      {NATIONAL_OPTIONS.value.map(v => (
                        <el-option
                          key={v.value}
                          value={v.value}
                          label={v.label}
                        />
                      ))}
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col span={12}>
                  <el-form-item label='店铺' prop='copyStyleInfo.storeId'>
                    <el-select
                      v-model={formData.value.copyStyleInfo.storeId}
                      filterable
                      onChange={(val: string) => {
                        const row = SHOP_LIST.value.find(item => item.value === val);
                        formData.value.copyStyleInfo.storeName = row?.label || '';
                      }}
                    >
                      {SHOP_LIST.value.map(v => (
                        <el-option
                          key={v.value}
                          value={v.value}
                          label={v.label}
                        />
                      ))}
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col span={12}>
                  <el-form-item label='风格' prop='copyStyleInfo.suggestedStyleCode'>
                    <el-cascader
                      v-model={formData.value.copyStyleInfo.suggestedStyleCode}
                      options={PLM_CLOTHING_STYLE.value}
                      collapse-tags
                      show-all-levels
                      class='tw-w-100%'
                    />
                  </el-form-item>
                </el-col>
                <el-col span={12}>
                  <el-form-item label='场景' prop='copyStyleInfo.sceneCode'>
                    <el-select
                      v-model={formData.value.copyStyleInfo.sceneCode}
                      filterable
                      onChange={(val: string) => {
                        const row = JV_SCENE.value.find(item => item.value === val);
                        formData.value.copyStyleInfo.sceneName = row?.label || '';
                      }}
                    >
                      {JV_SCENE.value.map(v => (
                        <el-option
                          key={v.value}
                          value={v.value}
                          label={v.label}
                        />
                      ))}
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col span={12}>
                  <el-form-item label='货盘类型' prop='copyStyleInfo.palletTypeCode'>
                    <el-select
                      v-model={formData.value.copyStyleInfo.palletTypeCode}
                      filterable
                      onChange={(val: string) => {
                        const row = TRAY_TYPE.value.find(item => item.value === val);
                        formData.value.copyStyleInfo.palletTypeName = row?.label || '';
                      }}
                    >
                      {TRAY_TYPE.value.map(v => (
                        <el-option
                          key={v.value}
                          value={v.value}
                          label={v.label}
                        />
                      ))}
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col span={12}>
                  <el-form-item label='波段' prop='copyStyleInfo.waveBandCode'>
                    <el-select
                      v-model={formData.value.copyStyleInfo.waveBandCode}
                      filterable
                      onChange={(val: string) => {
                        const row = WAVE_BAND_CODE_LIST.value.find(item => item.value === val);
                        formData.value.copyStyleInfo.waveBandName = row?.label || '';
                      }}
                    >
                      {WAVE_BAND_CODE_LIST.value.map(v => (
                        <el-option
                          key={v.value}
                          value={v.value}
                          label={v.label}
                        />
                      ))}
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>
            </div>
          )}
          <div>
            <detail-title title='分配人员' />
            <el-row>
              <el-col span={12}>
                <el-form-item label='设计师' prop='designerId'>
                  <query-select
                    v-model={formData.value.designerId}
                    placeholder='请选择'
                    method={designerUserList}
                    config={{
                      labelKey: 'designerName',
                      valueKey: 'designerId',
                      keywordQueryKey: 'designerName',
                      valueQueryKey: 'designerName',
                      dataKey: 'data',
                      pageSize: 100,
                      pageNum: 1,
                    }}
                  />
                </el-form-item>
              </el-col>
            </el-row>
            <div class='tw-text-12px tw-color-gray tw-pl-70px'>
              提示：设计师不指定时，仿款将默认分配给灵感任务的提交人。
            </div>
          </div>
        </el-form>
      );
    },
  }));
  const handleDispatch = async (type: ALLOCATE_TYPE_ENUM, list: IListItem[]) => {
    // const types = new Set(list.map(v => v.supplyModeCode));
    // if (types.size > 1 && types.has('imitation')) {
    //   ElMessage.warning('请勿同时勾选仿款和其他供给方式的数据');
    //   return;
    // }
    // formData.value.isImitation = types.has('imitation');
    // formData.value.designDemandIdList = list.map(v => v.designDemandId);
    // formData.value.allocateType = type;
    // openDialog();
    // setTimeout(() => {
    //   formEl.value?.clearValidate();
    // });
  };
  return {
    handleDispatch
  };
};
