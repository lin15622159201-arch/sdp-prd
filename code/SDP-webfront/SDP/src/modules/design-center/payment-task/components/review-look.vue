<template>
  <div class="app-box">
    <el-image
      class="tw-w-215px tw-h-200px tw-m-t-10px"
      :src="selectList[0].mainImgUrl"
      :preview-src-list="getMainImgUrlAll(selectList[0])"
      show-progress
      :initial-index="0"
      fit="contain"
    />
    <div class="table-box">
      <div class="tw-flex tw-gap-10px tw-flex-wrap">
        <div
          class="tw-w-230px tw-h-310px"
          v-for="(item, index) in selectList[0].sameSkcList"
          :key="index"
        >
          <div class="border-gray tw-p-6px">
            <div class="tw-position-relative">
              <el-image
                class="tw-w-215px tw-h-200px"
                :src="item.imageUrl"
                :preview-src-list="[item.imageUrl]"
                show-progress
                :initial-index="0"
                fit="contain"
              />
              <div class="p-a-l-t">
                <div
                  v-if="item.similarStylesType === TYPE_STYLE.SAME"
                  class="eliminate-bg"
                >
                  同款
                </div>
                <div
                  v-if="item.similarStylesType === TYPE_STYLE.SIMILAR"
                  class="eliminate-bg"
                  style="background-color: green;"
                >
                  相似款
                </div>
              </div>
              <div class="p-a-l-b">
                <div
                  class="eliminate-bg"
                  :style="`background-color: ${item.onShelves ? (item.onShelves === 'YES' ? '#707AF2' : 'red') : 'gray'};`"
                >
                  {{ item.onShelves ? (item.onShelves === 'YES' ? '已发布' : '已下架') : (item.upcoming === 'YES' ? '待发布' : '待推送') }}
                </div>
              </div>
            </div>
            <!-- <div class="tw-m-t-5px tw-m-b-5px size-12">上衣-T恤</div> -->
            <div>
              <div class="tw-m-t-5px tw-m-b-5px size-12 tw-flex">
                <span>{{ item.skcCode }}</span>
              </div>
              <div class="tw-m-t-5px tw-m-b-5px size-12">
                {{ item.storeName }}
              </div>
              <div class="tw-m-t-5px tw-m-b-5px size-12">
                {{ item.designerGroupName }}-{{ item.designerName }}
              </div>
              <div class="tw-m-t-5px tw-m-b-5px size-12 tw-color-[#606266]">
                {{ $filters.formatTime(item.createdTime) }} 创建
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onUnmounted, ref, defineModel, PropType, defineProps, watch, computed, defineEmits } from 'vue';
import { CircleCloseFilled, ElemeFilled, ArrowLeft, CircleCheck } from '@element-plus/icons-vue';
import { DevelopStylePageResListItem } from '../api/types';
import { TYPE_STYLE } from '../constant';

const props = defineProps({
  selectList: {
    type: Array as PropType<DevelopStylePageResListItem[]>,
    default: () => []
  },
});
// onUnmounted(() => {
//   remove('detail-page-data');
// });
const getMainImgUrlAll = (item: DevelopStylePageResListItem) => {
  const list: string[] = (item.pictures || []).filter(v => v.pictureType !== 'MAIN_IMAGE')?.map((v: any) => {
    return v.imageUrl;
  }) ?? [];
  return [item.mainImgUrl, ...list] as string[];
};
</script>

<style lang="scss" scoped>
.app-box {
  display: flex;
  overflow: hidden;
  width: 100%;
  height: 100%;
}
.bth-flex {
  display: flex;
  align-items: center;
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  background: #fff;
}
.l-auto {
  margin-left: auto;
}
.w-200 {
  width: 200px;
}
.label-m {
  margin: 0 10px 0 40px;
}
.table-box {
  flex: 1;
  overflow-y: scroll;
  background-color: #fff;
  padding: 10px;
}
.footer {
  display: flex;
  align-items: center;
  margin-top: 10px;
  padding: 10px;
  background: #fff;
}
.bth-text {
  cursor: pointer;
  color: #605CE5;
}
.tb-coll {
  display: flex;
  align-items: center;
  background-color: #fff;
  padding: 10px 10px 0;
  color: gray;
}
.tb-cill-l {
  margin-left: auto;
  margin-right: 20px;
}
.p-a {
  position: absolute;
  left: 0;
  bottom: 0;
  // background-color: rgba(112, 182, 3, 0.8);
  padding: 5px 8px;
  border-radius: 2px;
  color: white;
}
.border-gray {
  border: 1px solid #d7d7d7;
}
.size-12 {
  font-size: 12px;
}
.p-a-l-t {
  position: absolute;
  left: 0;
  top: 0;
}
.p-a-l-b {
  position: absolute;
  left: 0;
  bottom: 0;
}
.eliminate-bg {
  display: flex;
  align-items: center;
  padding: 2px 5px;
  background-color: red;
  color: #fff;
  font-size: 14px;
}
.num-bg-red {
  display: inline-block;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: red;
  color: #fff;
  text-align: center;
  line-height: 20px;
  cursor: pointer;
}
.bg-409eff {
  background-color: #605CE5;
  width: 10px;
  height: 10px;
  border-radius: 50px;
}
</style>
