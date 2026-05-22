<template>
  <sc-app-page class="custom-app-page">
    <template #fheader>
      <div class="fheader-box">
        <el-icon style="cursor: pointer;" @click="goToBack"><ArrowLeftBold /></el-icon>
        <div class="title-font">快速选款</div>
        <el-icon
          style="cursor: pointer;"
          color="#605ce5"
          @click="searchFun"
        ><Filter /></el-icon>
        <span class="tw-m-l-20px tw-m-r-10px">波段</span>
        <el-select
          class="tw-w-150px"
          filterable
          v-model="form.waveBandCode"
          placeholder="请选择"
          @change="getNameChange($event, 'waveBandName', plmClothingBand)"
        >
          <el-option
            v-for="item in plmClothingBand"
            :key="item.value"
            :label="item.label"
            :value="item.value || ''"
          />
        </el-select>
        <span class="tw-m-l-20px tw-m-r-10px slight">店铺</span>
        <span class="w-150">
          <DictionarySelect
            filterable
            class="tw-w-150px"
            v-model="form.storeId"
            :dictionary="CUSTOM_DICTIONARY_KEY.SHOP_LIST"
            @change="getNameChange($event, 'storeName', SHOP_LIST)"
          />
        </span>
        
        <!-- <el-select
          class="tw-w-150px"
          v-model="form.storeId"
          placeholder="请选择"
          @change="getNameChange($event, 'storeName', SHOP_LIST)"
        >
          <el-option
            v-for="item in SHOP_LIST"
            :key="item.value"
            :label="item.label"
            :value="item.value || ''"
          />
        </el-select> -->
        <el-button
          v-show="chooseProductList.length === 1"
          type="primary"
          class="fheader-left"
          @click="save"
        >保存</el-button>
        <el-icon
          v-show="chooseProductList.length && chooseProductList.length !== 1"
          style="cursor: pointer;"
          class="fheader-left"
          @click="historyFun"
        ><AlarmClock /></el-icon>
        <el-button
          v-show="chooseProductList.length && chooseProductList.length !== 1"
          type="primary"
          @click="previous"
        >上一条</el-button>
        <el-button
          v-show="chooseProductList.length && chooseProductList.length !== 1"
          @click="next"
          :loading="loading"
          type="primary"
        >下一条</el-button>
      </div>
    </template>
    <template #main>
      <div class="tw-h-100% main-box" v-show="chooseProductList.length">
        <div class="main-left">
          <div class="img-box">
            <!-- <img
              :src="chooseProductList[indexChooseProduct]?.inspirationImage"
              alt=""
              class="hostGraph"
            > -->
            <el-image
              class="hostGraph"
              :src='chooseProductList[indexChooseProduct]?.inspirationImage'
              fit='cover'
              style="width: 100%; height: 100%"
              :preview-src-list="[chooseProductList[indexChooseProduct]?.inspirationImage || '']"
              preview-teleported
            />
            <div class="img-footer">
              <div @click="toCheck(chooseProductList[indexChooseProduct])" class="img-footer-l">选图记录</div>
              <span class="img-footer-m" />
              <div @click="regenerate" class="img-footer-l">重新生成</div>
            </div>
          </div>
          <div class="text-left">
            <div class="m-5">
              任务：{{ chooseProductList[indexChooseProduct]?.taskCode ?? '-' }}
            </div>
            <div class="m-5">
              算法品类：{{ chooseProductList[indexChooseProduct]?.identifyCategoryName ?? '-' }}
            </div>
            <div class="m-5">
              模型：{{ designTaskData?.modeName ?? '-' }}
            </div>
            <div class="m-5" v-show="isShow">
              参考强度：{{ designTaskData?.refWeight === 1 ? '高' : (designTaskData?.refWeight === 2.5 ? '中' : (designTaskData?.refWeight === 4 ? '低' : '-')) }}
            </div>
            <div class="m-5" v-show="isShow">
              生成模式：{{ designTaskData.generateMode === 0 ? '单姿势' : designTaskData.generateMode === 1 ? '多姿势' : '-' }}
            </div>
          </div>
          <div class="tag-box" v-show="isShow">
            <el-tag v-if="designTaskData.filterBack === 1" type="primary">背面增强</el-tag>
            <el-tag v-if="designTaskData.promiseEnhanced === 1" type="primary">履约增强</el-tag>
            <el-tag v-if="designTaskData.faceRepair === 1" type="primary">脸部修复</el-tag>
            <el-tag v-if="designTaskData.fastForward === 1" type="primary">模型加速</el-tag>
            <el-tag v-if="designTaskData.tryOnFix === 1" type="primary">指定素材</el-tag>
          </div>
          <div style="cursor: pointer;">
            <el-icon v-if="isShow" @click="isShow = !isShow"><ArrowUp /></el-icon>
            <el-icon v-if="!isShow" @click="isShow = !isShow"><ArrowDown /></el-icon>
          </div>
          <div class="bg-img-box">
            <div class="t-f">高级设置：</div>
            {{ (!designTaskData.aiModelUrl && !designTaskData.picturePath) ? '-' : ''}}
            <div class="bg-img-item">
              <el-image
                v-if="designTaskData.aiModelUrl"
                style="width: 70px; height: 80px"
                :src="designTaskData?.aiModelUrl"
                :preview-src-list="[designTaskData?.aiModelUrl ?? '']"
                show-progress
                :initial-index="0"
                fit="cover"
              />
              <el-image
                v-if="designTaskData.picturePath"
                style="width: 70px; height: 80px"
                :src="designTaskData?.picturePath"
                :preview-src-list="[designTaskData?.picturePath ?? '']"
                show-progress
                :initial-index="0"
                fit="cover"
              />
            </div>
          </div>
          <div class="num-box">
            <div class="num-center">
              <el-icon color="#70B603" style="margin-right: 5px"><CircleCheckFilled /></el-icon> {{ stateCount.nonZeroCount }}
            </div>
            <div class="num-center">
              <el-icon color="#7F7F7F" style="margin-right: 5px"><CircleCloseFilled /></el-icon> {{ stateCount.zeroCount }}
            </div>
          </div>
          <el-button @click="clearTags">清空选择</el-button>
        </div>
        <div class="main-right">
          <div
            class="img-items"
            v-for="(item, index) in chooseProductList[indexChooseProduct]?.pickingStyleDetails ?? []"
            :key="item.pickingId"
          >
            <div class="main-right-operate">
              <el-icon
                @click="item.pickingState === 1 ? item.pickingState = 0 : item.pickingState = 1"
                style="margin-top: 90px;cursor: pointer;"
                :color="item.pickingState === 1 ? '#70B603' : '#7F7F7F'"
                size="30"
              ><CircleCheckFilled /></el-icon>
              <el-icon
                @click="item.pickingState === 2 ? item.pickingState = 0 : item.pickingState = 2"
                style="margin-top: auto;cursor: pointer;"
                :color="item.pickingState === 2 ? 'red' : '#7F7F7F'"
                size="18"
              ><CircleCloseFilled /></el-icon>
              <el-icon
                @click="evaluate(index + 1)"
                style="margin-top: 10px;cursor: pointer;"
                color="#7F7F7F"
                size="18"
              ><ChatLineSquare /></el-icon>
            </div>
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
                  <el-icon
                    class="search-show"
                    @click="imgLook(index, indexs)"
                  ><Search /></el-icon>
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
                  <el-icon @click="imgLook(index, indexs)"><Search /></el-icon>
                </div>
                <img
                  :src="itemImg.pictureUrl"
                  @click="imgLook(index, indexs)"
                  alt=""
                  class="hostGraph-item"
                >
              </div>
            </div>
          </div>
        </div>
      </div>
      <el-empty v-show="!chooseProductList.length" description="暂无数据" />
      <el-dialog
        v-model="dialogFormVisible"
        title="筛选条件"
        width="400"
      >
        <el-form :model="params">
          <el-form-item
            label="创建人"
            label-width="80px"
            prop="creatorIds"
            :rules="[{ required: true, message: '请选择创建人', trigger: 'change' }]"
          >
            <user-query-select
              ref="userQuerySelect"
              v-model="params.creatorIds"
              multiple
              @handleSearch="handleSearch"
            />
          </el-form-item>
          <el-form-item label="创建时间" label-width="80px">
            <el-date-picker
              v-model="params.pickingTime"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            />
            <!-- :shortcuts="shortcuts" -->
            <!-- :disabled-date="disabledDate" -->
            <!-- @change="handleDateChange" -->
          </el-form-item>
        </el-form>
        <template #footer>
          <div class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取消</el-button>
            <el-button type="primary" @click="handleSearch">
              查询
            </el-button>
          </div>
        </template>
      </el-dialog>
      <el-dialog
        v-model="dialogImgVisible"
        title="定位到未选择"
        width="80%"
      >
        <div class="dialog-img-item-box">
          <div
            class="dialog-img-box"
            v-for="(item, index) in chooseProductList"
            :key="item.pickingId"
            @click="dialogImgFun(index)"
          >
            <!-- <el-icon
              v-if="item?.pickingStyleDetails?.filter(v => (v.pickingState === 1 || v.pickingState === 2)).length"
              class="p-a-5"
              color="#70B603"
              size="18"
            ><CircleCheckFilled /></el-icon> -->
            <img
              class="p-a-5"
              v-if="item?.pickingStyleDetails?.filter(v => (v.pickingState === 1 || v.pickingState === 2)).length"
              :src="ycl"
              alt=""
            >
            <!-- <el-icon
              v-if="!item?.pickingStyleDetails?.filter(v => (v.pickingState === 1 || v.pickingState === 2)).length"
              class="p-a-5"
              color="#7F7F7F"
              size="18"
            ><CircleCloseFilled /></el-icon> -->
            <!-- <img
              class="p-a-5"
              v-if="!item?.pickingStyleDetails?.filter(v => (v.pickingState === 1 || v.pickingState === 2)).length"
              :src="wcl"
              alt=""
            > -->
            <img
              class="dialog-img"
              :src="item.inspirationImage"
              alt=""
            >
          </div>
        </div>
        <template #footer>
          <div class="dialog-footer">
            <el-button @click="dialogImgVisible = false">取消</el-button>
            <el-button type="primary" @click="quickJump">
              快捷跳转
            </el-button>
          </div>
        </template>
      </el-dialog>
      <ImageDetail
        v-model="imageDetailDialog.visible"
        :pic-index="imageDetailDialog.picIndex"
        :task-code="imageDetailDialog.taskCode"
        :details="details"
        :pickingId="chooseProductList?.[indexChooseProduct]?.pickingId ?? ''"
        :generateItem="generateImages[imageDetailDialog.groupIndex]"
      />
    </template>
  </sc-app-page>
</template>
<script setup lang="ts">
import { ref, computed, watch, onMounted, onUnmounted } from 'vue';
import {
  pickingStylePage,
  pickingStyleBatchConfirmApi,
  pickingStyleDesignTaskApi,
  smartDevelopStyleDetailApi,
} from '@/modules/selection-manage/aigc-selection-list/api';
import {
  IPickingStylePageRes,
  IPickingStylePageResListItem,
  IPickingStylePageResPickingStyleImagesItem,
  IPickingStylePageResPickingStyleDetailsItem,
  PickingStyleBatchConfirmReqResultItem,
  PickingStyleBatchConfirmReq,
  PickingStyleDesignTaskRes,
  SmartDevelopStyleDetailRes,
  SmartDevelopStyleDetailResGenerateImagesItem,
} from '@/modules/selection-manage/aigc-selection-list/api/type';
import { ArrowLeftBold, Filter, AlarmClock, ArrowUp, ArrowDown, CircleCheckFilled, CircleCloseFilled, ChatLineSquare, Search } from '@element-plus/icons-vue';
import { useAccountStore } from '@/store/account';
import { IConfigItem } from '@toy/business-components';
import { ElMessage } from 'element-plus';
import type { DatePickerProps } from 'element-plus';
import UserQuerySelect from '@/components/user-query-select/index.vue';
import { useFetchUsers } from '@/components/user-query-select/hooks/use-fetch-users';
import { formatTime } from '@toy/utils';
import EvaluateDialog from '@/components/evaluateDialog';
import ImageDetail from '../components/image-detail/image-detail.vue';
import { useRouter, useRoute } from 'vue-router';
import type { RouteLocationNormalized } from 'vue-router';
import { useRecordDialog } from '../../aigc-selection-list/views/list/hooks/use-record-dialog';
import {
  IDataItem,
} from '../../aigc-selection-list/views/list/type';
import {
  PICK_STATE_ENUM,
} from '@/modules/selection-manage/aigc-selection-list/constant';
import ycl from '@/assets/ycl.png';
import { useSearch } from './hooks/use-search';
import { CUSTOM_DICTIONARY_KEY } from '@/constant/dictionary';
// import wcl from '@/assets/wcl.png';


interface UserQuerySelectComponent {
  defaultSeeMe: () => void;
  // 可以添加其他方法或属性
}
const loading = ref(false);
const router = useRouter();
const route: RouteLocationNormalized = useRoute();
const newTaskCode = ref<string>(route.query.taskCode?.toString() ?? '');
const imageDetailDialog = ref({
  visible: false,
  taskCode: '',
  picIndex: 0,
  groupIndex: 3,
});
const details = ref({});
const generateImages = ref<SmartDevelopStyleDetailResGenerateImagesItem[]>([]);
const isImgDialog = ref(false);
const isShow = ref(false);
const userQuerySelect = ref<UserQuerySelectComponent | null>(null);
const dialogFormVisible = ref(false);
const accountStore = useAccountStore();
const { account } = accountStore;
// const { id } = account;
const id = account?.id ?? '';
const dialogImgVisible = ref(false);
const params = ref({
  pickingTime: [],
  creatorIds: [id || ''],
});
const indexChooseProduct = ref<number>(0);
const chooseProductList = ref<IPickingStylePageResListItem[]>([]);
const init = async () => {
  if (!params.value.creatorIds.length) {
    ElMessage({
      message: '请选择创建人搜索',
      type: 'warning',
    });
    return;
  }
  const res = await pickingStylePage({
    pageNum: 1,
    pageSize: 100,
    pickingState: 0,
    ...params.value,
    pickingStartTime: params.value.pickingTime?.[0] && `${formatTime(params.value.pickingTime[0], 'YYYY-MM-DD')} 00:00:00`,
    pickingEndTime: params.value.pickingTime?.[1] && `${formatTime(params.value.pickingTime[1], 'YYYY-MM-DD')} 23:59:59`, 
    pickingTime: undefined,
    dataSourceType: 'AIGC',
  });
  chooseProductList.value = res.data.list;
  designTask();
};
const form = ref<any>({});
const {
  SHOP_LIST,
  plmClothingBand
} = useSearch();
const getNameChange = (e:any, keyName: string, list: any) => {
  form.value[keyName] = list.find((v: { value: string; }) => v.value === e)?.label;
};
// 保存
const save = () => {
  if (!form.value.storeId) {
    ElMessage({
      message: '店铺不能为空',
      type: 'warning',
    });
    return;
  }
  const confirms = [];
  const result: PickingStyleBatchConfirmReqResultItem[] = [];
  let isPickingState = false;
  chooseProductList.value[indexChooseProduct.value].pickingStyleDetails.forEach((v: IPickingStylePageResPickingStyleDetailsItem) => {
    if (v.pickingState === 0) {
      isPickingState = true;
      v.pickingState = 2;
    }
    result.push({
      pickingStyleId: v.pickingStyleId,
      pickingState: !v.pickingState ? PICK_STATE_ENUM.NO : v.pickingState,
      imageInfos: v.pickingStyleImages
    });
  });
  if (isPickingState) {
    chooseProductList.value[indexChooseProduct.value].state = 0;
  } else {
    chooseProductList.value[indexChooseProduct.value].state = 1;
  }
  confirms.push({
    pickingId: chooseProductList.value[indexChooseProduct.value].pickingId,
    result,
    ...form.value
  });
  pickingStyleBatchConfirmApi({
    confirms,
  }).then(() => {
    ElMessage({
      message: '保存成功',
      type: 'success',
    });
    router.back();
  });
};

// 点击下一条
const next = () => {
  if (!chooseProductList.value.length || chooseProductList.value.length === 1) return;
  loading.value = true;
  // 防止误操作，每次点击【下一条】时 禁用操作 3s
  setTimeout(() => {
    loading.value = false;
  }, 3000);
  const confirms: { pickingId: string; result: PickingStyleBatchConfirmReqResultItem[]; }[] = [];
  const result: PickingStyleBatchConfirmReqResultItem[] = [];
  let isPickingState = false;
  chooseProductList.value[indexChooseProduct.value].pickingStyleDetails.forEach((v: IPickingStylePageResPickingStyleDetailsItem) => {
    if (v.pickingState === 0) {
      isPickingState = true;
      v.pickingState = 2;
    }
    result.push({
      pickingStyleId: v.pickingStyleId,
      pickingState: !v.pickingState ? PICK_STATE_ENUM.NO : v.pickingState,
      imageInfos: v.pickingStyleImages
    });
  });
  if (isPickingState) {
    chooseProductList.value[indexChooseProduct.value].state = 0;
  } else {
    chooseProductList.value[indexChooseProduct.value].state = 1;
  }
  confirms.push({
    pickingId: chooseProductList.value?.[indexChooseProduct.value]?.pickingId ?? '',
    result,
    ...form.value
  });
  if (indexChooseProduct.value < chooseProductList.value.length - 1) {
    console.log('还可以继续！');
  } else {
    ElMessage({
      message: '没有更多了，请调整查询条件或者刷新页面',
      type: 'warning',
    });
  }
  if (!form.value.storeId) {
    ElMessage({
      message: '店铺不能为空',
      type: 'warning',
    });
    return;
  }
  pickingStyleBatchConfirmApi({
    confirms,
  }).finally(() => {
    if (indexChooseProduct.value < chooseProductList.value.length - 1) {
      indexChooseProduct.value += 1;
    }
  });
};
// 点击上一条
const previous = () => {
  if (indexChooseProduct.value > 0) {
    indexChooseProduct.value -= 1;
  } else {
    ElMessage({
      message: '已经是第一条',
      type: 'warning',
    });
  }
};
// 统计未标记
const stateCount = computed(() => {
  let zeroCount = 0; // pickingState为0的数量
  let nonZeroCount = 0; // pickingState非0的数量
  chooseProductList.value?.[indexChooseProduct.value]?.pickingStyleDetails.forEach((detail) => {
    if (detail.pickingState === 2) {
      zeroCount += 1;
    } else if (detail.pickingState === 1) {
      nonZeroCount += 1;
    }
  });
  return { zeroCount, nonZeroCount };
});

// 清空标记
const clearTags = () => {
  chooseProductList.value.forEach((item: IPickingStylePageResListItem) => {
    if (Array.isArray(item.pickingStyleDetails)) {
      item.pickingStyleDetails.forEach((detail) => {
        detail.pickingState = 0;
      });
    }
  });
};

// 设为主图
const mainImageTypeFun = (pickingStyleImages: IPickingStylePageResPickingStyleImagesItem[], itemImg: IPickingStylePageResPickingStyleImagesItem) => {
  (pickingStyleImages || []).forEach((v) => {
    v.mainImageType = 0;
  });
  itemImg.mainImageType = 1;
};

const designTaskData = ref<PickingStyleDesignTaskRes>({});
// 获取ai任务
const designTask = async () => {
  if (chooseProductList.value[indexChooseProduct.value]?.designTaskId) {
    const res = await pickingStyleDesignTaskApi(chooseProductList.value[indexChooseProduct.value]?.designTaskId || '');
    designTaskData.value = res.data;
    smartDevelopStyleDetailApi(chooseProductList.value[indexChooseProduct.value]?.taskCode).then((r: { data: SmartDevelopStyleDetailRes; }) => {
      generateImages.value = r?.data?.generateImages ?? [];
      details.value = r.data;
    });
  } else {
    designTaskData.value = {};
  }
};

watch(() => indexChooseProduct.value, () => {
  if (chooseProductList.value.length) {
    designTask();
  }
});


// 查询
const searchConfig = computed<IConfigItem[]>(() => {
  return [
    {
      name: `${('创建人')}：`,
      component: 'slot',
      slotName: 'creatorName',
    },
    {
      name: `${('创建时间')}：`,
      component: 'datePicker',
      valueName: ['pickingStartTime', 'pickingEndTime'],
    }
  ];
});
const fal = ref(true);
const searchFun = () => {
  dialogFormVisible.value = true;
  setTimeout(() => {
    if (fal.value) {
      params.value.creatorIds = [id];
      if (userQuerySelect.value) {
        userQuerySelect.value.defaultSeeMe();
      }
      fal.value = false;
    }
  });
};

const handleSearch = () => {
  init();
  dialogFormVisible.value = false;
};

// 计算今天的日期
const today = computed(() => {
  const date = new Date();
  date.setHours(0, 0, 0, 0);
  return date;
});

// 计算7天前的日期
const sevenDaysAgo = computed(() => {
  const date = new Date(today.value);
  date.setDate(date.getDate() - 6);
  return date;
});

// 计算15天前的日期
const fifteenDaysAgo = computed(() => {
  const date = new Date(today.value);
  date.setDate(date.getDate() - 14);
  return date;
});

// 设置默认日期为近7天
// params.value.pickingTime = [sevenDaysAgo.value, today.value];

// 快捷选项
// const shortcuts = [
//   {
//     text: '近7天',
//     value: () => [
//       new Date(today.value.getTime() - 6 * 24 * 60 * 60 * 1000),
//       today.value
//     ]
//   },
//   {
//     text: '近15天',
//     value: () => [
//       new Date(today.value.getTime() - 14 * 24 * 60 * 60 * 1000),
//       today.value
//     ]
//   }
// ];

// 禁用超过15天范围的日期选择
const disabledDate: DatePickerProps['disabledDate'] = (date: Date | null) => {
  if (!date) {
    return false;
  }
  if (date > today.value) {
    return true;
  }
  if (date < fifteenDaysAgo.value) {
    return true;
  }
  
  return false;
};

// 处理日期变化事件，确保选择范围不超过15天
// const handleDateChange = (value) => {
//   if (value && value.length === 2) {
//     const start = value[0];
//     const end = value[1];
//     const diffTime = end - start;
//     const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
//     if (diffDays > 15) {
//       ElMessage.warning('日期范围不能超过15天，请重新选择');
//       params.value.pickingTime = [start, new Date(start.getTime() + 15 * 24 * 60 * 60 * 1000)];
//     }
//   }
// };

if (!route.query.taskCode) {
  init();
} else {
  pickingStylePage({
    taskCode: [newTaskCode.value || ''],
    dataSourceType: 'AIGC',
  }).then((res: { data: IPickingStylePageRes; }) => {
    chooseProductList.value = res.data.list;
    designTask();
  });
}


// 重新生成
const regenerate = () => {
  // params.value.pickingTime = [sevenDaysAgo.value, today.value];
  // params.value.creatorIds = [id];
  // init();
  router.push({
    name: 'Webview',
    query: {
      domain: 'fashion-design',
      // activeMenu: 'Webview?domain=fashion-design&path=/#/inspiration-center/ai-design-task/list',
      path: '/#/inspiration-center/ai-design-task/create',
      query: JSON.stringify({
        taskCode: chooseProductList.value[indexChooseProduct.value]?.taskCode,
      })
    }
  });
};

// 历史
const historyFun = () => {
  dialogImgVisible.value = true;
};

// 定位
const dialogImgFun = (index: number) => {
  indexChooseProduct.value = index;
  dialogImgVisible.value = false;
};

// 快速定位
const quickJump = () => {
  for (let i = 0; i < chooseProductList.value.length; i++) {
    if (chooseProductList.value[i].pickingStyleDetails?.filter(v => (v.pickingState === 1 || v.pickingState === 2)).length === 0) {
      indexChooseProduct.value = i;
      dialogImgVisible.value = false;
      break;
    }
  }
};

// 查看大图
const imgLook = (groupIndex: number, index: number) => {
  // isImgDialog.value = true;
  smartDevelopStyleDetailApi(chooseProductList.value[indexChooseProduct.value]?.taskCode).then((res: { data: SmartDevelopStyleDetailRes; }) => {
    generateImages.value = res?.data?.generateImages ?? [];
    details.value = res.data;
    imageDetailDialog.value = {
      visible: true,
      taskCode: res?.data?.taskCode ?? '',
      picIndex: groupIndex * (chooseProductList.value?.[indexChooseProduct.value]?.pickingStyleDetails?.[0]?.pickingStyleImages?.length ?? 0) + index,
      groupIndex,
    };
  });
};

// 评价
const evaluate = (groupNum: number) => {
  EvaluateDialog({
    group: {
      groupNum,
    },
    taskId: chooseProductList.value?.[indexChooseProduct.value]?.pickingId
  });
};

// 选图记录
const { handleOpenDialog } = useRecordDialog();
/** 查看历史记录 */
const toCheck = async (item: IPickingStylePageResListItem) => {
  handleOpenDialog(item);
};

// 返回上一页
const goToBack = () => {
  router.back();
};

const handleKeyDown = (event: KeyboardEvent) => {
  if (event.key === ' ' || event.key === 'Enter') {
    next();
  }
};

onMounted(() => {
  window.addEventListener('keydown', handleKeyDown);
});

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeyDown);
});
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
  /* overflow-x: hidden;
  overflow-y: scroll; */
  overflow: hidden auto;
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
.m-5 {
  margin: 10px 0;
  color: gray;
}
.bg-img-box {
  display: flex;
  width: 100%;
  margin-top: 10px;
}
.bg-img-item {
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
}
.t-f {
  white-space: nowrap;
  padding-left: 10px;
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
.text-left {
  display: flex;
  flex-direction: column;
  width: 200px;
}
.w-150 {
  display: inline-block;
  width: 150px;
}
.slight{
  position: relative;
}
.slight::after {
  content: '*';
  display: block;
  position: absolute;
  left: -10px;
  top: 1px;
  color: red;
  z-index: 999;
}
</style>
