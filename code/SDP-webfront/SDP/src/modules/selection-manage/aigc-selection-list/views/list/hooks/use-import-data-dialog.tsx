import { ref, computed } from 'vue';
import { FormRules, ElForm, ElMessage } from 'element-plus';
import { cloneDeep } from 'lodash-es';
import { useDialog } from '@toy/business-components';
import { Close, Document } from '@element-plus/icons-vue';
import IconUpload from '@/assets/icon_upload.png';
import { pickingStyleImport } from '../../../api';
import { useImportResultDialog } from './use-import-result-dialog';

export type HandleOpenDialog = () => void;

export const useImportDataDialog = ({ handleSuccess }: { handleSuccess?: () => void; }) => {
  const { handleOpenDialog: handleOpenResultDialog } = useImportResultDialog();
  const baseFormData: { fileName: string; file: File | null; } = {
    fileName: '',
    file: null,
  };

  const formEl = ref<InstanceType<typeof ElForm>>();
  const setRef = (el: InstanceType<typeof ElForm>) => {
    formEl.value = el;
  };
  const rules = computed<FormRules>(() => {
    return {
      // fileName: [
      //   {
      //     required: true,
      //     message: '文件名称不能为空',
      //   },
      // ],
      file: [
        {
          required: true,
          message: ('请上传文件'),
        },
      ]
    };
  });
  const formData = ref(cloneDeep(baseFormData));

  const validatorFileType = (fileName: string) => {
    const fileTypes = ['.xlsx', '.xls'];
    return fileTypes.some(type => fileName.endsWith(type));
  };
  const validatorSize = (size: number) => {
    const max = 10;
    return size / 1024 / 1024 < max;
  };
  const handleFile = (files: FileList | null) => {
    if (!files?.length) return;
    const file = files[0];
    if (!validatorFileType(file.name)) {
      ElMessage.error(`${('格式限制')} .xlsx、.xls`);
      return;
    }
    if (!validatorSize(file.size)) {
      ElMessage.error(`${('大小限制')} 10M`);
      return;
    }
    formData.value.file = file;
  };
  const handleSelectFile = (e: Event) => {
    const { files } = e.target as HTMLInputElement;
    handleFile(files);
    (e.target as HTMLInputElement).value = '';
  };
  const handleDrop = async (e: DragEvent) => {
    e.preventDefault();
    if (!e.dataTransfer) return;
    const { files } = e.dataTransfer;
    handleFile(files);
  };

  const { openDialog, closeDialog } = useDialog(() => ({
    title: ('导入数据'),
    width: 600,
    class: 'clear-dialog-body-padding',
    confirmText: ('确定'),
    cancelText: ('取消'),
    onClose() {
      formEl.value?.resetFields();
    },
    async onConfirm() {
      await formEl.value?.validate();
      if (!formData.value.file) return;
      const data = new FormData();
      data.append('file', formData.value.file);
      const { data: res } = await pickingStyleImport(data);
      if (res?.failureDetails?.length) {
        handleOpenResultDialog(res);
        if (res.successCount === 0) {
          ElMessage.error(('导入失败'));
        } else {
          ElMessage.warning(('导入成功，部分导入失败'));
        }
      } else {
        ElMessage.success(('导入成功'));
      }
      handleSuccess && handleSuccess();
      closeDialog();
    },
    render() {
      return (
        <el-form rules={rules.value} model={formData.value} ref={setRef} label-width='100px' class='tw-m-20px'>
          {/* <el-form-item label='文件名称' prop='fileName'>
            <el-input v-model={formData.value.fileName} placeholder='请输入文件名称' maxlength={20} />
          </el-form-item> */}
          <el-form-item label='文件上传' prop='file'>
            <div>
              <div v-show={formData.value.file}>
                <div class='tw-cursor-pointer'>
                  <el-icon>
                    <Document class='tw-m-r-2' />
                  </el-icon>
                  {formData.value.file?.name}
                  <el-icon
                    onClick={() => {
                      formData.value.file = null;
                    }}
                    class='tw-m-l-2'
                  >
                    <Close />
                  </el-icon>
                </div>
              </div>
              <div
                v-show={!formData.value.file}
                onDrop={handleDrop}
                onDragover={(e: DragEvent) => e.preventDefault()}
                onDragenter={(e: DragEvent) => e.preventDefault()}
                onDragend={(e: DragEvent) => e.preventDefault()}
                class={[
                  'tw-flex',
                  'tw-flex-col',
                  'tw-justify-center',
                  'tw-items-center',
                  'tw-w-320px',
                  'tw-h-214px',
                  'tw-border-2',
                  'tw-border-dashed',
                  'tw-border-#F2F4FA',
                  'tw-p-10',
                  'tw-rounded-lg',
                  'tw-text-center',
                ]}
              >
                <img
                  src={IconUpload}
                  alt=''
                  class='icon tw-w-50px tw-h-50px'
                />
                <div class='tw-flex tw-text-#606166 tw-font-bold tw-flex-nowrap'>
                  <span class='tw-text-nowrap tw-m-r-6px'>将文件拖到此处或</span>
                  <label for='file-unload' class='tw-color-primary tw-cursor-pointer'>点击上传</label>
                  <input id='file-unload' type='file' accept='.xlsx, .xls' onInput={handleSelectFile} hidden />
                </div>
                <span class='tw-text-#909299 tw-text-12px'>严禁上传包含色情、暴力、反动等相关违法信息的文件。</span>
              </div>
              <div>
                <a
                  href='/static/外部数据导入模板.xlsx'
                  download='外部数据导入模板.xlsx'
                >
                  模板下载
                </a>
              </div>
            </div>
          </el-form-item>
        </el-form>
      );
    },
  }));
  const handleOpenDialog: HandleOpenDialog = () => {
    openDialog();
  };
  return {
    handleOpenDialog,
  };
};
