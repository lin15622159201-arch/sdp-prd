export interface ISCategoryReq {
  /**
   * 编码
   */
  code?: string;
  /**
   * 是否可用
   */
  enable?: string;
  /**
   * 主键Id
   */
  id?: string;
  /**
   * 值
   */
  value?: string;
  children?: ChiInter[];
}


export interface ChiInter {
  /**
   * 编码
   */
  code?: string;
  /**
   * 是否可用
   */
  enable?: string;
  /**
   * 主键Id
   */
  id?: string;
  /**
   * 值
   */
  value?: string;
  children?: ChiInter[];
}
