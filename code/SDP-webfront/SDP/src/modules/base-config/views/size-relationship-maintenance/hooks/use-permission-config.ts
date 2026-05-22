function usePermissionConfig() {
  return {
    /** 新增 尺码关系维护 */
    XZ: 'SDP-JCPZ-CMGXWH-XZ',
    /** 编辑 尺码关系维护 */
    BJ: 'SDP-JCPZ-CMGXWH-BJ',
    /** 删除 尺码关系维护 */
    SC: 'SDP-JCPZ-CMGXWH-SC',
    /** 配置 尺码组配置 */
    PZ: 'SDP-JCPZ-CMGXWH-PZ',
  } as const;
}

export default usePermissionConfig;
