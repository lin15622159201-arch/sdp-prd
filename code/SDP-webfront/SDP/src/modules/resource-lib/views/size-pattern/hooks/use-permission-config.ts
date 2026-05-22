const usePermissionConfig = () => {
  return {
    // 查看尺寸表
    CCB: 'SDP-ZYK-KFCCK-CCB',
    // 操作日志
    RZ: 'SDP-ZYK-KFCCK-RZ',
  } as const;
};

export default usePermissionConfig;
