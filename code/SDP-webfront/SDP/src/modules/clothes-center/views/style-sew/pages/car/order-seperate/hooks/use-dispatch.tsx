import { useList } from '@/hooks/use-list';
import { useDialog } from '@toy/business-components';
import { debounce } from 'lodash-es';
import { ref, Ref, watch } from 'vue';
import { ElForm, ElMessage } from 'element-plus';
import { useResetRef } from '@toy/v-use';
import { sewAllocate, sewMakerRoom } from '@/modules/clothes-center/views/style-sew/api';
import { ISewQueryByPageResListItem } from '@/modules/clothes-center/views/style-sew/api/types';
import { YES_NO_ENUM } from '@/constant';

interface IProps {
  reloadFn: () => void;
  selectedList: Ref<ISewQueryByPageResListItem[]>;
}
export const useDispatch = ({ reloadFn, selectedList }: IProps) => {
  const formEl = ref<InstanceType<typeof ElForm>>();
  const setFormEl = (el: any) => {
    formEl.value = el;
  };
  const [formData, reset] = useResetRef({
    allocate: '0',
    editionReviewerName: '',
    roomName: '',
    roomId: '',
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
  } = useList<any, any>({
    request: {
      api: sewMakerRoom,
      params: {
        roomName: '',
        pageNum: 1,
        pageSize: 20,
      },
      handleParams(rest) {
        if (formData.value.allocate === '0') {
          rest.pageSize = 10000;
        }
        return rest;
      },
    },
  });
  const getDataList = () => {
    params.value.roomName = keyword.value;
    handleSearch();
  };
  const fetData = debounce(() => {
    getDataList();
  }, 300);
  const handleInput = (val: string) => {
    if (tableLoading.value) return;
    keyword.value = val;
    params.value.roomName = val;
    fetData();
  };
  const handleChange = () => {
    keyword.value = '';
    tableData.value = [];
    if (formData.value.allocate === '0') {
      keyword.value = '内部';
    }
    getDataList();
  };
  const handleRadioChange = async () => {
    const find = tableData.value.find(item => item.roomId === formData.value.roomId);
    if (find) {
      keyword.value = find.roomName;
      if (formData.value.allocate === '0') {
        formData.value.roomName = '';
      }
      if (formData.value.allocate === '1') {
        formData.value.roomName = find.roomName;
      }
    }
  };
  watch(() => keyword.value, (val) => {
    if (!val) {
      formData.value.roomId = '';
    }
  });
  const { openDialog, closeDialog } = useDialog(() => ({
    title: '车版分单',
    onClose() {
      keyword.value = '';
      tableData.value = [];
      reset();
    },
    onConfirm: async () => {
      if (!formData.value.roomId && formData.value.allocate === '1') {
        ElMessage.warning('请选择外版房');
        return;
      }
      await sewAllocate({
        isOutsourced: formData.value.allocate,
        roomId: formData.value.allocate === '0' ? '1' : formData.value.roomId,
        roomName: formData.value.allocate === '0' ? '内部' : formData.value.roomName,
        sewId: selectedList.value.map(item => item.sewId!),
      });
      ElMessage.success('分单成功');
      reloadFn();
      closeDialog();
    },
    render() {
      return (
        <el-form model={formData.value} ref={setFormEl} label-width='80px' label-position='left'>
          <el-form-item label='车版分单'>
            <el-radio-group v-model={formData.value.allocate} onChange={handleChange}>
              <el-radio value='0'>内部处理</el-radio>
              <el-radio value='1'>外部处理</el-radio>
            </el-radio-group>
          </el-form-item>
          {formData.value.allocate === '1' && (
            <el-form-item
              prop='roomName'
              label='外版房'
              rules={[{ required: false, message: '请选择外版房', trigger: 'change' }]}
            >
              <el-input
                placeholder='输入名称进行搜索'
                class='tw-w-150px tw-mb-10px'
                onInput={handleInput}
                model-value={keyword.value}
              />
            </el-form-item>
          )}
          <div
            class='tw-border-1px tw-border-color-[var(--el-border-color)] tw-border-solid tw-p-10px tw-rounded-4px'
            v-loading={tableLoading.value}
          >
            {formData.value.allocate === '0' && (
              <div class='tw-flex tw-flex-wrap'>
                {tableData.value.map(v => (
                  <div class='tw-w-48% tw-my[10px]'>
                    { v.roomName }
                    {' '}
                    -
                    { v.orderCount }
                  </div>
                ))}
              </div>
            )}
            {formData.value.allocate === '1' && (
              <el-radio-group
                class='tw-flex tw-flex-wrap tw-w-100% tw-gap-10px'
                v-model={formData.value.roomId}
                onChange={handleRadioChange}
              >
                {tableData.value.map(v => (
                  <el-radio class='tw-w-48% tw-m-0' value={v.roomId}>
                    { v.roomName }
                    {' '}
                    -
                    { v.orderCount }
                  </el-radio>
                ))}
              </el-radio-group>
            )}
            {tableData.value.length === 0 && (
              <empty class='tw-m-auto tw-min-h-200px' />
            )}
            <el-row
              class='tw-w-100% tw-pt-10px'
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
        </el-form>
      );
    },
  }));
  const handleDispatch = () => {
    const flag = selectedList.value.some(it => it.isAbnormal === YES_NO_ENUM.YES);
    if (flag) {
      ElMessage.error('存在未处理异常的任务');
      return;
    }

    keyword.value = '内部';
    formData.value.roomName = '';
    formData.value.roomId = '';
    openDialog();
    getDataList();
  };
  return {
    handleDispatch
  };
};
