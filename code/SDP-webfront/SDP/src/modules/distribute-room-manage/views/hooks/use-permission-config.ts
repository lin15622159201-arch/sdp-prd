import { getExternalRoomEnum, getRoomEnumForDetailRouter } from '../../utils';
import { EXTERNAL_ROOM_ENUM } from '../../constant';

const premissonMaps = {
  [EXTERNAL_ROOM_ENUM.COOPERATIVE_ROOM]: {
    // 重置密码
    CZMM: 'SDP-WBFGL-HZBF-CZMM',
    // 新增版房
    XZBF: 'SDP-WBFGL-HZBF-XZBF',
    // 版房详情
    BFXQ: 'SDP-WBFGL-HZBF-BFXQ',
    // 启用状态
    QYZT: 'SDP-WBFGL-HZBF-QYZT',
    // 版房编辑
    BFBJ: 'SDP-WBFGL-HZBF-BFBJ',
  },
  [EXTERNAL_ROOM_ENUM.SHARED_ROOM]: {
    // 重置密码
    CZMM: 'SDP-WBFGL-GXBF-CZMM',
    // 新增版房
    XZBF: 'SDP-WBFGL-GXBF-XZBF',
    // 版房详情
    BFXQ: 'SDP-WBFGL-GXBF-BFXQ',
    // 启用状态
    QYZT: 'SDP-WBFGL-GXBF-QYZT',
    // 版房编辑
    BFBJ: 'SDP-WBFGL-GXBF-BFBJ',
  },
  [EXTERNAL_ROOM_ENUM.PART_TIME_ROOM]: {
    // 重置密码
    CZMM: 'SDP-WBFGL-JZRY-CZMM',
    // 新增版房
    XZBF: 'SDP-WBFGL-JZRY-XZBF',
    // 版房详情
    BFXQ: 'SDP-WBFGL-JZRY-BFXQ',
    // 启用状态
    QYZT: 'SDP-WBFGL-JZRY-QYZT',
    // 版房编辑
    BFBJ: 'SDP-WBFGL-JZRY-BFBJ',
  },
};
function getPermission() {
  const type = getExternalRoomEnum();

  return premissonMaps[type as keyof typeof premissonMaps];
}

const usePermissionConfig = () => {
  return {
    // 重置密码
    CZMM: getPermission().CZMM,
    // 新增版房
    XZBF: getPermission().XZBF,
    // 版房详情
    BFXQ: getPermission().BFXQ,
    // 启用状态
    QYZT: getPermission().QYZT,
    // 版房编辑
    BFBJ: getPermission().BFBJ,

  } as const;
};

function getPermissionDetail() {
  const type = getRoomEnumForDetailRouter();

  return premissonMaps[type as keyof typeof premissonMaps];
}

export const usePermissionDetail = () => {
  return {
    // 版房编辑
    BFBJ: getPermissionDetail()?.BFBJ,

  } as const;
};

export default usePermissionConfig;
