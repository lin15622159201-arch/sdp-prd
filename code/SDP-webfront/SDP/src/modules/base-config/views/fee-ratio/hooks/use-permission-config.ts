const usePermissionConfig = () => {
  return {
    // 新建
    XJ: 'SDP-JCPZ-WFBFBL-XJ',
    // 启用
    QY: 'SDP-JCPZ-WFBFBL-QY',
    // 停用
    TY: 'SDP-JCPZ-WFBFBL-TY',
    // 点击ID编辑
    BJ: 'SDP-JCPZ-WFBFBL-BJ',
    // 操作日志
    RZ: 'SDP-JCPZ-WFBFBL-RZ',
  } as const;
};

export default usePermissionConfig;
