import { IFile } from '@/components/upload/package/type';
import { v4 as uuid } from 'uuid';

/**
 * 车缝要求项接口定义
 */
export interface ISewingItem {
  tableId: string; // 表id，唯一标识
  parentId: string; // 部件id，用作一级
  componentId?: string; // 部件id，用于模版查询相关
  componentName: string; // 部件名称
  selectedComponentId: string; // 选中的模版部件名称id，默认是componentId
  structuralId: string; // 版型结构分解id，用作二级
  structural?: string; // 版型结构分解内容
  selectedStructuralId: string; // 选中的模版部件的版型结构分解id，默认是structural
  sewingRequireId: string; // 车缝要求id，用作三级
  processRequire?: string; // 车缝要求内容
  // 暂时不用的数据
  processStyleTemplateId?: string; // 工序款式库(模板)ID
  styleName?: string; // 工序款式(模板)名称
  sewingComponentTemplateId?: string; // 工序部件库(模板)ID
  referenceSewingProcessId?: string; // 款式库引用时独有的字段，对应引用时候的sewingProcessId
  sewingProcessId?: string; // 工序款式模板-车缝工序id
}

/**
 * 表格默认值
 * @returns
 */
export const useDefaultItem = () => {
  // 打版尺寸表
  const defaultSizeItem = {
    position: '',
    sizeDimension: '',
    measureWay: '',
    paperSize: '',
    clothingSize: '',
    scope: '',
    remark: '',
  };

  // 部件打版
  const defaultGradingItem = {
    componentName: '',
    url: [] as IFile[],
    plmSewingType: '',
    processName: '',
    sewingRequire: ''
  };

  // 部位车缝要求
  const defaultSewingItem = {
    componentName: '',
    processName: '',
    picture: '',
    url: [] as IFile[],
    sewingType: '',
    sewingTypeName: '',
    processRequire: '',
    processStyleTemplateId: '', // 工序款式库(模板)ID
    styleName: '', // 工序款式(模板)名称
    sewingComponentTemplateId: '', // 工序部件库(模板)ID
    referenceSewingProcessId: '', // 款式库引用时独有的字段，对应引用时候的sewingProcessId
    sewingProcessId: '', // 工序款式模板-车缝工序id
    structural: '', // 版型结构分解
    structurals: [], // 版型结构分解数组
  };

  // 部位车缝要求
  const defaultSewingNewItem = {
    tableId: '', // 表id
    parentId: '', // 部件id
    componentId: '', // 部件id
    componentName: '', // 部件名称
    selectedComponentId: '', // 部件名称缓存
    structuralId: '', // 版型结构分解
    structural: '', // 版型结构分解
    selectedStructuralId: '', // 选中版型结构分解id，默认是structural
    sewingRequireId: '', // 车缝要求
    processRequire: '', // 车缝要求
    processStyleTemplateId: '', // 工序款式库(模板)ID
    styleName: '', // 工序款式(模板)名称
    sewingComponentTemplateId: '', // 工序部件库(模板)ID
    referenceSewingProcessId: '', // 款式库引用时独有的字段，对应引用时候的sewingProcessId
    sewingProcessId: '', // 工序款式模板-车缝工序id
  };

  // 设置默认数据一条
  const setDefaultSewingList = (id: string | number) => {
    return [{
      ...defaultSewingNewItem,
      tableId: id,
      parentId: id,
      structuralId: `${id}_1`,
      processRequireId: `${id}_1_1`
    }];
  };

  // 车缝要求树形数据json转扁平数组
  const getSewingRequireJsonToArray = ({
    list,
    structuralsProp = 'structurals',
  }: {
    list: any;
    isNew?: boolean;
    structuralsProp?: string;
  }) => {
    if (!list || list.length === 0) {
      return [];
    }
    const getRandomId = () => Math.floor(Math.random() * 10000);
    const result: any[] = [];
    list.forEach((componentItem: any, compIndex: number) => {
      const parentId = uuid();
      const { componentName, componentId = '' } = componentItem;

      // 处理 structurals 为空的情况
      if (!componentItem[structuralsProp] || componentItem[structuralsProp].length === 0) {
        const id = `${uuid()}_${compIndex}`;
        result.push({
          ...defaultSewingNewItem,
          tableId: uuid(),
          parentId,
          componentId,
          componentName,
          selectedComponentId: componentId,
          structuralId: id,
          sewingRequireId: `${id}_${getRandomId()}`,
        });
        return;
      }

      // 遍历 structurals
      componentItem[structuralsProp].forEach((structuralItem: any, structIndex: number) => {
        const structuralId = `${parentId}_${structIndex + 1}`;
        const structural = structuralItem.desc || structuralItem.structural || ''; // 兼容审版工艺单和大货资料字段不一样

        // 处理 sewingRequires 为空的情况
        if (!structuralItem.sewingRequires || structuralItem.sewingRequires.length === 0) {
          result.push({
            tableId: uuid(),
            parentId,
            componentId,
            componentName,
            selectedComponentId: componentId,
            structuralId,
            structural,
            selectedStructuralId: structural,
            sewingRequireId: `${structuralId}_${getRandomId()}`,
            processRequire: '',
          });
          return;
        }

        // 遍历 sewingRequires
        structuralItem.sewingRequires.forEach((sewingRequireItem: any, sewIndex: number) => {
          // eslint-disable-next-line vue/max-len
          const sewingRequireId = `${structuralId}_${sewIndex + 1}`;
          const processRequire = sewingRequireItem.desc || '';

          result.push({
            tableId: uuid(),
            parentId,
            componentId,
            componentName,
            selectedComponentId: componentId,
            structuralId,
            structural,
            selectedStructuralId: structural,
            sewingRequireId,
            processRequire,
          });
        });
      });
    });
    return result;
  };

  // 车缝要求树形数据扁平数组转json
  const getSewingRequireArrayToJson = ({
    list,
    structuralsProp = 'structurals',
    structuralProp = 'desc',
  }: {
    list: any[];
    structuralsProp?: string;
    structuralProp?: string;
  }) => {
    if (!list || list.length === 0) {
      return [];
    }
    const result: any = {};

    list.forEach((item: any) => {
      if (!result[item.parentId]) {
        result[item.parentId] = {
          componentId: item.componentId || '',
          componentName: item.componentName,
          structurals: []
        };
      }

      // 检查当前 structuralId 是否已存在于 structurals 数组中
      // eslint-disable-next-line vue/max-len
      let existingStructural = result[item.parentId].structurals.find((s: any) => s.structuralId === item.structuralId);

      if (!existingStructural) {
        existingStructural = {
          structuralId: item.structuralId,
          [structuralProp]: item.structural,
          sewingRequires: []
        };
        result[item.parentId].structurals.push(existingStructural);
      }

      // 添加 sewingRequire 信息
      existingStructural.sewingRequires.push({
        desc: item.processRequire
      });
    });

    const removeStructuralId = (data: any) => {
      return data.map((v: any) => ({
        componentId: v.componentId,
        componentName: v.componentName,
        [structuralsProp]: v?.structurals.map(({ structuralId, ...rest }: any) => ({
          ...rest,
          componentName: v.componentName,
        })) // 过滤掉 structuralId
      }));
    };

    return removeStructuralId(Object.values(result));
  };

  return {
    defaultSizeItem,
    defaultGradingItem,
    defaultSewingItem,
    defaultSewingNewItem,
    setDefaultSewingList,
    getSewingRequireJsonToArray,
    getSewingRequireArrayToJson,
  };
};
