<template>
  <el-dialog
    v-model="dialogTableVisible"
    title="选择风格模型"
    width="80%"
  >
    <div class="search">
      <el-tabs
        v-model="activeName"
        class="demo-tabs"
        @tab-click="handleClick"
      >
        <el-tab-pane label="全部" name="first" />
        <el-tab-pane label="收藏" name="second" />
      </el-tabs>
      <div class="lable" style="margin-left: auto;">服装类型</div>
      <el-select
        v-model="form.clothTypeName"
        style="width: 160px;"
        filterable
      >
        <el-option
          v-for="item in fGclothTypeList"
          :key="item.value"
          :label="item.label"
          :value="item.label"
        />
      </el-select>
      <div class="lable">模型</div>
      <el-input
        style="width: 160px;"
        v-model="form.styleModelName"
        placeholder="请输入模型"
      />
      <el-button
        class="m-l-10"
        type="primary"
        @click="init"
      >
        搜索
      </el-button>
      <el-button
        @click="reset"
      >
        重置
      </el-button>
    </div>
    <div class="items-box">
      <div
        class="items"
        v-for="(item, index) in collectData"
        :key="item.styleModelId"
        @click.stop="selectCollect(item, index)"
      >
        <div :class="`img-text-box ${index === active ? 'activeBorder' : ''}`">
          <img
            v-if="item.sampleImage"
            class="img-style"
            :src="item.sampleImage"
            alt=""
          >
          <img
            v-if="!item.sampleImage"
            style="transform: scale(.5);"
            class="img-style"
            :src="zwtp"
            alt=""
          >
          <div class="type-text" v-if="item.clothTypeName">
            {{ item.clothTypeName }}
          </div>
          <div
            @click.stop="collectFun(item.styleModelId, 0)"
            v-if="item.collect === 1 || activeName === 'second'"
            class="identifier"
          >
            <img :src="sc" alt="">
          </div>
          <div
            @click.stop="collectFun(item.styleModelId, 1)"
            v-if="item.collect === 0"
            class="identifier noIdentifier"
          >
            <img :src="sc" alt="">
          </div>
        </div>
        <div class="clamp-text">{{ item.styleModelName }}</div>
      </div>
    </div>
    <div class="pagination-box">
      <el-pagination
        background
        :pageSize="20"
        layout="prev, pager, next"
        :total="total"
        @current-change="handleCurrentChange"
      />
    </div>
  </el-dialog>
</template>
<script lang="ts" setup>
import { reactive, ref, computed, onMounted } from 'vue';
import { useDictionary } from '@/hooks/use-dictionary2';
import { DICTIONARY_KEY } from '@/constant/dictionary';
import { styleModelUserCollectPageApi, styleModelPageApi, userCollectStyleModelCollectOrCancelApi } from './api';
import { StyleModelUserCollectPageResListItem, StyleModelPageResListItem } from './api/types';
import sc from '@/assets/sc.png';
import zwtp from '@/assets/zwtp.png';

const emit = defineEmits<{
  (event: 'submit', item: StyleModelUserCollectPageResListItem): void;
}>();
const active = ref<number | null>(null);
const activeName = ref('first');
const pageNums = ref<number>(1);
const total = ref<number>(0);
const dialogTableVisible = defineModel({
  type: Boolean,
  default: false,
});
const { getEnableDictionaryOptions } = useDictionary();
const fGclothTypeList = computed(() => getEnableDictionaryOptions(DICTIONARY_KEY.FGCLOTHTYPE));
const form = reactive<any>({});

const handleClick = () => {
  active.value = null;
  pageNums.value = 1;
  init();
};


const handleCurrentChange = (val: number) => {
  pageNums.value = val;
  init();
};

const collectData = ref<any>([]);
const init = async () => {
  const { data } = await (activeName.value === 'first' ? styleModelPageApi : styleModelUserCollectPageApi)({
    pageNum: pageNums.value,
    pageSize: 20,
    selectCollect: 1,
    ...form,
    enable: 1,
  });
  total.value = data.total || 0;
  collectData.value = data.list;
};



const time = ref<any>(null);
const inputFun = () => {
  if (time.value) {
    clearTimeout(time.value);
  }
  time.value = setTimeout(() => {
    init();
  }, 800);
};

const collectFun = async (styleModelId: string, operatorType: number) => {
  await userCollectStyleModelCollectOrCancelApi({
    styleModelId,
    operatorType,
  });
  init();
};

// 选中收藏
const selectCollect = (item: StyleModelUserCollectPageResListItem, index: number) => {
  active.value = index;
  dialogTableVisible.value = false;
  emit('submit', item);
};

const reset = () => {
  form.clothTypeName = '';
  form.styleModelName = '';
  init();
};

onMounted(async () => {
  const { data } = await styleModelUserCollectPageApi(({
    pageNum: pageNums.value,
    pageSize: 20,
    selectCollect: 1,
    ...form,
  }));
  if (data.total) {
    total.value = data.total || 0;
    collectData.value = data.list;
    activeName.value = 'second';
  } else {
    init();
  }
});

</script>

<style scoped lang="scss">
.search {
  display: flex;
  align-items: center;
  width: 100%;
}
.lable {
  margin: 0 10px;
}
.img-text-box {
  position: relative;
  width: 180px;
  height: 180px;
  margin-bottom: 5px;
  cursor: pointer;
}
.type-text {
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 5px;
  text-align: center;
  background-color: rgba(0, 0, 0, .7);
  color: #fff;
  
}
.identifier {
  position: absolute;
  top: 0;
  right: 0;
  background: orange;
  img {
    object-fit: cover;
    width: 20px;
  }
}
.noIdentifier {
  display: none;
  background: gray;
}
.img-text-box:hover .noIdentifier {
  display: block;
}
.items {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 180px;
}
.items-box {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}
.pagination-box {
  display: flex;
  justify-content: right;
  margin: 20px 0;
}
.activeBorder {
  border: 1px solid #605CE5;
}
.img-style {
  width: 180px;
  height: 180px;
  object-fit: cover;
}
.m-l-10 {
  margin-left: 10px;
}
.clamp-text {
  display: -webkit-box;
  width: 180px;
  overflow: hidden;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  text-align: center;
}
</style>
