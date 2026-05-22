const usePermissionConfig = () => {
  return {
    // 新建
    XJ: 'SDP-JCPZ-BWMC-XJ',
    // 启用
    QY: 'SDP-JCPZ-BWMC-QY',
    // 停用
    TY: 'SDP-JCPZ-BWMC-TY',
    // 点击ID编辑
    BJ: 'SDP-JCPZ-BWMC-BJ',
    // 操作日志
    RZ: 'SDP-JCPZ-BWMC-RZ',
  } as const;
};

export default usePermissionConfig;
