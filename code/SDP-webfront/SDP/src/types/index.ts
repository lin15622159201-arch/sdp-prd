import { ElCol, ElRow, TagProps } from 'element-plus';

export type IElCol = InstanceType<typeof ElCol>['$props'];

export type IElRow = InstanceType<typeof ElRow>['$props'];

export interface IOption<T = string> {
  value: T;
  label: string;
  disabled?: boolean;
  style?: TagProps['type'];
}
