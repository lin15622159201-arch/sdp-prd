<script lang="ts" setup>
import { computed, onUnmounted, PropType, ref, watch, watchEffect } from 'vue';
import { useRoute, useRouter, type RouteLocationNamedRaw } from 'vue-router';
import useDialogVisible from '@/hooks-transfer/use-dialog-visible';
import SubAppServer from '@/components/sub-app-server';
import { OPERATION_TYPE } from './constant';
import mitt, { EVENT_BUS_ENUM } from '@/core/event';

import type {
  IFabricListParams,
  IAccessoryListParams,
  IDemandListParams,
  INewListParams,
  IThreeDCollectParams,
} from '@/core/plugins/micro-app/hooks/use-event-config';
import { ElMessage } from 'element-plus';

const router = useRouter();
const route = useRoute();
const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
  bomId: {
    type: String,
    default: '',
    required: true,
  },
  subAppOptions: {
    type: Object as PropType<RouteLocationNamedRaw>,
    required: true,
  },
  type: {
    type: String as PropType<OPERATION_TYPE | ''>,
  },
  baseRoute: {
    type: String,
    default: '/design-center/develop-bom/edit',
  },
  /**
   * 3d 采集任务需要的参数
   */
  threeDCollectionOptions: {
    type: Object as PropType<IThreeDCollectParams>,
    default: () => ({}),
  },
});

const baseRoute = computed(() => {
  return `${props.baseRoute}/${props.bomId}`;
});

const emit = defineEmits(['update:modelValue', 'success', 'close']);

const { visible: selfVisible } = useDialogVisible(props, emit);

const viewKey = ref('');

const options = ref<{
  fabricListParmas: undefined | IFabricListParams;
  accessoryListParmas: undefined | IAccessoryListParams;
  demandListParmas: undefined | IDemandListParams;
  newListParmas: undefined | INewListParams;
  threeDCollectionParmas: undefined | IThreeDCollectParams;
  weipinFlag: boolean;
}>({
  fabricListParmas: undefined,
  accessoryListParmas: undefined,
  demandListParmas: undefined,
  newListParmas: undefined,
  threeDCollectionParmas: undefined,
  weipinFlag: false,
});

watchEffect(() => {
  viewKey.value = selfVisible.value
    ? route.fullPath
    : '';
});

/**
 * 0705 处理 好料网 改版 修改详情地址
 */
const handleHouliuDetailPage = () => {
  enum PAGE_TYPE {
    ACCESSORY = 'ACCESSORY',
    FABRIC = 'FABRIC',
  }
  const { subAppOptions } = props;
  let type = subAppOptions.query?.type as string;
  type = type ? type.toLocaleUpperCase() : type;

  if (type in PAGE_TYPE) {
    const path = `${props.baseRoute}/${props.bomId}/${type === PAGE_TYPE.FABRIC ? 'fabricDetail' : 'AccessoryDetail'}`;
    router.push({
      path,
      query: {
        ...subAppOptions.query,
        id: subAppOptions.query?.commodityId || '',
      },
    });
  } else {
    ElMessage.warning('未知地址类型');
  }
};

watchEffect(() => {
  const { subAppOptions } = props;

  if (selfVisible.value && !route.params.page && !route.query.routerName?.length) {
    switch (subAppOptions.name) {
      case 'FabricList':
        router.push(`${props.baseRoute}/${props.bomId}/fabricList`);
        break;
      case 'ProductDetails':
        // router.push({
        //   path: `${props.baseRoute}/${props.bomId}/productsDetail/${subAppOptions.params!.id}`,
        //   query: subAppOptions.query,
        // });
        handleHouliuDetailPage();
        break;
      case 'MaterialDetails':
        router.push({
          path: `${props.baseRoute}/${props.bomId}/materialDetails`,
          query: subAppOptions.query,
        });
        break;
      default:
        break;
    }
  }
});

watch(selfVisible, () => {
  if (!selfVisible.value) {
    router.replace(`${props.baseRoute}/${props.bomId}`);

    options.value = {
      fabricListParmas: undefined,
      accessoryListParmas: undefined,
      demandListParmas: undefined,
      newListParmas: undefined,
      threeDCollectionParmas: undefined,
      weipinFlag: false,
    };
    emit('close');
  } else {
    options.value.threeDCollectionParmas = props.threeDCollectionOptions;
  }
  console.log('options==', options.value);
});

const handleSetFabricParams = (data: IFabricListParams) => {
  options.value.fabricListParmas = data;
};

const handleSetAccessoryParams = (data: IFabricListParams) => {
  options.value.accessoryListParmas = data;
};
const handleSetDemandParams = (data: IDemandListParams) => {
  options.value.demandListParmas = data;
};
const handleSetNewParams = (data: INewListParams) => {
  options.value.newListParmas = data;
};

mitt.on(EVENT_BUS_ENUM.HOULIU_BOM_APP.GET_FABRIC_LIST_PARAMS, handleSetFabricParams);
mitt.on(EVENT_BUS_ENUM.HOULIU_BOM_APP.GET_ACCESSORY_LIST_PARAMS, handleSetAccessoryParams);
mitt.on(EVENT_BUS_ENUM.HOULIU_BOM_APP.GET_DEMAND_LIST_PARAMS, handleSetDemandParams);
mitt.on(EVENT_BUS_ENUM.HOULIU_BOM_APP.GET_NEW_LIST_PARAMS, handleSetNewParams);

onUnmounted(() => {
  mitt.off(EVENT_BUS_ENUM.HOULIU_BOM_APP.GET_FABRIC_LIST_PARAMS, handleSetFabricParams);
  mitt.off(EVENT_BUS_ENUM.HOULIU_BOM_APP.GET_ACCESSORY_LIST_PARAMS, handleSetAccessoryParams);
  mitt.off(EVENT_BUS_ENUM.HOULIU_BOM_APP.GET_DEMAND_LIST_PARAMS, handleSetDemandParams);
  mitt.off(EVENT_BUS_ENUM.HOULIU_BOM_APP.GET_NEW_LIST_PARAMS, handleSetNewParams);
});
</script>

<template>
  <el-dialog
    v-model="selfVisible"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    width="1300px"
    :title="`${type === OPERATION_TYPE.EDIT ? '更改物料' : '添加物料'}`"
    top="5vh"
    center
    :z-index="1000"
  >
    <section
      :class="{
        'sub-app-section': true,
        'add-bom-dialog__hidden--back': type === OPERATION_TYPE.EDIT,
        'add-bom-dialog__hidden--add-to-cart': type === OPERATION_TYPE.EDIT,
        'demand-detail-dialog__hidden--back-btn':
          type === OPERATION_TYPE.CHECK_DEMAND || type === OPERATION_TYPE.EDIT_DEMAND,
        'demand-detail-dialog__hidden--close-demand': type === OPERATION_TYPE.CHECK_DEMAND,
        'demand-detail-dialog__hidden--join-bom': type === OPERATION_TYPE.CHECK_DEMAND,
        'demand-detail-dialog__hidden--add-to-cart':
          type === OPERATION_TYPE.CHECK_DEMAND || type === OPERATION_TYPE.EDIT_DEMAND,
        'demand-detail-dialog__hidden--float-nav-box':
          type === OPERATION_TYPE.CHECK_DEMAND || type === OPERATION_TYPE.EDIT_DEMAND,
      }"
    >
      <SubAppServer
        v-if="viewKey"
        :key="viewKey"
        :base-route="baseRoute"
        :route-options="subAppOptions"
        :options="options"
      />
    </section>
  </el-dialog>
</template>

<style lang="scss" scoped>
.sub-app-section {
  height: 70vh;
  overflow: auto;
  :deep(.details-container .el-scrollbar) {
    height: 100%;
  }
}
</style>

<style lang="scss">
.add-bom-dialog__hidden--back {
  #houliu-app1 {
    .main-center {
      .top {
        display: none;
      }
    }
    .float-nav-box {
      display: none;
    }
  }
}
.add-bom-dialog__hidden--add-to-cart{
  #houliu-app1 {
    .joinCar-btn{
      display: none;
    }
  }
}
.demand-detail-dialog__hidden--back-btn {
  #houliu-app1 {
    .back-btn{
      display: none;
    }
  }
}
.demand-detail-dialog__hidden--close-demand{
  #houliu-app1 {
    .close-btn{
      display: none;
    }
  }
}
.demand-detail-dialog__hidden--join-bom{
  #houliu-app1 {
    .joinBom-btn{
      display: none;
    }
  }
}
.demand-detail-dialog__hidden--add-to-cart{
  #houliu-app1 {
    .joinCar-btn{
      display: none;
    }
  }
}
.demand-detail-dialog__hidden--float-nav-box{
  #houliu-app1 {
    .float-nav-box{
      display: none;
    }
  }
}
</style>
