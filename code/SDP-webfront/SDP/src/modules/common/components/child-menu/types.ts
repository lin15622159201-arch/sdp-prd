export interface IMathMenuItem {
  resourceName: string;
  resourceUrl?: string;
  disabled?: boolean;
  childList?: IMathMenuItem[];
  count?: string | number;
  // eslint-disable-next-line no-use-before-define
  groups?: IgroupsItem[];
  isCount?: boolean;// count不存在时，是否添加后缀（0），默认ture展示
  [propName: string]: any;
}

interface IgroupsItem {
  name?: string;
  childList?: IMathMenuItem[];
}

export type TRenderFunc = () => JSX.Element;
