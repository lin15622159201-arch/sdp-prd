<template>
  <div 
    class="virtual-list-container"
    ref="container"
    @scroll="handleScroll"
  >
    <!-- <div class="operation-left">图片</div> -->
    <!-- <div class="operation">操作</div> -->
    <div class="l-table-header" :style="{ transform: `translateX(${-scrollLeft}px)` }">
      <!-- <div class="operation-left" :style="{ transform: `translateX(${scrollLeft}px)` }">图片</div> -->
      <table class="l-table">
        <thead class="l-thead tw-h-60px">
          <tr>
            <th 
              class='l-th tw-w-160px l-td-fixed-left'
              :style="{ transform: `translateX(${scrollLeft}px)`, backgroundColor: '#f5f7fa', border: 'none' }"
            >
              <span>图片</span>
            </th>
            <th 
              v-for="(item, index) in columns.filter(v => !v.fixedRight && !v.fixedLeft)" 
              :key="index" 
              class="l-th"
              :class="`${item.fixedRight ? 'l-th-fixed' : ''} ${item.headerRender ? 'l-th-has-batch' : ''}`"
              :style="`width: ${item.width}px;border: ${item.noBorder ? 'none' : ''}`"
            >
              <div v-if="item.headerRender" class="l-th-batch-wrap">
                <span :class="`${item.labelClassName ? 'labelClassName' : ''}`">{{ item.label }}</span>
                <component :is="item.headerRender()" />
              </div>
              <span v-else :class="`${item.labelClassName ? 'labelClassName' : ''}`">{{ item.label }}</span>
            </th>
            <!-- <th 
              class='l-th tw-w-100px'
              style="border-left: 1px solid #f5f7fa;"
            /> -->
            <th 
              class='l-th tw-w-100px l-th-fixed'
              :style="{ transform: `translateX(${scrollLeft}px)`, backgroundColor: '#f5f7fa', border: 'none' }"
            >
              <div class="tw-flex tw-flex-col center-manin">
                <span>操作</span>
                <el-button
                  class="tw-w-60px"
                  type="primary"
                  @click="handleBatchFill"
                >
                  批量填写
                </el-button>
              </div>
            </th>
          </tr>
        </thead>
      </table>
    </div>
    <div 
      class='virtual-list-placeholder'
      :style="`height: ${totalHeight}px`"
    />
    <div 
      class="virtual-list-content"
      :style="{ transform: `translateY(${offsetY}px)` }"
      ref="content"
    >
      <div class="tw-h-60px" />
      <table class="l-table l-table-body">
        <tbody class="l-tbody">
          <tr 
            class="l-tr" 
            v-for="(row, rowIndex) in visibleData" 
            :key="row.uuid"
            :style="`height: ${itemHeight}px`"
          >
            <td 
              class="l-td" 
              v-for="(item, colIndex) in columns" 
              :key="colIndex"
              :class="{ 'l-td-fixed': item.fixedRight, 'l-td-fixed-left': item.fixedLeft }"
              :style="`width: ${item.width}px;border: ${item.noBorder ? 'none' : ''};border-bottom: 1px solid #dcdfe6;`"
            >
              <component 
                :is="item.render?.(row, colIndex, rowIndex + startIndex)" 
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, watch, onMounted, PropType, defineProps } from 'vue';

const emit = defineEmits<{
  (event: 'batchFill'): void;
}>();
const props = defineProps({
  data: {
    type: Array as PropType<any[]>,
    default: () => []
  },
  itemHeight: {
    type: Number,
    default: 60
  },
  bufferSize: {
    type: Number,
    default: 5
  },
  containerHeight: {
    type: Number,
    default: 500
  },
  columns: {
    type: Array as PropType<any[]>,
    default: () => []
  }
});

const container = ref<any>(null);
const scrollTop = ref(0);
const scrollLeft = ref(0);
const visibleCount = ref(0);
const startIndex = ref(0);
const endIndex = ref(0);
const offsetY = ref(0);

const handleBatchFill = () => {
  emit('batchFill');
};
// 计算可视区域范围
const calculateVisibleRange = () => {
  let start = Math.floor(scrollTop.value / props.itemHeight) - props.bufferSize;
  start = Math.max(0, start);
  
  let end = start + visibleCount.value + props.bufferSize * 2;
  end = Math.min(props.data.length, end);
  
  offsetY.value = start * props.itemHeight;
  
  startIndex.value = start;
  endIndex.value = end;
};

const totalHeight = computed(() => props.data.length * props.itemHeight);

const visibleData = computed(() => props.data.slice(startIndex.value, endIndex.value));
watch(
  () => props.data,
  calculateVisibleRange,
  { deep: true }
);

watch(
  () => props.containerHeight,
  () => {
    visibleCount.value = Math.ceil(props.containerHeight / props.itemHeight);
    calculateVisibleRange();
    if (container.value) {
      container.value.style.height = `${props.containerHeight}px`;
    }
  },
  { immediate: true }
);

onMounted(() => {
  if (container.value) {
    container.value.style.height = `${props.containerHeight}px`;
  }
  visibleCount.value = Math.ceil(props.containerHeight / props.itemHeight);
  calculateVisibleRange();
});

const handleScroll = () => {
  if (!container.value) return;
  scrollTop.value = container.value.scrollTop;
  scrollLeft.value = container.value.scrollLeft;
  calculateVisibleRange();
};
</script>

<style scoped>
.virtual-list-container {
  position: relative;
  width: 100%;
  overflow: auto;
  box-sizing: border-box;
}
.l-table-header {
  position: sticky;
  left: 0;
  top: 0;
  z-index: 5;
  background-color: #f5f7fa;
}
.virtual-list-placeholder {
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  z-index: 1;
}
.virtual-list-content {
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  z-index: 2;
  width: 100%;
}
.l-table {
  width: 100%;
  border: 1px solid #dcdfe6;
  border-collapse: collapse;
  color: #666;
  table-layout: fixed;
}
.l-table-body {
  border-top: none;
}
.l-th {
  padding: 4px 8px;
  border-left: 1px solid #dcdfe6;
  background-color: #f5f7fa;
  text-align: center;
  box-sizing: border-box;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 14px;
}
.l-td {
  padding: 8px;
  border-left: 1px solid #dcdfe6;
  border-bottom: 1px solid #dcdfe6;
  background: #fff;
  text-align: center;
  box-sizing: border-box;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.l-tr:hover .l-td {
  background-color: #f5f5f5;
}
.l-td-fixed {
  position: sticky;
  right: 0;
  z-index: 6;
  /* background-color: #f5f7fa; */
  background-color: #fff;
  border-left: none;
  /* border-right: 2px solid #dcdfe6; */
}
.l-th-fixed::before, .l-td-fixed::before {
  content: "";
  position: absolute;
  left: 0;
  top: 0;
  bottom: -1px;
  width: 10px;
  overflow: hidden;
  touch-action: none;
  pointer-events: none;
  box-shadow: inset -10px 0 10px -10px rgba(0, 0, 0, 0.15) !important;
}
.l-td-fixed-left::before {
  content: "";
  position: absolute;
  top: 0;
  right: 0;
  bottom: 1px;
  width: 10px;
  overflow: hidden;
  touch-action: none;
  pointer-events: none;
  box-shadow: inset 12px 0 10px -10px rgba(0, 0, 0, 0.15) !important;
}
.l-th-fixed {
  position: sticky;
  right: 0;
  z-index: 6;
  background-color: #f5f7fa;
  border-left: none;
  /* border-right: 2px solid #dcdfe6; */
}
/* .l-td-fixed {
  background-color: #fff;
} */
.l-tr:hover .l-td-fixed {
  background-color: #f5f5f5;
}
.labelClassName {
  position: relative;
}
.labelClassName::after {
  content: '*';
  display: block;
  position: absolute;
  left: -10px;
  top: 0;
  color: red;
}
/* 批量填写表头样式 */
.l-th-has-batch {
  padding: 4px !important;
}
.l-th-batch-wrap {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
}
.l-th-batch-wrap span {
  font-size: 12px;
  line-height: 1.2;
}
.l-th-batch-wrap .el-select {
  width: 100%;
}
.operation {
  display: flex;
  position: fixed;
  right: 20px;
  font-size: 14px;
  width: 102px;
  height: 40px;
  background-color: #f5f7fa;
  color: #666;
  font-weight: 900;
  z-index: 999;
  justify-content: center;
  align-items: center;
}
.operation-left {
  display: flex;
  position: fixed;
  left: 0;
  top: 0;
  font-size: 14px;
  width: 160px;
  height: 40px;
  background-color: #f5f7fa;
  color: #666;
  font-weight: 900;
  z-index: 999;
  justify-content: center;
  align-items: center;
}
.l-td-fixed-left {
  position: sticky;
  left: 0;
  z-index: 3; /* 比中间列高，比右侧固定列低 */
  background-color: #fff;
  border-right: 1px solid #dcdfe6;
  border-left: none;
}
.l-tr:hover .l-td-fixed-left {
  background-color: #f5f5f5;
}
.center-manin {
  justify-content: center;
  align-items: center;
}
</style>
