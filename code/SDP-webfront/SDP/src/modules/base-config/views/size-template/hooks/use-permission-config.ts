const usePermissionConfig = () => {
  return {
    // 新建
    XJ: 'SDP-JCPZ-CCBMB-XJ',
    // 启用
    QY: 'SDP-JCPZ-CCBMB-QY',
    // 停用
    TY: 'SDP-JCPZ-CCBMB-TY',
    // 编辑
    BJ: 'SDP-JCPZ-CCBMB-BJ',
    // 操作日志
    RZ: 'SDP-JCPZ-CCBMB-CZRZ',
  } as const;
};

export default usePermissionConfig;
