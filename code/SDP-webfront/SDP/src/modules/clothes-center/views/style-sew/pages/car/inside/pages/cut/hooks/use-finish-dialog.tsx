import { useDialog } from '@toy/business-components';
import { ref, Ref } from 'vue';
import { ElForm, ElMessage } from 'element-plus';
import { useResetRef } from '@toy/v-use';
import { sewAssignCutter } from '../api';
import { ISewQueryByPageResListItem } from '../../../../../../api/types';
import { useAccountStore } from '@/store/account';
import { fuzzyQueryUser as getUserListApi } from '@/api/user';
import { IUserQueryFindPageResListItem } from '@/api/user/index.d';

interface IProps {
  reloadFn: () => void;
  selectedList: Ref<ISewQueryByPageResListItem[]>;
}
export const useFinishDialog = ({ reloadFn, selectedList }: IProps) => {
  const accountStore = useAccountStore();
  const { account } = accountStore;

  const formEl = ref<InstanceType<typeof ElForm>>();
  const setFormEl = (el: any) => {
    formEl.value = el;
  };
  const [formData, reset] = useResetRef({
    userId: '',
    userName: '',
  });
  const loading = ref(false);
  const options = ref<IUserQueryFindPageResListItem[]>([]);
  const getPatternClothesMakerRoom = async (keyword: string, isInit: boolean = false) => {
    if (keyword) {
      try {
        loading.value = true;
        const { data } = await getUserListApi({
          keyword
        });
        options.value = [...(data.list || [])];
        if (isInit && options.value.length >= 1) {
        // eslint-disable-next-line vue/max-len
          const obj = options.value.find(item => item.id === account?.id && item.name === account?.account?.name);
          if (obj) {
            formData.value.userId = obj.id!;
            formData.value.userName = obj.name!;
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
    title: '裁剪完成',
    width: 400,
    onClose() {
      options.value = [];
      loading.value = false;
      reset();
    },
    onConfirm: async () => {
      await sewAssignCutter({
        ...formData.value,
        sewId: selectedList.value.map(item => item.sewId!),
      });
      ElMessage.success('操作成功');
      reloadFn();
      closeDialog();
    },
    render() {
      console.log(options.value);
      return (
        <el-form model={formData.value} ref={setFormEl} label-width='80px' label-position='left'>
          <el-form-item label='裁剪师' prop='userId'>
            <el-select
              v-model={formData.value.userId}
              placeholder='请输入'
              clearable
              filterable
              remote
              remote-method={(val: string) => getPatternClothesMakerRoom(val)}
              loading={loading.value}
              class='select-full'
              onChange={(val: string) => {
                const opt = options.value.find(item => item.id === val);
                formData.value.userName = opt?.name || '';
              }}
            >
              {options.value?.map((item) => {
                return (
                  <el-option
                    key={item.id}
                    label={`${item.name}(${item.code})`}
                    value={item.id}
                  />
                );
              })}
            </el-select>
          </el-form-item>
        </el-form>
      );
    },
  }));
  const handleOpen = () => {
    openDialog();
    // 查询当前用户是否符合处理人
    if (account?.id && account?.account?.name) {
      getPatternClothesMakerRoom(account?.account?.name, true);
    }
  };
  return {
    handleOpen
  };
};
