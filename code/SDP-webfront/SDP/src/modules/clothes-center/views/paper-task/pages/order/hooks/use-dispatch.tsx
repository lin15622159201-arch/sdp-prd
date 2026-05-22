import { useList } from '@/hooks/use-list';
import { useDialog } from '@toy/business-components';
import { debounce } from 'lodash-es';
import { ref, Ref, watch } from 'vue';
import { ElMessage, FormInstance } from 'element-plus';
import { useResetRef } from '@toy/v-use';
import { patternClothesMakerRoom } from '@/modules/clothes-center/api';
import { PAPER_ORDER_STATUS_ENMU } from '@/modules/clothes-center/constant';
import { patternClothesAllocate } from '../../../api';
import { IPatternClothesQueryByPageResListItem } from '@/modules/clothes-center/views/paper-task/api/types';
import { YES_NO_ENUM } from '@/constant';

interface IProps {
  reloadFn: () => void;
  selectedList: Ref<IPatternClothesQueryByPageResListItem[]>;
}
export const useDispatch = ({ reloadFn, selectedList }: IProps) => {
  const formEl = ref<FormInstance>();
  const setFormEl = (el: FormInstance) => {
    formEl.value = el;
  };
  const [formData, reset] = useResetRef({
    allocate: '1',
    patternMakerId: '',
    patternMakerName: '',
    roomId: '',
    roomName: '',
    makerOrRoomId: '',
  });
  const keyword = ref('');
  const {
    params,
    tableTotal,
    tableData,
    tableLoading,
    handleSearch,
    handleSizeChange,
    handleCurrentChange,
  } = useList({
    request: {
      api: patternClothesMakerRoom,
      params: {
        allocateState: '1',
        sampleType: '',
        makerOrRoom: '',
        regionId: '',
        pageNum: 1,
        pageSize: 20,
      },
      handleParams(rest) {
        return rest;
      },
    },
  });
  const getDataList = () => {
    params.value.allocateState = formData.value.allocate;
    params.value.makerOrRoom = keyword.value || '';
    tableTotal.value = 0;
    handleSearch();
  };

  const fetData = debounce(() => {
    getDataList();
  }, 300);
  const handleInput = (val: string) => {
    if (tableLoading.value) return;
    keyword.value = val;
    fetData();
  };
  const handleChange = () => {
    keyword.value = '';
    tableData.value = [];
    formData.value.makerOrRoomId = '';
    getDataList();
  };
  watch(() => keyword.value, (val) => {
    if (!val) {
      formData.value.makerOrRoomId = '';
    }
  });
  const handleRadioChange = async (value: string | number | boolean) => {
    const isInside = formData.value.allocate === PAPER_ORDER_STATUS_ENMU.INSIDE;
    const find = tableData.value.find(item => item.makerOrRoomId === formData.value.makerOrRoomId);
    let resetKeys = {};
    keyword.value = find.makerOrRoomName;
    if (isInside) {
      resetKeys = {
        patternMakerId: value,
        patternMakerName: find?.makerOrRoomName || '',
        roomId: '',
        roomName: '',
      };
    } else {
      resetKeys = {
        roomId: value,
        roomName: find?.makerOrRoomName || '',
        patternMakerId: '',
        patternMakerName: '',
      };
    }
    Object.assign(formData.value, resetKeys);
  };
  const { openDialog, closeDialog } = useDialog(() => ({
    title: '纸样分单',
    onClose() {
      keyword.value = '';
      tableData.value = [];
      reset();
    },
    onConfirm: async () => {
      if (!formData.value.makerOrRoomId && formData.value.allocate === '2') {
        ElMessage.warning('请选择外版房');
        return;
      }
      await patternClothesAllocate({
        roomId: formData.value.allocate === '1' ? '1' : formData.value.roomId,
        roomName: formData.value.allocate === '1' ? '内部' : formData.value.roomName,
        patternMakerId: formData.value.patternMakerId,
        patternMakerName: formData.value.patternMakerName,
        patternIds: selectedList.value.map(item => item.patternId),
      });
      ElMessage.success('分单成功');
      reloadFn();
      closeDialog();
    },
    render() {
      return (
        <el-form model={formData.value} ref={setFormEl} label-width='80px' label-position='left'>
          <el-form-item label='纸样分单'>
            <el-radio-group v-model={formData.value.allocate} onChange={handleChange}>
              <el-radio value='1'>内部处理</el-radio>
              <el-radio value='2'>外部处理</el-radio>
            </el-radio-group>
          </el-form-item>
          {formData.value.allocate === '1' && (
            <el-form-item
              prop='editionReviewerName'
              label='纸样师'
              rules={[{ required: false, message: '请选择纸样师', trigger: 'change' }]}
            >
              <el-input
                placeholder='输入名称进行搜索'
                class='tw-w-150px tw-mb-10px'
                onInput={handleInput}
                model-value={keyword.value}
              />
            </el-form-item>
          )}
          {formData.value.allocate === '2' && (
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
            <el-radio-group
              class='tw-flex tw-flex-wrap tw-w-100% tw-gap-10px'
              v-model={formData.value.makerOrRoomId}
              onChange={handleRadioChange}
            >
              {tableData.value.map(v => (
                <el-radio class='tw-w-48% tw-m-0' value={v.makerOrRoomId}>
                  { v.makerOrRoomName }
                  {' '}
                  -
                  { v.orderCount }
                </el-radio>
              ))}
              {tableData.value.length === 0 && (
                <empty class='tw-m-auto tw-min-h-200px' />
              )}
            </el-radio-group>
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
    openDialog();
    getDataList();
  };
  return {
    handleDispatch
  };
};
