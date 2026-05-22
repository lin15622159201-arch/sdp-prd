<template>
  <el-dialog
    v-model="dialogVisible"
    @close="close"
    title=""
    width="50%"
    draggable
    overflow
  >
    <div class="flex-box">
      <div class="list-L">
        <div style="height: 40px" />
        <div>
          <div
            @click="selFun('-1', childList)"
            class="categ-item cur-p"
            :style="`color: ${isSelectedId === '-1' ? '#8080FF' : ''}`"
          >
            全部
          </div>
        </div>
        <div v-for="(treeItem, index) in treeList" :key="index">
          <div
            @click="selFun(treeItem.id, treeItem.children)"
            class="categ-item"
            v-if="treeItem.value === '其他'"
            :style="`color: ${
              isSelectedId === treeItem.id ? '#8080FF' : ''
            };cursor: pointer;`"
          >
            {{ treeItem.value }}
          </div>
          <div class="categ-item" v-else>{{ treeItem.value }}</div>
          <div class="categ-box" v-if="treeItem.value !== '其他'">
            <!-- active -->
            <div
              @click="selFun(item.id, item.children)"
              v-for="item in treeItem.children"
              :key="item.id"
              :class="`categ-item cur-p`"
              :style="`color: ${isSelectedId === item.id ? '#8080FF' : ''}`"
            >
              {{ item.value }}
            </div>
          </div>
        </div>
      </div>
      <div class="list-R">
        <div style="height: 40px">
          <el-input
            clearable
            @keyup.enter="handleEnter"
            v-model="keyText"
            style="width: 100%"
            placeholder="输入品类模糊搜索"
          >
            <template #append>
              <el-button @click="handleEnter" :icon="Search" />
            </template>
          </el-input>
        </div>
        <div class="list-box">
          <div
            v-for="(item, index) in childListItem"
            @click="valueFun(item)"
            :key="index"
            :class="`list-item ${active === item.code ? 'active' : ''}`"
          >
            {{ item.value }}
          </div>
        </div>
      </div>
    </div>
    <template #footer />
  </el-dialog>
</template>

<script lang="ts" setup>
import { ref, defineEmits, computed } from 'vue';
import { ElDialog, ElInput, ElButton } from 'element-plus';
import { Search } from '@element-plus/icons-vue';

const props = defineProps({
  list: {
    type: Array,
    default: () => [],
  },
  childList: {
    type: Array,
    default: () => [],
  },
  categoryCode: {
    type: String,
    default: '',
  },
});
const treeList = computed<any[]>(() => props.list);
const childList = computed(() => props.childList);
const emits = defineEmits(['confirm']);
const dialogVisible = ref(true);
const keyText = ref();
const close = () => {
  emits('confirm', null);
};
const active = ref(props.categoryCode);
const isSelectedId = ref('-1');
const childListItem = ref(JSON.parse(JSON.stringify(childList.value)));
const selFun = (id: string, lists: any) => {
  isSelectedId.value = id;
  childListItem.value = JSON.parse(JSON.stringify(lists));
};

const valueFun = (item: any) => {
  active.value = item.code;
  emits('confirm', item);
};
const handleEnter = () => {
  childListItem.value = JSON.parse(
    JSON.stringify(
      childList.value.filter((val: any) => {
        return val.value.includes(keyText.value);
      })
    )
  );
};
</script>

<style scoped>
.flex-box {
  display: flex;
}
.list-box {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  max-height: 400px;
  overflow: hidden auto;
}
.list-item {
  flex: 0 0 calc((100% - 3 * 10px) / 4);
  padding: 6px 0;
  border: 1px solid #f2f2f2;
  text-align: center;
  font-size: 13px;
  color: #111;
  cursor: pointer;
  border-radius: 4px;
}
.list-L {
  width: 150px;
}
.list-R {
  flex: 1;
}
.categ-item {
  margin: 15px 0;
  color: #7f7f7f;
}
.categ-box {
  padding-left: 10px;
}
.cur-p {
  cursor: pointer;
}
.active {
  border: 1px solid rgba(128, 128, 255, 1);
  background-color:rgba(128, 128, 255, 0.1686);
  color: #8080FF;
}
</style>
