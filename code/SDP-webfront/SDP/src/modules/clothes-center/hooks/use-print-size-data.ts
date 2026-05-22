import { ref, Ref } from 'vue';
import {
  ITemplateDetailedInfoResSizeInfoJsonsItem
} from '@/modules/clothes-center/api/types';
import { ElMessage, ElAutocomplete } from 'element-plus';
import { isEmpty } from '@toy/utils';
import { cloneDeep } from 'lodash-es';
import InputNumber from '@/components/input-number';
import { templateDetailedInfo } from '@/modules/clothes-center/api';
import { IClothesPartsSizeListRes } from '@/api/basis/types';

interface IProps {
  sizeTableList: Ref<ITemplateDetailedInfoResSizeInfoJsonsItem[]>;
  partList: Ref<IClothesPartsSizeListRes>;
}

export const usePrintSizeData = ({
  sizeTableList,
  partList,
  // sizeFormData,
  // referenceSizeTemplateList
}: IProps) => {
  // 打版尺寸表
  const defaultSizeItem: ITemplateDetailedInfoResSizeInfoJsonsItem = {
    position: '',
    positionCode: '',
    positionName: '',
    dimension: '',
    measuringMethod: '',
    remark: '',
    tolerance: '',
    id: '',
    paperSize: '',
    sampleClothesSize: '',
    patternSize: '',
  };
  const inputRefs = ref<Array<InstanceType<typeof InputNumber>>>([]);
  const setInputRef = (el: any, index: number) => {
    inputRefs.value[index] = el;
  };
  const handleAddSize = (index: number, row?: ITemplateDetailedInfoResSizeInfoJsonsItem) => {
    const item = cloneDeep(defaultSizeItem);
    if (sizeTableList.value.length <= 1) {
      sizeTableList.value?.push({
        ...item,
        id: String(Date.now())
      });
      return;
    }
    sizeTableList.value?.splice(index + 1, 0, {
      ...item,
      id: String(Date.now())
    });
  };

  const handleRemoveSize = (index: number) => {
    sizeTableList.value?.splice(index, 1);
  };

  const handleSizeReference = async (code?: string) => {
    if (code) {
      const { data } = await templateDetailedInfo({ templateCode: code! });
      if (data.sizeInfoJsons.length === 0) {
        ElMessage.warning('对应模板已失效，请选择其他模板进行引用');
        return;
      }
      const list: ITemplateDetailedInfoResSizeInfoJsonsItem[] = (data.sizeInfoJsons || []).map((item, index) => {
        return {
          ...defaultSizeItem,
          position: item.position ?? '',
          positionCode: item.positionCode ?? '',
          positionName: item.position ?? '',
          dimension: item.dimension ?? '',
          measuringMethod: item.measureMethod ?? '',
          remark: item.remark ?? '',
          tolerance: item.errorRange ?? '',
          id: `${Date.now()}${index}`,
        };
      });
      sizeTableList.value = cloneDeep(list);
    }
  };

  // 部位 带出 尺寸维度、允差范围
  const handleChangePart = (val: string, row: ITemplateDetailedInfoResSizeInfoJsonsItem, index: number) => {
    const item = partList.value?.find(v => v.partsSizeCode === val);
    row.dimension = item?.sizeDimensions ?? '';
    if (item?.partsMeasurementVOList.length === 1) {
      row.measuringMethod = item.partsMeasurementVOList[0].measuringMethod;
    } else {
      row.measuringMethod = '';
    }
    row.tolerance = item?.errorRange ?? '';
    row.positionName = item?.clothesPartsName ?? '';
  };
  // 设置量法推荐值
  const querySearchMeasureWay = (partsSizeCode: string, callback: Function) => {
    if (isEmpty(partsSizeCode)) {
      callback([]);
      return;
    }
    const row = partList.value?.find(v => v.partsSizeCode === partsSizeCode);
    callback(row?.partsMeasurementVOList.map(v => ({ value: v.measuringMethod })) || []);
  };

  const autoCompleteRefs = ref<Array<InstanceType<typeof ElAutocomplete>>>([]);
  const setAutoCompleteRef = (el: any, index: number) => {
    autoCompleteRefs.value[index] = el;
  };

  return {
    sizeTableList,
    handleAddSize,
    handleRemoveSize,
    handleSizeReference,
    querySearchMeasureWay,
    handleChangePart,
    setAutoCompleteRef,
    inputRefs,
    setInputRef
  };
};
