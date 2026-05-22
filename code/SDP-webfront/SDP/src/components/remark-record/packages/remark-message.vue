<script lang='tsx'>
import { computed, defineComponent, inject, ref } from 'vue';
import { remarkRecordKey } from '../utils/token';

export default defineComponent({
  name: 'RemarkMessage',
  setup() {
    const remarkRecordRef = inject(remarkRecordKey)!;
    const isOverArea = ref(false);

    const getList = (list: Record<string, string>[]) => {
      const { descKey, nameKey, timeKey, timeFormatter } = remarkRecordRef;
      return list.map((item) => {
        return {
          name: item[nameKey] || '',
          time: item[timeKey] ? timeFormatter(item[timeKey]) : '',
          desc: item[descKey] || '',
        };
      });
    };

    const list = computed(() => {
      return Array.isArray(remarkRecordRef.modelValue) ? getList(remarkRecordRef.modelValue) : [];
    });

    // 最近的一条备注描述
    const recentRemarkDesc = computed(() => {
      return list.value[0]?.desc || '';
    });
    const remarkMsgRef = ref<HTMLDivElement>();

    return {
      list,
      recentRemarkDesc,
      remarkMsgRef,

      isOverArea,
      width: computed(() => {
        return remarkRecordRef.width;
      }),
      triggerEvent: computed(() => {
        return remarkRecordRef.triggerEvent;
      }),
    };
  },
  render() {
    const referenceRender = () => {
      return (
        <div
          class='tw-flex tw-flex-item-center tw-cursor-pointer remark-msg'
          ref='remarkMsgRef'
          onMouseenter={() => { this.isOverArea = true; }}
        >
          <span class='remark-badge'>
            { this.list.length }
          </span>
          <span class='ellipsis-text tw-truncate'>
            { this.recentRemarkDesc }
          </span>
        </div>
      );
    };

    const popoverRender = () => {
      if (this.isOverArea) {
        return (
          <el-popover
            placement='left'
            title='备注记录'
            width={this.width}
            trigger={this.triggerEvent}
            popper-class='remark-popover'
            v-slots={{
              reference: referenceRender,
              default: () => {
                const formatDesc = (desc: string) => {
                  return desc.split(/\n/g);
                };
                return (
                  <el-scrollbar max-height='80vh'>
                    <el-timeline>
                      {
                        this.list.map((item, i) => {
                          const desc = formatDesc(item.desc);
                          return (
                            <el-timeline-item
                              key={i}
                              placement='top'
                              color='#409EFF'
                              class='timeline'
                            >
                              <div class='tw-flex tw-flex-justify-between'>
                                <h4>{ item.time }</h4>
                                <h4>{ item.name }</h4>
                              </div>
                              {desc.map(v => (
                                <div>{v}</div>
                              ))}
                            </el-timeline-item>
                          );
                        })
                      }
                    </el-timeline>
                  </el-scrollbar>
                );
              },
            }}
          />
        );
      }
      return referenceRender();
    };

    return (
      this.list.length
        ? (
          popoverRender()
        )
        : null
    );
  },
});
</script>

<style scoped lang='scss'>
:deep(.el-timeline-item__wrapper){
  top: 5px;
}
.remark-popover {
  .timeline {
    :deep(.el-timeline-item__timestamp.is-top) {
      padding: 0;
    }
  }
}
.remark-msg {
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  .remark-badge {
    display: inline-block;
    width: 16px;
    height: 16px;
    line-height: 16px;
    font-size: 10px;
    border-radius: 50%;
    background: #f56c6c;
    text-align: center;
    color: #fff;
    margin-right: 6px;
  }
  .ellipsis-text {
    display: inline-block;
    width: calc(100% - 30px);
  }
}
</style>
