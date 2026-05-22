<template>
  <div
    id="design-order-multi-print"
    class="design-order-multi-print"
    style="width: 800px;"
  >
    <section>
      <div v-for="(item, index) in innerPrintInfoDataList" :key="index">
        <table class="table" style="table-layout: fixed; page-break-after: always;">
          <tbody>
            <tr class="header-tr">
              <td colspan="3" class="title">
                依布云制版单{{ type === 'analy' ? '（外发）' : '' }}
              </td>
              <td>
                <span v-if="type === 'analy'" style="color: red; font-size: 16px;">
                  {{ item.sampleAmount || ' ' }}件-{{ item.color || ' ' }}-{{ item.sampleSize || ' ' }}
                </span>
              </td>
            </tr>
            <tr>
              <td><span>SKC：{{ item.designCode }}</span></td>
              <td><span>款式号：{{ item.styleCode }}</span></td>
              <td><span>设计师：{{ item.designerName }}</span></td>
              <td rowspan="3" class="qrcode-td">
                <img :src="item.codeUrl">
              </td>
            </tr>
            <tr>
              <td>
                <span>款式来源：</span>
              </td>
              <td><span>需求类型：</span></td>
              <td>
                <span>打版类型：{{
                  item.isMakeMore
                    ? getLabelByVal(DESIGN_SAMPLE_TYPE_LIST, '4')
                    : getLabelByVal(DESIGN_SAMPLE_TYPE_LIST, item.sampleType!)
                }}</span>
              </td>
            </tr>
            <tr>
              <td><span>客户款号：</span></td>
              <td>
                交期时间：
                <!-- <span v-if="item.quoteDesignCode">原款SKC：{{ item.quoteDesignCode }}</span>
                <span v-else>交期时间：{{ formatTime(item.planDeliveryTime, 'YYYY-MM-DD') }}</span> -->
              </td>
              <td>
                给样衣：
                <!-- <span
                  v-if="item.quoteDesignCode"
                >制作方式：{{ getLabelByVal(MAKE_CLOTHES_TYPE_LIST, item.makeClothesType) }}</span>
                <span v-else>给样衣：{{ getLabelByVal(BOOLEAN_LIST, item.isDeliveryPurchaserSample) }}</span> -->
              </td>
            </tr>
            <tr>
              <td colspan="3" class="special-td">
                <table class="inner-table">
                  <tr>
                    <td>
                      <span>末级分类：{{ item.categoryName
                        ? (getCategoryNameByLastIndex(item.categoryName, 1))
                        : ''
                      }}</span>
                    </td>
                    <td>
                      <span>款式名称：{{ item.categoryName
                        ? (getCategoryNameByLastIndex(item.categoryName, 0))
                        : ''
                      }}</span>
                    </td>
                  </tr>
                </table>
              </td>
              <td class="tw-text-center">
                <span>{{ item.storageLocation || '' }}</span>
              </td>
            </tr>
            <tr class="main-tr">
              <td
                :id="`design-img-td-${item.designCode}`"
                colspan="3"
                class="design-img-td"
              >
                <template v-if="item?.designPictureSelectedList?.length === 1">
                  {{item.designPictureSelectedList}}
                  <img :src="item.designPictureSelectedList?.[0]" class="one-img">
                </template>
                <template v-if="item?.designPictureSelectedList?.length === 2">
                  <img :src="item.designPictureSelectedList?.[0]" class="two-img first">
                  <br>
                  <img :src="item.designPictureSelectedList?.[1]" class="two-img second">
                </template>
              </td>
              <td class="detail-td">
                <div :id="`customer-img-cell-${item.designCode}`" class="customer-img-cell">
                  <!-- <img
                    v-if="item.customerPictureSelectedList.length"
                    :src="item.customerPictureSelectedList?.[0] || ''"
                    class="customer-img"
                  > -->
                </div>
                <div class="detail-cell">
                  <!-- <div v-if="item?.styleCategory" class="tw-mt-10px tag-block">
                    <TagsEnum
                      :options="[
                        {
                          listKey: 'STYLE_CATEGORY_TYPE_LIST',
                          val: item?.styleCategory,
                          type: 'warning',
                        }
                      ]"
                    />
                  </div> -->
                  <div v-if="item.isSplicing" class="splicing-tag">
                    拼接款
                  </div>
                  <div v-if="item?.patternMakerName" class="tw-mt-10px">
                    <span class="tw-font-bold">关联纸样师：</span>
                    <span>{{ item?.patternMakerName }}</span>
                  </div>
                  <div class="quote-group">
                    <div v-if="item?.makeSameDesignCode">
                      <span class="tw-font-bold">复色引用：</span>
                      <span>{{ item?.makeSameDesignCode }}</span>
                    </div>
                  </div>

                  <!-- <p class="tw-font-bold tw-mt-30px" style="line-height: 18px;">
                    参考尺寸：
                  </p>
                  <ul>
                    <li
                      v-for="(customerSizeItem, i) in item.customerSize"
                      :key="i"
                      style="margin-bottom: 4px;"
                    >
                      {{ customerSizeItem.positionName }}：{{ customerSizeItem.size }}
                    </li>
                  </ul> -->

                  <div v-if="item?.cuttingRemark">
                    <p
                      class="tw-font-bold tw-mt-30px"
                      style="line-height: 18px;"
                    >
                      裁剪备注：
                    </p>
                    <p v-htmlxss="replaceWrapFilter(item.cuttingRemark)" style="line-height: 18px;" />
                  </div>
                  <div v-if="item?.sewingRemark">
                    <p
                      class="tw-font-bold tw-mt-30px"
                      style="line-height: 18px;"
                    >
                      车缝工艺备注：
                    </p>
                    <p v-htmlxss="replaceWrapFilter(item.sewingRemark)" style="line-height: 18px;" />
                  </div>
                  <div v-if="item?.typeRemark">
                    <p
                      class="tw-font-bold tw-mt-30px"
                      style="line-height: 18px;"
                    >
                      版型备注：
                    </p>
                    <p v-htmlxss="replaceWrapFilter(item.typeRemark)" style="line-height: 18px;" />
                  </div>

                  <!-- <p
                    v-if="type === 'supple'"
                    class="tw-font-bold tw-mt-30px"
                    style="line-height: 18px;"
                  >
                    补做描述：
                  </p>
                  <p v-if="type === 'supple'" style="line-height: 18px;">
                    {{ item.description || '-' }}
                  </p>

                  <p
                    v-if="item.quoteDesignCode"
                    class="tw-font-bold tw-mt-30px"
                    style="line-height: 18px;"
                  >
                    改款描述：
                  </p>
                  <p v-if="item.quoteDesignCode" style="line-height: 18px;">
                    {{ item.intentionContent || '-' }}
                  </p> -->
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import type {
  PropType } from 'vue';
import {
  defineComponent,
  ref,
  toRefs,
  nextTick,
} from 'vue';
import QRCode from 'qrcode';
import { getLabelByVal } from '@/core/plugins/filter';
import {
  DESIGN_SAMPLE_TYPE_LIST,
  SAMPLE_TYPE_LIST,
} from '@/modules/design-center/develop-bom/constant';
import { BOOLEAN_LIST } from '@/constant';
import { cloneDeep } from 'lodash-es';
import { MAKE_CLOTHES_TYPE_LIST } from '@/components/tags-enum/constant';
import { formatTime, printHtml } from '@toy/utils';
import { IPrototypePrintBatchRes } from '../style-manage/api/types';

type PrintType =
  | 'analy' // 拆版打印
  | 'supple'; // 补做打印

const SAFE_DISTANCE = 5;
const CUSTOMER_IMG_LIMIT_WIDTH = 182;
const CUSTOMER_IMG_LIMIT_HEIGHT = 158;
const DESIGN_IMG_LIMIT_WIDTH = 552;
const DESIGN_IMG_LIMIT_HEIGHT = 900;
const DESIGN_IMG_LIMIT_HEIGHT_HALF = DESIGN_IMG_LIMIT_HEIGHT / 2 - SAFE_DISTANCE;

interface LimitOptions {
  limitWidth?: number;
  limitHeight?: number;
}

type IListItem = IPrototypePrintBatchRes[0] & {
  designPictureSelectedList: string[];
  categoryThree: string;
  categoryFour: string;
  codeUrl: string;
};

export default defineComponent({
  props: {
    printInfoDataList: {
      type: Array as PropType<IPrototypePrintBatchRes>,
      default: () => [],
    },
    type: {
      type: String as PropType<PrintType>,
      default: 'analy',
    },
  },
  setup(props) {
    const ImgCalculator = (src: string, limitOptions?: LimitOptions) => {
      const limitWidth = limitOptions?.limitWidth || DESIGN_IMG_LIMIT_WIDTH;
      const limitHeight = limitOptions?.limitHeight || DESIGN_IMG_LIMIT_HEIGHT;
      const imgInstance = new Image();
      imgInstance.src = src;

      let difPercent = 1;
      let needResize = false;
      if (imgInstance.width > limitWidth || imgInstance.height > limitHeight) {
        const difPercentWidth = limitWidth / imgInstance.width;
        const difPercentHeight = limitHeight / imgInstance.height;
        difPercent = difPercentWidth < difPercentHeight ? difPercentWidth : difPercentHeight;
        needResize = true;
      } else {
        let difPercentWidth;
        let difPercentHeight;

        const resizedWidth = imgInstance.width * (limitHeight / imgInstance.height);
        if (resizedWidth > limitWidth) {
          difPercentWidth = limitWidth / imgInstance.width;
          needResize = true;
        }

        const resizedHeight = imgInstance.height * (limitWidth / imgInstance.width);
        if (resizedHeight > limitHeight) {
          difPercentHeight = limitHeight / imgInstance.height;
          needResize = true;
        }

        if (needResize) {
          if (difPercentHeight && difPercentWidth) {
            difPercent = difPercentWidth < difPercentHeight ? difPercentWidth : difPercentHeight;
          } else {
            difPercent = difPercentWidth || difPercentHeight || 1;
          }
        }
      }
      return {
        imgInstance,
        difPercent,
        needResize,
      };
    };

    const handleCurrentItemCustomerPicture = async (item: Record<string, any>) => {
      const customerImgCell = document.getElementById(`customer-img-cell-${item.designCode}`);
      if (item.customerPictureSelectedList?.length && item.customerPictureSelectedList?.length === 1) {
        const {
          imgInstance,
          difPercent,
          needResize,
        } = ImgCalculator(
          item.customerPictureSelectedList?.[0],
          { limitWidth: CUSTOMER_IMG_LIMIT_WIDTH, limitHeight: CUSTOMER_IMG_LIMIT_HEIGHT }
        );
        if (!needResize) {
          customerImgCell?.setAttribute('style', '--customer-img-width: auto; --customer-img-height: 100%');
        } else {
          customerImgCell?.setAttribute(
            'style',
            `--customer-img-width:
              ${imgInstance.width * difPercent}px; --customer-img-height: ${imgInstance.height * difPercent}px`,
          );
        }
      }
    };

    const handleCurrentItemDesignPicture = (item: Record<string, any>) => {
      const designImgTd = document.getElementById(`design-img-td-${item.designCode}`);
      if (item.designPictureSelectedList?.length && item.designPictureSelectedList?.length === 1) {
        const {
          imgInstance,
          difPercent,
          needResize,
        } = ImgCalculator(item.designPictureSelectedList?.[0]);
        if (!needResize) {
          designImgTd?.setAttribute('style', '--one-img-width: 100%; --one-img-height: auto');
        } else {
          designImgTd?.setAttribute(
            'style',
            `--one-img-width:
              ${imgInstance.width * difPercent}px; --one-img-height: ${imgInstance.height * difPercent}px`,
          );
        }
      }
      if (item.designPictureSelectedList?.length && item.designPictureSelectedList?.length === 2) {
        const {
          imgInstance: imgInstance1,
          difPercent: difPercent1,
          needResize: needResize1,
        } = ImgCalculator(item.designPictureSelectedList?.[0], { limitHeight: DESIGN_IMG_LIMIT_HEIGHT_HALF });
        if (!needResize1) {
          designImgTd?.style.setProperty('--two-img-first-width', 'auto');
          designImgTd?.style.setProperty('--two-img-first-height', `${DESIGN_IMG_LIMIT_HEIGHT_HALF}`);
        } else {
          designImgTd?.style.setProperty('--two-img-first-width', `${imgInstance1.width * difPercent1}px`);
          designImgTd?.style.setProperty('--two-img-first-height', `${imgInstance1.height * difPercent1}px`);
        }
        const hasExtraHeight = imgInstance1.height * difPercent1 < DESIGN_IMG_LIMIT_HEIGHT_HALF;
        const {
          imgInstance: imgInstance2,
          difPercent: difPercent2,
          needResize: needResize2,
        } = ImgCalculator(item.designPictureSelectedList?.[1], {
          limitHeight: hasExtraHeight
            ? (DESIGN_IMG_LIMIT_HEIGHT - (imgInstance1.height * difPercent1) - SAFE_DISTANCE)
            : DESIGN_IMG_LIMIT_HEIGHT_HALF,
        });
        if (!needResize2) {
          designImgTd?.style.setProperty('--two-img-second-width', 'auto');
          designImgTd?.style.setProperty('--two-img-second-height', `${DESIGN_IMG_LIMIT_HEIGHT_HALF}`);
        } else {
          designImgTd?.style.setProperty('--two-img-second-width', `${imgInstance2.width * difPercent2}px`);
          designImgTd?.style.setProperty('--two-img-second-height', `${imgInstance2.height * difPercent2}px`);
        }
      }
    };

    const generateQrCode = async (id: string) => {
      // eslint-disable-next-line no-return-await
      return await QRCode.toDataURL(id);
    };
    const handleCurrentItemQrCode = async (item: Record<string, any>) => {
      item.codeUrl = await generateQrCode(item.designCode);
    };

    const innerPrintInfoDataList = ref<IListItem[]>([]);

    const handlePropsPrintInfoDataList = async () => {
      await nextTick();
      const newValue = props.printInfoDataList;
      innerPrintInfoDataList.value = cloneDeep(newValue as any) || [];
      await nextTick();
      await innerPrintInfoDataList.value.forEach(async (v) => {
        // 分类处理
        v.categoryThree = v.categoryName?.split('-')[2] || '-';
        v.categoryFour = v.categoryName?.split('-')[3] || '-';
        // 客户图处理
        handleCurrentItemCustomerPicture(v);
        // 设计图处理
        handleCurrentItemDesignPicture(v);
        // 处理二维码
        await handleCurrentItemQrCode(v);
      });
    };
    /**
     * 打印目标dom
     * @param id
     * @returns
     */
    const startPrint = async () => {
      await handlePropsPrintInfoDataList();
      await nextTick();
      const html = document.getElementById('design-order-multi-print')!.innerHTML;
      html && printHtml(html);
    };

    const getCategoryNameByLastIndex = (
      categoryName: string,
      lastIndex: number,
    ) => {
      const cList = categoryName.split('-');
      return cList[cList!.length - (1 + lastIndex)];
    };

    const replaceWrapFilter = (value: string) => {
      return value.replaceAll('\n', '<br>');
    };
    return {
      innerPrintInfoDataList,
      startPrint,
      getLabelByVal,
      SAMPLE_TYPE_LIST,
      DESIGN_SAMPLE_TYPE_LIST,
      formatTime,
      BOOLEAN_LIST,
      getCategoryNameByLastIndex,
      replaceWrapFilter,
      MAKE_CLOTHES_TYPE_LIST,
    };
  },
});
</script>

<style scoped lang="scss">
$border: #171717;
$border2: #000;
$hintFontSize: 18px;
$contentFontSize: 14px;
$lineHeight: 24px;
$lineHeightHeader: 28px;
$headerHeight: 30px;
$trHeight: 28px;
@import "@/modules/design-center/styles/index.scss";
.tag-block {
  :deep(.tag-item) {
    font-size: 14px;
  }
}
caption{
  font-weight: bold;
  line-height: $headerHeight;
  border:1px solid #333;
  border-bottom:0;
  font-size: $hintFontSize;
}
.desc-lis{
  display: flex;
  padding: $hintFontSize 0;
  li{
    flex:1
  }
}

// .design-order-print {
//   // margin-top: 2000px;
//   // z-index: 999;
// }
.tw-font-bold {
  font-weight: bold;
}
.text-align-center {
  text-align: center;
}
.line-height-header {
  line-height: $lineHeightHeader;
}
.margin-top-10 {
  margin-top: 10px;
}
.margin-top-20 {
  margin-top: 20px;
}
.tw-mt-30px {
  margin-top: 30px;
}
table {
  width:100%;
  td,th{
    border:1px solid $border;
    line-height:$lineHeight;
  }
  td{
    vertical-align: middle;
    padding-left: 4px;
    word-wrap: break-word;
    word-break: break-all;
    &.special-td {
      padding: 0;
    }
    &.first-center {
      text-align: center;
      padding: 4px;
    }
  }
}
.table {
  width: 100vw;
  height: 100%;
  tr,
  td {
    border: 1px solid $border;
    border-collapse: collapse;
    font-size: $contentFontSize;
    // line-height: $lineHeight;
  }
  tr.header-tr {
    td {
      font-size: $hintFontSize;
      text-align: center;
      height: $headerHeight;
    }
    td.title {
      font-weight: bold;
    }
    td span {
      display: block;
      max-height: $headerHeight;
      overflow: hidden;
    }
  }
  tr:nth-child(2),
  tr:nth-child(3),
  tr:nth-child(4),
  tr:nth-child(5) {
    td {
      height: $trHeight;
      span {
        display: block;
        max-height: $trHeight;
        overflow: hidden;
      }
    }
  }
}
.inner-table {
  width: 100%;
  height: 100%;
  border: 0;
  tr {
    border: 0;
    td {
      font-size: $contentFontSize;
      // line-height: $lineHeight;
      height: $trHeight;
      span {
        display: block;
        max-height: $trHeight;
        overflow: hidden;
      }
    }
    td:nth-child(1) {
      width: 50%;
      border: 0;
      border-right: 1px solid $border;
      border-collapse: collapse;
    }
    td:nth-child(2) {
      width: 50%;
      border: 0;
      border-left: 1px solid $border;
      border-collapse: collapse;
    }
  }
}
.qrcode-td {
  text-align: center;
  font-size: 0;
  img {
    vertical-align: middle;
    height: 78px;
  }
}
.main-tr {
  height: 910px;
  .design-img-td {
    --one-img-width: auto;
    --one-img-height: auto;
    --two-img-first-width: auto;
    --two-img-first-height: auto;
    --two-img-second-width: auto;
    --two-img-second-height: auto;

    vertical-align: top;
    padding: 3px;
    font-size: 0;
    text-align: center;
    box-sizing: border-box;
    img.one-img{
      // width: 100%;
      width: var(--one-img-width);
      height: var(--one-img-height);
    }
    img.two-img.first {
      // height: 445px;
      width: var(--two-img-first-width);
      height: var(--two-img-first-height);
    }
    img.two-img.second {
      // height: 445px;
      margin-top: 2px;
      width: var(--two-img-second-width);
      height: var(--two-img-second-height);
    }
  }
  .detail-td {
    vertical-align: top;
    padding: 0;
    .customer-img-cell {
      --customer-img-width: auto;
      --customer-img-height: auto;

      width: 100%;
      height: 166px;
      font-size: 0;
      box-sizing: border-box;
      padding: 3px;
      border-bottom: 1px solid $border;
      text-align: center;
      vertical-align: top;
      img {
        // height: 100%;
        width: var(--customer-img-width);
        height: var(--customer-img-height);
      }
    }
    .detail-cell {
      padding: 6px 4px;
    }
  }
}
.splicing-tag{
  width: 100%;
  height: 30px;
  border: 2px solid red;
  text-align: center;
  line-height: 26px;
  color: red;
  border-radius: 15px;
  box-sizing: border-box;
  margin-bottom: 4px;
  letter-spacing: 2px;
}
.quote-group:first-child {
  margin-top: 10px;
}
/* stylelint-disable-next-line order/order */
@media print {
  .img-container li {
    page-break-inside: avoid;
  }
  /* stylelint-disable-next-line selector-id-pattern */
  #printPrinter {
    display: block !important;
  }
  .exact {
    -webkit-print-color-adjust: exact;
  }
}
@page {
  size: auto;
  margin: 0.5cm;
}
</style>
