export type IBomQuoteSkcReq = Record<string, unknown>;
/**
   * 响应数据
   */
export interface IBomQuoteSkcRes {
  /**
   * bomId
   */
  bomId: string;
  /**
    * bom引用类型: 1-套版款; 2-衍生款; 3-复色款; 4-CRM改款; 5-设计改款;
    * {@link BomQuoteTypeEnum}
    */
  bomQuoteType: string;
  /**
    * 引用设计款号。 skc+年月日+4位流水号
    */
  quoteDesignCode: string;
  /**
    * 引用款对应bom单Id(已提交/已核算状态)
    */
  quoteBomId: string;
  /**
    * 引用款对应bom单版本
    */
  quoteBomVersionNum: string;
  /**
    * 暂存状态: 0:否; 1,是(默认0)  --v3.5.1
    */
  transientState: string;
}
