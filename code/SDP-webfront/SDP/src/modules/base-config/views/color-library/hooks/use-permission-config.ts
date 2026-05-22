const usePermissionConfig = () => {
  return {
    /** 控制 新增颜色类别 */
    XZYSLB: 'SDP-JCPZ-YSK-XZYSLB',
    /** 控制 编辑颜色类别 */
    BJYSLB: 'SDP-JCPZ-YSK-BJYSLB',
    /** 控制 启停用颜色类别 */
    QTYYSLB: 'SDP-JCPZ-YSK-QTYYSLB',

    /** 控制 新增颜色 */
    XZYS: 'SDP-JCPZ-YSK-XZYS',
    /** 控制 编辑颜色 */
    BJYS: 'SDP-JCPZ-YSK-BJYS',
    /** 控制 启停用颜色 */
    QTYYS: 'SDP-JCPZ-YSK-QTYYS',
    /** 控制 查看款式 */
    CKKS: 'SDP-JCPZ-YSK-CKKS',
  } as const;
};

export default usePermissionConfig;
