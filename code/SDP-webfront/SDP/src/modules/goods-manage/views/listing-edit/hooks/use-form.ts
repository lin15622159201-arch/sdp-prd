import type { IStyleOnShelvesPageItemSkcItem } from '@/modules/goods-manage/api/listing/type';
import { FormRules, type FormInstance } from 'element-plus';
import { ref, computed } from 'vue';
import { onBeforeRouteLeave } from 'vue-router';
import { IFile } from '@/components/uploader/packages/types';
import { IStyleOnShelevesDetailSkcItem, IStyleOnShelvesDetailRes } from '@/modules/goods-manage/api/listing/type';
import {
  TemuLogisticsTemplateResItem,
  TemuPartResItem,
  ProductReviewRes,
} from '@/api/temu/type';
import { useDictionary } from '@/hooks/use-dictionary';
import { DICTIONARY_KEY } from '@/constant/dictionary';
import { TemuWarehouseResItem } from '../api/types';

/**
 * 裁剪图片项类型
 * url：裁剪后图片地址，用于uploader组件显示
 * originUrl：裁剪前图片地址
 */
export type IImageItem = IFile & {
  /** 从库里面选的图片，有pictureId，自己上传的没有 */
  pictureId?: string;
  /** 原始图片地址 */
  originUrl?: string;
};

export type IFormDataSkcItem = Omit<IStyleOnShelvesPageItemSkcItem, 'selectedPictures'> & {
  selectedPictures: IImageItem[];
  skuList?: any;
};

interface SizeRow {
  size: string | undefined;
  suggestedPrice: number | undefined;
  length: number | undefined;
  width: number | undefined;
  height: number | undefined;
  weight: number | undefined;
  skuCategory: string;
  skc: IStyleOnShelevesDetailSkcItem;
  numberOfPieces?: number;
  individuallyPacked?: number;
  numberOfPack?: number;
}

export type IFormData = {
  /** 尺码标准 */
  sizeStandardCode?: string;
  /** 承诺发货时效 */
  promisedDeliveryDay: string;
  /** skc列表 */
  skcList: IFormDataSkcItem[];
  /** 运费模板Id */
  freightTemplateId?: string;
};


export interface TABELDATA {
  tableData?: any;
  sizeParts?: TemuPartResItem[];
  show?: string;
  name?: string;
}
// 需要回显的集合
const echoList = ref<{ name: string; key: string; }[]>([
  {
    name: '细节',
    key: 'details',
  },
  {
    name: '图案',
    key: 'pattern',
  },
  {
    name: '季节',
    key: 'seasonName',
  },
  {
    name: '风格',
    key: 'fabricStyle',
  },
  {
    name: '印花类型',
    key: 'printingName',
  },
  {
    name: '材质',
    key: 'fabricMaterial',
  },
  {
    name: '是否透明',
    key: 'transparency',
  },
  {
    name: '面料弹性',
    key: 'elasticName',
  },
  {
    name: '织造方式',
    key: 'weaveModeName',
  },
  {
    name: '面料纹理1',
    key: 'fabricTexture',
  },
  {
    name: '成分',
    key: 'styleIngredient',
  },
  {
    name: '材质',
    key: 'fabricMaterial',
  },
]);
// 内部尺码映射temu
const sizeMappingList = ref([
  {
    internalSize: 'F',
    temuSize: 'one-size',
  },
  {
    internalSize: '2XL',
    temuSize: 'XXL',
  },
  {
    internalSize: '2XL',
    temuSize: 'XXL',
  },
  {
    internalSize: '2XS',
    temuSize: 'XXS',
  },
]);
const formRef = ref<FormInstance | null>(null);
const formData = ref<IFormData>({
  promisedDeliveryDay: '',
  skcList: [],
});
interface TEMPLATE {
  templateId: string;
  templateName: string;
  temps: any;
  catId?: string;
  parts?: string[];
}
/** 是否套装 */
const suiting = ref<number | null>();
const warehouseList = ref<TemuWarehouseResItem[]>([]);
const ruleForm = ref<FormInstance>();
const tableSizeData = ref<SizeRow[]>([]);
const formAttrsData = ref<any[]>([]);
const sizeList = ref<any>([]);
const sizeFormDate = ref<any>([]);
const sizeParts = ref<TemuPartResItem[]>([]);
const tableDataList = ref<TABELDATA[]>([
  {
    tableData: [],
    sizeParts: JSON.parse(JSON.stringify(sizeParts.value)),
    show: 'YES',
    name: '',
  }
]);
const temuLogisticsList = ref<TemuLogisticsTemplateResItem[]>([]);
const form = ref({
  warehouseIds: [{
    warehouseId: '',
  }],
} as any);
const detailData = ref<IStyleOnShelvesDetailRes>({} as IStyleOnShelvesDetailRes);
const sizeAttr = ref([]);
const colorAttr = ref([]);
const colorOptions = ref<any>([]);
// 引用模板
const sizeTempList = ref<TEMPLATE[]>([]);
// 审核失败的数据回显
const temuReviewDatas = ref<ProductReviewRes>({});
const theFirstTime = ref(false);
const productId = ref('');
// 缓存刷新前的素材图
const refreshMaterialImgUrl = ref('');
// 缓存视频
const videoUrl = ref('');
// 缓存skc
const skcList = ref<any>([]);
// 获取品类所有末级
const categoryFinalStage = ref<any>([]);
export const useForm = () => {
  const { getDictionaryOptions } = useDictionary();
  /** temu销售属性默认值 */
  const temu_defaultValue = computed(() => {
    return getDictionaryOptions(DICTIONARY_KEY.TEMU_DEFAULTVALUE);
  });
  const formRules: FormRules = {
    promisedDeliveryDay: [{ required: true, message: '请选择承诺发货时效', trigger: 'change' }],
  };
  temu_defaultValue.value.map(v => v);
  // 路由离开前清空数据，防止内存泄漏
  onBeforeRouteLeave(async () => {
    // 延迟清空，确保数据被正确提交或取消
    setTimeout(() => {
      formData.value = {} as IFormData;
      formRef.value = null;
      tableSizeData.value = [];
      temuReviewDatas.value = {};
      form.value = {
        warehouseIds: [{
          warehouseId: '',
        }],
      } as any;
      detailData.value = {} as any;
      sizeList.value = [];
      sizeParts.value = [];
      tableDataList.value = [
        {
          tableData: [],
          sizeParts: JSON.parse(JSON.stringify(sizeParts.value)),
          show: 'YES',
          name: '',
        }
      ];
      warehouseList.value = [];
    }, 2000);
  });

  return {
    formRef,
    formData,
    formRules,
    tableSizeData,
    formAttrsData,
    sizeList,
    sizeFormDate,
    sizeParts,
    tableDataList,
    temuLogisticsList,
    form,
    detailData,
    sizeAttr,
    colorAttr,
    colorOptions,
    sizeTempList,
    temuReviewDatas,
    theFirstTime,
    productId,
    refreshMaterialImgUrl,
    videoUrl,
    skcList,
    echoList,
    temu_defaultValue,
    sizeMappingList,
    ruleForm,
    warehouseList,
    categoryFinalStage,
    suiting,
  };
};
