<template>
  <div>
    <sc-table
      height="100%"
      :data="bomList"
      :columns="tableColumns"
    />
    <!--二次工艺弹框-->
    <SecondCraftDialog
      v-model:visible="processDialog.visible"
      :preview="processDialog.preview"
      :crafts="processDialog.crafts"
      :data="processDialog.data"
      :batch-dict-list-map="batchDictListMap"
      :craft-match-list="processDialog.craftMatchList"
    />
  </div>
</template>

<script lang="ts" setup>
import { reactive } from 'vue';
import { craftMatch } from '@/modules/design-center/develop-bom/api';
import { IBomPrintCraftDemandInfoListItem, ICraftMatchReqItem } from '@/modules/design-center/develop-bom/api/types';
import { IBomOrderMaterialItem } from '@/modules/design-center/develop-bom/views/edit/types';
import { useListColumns } from './hooks/use-table-columns';
import { useDictionary } from '@/hooks-transfer/use-dict';
import { DICTIONARY_KEY } from '@/constant/dictionary';
import SecondCraftDialog from '@/modules/design-center/develop-bom/components/process-dialog/index.vue';

const props = defineProps({
  bomList: {
    type: Array,
  },
});

const { batchDictListMap } = useDictionary([
  DICTIONARY_KEY.PLM_PURCHASE_YLBW,
  DICTIONARY_KEY.BOM_CUTTING_METHOD,
]);

// 二次工艺弹窗
const processDialog = reactive({
  visible: false,
  preview: false,
  crafts: {} as IBomPrintCraftDemandInfoListItem,
  data: {} as IBomOrderMaterialItem,
  craftMatchList: [] as ICraftMatchReqItem[],
});
const getCraftMatch = async (craftDemandId: string = '') => {
  const { data = [] } = await craftMatch({
    craftDemandId,
  });
  processDialog.craftMatchList = data || [];
};

const { tableColumns } = useListColumns({
  async previewCraft(row) {
    processDialog.preview = true;
    processDialog.crafts = row as unknown as IBomPrintCraftDemandInfoListItem;
    if (processDialog.preview) {
      await getCraftMatch(row.craftDemandId);
    }
    processDialog.visible = true;
  }
});
</script>
