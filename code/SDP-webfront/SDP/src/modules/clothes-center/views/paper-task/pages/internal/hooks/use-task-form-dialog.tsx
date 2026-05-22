import { useDialog } from '@toy/business-components';
import { FormRules, FormInstance } from 'element-plus';
import { ref } from 'vue';
import { IPatternClothesQueryByPageResListItem } from '../../../api/types';
import { patternClothesChangeMaker } from '../../../api';
import { patternClothesMakerRoom } from '@/modules/clothes-center/api';
import { IPatternClothesMakerRoomResListItem } from '@/modules/clothes-center/api/types';
import { useResetRef } from '@toy/v-use';
import { useAccountStore } from '@/store/account';

export const useTaskTransferFormDialog = (props: {
  reloadFn: () => void;
  nextFn?: () => void;
}) => {
  const { reloadFn, nextFn } = props;
  const accountStore = useAccountStore();
  const { account } = accountStore;

  const dialogType = ref<'1' | '2'>('1'); // 1转交，2处理人
  const formElRef = ref<FormInstance>();
  const setFormElRef = (el: FormInstance) => {
    formElRef.value = el;
  };
  const [formData, reset] = useResetRef({
    patternMakerId: '',
    patternMakerName: '',
    patternIds: [] as string[],
  });

  const rules:FormRules = {
    patternMakerId: {
      required: true,
      message: '请选择',
      trigger: 'change',
    },
  };
  const options = ref<IPatternClothesMakerRoomResListItem[]>([]);
  const handleChange = (_val: string) => {
    const row = options.value.find(item => item.makerOrRoomId === _val);
    formData.value.patternMakerName = row?.makerOrRoomName || '';
  };
  const loading = ref(false);
  const getPatternClothesMakerRoom = async (keyword: string, isInit: boolean = false) => {
    if (keyword) {
      try {
        loading.value = true;
        const { data } = await patternClothesMakerRoom({
          pageNum: 1,
          pageSize: 1000,
          allocateState: '1',
          makerOrRoom: keyword
        });
        options.value = [...(data.list || [])];
        if (isInit && options.value.length >= 1) {
          // eslint-disable-next-line vue/max-len
          const obj = options.value.find(item => item.makerOrRoomId === account?.id && item.makerOrRoomName === account?.account?.name);
          if (obj) {
            formData.value.patternMakerId = obj.makerOrRoomId!;
            formData.value.patternMakerName = obj.makerOrRoomName!;
          }
        }
        loading.value = false;
      } catch (error) {
        console.error(error);
        loading.value = false;
      }
    }
  };
  const { openDialog, closeDialog } = useDialog(() => ({
    title: dialogType.value === '1' ? '任务转交' : '维护处理人',
    width: 400,
    onClose() {
      options.value = [];
      loading.value = false;
      reset();
    },
    async onConfirm() {
      await formElRef.value?.validate();
      await patternClothesChangeMaker({
        patternMakerName: formData.value.patternMakerName,
        patternMakerId: formData.value.patternMakerId,
        patternIds: formData.value.patternIds,
      });
      closeDialog();
      reloadFn();
      if (dialogType.value === '2' && nextFn) {
        nextFn();
      }
    },
    render() {
      return (
        <el-form ref={setFormElRef} rules={rules} model={formData.value}>
          <el-form-item label='纸样师' prop='patternMakerId'>
            <el-select
              v-model={formData.value.patternMakerId}
              placeholder='请输入'
              clearable
              onChange={handleChange}
              filterable
              remote
              remote-method={(val: string) => getPatternClothesMakerRoom(val)}
              loading={loading.value}
              class='select-full'
            >
              {options.value?.map((item) => {
                return (
                  <el-option
                    key={item.makerOrRoomId}
                    label={item.makerOrRoomName}
                    value={item.makerOrRoomId}
                  />
                );
              })}
            </el-select>
          </el-form-item>
        </el-form>
      );
    },
  }));

  const handleDialog = (type: '1' | '2', selectedList: IPatternClothesQueryByPageResListItem[]) => {
    dialogType.value = type;
    formData.value.patternIds = selectedList.map(item => item.patternId!);
    openDialog();
    formElRef.value?.clearValidate();
    if (dialogType.value === '2') {
      // 查询当前用户是否符合处理人
      if (account?.id && account?.account?.name) {
        getPatternClothesMakerRoom(account?.account?.name, true);
      }
    }
  };

  return {
    handleDialog,
  };
};
