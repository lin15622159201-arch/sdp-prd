const usePermissionConfig = () => {
  return {
    // 新建
    XJ: 'SDP-JCPZ-YCZRBM-XJ',
    // 启用
    QY: 'SDP-JCPZ-YCZRBM-QY',
    // 停用
    TY: 'SDP-JCPZ-YCZRBM-TY',
    // 点击ID编辑
    BJ: 'SDP-JCPZ-YCZRBM-BJ',
    // 操作日志
    RZ: 'SDP-JCPZ-YCZRBM-RZ',
  } as const;
};

export default usePermissionConfig;
