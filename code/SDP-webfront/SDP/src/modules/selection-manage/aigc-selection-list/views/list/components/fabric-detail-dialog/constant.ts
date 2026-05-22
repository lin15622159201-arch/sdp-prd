export enum SKU_TYPE {
  ALL,
  // 纹理色块图
  SKU_IMAGE,
  // sku code
  SKU_CODE
}

export const SKU_TYPE_LIST = [
  { value: SKU_TYPE.ALL, label: '色块图' },
  { value: SKU_TYPE.SKU_IMAGE, label: '纹理色块图' },
];
