<!-- 详情页-标题 -->
<script lang="tsx">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'DetailTitle',
  props: {
    title: {
      type: String,
      default: '',
    },

    tips: {
      type: String,
      default: '',
    },

    lineHeight: {
      type: Number,
      default: 32,
    },
    showLine: {
      type: Boolean,
      default: false
    },
  },

  render() {
    return (
      <div
        class='tw-flex tw-justify-between tw-mb-[10px]'
        style={{
          lineHeight: `${this.lineHeight}px`,
        }}
      >
        <div class='tw-flex tw-flex-[1_1_80%] tw-font-bold'>
          {this.showLine && (
            <div class='line' />
          )}
          {this.$props.title && (
            <div class='tw-min-w-[110px]'>
              {this.$props.title}
            </div>
          )}

          {this.$slots.status && <div class='tw-mr-[10px]'>{this.$slots.status()}</div>}

          {this.tips && <span class='color-warning tw-pl-[10px] tw-text-[12px]'>{this.tips}</span>}
        </div>

        {this.$slots.default && <div class='tw-flex'>{this.$slots.default()}</div>}
      </div>
    );
  },
});
</script>
<style lang="scss" scoped>
.line {
  position: relative;
  margin-right: 8px;
  &::after {
    content: '';
    position: absolute;
    left: 0;
    top: 50%;
    width: 3px;
    height: 50%;
    border-radius: 2px;
    transform: translateY(-50%);
    background-color: var(--el-color-primary);
  }
}
</style>
