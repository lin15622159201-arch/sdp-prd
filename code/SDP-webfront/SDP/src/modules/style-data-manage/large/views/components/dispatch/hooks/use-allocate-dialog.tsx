import { useDialog } from '@toy/business-components';
import { ref } from 'vue';
import { ElForm, ElMessage, ElInput } from 'element-plus';
import { useResetRef } from '@toy/v-use';
import { styleInfoMakerRoom, styleInfoSplitting } from '../../../../api';
import { IStyleInfoSplittingReq } from '../../../../api/types';
import { useList } from '@/hooks/use-list';
import { debounce } from 'lodash-es';

interface IProps {
  reloadFn: () => void;
}
export const useAllocateDialog = ({ reloadFn }: IProps) => {
  const formEl = ref<InstanceType<typeof ElForm>>();
  const allocate = ref('1');
  const setFormEl = (el: any) => {
    formEl.value = el;
  };
  const [formData, reset] = useResetRef<IStyleInfoSplittingReq>({
    styleInfoIds: [],
    roomId: '',
    roomName: '',
  });
  const keyword = ref('');
  const {
    params,
    tableTotal,
    tableData,
    tableLoading,
    handleSearch,
    handleReset,
    handleSizeChange,
    handleCurrentChange,
  } = useList({
    request: {
      api: styleInfoMakerRoom,
      params: {
        makerOrRoom: '',
        allocateState: '2',
        pageNum: 1,
        pageSize: 20,
      },
    },
  });

  const getList = () => {
    params.value.makerOrRoom = keyword.value;
    handleSearch();
  };
  const fetData = debounce(() => {
    getList();
  }, 300);
  const handleInput = (val: string) => {
    if (tableLoading.value) return;
    keyword.value = val;
    fetData();
  };
  const allocateChange = () => {
    keyword.value = '';
    if (allocate.value === '2' && !tableData.value.length) {
      getList();
    }
  };
  const handleRadioChange = async () => {
    const find = tableData.value.find(item => item.makerOrRoomId === formData.value.roomId);
    if (find) {
      keyword.value = find.makerOrRoomName;
      formData.value.roomName = find.makerOrRoomName;
    }
  };
  const { openDialog, closeDialog } = useDialog(() => ({
    title: '大货资料分单',
    width: 600,
    onClose() {
      allocate.value = '1';
      keyword.value = '';
      tableData.value = [];
      reset();
    },
    onConfirm: async () => {
      const roomId = allocate.value === '1' ? '1' : formData.value.roomId;
      if (!roomId) {
        ElMessage.error('请选择外版房');
        return;
      }
      const roomName = roomId === '1' ? '内部' : formData.value.roomName;
      await styleInfoSplitting({
        roomId,
        roomName,
        styleInfoIds: formData.value.styleInfoIds,
      });
      ElMessage.success('分单成功');
      reloadFn();
      closeDialog();
    },
    render() {
      return (
        <el-form model={formData.value} ref={setFormEl} label-width='120px' label-position='left'>
          <el-form-item label='大货资料分单'>
            <el-radio-group v-model={allocate.value} onchange={() => allocateChange()}>
              <el-radio value='1'>内部处理</el-radio>
              <el-radio value='2'>外部处理</el-radio>
            </el-radio-group>
          </el-form-item>
          {allocate.value === '2' && (
            <>
              <el-form-item
                prop='roomName'
                label='外版房'
                rules={[{ required: false, message: '请选择外版房', trigger: 'change' }]}
              >
                <el-input
                  placeholder='输入名称进行搜索'
                  onInput={handleInput}
                  model-value={keyword.value}
                />
              </el-form-item>
              <div
                class='tw-border-1px tw-border-color-[var(--el-border-color)] tw-border-solid tw-p-10px tw-rounded-4px'
                v-loading={tableLoading.value}
              >
                <el-radio-group
                  className='tw-flex tw-flex-wrap tw-w-100% tw-gap-10px tw-min-h-200px'
                  v-model={formData.value.roomId}
                  onChange={handleRadioChange}
                >
                  {tableData.value.map(v => (
                    <el-radio
                      value={v.makerOrRoomId}
                    >
                      { v.makerOrRoomName }
                      {' '}
                      -
                      { v.orderCount }
                    </el-radio>
                  ))}
                  {tableData.value.length === 0 && (
                    <empty className='tw-m-auto' />
                  )}
                </el-radio-group>
                <el-row
                  className='tw-w-100% tw-pt-10px'
                  type='flex'
                  justify='center'
                >
                  <pagination
                    total={tableTotal.value}
                    layout='total, prev, pager, next'
                    current-page={params.value.pageNum}
                    size={params.value.pageSize}
                    onCurrentChange={handleCurrentChange}
                    onSizeChange={handleSizeChange}
                  />
                </el-row>
              </div>
            </>
          )}
        </el-form>
      );
    },
  }));
  const handleOpenDialog = (selectedLst: string[]) => {
    formData.value.styleInfoIds = selectedLst;
    openDialog();
  };
  return {
    handleOpenDialog,
  };
};
