function usePermissionConfig() {
  return {
    /** 生产资料管理 - 款式号 - 跳转编辑 */
    KSH: 'PLM-SCZLGL-KSH-TUIKUAN',
    /** 生产资料管理 - 款式号 - 跳转详情 */
    KSHXQ: 'PLM-SCZLGL-KSH-XQ-TUIKUAN',
    /** 生产资料管理 - 核价信息 */
    HJXX: 'PLM-SCZLGL-HJXX-TUIKUAN',
    /** 生产资料管理 - 编辑订单信息 */
    BJDD: 'PLM-SCZLGL-BJDD-TUIKUAN',
    /** 生产资料管理 - 生产资料 - 上传附件 */
    SCFJ: 'PLM-SCZLGL-SCFJ-TUIKUAN',
    /** 生产资料管理 - 生产资料 - 保存BOM */
    BCBOM: 'PLM-SCZLGL-BCBOM-TUIKUAN',
    /** 生产资料管理 - 生产资料 - 保存工艺要求 */
    BCGY: 'PLM-SCZLGL-BCGY-TUIKUAN',
    /** 生产资料管理 - 生产资料 - 保存尺寸 */
    BCCC: 'PLM-SCZLGL-BCCC-TUIKUAN',
    /** 生产资料管理 - 生产资料 - 保存其他要求 */
    BCQT: 'PLM-SCZLGL-BCQT-TUIKUAN',
    /** 生产资料管理 - 生产资料 - 提交 */
    TJ: 'PLM-SCZLGL-TJ-TUIKUAN',

    /** 生产资料管理 - 操作日志 暂不使用 */
    CZRZ: 'PLM-SCZLGL-CZRZ-TUIKUAN',
    /** 生产资料管理 - 新增备注 暂不使用 */
    XZBZ: 'PLM-SCZLGL-XZBZ-TUIKUAN',

    /** 生产资料管理 - 大货bom - 款式号 */
    BOMKSH: 'PLM-SCZLGL-BOM-KSH-TUIKUAN',

    // 推款新加
    /** 推款大货bom - 款式号 */
    TUIKUAN_BOM_KSH: 'PLM-SCZLGL-TUIKUAN-BOM-KSH',
    /** 推款生产资料 - 款式号 */
    TUIKUAN_PRODUCTION_KSH: 'PLM-SCZLGL-TUIKUAN-PRODUCTION-KSH',
    /** 推款生产资料 - 提交 */
    TUIKUAN_PRODUCTION_TJ: 'PLM-SCZLGL-TUIKUAN-PRODUCTION-TJ',
    /** 推款生产资料 - 保存尺寸表 */
    TUIKUAN_PRODUCTION_BCCCB: 'PLM-SCZLGL-TUIKUAN-PRODUCTION-BCCCB',
    /** 推款生产资料 - 上传附件 */
    TUIKUAN_PRODUCTION_SCFJ: 'PLM-SCZLGL-TUIKUAN-PRODUCTION-SCFJ',
    /** 推款生产资料 - 保存其他 */
    TUIKUAN_PRODUCTION_BCQT: 'PLM-SCZLGL-TUIKUAN-PRODUCTION-BCQT',
  } as const;
}

export default usePermissionConfig;
