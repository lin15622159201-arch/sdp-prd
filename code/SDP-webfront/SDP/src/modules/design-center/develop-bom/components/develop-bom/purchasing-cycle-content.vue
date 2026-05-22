<script lang="tsx">
import { defineComponent } from 'vue';
// import { cloneDeep } from 'lodash-es';

export default defineComponent({
  props: {
    row: {
      type: Object,
      default: () => ({}),
    },
    craftDemandInfoListKeyName: {
      type: String,
      default: 'craftDemandInfoList',
    },
  },
  render() {
    const { row: innerRow, craftDemandInfoListKeyName } = this.$props;
    return (
      <section class='tw-text-12px'>
        <div>
          <div>
            <b>样衣</b>
          </div>
          <div>
            <span>物料：</span>
            <span>
              {innerRow?.samplePurchasingCycle
                ? `${innerRow?.samplePurchasingCycle}${innerRow?.samplePurchasingCycleUnit}`
                : '-'}
            </span>
          </div>
          {innerRow?.[craftDemandInfoListKeyName]?.map((craftDemandItem: any) => {
            return (
              <div>
                <span>
                  {craftDemandItem.category3 || craftDemandItem.category2}
                  ：
                </span>
                <span>
                  {craftDemandItem?.sampleCraftCycle
                    ? `${craftDemandItem?.sampleCraftCycle}${craftDemandItem?.sampleCraftCycleUnit}`
                    : '-'}
                </span>
              </div>
            );
          })}
        </div>
        <div>
          <div>
            <b>大货</b>
          </div>
          <div>
            <span>物料：</span>
            <span>
              {innerRow?.bulkPurchasingCycle
                ? `${innerRow?.bulkPurchasingCycle}${innerRow?.bulkPurchasingCycleUnit}`
                : '-'}
            </span>
          </div>
          {innerRow?.[craftDemandInfoListKeyName]?.map((craftDemandItem: any) => {
            return (
              <div>
                <span>
                  {craftDemandItem.category3 || craftDemandItem.category2}
                  ：
                </span>
                <span>
                  {craftDemandItem?.bulkCraftCycle
                    ? `${craftDemandItem?.bulkCraftCycle}${craftDemandItem?.bulkCraftCycleUnit}`
                    : '-'}
                </span>
              </div>
            );
          })}
        </div>
      </section>
    );
  },
});
</script>
