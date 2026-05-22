export enum STATUS_LIST_ENUM {
  WAIT = '0',
  COMPLETED = '1',
}

export const STATUS_LIST = [
  { label: '待审版', value: STATUS_LIST_ENUM.WAIT },
  { label: '已审版', value: STATUS_LIST_ENUM.COMPLETED },
];

export enum RESULT_LIST_ENUM {
  NOTPASS = '0',
  PASS = '1',
  BACK = '2',
}

export const RESULT_LIST = [
  { label: '通过', value: RESULT_LIST_ENUM.PASS },
  { label: '返修', value: RESULT_LIST_ENUM.BACK },
  { label: '不通过', value: RESULT_LIST_ENUM.NOTPASS },
];
