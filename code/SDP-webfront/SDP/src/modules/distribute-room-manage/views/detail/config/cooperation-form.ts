// import { IClothingRoomDetailPlayerListItem } from '../../api/types';
import { PAYMENT_CHANNEL_ENUM } from '@/modules/distribute-room-manage/constant';

export const cooperationFormItem = {
  roomId: '',
  // 地址
  roomAddressProvince: '',
  roomAddressCity: '',
  roomAddressArea: '',
  roomDetailAddress: '',
  // 版房基本联系信息
  roomContactPhone: '',
  roomContactName: '',
  roomCode: '',
  roomContactId: '',
  roomName: '',
  // 人员配置
  personnelAllocation: {
    designMaster: '',
    partTimeMaster: '',
    partTimeMake: '',
    makeMaster: '',
  },
  // 日均产量
  averageDailyOutput: {
    wholeWomenClothing: '',
    makeWomenClothing: '',
    wholeMenClothing: '',
    makeMenClothing: '',
    makeChildrenClothing: '',
    wholeChildrenClothing: '',
  },
  equipmentSituation: '',
  // 服务信息
  serviceType: [] as string[],
  historicalCustomers: '',

  // 财务信息
  accountName: '',
  idCard: '',
  idCardPictureUrl: [] as string[],
  bankCardPictureUrl: [] as string[],
  createdTime: '',
  idCardFrontImage: '',
  idCardBackImage: '',
  idCardImage: '',
  bankFrontImage: '',
  bankBackImage: '',
  bankCardNumber: '',
  openingBank: '',

  paymentChannel: '' as PAYMENT_CHANNEL_ENUM | '',
  taxSubsidyFeeRate: '',
  bankName: '',
  bankProvince: '',
  bankCity: '',

  // 新增的 共享、兼职字段
  enable: 'YES', // 启用状态
  regionId: '',
  // 版房类型 COOPERATIVE_ROOM :合作版房 SHARED_ROOM :共享版房 PART_TIME_ROOM :兼职版房
  externalRoomEnum: '' as
  'COOPERATIVE_ROOM' |
  'SHARED_ROOM' |
  'PART_TIME_ROOM' |
  'SUPPLIER_ROOM',
  goodCategory: [] as string[],
  goodCategorys: [] as string[][],
  goodAtCategory: [] as string[],
  accountType: '',
  busTypes: [] as string[],
  operationType: '',
};
