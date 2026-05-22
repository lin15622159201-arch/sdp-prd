import { useList } from '@/hooks/use-list';
import { checkCountSplitting, getMakeRooms } from '@/modules/style-data-manage/dosage-account/api';
import {
  ICheckCountSplittingReq,
  IGetMakeRoomsReq,
  IGetMakeRoomsRes
} from '@/modules/style-data-manage/dosage-account/api/types';
import { ALLOCATE_STATE_ENUM, ROOM_ALLOCATE_STATE } from '@/modules/style-data-manage/dosage-account/constant';
import { useDialog } from '@toy/business-components';
import { useResetRef } from '@toy/v-use';
import { ElForm, ElMessage, FormRules } from 'element-plus';
import { cloneDeep, debounce } from 'lodash-es';
import { ref } from 'vue';

enum HANDLE_TYPE_ENUM {
  /** 内部 */
  INNER,
  /** 外部 */
  OUTER
}

interface IProps {
  reloadFn: () => void;
}
interface IParams extends IGetMakeRoomsReq {
}
interface IFormData extends ICheckCountSplittingReq {
  handleType: HANDLE_TYPE_ENUM;
}

export const useDispatch = (props: IProps) => {
  const { reloadFn } = props;
  const formEl = ref<InstanceType<typeof ElForm>>();
  const setFormEl = (el: InstanceType<typeof ElForm>) => {
    formEl.value = el;
  };
  const rules: FormRules = {
    handleType: {
      required: true,
      message: '请选择',
    },
  };
  const [formData, resetFormData] = useResetRef<IFormData>({
    handleType: HANDLE_TYPE_ENUM.INNER,
    roomId: '',
    roomName: '',
    checkCountIds: [],
  });
  const fetData = debounce(() => {
    handleSearch();
  }, 300);
  const handleInput = (val: string) => {
    if (tableLoading.value) return;
    params.value.makerOrRoom = val;
    fetData();
  };
  const baseParams: IParams = {
    allocateState: ROOM_ALLOCATE_STATE.OUTER,
    pageNum: 1,
    pageSize: 20,
  };
  const {
    params,
    tableTotal,
    tableData,
    tableLoading,
    handleSearch,
    handleReset,
    handleSizeChange,
    handleCurrentChange,
  } = useList<IGetMakeRoomsRes['list'][0], IParams>({
    request: {
      api: getMakeRooms,
      params: cloneDeep(baseParams),
      handleParams(rest) {
        return rest;
      },
    },
  });
  const handleChangeRoom = (val: IGetMakeRoomsRes['list'][0]) => {
    formData.value.roomId = val.makerOrRoomId;
    formData.value.roomName = val.makerOrRoomName;
  };
  const { openDialog, closeDialog } = useDialog(() => ({
    title: '用量分单',
    onClose() {
      params.value = cloneDeep(baseParams);
      resetFormData();
    },
    async onConfirm() {
      await formEl.value?.validate();
      const { handleType, ...rest } = formData.value;
      if (handleType === HANDLE_TYPE_ENUM.OUTER && !formData.value.roomId) {
        ElMessage.error('请选择外版房');
        return;
      }
      await checkCountSplitting({
        ...rest,
        roomName: handleType === HANDLE_TYPE_ENUM.INNER
          ? '内部'
          : formData.value.roomName,
        roomId: handleType === HANDLE_TYPE_ENUM.INNER ? '1' : formData.value.roomId,
      });
      ElMessage.success('操作成功');
      closeDialog();
      reloadFn();
    },
    render() {
      return (
        <el-form
          ref={setFormEl}
          rules={rules}
          model={formData.value}
        >
          <el-form-item label='用量分单'>
            <el-radio-group
              v-model={formData.value.handleType}
              onChange={() => {
                formData.value.roomId = '';
                formData.value.roomName = '';
              }}
            >
              <el-radio value={HANDLE_TYPE_ENUM.INNER}>内部处理</el-radio>
              <el-radio value={HANDLE_TYPE_ENUM.OUTER}>外部处理</el-radio>
            </el-radio-group>
          </el-form-item>
          {formData.value.handleType === HANDLE_TYPE_ENUM.OUTER && (
            <>
              <div>
                <div class='tw-text-12px tw-pb-10px'>外版房</div>
                <el-input
                  placeholder='输入版房名称进行搜索'
                  class='tw-w-150px tw-mb-10px'
                  onInput={handleInput}
                  model-value={params.value.makerOrRoom}
                />
              </div>
              <div
                class='tw-border-1px tw-border-color-[var(--el-border-color)] tw-border-solid tw-p-10px tw-rounded-4px'
                v-loading={tableLoading.value}
              >
                <div
                  class='tw-flex tw-flex-wrap tw-w-100% tw-gap-10px'
                >
                  {tableData.value.map(v => (
                    <el-checkbox
                      class='tw-w-48% tw-m-0'
                      model-value={formData.value.roomId === v.makerOrRoomId}
                      onChange={() => handleChangeRoom(v)}
                    >
                      {v.makerOrRoomName}
                      ------------
                      {v.orderCount}
                    </el-checkbox>
                  ))}
                  {tableData.value.length === 0 && (
                    <empty class='tw-m-auto tw-min-h-200px' />
                  )}
                </div>
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
            </>
          )}
        </el-form>
      );
    },
  }));
  const handleDispatch = (ids: string[]) => {
    openDialog();
    handleSearch();
    formEl.value?.clearValidate();
    formData.value.checkCountIds = ids;
  };
  return {
    handleDispatch
  };
};
