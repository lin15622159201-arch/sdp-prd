import { useDialog } from '@toy/business-components';
import { computed, ref, nextTick, onMounted } from 'vue';
import { designerListApi, pushPlm } from '../../../api/index';
// import BatchUploader from '../../../component/batch-uploader.vue';
import { ElMessage, ElForm } from 'element-plus';
// import { IFile } from '@/components/uploader/packages/types';

export const usePulsPlmDialog = (onSuccess: () => void) => {
  const styleList = ref<any[]>([]);
  const formRef = ref<InstanceType<typeof ElForm> | null>();
  const form = ref({
    designers: '',
  });
  interface ListItem {
    value: string;
    label: string;
  }
  const loading = ref(false);
  const options = ref<ListItem[]>([]);
  const initData = async (designerName: string) => {
    loading.value = true;
    const { data } = await designerListApi({
      designerName,
    });
    loading.value = false;
    options.value = data.map((v) => {
      return {
        label: v.designerName,
        value: v.designerId
      } as ListItem;
    });
    const designerItem = data?.find(v => v.designerName === styleList.value[0].creatorName) ?? {};
    if (!form.value.designers && designerItem.designerId && designerItem.designerName) {
      form.value.designers = `${designerItem.designerId}-${designerItem.designerName}`;
    }
    nextTick(() => {
      formRef.value?.clearValidate();
    });
  };
  
  const handleReject = () => {
    form.value = {
      designers: '',
    };
    closeDialog();
    // openRejectReasonEditDialog(batchUploaderRef.value!.activeStyle);
  };
  const handleConfirm = async () => {
    await formRef.value?.validate();
    await pushPlm({
      designerId: form.value?.designers?.split?.('-')?.[0] ?? '',
      designerName: form.value.designers?.split?.('-')?.[1] ?? '',
      prototypeIds: styleList.value.map(v => v.prototypeId),
    });
    // auditedIndexMap.value[activeStyle.taskId] = true;
    ElMessage.success('推送成功');
    form.value = {
      designers: '',
    };
    closeDialog();
    onSuccess?.();
  };

  
  const remoteMethod = (query: string) => {
    initData(query);
    // if (query) {
    //   initData(query);
    // } else {
    //   options.value = [];
    //   loading.value = false;
    // }
  };
  const selectRef = ref<any>(null);
  const { openDialog, closeDialog } = useDialog(() => ({
    title: '推送PLM',
    width: 500,
    render() {
      return (
        <el-form
          ref={formRef}
          label-width='95px'
          model={form}
        >
          <el-form-item
            prop='designers'
            label='版房设计师'
            rules={[
              { required: true, message: '请选择版房设计师', trigger: 'change' },
            ]}
          >
            <el-select
              ref={selectRef}
              v-model={form.value.designers}
              clearable
              placeholder='请选择'
              filterable
              // remote
              // reserve-keywor={false}
              // remote-method={remoteMethod}
              // onBlur={() => { handleSelectBlur(); }}
            >
              {
                options.value.length && options.value.map((item) => {
                  return (
                    <el-option
                      label={item.label}
                      value={`${item.value}-${item.label}`}
                    />
                  );
                })
              }
            </el-select>
          </el-form-item>
        </el-form>
      );
    },
    renderFooter: () => {
      return (
        <>
          <el-button onClick={handleReject}>取消</el-button>
          <el-button type='primary' onClick={handleConfirm}>
            确定
          </el-button>
        </>
      );
    },
  }));

  const openAuditDialog = async (selectedList: any[]) => {
    styleList.value = selectedList;
    // const { data } = await designerListApi({
    //   designerName: selectedList[0].creatorName,
    // });
    // const designerItem = data?.find(v => v.designerName === selectedList[0].creatorName) ?? {};
    // form.value.designers = `${designerItem.designerId}-${designerItem.designerName}`;
    // formRef.value?.clearValidate();
    initData('');
    openDialog();
  };

  return { openAuditDialog };
};
