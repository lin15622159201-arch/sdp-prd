const usePermissionConfig = () => {
  return {
    // 新增纸样组别
    XZZB: 'SDP-JCPZ-ZYZB-XZZYZB',
    // 编辑纸样组别
    BJZB: 'SDP-JCPZ-ZYZB-BJZYZB',
    // 删除纸样组别
    SCZB: 'SDP-JCPZ-ZYZB-SCZYZB',

    // 新增员工
    XZYG: 'SDP-JCPZ-ZYZB-XZYG',
    // 转移员工
    ZYYG: 'SDP-JCPZ-ZYZB-ZYYG',
    // 删除员工
    SCYG: 'SDP-JCPZ-ZYZB-SCYG',

  } as const;
};

export default usePermissionConfig;
