const usePermissionConfig = () => {
  return {
    // 新建权限
    XJ: 'SDP-JCPZ-QXYY-XJ',
    // 启用权限
    QY: 'SDP-JCPZ-QXYY-QY',
    // 停用权限
    TY: 'SDP-JCPZ-QXYY-TY',
    // 编辑权限
    BJ: 'SDP-JCPZ-QXYY-BJ',
    // 操作日志权限
    CZRZ: 'SDP-JCPZ-QXYY-CZRZ',
  } as const;
};

export default usePermissionConfig;
