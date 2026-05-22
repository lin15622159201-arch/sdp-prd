const usePermissionConfig = () => {
  return {
    // 新增设计组别
    XZSJZB: 'SDP-JCPZ-SJZB-XZSJZB',
    // 编辑设计组别
    BJSJZB: 'SDP-JCPZ-SJZB-BJSJZB',
    // 删除设计组别
    SCSJZB: 'SDP-JCPZ-SJZB-SCSJZB',

    // 新增员工
    XZYG: 'SDP-JCPZ-SJZB-XZYG',
    // 转移员工
    ZYYG: 'SDP-JCPZ-SJZB-ZYYG',
    // 删除员工
    SCYG: 'SDP-JCPZ-SJZB-SCYG',

  } as const;
};

export default usePermissionConfig;
