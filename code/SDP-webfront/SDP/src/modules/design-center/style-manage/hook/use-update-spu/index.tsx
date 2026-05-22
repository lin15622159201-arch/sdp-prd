import { useDialog } from '@toy/business-components';
import { nextTick, ref, watch, computed } from 'vue';
import { useRoute } from 'vue-router';
import { useResetRef } from '@toy/v-use';
import { ElForm, ElLoading, ElMessage, FormRules } from 'element-plus';
import { createSpu, getSpuDetail, updateSpu, getCodeSpuDetail } from '../../api';
import { CUSTOM_DICTIONARY_KEY, DICTIONARY_KEY } from '@/constant/dictionary';
import DictionarySelect from '@/components/dictionary-select';
import { useDictOptions } from './use-dict-options';

interface IProps {
  reloadFn: () => void;
}

export const useUpdateSPU = (props: IProps) => {
  const { reloadFn } = props;
  const $route = useRoute();
  const {
    PLM_REFERENCE_SEASON,
    SHOP_LIST,
    FIT_OPTION,
    PLM_QUALITY_LEVEL,
    PLM_ELASTIC_REQUIREMENT,
    APS_CATEGORY_TYPE,
    scenes,
    PLM_STANDARD_SIZE,
    pimsCategory,
    WAVE_BAND_CODE_LIST,
    productTag,
    productlevel,
    styleType,
    product_style,
    fd_printing,
    festival,
    visual_style,
    SKU_CLASSIFICATION,
    getDictionaryLabel,
    getDictionaryOptionsSync,
  } = useDictOptions();
  // 存储从路由或detail传来的状态
  
  // 从 route.query 获取 listingStatus 和 pushPlmStatus 和 isOnSale
  const getListingStatusFromRoute = () => {
    const status = $route.query.listingStatus;
    return status !== undefined && status !== null && status !== '' ? Number(status) : undefined;
  };
  
  const getPushPlmStatusFromRoute = () => {
    const status = $route.query.pushPlmStatus;
    return status !== undefined && status !== null && status !== '' ? Number(status) : undefined;
  };

  const getIsOnSaleFromRoute = () => {
    return $route.query.isOnSale;
  };

  // 计算尺码组是否应该禁用
  // 上架状态=待推送(0)/上架失败(4) 并且 推送状态=待推送(0)/推送失败(2)的时候禁用
  const isSizeGroupDisabled = computed(() => {
    const listingStatus = getListingStatusFromRoute();
    const pushPlmStatus = getPushPlmStatusFromRoute();
    const isOnSale = getIsOnSaleFromRoute();
    
    // 如果路由没有listingStatus或pushPlmStatus，默认不禁用
    if (listingStatus === undefined || pushPlmStatus === undefined) {
      return false;
    }
    
    // 判断是否属于“不禁用”的情况
    const isEnableByListing = listingStatus === 0 || listingStatus === 4;
    const isEnableByPush = pushPlmStatus === 0 || pushPlmStatus === 2;
    
    // 只有同时满足两个条件的特定状态时才不禁用，否则禁用
    const shouldBeEnabled = isEnableByListing && isEnableByPush && isOnSale === '-1';
    return !shouldBeEnabled;
  });
  
  const [formData, reset] = useResetRef<any>({
    categoryCode: '',
    visualFormCode: '',
    suitPiece: undefined,
    categoryName: '',
    styleLabelCode: '',
    styleLabelName: '',
    storeId: '',
    storeName: '',
    sizeStandardName: '',
    sizeStandardCode: '',
    styleLevelName: '',
    styleLevelCode: '',
    designTypeCode: '',
    designTypeName: '',
    qualityLevelName: '',
    qualityLevelCode: '',
    weaveModeCode: '',
    weaveModeName: '',
    clothingStyleName: '',
    clothingStyleCode: '',
    printingCode: '',
    printingName: '',
    seasonCode: '',
    seasonName: '',
    visualFormName: '',
    patternCode: '',
    patternName: '',
    elasticCode: '',
    elasticName: '',
    categoryList: [],
    styleCode: '',
  });
  const formEl = ref<InstanceType<typeof ElForm>>();
  const setFormEl = (val: any) => {
    formEl.value = val;
  };
  const formRules: FormRules = {
    categoryList: [
      { required: true, message: '请选择品类', trigger: 'change' },
    ],
    styleLabelCode: [
      { required: true, message: '请选择款式标签', trigger: 'change' },
    ],
    storeId: [
      { required: true, message: '请选择店铺', trigger: 'change' },
    ],
    sizeStandardCode: [
      { required: true, message: '请选择尺码组', trigger: 'change' },
    ],
    styleLevelCode: [
      { required: true, message: '请选择款式级别', trigger: 'change' },
    ],
    designTypeCode: [
      { required: true, message: '请选择款式类型', trigger: 'change' },
    ],
    qualityLevelCode: [
      { required: true, message: '请选择品质等级', trigger: 'change' },
    ],
    weaveModeCode: [
      { required: true, message: '请选择织造方式', trigger: 'change' },
    ],
    projectTypeCode: [
      { required: true, message: '请选择项目类型', trigger: 'change' },
    ],
    patternCode: [
      { required: true, message: '请选择版型', trigger: 'change' },
    ],
    elasticCode: [
      { required: true, message: '请选择弹性', trigger: 'change' },
    ],
    sceneCode: [
      { required: false, message: '请选择场景', trigger: 'change' },
    ],
    visualFormCode: [
      { required: true, message: '请选择视觉形式', trigger: 'change' },
    ],
    skuClassCode: [
      { required: false, message: '请选择SKU分类', trigger: 'change' },
    ],
    suitPiece: [
      { required: true, message: '请输入', trigger: 'input' },
    ]
  };

  const spuText = ref<string>();
  const findNodeByCodePath = (codePath: any, options: any) => {
    if (!codePath || codePath.length === 0) return [];
    let currentOptions = options;
    const namePath = [];
    // eslint-disable-next-line
    for (const code of codePath) {
      // 查找当前层级中code匹配的节点
      const foundNode = currentOptions.find((item: { value: string; }) => item.value === code);
      if (!foundNode) {
        return [];
      }
      namePath.push(foundNode.label);
      currentOptions = foundNode.children || [];
    }
    return namePath;
  };
  const categoryCodeChange = (e: any) => {
    if (e) {
      const data = findNodeByCodePath(e, pimsCategory.value);
      formData.value.categoryCode = e.join('-');
      formData.value.categoryName = (data || []).join('-');
      // 禁用的时候修改品类不能改尺码组
      if (!isSizeGroupDisabled.value && e && e.length > 0) {
        const firstLevelCategory = pimsCategory.value.find((item: { value: string; }) => item.value === e[0]);
        if (firstLevelCategory?.attributes?.length) {
          const defaultSizeAttr = firstLevelCategory.attributes.find((v: { code: string; }) => v.code === 'default_size');
          if (defaultSizeAttr) {
            formData.value.sizeStandardCode = defaultSizeAttr.name;
            formData.value.sizeStandardName = PLM_STANDARD_SIZE.value.find((v: { value: string; }) => v.value === defaultSizeAttr.name)?.label || '';
          }
        }
      }
    } else {
      formData.value.categoryList = [];
      formData.value.categoryCode = '';
      formData.value.categoryName = '';
      formData.value.sizeStandardCode = '';
      formData.value.sizeStandardName = '';
    }
  };
  const getNameChange = (e:any, keyName: string, list: any) => {
    formData.value[keyName] = list.find((v: { value: string; }) => v.value === e)?.label || '';
    if (keyName === 'skuClassName' && formData.value[keyName] === '单品') {
      formData.value.suitPiece = undefined;
    }
  };
  const { openDialog, closeDialog } = useDialog(() => ({
    width: 980,
    title: 'SPU信息',
    confirmText: '提交',
    onClose() {
      reset();
    },
    async onConfirm() {
      await formEl.value?.validate();
      const api = formData.value.styleCode ? updateSpu : createSpu;
      await api({
        ...formData.value,
        projectTypeName: getDictionaryLabel(DICTIONARY_KEY.PLM_PRODUCTTYPE, formData.value.projectTypeCode),
        taskSource: formData.value.styleCode ? formData.value.taskSource : 'user_upload',
      });
      closeDialog();
      reloadFn();
    },
    render() {
      return (
        <div class='tw-flex tw-flex-col tw-gap-10px' id='my-overlay-dialog'>
          <div>
            <el-input
              v-model={spuText.value}
              style='width: 240px'
              placeholder='输入精准SPU号'
            />
            <span
              class='tw-color-#605CE5 tw-cursor-pointer tw-m-l-10px'
              onClick={() => {
                inputSpu();
              }}
            >
              从历史款式引用
            </span>
          </div>
          <el-form
            class={[
              'tw-border-1px',
              'tw-border-color-[var(--el-border-color)]',
              'tw-border-solid',
              'tw-p-10px',
              'tw-rounded-4px'
            ]}
            label-width='100'
            ref={setFormEl}
            model={formData.value}
            rules={formRules}
          >
            <div class='tw-pb-10px'>
              <div class='tw-text-16px tw-font-bold tw-pb-20px'>基本信息</div>
              <el-row>
                <el-col span={8}>
                  <el-form-item
                    label='品类'
                    prop='categoryList'
                  >
                    <el-cascader
                      placeholder='品类'
                      class='tw-w-100%'
                      v-model={formData.value.categoryList}
                      clearable
                      options={pimsCategory.value}
                      show-all-levels
                      collapse-tags
                      // props='pimsCategoryProps'
                      onChange={($event: any) => {
                        categoryCodeChange($event);
                      }}
                    />
                  </el-form-item>
                </el-col>
                <el-col span={8}>
                  <el-form-item
                    label='款式标签'
                    prop='styleLabelCode'
                  >
                    <el-select
                      v-model={formData.value.styleLabelCode}
                      filterable
                      clearable
                      onChange={($event: any) => {
                        getNameChange($event, 'styleLabelName', productTag.value);
                      }}
                    >
                      {productTag.value.map(v => (
                        <el-option
                          key={v.value}
                          value={v.value}
                          label={v.label}
                        />
                      ))}
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col span={8}>
                  <el-form-item
                    label='店铺'
                    prop='storeId'
                  >
                    <DictionarySelect
                      v-model={formData.value.storeId}
                      dictionary={CUSTOM_DICTIONARY_KEY.SHOP_LIST}
                      onChange={($event: any) => {
                        getNameChange($event, 'storeName', SHOP_LIST.value);
                      }}
                    />
                  </el-form-item>
                </el-col>
                <el-col span={8}>
                  <el-form-item
                    label='款式类型'
                    prop='designTypeCode'
                  >
                    <el-select
                      v-model={formData.value.designTypeCode}
                      filterable
                      clearable
                      onChange={($event: any) => {
                        getNameChange($event, 'designTypeName', styleType.value);
                      }}
                    >
                      {styleType.value.map(v => (
                        <el-option
                          key={v.value}
                          value={v.value}
                          label={v.label}
                        />
                      ))}
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col span={8}>
                  <el-form-item
                    label='尺码组'
                    prop='sizeStandardCode'
                  >
                    <el-select
                      v-model={formData.value.sizeStandardCode}
                      disabled={isSizeGroupDisabled.value}
                      onChange={($event: any) => {
                        getNameChange($event, 'sizeStandardName', PLM_STANDARD_SIZE.value);
                      }}
                    >
                      {PLM_STANDARD_SIZE.value.map(v => (
                        <el-option
                          key={v.value}
                          value={v.value}
                          label={v.label}
                        />
                      ))}
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col span={8}>
                  <el-form-item
                    label='波段'
                    prop='waveBandCode'
                  >
                    <el-select
                      v-model={formData.value.waveBandCode}
                      filterable
                      clearable
                      onChange={($event: any) => {
                        getNameChange($event, 'waveBandName', WAVE_BAND_CODE_LIST.value);
                      }}
                    >
                      {WAVE_BAND_CODE_LIST.value.map(v => (
                        <el-option
                          key={v.value}
                          value={v.value}
                          label={v.label}
                        />
                      ))}
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col span={8}>
                  <el-form-item
                    label='款式级别'
                    prop='styleLevelCode'
                  >
                    <el-select
                      v-model={formData.value.styleLevelCode}
                      filterable
                      clearable
                      onChange={($event: any) => {
                        getNameChange($event, 'styleLevelName', productlevel.value);
                      }}
                    >
                      {productlevel.value.map(v => (
                        <el-option
                          key={v.value}
                          value={v.value}
                          label={v.label}
                        />
                      ))}
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col span={8}>
                  <el-form-item
                    label='品质等级'
                    prop='qualityLevelCode'
                  >
                    <el-select
                      v-model={formData.value.qualityLevelCode}
                      filterable
                      clearable
                      onChange={($event: any) => {
                        getNameChange($event, 'qualityLevelName', PLM_QUALITY_LEVEL.value);
                      }}
                    >
                      {PLM_QUALITY_LEVEL.value.map(v => (
                        <el-option
                          key={v.value}
                          value={v.value}
                          label={v.label}
                        />
                      ))}
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col span={8}>
                  <el-form-item
                    label='织造方式'
                    prop='weaveModeCode'
                  >
                    <el-select
                      v-model={formData.value.weaveModeCode}
                      filterable
                      clearable
                      onChange={($event: any) => {
                        getNameChange($event, 'weaveModeName', APS_CATEGORY_TYPE.value);
                      }}
                    >
                      {APS_CATEGORY_TYPE.value.map(v => (
                        <el-option
                          key={v.value}
                          value={v.value}
                          label={v.label}
                        />
                      ))}
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col span={8}>
                  <el-form-item label='项目类型' prop='projectTypeCode'>
                    <DictionarySelect
                      v-model={formData.value.projectTypeCode}
                      dictionary={DICTIONARY_KEY.PLM_PRODUCTTYPE}
                      clearable
                    />
                  </el-form-item>
                </el-col>
                <el-col span={16}>
                  <el-form-item label='商品链接' prop='commodityLink'>
                    <el-input
                      v-model={formData.value.commodityLink}
                      clearable
                      placeholder='请输入'
                    />
                  </el-form-item>
                </el-col>
              </el-row>
            </div>
            <div class='tw-pb-10px'>
              <div class='tw-text-16px tw-font-bold tw-pb-20px'>销售属性</div>
              <el-row>
                <el-col span={8}>
                  <el-form-item
                    label='风格'
                    prop='clothingStyleCode'
                    rules={[
                      { required: true, message: '请选择风格', trigger: 'change' },
                    ]}
                  >
                    <el-select
                      clearable
                      v-model={formData.value.clothingStyleCode}
                      placeholder='请选择'
                      onChange={($event: any) => {
                        getNameChange($event, 'clothingStyleName', product_style.value);
                      }}
                    >
                      {
                        product_style.value.map((v) => {
                          return (
                            <el-option
                              label={v.label}
                              value={v.value}
                            />
                          );
                        })
                      }
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col span={8}>
                  <el-form-item
                    label='印花类型'
                    prop='printingCode'
                    rules={[
                      { required: true, message: '请选择印花类型', trigger: 'change' },
                    ]}
                  >
                    <el-select
                      clearable
                      v-model={formData.value.printingCode}
                      placeholder='请选择'
                      onChange={($event: any) => {
                        getNameChange($event, 'printingName', fd_printing.value);
                      }}
                    >
                      {
                        fd_printing.value.map((v) => {
                          return (
                            <el-option
                              label={v.label}
                              value={v.value}
                            />
                          );
                        })
                      }
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col span={8}>
                  <el-form-item
                    label='季节'
                    prop='seasonCode'
                    rules={[
                      { required: true, message: '请选择季节', trigger: 'change' },
                    ]}
                  >
                    <el-select
                      clearable
                      filterable
                      v-model={formData.value.seasonCode}
                      onChange={($event: any) => {
                        getNameChange($event, 'seasonName', PLM_REFERENCE_SEASON.value);
                      }}
                    >
                      {PLM_REFERENCE_SEASON.value.map(v => (
                        <el-option
                          key={v.value}
                          value={v.value}
                          label={v.label}
                        />
                      ))}
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col span={8}>
                  <el-form-item label='节日' prop='galaCode'>
                    <el-select
                      clearable
                      filterable
                      v-model={formData.value.galaCode}
                      onChange={($event: any) => {
                        getNameChange($event, 'galaName', festival.value);
                      }}
                    >
                      {festival.value.map(v => (
                        <el-option
                          key={v.value}
                          value={v.value}
                          label={v.label}
                        />
                      ))}
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col span={8}>
                  <el-form-item label='版型' prop='patternCode'>
                    <el-select
                      v-model={formData.value.patternCode}
                      filterable
                      clearable
                      onChange={($event: any) => {
                        getNameChange($event, 'patternName', FIT_OPTION.value);
                      }}
                    >
                      {FIT_OPTION.value.map(v => (
                        <el-option
                          key={v.value}
                          value={v.value}
                          label={v.label}
                        />
                      ))}
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col span={8}>
                  <el-form-item label='弹性' prop='elasticCode'>
                    <el-select
                      v-model={formData.value.elasticCode}
                      filterable
                      clearable
                      onChange={($event: any) => {
                        getNameChange($event, 'elasticName', PLM_ELASTIC_REQUIREMENT.value);
                      }}
                    >
                      {PLM_ELASTIC_REQUIREMENT.value.map(v => (
                        <el-option
                          key={v.value}
                          value={v.value}
                          label={v.label}
                        />
                      ))}
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col span={8}>
                  <el-form-item label='面料池使用范围' prop='sceneCode'>
                    <el-select
                      v-model={formData.value.sceneCode}
                      filterable
                      clearable
                      onChange={($event: any) => {
                        getNameChange($event, 'sceneName', scenes.value);
                      }}
                    >
                      {scenes.value.map(v => (
                        <el-option
                          key={v.value}
                          value={v.value}
                          label={v.label}
                        />
                      ))}
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col span={8}>
                  <el-form-item label='视觉形式' prop='visualFormCode'>
                    <el-select
                      v-model={formData.value.visualFormCode}
                      filterable
                      clearable
                      onChange={($event: any) => {
                        getNameChange($event, 'visualFormName', visual_style.value);
                      }}
                    >
                      {visual_style.value.map(v => (
                        <el-option
                          key={v.value}
                          value={v.value}
                          label={v.label}
                        />
                      ))}
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col span={8}>
                  <el-form-item label='SKU分类' prop='skuClassCode'>
                    <el-select
                      clearable
                      filterable
                      v-model={formData.value.skuClassCode}
                      onChange={($event: any) => {
                        getNameChange($event, 'skuClassName', SKU_CLASSIFICATION.value);
                      }}
                    >
                      {SKU_CLASSIFICATION.value.map(v => (
                        <el-option
                          key={v.value}
                          value={v.value}
                          label={v.label}
                        />
                      ))}
                    </el-select>
                  </el-form-item>
                </el-col>
                {
                  formData.value.skuClassCode !== '1'
                  && formData.value.skuClassCode
                  && (
                    <el-col
                      span={8}
                    >
                      <el-form-item
                        label={formData.value.skuClassCode === '2' ? '套装件数' : '单品数量'}
                        prop='suitPiece'
                      >
                        <el-input-number
                          v-model={formData.value.suitPiece}
                          min={1}
                          max={9999999}
                          precision={0}
                          step={1}
                        />
                      </el-form-item>
                    </el-col>
                  )
                }
              </el-row>
            </div>
          </el-form>
        </div>
      );
    },
  }));

  // 展示加载中，等待字典加载完成
  const showDictionaryLoading = async () => {
    nextTick(async () => {
      const targetElement: HTMLElement | null = document.getElementById('my-overlay-dialog');
      if (!targetElement) return;
      const loading = ElLoading.service({
        lock: true,
        text: '字典加载中...',
        target: targetElement,
      });
      await getDictionaryOptionsSync(DICTIONARY_KEY.PLM_QUALITY_LEVEL);
      loading.close();
    });
  };

  const oldStyleCode = ref('');
  const inputSpu = () => {
    handleUpdateSpu(spuText.value || oldStyleCode.value, true);
  };
  const handleUpdateSpu = async (styleCode: string, isHistory = false) => {
    if (!isHistory) {
      oldStyleCode.value = styleCode;
    }
    if (!styleCode) return;
    const { data } = await (isHistory ? getCodeSpuDetail({ designStyleCode: spuText.value || '' }) : getSpuDetail({ prototypeId: styleCode }));
    if (!data) {
      ElMessage({
        message: '当前SPU号没有查出数据，请换个编号查询',
        type: 'warning',
      });
      return;
    }
    await getDictionaryOptionsSync(DICTIONARY_KEY.STYLETYPE);
    formData.value = {
      ...data,
      categoryList: data?.categoryCode?.split('-'),
      versionNum: data.versionNum ? (data.versionNum || 0) + 1 : undefined,
      styleCode: isHistory ? formData.value.styleCode : (data?.styleCode ?? ''),
      designStyleId: isHistory ? formData.value.designStyleId : (data?.designStyleId ?? ''),
      sizeStandardCode: isHistory ? (formData.value.sizeStandardCode || data.sizeStandardCode) : data.sizeStandardCode,
      sizeStandardName: isHistory ? (formData.value.sizeStandardName || data.sizeStandardName) : data.sizeStandardName,
      designTypeCode: data.designTypeCode || styleType.value?.find(v => v.attributes?.some(v1 => v1.code === 'isDefault' && v1.name === '1'))?.value,
      designTypeName: data.designTypeName || styleType.value?.find(v => v.attributes?.some(v1 => v1.code === 'isDefault' && v1.name === '1'))?.label,
    };
    openDialog();
    formEl.value?.clearValidate();
    showDictionaryLoading();
  };
  const handleCreateSpu = async () => {
    openDialog();
    formEl.value?.clearValidate();
    spuText.value = '';
    showDictionaryLoading();

    watch(() => PLM_QUALITY_LEVEL.value, () => {
      if (!formData.value.qualityLevelCode) {
        formData.value.qualityLevelCode = PLM_QUALITY_LEVEL.value?.find(v => v.attributes?.some(v1 => v1.code === 'is_default' && v1.name === '1'))?.value;
        formData.value.qualityLevelName = PLM_QUALITY_LEVEL.value?.find(v => v.attributes?.some(v1 => v1.code === 'is_default' && v1.name === '1'))?.label;
      }
      if (!formData.value.designTypeCode) {
        formData.value.designTypeCode = styleType.value?.find(v => v.attributes?.some(v1 => v1.code === 'isDefault' && v1.name === '1'))?.value;
        formData.value.designTypeName = styleType.value?.find(v => v.attributes?.some(v1 => v1.code === 'isDefault' && v1.name === '1'))?.label;
      }
    }, {
      immediate: true,
    });
  };
  return {
    handleCreateSpu,
    handleUpdateSpu
  };
};
