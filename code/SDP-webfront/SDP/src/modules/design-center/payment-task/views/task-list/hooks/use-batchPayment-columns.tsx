import { ITableColumnsItem } from '@toy/business-components';
import { computed, ref, watch, h, nextTick } from 'vue';
import type { DefineComponent } from 'vue';
import { IListItem } from '../types';
import { filters } from '@/core/plugins/filter';
import { resizeImgByWidth } from '@/core/utils/helper';
import { useDictionary } from '@/hooks/use-dictionary';
import { DICTIONARY_KEY, CUSTOM_DICTIONARY_KEY } from '@/constant/dictionary';
import { IColorItem } from '@/modules/design-center/style-manage/views/skc-detail/types';
import { isEmpty } from '@toy/utils';
import usePersistTempData from './usePersistTempData';
import { ElMessage, ElSelect, ElOption, ElCascader, ElLoading } from 'element-plus';
import ColorCascader from '@/components/color-cascader';
import { findValuePath } from '@/core/utils/array';
import { useLookStyleDialog } from './use-lookStyle';
import { IDictionaryItem } from '@/hooks/use-dictionary/types';
import { getListSameSkc } from '../../../api';
import { TYPE_STYLE } from '../../../constant/index';

interface IProps {
  lookImg: (url: string[]) => void;
  setForm: (formDatas: any) => void;
}


export const useTableColumns = (props: IProps) => {
  const { handleOpenDialog } = useLookStyleDialog();
  // 获取颜色列表
  const CLOTHING_COLOR = ref<IColorItem[]>([]);
  const stylscorerangeList = ref<IDictionaryItem[]>([]);
  const { get, remove } = usePersistTempData();
  const { getDictionaryOptions, getDictionaryOptionsSync } = useDictionary();
  const getColors = async () => {
    const stylscorerange = await getDictionaryOptionsSync(DICTIONARY_KEY.STYLSCORERANGE);
    stylscorerangeList.value = stylscorerange;
    const list = await getDictionaryOptionsSync(DICTIONARY_KEY.CLOTHING_COLOR);
    const colors: IColorItem[] = [];
    list.forEach((v) => {
      const curColorList: IColorItem[] = [];
      v.children?.forEach((it) => {
        if (it.attributes?.length === 0) return;
        const colorAbbrCode = it.attributes?.find(item => item.code === 'YWSX')?.name!;
        const colorEnglishName = it.attributes?.find(item => item.code === 'YWFY')?.name!;
        const colorNumber = it.attributes?.find(item => item.code === 'SH')?.name!;
        if (isEmpty(colorAbbrCode) || isEmpty(colorNumber)) return;
        curColorList.push({
          ...it,
          pathCode: `${v.value}-${it.value}`,
          colorNumber,
          colorEnglishName,
          colorAbbrCode,
          children: [],
        });
      });
      if (curColorList.length) {
        colors.push({
          ...v,
          children: curColorList,
          colorEnglishName: '',
          pathCode: '',
          colorAbbrCode: '',
          colorNumber: '',
        });
      }
    });
    CLOTHING_COLOR.value = colors;
  };
  getColors();
  /**
   * 版型
   */
  const FIT_OPTION = computed(() => getDictionaryOptions(DICTIONARY_KEY.FIT));
  /**
   * 品质等级
   */
  const plm_quality_level = computed(() => {
    return getDictionaryOptions(DICTIONARY_KEY.PLM_QUALITY_LEVEL) || [];
  });
  /**
   * 款式类型
   */
  const styleType = computed(() => {
    return getDictionaryOptions(DICTIONARY_KEY.STYLETYPE) || [];
  });
  /** 品类 */
  const pimsCategory = computed(() => {
    return getDictionaryOptions(DICTIONARY_KEY.PIMS_CATEGORY, 3) || [];
  });
  /**
   * sku分类
   */
  const SKU_CLASSIFICATION = computed(() => {
    return getDictionaryOptions(DICTIONARY_KEY.SKU_CLASSIFICATION) || [];
  });
  const CLOTHING_COLOR_MAP = computed(() => {
    const map = new Map<string, IColorItem>();
    CLOTHING_COLOR.value.forEach((v) => {
      v.children.forEach((it) => {
        map.set(it.value, it);
        map.set(it.pathCode, it);
      });
    });
    return map;
  });
  const changeColor = (list: any, row: any) => {
    if (list.length > 6) {
      ElMessage.error('不超过六种颜色');
      row.colorList = row.colorList.slice(0, 6);
      list = list.slice(0, 6);
    }
    const colorInfoList: any = [];
    list.forEach((v: any) => {
      if (
        v.length === 2
        && CLOTHING_COLOR_MAP.value.has(v.join('-'))
      ) {
        const row1 = CLOTHING_COLOR_MAP.value.get(v.join('-'))!;
        if (row1) {
          colorInfoList.push({
            colorAbbrCode: row1.colorAbbrCode,
            colorNumber: row1.colorNumber,
            colorEnglishName: row1.colorEnglishName,
            colorCode: row1.value,
            color: row1.label
          });
        }
      }
    });
    row.skcs = colorInfoList.map((v: { color: string; colorEnglishName: string; colorCode: string; }) => {
      return {
        color: v.color,
        colorEnName: v.colorEnglishName,
        colorCode: v.colorCode,
      };
    });
  };
  const findNodeData = (codePath: any, options: any) => {
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
      namePath.push(foundNode);
      currentOptions = foundNode.children || [];
    }
    return namePath;
  };
  const tableData = ref<any>([]);
  const dataList = JSON.parse(JSON.stringify(get('identifyStatus-page-data') || []));
  
  watch([() => CLOTHING_COLOR_MAP.value, () => plm_quality_level.value], async () => {
    const max = stylscorerangeList.value?.find(v => v.value === TYPE_STYLE.SIMILAR)?.attributes?.[0]?.name;
    const min = stylscorerangeList.value?.find(v => v.value === TYPE_STYLE.SAME)?.attributes?.[0]?.name;
    if (!min || !max || !CLOTHING_COLOR.value.length) return;
    let data = [];
    try {
      const { data: sameSkcList } = await getListSameSkc(dataList.map((v: { taskId: string; }) => v.taskId));
      data = sameSkcList;
    } catch {
      console.error('请求接口错误');
    }
    tableData.value = dataList.map((item: any, index: number) => {
      if (item.storeId === '0') {
        item.storeId = '';
      }
      item.waveBandCode = item.wavebandCode;
      item.waveBandName = item.wavebandName;
      item.categoryList = item.categoryCode?.split('-');
      const categoryNodeCode = item.categoryList?.at(-1);
      if (categoryNodeCode) {
        const categoryNodeData = findNodeData(item.categoryList, pimsCategory.value).at(-1);
        if (categoryNodeData?.attributes && categoryNodeData.attributes.length) {
          item.skuClassCode = categoryNodeData?.attributes?.find((v: { code: string; }) => v.code === 'SKU_CLASSIFICATION')?.name;
          item.skuClassName = SKU_CLASSIFICATION.value.find((v: { value: string; }) => v.value === item.skuClassCode)?.label;
          if (item.skuClassCode === '1') {
            item.suitPiece = undefined;
          }
        }
        // 根据品类第一级的default_size属性设置尺码组默认值
        if (item.categoryList && item.categoryList.length > 0) {
          const firstLevelCategory = findNodeData([item.categoryList[0]], pimsCategory.value)[0];
          if (firstLevelCategory?.attributes?.length) {
            const defaultSizeAttr = firstLevelCategory.attributes.find((v: { code: string; }) => v.code === 'default_size');
            if (defaultSizeAttr) {
              item.sizeStandardCode = defaultSizeAttr.name;
              item.sizeStandardName = plm_standard_size.value.find((v: { value: string; }) => v.value === defaultSizeAttr.name)?.label || '';
            }
          }
        }
      }
      if (styleType.value.length) {
        item.designTypeCode = item.designTypeCode || styleType.value.find(v => v.attributes?.some(v1 => v1.code === 'isDefault'))?.value;
        item.designTypeName = item.designTypeName || styleType.value.find(v => v.attributes?.some(v1 => v1.code === 'isDefault'))?.label;
      }
      const arrColors: any = [];
      (item.colorCode || '').split(',').slice(0, 6).forEach((v: string) => {
        if (findValuePath(CLOTHING_COLOR.value, v) && findValuePath(CLOTHING_COLOR.value, v)?.length) {
          arrColors.push(findValuePath(CLOTHING_COLOR.value, v));
        }
      });
      item.colorList = arrColors;
      if (item.colorList.length) {
        changeColor(item.colorList, item);
      }
      if (!item.qualityLevelName) {
        item.qualityLevelName = plm_quality_level.value?.find(qus => qus.attributes?.some(qus1 => qus1.code === 'is_default' && qus1.name === '1'))?.label ?? '';
        item.qualityLevelCode = plm_quality_level.value?.find(qus => qus.attributes?.some(qus1 => qus1.code === 'is_default' && qus1.name === '1'))?.value ?? '';
      }
      item.uuid = index;
      item.sameSkcList = data?.filter((v: { developTaskId: string; }) => v.developTaskId === item.taskId)?.map((v1: any) => {
        return {
          ...v1,
          similarStylesType: (Number(v1.score || 0) > Number(min || 0)) && (Number(v1.score || 0) <= Number(max || 0)) ? TYPE_STYLE.SIMILAR : ((Number(v1.score || 0) <= Number(min || 0)) ? TYPE_STYLE.SAME : ''),
        };
      })?.filter((v1: { similarStylesType: string; }) => !!v1.similarStylesType) ?? [];
      item.similarStylesNum = item.sameSkcList.filter((v: { score: number; }) => (Number(v.score || 0) > Number(min || 0)) && (Number(v.score || 0) <= Number(max || 0))).length;
      item.sameStyleNum = item.sameSkcList.filter((v: { score: number; }) => (Number(v.score || 0) <= Number(min || 0))).length;
      const patternItem = FIT_OPTION.value?.find(v => v.attributes?.some(v1 => v1.name === item.patternName));
      item.patternName = patternItem?.label;
      item.patternCode = patternItem?.value;
      return item;
    });
  }, {
    immediate: true
  });
  
  
  const delFun = (i: number) => {
    if (tableData.value.length === 1) {
      ElMessage.error('请最少保留一条数据');
      return;
    }
    tableData.value.splice(i, 1);
  };
  /** 波段 */
  const plmClothingBand = computed(() => {
    return getDictionaryOptions(DICTIONARY_KEY.PLM_CLOTHING_BAND) || [];
  });

  /** 店铺 */
  const shopList = computed(() => {
    return getDictionaryOptions(CUSTOM_DICTIONARY_KEY.SHOP_LIST) || [];
  });
  /** 款式标签 */
  const productTag = computed(() => {
    return getDictionaryOptions(DICTIONARY_KEY.PRODUCT_TAG) || [];
  });
  /** 款式级别 */
  const productlevel = computed(() => {
    return getDictionaryOptions(DICTIONARY_KEY.PRODUCT_LEVEL) || [];
  });
  /**
   * 视觉形式
   */
  const visual_style = computed(() => {
    return getDictionaryOptions(DICTIONARY_KEY.VISUAL_STYLE) || [];
  });
  /**
   * 风格
   */
  const product_style = computed(() => {
    return getDictionaryOptions(DICTIONARY_KEY.PRODUCT_STYLE) || [];
  });
  /**
   * 季节
   */
  const reference_season = computed(() => {
    return getDictionaryOptions(DICTIONARY_KEY.PLM_REFERENCE_SEASON) || [];
  });
  /**
   * 节日
   */
  const festival = computed(() => {
    return getDictionaryOptions(DICTIONARY_KEY.FESTIVAL) || [];
  });
  /**
   * 面料池使用范围
   */
  const scenes = computed(() => {
    return getDictionaryOptions(DICTIONARY_KEY.SCENES) || [];
  });
  /**
   * 印花类型
   */
  const fd_printing = computed(() => {
    return getDictionaryOptions(DICTIONARY_KEY.GD_PRINTING) || [];
  });
  
  /** 弹性 */
  const PLM_ELASTIC_REQUIREMENT = computed(() => getDictionaryOptions(DICTIONARY_KEY.PLM_ELASTIC_REQUIREMENT));
  /**
   * 织造方式
   */
  const aps_category_type = computed(() => {
    return getDictionaryOptions(DICTIONARY_KEY.APS_CATEGORY_TYPE) || [];
  });
  
  /**
   * 项目类型
   */
  const plm_productType = computed(() => {
    return getDictionaryOptions(DICTIONARY_KEY.PLM_PRODUCTTYPE) || [];
  });
  
  /**
   * 尺码组
   */
  const plm_standard_size = computed(() => getDictionaryOptions(DICTIONARY_KEY.PLM_STANDARY_SIZE));
  const colorProps = {
    label: 'label',
    value: 'value',
    multiple: true,
  };
  const getNameChange = (e:any, keyName: string, list: any, row: any) => {
    row[keyName] = list.find((v: { label: string; }) => v.label === e)?.value;
    if (keyName === 'skuClassCode' && row[keyName] === '1') {
      row.suitPiece = undefined;
    }
    if (keyName === 'styleLabelCode') {
      row.styleType = list.find((v: { label: string; }) => v.label === e)?.attributes?.find((v1: { code: string; }) => v1.code === 'clothType')?.name ?? '';
    }
  };
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

  // 批量搜索状态
  const batchSearchState = ref<Record<string, any>>({});
  // 批量设置列值
  const batchSetColumnValue = (
    fieldCode: string,
    fieldName: string,
    value: any,
    label: string,
    extraHandler?: (row: any) => void
  ) => {
    tableData.value = tableData.value.map((row: any) => {
      const newRow = {
        ...row,
        [fieldCode]: value,
        [fieldName]: label,
      };
      if (extraHandler) {
        extraHandler(newRow);
      }
      return newRow;
    });
  };

  // 创建表头批量选择渲染函数
  const createHeaderSelectRender = (
    placeholder: string,
    fieldCode: string,
    fieldName: string,
    options: any[],
    extraHandler?: (row: any, value: any, option: any) => void
  ) => {
    return () => h(ElSelect, {
      modelValue: batchSearchState.value[fieldCode],
      'onUpdate:modelValue': (val: any) => { batchSearchState.value[fieldCode] = val; },
      clearable: true,
      filterable: true,
      placeholder,
      size: 'small',
      style: 'width: 95%;',
      onChange: (val: any) => {
        if (!val && val !== 0) {
          batchSearchState.value[fieldCode] = undefined;
          batchSearchState.value[fieldName] = undefined;
          return;
        }
        const option = options.find((opt: any) => opt.value === val);
        if (option) {
          batchSearchState.value[fieldCode] = val;
          batchSearchState.value[fieldName] = option.label;
          // batchSetColumnValue(fieldCode, fieldName, val, option.label, (row) => {
          //   if (extraHandler) {
          //     extraHandler(row, val, option);
          //   }
          // });
        }
        if (fieldCode === 'styleLabelCode' && val) {
          batchSearchState.value.styleType = options.find((v: { value: string; }) => v.value === val)?.attributes?.find((v1: { code: string; }) => v1.code === 'clothType')?.name;
        }
        props.setForm(batchSearchState.value);
      },
      onClear: () => {
        batchSearchState.value[fieldCode] = undefined;
        batchSearchState.value[fieldName] = undefined;
      },
    }, {
      default: () => options.map((option: any) => h(ElOption, {
        key: option.value,
        label: option.label,
        value: option.value,
        disabled: option.state === 0,
      })),
    });
  };

  const categoryCodeChange = (e: any, row: any) => {
    if (e) {
      const data = findNodeByCodePath(e, pimsCategory.value);
      row.categoryCode = e.join('-');
      row.categoryName = (data || []).join('-');
    } else {
      row.categoryList = [];
      row.categoryCode = '';
      row.categoryName = '';
    }
    // 根据品类第一级的default_size属性设置尺码组
    if (e && e.length > 0) {
      const categoryNodeData = findNodeData(e, pimsCategory.value).at(-1);
      if (categoryNodeData.attributes.length) {
        row.skuClassCode = categoryNodeData?.attributes?.find((v: { code: string; }) => v.code === 'SKU_CLASSIFICATION')?.name;
        row.skuClassName = SKU_CLASSIFICATION.value.find((v: { value: string; }) => v.value === row.skuClassCode)?.label;
        if (row.skuClassCode === '1') {
          row.suitPiece = undefined;
        }
      }
      const firstLevelCategory = findNodeData([e[0]], pimsCategory.value)[0];
      if (firstLevelCategory?.attributes?.length) {
        const defaultSizeAttr = firstLevelCategory.attributes.find((v: { code: string; }) => v.code === 'default_size');
        if (defaultSizeAttr) {
          row.sizeStandardCode = defaultSizeAttr.name;
          row.sizeStandardName = plm_standard_size.value.find((v: { value: string; }) => v.value === defaultSizeAttr.name)?.label || '';
        }
      }
    } else {
      row.sizeStandardCode = undefined;
      row.sizeStandardName = undefined;
    }
  };
  type ColorCascaderTempProps = {
    'show-all-levels': boolean;
    filterable: boolean;
    'collapse-tags': boolean;
    class: string;
    'v-model': any;
    colorProps: any;
    'onUpdate:modelValue': ($event: any) => void;
  };
  const ColorCascaderTemp = ColorCascader as any;
  // eslint-disable-next-line
  const tableColumns = computed<ITableColumnsItem<any>[]>(() => {
    return [
      {
        label: '图片',
        width: '160',
        fixedLeft: true,
        noBorder: true,
        render(row) {
          return (
            <div>
              {
                row.mainImgUrl && (
                  <el-image
                    style='width: 100px; height: 100px'
                    src={resizeImgByWidth(row.mainImgUrl, 200)}
                    onClick={() => {
                      row.mainImgUrl && props.lookImg([row.mainImgUrl || '']);
                    }}
                    fit='cover'
                  />
                )
              }
            </div>
          );
        }
      },
      {
        label: '品类',
        labelClassName: 'mylabelName',
        noBorder: true,
        width: 160,
        headerRender() {
          return h(ElCascader, {
            modelValue: batchSearchState.value.categoryCode,
            'onUpdate:modelValue': (val: any) => { batchSearchState.value.categoryList = val; },
            filterable: true,
            clearable: true,
            placeholder: '批量品类',
            options: pimsCategory.value as any,
            'show-all-levels': true,
            'collapse-tags': true,
            props: { label: 'label', value: 'value', multiple: false },
            size: 'small',
            style: 'width: 97%;',
            onChange: (val: any) => {
              if (!val || val.length === 0) {
                batchSearchState.value.categoryCode = [];
                return;
              }
              // const data = findNodeByCodePath(val, pimsCategory.value);
              batchSearchState.value.categoryCode = val;
              // 根据品类最后一级的SKU_CLASSIFICATION属性批量设置SKU分类
              const categoryNodeData = findNodeData(val, pimsCategory.value).at(-1);
              if (categoryNodeData?.attributes?.length) {
                batchSearchState.value.skuClassCode = categoryNodeData.attributes.find((v: { code: string; }) => v.code === 'SKU_CLASSIFICATION')?.name;
                batchSearchState.value.skuClassName = SKU_CLASSIFICATION.value.find((v: { value: string; }) => v.value === batchSearchState.value.skuClassCode)?.label;
                if (batchSearchState.value.skuClassCode === '1') {
                  batchSearchState.value.suitPiece = undefined;
                }
              }
              // 根据品类第一级的default_size属性批量设置尺码组
              if (val && val.length > 0) {
                const firstLevelCategory = findNodeData([val[0]], pimsCategory.value)[0];
                if (firstLevelCategory?.attributes?.length) {
                  const defaultSizeAttr = firstLevelCategory.attributes.find((v: { code: string; }) => v.code === 'default_size');
                  if (defaultSizeAttr) {
                    batchSearchState.value.sizeStandardCode = defaultSizeAttr.name;
                    batchSearchState.value.sizeStandardName = plm_standard_size.value.find((v: { value: string; }) => v.value === defaultSizeAttr.name)?.label || '';
                  }
                }
              } else {
                batchSearchState.value.sizeStandardCode = undefined;
                batchSearchState.value.sizeStandardName = undefined;
                batchSearchState.value.skuClassCode = undefined;
                batchSearchState.value.skuClassName = undefined;
                batchSearchState.value.suitPiece = undefined;
              }
              props.setForm(batchSearchState.value);
              // tableData.value = tableData.value.map((row: any) => ({
              //   ...row,
              //   categoryList: val,
              //   categoryCode: val.join('-'),
              //   categoryName: (data || []).join('-'),
              // }));
            },
          });
        },
        render(row, _, $index) {
          return (
            <el-form-item
              prop={`${$index}.categoryList`}
              rules={[
                { required: true, message: '请选择品类', trigger: 'change' },
              ]}
            >
              <el-cascader
                filterable
                class='tw-w-150px'
                style='margin-left: auto;'
                placeholder='品类'
                v-model={row.categoryList}
                clearable
                options={pimsCategory.value}
                show-all-levels
                collapse-tags
                props='pimsCategoryProps'
                onChange={($event: any) => {
                  categoryCodeChange($event, row);
                }}
              />
            </el-form-item>
            // <el-cascader
            //   class='tw-w-150px'
            //   style='margin-left: auto;'
            //   placeholder='品类'
            //   v-model={row.categoryList}
            //   clearable
            //   options={pimsCategory.value}
            //   show-all-levels
            //   collapse-tags
            //   props='pimsCategoryProps'
            //   onChange={($event: any) => {
            //     categoryCodeChange($event, row);
            //   }}
            // />
          );
        }
      },
      {
        label: '颜色',
        labelClassName: 'mylabelName',
        width: 200,
        headerRender() {
          const ColorCascaderTemp1 = ColorCascader as any;
          return h(ColorCascaderTemp1, {
            modelValue: batchSearchState.value.colors,
            'onUpdate:modelValue': (val: any) => { batchSearchState.value.colors = val; },
            'show-all-levels': false,
            filterable: true,
            placeholder: '批量颜色',
            colorProps: { label: 'label', value: 'value', multiple: true },
            'collapse-tags': true,
            size: 'small',
            style: 'width: 97%;',
            onChange: (val: any) => {
              if (!val || val.length === 0) {
                batchSearchState.value.colors = [];
                return;
              }
              if (val.length > 6) {
                ElMessage.error('不超过六种颜色');
                batchSearchState.value.colors = val.slice(0, 6);
                val = val.slice(0, 6);
              }
              batchSearchState.value.colors = val;
              props.setForm(batchSearchState.value);
            },
          });
        },
        render(row, _, $index) {
          return (
            <el-form-item
              prop={`${$index}.colorList`}
              rules={[
                { required: true, message: '请选择颜色', trigger: 'change' },
              ]}
            >
              <ColorCascaderTemp
                show-all-levels={false}
                v-model={row.colorList}
                class='tw-w-150px tw-m-l-10px'
                filterable
                colorProps={colorProps}
                collapse-tags
                onUpdate:modelValue={($event: any) => {
                  changeColor($event, row);
                }}
              />
            </el-form-item>
          );
        }
      },
      {
        label: '款式查重',
        width: 160,
        render(row, _index, $index) {
          return (
            <div>
              <div class='tw-text-left'>
                同款（
                { row.sameStyleNum }
                ）
              </div>
              <div class='tw-text-left tw-m-t-5px tw-m-b-5px'>
                相似款（
                { row.similarStylesNum }
                ）
              </div>
              {
                !!(row.sameStyleNum || row.similarStylesNum) && (
                  <div
                    onClick={() => {
                      handleOpenDialog(row);
                    }}
                    class='tw-text-left tw-color-#605CE5 tw-cursor-pointer'
                  >
                    查看
                  </div>
                )
              }
            </div>
          );
        }
      },
      {
        label: '波段',
        width: 160,
        headerRender: () => createHeaderSelectRender('批量波段', 'waveBandCode', 'waveBandName', plmClothingBand.value),
        render(row, _index, $index) {
          return (
            <el-form-item
              prop={`${$index}.waveBandName`}
              rules={[
                { required: false, message: '请选择波段', trigger: 'change' },
              ]}
            >
              <el-select
                clearable
                filterable
                v-model={row.waveBandName}
                placeholder='请选择'
                onClick={() => {
                  row.waveBandCode_loaded = true;
                }}
                style='width: 150px'
                onChange={($event: any) => {
                  getNameChange($event, 'waveBandCode', plmClothingBand.value, row);
                }}
              >
                {plmClothingBand.value.map((option: any) => (
                  <el-option
                    key={option.value}
                    label={option.label}
                    value={option.label}
                  />
                ))}
              </el-select>
            </el-form-item>
          );
        }
      },
      {
        label: '店铺',
        labelClassName: 'mylabelName',
        width: 160,
        headerRender: () => createHeaderSelectRender('批量店铺', 'storeId', 'storeName', shopList.value),
        render(row, _, $index) {
          return (
            <el-form-item
              prop={`${$index}.storeName`}
              rules={[
                { required: true, message: '请选择店铺', trigger: 'change' },
              ]}
            >
              <el-select
                clearable
                filterable
                v-model={row.storeName}
                placeholder='请选择'
                style='width: 150px'
                onClick={() => {
                  row.storeId_loaded = true;
                }}
                onChange={($event: any) => {
                  getNameChange($event, 'storeId', shopList.value, row);
                }}
              >
                {shopList.value.map((option: any) => (
                  <el-option
                    key={option.value}
                    label={option.label}
                    value={option.label}
                  />
                ))}
              </el-select>
            </el-form-item>
          );
        }
      },
      {
        label: '款式类型',
        width: 160,
        headerRender: () => createHeaderSelectRender('批量款式类型', 'designTypeCode', 'designTypeName', styleType.value),
        render(row, _, $index) {
          return (
            <el-form-item
              prop={`${$index}.designTypeName`}
              rules={[
                { required: false, message: '请选择款式类型', trigger: 'change' },
              ]}
            >
              <el-select
                clearable
                filterable
                v-model={row.designTypeName}
                placeholder='请选择'
                style='width: 150px'
                onChange={($event: any) => {
                  getNameChange($event, 'designTypeCode', styleType.value, row);
                }}
              >
                {styleType.value.map((option: any) => (
                  <el-option
                    key={option.value}
                    label={option.label}
                    value={option.label}
                  />
                ))}
              </el-select>
            </el-form-item>
          );
        }
      },
      {
        label: '款式标签',
        labelClassName: 'mylabelName',
        width: 160,
        headerRender: () => createHeaderSelectRender('批量款式标签', 'styleLabelCode', 'styleLabelName', productTag.value),
        render(row, _, $index) {
          return (
            <el-form-item
              prop={`${$index}.styleLabelName`}
              rules={[
                { required: true, message: '请选择款式标签', trigger: 'change' },
              ]}
            >
              <el-select
                clearable
                filterable
                v-model={row.styleLabelName}
                onClick={() => {
                  row.styleLabelCode_loaded = true;
                }}
                placeholder='请选择'
                style='width: 150px'
                onChange={($event: any) => {
                  getNameChange($event, 'styleLabelCode', productTag.value, row);
                }}
              >
                {productTag.value.map((option: any) => (
                  <el-option
                    key={option.value}
                    label={option.label}
                    value={option.label}
                  />
                ))}
              </el-select>
            </el-form-item>
          );
        }
      },
      {
        label: '款式级别',
        labelClassName: 'mylabelName',
        width: 160,
        headerRender: () => createHeaderSelectRender('批量款式级别', 'styleLevelCode', 'styleLevelName', productlevel.value),
        render(row, _, $index) {
          return (
            <el-form-item
              prop={`${$index}.styleLevelName`}
              rules={[
                { required: true, message: '请选择款式级别', trigger: 'change' },
              ]}
            >
              <el-select
                clearable
                filterable
                v-model={row.styleLevelName}
                placeholder='请选择'
                style='width: 150px'
                onClick={() => {
                  row.styleLevelCode_loaded = true;
                }}
                onChange={($event: any) => {
                  getNameChange($event, 'styleLevelCode', productlevel.value, row);
                }}
              >
                {productlevel.value.map((option: any) => (
                  <el-option
                    key={option.value}
                    label={option.label}
                    value={option.label}
                  />
                ))}
              </el-select>
            </el-form-item>
          );
        }
      },
      {
        label: '项目类型',
        width: 160,
        headerRender: () => createHeaderSelectRender('项目类型', 'projectTypeCode', 'projectTypeName', plm_productType.value),
        render(row, _, $index) {
          return (
            <el-form-item
              prop={`${$index}.projectTypeName`}
            >
              <el-select
                clearable
                filterable
                v-model={row.projectTypeName}
                onClick={() => {
                  row.projectTypeCode_loaded = true;
                }}
                placeholder='请选择'
                style='width: 150px'
                onChange={($event: any) => {
                  getNameChange($event, 'projectTypeCode', plm_productType.value, row);
                }}
              >
                {plm_productType.value.map((option: any) => (
                  <el-option
                    key={option.value}
                    label={option.label}
                    value={option.label}
                    disabled={option.state === 0}
                  />
                ))}
              </el-select>
            </el-form-item>
          );
        }
      },
      {
        label: '视觉形式',
        labelClassName: 'mylabelName',
        width: 160,
        headerRender: () => createHeaderSelectRender('批量视觉形式', 'visualFormCode', 'visualFormName', visual_style.value),
        render(row, _, $index) {
          return (
            <el-form-item
              prop={`${$index}.visualFormName`}
              rules={[
                { required: true, message: '请选择视觉形式', trigger: 'change' },
              ]}
            >
              <el-select
                clearable
                filterable
                v-model={row.visualFormName}
                placeholder='请选择'
                style='width: 150px'
                onClick={() => {
                  row.visualFormCode_loaded = true;
                }}
                onChange={($event: any) => {
                  getNameChange($event, 'visualFormCode', visual_style.value, row);
                }}
              >
                {/* row.visualFormCode_loaded &&  */}
                {visual_style.value.map((option: any) => (
                  <el-option
                    key={option.value}
                    label={option.label}
                    value={option.label}
                  />
                ))}
              </el-select>
            </el-form-item>
          );
        }
      },
      {
        label: '前置拆版',
        width: 160,
        headerRender: () => createHeaderSelectRender('批量前置拆版', 'preDisassemblyState', 'preDisassemblyStateName', [{ label: '是', value: 1 }, { label: '否', value: 0 }]),
        render(row, _, $index) {
          return (
            <el-form-item
              prop={`${$index}.preDisassemblyState`}
              rules={[
                { required: false, message: '请选择前置拆版', trigger: 'change' },
              ]}
            >
              <el-select
                v-model={row.preDisassemblyState}
                placeholder='请选择'
                style='width: 150px'
              >
                <el-option
                  label='是'
                  value={1}
                />
                <el-option
                  label='否'
                  value={0}
                />
              </el-select>
            </el-form-item>
          );
        }
      },
      {
        label: '风格',
        labelClassName: 'mylabelName',
        width: 160,
        headerRender: () => createHeaderSelectRender('批量风格', 'clothingStyleCode', 'clothingStyleName', product_style.value),
        render(row, _, $index) {
          return (
            <el-form-item
              prop={`${$index}.clothingStyleName`}
              rules={[
                { required: true, message: '请选择风格', trigger: 'change' },
              ]}
            >
              <el-select
                clearable
                filterable
                v-model={row.clothingStyleName}
                placeholder='请选择'
                style='width: 150px'
                onClick={() => {
                  row.clothingStyleCode_loaded = true;
                }}
                onChange={($event: any) => {
                  getNameChange($event, 'clothingStyleCode', product_style.value, row);
                }}
              >
                {/* row.clothingStyleCode_loaded &&  */}
                {product_style.value.map((option: any) => (
                  <el-option
                    key={option.value}
                    label={option.label}
                    value={option.label}
                  />
                ))}
              </el-select>
            </el-form-item>
          );
        }
      },
      {
        label: '季节',
        labelClassName: 'mylabelName',
        width: 160,
        headerRender: () => createHeaderSelectRender('批量季节', 'seasonCode', 'seasonName', reference_season.value),
        render(row, _, $index) {
          return (
            <el-form-item
              prop={`${$index}.seasonName`}
              rules={[
                { required: true, message: '请选择季节', trigger: 'change' },
              ]}
            >
              <el-select
                clearable
                filterable
                v-model={row.seasonName}
                placeholder='请选择'
                style='width: 150px'
                onChange={($event: any) => {
                  getNameChange($event, 'seasonCode', reference_season.value, row);
                }}
                onClick={() => {
                  row.seasonCode_loaded = true;
                }}
              >
                {reference_season.value.map((option: any) => (
                  <el-option
                    key={option.value}
                    label={option.label}
                    value={option.label}
                  />
                ))}
              </el-select>
            </el-form-item>
          );
        }
      },
      {
        label: '节日',
        width: 160,
        headerRender: () => createHeaderSelectRender('批量节日', 'galaCode', 'galaName', festival.value),
        render(row, _, $index) {
          return (
            <el-form-item
              prop={`${$index}.galaName`}
              // rules={[
              //   { required: true, message: '请选择节日', trigger: 'change' },
              // ]}
            >
              <el-select
                clearable
                filterable
                v-model={row.galaName}
                placeholder='请选择'
                style='width: 150px'
                onChange={($event: any) => {
                  getNameChange($event, 'galaCode', festival.value, row);
                }}
                onClick={() => {
                  row.galaCode_loaded = true;
                }}
              >
                {festival.value.map((option: any) => (
                  <el-option
                    key={option.value}
                    label={option.label}
                    value={option.label}
                  />
                ))}
              </el-select>
            </el-form-item>
          );
        }
      },
      {
        label: '面料池使用范围',
        width: 160,
        headerRender: () => createHeaderSelectRender('批量面料池使用范围', 'sceneCode', 'sceneName', scenes.value),
        render(row, _, $index) {
          return (
            <el-form-item
              prop={`${$index}.sceneName`}
              rules={[
                { required: false, message: '请选择面料池使用范围', trigger: 'change' },
              ]}
            >
              <el-select
                clearable
                filterable
                v-model={row.sceneName}
                placeholder='请选择'
                style='width: 150px'
                onChange={($event: any) => {
                  getNameChange($event, 'sceneCode', scenes.value, row);
                }}
                onClick={() => {
                  row.sceneCode_loaded = true;
                }}
              >
                {scenes.value.map((option: any) => (
                  <el-option
                    key={option.value}
                    label={option.label}
                    value={option.label}
                  />
                ))}
              </el-select>
            </el-form-item>
          );
        }
      },
      {
        label: '印花类型',
        labelClassName: 'mylabelName',
        width: 160,
        headerRender: () => createHeaderSelectRender('批量印花类型', 'printingCode', 'printingName', fd_printing.value),
        render(row, _, $index) {
          return (
            <el-form-item
              prop={`${$index}.printingName`}
              rules={[
                { required: true, message: '请选择印花类型', trigger: 'change' },
              ]}
            >
              <el-select
                clearable
                filterable
                v-model={row.printingName}
                placeholder='请选择'
                style='width: 150px'
                onChange={($event: any) => {
                  getNameChange($event, 'printingCode', fd_printing.value, row);
                }}
                onClick={() => {
                  row.printingCode_loaded = true;
                }}
              >
                {fd_printing.value.map((option: any) => (
                  <el-option
                    key={option.value}
                    label={option.label}
                    value={option.label}
                  />
                ))}
              </el-select>
            </el-form-item>
          );
        }
      },
      {
        label: '版型',
        labelClassName: 'mylabelName',
        width: 160,
        headerRender: () => createHeaderSelectRender('批量版型', 'patternCode', 'patternName', FIT_OPTION.value),
        render(row, _, $index) {
          return (
            <el-form-item
              prop={`${$index}.patternName`}
              rules={[
                { required: true, message: '请选择版型', trigger: 'change' },
              ]}
            >
              <el-select
                clearable
                filterable
                v-model={row.patternName}
                placeholder='请选择'
                style='width: 150px'
                onChange={($event: any) => {
                  getNameChange($event, 'patternCode', FIT_OPTION.value, row);
                }}
                onClick={() => {
                  row.patternCode_loaded = true;
                }}
              >
                {FIT_OPTION.value.map((option: any) => (
                  <el-option
                    key={option.value}
                    label={option.label}
                    value={option.label}
                  />
                ))}
              </el-select>
            </el-form-item>
          );
        }
      },
      {
        label: '弹性',
        labelClassName: 'mylabelName',
        width: 160,
        headerRender: () => createHeaderSelectRender('批量弹性', 'elasticCode', 'elasticName', PLM_ELASTIC_REQUIREMENT.value),
        render(row, _, $index) {
          return (
            <el-form-item
              prop={`${$index}.elasticName`}
              rules={[
                { required: true, message: '请选择弹性', trigger: 'change' },
              ]}
            >
              <el-select
                clearable
                filterable
                v-model={row.elasticName}
                placeholder='请选择'
                style='width: 150px'
                onChange={($event: any) => {
                  getNameChange($event, 'elasticCode', PLM_ELASTIC_REQUIREMENT.value, row);
                }}
                onClick={() => {
                  row.PLM_ELASTIC_REQUIREMENT_loaded = true;
                }}
              >
                {PLM_ELASTIC_REQUIREMENT.value.map((option: any) => (
                  <el-option
                    key={option.value}
                    label={option.label}
                    value={option.label}
                  />
                ))}
              </el-select>
            </el-form-item>
          );
        }
      },
      {
        label: 'SKU分类',
        width: 160,
        headerRender: () => createHeaderSelectRender('批量SKU分类', 'skuClassCode', 'skuClassName', SKU_CLASSIFICATION.value),
        render(row, _, $index) {
          return (
            <div>
              <el-form-item
                prop={`${$index}.skuClassName`}
                rules={[
                  { required: false, message: '请选择SKU分类', trigger: 'change' },
                ]}
              >
                <el-select
                  clearable
                  filterable
                  v-model={row.skuClassName}
                  placeholder='请选择'
                  style='width: 150px'
                  onChange={($event: any) => {
                    getNameChange($event, 'skuClassCode', SKU_CLASSIFICATION.value, row);
                  }}
                  onClick={() => {
                    row.skuClassCode_loaded = true;
                  }}
                >
                  {SKU_CLASSIFICATION.value.map((option: any) => (
                    <el-option
                      key={option.value}
                      label={option.label}
                      value={option.label}
                    />
                  ))}
                </el-select>
              </el-form-item>
              {
                row.skuClassName
                && row.skuClassName !== '单品'
                && (
                  <el-form-item
                    prop={`${$index}.suitPiece`}
                    rules={[
                      { required: true, message: '请输入', trigger: ['change', 'blur'] },
                    ]}
                  >
                    <el-input-number
                      class='tw-w-150px tw-m-t-10px'
                      controls-position='right'
                      v-model={row.suitPiece}
                      min={1}
                      max={9999999}
                      precision={0}
                      step={1}
                      v-slots={{
                        suffix: () => <span>{ row.skuClassName === '套装' ? '套装件数' : '单品数量' }</span>,
                      }}
                    />
                  </el-form-item>
                )
              }
            </div>
          );
        }
      },
      {
        label: '尺码组',
        labelClassName: 'mylabelName',
        width: 160,
        headerRender: () => createHeaderSelectRender('批量尺码组', 'sizeStandardCode', 'sizeStandardName', plm_standard_size.value),
        render(row, _, $index) {
          return (
            <el-form-item
              prop={`${$index}.sizeStandardName`}
              rules={[
                { required: true, message: '请选择尺码组', trigger: 'change' },
              ]}
            >
              <el-select
                clearable
                filterable
                v-model={row.sizeStandardName}
                placeholder='请选择'
                style='width: 150px'
                onChange={($event: any) => {
                  getNameChange($event, 'sizeStandardCode', plm_standard_size.value, row);
                }}
                onClick={() => {
                  row.sizeStandardCode_loaded = true;
                }}
              >
                {plm_standard_size.value.map((option: any) => (
                  <el-option
                    key={option.value}
                    label={option.label}
                    value={option.label}
                  />
                ))}
              </el-select>
            </el-form-item>
          );
        }
      },
      {
        label: '织造方式',
        labelClassName: 'mylabelName',
        width: 160,
        headerRender: () => createHeaderSelectRender('批量织造方式', 'weaveModeCode', 'weaveModeName', aps_category_type.value),
        render(row, _, $index) {
          return (
            <el-form-item
              prop={`${$index}.weaveModeName`}
              rules={[
                { required: true, message: '请选择织造方式', trigger: 'change' },
              ]}
            >
              <el-select
                clearable
                filterable
                v-model={row.weaveModeName}
                placeholder='请选择'
                style='width: 150px'
                onChange={($event: any) => {
                  getNameChange($event, 'weaveModeCode', aps_category_type.value, row);
                }}
                onClick={() => {
                  row.weaveModeCode_loaded = true;
                }}
              >
                {aps_category_type.value.map((option: any) => (
                  <el-option
                    key={option.value}
                    label={option.label}
                    value={option.label}
                  />
                ))}
              </el-select>
            </el-form-item>
          );
        }
      },
      {
        label: '品质等级',
        labelClassName: 'mylabelName',
        width: 160,
        headerRender: () => createHeaderSelectRender('批量品质等级', 'qualityLevelCode', 'qualityLevelName', plm_quality_level.value),
        render(row, _, $index) {
          return (
            <el-form-item
              prop={`${$index}.qualityLevelName`}
              rules={[
                { required: true, message: '请选择品质等级', trigger: 'change' },
              ]}
            >
              <el-select
                clearable
                filterable
                v-model={row.qualityLevelName}
                placeholder='请选择'
                style='width: 150px'
                onChange={($event: any) => {
                  getNameChange($event, 'qualityLevelCode', plm_quality_level.value, row);
                }}
                onClick={() => {
                  row.qualityLevelCode_loaded = true;
                }}
              >
                {plm_quality_level.value.map((option: any) => (
                  <el-option
                    key={option.value}
                    label={option.label}
                    value={option.label}
                  />
                ))}
              </el-select>
            </el-form-item>
          );
        }
      },
      {
        label: '操作',
        width: '100',
        fixed: 'right',
        fixedRight: true,
        render: (row, index, i) => (
          <div
            class='tw-color-red tw-cursor-pointer'
            onClick={() => {
              delFun(i);
            }}
          >
            删除
          </div>
        ),
      },
    ];
  });
  const searchConfig = computed(() => {
    return [
      {
        label: '波段',
        value: 'waveBandCode',
        name: 'waveBandName',
        required: true,
        options: plmClothingBand.value,
      },
      {
        label: '店铺',
        value: 'storeId',
        name: 'storeName',
        required: true,
        options: shopList.value,
      },
      {
        label: '款式标签',
        value: 'styleLabelCode',
        name: 'styleLabelName',
        required: true,
        options: productTag.value,
      },
      {
        label: '款式级别',
        value: 'styleLevelCode',
        name: 'styleLevelName',
        required: true,
        options: productlevel.value,
      },
    ];
  });

  const consumerSalesConfig = computed(() => {
    return [
      {
        label: '视觉形式',
        value: 'visualFormCode',
        name: 'visualFormName',
        required: true,
        options: visual_style.value,
      },
      {
        label: '前置拆版',
        value: 'preDisassemblyState',
        name: 'preDisassemblyStateName',
        required: false,
        options: [
          {
            label: '是',
            value: 1
          },
          {
            label: '否',
            value: 0,
          }
        ],
      },
      {
        label: '风格',
        value: 'clothingStyleCode',
        name: 'clothingStyleName',
        required: true,
        options: product_style.value,
      },
      {
        label: '季节',
        value: 'seasonCode',
        name: 'seasonName',
        required: true,
        options: reference_season.value,
      },
      {
        label: '节日',
        value: 'galaCode',
        name: 'galaName',
        required: true,
        options: festival.value,
      },
      {
        label: '面料池使用范围',
        value: 'sceneCode',
        name: 'sceneName',
        required: true,
        options: scenes.value,
      },
      {
        label: '印花类型',
        value: 'printingCode',
        name: 'printingName',
        required: true,
        options: fd_printing.value,
      },
      {
        label: '版型',
        value: 'patternCode',
        name: 'patternName',
        required: true,
        options: FIT_OPTION.value,
      },
      {
        label: '弹性',
        value: 'elasticCode',
        name: 'elasticName',
        required: true,
        options: PLM_ELASTIC_REQUIREMENT.value,
      },
    ];
  });

  const classificationConfig = computed(() => {
    return [
      {
        label: 'SKU分类',
        value: 'skuClassCode',
        name: 'skuClassName',
        required: true,
        options: SKU_CLASSIFICATION.value,
      },
      {
        value: 'suitPiece',
        name: 'suitPiece',
        correlation: 'skuClassCode',
        required: true,
        type: 'input'
      },
    ];
  });

  const productionLabelConfig = computed(() => {
    return [
      {
        label: '尺码组',
        value: 'sizeStandardCode',
        name: 'sizeStandardName',
        required: true,
        options: plm_standard_size.value,
      },
      {
        label: '织造方式',
        value: 'weaveModeCode',
        name: 'weaveModeName',
        required: true,
        options: aps_category_type.value,
      },
      {
        label: '品质等级',
        value: 'qualityLevelCode',
        name: 'qualityLevelName',
        required: true,
        options: plm_quality_level.value,
      },
    ];
  });
  
  return {
    tableColumns,
    tableData,
    plmClothingBand,
    searchConfig,
    consumerSalesConfig,
    classificationConfig,
    productionLabelConfig,
    pimsCategory,
    CLOTHING_COLOR,
    CLOTHING_COLOR_MAP,
    productTag
  };
};
