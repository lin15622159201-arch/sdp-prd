const usePermissionConfig = () => {
  return {
    // 下载纸样文件
    XZ: 'SDP-ZYK-DHZYK-XZ',
    // 操作日志
    RZ: 'SDP-ZYK-DHZYK-RZ',
  } as const;
};

export default usePermissionConfig;
