import { useList } from '@/hooks/use-list';
import { useDialog } from '@toy/business-components';
import { debounce } from 'lodash-es';
import { ref, Ref, watch } from 'vue';
import { ElMessage, FormInstance } from 'element-plus';
import { useResetRef } from '@toy/v-use';
import { dimensionDesignerRoom, dimensionAssign } from '../../../api';
import { IDimensionPageResListItem } from '@/modules/clothes-center/views/sample-task/api/types';
import { YES_NO_ENUM } from '@/constant';

interface IProps {
  reloadFn: () => void;
  selectedList: Ref<IDimensionPageResListItem[]>;
}
export const useDispatch = ({ reloadFn, selectedList }: IProps) => {
  const formEl = ref<FormInstance>();
  const setFormEl = (el: FormInstance) => {
    formEl.value = el;
  };
  const [formData, reset] = useResetRef({
    allocate: '0',
    dimensionDesignerName: '',
    dimensionDesignerId: '',
    roomId: '',
    roomName: '',
    designerOrRoomId: '',
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
      api: dimensionDesignerRoom,
      params: {
        allocateState: '',
        sampleType: '1',
        designerOrRoom: '',
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
    params.value.designerOrRoom = keyword.value || '';
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
    formData.value.designerOrRoomId = '';
    getDataList();
  };
  const handleRadioChange = async () => {
    const find = tableData.value.find(item => item.designerOrRoomId === formData.value.designerOrRoomId);
    if (find) {
      keyword.value = find.designerOrRoomName;
      if (formData.value.allocate === '0') {
        formData.value.dimensionDesignerName = find.designerOrRoomName;
      }
      if (formData.value.allocate === '1') {
        formData.value.roomName = find.designerOrRoomName;
      }
    }
  };
  watch(() => keyword.value, (val) => {
    if (!val) {
      formData.value.designerOrRoomId = '';
    }
  });
  const { openDialog, closeDialog } = useDialog(() => ({
    title: '3D分单',
    onClose() {
      keyword.value = '';
      tableData.value = [];
      reset();
    },
    onConfirm: async () => {
      if (!formData.value.designerOrRoomId && formData.value.allocate === '1') {
        ElMessage.warning('请选择外版房');
        return;
      }
      if (formData.value.allocate === '0') {
        formData.value.roomId = '1'; // 默认值
        formData.value.roomName = '内部'; // 默认值
        formData.value.dimensionDesignerId = formData.value.designerOrRoomId;
      }
      if (formData.value.allocate === '1') {
        formData.value.roomId = formData.value.designerOrRoomId;
        formData.value.dimensionDesignerId = '';
        formData.value.dimensionDesignerName = '';
      }
      await dimensionAssign({
        roomId: formData.value.roomId,
        roomName: formData.value.roomName,
        dimensionDesignerId: formData.value.dimensionDesignerId, // 内部必须
        dimensionDesignerName: formData.value.dimensionDesignerName, // 内部必须
        processInfoList: selectedList.value.map(item => ({
          dimensionId: item.dimensionId!,
          clothesId: item.clothesId
        })),
      });
      ElMessage.success('分单成功');
      reloadFn();
      closeDialog();
    },
    render() {
      return (
        <el-form model={formData.value} ref={setFormEl} label-width='80px' label-position='left'>
          <el-form-item label='3D分单'>
            <el-radio-group v-model={formData.value.allocate} onChange={handleChange}>
              <el-radio value='0'>内部处理</el-radio>
              <el-radio value='1'>外部处理</el-radio>
            </el-radio-group>
          </el-form-item>
          {formData.value.allocate === '0' && (
            <el-form-item
              prop='editionReviewerName'
              label='3D版师'
              rules={[{ required: false, message: '请选择3D版师', trigger: 'change' }]}
            >
              <el-input
                placeholder='输入名称进行搜索'
                class='tw-w-150px tw-mb-10px'
                onInput={handleInput}
                model-value={keyword.value}
              />
            </el-form-item>
          )}
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
            <el-radio-group
              class='tw-flex tw-flex-wrap tw-w-100% tw-gap-10px'
              v-model={formData.value.designerOrRoomId}
              onChange={handleRadioChange}
            >
              {tableData.value.map(v => (
                <el-radio class='tw-w-48% tw-m-0' value={v.designerOrRoomId}>
                  { v.designerOrRoomName }
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
