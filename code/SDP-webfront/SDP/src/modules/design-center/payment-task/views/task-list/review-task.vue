<template>
  <div class="app-box">
    <div class="bth-flex">
      <el-button
        class="tw-mr-4"
        :icon="ArrowLeft"
        @click="goToPath"
        link
      />
      <div>开款任务处理</div>
      <el-button
        class="l-auto"
        type="primary"
        @click="submit"
      >
        提交结果
      </el-button>
    </div>
    <div class="table-box">
      <div class="tw-flex tw-gap-10px tw-flex-wrap">
        <div
          class="tw-w-230px tw-h-350px"
          v-for="(item, index) in selectList"
          :key="item.taskId"
        >
          <div class="border-gray tw-p-6px">
            <div class="tw-position-relative">
              <el-image
                class="tw-w-215px tw-h-200px"
                :src="item.mainImgUrl"
                :preview-src-list="getMainImgUrlAll(item)"
                show-progress
                :initial-index="0"
                fit="contain"
              />
              <div
                class="p-a"
                :style="`background-color: ${TYPE_OF_OPENING_LIST.find(v => v.value === item.styleType)?.color}`"
              >{{ TYPE_OF_OPENING_LIST.find(v => v.value === item.styleType)?.label }}</div>
              <div class="p-a-r-t">
                <div
                  v-if="item.isEliminate && !item.notProcess"
                  class="eliminate-bg"
                >
                  <el-icon
                    color="#fff"
                  ><CircleCloseFilled /></el-icon>
                  淘汰
                </div>
                <div
                  v-if="item.notProcess"
                  class="eliminate-bg"
                  style="background-color: gray;"
                >
                  <el-icon
                    color="#fff"
                  ><ElemeFilled /></el-icon>
                  暂不处理
                </div>
                <div
                  v-if="!item.notProcess && !item.isEliminate"
                  class="eliminate-bg"
                  style="background-color: #605CE5;"
                >
                  <el-icon
                    color="#fff"
                  ><CircleCheck /></el-icon>
                  通过
                </div>
              </div>
            </div>
            <!-- <div class="tw-m-t-5px tw-m-b-5px size-12">上衣-T恤</div> -->
            <div class="tw-h-100px">
              <el-button
                :disabled="!item.sameStyleNum && !item.similarStylesNum"
                text
                type="primary"
                bg
                class="tw-w-100% tw-m-t-8px tw-m-b-8px"
                @click="handleOpenDialogSetItem(item)"
              >
                <div v-if="item.sameStyleNum || item.similarStylesNum" class="tw-flex tw-flex-center-xy">
                  同款({{ item.sameStyleNum || 0 }})
                  /
                  相似款({{ item.similarStylesNum || 0 }})
                </div>
                <div v-else class="tw-flex tw-flex-center-xy tw-color-[#606266]">暂无同款</div>
              </el-button>
              <div class="tw-m-t-5px tw-m-b-5px size-12 tw-flex">
                <span>设计: {{ item.creatorName }}</span>
                <span class="tw-m-l-auto" v-if="item.wavebandName">波段: {{ item.wavebandName }}</span>
              </div>
              <div class="tw-m-t-5px tw-m-b-5px size-12" v-if="item.storeName">
                店铺: {{ item.storeName }}
              </div>
              <div class="tw-m-t-5px tw-m-b-5px size-12 tw-flex">
                <span class="tw-m-r-a" v-if="item.platformName">平台: {{ item.platformName }}</span>
                <span v-if="item.price">价格: ¥{{ item.price }}</span>
              </div>
            </div>
          </div>
          <div class="tw-m-t-10px tw-m-b-10px tw-flex-center-xy">
            <span
              v-if="!item.notProcess"
              class="tw-m-l-10px tw-m-r-10px tw-color-#605CE5 tw-cursor-pointer"
              @click="item.isEliminate = !item.isEliminate"
            >{{ item.isEliminate ? '通过' : '淘汰' }}</span>
            <span
              v-if="item.notProcess"
              class="tw-m-l-10px tw-m-r-10px tw-color-#605CE5 tw-cursor-pointer"
              @click="item.isEliminate = false;item.notProcess = false;"
            >通过</span>
            <span
              v-if="item.notProcess"
              class="tw-m-l-10px tw-m-r-10px tw-color-red tw-cursor-pointer"
              @click="item.isEliminate = true;item.notProcess = false;"
            >淘汰</span>
            <span
              v-if="!item.notProcess"
              @click="item.notProcess = !item.notProcess"
              class="tw-m-l-10px tw-m-r-10px tw-color-gray tw-cursor-pointer"
            >暂不处理</span>
            <div v-if="!item.notProcess">
              <span
                @click="dialogFormVisibleFun(index)"
                class="tw-m-l-10px tw-m-r-10px tw-color-gray tw-cursor-pointer"
              >备注</span>
              <el-popover
                placement="right"
                :width="400"
                trigger="hover"
              >
                <template #reference>
                  <span v-if="item.remark.length" class="num-bg-red">{{ item.remark.length }}</span>
                </template>
                <template #default>
                  <div class="tw-m-b-10px">备注记录</div>
                  <el-steps direction="vertical" :active="item.remark.length">
                    <el-step
                      v-for="(r, rIndex) in item.remark"
                      :key="rIndex"
                    >
                      <template #icon>
                        <span class="bg-409eff" />
                      </template>
                      <template #title>
                        <div class="tw-flex" style="font-size: 13px;">
                          <span>{{ $filters.formatTime(r.createdTime) }}</span>
                          <span class="tw-m-l-auto">{{ r.creatorName }}</span>
                        </div>
                      </template>
                      <template #description>
                        <div style="margin-bottom: 20px;">
                          {{ r.remark }}
                        </div>
                      </template>
                    </el-step>
                  </el-steps>
                </template>
              </el-popover>
            </div>
          </div>
        </div>
      </div>
    </div>
    <el-dialog
      v-model="dialogFormVisible"
      title="备注"
      width="500"
    >
      <el-input
        v-model="textarea"
        class="tw-w-100%"
        :rows="4"
        type="textarea"
        placeholder="请输入备注内容"
      />
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取消</el-button>
          <el-button type="primary" @click="gettextareaData">
            确定
          </el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
import { onUnmounted, ref, defineModel, PropType, defineProps, watch, computed, defineEmits } from 'vue';
import { CircleCloseFilled, ElemeFilled, ArrowLeft, CircleCheck, Connection, CopyDocument } from '@element-plus/icons-vue';
import { useRouter } from 'vue-router';
import usePersistTempData from './hooks/usePersistTempData';
import { IListItem, IParams } from './types';
import { developStyleBatchCheckApi, getListSameSkc } from '../../api/index';
import { DevelopStyleBatchCheckReqItem, DevelopStylePageResListItem } from '../../api/types';
import { TYPE_OF_OPENING_LIST, AUDIT_RESUITS, TYPE_STYLE } from '../../constant';
import { ElMessage } from 'element-plus';
import { remarksSaveToType } from '@/api/basis';
import { useAccountStore } from '@/store/account';
import { useDictionary } from '@/hooks/use-dictionary';
import { DICTIONARY_KEY } from '@/constant/dictionary';
import { useLookStyleDialog } from './hooks/use-lookStyle';

const { handleOpenDialog } = useLookStyleDialog();
const { get, remove } = usePersistTempData();
const router = useRouter();
const sum = ref();
const goBack = () => {};
const form = ref<any>({});
const ruleTableForm = ref<{ tableList: any[]; }>({
  tableList: [],
});
const goToPath = () => {
  router.replace('/design-center/payment-task/task-list');
};

const selectList = ref<IListItem[]>(JSON.parse(JSON.stringify(get('detail-page-data') || {})));
const { getDictionaryOptionsSync } = useDictionary();
const init = async () => {
  const { data: sameSkcList } = await getListSameSkc(selectList.value.map((v: IListItem) => v.taskId) as string[]);
  const stylscorerange = await getDictionaryOptionsSync(DICTIONARY_KEY.STYLSCORERANGE);
  const max = stylscorerange?.find(v => v.value === TYPE_STYLE.SIMILAR)?.attributes?.[0]?.name;
  const min = stylscorerange?.find(v => v.value === TYPE_STYLE.SAME)?.attributes?.[0]?.name;
  selectList.value = selectList.value.map((item: IListItem) => {
    // item.sameSkcList = sameSkcList?.filter((v: { developTaskId: string; }) => v.developTaskId === item.taskId) ?? [];
    item.sameSkcList = sameSkcList?.filter((v: { developTaskId: string; }) => v.developTaskId === item.taskId)?.map((v1: any) => {
      return {
        ...v1,
        similarStylesType: (Number(v1.score || 0) > Number(min || 0)) && (Number(v1.score || 0) <= Number(max || 0)) ? TYPE_STYLE.SIMILAR : ((Number(v1.score || 0) <= Number(min || 0)) ? TYPE_STYLE.SAME : ''),
      };
    })?.filter((v1: { similarStylesType: string; }) => !!v1.similarStylesType) ?? [];
    item.similarStylesNum = item.sameSkcList?.filter((v: { score: number; }) => (Number(v.score || 0) > Number(min || 0)) && (Number(v.score || 0) <= Number(max || 0)))?.length ?? 0;
    item.sameStyleNum = item.sameSkcList?.filter((v: { score: number; }) => (Number(v.score || 0) <= Number(min || 0)))?.length ?? 0;
    return item;
  });
};
init();
const submit = async () => {
  const data: DevelopStyleBatchCheckReqItem[] = [];
  selectList.value.forEach((item: DevelopStylePageResListItem) => {
    if (item.notProcess) {
      // 暂不处理不提交给后台
      // data.push({
      //   taskId: item.taskId,
      //   checkResult: AUDIT_RESUITS.UN_CHECK,
      //   remark: '',
      // });
    } else if (item.isEliminate) {
      data.push({
        taskId: item.taskId,
        checkResult: AUDIT_RESUITS.DISUSE,
        // remark: item.myremark,
      });
    } else {
      data.push({
        taskId: item.taskId,
        checkResult: AUDIT_RESUITS.PASS,
        // remark: item.myremark,
      });
    }
  });
  if (!data.length) {
    ElMessage.error('请最少处理一条数据');
    return;
  }
  await developStyleBatchCheckApi(data);
  ElMessage.success('操作成功');
  goToPath();
};


// onUnmounted(() => {
//   remove('detail-page-data');
// });

const dialogFormVisible = ref<boolean>(false);
const accountStore = useAccountStore();
const gettextareaData = async () => {
  selectList.value[selectIndex.value].myremark = textarea.value;
  dialogFormVisible.value = false;
  await remarksSaveToType({
    taskId: selectList.value?.[selectIndex.value]?.taskId ?? '',
    remark: textarea.value,
  });
  selectList.value[selectIndex.value].remark.unshift({
    createdTime: new Date().getTime(),
    creatorName: accountStore.account?.account?.name,
    remark: textarea.value
  });
  // selectList.value[selectIndex.value].myremark
};
const textarea = ref<string>('');
const selectIndex = ref<number>(0);
const dialogFormVisibleFun = (index: number) => {
  dialogFormVisible.value = true;
  selectIndex.value = index;
  textarea.value = '';
  // textarea.value = selectList.value[index].myremark || '';
};
const getMainImgUrlAll = (item: DevelopStylePageResListItem) => {
  const list: string[] = (item.pictures || []).filter(v => v.pictureType !== 'MAIN_IMAGE')?.map((v: any) => {
    return v.imageUrl;
  }) ?? [];
  return [item.mainImgUrl, ...list] as string[];
};
const dialogErr = () => {
  ElMessage.warning('暂无同款或相似款');
};

const handleOpenDialogSetItem = (item: DevelopStylePageResListItem) => {
  // const items: DevelopStylePageResListItem = JSON.parse(JSON.stringify(item));
  // items.sameSkcList = items.sameSkcList.filter((v: { similarStylesType: string; }) => v.similarStylesType === type);
  handleOpenDialog(item);
};
</script>

<style lang="scss" scoped>
.app-box {
  display: flex;
  flex-direction: column;
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
.p-a-r-t {
  position: absolute;
  top: 0;
  right: 0;
  cursor: pointer;
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
.bg-clolr {
  background-color: #d7d7d7;
  cursor: pointer;
}
/* 同款/相似款标签样式 */
.style-tags-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 6px;
  // background: linear-gradient(135deg, #f5f7fa 0%, #e4e7ed 100%);
  border-radius: 8px;
  gap: 4px;
}
.style-tag {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  position: relative;
  padding: 6px 10px;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
  font-size: 13px;
  flex: 1;
  overflow: hidden;
}
.style-tag::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, transparent 0%, rgba(255,255,255,0.4) 100%);
  opacity: 0;
  transition: opacity 0.25s ease;
}
.style-tag:hover::before {
  opacity: 1;
}
/* 有数据时的样式 */
.style-tag.has-data {
  background: linear-gradient(135deg, #605CE5 0%, #7c79eb 100%);
  color: #fff;
  box-shadow: 0 2px 8px rgba(96, 92, 229, 0.25);
}
.style-tag.has-data:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(96, 92, 229, 0.4);
}
.style-tag.has-data:active {
  transform: translateY(0);
  box-shadow: 0 2px 4px rgba(96, 92, 229, 0.3);
}
/* 无数据时的样式 */
.style-tag.no-data {
  background: #dcdfe6;
  color: #909399;
  cursor: not-allowed;
}
.style-tag.no-data:hover {
  background: #c0c4cc;
}
.tag-icon {
  font-size: 14px;
}
.tag-label {
  font-weight: 500;
}
.tag-count {
  font-weight: 600;
  padding: 1px 6px;
  border-radius: 10px;
  font-size: 12px;
  background: rgba(255, 255, 255, 0.25);
  min-width: 18px;
  text-align: center;
}
.style-tag.has-data .tag-count {
  background: rgba(255, 255, 255, 0.3);
}
.tag-divider {
  width: 1px;
  height: 20px;
  margin: 0 2px;
  background: linear-gradient(180deg, transparent 0%, #c0c4cc 50%, transparent 100%);
}
</style>
