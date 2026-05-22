<script lang="tsx">
import { defineComponent, PropType } from 'vue';
import { Close } from '@element-plus/icons-vue';

export default defineComponent({
  name: 'Tabs',
  components: {
    Close,
  },

  emits: ['update:modelValue', 'change', 'remove', 'click'],
  props: {
    clearable: {
      type: Boolean,
      default: false,
    },

    fontSize: {
      type: Number,
      default: 14,
    },

    lineHeight: {
      type: Number,
      default: 32,
    },

    border: {
      type: Boolean,
      default: true,
    },

    mode: {
      type: String as PropType<'horizontal' | 'vertical'>,
      default: 'horizontal',
    },

    modelValue: {
      type: [String, Number, Boolean],
      default: '',
    },

    config: {
      type: Array as PropType<{ label: string; value: string | number | boolean; count?: string; }[]>,
      required: true,
      default: () => []
    },
  },

  setup(props, { emit }) {
    const handleItem = (key: string | number | boolean, index: number) => {
      emit('click', key);
      if (key === props.modelValue) return;
      emit('update:modelValue', key);
      emit('change', key, index);
      console.log(key, index);
    };
    const handleRemove = (val: string | number | boolean) => {
      emit('remove', val);
    };
    return {
      handleRemove,
      handleItem,
    };
  },
  render() {
    return (
      <div class={`tabs_layout ${this.mode}`} style={{ minHeight: `${this.lineHeight}px` }}>
        <div
          class={{
            ul: true,
            border: this.border,
          }}
        >
          {this.config.map((v, i) => (
            <div
              class={`li ${v.value === this.modelValue ? 'active' : ''}`}
              onClick={() => this.handleItem(v.value, i)}
            >
              <div
                class='name'
                style={{
                  fontSize: `${this.fontSize}px`,
                  lineHeight: `${this.lineHeight}px`,
                  paddingRight: `${this.clearable ? '30' : '0'}px`,
                }}
              >
                {v.label}
                {v.count && (
                  <span>
                    (
                    {v.count}
                    )
                  </span>
                )}
              </div>

              {this.clearable && (
                <el-icon
                  class='remove'
                  onClick={() => this.handleRemove(v.value)}
                >
                  <close />
                </el-icon>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  },
});
</script>

<style scoped lang="scss">
.tabs_layout {
  width: 100%;
  &.horizontal .ul {
    display: flex;
    align-items: center;
    &.border::before {
      content: '';
      position: absolute;
      left: 0;
      bottom: 0;
      width: 100%;
      border-bottom: 1px solid #e4e7ed;
    }
    .li {
      display: flex;
      align-items: center;
      position: relative;
      padding: 0 16px;
      .name {
        // padding: 0 10px;
        line-height: 30px;
        transition: all 0.3s;
        white-space: nowrap;
        &::after {
          content: '';
          position: absolute;
          left: 50%;
          bottom: 0;
          width: 0;
          transform: translateX(-50%);
          transform-origin: center;
          border-bottom: 2px solid var(--el-color-primary);
          border-radius: 4px;
          transition: all 0.3s;
        }
      }
      .remove {
        &:hover {
          color: var(--el-color-primary);
          font-weight: bold;
        }
      }
      &:hover {
        color: var(--el-color-primary);
        font-weight: 500;
      }
      &.active {
        color: var(--el-color-primary);
        .name {
          position: relative;
          font-weight: 500;
          &::after {
            width: 100%;
          }
        }
      }
    }
    .li:first-of-type {
      padding-left: 0;
    }
    .li:last-of-type {
      padding-right: 0;
    }
  }
  &.vertical {
    height: 100%;
    .ul {
      height: 100%;
      &.border::before {
        content: '';
        position: absolute;
        top: 0;
        right: 0;
        height: 100%;
        border-right: 1px solid #e9e9e9;
      }
      .li {
        position: relative;
        .name {
          &::after {
            content: '';
            position: absolute;
            top: 50%;
            right: 0;
            height: 0;
            transform: translateY(-50%);
            transform-origin: center;
            border-right: 2px solid var(--el-color-primary);
            border-radius: 4px;
            transition: all 0.3s;
          }
        }
        .remove {
          position: absolute;
          top: 50%;
          right: 10px;
          padding: 4px;
          color: var(--el-color-primary);
          transform: translateY(-50%);
          opacity: 0;
          &:hover {
            font-weight: bold;
          }
        }
        &:hover .remove {
          opacity: 1;
        }
        &:hover .name {
          color: var(--el-color-primary);
          font-weight: 500;
        }
        &.active {
          color: var(--el-color-primary);
          .name {
            position: relative;
            font-weight: 500;
            &::after {
              height: 100%;
            }
          }
          .remove {
            opacity: 1;
          }
        }
      }
    }
  }
  .ul {
    position: relative;
    color: #515151;
    .li {
      position: relative;
      cursor: pointer;
      .name {
        font-size: 14px;
      }
    }
  }
}
</style>
