export enum STATUS_LIST_ENUM {
  ALL = '',
  WAIT = '0',
  COMPLETED = '1',
  CALL = '2'
}

export const STATUS_LIST = [
  { label: '待指派', value: STATUS_LIST_ENUM.CALL },
  { label: '待提交', value: STATUS_LIST_ENUM.WAIT },
  { label: '已提交', value: STATUS_LIST_ENUM.COMPLETED },
];
