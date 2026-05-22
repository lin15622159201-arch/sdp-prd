export enum STATUS_LIST_ENUM {
  WAIT = '0',
  COMPLETED = '1',
}

export const STATUS_LIST = [
  { label: '待交接', value: STATUS_LIST_ENUM.WAIT },
  { label: '已交接', value: STATUS_LIST_ENUM.COMPLETED },
];
