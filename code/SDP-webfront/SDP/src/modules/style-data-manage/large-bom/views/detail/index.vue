<script lang="ts" setup>
import BomData from './components/bom-data/index.vue';
import { getProductionBomDetail } from '../../api';
import { IV1ProdBomRes } from '../../api/types';
import { useRoute, useRouter } from 'vue-router';
import { computed, onMounted, ref } from 'vue';

const { params } = useRoute();
const prodBomInfoId = params.id as string;

const detailData = ref({} as IV1ProdBomRes);
// 核价详情
const checkPriceDetailVo = computed(() => detailData.value?.checkPriceDetailVo ?? {});
// bom详情
const bomOrderDetailVo = computed(() => detailData.value?.bomOrderDetailVo ?? {});

const init = async () => {
  const { data } = await getProductionBomDetail(prodBomInfoId);
  detailData.value = data ?? {};
};

const router = useRouter();
const handleBack = () => {
  router.back();
};

onMounted(init);
</script>

<template>
  <sc-app-page :main="{ style: { padding: '15px' } }">
    <template #main>
      <PageCard title="基本信息">
        <div class="tw-flex">
          <div class="tw-flex">
            <ImageViewer
              v-if="checkPriceDetailVo?.customerPictureList?.[0]"
              :list="checkPriceDetailVo?.customerPictureList"
              class="img-wrap"
            >
              <template #default="{ view }">
                <el-image
                  :src="$filters.ossUrl(checkPriceDetailVo?.customerPictureList?.[0])"
                  fit="cover"
                  class="reset-img customer"
                  @click="view"
                />
              </template>
            </ImageViewer>
            <ImageViewer
              v-if="checkPriceDetailVo?.designPictureList?.[0]"
              :list="checkPriceDetailVo?.designPictureList"
              class="img-wrap"
            >
              <template #default="{ view }">
                <el-image
                  :src="$filters.ossUrl(checkPriceDetailVo?.designPictureList?.[0])"
                  fit="cover"
                  class="reset-img design"
                  @click="view"
                />
              </template>
            </ImageViewer>
          </div>
          <el-form
            :model="detailData"
            label-suffix="："
            label-width="90px"
            class="tw-flex-1"
          >
            <sc-responsive-row>
              <el-form-item label="款式号">
                {{ detailData.styleCode }}
              </el-form-item>
              <el-form-item label="款式品类">
                {{ detailData.styleTypeName }}
              </el-form-item>
              <el-form-item label="设计师">
                {{ bomOrderDetailVo.designerName }}
              </el-form-item>
              <el-form-item label="创建时间">
                {{ $filters.formatTime(bomOrderDetailVo.createdTime) }}
              </el-form-item>
            </sc-responsive-row>
          </el-form>
        </div>
      </PageCard>
      <PageCard>
        <el-form
          label-suffix=":"
          class="clear-form-margin"
        >
          <sc-responsive-row>
            <el-form-item label="bom版本号">
              {{ detailData.bomVersion }}
            </el-form-item>
            <el-form-item label="SKC">
              {{ detailData.designCode }}
            </el-form-item>
            <el-form-item label="款式颜色">
              {{ detailData.color }}
            </el-form-item>
          </sc-responsive-row>
        </el-form>
      </PageCard>
      <BomData :data="bomOrderDetailVo" />
    </template>
    <template #ffooter>
      <div class="tw-w-100% tw-flex tw-flex-justify-center">
        <el-button @click="handleBack">
          返 回
        </el-button>
      </div>
    </template>
  </sc-app-page>
</template>

<style lang="scss" scoped>
.img-wrap {
  position: relative;
  width: 110px;
  height: 120px;
  margin: 0 10px;
  :deep(.el-image) {
    width: 100%;
    height: 100%;
  }
  .reset-img {
    position: relative;
    border-radius: 5px;
  }
  .customer {
    &::after {
      content: '客';
      position: absolute;
      right: 0;
      z-index: 1;
      font-size: 15px;
      padding: 5px;
      background-color: #6879d5;
      color: #fff;
    }
  }
  .design {
    &::after {
      content: '设';
      position: absolute;
      right: 0;
      z-index: 1;
      font-size: 15px;
      padding: 5px;
      background-color: #25bedc;
      color: #fff;
    }
  }
}
</style>
