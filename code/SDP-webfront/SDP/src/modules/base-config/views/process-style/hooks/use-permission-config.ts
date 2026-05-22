const usePermissionConfig = () => {
  return {
    // 新建
    XJ: 'SDP-JCPZ-GXKSK-XJ',
    // 启用
    QY: 'SDP-JCPZ-GXKSK-QY',
    // 停用
    TY: 'SDP-JCPZ-GXKSK-TY',
    // 编辑
    BJ: 'SDP-JCPZ-GXKSK-BJ',
    // 操作日志
    RZ: 'SDP-JCPZ-GXKSK-CZRZ',
  } as const;
};

export default usePermissionConfig;
