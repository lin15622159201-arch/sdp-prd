const usePermissionConfig = () => {
  return {
    // 新建
    XJ: 'SDP-JCPZ-FXFBZRF-XJ',
    // 启用
    QY: 'SDP-JCPZ-FXFBZRF-QY',
    // 停用
    TY: 'SDP-JCPZ-FXFBZRF-TY',
    // 点击ID编辑
    BJ: 'SDP-JCPZ-FXFBZRF-BJ',
    // 操作日志
    RZ: 'SDP-JCPZ-FXFBZRF-RZ',
  } as const;
};

export default usePermissionConfig;
