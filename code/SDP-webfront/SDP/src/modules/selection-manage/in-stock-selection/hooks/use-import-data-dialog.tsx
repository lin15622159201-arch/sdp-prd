import { useDialog } from '@toy/business-components';
import {
  ElForm, ElMessage, FormRules, genFileId, UploadInstance, UploadProps,
  UploadRawFile, UploadUserFile
} from 'element-plus';
import { computed, ref, unref } from 'vue';
import { cloneDeep } from 'lodash-es';
import { Upload } from '@element-plus/icons-vue';
import { IMPORT_TYPE_ENUM, IMPORT_TYPE_LIST } from '../constant';
import { importBatch, selectionImport } from '../api';
import { useImportResultDialog } from './use-import-result-dialog';
import { addUploaderTask } from '@/layouts/main/components/in-stock-selection-uploader';
import { filters } from '@/core/plugins/filter';

export type HandleOpenDialog = () => void;
export const useImportDataDialog = ({ handleSuccess }: { handleSuccess?: () => void; }) => {
  const { handleOpenDialog: useOpenImportResultDialog } = useImportResultDialog();

  const baseFormData: { importType: IMPORT_TYPE_ENUM | null; file:UploadUserFile[]; } = {
    importType: null,
    file: [] as UploadUserFile[],
  };

  const formEl = ref<InstanceType<typeof ElForm>>();
  const setRef = (el: InstanceType<typeof ElForm>) => {
    formEl.value = el;
  };
  const uploadEl = ref<UploadInstance>();
  const setUploadEl = (el: UploadInstance) => {
    uploadEl.value = el;
  };

  const formData = ref(cloneDeep(baseFormData));

  const rules = computed<FormRules>(() => {
    return {
      importType: [
        { required: true, message: ('请选择导入类型'), trigger: 'change' },
      ],
      file: [
        {
          required: true,
          message: ('请上传文件'),
          trigger: ['change', 'blur'],
        },
      ]
    };
  });

  const validatorFileType = (fileName: string) => {
    const fileTypes = ['.xls', '.xlsx'];
    return fileTypes.some(type => fileName.endsWith(type));
  };

  const validatorSize = (size: number) => {
    const max = 1000;
    return size / 1024 / 1024 < max;
  };
  const handleExceed: UploadProps['onExceed'] = (files) => {
    uploadEl.value!.clearFiles();
    const file = files[0] as UploadRawFile;
    file.uid = genFileId();
    uploadEl.value!.handleStart(file);
  };

  const handleFileChange: UploadProps['onChange'] = (file, fileList) => {
    const isValidType = validatorFileType(file.name);
    const isValidSize = validatorSize(file.size ? file.size : 0);

    if (!isValidType) {
      ElMessage.error('仅支持 .xls 或 .xlsx 文件');
      uploadEl.value!.clearFiles(); // 清除无效文件
      return;
    }

    formData.value.file = fileList; // 更新表单数据中的文件列表
  };

  const handleConfirm = async () => {
    // const { data: res } = await selectionImport(data, formData.value.importType as IMPORT_TYPE_ENUM);
    // useOpenImportResultDialog({
    //   ...res,
    //   importType: formData.value.importType,
    // });

    if (!formData.value.importType) {
      ElMessage.error('请选择导入类型');
      return;
    }
    console.log(unref(formData.value.file[0]));

    const { importType } = formData.value;
    addUploaderTask({
      file: unref(formData.value.file[0]).raw as File,
      title: filters.getEnumLabel(IMPORT_TYPE_LIST, importType),
      onSuccess: async (uploadResult) => {
        const { data: res } = await importBatch([{
          type: importType,
          ossUrl: uploadResult.url,
          fileSize: uploadResult.file.size,
          fileName: uploadResult.fileName,
        }]);
        handleSuccess && handleSuccess();

        return {
          id: res[0].batchId,
        };
      },
    });

    ElMessage.success('已添加到下载队列');
  };

  const { openDialog, closeDialog } = useDialog(() => ({
    title: ('导入选款数据'),
    width: 600,
    class: 'clear-dialog-body-padding',
    confirmText: ('确定'),
    cancelText: ('取消'),
    center: true,
    onClose() {
      formEl.value?.resetFields();
    },
    async onConfirm() {
      await formEl.value?.validate();

      if (!formData.value.importType) {
        ElMessage.error('请选择导入类型');
        return;
      }
      handleConfirm();
      closeDialog();
    },
    render() {
      return (
        <el-form rules={rules.value} model={formData.value} ref={setRef} label-width='100px' class='tw-m-20px'>
          <el-form-item label='导入类型' prop='importType'>
            <el-select
              v-model={formData.value.importType}
              placeholder='请选择导入类型'
              style='width: 100%;'
              clearable
            >
              {
                IMPORT_TYPE_LIST.map(item => (
                  <el-option label={item.label} value={item.value} />
                ))
              }
            </el-select>
          </el-form-item>
          <el-form-item label='文件上传' prop='file'>
            <el-upload
              ref={setUploadEl}
              class='tw-w-full'
              v-model:file-list={formData.value.file}
              action='none'
              accept='.xls,.xlsx'
              limit={1}
              auto-upload={false}
              onExceed={handleExceed}
              on-change={handleFileChange}
            >
              {{
                trigger: () => (
                  <>
                    <el-button icon={Upload}>上传文件</el-button>
                    <a
                      class='tw-ml-4'
                      href='/static/现货选款_导入模板.xlsx'
                      download='现货选款_导入模板.xlsx'
                      onClick={(e) => {
                        e.stopPropagation(); // 阻止事件冒泡
                      }}
                    >
                      模板下载
                    </a>
                  </>
                ),
                tip: () => (
                  <div>
                    <el-text type='info'>支持格式：.xls .xlsx </el-text>
                  </div>
                ),
              }}
            </el-upload>

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
