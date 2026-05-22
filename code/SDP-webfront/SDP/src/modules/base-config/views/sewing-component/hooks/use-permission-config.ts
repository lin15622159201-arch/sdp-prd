const usePermissionConfig = () => {
  return {
    // 新建
    XJ: 'SDP-JCPZ-GXBJK-XJ',
    // 启用
    QY: 'SDP-JCPZ-GXBJK-QY',
    // 停用
    TY: 'SDP-JCPZ-GXBJK-TY',
    // 编辑
    BJ: 'SDP-JCPZ-GXBJK-BJ',
    // 操作日志
    RZ: 'SDP-JCPZ-GXBJK-CZRZ',
    // 导入
    DR: 'SDP-JCPZ-GXBJK-DR',
  } as const;
};

export default usePermissionConfig;
