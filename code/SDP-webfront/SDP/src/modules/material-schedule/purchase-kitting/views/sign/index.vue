<template>
  <sc-app-page>
    <template #main>
      <div class="desc-lis">
        <el-form @submit.prevent>
          <el-form-item
            label="扫描类型："
            label-width="100px"
            label-position="left"
          >
            齐套签收
          </el-form-item>
          <el-form-item
            label="SKC："
            label-width="100px"
            label-position="left"
          >
            <el-input
              ref="inpRef"
              v-model="code"
              @keyup.enter="getCollectList"
            />
          </el-form-item>
        </el-form>
      </div>
    </template>

    <CollectDialog
      v-model:visible="collectDia.visible"
      :code="code"
      :data="collectDia.data"
      :batch-dict-list-map="batchDictListMap"
      @confirm="confirm"
    />
  </sc-app-page>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, ref } from 'vue';
import CollectDialog from './components/collect-dialog/index.vue';
import { getMaterialSignMaterialList, getOrderMaterialSign } from '../../api/index';
import type {
  IMaterialSignMaterialListRes as Res,
} from '../../api/types';
import { IListItem } from './types';
import { ElMessage } from 'element-plus';
import { useDictionary } from '@/hooks-transfer/use-dict/index';
import { useRoute } from 'vue-router';
import { DICTIONARY_KEY } from '@/constant/dictionary';

export default defineComponent({
  components: {
    CollectDialog,
  },
  setup() {
    const route = useRoute();
    // 字典
    const {
      batchDictListMap,
    } = useDictionary([
      DICTIONARY_KEY.PLM_PURCHASE_YLBW,
    ]);
    const inpRef = ref();
    const code = ref(route.query.designCode as string || '');
    const collectDia = reactive({
      visible: false,
      data: [] as IListItem[],
    });

    const parseData = (data: Res) => {
      return data.map((item) => {
        let craftDemandInfo = [];
        try {
          craftDemandInfo = JSON.parse(item.craftDemandInfo || '[]');
        } catch (e) {
          console.warn(e);
        }
        return {
          ...item,
          craftDemandInfo
        };
      });
    };

    const getCollectList = async (e: FocusEvent) => {
      e.preventDefault();
      e.stopPropagation();

      if (!code.value) {
        ElMessage.error('请正确录入SKC');
        return;
      }
      const { data = [] } = await getMaterialSignMaterialList(code.value);
      collectDia.data = parseData(data);
      collectDia.visible = true;
    };

    const confirm = async (currentCode: string) => {
      await getOrderMaterialSign(currentCode);
      collectDia.visible = false;
      ElMessage.success('签收完成');
    };

    onMounted(() => {
      inpRef.value.focus();
    });

    return {
      inpRef,
      code,
      getCollectList,
      collectDia,
      batchDictListMap,
      confirm,
    };
  },
});
</script>

<style scoped lang="scss">
.desc-lis{
  li{
    padding:15px 0;
  }
}
</style>
