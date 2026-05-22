<template>
  <div class="dia-amin">
    <el-tabs
      v-model="activeName"
      class="demo-tabs"
      @tab-click="handleClick"
    >
      <el-tab-pane label="推荐素材" name="first">
        <sc-search-area
          v-model="params"
          :config="searchConfig"
          labelWidth="120px"
          @handleSearch="handleSearch"
          @handleReset="handleReset"
        >
          <template #category>
            <div @click="categoryDialogFun" style="cursor: pointer;width: 100%">
              <div style="pointer-events: none">
                <div>
                  <el-select
                    readonly
                    style="width: 100%"
                    v-model="params.identifiedCategoryName"
                    placeholder="请选择识别品类"
                  />
                </div>
              </div>
            </div>
          </template>
          <template #ksbq>
            <!-- :emit-path="false" -->
            <el-popover
              :visible="visible"
              placement="bottom"
              :width="600"
            >
              <el-radio-group v-model="params.labelStyleQueryCondition">
                <el-radio :value="2">满足任一条件</el-radio>
                <el-radio :value="1">满足所有条件</el-radio>
              </el-radio-group>
              <div class="dropdown-item">
                
                <el-select
                  v-for="(item, index) in styleLabelList"
                  :key="index"
                  class="select-box"
                  v-model="item.styleLabelItem"
                  clearable
                  :placeholder="item.valueCode"
                >
                  <template #prefix>
                    <div class="tw-text-#6E6E8A">
                      {{ item?.valueCode ?? '' }}
                    </div>
                  </template>
                  <el-option
                    v-for="(itemMin, indexs) in item.children"
                    :key="indexs"
                    :label="itemMin.categoryValue"
                    :value="itemMin.categoryValue"
                  />
                </el-select>
              </div>
              <div style="text-align: right; margin: 0">
                <el-button
                  size="small"
                  text
                  @click="visible = false"
                >取消</el-button>
                <el-button
                  size="small"
                  type="primary"
                  @click="styleLabelItemFun"
                >
                  确认
                </el-button>
              </div>
              <template #reference>
                <div
                  @click="dropdownFun"
                  class="popover-box"
                  style="cursor: pointer;width: 100%"
                >
                  <div style="pointer-events: none">
                    <div>
                      <el-select
                        readonly
                        style="width: 100%"
                        v-model="params.styleLabel"
                        multiple
                        placeholder="请选择款式标签"
                      />
                    </div>
                  </div>
                </div>
              </template>
            </el-popover>
          </template>
          <template #background>
            <el-popover
              :visible="backgroundVisible"
              placement="bottom"
              :width="600"
            >
              <div class="dropdown-item">
                <el-select
                  v-for="(item, index) in backgroundList"
                  :key="index"
                  class="select-box"
                  style="width: 180px"
                  v-model="item.backgroundName"
                  clearable
                  multiple
                  :placeholder="item.label"
                >
                  <template #prefix>
                    <div class="tw-text-#6E6E8A">
                      {{item.label}}
                    </div>
                  </template>
                  <el-option
                    v-for="(itemMin, indexs) in item.children"
                    :key="indexs"
                    :label="itemMin.label"
                    :value="itemMin?.label ?? ''"
                  />
                </el-select>
              </div>
              <div style="text-align: right; margin: 0">
                <el-button
                  size="small"
                  text
                  @click="backgroundVisible = false"
                >取消</el-button>
                <el-button
                  size="small"
                  type="primary"
                  @click="backgroundItemFun"
                >
                  确认
                </el-button>
              </div>
              <template #reference>
                <div
                  @click="backgroundFun"
                  class="popover-box"
                  style="cursor: pointer;width: 100%"
                >
                  <div style="pointer-events: none">
                    <div>
                      <el-select
                        readonly
                        style="width: 100%"
                        v-model="params.backgroundNameList"
                        multiple
                        placeholder="请选择背景"
                      />
                    </div>
                  </div>
                </div>
              </template>
            </el-popover>
          </template>
        </sc-search-area>
        <div class="con-box">
          <el-alert
            v-if="isAlertShow"
            style="width: 300px"
            title="根据参考图自动推荐以下素材"
            type="success"
            @close="closeAlert"
          />
          <el-button
            style="margin-left: auto;"
            type="primary"
            @click="randomFun"
          >随机选择</el-button>
        </div>
        <div class="img-box-item">
          <div
            v-for="(item, index) in recommendList || []"
            :key="index"
            style="position: relative;width: 200px;border-radius: 6px;"
          >
            <div class="mark">{{ item?.modelMaterialLibraryFileList?.length }}</div>
            <el-image
              :class="`${recommendIndex === index ? 'actvi' : ''}`"
              style="width: 200px;height: 260px;border-radius: 6px;"
              :src="item?.modelMaterialLibraryFileList?.[0]?.pictureUrl ?? ''"
              fit="cover"
              @click="setRecommend(item, index)"
            />
          </div>
        </div>
        <div class="pagination-footer">
          <el-pagination
            background
            layout="prev, pager, next"
            :pageSize="20"
            :total="recommendTotal"
            @current-change="handleCurrentChange"
          />
        </div>
      </el-tab-pane>
      <el-tab-pane label="上传素材" name="second">
        <div class="tab-item-bottom-box">
          <div class="btn">
            <uploader
              ref="uploadRef"
              style="width: 140px;"
              class="up-comm"
              v-model="imgsUrlList"
              accept=".png, .jpg, .jpeg, .webp"
              :limit="100000"
              :size-limit="20"
              :paste="false"
              size="mini"
            >
              <template #tips>
                <span class="tips-center">
                  上传素材
                </span>
              </template>
              <!-- <template #list></template> -->
            </uploader>
            <el-button type="primary" @click="handleUpload">上传素材</el-button>  
            <el-button type="primary" @click="delsFun">{{ delText }}</el-button>
            <el-button v-if="delText !== '批量操作'" @click="delText = '批量操作'">取消操作</el-button>
          </div>
          <div class="custom-list" v-infinite-scroll="load">
            <div
              v-for="(item, index) in apiImgsUrlList"
              :key="index"
              :class="`img-box ${item.upImgSelect ? 'actvi' : ''}`"
            >
              <div
                @click="singleDeletion(item?.materialId ?? '')"
                class="close"
                v-if="delText === '批量操作'"
              >
                <el-icon color="#111" size="15"><CircleClose /></el-icon>
              </div>
              <el-checkbox
                class="del-bth"
                v-if="delText === '确认删除'"
                v-model="item.isDel"
              />
              <div
                v-if="delText === '批量操作'"
                class="look-sty"
                @click="lookImg(item?.pictureUrl ?? '')"
              >
                <el-icon>
                  <Search />
                </el-icon>
                查看大图
              </div>
              <div v-if="delText === '批量操作'" class="controller-box">
                <div
                  @click="() => {
                    eidtImgIndex = index;
                    handleOpenEditPhotoDialog({ url: item?.pictureUrl ?? '' });
                  }"
                >
                  <el-icon>
                    <EditPen />
                  </el-icon>
                  编辑图片
                </div>
                <!-- <div @click="() => {
                  eidtImgIndex = index;
                  handleEditMask(item);  
                }"><el-icon><EditPen /></el-icon>编辑选区</div> -->
              </div>
              <el-image
                @click="setUpImgFun(item, index)"
                style="width: 140px; height: 130px"
                :src="item.pictureUrl"
                fit='cover'
              />
            </div>
          </div>
          <el-image-viewer
            v-if="showPreview"
            :url-list="srcList"
            show-progress
            :initial-index="0"
            @close="showPreview = false"
          />
        </div>
        <!-- <div class="pagination-footer">
          <el-pagination
            background
            :pageSize="20"
            layout="prev, pager, next"
            :total="upTotal"
            @current-change="handleUpCurrentChange"
          />
        </div> -->
      </el-tab-pane>
    </el-tabs>
    <el-dialog
      v-model="dialogTableVisible"
      :title="`选择素材`"
      width="80%"
    >
      <div class="img-item-top">
        <div
          class="img-p-a"
          v-for="(item, index) in setRecommendList.modelMaterialLibraryFileList"
          :key="index"
          @click="item.selected = !item.selected"
        >
          <el-image
            style="width: 200px; height: 260px"
            :src="item.pictureUrl"
            fit="cover"
          />
          <div class="selectIco" v-if="!item.selected">
            <el-icon color="#605CE5" size="18"><SuccessFilled /></el-icon>
          </div>
        </div>
      </div>
      <div class="footer-bth">
        <el-button @click="dialogTableVisible = false">取消</el-button>
        <el-button type="primary" @click="comMateFun">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script lang="ts" setup>
import { ref, computed, watch, defineModel, onMounted, onUnmounted } from 'vue';
import type { TabsPaneContext } from 'element-plus';
import { ElMessage, ElMessageBox, ElLoading } from 'element-plus';
import { useEditPhotoDialog } from '@/components/use-edit-photo-dialog';
import { recommendPageApi, tryOnMarkCreateApi, webPictureMarkApi, userUploadMaterialSaveApi, userUploadMaterialPageApi, userUploadMaterialBatchDeleteApi, userUploadMaterialUpdateApi } from './api/index';
import { UserUploadMaterialPageRes } from './api/type';
import { MaterialInfo, MaterialFile } from './type';
import { CircleClose, EditPen, Search, SuccessFilled } from '@element-plus/icons-vue';
import { useEditPhotoMaskDialog } from '@/components/edit-mask-dialog';
import { useSearch, ksbqCategoryList } from './use-search';
import categoryDialog from '@/components/categoryDialog';
import { handleGetCategory } from '../../inspiration-source/views/list/hooks/use-get-options';

const isAlertShow = ref<boolean>(true);
const visible = ref(false);
const uploadRef = ref<UploadComponent | null>(null);
const backgroundVisible = ref(false);
const dialogTableVisible = ref<boolean>(false);
const materiaInfo = defineModel({
  type: Object as any,
  default: () => {},
});
// const activeName = ref('first');
const activeName = defineModel<any>('activeName', {
  type: String,
  default: () => ('first'),
});
const props = defineProps({
  identifiedCategoryCode: {
    type: String,
    default: ''
  },
  formDataObj: {
    type: Object,
    default: () => {
      return {};
    }
  },
  taskData: {
    type: Object,
    default: () => {
      return {};
    }
  },
  modelInfo: {
    type: Object,
    default: () => {
      return {};
    }
  },
  newModelInfo: {
    type: Object,
    default: () => {
      return {};
    }
  }
});
interface ParamsInter {
  backgroundNameList: string[];
  styleLabel: string[];
  categoryCode?: string;
  identifiedCategoryName?: string;
  pictureCount?: number;
  modelRaceName?: string;
  /** 款式标签查询条件，and查询:1，or查询:2 */
  labelStyleQueryCondition?: number;
}
interface BackgroundNameInter {
  backgroundName?: string[];
  label?: string;
  styleLabelItem?: string;
  categoryValue?: string;
  children: Array<{
    label?: string | number;
  }>;
  styleLabel?: string[];
}
interface ApiImgsUrlInter {
  materialId?: string;
  isDel?: string;
  pictureUrl?: string;
  upImgSelect?: boolean;
}

interface SetRecommendInter {
  modelMaterialLibraryFileList?: ModelMaterialLibraryFileInter[];
}
interface ModelMaterialLibraryFileInter {
  selected?: boolean;
  pictureUrl?: string;
}
const params = ref<ParamsInter>({
  backgroundNameList: [],
  styleLabel: [],
  labelStyleQueryCondition: 2,
});
const ksbqCategoryListFun = async () => {
  const res:any = await ksbqCategoryList();
  mtrzList.value = res.mtrzList.value;
  styleLabelList.value = res.styleLabelList.value;
};
watch(() => props.formDataObj, async (newObj:any) => {
  params.value.identifiedCategoryName = newObj.categoryName;
  params.value.categoryCode = newObj.categoryCode;
  params.value.modelRaceName = props.modelInfo.racialName || props.modelInfo.name;
  const str:any = {};
  params.value.pictureCount = newObj.styleGenCount;
  if (props.taskData.tags.length) {
    const arr:any = [];
    props.taskData.tags.forEach((v: any) => {
      if (['衣长', '裙长', '裤长', '廓形', '袖长', '版型'].includes(v.split('：')[0])) {
        arr.push(`${v.split('：')[0]}:${v.split('：')[1]}`);
        str[v.split('：')[0]] = v.split('：')[1].trim();
      }
    });
    params.value.styleLabel = arr;
  }
  await ksbqCategoryListFun();
  styleLabelList.value.forEach((v) => {
    if (str[v.categoryValue]) {
      v.styleLabelItem = str[v.categoryValue];
    }
  });
}, {
  immediate: true,
});
watch(() => props.identifiedCategoryCode, () => {
  if (!params.value.categoryCode) {
    params.value.categoryCode = props?.identifiedCategoryCode ?? '';
  }
}, {
  immediate: true,
});
const showPreview = ref(false);
const srcList = ref<string[]>([]);
const imgsUrlList = ref<any>([]);
const apiImgsUrlList = ref<ApiImgsUrlInter[]>([]);

const { searchConfig, backgroundTypeList } = useSearch();
const backgroundList = ref<BackgroundNameInter[]>([]);
watch(() => backgroundTypeList.value, (newBackgroundTypeList: any) => {
  backgroundList.value = JSON.parse(JSON.stringify(newBackgroundTypeList));
}, {
  immediate: true,
});
interface KsbqInter {
  categoryValue: string;
  styleLabelItem?: string;
  children?: any;
  valueCode?: string;
}
interface MtrzInter {
  dictValue: string;
  valueCode: string;
}
const mtrzList = ref<MtrzInter[]>([]);
const styleLabelList = ref<KsbqInter[]>([]);
const timeInter = ref<any>(null);
// 轮询mark详情
const markPolling = async (data: any, url: string, isMask?: boolean) => {
  let loading = ElLoading.service({
    lock: true,
    text: '识别中...',
    background: 'rgba(0, 0, 0, 0.7)',
  });
  if (timeInter.value) {
    clearInterval(timeInter.value);
  }
  timeInter.value = setInterval(async () => {
    loading = ElLoading.service({
      lock: true,
      text: '识别中...',
      background: 'rgba(0, 0, 0, 0.7)',
    });
    const markData = await webPictureMarkApi(data);
    if (![20, 30, 50, 60].includes(markData?.data?.taskStatus ?? 0)) {
      console.error('识别不成功');
    } else {
      clearInterval(timeInter.value);
      loading.close();
      if (markData.data.taskStatus === 30) {
        // apiImgsUrlList.value[eidtImgIndex].maskPictureUrl = markData.data.resImgList;
        userUploadMaterialUpdateApi({
          materialId: apiImgsUrlList.value[eidtImgIndex.value].materialId,
          pictureUrl: url,
          maskPictureUrl: markData.data.resImgs
        }).then(() => {
          ElMessage.success('识别成功');
          if (isMask) {
            handleOpenDialogNewFun({
              url: `${url}?t=${Date.now()}`,
              maskUrl: markData.data?.resImgs ?? '',
              maskUrlList: [markData.data?.resImgs ?? ''],
            });
          }
          userUploadMaterialPageApiFun(1);
        });
      } else {
        ElMessage.error('识别失败！');
      }
    }
  }, 2000);
};
const pointer = 0;
const total = 0;
// 监听图片上传调用mark接口
watch(() => imgsUrlList.value, (newImgUrls: any) => {
  if (newImgUrls.length) {
    userUploadMaterialSaveApi({
      pictureList: newImgUrls.map((v: any) => {
        return {
          pictureUrl: v.url,
          maskPictureUrl: ''
        };
      }),
    }).then(() => {
      userUploadMaterialPageApiFun(1);
      imgsUrlList.value = [];
    });
  }
});
const upTotal = ref(0);
const pageNum = ref<number>(1);
// 获取上传素材列表
const userUploadMaterialPageApiFun = (pageNums: number) => {
  userUploadMaterialPageApi({
    pageNum: pageNums,
    pageSize: 20,
  }).then((res: UserUploadMaterialPageRes) => {
    if (pageNums === 1) {
      apiImgsUrlList.value = res.data.list;
      pageNum.value = 1;
    } else {
      apiImgsUrlList.value = [...apiImgsUrlList.value, ...res.data.list];
    }
    pageNum.value += 1;
    upTotal.value = res.data.total;
  });
};
const setRecommendList = ref<SetRecommendInter>({});
const setUpImgList:any = ref({
  modelMaterialLibraryFileList: [],
});
// 选中推荐素材
const setRecommend = (item: any, index: number) => {
  recommendIndex.value = index;
  setRecommendList.value = item;
  // materiaInfo.value = JSON.parse(JSON.stringify(setRecommendList.value));
  (setRecommendList.value?.modelMaterialLibraryFileList ?? []).forEach((v: ModelMaterialLibraryFileInter, indexs: number) => {
    if (indexs >= (params.value?.pictureCount ?? 0)) {
      v.selected = true;
    }
  });
  dialogTableVisible.value = true;
  visible.value = false;
  backgroundVisible.value = false;
};
// 选择推荐素材
const comMateFun = () => {
  materiaInfo.value = JSON.parse(JSON.stringify({
    modelMaterialLibraryFileList: (setRecommendList.value?.modelMaterialLibraryFileList ?? []).filter(v => !v.selected)
  }));
  dialogTableVisible.value = false;
};
const getRandomInt = (n: number) => {
  if (typeof n !== 'number' || n <= 0 || !Number.isInteger(n)) {
    throw new Error('请传入一个正整数');
  }
  return Math.floor(Math.random() * n);
};
// 记录编辑图片的下标
const eidtImgIndex = ref<number>(0);
// 编辑图片
const { handleOpenDialog: handleOpenEditPhotoDialog } = useEditPhotoDialog({
  handleSuccess(url: string) {
    apiImgsUrlList.value[eidtImgIndex.value].pictureUrl = url;
    userUploadMaterialUpdateApi({
      materialId: apiImgsUrlList.value[eidtImgIndex.value].materialId,
      pictureUrl: url,
    }).then(() => {
      ElMessage.success('编辑成功');
    });
    // 需要mark图开启
    // ElLoading.service({
    //   lock: true,
    //   text: '识别中...',
    //   background: 'rgba(0, 0, 0, 0.7)',
    // })
    // upMarkImg(url, false);
  }
});

// 更新marsk图
const upMarkImg = async (url: string, isMask?: boolean) => {
  const { data } = await tryOnMarkCreateApi({
    inputImg: url,
  });
  
  // urls.markUrl = data;
  await markPolling(data, url, isMask);
};
// 随机选择
const randomFun = () => {
  recommendIndex.value = getRandomInt(recommendList.value.length);
  setRecommendList.value = recommendList.value[recommendIndex.value];
  // materiaInfo.value = JSON.parse(JSON.stringify(setRecommendList.value));
  (setRecommendList.value?.modelMaterialLibraryFileList ?? []).forEach((v, index: number) => {
    if (index >= (params.value?.pictureCount ?? 0)) {
      v.selected = true;
    }
  });
  // materiaInfo.value = JSON.parse(JSON.stringify(setRecommendList.value));
  dialogTableVisible.value = true;
  visible.value = false;
  backgroundVisible.value = false;
};
// 选中上传素材
const setUpImgFun = (item: any, index: number) => {
  apiImgsUrlList.value[index].upImgSelect = !apiImgsUrlList.value[index].upImgSelect;
  setUpImgList.value.modelMaterialLibraryFileList = apiImgsUrlList.value.filter((v: ApiImgsUrlInter) => v.upImgSelect); 
  materiaInfo.value = JSON.parse(JSON.stringify(setUpImgList.value));
};
const handleSearch = () => {
  recommendPageApiFun(1);
};
const handleReset = () => {
  params.value = {
    backgroundNameList: [],
    styleLabel: [],
    pictureCount: params.value.pictureCount,
    labelStyleQueryCondition: 2,
  };
  recommendPageApiFun(1, true);
  isAlertShow.value = false;
};

const lookImg = (url: string) => {
  srcList.value = [url];
  showPreview.value = true;
};

const saveFun = async (url: any) => {
  await userUploadMaterialUpdateApi({
    materialId: apiImgsUrlList.value[eidtImgIndex.value].materialId,
    pictureUrl: apiImgsUrlList.value[eidtImgIndex.value].pictureUrl,
    maskPictureUrl: url
  });
  ElMessage.success('保存成功');
  userUploadMaterialPageApiFun(1);
};
const { handleOpenDialog: handleOpenDialogNewFun } = useEditPhotoMaskDialog({
  handleSuccess(url: string) {
    saveFun(url);
  },
});
const handleEditMask = (item: any) => {
  if (item.maskPictureUrl) {
    handleOpenDialogNewFun({
      url: `${item.pictureUrl}?t=${Date.now()}`,
      maskUrl: item?.maskPictureUrl ?? '',
      maskUrlList: [item?.maskPictureUrl ?? ''],
    });
  } else {
    ElLoading.service({
      lock: true,
      text: '识别中...',
      background: 'rgba(0, 0, 0, 0.7)',
    });
    upMarkImg(item.pictureUrl, true);
  }
};
const tabIndex = ref<number>(0);
const handleClick = (tab: TabsPaneContext, event: Event) => {
  if (tab.index !== undefined) {
    const index = Number(tab.index);
    if (!Number.isNaN(index)) { // 使用 Number.isNaN 替代全局 isNaN
      tabIndex.value = index;
    }
  }
  // if (tab.index == 1) {
  //   materiaInfo.value = JSON.parse(JSON.stringify(setUpImgList.value));
  // } else {
  //   materiaInfo.value = JSON.parse(JSON.stringify(setRecommendList.value));
  // }
  init();
  delText.value = '批量操作';
  visible.value = false;
  backgroundVisible.value = false;
};
const setMateriaInfo = () => {
  if (tabIndex.value === 1) {
    if (setUpImgList.value?.modelMaterialLibraryFileList?.length) {
      materiaInfo.value = JSON.parse(JSON.stringify(setUpImgList.value));
    }
  } else if (setRecommendList.value?.modelMaterialLibraryFileList?.length) {
    materiaInfo.value = JSON.parse(JSON.stringify(setRecommendList.value || {}));
  }
};
// 识别品类
const treeList = ref<any>([]);
const getCategoryList = async () => {
  treeList.value = await handleGetCategory();
};
getCategoryList();
const categoryDialogFun = async () => {
  categoryDialog(treeList.value, '', '').then((res: unknown) => {
    const r = res as any;
    params.value.identifiedCategoryName = r.value;
    params.value.categoryCode = r.code;
  });
};
interface MaterialItem {
  modelMaterialLibraryFileList?: Array<{
    pictureUrl?: string;
  }>;
}
const recommendList = ref<MaterialItem[]>([]);
// 指定素材选中下标
const recommendIndex = ref<number | null>(null);
const recommendTotal = ref(0);
// 获取推荐素材
const recommendPageApiFun = (pageNums: number, isReset?: boolean) => {
  recommendPageApi({
    pageNum: pageNums,
    pageSize: 20,
    ...params.value,
    // categoryCode: isReset? undefined : (params.value.categoryCode || props.identifiedCategoryCode),
    labelNameList: params.value?.styleLabel?.map((v: any) => {
      return (v || '').split(':')?.[1];
    }),
    backgroundNameList: params.value?.backgroundNameList?.reduce((a:any, b:any) => {
      return [...a, ...b.split(':')[1].split(',')];
    }, []),
  }).then((res: any) => {
    recommendList.value = res.data.list.map((v: MaterialInfo) => {
      return {
        ...v,
        modelMaterialLibraryFileList: (v.modelMaterialLibraryFileList || []).map((item: MaterialFile) => {
          return {
            ...item,
            modelMaterialLibraryId: v.modelMaterialLibraryId,
          };
        }),
      };
    });
    recommendTotal.value = res.data.total;
  });
};

const delText = ref<string>('批量操作');
// 确认删除
const delsFun = () => {
  if (delText.value === '确认删除') {
    const delList = apiImgsUrlList.value.filter(v => v.isDel);
    if (!delList.length) {
      ElMessage({
        message: '请最少选中一个素材删除',
        type: 'warning',
      });
      return;
    }
    userUploadMaterialBatchDeleteApiFun(delList.map(v => v.materialId));
  } else {
    delText.value = '确认删除';
  }
};
// 单个删除
const singleDeletion = (materialId: string) => {
  ElMessageBox.confirm(
    '是否确认删除？',
    '',
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: '',
    }
  ).then(() => {
    userUploadMaterialBatchDeleteApiFun([materialId]);
  });
};
// 确认删除
const userUploadMaterialBatchDeleteApiFun = (materialIds: any) => {
  userUploadMaterialBatchDeleteApi({
    materialIds,
  }).then(() => {
    ElMessage({
      message: '删除成功',
      type: 'success',
    });
    delText.value = '批量操作';
    userUploadMaterialPageApiFun(1);
  });
};
const init = () => {
  recommendPageApiFun(1);
  userUploadMaterialPageApiFun(1);
};
// 推荐切换分页
const handleCurrentChange = (pageNums: any) => {
  recommendPageApiFun(pageNums);
};
const handleUpCurrentChange = (pageNums: any) => {
  userUploadMaterialPageApiFun(pageNums);
};
init();
const dropdownFun = () => {
  visible.value = true;
};
const backgroundFun = () => {
  backgroundVisible.value = true;
};
const styleLabelItemFun = () => {
  params.value.styleLabel = [];
  styleLabelList.value.forEach((v: { categoryValue: string; styleLabelItem?: string | undefined; }) => {
    if (v.styleLabelItem) {
      params.value.styleLabel.push(`${v.categoryValue}:${v.styleLabelItem}`);
    }
  });
  visible.value = false;
};
const backgroundItemFun = () => {
  params.value.backgroundNameList = [];
  backgroundList.value.forEach((v:BackgroundNameInter) => {
    if (v?.backgroundName?.length) {
      params.value.backgroundNameList.push(`${v.label}:${v.backgroundName.join(',')}`);
    }
  });
  backgroundVisible.value = false;
};
// 下拉加载
const load = () => {
  if (upTotal.value > apiImgsUrlList.value.length) {
    userUploadMaterialPageApiFun(pageNum.value);
  }
};
interface UploadComponent {
  open: () => void;
  $el: HTMLElement;
  // 其他可能的属性和方法
}
// 手动触发上传
const handleUpload = () => {
  if (uploadRef.value) {
    if (uploadRef.value.open) {
      uploadRef.value.open();
    } else if (uploadRef.value.$el.querySelector('input[type="file"]')) {
      // uploadRef.value.$el.querySelector('input[type="file"]').click();
      const input = uploadRef.value.$el.querySelector('input[type="file"]') as HTMLInputElement | null;
      if (input) {
        input.click();
      }
    }
  }
};
// X调提示文案触发重置按钮
const closeAlert = () => {
  handleReset();
};

defineExpose({
  setMateriaInfo
});
function setZoomByDevicePixelRatio() {
  const demoTabs:any = document.querySelector('.dia-amin');
  const dpr = window.devicePixelRatio || 1;
  if (demoTabs) {
    demoTabs.style.zoom = 1 / dpr;
  }
}
onMounted(() => {
  setZoomByDevicePixelRatio();
  window.addEventListener('devicepixelratiochange', setZoomByDevicePixelRatio);
  window.addEventListener('resize', setZoomByDevicePixelRatio);
});

onUnmounted(() => {
  window.removeEventListener('devicepixelratiochange', setZoomByDevicePixelRatio);
  window.removeEventListener('resize', setZoomByDevicePixelRatio);
});
</script>
<style scoped lang="scss">
  .custom-list {
    margin-top: 10px;
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    flex: 1;
    // overflow-x: hidden;
    // overflow-y: scroll;
    overflow: hidden scroll;
  }
  .img-box {
    position: relative;
    width: 140px;
    height: 130px;
    border-radius: 6px;
    overflow: hidden;
    cursor: pointer;
  }
  .close {
    display: none;
    position: absolute;
    top: 0;
    right: 0;
    z-index: 99;
  }
  .controller-box {
    display: none;
    position: absolute;
    background-color: rgba(0, 0, 0, .8);
    z-index: 999;
    bottom: 0;
    width: 100%;
    height: 30px;
    color: #fff;
    align-items: center;
    font-size: 12px;
    justify-content: space-evenly;
  }
  .img-box:hover .controller-box {
    display: flex;
  }
  .img-box:hover .close {
    display: block;
  }
  .con-box {
    display: flex;
    align-items: center;
    // justify-content: space-between;
  }
  .img-box-item {
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
    height: 330px;
    overflow-y: scroll;
    padding: 10px;
    margin: 10px 0;
  }
  .mark {
    display: flex;
    position: absolute;
    top: -10px;
    right: -10px;
    width: 15px;
    height: 15px;
    background-color: red;
    color: #fff;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
  }
  .actvi {
    border:2px solid#605CE5;
  }
  .pagination-footer {
    display: flex;
    justify-content: end;
    margin: 10px 0;
  }
  .look-sty {
    display: none;
    position: absolute;
    left: 0;
    top: 0;
    font-size: 12px;
    color: #111;
    z-index: 999;
    align-items: center;
  }
  .img-box:hover .look-sty {
    display: flex;
  }
  .del-bth {
    position: absolute;
    top: 0;
    right: 5px;
  }
.img-item-top {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  padding: 10px;
}
.img-p-a {
  position: relative;
  width: 200px;
  height: 260px;
  cursor: pointer;
}
.selectIco {
  display: flex;
  position: absolute;
  align-items: center;
  justify-content: center;
  top: 0;
  right: 0;
  width: 20px;
  height: 20px;
  padding: 5px;
  background-color: #fff;
  cursor: pointer;
}
.footer-bth {
  display: flex;
  justify-content: right;
  gap: 10px;
  margin-top: 15px;
  padding: 10px;
}
.dropdown-item {
  display: flex;
  width: 600px;
  flex-wrap: wrap;
  gap: 10px;
  padding: 10px;
}
.select-box {
  width: 100px;
}
.popover-box :deep(.el-tag__close) {
  opacity: 0;
}
.up-comm {
  display: flex;
  position: absolute;
  left: -1000px;
  bottom: -1000px;
  width: 140px;
  height: 130px;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  opacity: 0;
}
.tab-item-bottom-box {
  display: flex;
  flex-direction: column;
  height: 400px;
  overflow: hidden;
  .btn {
    display: flex;
  }
}
</style>
