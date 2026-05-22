import { OPEN_STYLE_STATUS_ENUM } from '@/modules/selection-manage/aigc-selection-result/constant';

export interface ITableItem {
  id: string;
  /** 灵感编号 */
  inspirationCode: string;
  /** 跑图编号 */
  runCode: string;
  /** 灵感图 */
  inspirationImage: string;
  /** 结果图 */
  resultImgs: string[];
  /** 建议店铺 */
  shopName: string;
  /** 建议站点 */
  countryName: string;
  /** 开款信息 */
  paymenStatus: OPEN_STYLE_STATUS_ENUM;
  /** 款号 */
  styleNum: string;
  /** 淘汰原因 */
  styleEliminateReason: string;
  /** 选款信息 */
  selector: string;
  selectedTime: string;
  origin?: string;
  postureFissionRefImgUrl?: string;
  /** 花型上身任务参考图 */
  sourceImage?: string;
  refImgUrl?: string;
}
