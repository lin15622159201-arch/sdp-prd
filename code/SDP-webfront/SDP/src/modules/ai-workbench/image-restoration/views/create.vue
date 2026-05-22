<template>
  <div class="tw-flex tw-h-100% tw-w-100%">
    <div class="tw-w-300px bg-color">
      <div class="tw-m-t-10px tw-m-b-10px">
        <span class="tw-m-r-10px tw-font-bold">肢体修复</span>
        <el-switch
          :active-value="1"
          :inactive-value="0"
          v-model="form.bodyFix"
        />
      </div>
      <div class="tw-m-t-10px tw-m-b-10px">
        <span class="tw-m-r-10px tw-font-bold">脸部修复</span>
        <el-switch
          :active-value="1"
          :inactive-value="0"
          v-model="form.faceFix"
        />
      </div>
      <p class="tw-font-size-12px">如需要保持脸部一致，需要标记照片为同组</p>
      <div class="tw-m-t-20px tw-m-b-10px">
        <span class="tw-m-r-10px tw-font-bold">图片超分</span>
        <el-switch
          :active-value="1"
          :inactive-value="0"
          v-model="form.imageSuperResolution"
        />
      </div>
      <div v-if="form.imageSuperResolution === 1">
        <div @click="form.highDefinition = 0" :class="`resolution ${form.highDefinition === 0 ? 'active' : ''}`">
          高清（X2）
        </div>
        <div @click="form.highDefinition = 1" :class="`resolution tw-m-t-20px ${form.highDefinition === 1 ? 'active' : ''}`">
          超清（X4）
        </div>
      </div>
      <el-button
        @click="batchRepair"
        class="tw-m-auto tw-m-b-10px tw-w-70%"
        type="primary"
      >
        批量修复
      </el-button>
    </div>
    <div class="app-box tw-flex-1 tw-m-l-20px">
      <div class="bth-flex">
        <div>
          <span class="tw-font-bold">批量修复</span>
          <span class="tw-m-l-10px">{{ imgsUrlList.length }}/50</span>
        </div>
        <el-button
          v-if="!isMark"
          type="primary"
          @click="mark"
        >
          同组标记
        </el-button>
        <div v-else class=" tw-flex tw-flex-center-y">
          <el-checkbox
            @change="checkChange"
            v-model="checkedAll"
            label="全选"
          />
          <el-button
            @click="combinedOperation"
            class=" tw-m-l-10px"
            type="primary"
          >
            组合
          </el-button>
          <el-button @click="ungroup" type="primary">
            取消组合
          </el-button>
          <el-button @click="isMark = false;">
            取消操作
          </el-button>
        </div>
      </div>
      <div class="form-box">
        <el-form
          ref="formRef"
          :model="ruleForm"
          label-width="auto"
        >
          <div class="img-flex">
            <div
              class="img-box"
              v-if="imgsUrlList.length < 50 && !isMark && !otherSAources"
            >
              <uploader
                ref="uploadRef"
                class="up-comm"
                v-model="imgsUrlList"
                accept=".png, .jpg, .jpeg, .webp"
                :limit="50"
                :size-limit="0"
                :paste="false"
                size="mini"
              >
                <template #tips>
                  <span class="tips-center">
                    上传图片
                  </span>
                </template>
                <template #list>
                  <div />
                </template>
              </uploader>
            </div>
            <div
              class="w-200 tw-bg-[rgba(242,242,242,1)]"
              v-for="(item, index) in imgsUrlList"
              :key="index"
            >
              <el-image
                class="tw-w-200px tw-h-200px"
                :src="item.url"
                @click.stop="item.checked = !item.checked;"
                fit="contain"
              />
              <div
                v-if="isMark"
                class="dele-ico"
              >
                <!-- <el-icon color="#fff"><Delete /></el-icon> -->
                <el-checkbox v-model="item.checked" />
              </div>
              <div class="rotundity" :style="`background-color: ${item.combination || item.combination === 0 ? UNIQUECSSCOLORS[item.combination] : ''}`" />
              <div v-if="!isMark" class="tw-absolute tw-w-100% tw-bg-[rgba(0,0,0,0.6)] tw-bottom-0px tw-color-[#fff] tw-p-5px tw-justify-around tw-cursor-pointer domNone hoverSty">
                <span @click="initialIndex = index;showPreview = true;">查看大图</span>
                <span v-if="!otherSAources" @click="closeImgFun(index)">删除图片</span>
              </div>
            </div>
          </div>
        </el-form>
      </div>
    </div>
    <el-image-viewer
      v-if="showPreview"
      :url-list="imgsUrlList.map(v => v.url)"
      show-progress
      :initial-index="initialIndex"
      @close="showPreview = false"
    />
  </div>
</template>
<script lang="ts" setup>
import { ref, computed, watch, defineAsyncComponent } from 'vue';
import { ElForm, FormRules, ElMessage, ElLoading } from 'element-plus';
import { useRouter, useRoute } from 'vue-router';
import { UNIQUECSSCOLORS } from '../constant/index';
import { CopyDocument, Edit, User, Delete, CircleClose } from '@element-plus/icons-vue';
// import { webStyleGenApi } from '../api/index';
// import UploadImage from '@/components/image-upload-control-multiple/upload-image.vue';
import { postureFissionTaskCreateApi, webStyleGenApi, webPostureGenApi } from '../api/index';
import { ImageRepairCreateReq } from '../api/types';
import { getSmartDevelopStyleDetailById } from '@/components/view-picture/components/api/index';
import { webStyleGenApiByDerive, fetchFloralPatternApplyTaskDetail, webVirtuaApi } from '@/modules/stylish-derivation/posture-fission/api/index';
import { fetchReplaceColorTaskDetail } from '@/modules/inspiration-center/views/cloth-color-replacer/api';
import { IReplaceColorTaskDetailRes } from '@/modules/inspiration-center/views/cloth-color-replacer/api/type';
import { SEND_TASK_ID_KEY_ENUM } from '@/hooks/use-send-task';

const imgsUrlList = ref<ImageRepairCreateReq[]>([]);
const router = useRouter();
const route = useRoute();
const formRef = ref<InstanceType<typeof ElForm>>();
const oldPrompt = ref<string>('');
const dialogType = ref('model');
const ruleForm = ref<any>({});
const isLooping = ref(false);
const imgIndex = ref<number>(0);
const pictureUrls = ref<string[]>([]);
const form = ref<any>({
  highDefinition: 0,
});
const activeName = ref('first');
const showPreview = ref<boolean>(false);
const initialIndex = ref<number>(0);


// 删除
const closeImgFun = (index: number) => {
  imgsUrlList.value.splice(index, 1);
};

// const { getEnableDictionaryOptions } = useDictionary();
// const fgclothtypeLit = computed(() => {
//   return getEnableDictionaryOptions(DICTIONARY_KEY.FGCLOTHTYPE).filter(v => !((v.attributes || []).find(v1 => v1.code === 'posture_fission')?.name === '0'));
// });
const checkedAll = ref<boolean>(false);
const isMark = ref<boolean>(false);
// 下一步
const mark = () => {
  isMark.value = true;
};


const submitData = ref([]);
// 提交
// const handleSubmit = async () => {
//   if (!form.value.genCount) {
//     ElMessage.error('请输入生成数量');
//     return;
//   }
//   const data = submitData.value.map((item: any) => {
//     return {
//       ...form.value,
//       ...item,
//       // busSource: 'FASHION_VIRTUAL_TRY_ON',
//       // source: 'FASHION_VIRTUAL_TRY_ON',
//     };
//   });
//   // await virtualTryonBatchCreateApi(data);
//   ElMessage.success('创建成功');
//   router.back();
// };


const sum = ref(0);
const imgSum = () => {
  sum.value = submitData.value.reduce((a: number, v: { materials: any[]; }) => {
    return a + v.materials.length;
  }, 0) * form.value.genCount;
};

const queryToMap = (imgsQuery: string): { [groupIndex: number]: number[]; } => {
  if (!imgsQuery) return {};
  return imgsQuery.split(';').reduce((acc:any, item, index) => {
    if (!item) return acc;
    acc[index] = item.split(',').map(Number);
    return acc;
  }, {});
};
const otherSAources = ref<string>('');
const init = async () => {
  const { query } = route;
  const sourceConfigs = [
    {
      queryKey: 'taskId',
      api: (id: string) => webStyleGenApi(id),
      formHandler: (data: any) => ({
        ...data,
        highDefinition: data.highDefinition || 0,
        taskCode: undefined,
        taskId: undefined,
        taskStatus: undefined,
        images: undefined,
        materials: undefined,
        source: undefined,
      }),
      imageHandler: (data: any) => (data.materials || []).map((v: any) => ({
        url: v.refImgUrl,
        checked: false,
        combination: 0,
      })) as ImageRepairCreateReq[],
      setOtherSources: false
    },
    {
      queryKey: 'byAiDesignId',
      api: (id: string) => getSmartDevelopStyleDetailById(id),
      formHandler: defaultFormHandler,
      imageHandler: (data: any, q: any) => {
        const imgs: ImageRepairCreateReq[] = [];
        (q.imgs as string || '').split(';').forEach((urlIndex: string, index: number) => {
          urlIndex && urlIndex.split(',').forEach((urlIndexmin: string, indexMin) => {
            const pic = data.generateImages[index]?.pictureList[+urlIndexmin];
            imgs.push({
              url: pic?.repairImgUrl || pic?.pictureUrl,
              checked: false,
              combination: (data.generateMode === 0 && data?.generateImages?.length === 1) ? indexMin : index,
            });
          });
        });
        return imgs;
      },
      setOtherSources: true
    },
    {
      queryKey: 'byStylishDerivationId',
      api: (id: string) => webStyleGenApiByDerive(id),
      formHandler: defaultFormHandler,
      imageHandler: (data: any, q: any) => (data.images || []).filter((v: any) => (q.selectId || '').includes(v.imageId)).map((v: any) => ({ url: v.imageUrl, checked: false })) as ImageRepairCreateReq[],
      setOtherSources: true
    },
    {
      queryKey: 'byFloralPatternId',
      api: (id: string) => fetchFloralPatternApplyTaskDetail(id),
      formHandler: defaultFormHandler,
      imageHandler: (data: any, q: any) => {
        const generateImageUrls = Array.isArray(data?.generatedPicUrls)
          ? data.generatedPicUrls
          : JSON.parse(data?.generatedPicUrls || '[]');
        const groupImgIndexs = queryToMap(route.query.imgs as string);
        const acc: { url: string; checked: boolean; combination: number; }[] = [];
        Object.keys(groupImgIndexs).forEach((gIdx, index) => {
          if (!groupImgIndexs[+gIdx]) return;
          groupImgIndexs[+gIdx].forEach((imgIdx) => {
            const url = generateImageUrls[gIdx]?.picUrls[imgIdx] || '';
            if (url) {
              acc.push({ url, checked: false, combination: index });
            }
          });
        });
        return acc;
        // return (generateImageUrls || []).reduce((acc: ImageRepairCreateReq[], v: string, idx: number) => {
        //   if ((q.imgs as string || '').split(',').includes(`${idx}`)) {
        //     acc.push({ url: v, checked: false });
        //   }
        //   return acc;
        // }, []);
      },
      setOtherSources: true
    },
    {
      queryKey: 'byVirtualChangeId',
      api: (id: string) => webVirtuaApi(id),
      formHandler: defaultFormHandler,
      imageHandler: (data: any, q: any) => (data.images || []).reduce((acc: ImageRepairCreateReq[], v: any) => {
        if ((q.imgs as string || '').includes(v.imageId || '')) {
          acc.push({
            url: v.faceRepairUrl || v.imageUrl || '',
            checked: false,
          });
        }
        return acc;
      }, []),
      setOtherSources: true
    },
    {
      queryKey: 'byPostureFissionId',
      api: (id: string) => webPostureGenApi(id),
      formHandler: defaultFormHandler,
      imageHandler: (data: any, q: any) => (data.generateImages || []).reduce((acc: ImageRepairCreateReq[], v: any) => {
        if ((q.selectId as string || '').includes(v.pictureId || '')) {
          acc.push({
            url: v.repairImgUrl || v.pictureUrl || '',
            checked: false,
          });
        }
        return acc;
      }, []),
      setOtherSources: true
    },
    {
      queryKey: SEND_TASK_ID_KEY_ENUM.REPLACE_COLOR,
      api: fetchReplaceColorTaskDetail,
      formHandler: defaultFormHandler,
      imageHandler(data: any, { imgs }: any) {
        const indexes = (imgs as string).split(',');
        if (!data.replaceColorGeneratedPicUrls) return [];
        return indexes.map((idx) => {
          return {
            url: data.replaceColorGeneratedPicUrls[+idx],
            checked: false,
          };
        });
      }
    },
  ];

  const matchedConfig = sourceConfigs.find(config => query[config.queryKey] != null);
  if (!matchedConfig) return;

  const sourceId = query[matchedConfig.queryKey] as string;
  if (matchedConfig.setOtherSources) {
    otherSAources.value = sourceId;
  }

  // 执行API请求并处理结果
  const { data } = await matchedConfig.api(sourceId);
  form.value = matchedConfig.formHandler(data, query);
  imgsUrlList.value = matchedConfig.imageHandler(data, query).slice(0, 50);
};

const defaultFormHandler = (data: any, query: any) => ({
  sourceBusinessId: data.taskId,
  sourceBusinessCode: data.taskCode,
  taskSource: query.taskSource,
  inspirationId: data.inspirationId || '',
  inspirationCode: data.inspirationCode || '',
  highDefinition: 0,
});
init();

const findFirstMissingNumber = (arr: any) => {
  const values: any = [...new Set((arr || []).map((item: { combination: number; }) => item.combination).sort((a: any, b: any) => a - b))];
  for (let i = 1; i < values.length; i++) {
    if (values[i] !== values[i - 1] + 1) {
      return Number.isNaN(values[i - 1] + 1) ? 0 : values[i - 1] + 1;
    }
  }
  return Number.isNaN(values[values.length - 1] + 1) ? 0 : values[values.length - 1] + 1;
};
const combinedOperation = () => {
  const selectList = imgsUrlList.value.filter((v: ImageRepairCreateReq) => v.checked);
  if (!selectList.length) {
    ElMessage.error('请勾选图片');
    return;
  }
  if (selectList.length > 12) {
    ElMessage.error('同一个组内最多12张图片');
    return;
  }
  const index: number = findFirstMissingNumber(imgsUrlList.value);
  if (new Set(selectList.map((v: ImageRepairCreateReq) => v.combination)).size !== 1 || selectList[0].combination === undefined) {
    imgsUrlList.value.forEach((v: ImageRepairCreateReq) => {
      if (v.checked) {
        v.combination = index;
        v.checked = false;
      }
    });
  }
};

const ungroup = () => {
  imgsUrlList.value.forEach((v: ImageRepairCreateReq) => {
    if (v.checked) {
      v.combination = undefined;
      v.checked = false;
    }
  });
};

const checkChange = (v: any) => {
  imgsUrlList.value.forEach((item: any) => {
    item.checked = v;
  });
};

watch(() => imgsUrlList.value, () => {
  checkedAll.value = !imgsUrlList.value.filter((v: any) => !v.checked).length;
  if (imgsUrlList.value.length === 0) {
    checkedAll.value = false;
  }
}, {
  deep: true
});


// 处理数据
const groupUrlsByCombination = (arr: ImageRepairCreateReq[]) => {
  const grouped: any = {};
  const resultOrder = [];
  const noCombinationList: string[] = [];
  /* eslint-disable no-restricted-syntax */
  for (const item of arr) {
    if (item.combination !== undefined) {
      const comb: number = item.combination;
      if (!grouped[comb]) {
        resultOrder.push(comb);
        grouped[comb] = [item.url];
      } else {
        grouped[comb].push(item.url);
      }
    } else {
      resultOrder.push(null);
      noCombinationList.push(item.url);
    }
  }
  let noCombIndex = 0;
  return resultOrder.map((comb: any) => {
    if (comb !== null) {
      return grouped[comb];
    } else {
      const urls: any = noCombinationList[noCombIndex];
      noCombIndex += 1;
      return [urls];
    }
  });
};
const batchRepair = async () => {
  let mag = '';
  if (!imgsUrlList.value.length) {
    mag = '请最少上传一张图片';
  }
  if (!form.value.bodyFix && !form.value.faceFix && !form.value.imageSuperResolution) {
    mag = '【肢体修复】【脸部修复】【图片超分】三种任务至少勾选一个';
  }
  if (mag) {
    ElMessage.error(mag);
    return;
  }
  await postureFissionTaskCreateApi({
    ...form.value,
    taskSource: form.value.taskSource || 'upload',
    imageList: groupUrlsByCombination(imgsUrlList.value),
    highDefinition: form.value.imageSuperResolution === 1 ? form.value.highDefinition : undefined,
  });
  ElMessage.success('创建成功');
  router.back();
};
</script>

<style scoped>
.img-box {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 200px;
  height: 200px;
}
.img-box :deep(.upload-wrap__mini) {
  width: 190px;
  height: 198px;
}
.up-comm {
  position: relative;
}
.tips-center {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, 260%);
}
.square {
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
}
.square-img {
  width: 96px;
  height: 96px;
}
.app-box {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  background: transparent;
  overflow: hidden;
}
.form-box {
  flex: 1;
  overflow-y: scroll;
  background-color: #fff;
  padding: 10px;
}
.image-to-image {
  display: flex;
}
.m-b-10 {
  display: flex;
  width: 100%;
  margin-bottom: 10px;
}
.color-b {
  color: #8080FF;
  cursor: pointer;
}
.w-200 {
  position: relative;
  width: 200px;
  height: 200px;
  border-radius: 5px;
}
.domNone {
  display: none;
}
.w-200:hover .hoverSty {
  display: flex;
}
.img-flex {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}
.from-flex {
  display: flex;
  gap: 50px;
}
.dele-ico {
  position: absolute;
  top: 0;
  right: 10px;
}
.bth-flex {
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 10px;
  background: #fff;
}
.flex1 {
  flex: 1;
  overflow: hidden;
}
.title-c-g {
  color: gray;
  font-size: 12px;
}
.bg-color {
  display: flex;
  flex-direction: column;
  background-color: #fff;
  padding: 0 20px;
  box-sizing: border-box;
}
.resolution {
  width: 100%;
  padding: 20px 0 20px 20px;
  border: 1px solid #d7d7d7;
  cursor: pointer;
}
.active {
  border: 1px solid #707AF2;
  color: #8080FF;
}
.rotundity {
  position: absolute;
  left: 10px;
  top: 10px;
  width: 15px;
  height: 15px;
  border-radius: 50%;
}
</style>
