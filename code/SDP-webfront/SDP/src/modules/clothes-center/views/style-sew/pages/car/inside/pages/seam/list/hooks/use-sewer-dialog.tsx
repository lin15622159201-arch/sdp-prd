import { useDialog } from '@toy/business-components';
import { ref, Ref } from 'vue';
import { ElForm, ElMessage } from 'element-plus';
import { useResetRef } from '@toy/v-use';
import UserSelect from '@/components/user-select';
import { sewAssignSewer, sewChgSewer } from '../../api';
import { ISewQueryByPageResListItem } from '@/modules/clothes-center/views/style-sew/api/types';

interface IProps {
  reloadFn: () => void;
  selectedList: Ref<ISewQueryByPageResListItem[]>;
}
export const useSewerDialog = ({ reloadFn, selectedList }: IProps) => {
  const formEl = ref<InstanceType<typeof ElForm>>();
  const dialogType = ref<'1' | '2'>('1'); // 1开始车缝，2排单变更
  const setFormEl = (el: any) => {
    formEl.value = el;
  };
  const [formData, reset] = useResetRef({
    userId: '',
    userName: '',
  });

  const { openDialog, closeDialog } = useDialog(() => ({
    title: dialogType.value === '1' ? '开始车缝' : '排单变更',
    onClose() {
      reset();
    },
    onConfirm: async () => {
      const params: any = {
        ...formData.value,
        sewId: selectedList.value.map(item => item.sewId),
      };
      if (dialogType.value === '1') {
        await sewAssignSewer(params);
      }
      if (dialogType.value === '2') {
        await sewChgSewer(params);
      }
      ElMessage.success('操作成功');
      reloadFn();
      closeDialog();
    },
    render() {
      return (
        <el-form model={formData.value} ref={setFormEl} label-width='80px' label-position='left'>
          <el-form-item label='车缝师' prop='userId'>
            <UserSelect
              v-model={formData.value.userId}
              clearable
              onChange={(val: string, opt: any) => {
                formData.value.userName = opt?.name || '';
              }}
            />
          </el-form-item>
        </el-form>
      );
    },
  }));
  const handleOpen = (type: '1' | '2') => {
    dialogType.value = type;
    openDialog();
  };
  return {
    handleOpen
  };
};
