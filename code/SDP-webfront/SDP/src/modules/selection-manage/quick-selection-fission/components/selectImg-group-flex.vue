<template>
  <div class="main-right">
    <div
      class="img-items"
      v-for="(item, index) in chooseProductList[indexChooseProduct]?.pickingStyleDetails ?? []"
      :key="item.pickingId"
    >
      <div class="hostGraph-img-box">
        <div
          class="hostGraph-item-box"
          v-for="(itemImg, indexs) in item.pickingStyleImages"
          :key="indexs"
        >
          <div
            v-if="itemImg.mainImageType === 1"
            class="bth-mainPicture"
          >
            <el-button
              type="primary"
            >
              主图
            </el-button>
          </div>
          <div v-if="itemImg.mainImageType === 0" class="hover-show">
            <el-button @click="mainImageTypeFun(item.pickingStyleImages, itemImg)">
              设为主图
            </el-button>
          </div>
          <el-icon
            class="search-show"
            @click="imgLook(index, indexs)"
            size="16"
          ><Search /></el-icon>
          <el-icon
            v-if="item.pickingState === 1"
            class="ico-circleCheckFilled-select"
            @click="item.pickingState = 0"
            style="cursor: pointer;"
            color="#70B603"
            size="30"
          ><CircleCheckFilled /></el-icon>
          <el-icon
            v-else
            class="ico-circleCheckFilled-select hoverShow"
            @click="item.pickingState = 1"
            style="cursor: pointer;"
            color="#7F7F7F"
            size="30"
          ><CircleCheckFilled /></el-icon>
          <img
            :src="itemImg.repairImgUrl || itemImg.pictureUrl"
            @click="imgLook(index, indexs)"
            alt=""
            class="hostGraph-item"
          >
        </div>
      </div>
    </div>
    <ImageDetail
      v-model="imageDetailDialog.visible"
      :taData="imageDetailDialog.taData"
      :picIndex="imageDetailDialog.picIndex"
      :isFission="true"
    />
  </div>
</template>
<script setup lang="ts">
import { ref, computed, defineModel } from 'vue';
import {
  IPickingStylePageResPickingStyleImagesItem,
} from '@/modules/selection-manage/aigc-selection-list/api/type';
import { CircleCheckFilled, Search } from '@element-plus/icons-vue';
import { useRouter, useRoute } from 'vue-router';
import type { RouteLocationNormalized } from 'vue-router';
import {
  PICK_STATE_ENUM,
  TASK_TYPE,
} from '@/modules/selection-manage/aigc-selection-list/constant';
// import TaskDetailPattern from '../components/task-detail-pattern.vue';
import { getRefImgUrl } from '../../utils';
import ImageDetail from '@/components/view-picture/components/image-detail/image-detail.vue';
// import wcl from '@/assets/wcl.png';

const router = useRouter();
const route: RouteLocationNormalized = useRoute();
const imageDetailDialog = ref<any>({
  visible: false,
});

const indexChooseProduct: any = defineModel<any>('indexChooseProduct');
const chooseProductList: any = defineModel<any>('chooseProductList');
/** 当前选款 */
const currentProduct = computed(() => {
  return chooseProductList.value[indexChooseProduct.value];
});
/** 参考图 */
const refImgUrl = computed(() => {
  const product = chooseProductList.value[indexChooseProduct.value];
  if (!product) return '';
  return getRefImgUrl(product);
});

// 设为主图
const mainImageTypeFun = (pickingStyleImages: IPickingStylePageResPickingStyleImagesItem[], itemImg: IPickingStylePageResPickingStyleImagesItem) => {
  (pickingStyleImages || []).forEach((v) => {
    v.mainImageType = 0;
  });
  itemImg.mainImageType = 1;
};


// 查看大图
const imgLook = (groupIndex: number, index: number) => {
  if (!currentProduct.value) return;
  const refImg: string | string[] = refImgUrl.value;
  // if (route.params.taskType === TASK_TYPE.PatternTryon) {
  //   refImg = patternDetailRef.value?.taskDetail?.garmImgUrls || [];
  // }
  const groupImgs = currentProduct.value.pickingStyleDetails?.[groupIndex]?.pickingStyleImages || [];
  imageDetailDialog.value = {
    visible: true,
    taData: {
      ...currentProduct.value,
      taskId: currentProduct.value.designTaskId,
      refImgUrl: refImg,
      images: groupImgs.map((v: any) => {
        return {
          ...v,
          imageId: v.pickingId,
          imageUrl: v.pictureUrl,
          faceRepairUrl: v.repairImgUrl,
        };
      })
    },
    picIndex: index,
  };
};
// 标记
const mark = (item: any) => {
  item.pickingState === PICK_STATE_ENUM.YES ? item.pickingState = PICK_STATE_ENUM.WAIT : item.pickingState = PICK_STATE_ENUM.YES;
};

</script>
<style scoped>
.fheader-box {
  display: flex;
  align-items: center;
  padding: 10px 0 20px;
}
.title-font {
  font-weight: 600;
  margin: 0 20px;
  font-size: 16px;
}
.fheader-left {
  margin-left: auto;
  margin-right: 20px;
}
.main-box {
  display: flex;
  min-width: 1114px;
  overflow: hidden;
}
.main-left {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 220px;
  margin-right: 20px;
  /* overflow-x: hidden;
  overflow-y: auto; */
  overflow: hidden auto;
  height: 100%;
}
.main-right {
  flex: 1;
  overflow: hidden auto;
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}
.hostGraph {
  width: 200px;
  height: 200px;
  object-fit: cover;
}
.img-box {
  position: relative;
  width: 200px;
  height: 200px;
}
.img-footer {
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  position: absolute;
  bottom: 0;
  width: 100%;
  background-color: rgba(0, 0, 0, .7);
  padding: 7px 0;
}
.img-footer-l {
  color: #fff;
  cursor: pointer;
}
.img-footer-m {
  width: 2px;
  height: 10px;
  background-color: #fff;
}
.tag-box {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}
.num-box {
  display: flex;
  width: 100%;
  justify-content: space-evenly;
  margin-top: 30px;
  margin-bottom: 40px;
  align-items: center;
}
.num-center {
  display: flex;
  align-items: center;
}
.main-right-operate {
  display: flex;
  flex-direction: column;
  height: 200px;
  margin-right: 10px;
}
.img-items {
  display: flex;
  padding: 10px;
  box-sizing: border-box;
}
.hostGraph-item {
  width: 300px;
  height: 320px;
  object-fit: contain;
}
.hostGraph-item-box {
  position: relative;
  width: 300px;
  height: 320px;
  cursor: pointer;
}
.bth-mainPicture {
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: absolute;
  top: 0;
  width: 100%;
  padding: 5px;
}
.hover-show {
  display: none;
  align-items: center;
  justify-content: space-between;
  position: absolute;
  top: 0;
  width: 100%;
}
.hostGraph-item-box:hover .hover-show {
  display: flex;
  padding: 5px;
}
.hostGraph-img-box {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}
.search-show {
  position: absolute;
  left: 50%;
  top: 50%;
  opacity: 0;
}
.hostGraph-item-box:hover .search-show {
  opacity: 1;
}
.sc-search-area-box :deep(.btns) {
  display: none;
}
.dialog-img {
  width: 100px;
  height: 100px;
  object-fit: cover;
}
.dialog-img-box {
  position: relative;
  width: 100px;
  height: 100px;
  cursor: pointer;
}
.p-a-5 {
  position: absolute;
  top: 5px;
  right: 5px;
  width: 20px;
  height: 20px;
}
.dialog-img-item-box {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  min-height: 120px;
  max-height: 400px;
  overflow: hidden auto;
}
.ico-circleCheckFilled {
  position: absolute;
  top: 0;
  right: 10px;
}
.ico-circleCheckFilled-select {
  position: absolute;
  top: 0;
  right: 0;
}
.hoverShow {
  display: none;
}
.hostGraph-item-box:hover .hoverShow {
  display: block;
}
</style>
