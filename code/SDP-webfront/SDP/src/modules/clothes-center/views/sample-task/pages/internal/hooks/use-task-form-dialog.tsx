import { useDialog } from '@toy/business-components';
import { FormRules, FormInstance } from 'element-plus';
import { ref } from 'vue';
import { dimensionTaskTransfer } from '../../../api';
import { IDimensionPageResListItem } from '../../../api/types';
import { useResetRef } from '@toy/v-use';
import { useAccountStore } from '@/store/account';
import { patternClothesMakerRoom } from '@/modules/clothes-center/api';
import { IPatternClothesMakerRoomResListItem } from '@/modules/clothes-center/api/types';

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
    dimensionDesignerId: '',
    dimensionDesignerName: '',
    list: [] as IDimensionPageResListItem[],
  });
  const rules:FormRules = {
    dimensionDesignerId: {
      required: true,
      message: '请选择',
      trigger: 'change',
    },
  };
  const loading = ref(false);
  const options = ref<IPatternClothesMakerRoomResListItem[]>([]);
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
            formData.value.dimensionDesignerId = obj.makerOrRoomId!;
            formData.value.dimensionDesignerName = obj.makerOrRoomName!;
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
      await dimensionTaskTransfer({
        dimensionDesignerName: formData.value.dimensionDesignerName || '',
        dimensionDesignerId: formData.value.dimensionDesignerId || '',
        list: (formData.value.list || []).map(item => ({
          clothesId: item.clothesId!,
          dimensionId: item.dimensionId!,
        }))
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
          <el-form-item label='3D版师' prop='dimensionDesignerId'>
            <el-select
              v-model={formData.value.dimensionDesignerId}
              placeholder='请输入'
              clearable
              filterable
              remote
              remote-method={(val: string) => getPatternClothesMakerRoom(val)}
              loading={loading.value}
              class='select-full'
              onChange={(val: string) => {
                const opt = options.value.find(item => item.makerOrRoomId === val);
                formData.value.dimensionDesignerName = opt?.makerOrRoomName || '';
              }}
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

  const handleDialog = (type: '1' | '2', list: IDimensionPageResListItem[]) => {
    dialogType.value = type;
    formData.value.list = list;
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
