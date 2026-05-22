import { ref, computed, watch } from 'vue';
import { FormRules, ElForm, ElMessage } from 'element-plus';
import { cloneDeep } from 'lodash-es';
import { useDialog } from '@toy/business-components';
import { Close, Document } from '@element-plus/icons-vue';
import IconUpload from '@/assets/icon_upload.png';
import { inspirationImport, imageImport } from '@/modules/inspiration-center/inspiration-source/api';
import {
  IMPORT_TYPE_LIST,
  IMPORT_TYPE_ENUM,
} from '@/modules/inspiration-center/inspiration-source/constant';
import { useDictionary } from '@/hooks/use-dictionary2';
import { DICTIONARY_KEY } from '@/constant/dictionary';
import { IImportDataForm } from '../type';
import { IImageImportReq, IInspirationImages } from '../../../api/type';
import { useImportResultDialog } from './use-import-result-dialog';

export type HandleOpenDialog = () => void;

export interface IConfig {
  handleSuccess?: () => void;
}

export const useImportDataDialog = ({ handleSuccess }: IConfig) => {
  const { handleOpenDialog: handleOpenResultDialog } = useImportResultDialog();
  const { getEnableDictionaryOptions } = useDictionary();
  const baseFormData: IImportDataForm = {
    fileType: IMPORT_TYPE_ENUM.TEM,
    fileName: '',
    file: null,
    supplyMode: '',
    waves: '',
    plan: '',
    country: '',
    imgFile: [],
    inspirationImageSourceCode: '',
    inspirationBrandCode: '',
    styleSourceCode: '',
    styleSourceName: '',
  };

  const formEl = ref<InstanceType<typeof ElForm>>();
  const setRef = (el: InstanceType<typeof ElForm>) => {
    formEl.value = el;
  };
  const rules = computed<FormRules>(() => {
    return {
      file: [{ required: true, message: '请上传文件' }],
      // supplyMode: [{ required: true, message: '供给方式不能为空' }],
      // waves: [{ required: true, message: '波次不能为空' }],
      // plan: [{ required: true, message: '企划来源不能为空' }],
      // country: [{ required: true, message: '国家站点不能为空' }],
      imgFile: [{ required: true, message: '请上传图片' }],
    };
  });
  const formData = ref(cloneDeep(baseFormData));
  const supplyOptions = computed(() => getEnableDictionaryOptions(DICTIONARY_KEY.SUPPLY_MODE));
  const styleSourceOptions = computed(() => getEnableDictionaryOptions(DICTIONARY_KEY.STYLE_SOURCE));
  const styleSourceChange = (v: string) => {
    formData.value.styleSourceName = styleSourceOptions.value?.find(v1 => v1.value === v)?.label;
  };
  watch(
    () => supplyOptions.value,
    (newVal:any) => {
      if (newVal) {
        formData.value.supplyMode = newVal?.[0]?.value;
      }
    },
    {
      immediate: true,
    },
  );
  const wavesOptions = computed(() => getEnableDictionaryOptions(DICTIONARY_KEY.WAVEBATCH));
  const planOptions = computed(() => getEnableDictionaryOptions(DICTIONARY_KEY.PLANNINGSOURCE));
  
  watch(
    () => planOptions.value,
    (newVal:any) => {
      if (newVal) {
        formData.value.plan = newVal?.[0]?.value;
      }
    },
    {
      immediate: true,
    },
  );
  const countryOptions = computed(() => getEnableDictionaryOptions(DICTIONARY_KEY.NATIONAL));
  watch(
    () => countryOptions.value,
    (newVal:any) => {
      if (newVal) {
        formData.value.country = newVal?.[0]?.value;
      }
    },
    {
      immediate: true,
    },
  );
  const inspirationImageSourceOptions = computed(
    () => getEnableDictionaryOptions(DICTIONARY_KEY.INSPIRATION_IMAGE_SOURCE)
  );
  const inspirationBrandOptions = computed(
    () => getEnableDictionaryOptions(DICTIONARY_KEY.INSPIRATION_BRAND)
  );
  const styleOptions = computed(() => getEnableDictionaryOptions(DICTIONARY_KEY.STYLE));
  const ageOptions = computed(() => getEnableDictionaryOptions(DICTIONARY_KEY.AGE));
  const popularOptions = computed(() => getEnableDictionaryOptions(DICTIONARY_KEY.POPULAR));

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
      ElMessage.error('只能选择.xlsx和.xls文件');
      return;
    }
    if (!validatorSize(file.size)) {
      ElMessage.error('文件大小不能超过10M');
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
    title: '导入灵感图',
    width: 600,
    class: 'clear-dialog-body-padding',
    onClose() {
      formEl.value?.resetFields();
    },
    async onConfirm() {
      await formEl.value?.validate();
      const { fileType, file } = formData.value;
      if (fileType === IMPORT_TYPE_ENUM.TEM) {
        if (!file) return;
        const data = new FormData();
        data.append('file', file, file.name);
        const { data: res } = await inspirationImport(data);
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
      }
      if (fileType === IMPORT_TYPE_ENUM.IMG) {
        const {
          supplyMode,
          country,
          plan,
          waves,
          imgFile,
          inspirationImageSourceCode,
          inspirationBrandCode,
          styleCode,
          ageCode,
          popularCode,
          styleSourceCode,
          styleSourceName
        } = formData.value;
        const params:IImageImportReq = {
          supplyMethodCode: supplyMode,
          countrySiteCode: country,
          waveBatchCode: waves,
          planningSourceCode: plan,
          inspirationImages: imgFile.map((i: IInspirationImages) => ({
            url: i.url,
            name: i.name,
          })),
          inspirationImageSourceCode,
          inspirationBrandCode,
          styleCode,
          ageCode,
          popularCode,
          styleSourceCode,
          styleSourceName
        };
        await imageImport(params);
        ElMessage.success('导入数据成功');
      }
      handleSuccess && handleSuccess();
      closeDialog();
    },
    render() {
      return (
        <el-form rules={rules.value} model={formData.value} ref={setRef} label-width='100px' class='tw-m-20px'>
          <el-form-item label='导入类型'>
            <el-radio-group v-model={formData.value.fileType}>
              {
                IMPORT_TYPE_LIST.map(i => (
                  <el-radio-button
                    key={i.value}
                    label={i.value}
                  >
                    {i.label}
                  </el-radio-button>
                ))
              }
            </el-radio-group>
          </el-form-item>
          {
            formData.value.fileType === IMPORT_TYPE_ENUM.TEM ? (
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
                      'tw-w-290px',
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
                    <a href='/static/灵感源模板.xlsx' download='灵感源模板.xlsx'>模板下载</a>
                  </div>
                </div>
              </el-form-item>
            ) : (
              <>
                <el-form-item label='供给方式' prop='supplyMode'>
                  <el-select v-model={formData.value.supplyMode} placeholder='请选择' class='tw-w-200px'>
                    {
                      supplyOptions.value.map(i => (
                        <el-option
                          key={i.value}
                          label={i.label}
                          value={i.value}
                        />
                      ))
                    }
                  </el-select>
                </el-form-item>
                <el-form-item label='波次' prop='waves'>
                  <el-select
                    v-model={formData.value.waves}
                    placeholder='请选择'
                    class='tw-w-200px'
                    filterable
                  >
                    {
                      wavesOptions.value.map(i => (
                        <el-option
                          key={i.value}
                          label={i.label}
                          value={i.value}
                        />
                      ))
                    }
                  </el-select>
                </el-form-item>
                <el-form-item label='企划来源' prop='plan'>
                  <el-select v-model={formData.value.plan} placeholder='请选择' class='tw-w-200px'>
                    {
                      planOptions.value.map(i => (
                        <el-option
                          key={i.value}
                          label={i.label}
                          value={i.value}
                        />
                      ))
                    }
                  </el-select>
                </el-form-item>
                <el-form-item label='国家站点' prop='country'>
                  <el-select v-model={formData.value.country} placeholder='请选择' class='tw-w-200px'>
                    {
                      countryOptions.value.map(i => (
                        <el-option
                          key={i.value}
                          label={i.label}
                          value={i.value}
                        />
                      ))
                    }
                  </el-select>
                </el-form-item>
                <el-form-item label='灵感图来源' prop='inspirationImageSourceCode'>
                  <el-select v-model={formData.value.inspirationImageSourceCode} placeholder='请选择' class='tw-w-200px'>
                    {
                      inspirationImageSourceOptions.value.map(i => (
                        <el-option
                          key={i.value}
                          label={i.label}
                          value={i.value}
                        />
                      ))
                    }
                  </el-select>
                </el-form-item>
                {/* <el-form-item label='灵感图品牌' prop='inspirationBrandCode'>
                  <el-select v-model={formData.value.inspirationBrandCode} placeholder='请选择' class='tw-w-200px'>
                    {
                      inspirationBrandOptions.value.map(i => (
                        <el-option
                          key={i.value}
                          label={i.label}
                          value={i.value}
                        />
                      ))
                    }
                  </el-select>
                </el-form-item> */}
                <el-form-item label='风格' prop='styleCode'>
                  <el-select v-model={formData.value.styleCode} placeholder='请选择' class='tw-w-200px'>
                    {
                      styleOptions.value.map(i => (
                        <el-option
                          key={i.value}
                          label={i.label}
                          value={i.value}
                        />
                      ))
                    }
                  </el-select>
                </el-form-item>
                <el-form-item label='年龄' prop='ageCode'>
                  <el-select v-model={formData.value.ageCode} placeholder='请选择' class='tw-w-200px'>
                    {
                      ageOptions.value.map(i => (
                        <el-option
                          key={i.value}
                          label={i.label}
                          value={i.value}
                        />
                      ))
                    }
                  </el-select>
                </el-form-item>
                <el-form-item label='款式来源' prop='styleSourceCode'>
                  <el-select
                    v-model={formData.value.styleSourceCode}
                    placeholder='请选择'
                    class='tw-w-200px'
                    onChange={(v: string) => {
                      styleSourceChange(v);
                    }}
                  >
                    {
                      styleSourceOptions.value.map(i => (
                        <el-option
                          key={i.value}
                          label={i.label}
                          value={i.value}
                        />
                      ))
                    }
                  </el-select>
                </el-form-item>
                {/* <el-form-item label='爆款' prop='popularCode'>
                  <el-select v-model={formData.value.popularCode} placeholder='请选择' class='tw-w-200px'>
                    {
                      popularOptions.value.map(i => (
                        <el-option
                          key={i.value}
                          label={i.label}
                          value={i.value}
                        />
                      ))
                    }
                  </el-select>
                </el-form-item> */}
                <el-form-item label='上传文件' prop='imgFile'>
                  <div class='tw-flex tw-flex-col'>
                    <div>
                      已上传
                      { formData.value.imgFile.length }
                      张图片
                    </div>
                    <el-scrollbar maxHeight={240}>
                      <uploader
                        v-model={formData.value.imgFile}
                        size-limit={10}
                        accept='.jpg,.png,.jpeg'
                        multiple
                        tips='该文件夹的图片需要为图片形式，图片格式jpg/png/jpeg'
                        structure='vertical'
                        checkAccept
                        listType='text'
                        size='mini'
                        paste={false}
                        useWrapper={false}
                        v-slots={{
                          default() {
                            return (
                              <div class={[
                                'tw-flex',
                                'tw-flex-col',
                                'tw-justify-center',
                                'tw-items-center',
                                'tw-w-120px',
                                'tw-h-80px',
                                'tw-border-2',
                                'tw-border-dashed',
                                'tw-border-#F2F4FA',
                                'tw-rounded-lg',
                                'tw-text-center',
                                'tw-text-#606166',
                              ]}
                              >
                                <span class='tw-font-bold tw-text-nowrap tw-m-r-6px'>将图片拖到此处或</span>
                                <el-button>点击上传</el-button>
                              </div>
                            );
                          },
                        }}
                      />
                    </el-scrollbar>
                  </div>
                </el-form-item>
              </>
            )
          }
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
