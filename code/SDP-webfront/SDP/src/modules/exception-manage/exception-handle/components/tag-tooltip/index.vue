<template>
  <span v-if="!isOverArea" @mouseenter="isOverArea = true">
    <slot />
  </span>
  <el-tooltip
    v-else
    effect="light"
    placement="right"
  >
    <slot />

    <!-- cancel 异常-取消 -->
    <template v-if="tooltipType === 'exception-cancel'" #content>
      <section v-loading="loading" style="width:300px">
        <ul v-if="!loading" class="desc-lis">
          <li>
            <b>取消人</b>
            {{ row?.cancelerName || '-' }}
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

    <!-- cancel 返修-取消 -->
    <template v-else-if="tooltipType === 'repair-cancel'" #content>
      <section v-loading="loading" style="width:300px">
        <ul v-if="!loading" class="desc-lis">
          <li>
            <b>取消人</b>
            {{ row?.cancelUserName || '-' }}
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

    <!-- exception-desc 异常描述-->
    <template v-else-if="tooltipType === 'exception-desc'" #content>
      <section v-loading="loading" style="width:300px">
        <ul v-if="!loading" class="desc-lis">
          <li>
            {{ row?.exceptionDesc || '-' }}
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
            {{ row?.anomaly?.anomalyCode || '' }}
          </li>
          <li>
            <b>异常类型</b>
            {{ row?.anomaly?.typeDescription || '' }}
          </li>
          <li>
            <b>异常原因</b>
            {{ row?.anomaly?.description || '-' }}
          </li>
          <li>
            <b>异常处理人</b>
            {{ row?.anomaly?.responsibleName || '-' }}
          </li>
        </ul>
        <p v-else>
          加载中...
        </p>
      </section>
    </template>

    <!-- cancel 返修-发起环节 -->
    <template v-else-if="tooltipType === 'repair-step'" #content>
      <section v-loading="loading" style="width:300px">
        <ul v-if="!loading" class="desc-lis">
          <li>
            <b>返修原因</b>
            {{ row?.repairReasonName || '-' }}
          </li>
          <li>
            <b>返修责任方</b>
            {{ $filters.getEnumLabel(REPAIR_DUTY_PARTY_LIST, row?.responsibleParty) }}
          </li>
          <li>
            <b>返修描述</b>
            {{ row?.repairDescription || '-' }}
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
            <ImageViewer v-if="row?.customerPictureList?.length" :list="row?.customerPictureList">
              <template #default="{ view }">
                <el-image
                  class="img-thumbnail__table margin-right-5"
                  fit="cover"
                  :src="resizeImgByWidth(row?.customerPictureList?.[0])"
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

    <template v-else #content>
      <slot name="content" />
    </template>
  </el-tooltip>
</template>

<script lang="ts">
import type { PropType } from 'vue';
import { computed, defineComponent, ref } from 'vue';
import { resizeImgByWidth } from '@/core/utils/helper';
import { REPAIR_DUTY_PARTY_LIST } from '../../constant';
import { useDictionary } from '@/hooks/use-dictionary';
import { DICTIONARY_KEY } from '@/constant/dictionary';

type TooltipType = 'exception-cancel' | 'exception-desc' |
'repair-cancel' | 'error' | 'repair-step' | 'REFER' | 'DERI' | 'modifyStyle' | 'referCode' ;

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
  setup() {
    const loading = ref(false);
    const isOverArea = ref(false);
    // const { getDictionaryOptions } = useDictionary();
    // const patternChangeList = computed(() => {
    //   return getDictionaryOptions(DICTIONARY_KEY.PATTERN_CHANGE) || [];
    // });

    // const getPatternChangeSize = (val?: string) => {
    //   if (!val) {
    //     return '-';
    //   }
    //   return patternChangeList.value.find(i => i.value === val)?.value ?? '-';
    // };

    return {
      // getPatternChangeSize,
      loading,
      isOverArea,
      REPAIR_DUTY_PARTY_LIST,
      resizeImgByWidth,
    };
  },
});
</script>

<style scoped lang="scss">
//
</style>
