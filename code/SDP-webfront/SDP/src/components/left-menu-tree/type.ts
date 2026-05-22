export interface ILeftMenuTreeItem {
  resourceName: string;
  resourceUrl?: string;
  disabled?: boolean;
  childList?: ILeftMenuTreeItem[];
  count?: string | number;
  isCount?: boolean;// count不存在时，是否添加后缀（0），默认ture展示
  [propName: string]: any;
}
