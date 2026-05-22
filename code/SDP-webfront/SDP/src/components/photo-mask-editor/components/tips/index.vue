<script lang="ts" setup>
import { InfoFilled } from '@element-plus/icons-vue';
import { PropType } from 'vue';
import { IModifyTips } from '../../types';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const props = defineProps({
  /** 改款提示 */
  modifyTips: {
    type: Object as PropType<IModifyTips>,
    default: null,
  },
});

</script>

<template>
  <div>
    <el-icon ref="tipsIconRef" class="tw-font-size-24px tw-text-warning">
      <InfoFilled />
      <span>涂抹提示</span>
    </el-icon>
    <p class="tw-text-warning">
      请涂抹需要修改的位置(代表该位置区域需要被变化) 如袖长从短袖变成长袖/短裙变长裙：则建议涂抹合理的长度）
    </p>
    <p class="tw-text-warning">参考选中的款式品类与标签进行位置涂抹</p>
    <section v-if="modifyTips?.labelTips">
      <p
        v-for="(tips, tipsIndex) in modifyTips.labelTips"
        :key="tips"
        class="tw-text-red"
      >
        {{ `(${tipsIndex + 1}) ${tips}` }}
      </p>
    </section>
    <section v-if="modifyTips?.descriptionTips">
      <p class="tw-text-red tw-mt-10px">参考追加文字描述位置</p>
      <p class="tw-text-red">
        {{
          `${modifyTips?.labelTips ? `(${modifyTips?.labelTips.length + 1})` : ""}${
            modifyTips.descriptionTips
          }`
        }}
      </p>
    </section>
  </div>
</template>
