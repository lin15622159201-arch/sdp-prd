<template>
  <template v-if="!isOverArea">
    <span @mouseenter="isOverArea = true">
      <slot />
    </span>
  </template>
  <el-tooltip
    v-else
    effect="light"
    placement="right"
  >
    <slot />

    <!-- cancel 取消 -->
    <template v-if="tooltipType === 'cancel'" #content>
      <section v-loading="loading" style="width:300px">
        <ul v-if="!loading" class="desc-lis">
          <li>
            <b>取消人</b>
            {{ row?.cancelUserName || '-' }}
          </li>
          <li>
            <b>取消环节</b>
            {{ row?.processingStep ? $filters.getEnumLabel(DESIGN_PROCESSING_STEP_LIST, row?.processingStep) : '-' }}
          </li>
          <li>
            <b>取消时间</b>
            {{ $filters.formatTime(row?.cancelTime || '-') }}
          </li>
          <li>
            <b>取消原因</b>
            {{ row?.cancelReason || '-' }}
          </li>
        </ul>
        <p v-else>
          加载中...
        </p>
      </section>
    </template>

    <!-- purchaseCancel 剪版单状态：取消 -->
    <template v-else-if="tooltipType === 'purchaseCancel'" #content>
      <section v-loading="loading" style="width:300px">
        <ul v-if="!loading" class="desc-lis">
          <li>
            <b>取消人</b>
            {{ row?.purchaseCancelUserName || '-' }}
          </li>
          <li>
            <b>取消时间</b>
            {{ $filters.formatTime(row?.purchaseCancelTime || '-') }}
          </li>
          <li>
            <b>取消原因</b>
            {{ row?.purchaseCancelReason || '-' }}
          </li>
        </ul>
        <p v-else>
          加载中...
        </p>
      </section>
    </template>

    <!-- REFER 套版 -->
    <template v-else-if="tooltipType === 'REFER'" #content>
      <section v-loading="loading" style="width:300px">
        <ul v-if="!loading" class="desc-lis">
          <li>
            <b>套版款号</b>
            {{ row?.styleReferDesignCode || '-' }}
          </li>
        </ul>
        <p v-else>
          加载中...
        </p>
      </section>
    </template>

    <!-- DERI 衍生 -->
    <template v-else-if="tooltipType === 'DERI'" #content>
      <section v-loading="loading" style="width:300px">
        <ul v-if="!loading" class="desc-lis">
          <li>
            <b>衍生款号</b>
            {{ row?.styleReferDesignCode || '-' }}
          </li>
        </ul>
        <p v-else>
          加载中...
        </p>
      </section>
    </template>

    <!-- referCode 参考款号 -->
    <template v-else-if="tooltipType === 'referCode'" #content>
      <section v-loading="loading" style="width:300px">
        <ul v-if="!loading" class="desc-lis">
          <li>
            <b>参考款号</b>
            {{ row?.referenceDesignCode || '-' }}
          </li>
        </ul>
        <p v-else>
          加载中...
        </p>
      </section>
    </template>

    <!-- modifyStyle 改款 目前没有改款 -->
    <!-- <template v-else-if="tooltipType === 'modifyStyle'" #content>
      <section v-loading="loading" style="width:300px">
        <ul v-if="!loading" class="desc-lis">
          <li>
            <b>原款SKC</b>
            <span>
              {{ row?.quoteDesignCode || '-' }}
            </span>
          </li>
          <li>
            <b>改款内容</b>
            {{ row?.intentionContent || '-' }}
          </li>
          <li>
            <b>改款图片</b>
            <ImageViewer v-if="pictureList.length" :list="pictureList">
              <template #default="{ view }">
                <el-image
                  class="img-thumbnail__table margin-right-5"
                  fit="cover"
                  :src="$filters.ossUrl(pictureList[0])"
                  @click="view(0)"
                />
              </template>
            </ImageViewer>
            <span v-else>-</span>
          </li>
          <li>
            <b>纸样改动</b>
            {{ getPatternChangeSize(row?.patternChangeSize) }}
          </li>
        </ul>
        <p v-else>
          加载中...
        </p>
      </section>
    </template> -->

    <template v-else-if="tooltipType === 'color'" #content>
      <section v-loading="loading" style="width:300px">
        <ul v-if="!loading" class="desc-lis">
          <li>
            <b>复色款号</b>
            {{ row?.makeSameDesignCode || '-' }}
          </li>
        </ul>
        <p v-else>
          加载中...
        </p>
      </section>
    </template>

    <!-- error 异常 -->
    <template v-else-if="tooltipType === 'error'" #content>
      <section v-loading="loading" style="width:300px">
        <ul v-if="!loading" class="desc-lis">
          <li>
            <b>异常单号</b>
            {{ row?.anomaly?.anomalyCode || '-' }}
          </li>
          <li>
            <b>异常原因</b>
            {{ row?.anomaly?.typeDescription || '-' }}
          </li>
          <li>
            <b>异常描述</b>
            {{ row?.anomaly?.description || '-' }}
          </li>
          <li>
            <b>责任人</b>
            {{ row?.anomaly?.responsibleName || '-' }}
          </li>
        </ul>
        <p v-else>
          加载中...
        </p>
      </section>
    </template>

    <!-- repair 返修 -->
    <template v-else-if="tooltipType === 'repair'" #content>
      <section v-loading="loading" style="width:300px">
        <ul v-if="!loading" class="desc-lis">
          <li>
            <b>返修原因</b>
            {{ row?.repair?.repairReasonName || '-' }}
          </li>
          <li>
            <b>返修时间</b>
            {{ $filters.formatTime(row?.repair?.createdTime || '-') }}
          </li>
          <li>
            <b>返修描述</b>
            {{ row?.repair?.repairDescription || '-' }}
          </li>
        </ul>
        <p v-else>
          加载中...
        </p>
      </section>
    </template>
  </el-tooltip>
</template>

<script lang="ts">
import type { PropType } from 'vue';
import { computed, defineComponent, ref } from 'vue';
import { DESIGN_PROCESSING_STEP_LIST } from './constant';
import { useDictionary } from '@/hooks/use-dictionary';
import { DICTIONARY_KEY } from '@/constant/dictionary';

type TooltipType = 'cancel' | 'purchaseCancel' | 'REFER' | 'DERI' | 'modifyStyle'
| 'referCode' | 'color' | 'error' | 'repair';

export default defineComponent({
  props: {
    tooltipType: {
      type: String as PropType<TooltipType>,
      default: '',
    },
    row: {
      type: Object,
      default: () => ({}),
    },
  },
  setup(props) {
    const loading = ref(false);
    const isOverArea = ref(false);
    // const {
    //   getDictionaryOptions,
    // } = useDictionary();
    // const patternChangeList = computed(() => {
    //   return getDictionaryOptions(DICTIONARY_KEY.PATTERN_CHANGE) || [];
    // });
    // const getPatternChangeSize = (val?: string) => {
    //   if (!val) {
    //     return '-';
    //   }
    //   return patternChangeList.value.find(i => i.value === val)?.label ?? '-';
    // };

    const pictureList = computed(() => {
      if (props.row?.customerPicture) {
        return props.row.customerPicture.split(',');
      }
      if (props.row?.customerPictureList) {
        return props.row.customerPictureList;
      }
      return [];
    });

    return {
      pictureList,
      loading,
      isOverArea,
      DESIGN_PROCESSING_STEP_LIST,
      // getPatternChangeSize,
    };
  },
});
</script>

<style scoped lang="scss">
.desc-lis {
  li {
    display: flex;
    line-height: 22px;
    margin: 5px 0;
    b {
      font-weight: bold;
      width: 70px;
      flex-shrink: 0;
      &::after {
        content: "：";
      }
    }
  }
}

</style>
