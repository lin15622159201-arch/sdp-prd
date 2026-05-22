const usePermissionConfig = () => {
  return {
    // 查看bom表
    BOM: 'SDP-ZYK-KFBOMK-BOM',
    // 操作日志
    RZ: 'SDP-ZYK-KFBOMK-RZ',
  } as const;
};

export default usePermissionConfig;
