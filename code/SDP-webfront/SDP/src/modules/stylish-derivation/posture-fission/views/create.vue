<template>
  <div class="app-box">
    <el-button @click="router.back()">返回</el-button>
    <el-form
      ref="formRef"
      class="form-box"
      :model="ruleForm"
      label-width="auto"
    >
      <div class="img-flex">
        <div
          class="img-box"
          v-if="pictureUrls.length < 20 && isShow"
        >
          <UploadImage
            @upload-success="handleUploadSuccess"
          >
            <template #content="{ triggerFileInput }">
              <div
                class="tw-absolute tw-w-full tw-h-full tw-left-0px tw-top-0px
                tw-flex tw-flex-col tw-items-center tw-justify-center tw-gap-10px"
              >
                <span class="tw-text-#3F414D ">粘贴、拖放图片进行上传，或</span>
                <el-button type="primary" @click="triggerFileInput">
                  点击上传
                </el-button>
              </div>
            </template>
          </UploadImage>
        </div>
        <div
          class="w-200"
          v-for="(item, index) in pictureUrls"
          :key="index"
        >
          <el-image
            style="width: 200px; height: 200px"
            :src="item"
            :preview-src-list="pictureUrls"
            show-progress
            :initial-index="index"
            fit="cover"
          />
          <div
            v-if="isShow"
            class="dele-ico"
            @click.stop="closeImgFun(index)"
          >
            <el-icon color="#fff"><Delete /></el-icon>
          </div>
          <el-button
            v-if="isShow"
            class="config-img"
            @Click="() => {
              imgIndex = index;
              handleOpenEditPhotoDialog({ url: item });
            }"
            type="primary"
          >编辑图片</el-button>
        </div>
      </div>
      <div class="from-flex" style="margin-top: 20px;">
        <!-- <el-form-item
          prop="cuttingHead"
          label="是否裁头"
        >
          <el-switch
            :active-value="1"
            :inactive-value="0"
            v-model="ruleForm.cuttingHead"
          />
        </el-form-item> -->
        <el-form-item
          prop="needBackSide"
          label="是否需要背面"
        >
          <el-switch
            :active-value="1"
            :inactive-value="0"
            v-model="ruleForm.needBackSide"
          />
        </el-form-item>
        <el-form-item
          v-if="ruleForm.needBackSide === 1"
          prop="backSideCount"
          label="背面图数量"
          :rules="[{
            required: true,
            message: '请输入背面图数量',
            trigger: ['change', 'blur'],
          }]"
        >
          <el-input-number
            :min="1"
            :max="16"
            :precision="0"
            v-model="ruleForm.backSideCount"
          />
        </el-form-item>
      </div>
      <div class="from-flex">
        <el-form-item
          prop="layoutByRef"
          label="构图跟随原图"
        >
          <el-switch
            :active-value="1"
            :inactive-value="0"
            v-model="ruleForm.layoutByRef"
          />
        </el-form-item>
        <el-form-item
          label="服装类型"
          prop="clothTypeName"
          :rules="[{
            required: false,
            message: '请选择服装类型',
            trigger: ['change', 'blur'],
          }]"
        >
          <el-select
            v-model="ruleForm.clothTypeName"
            filterable
            clearable
          >
            <el-option
              v-for="item in fgclothtypeLit"
              :key="item.value"
              :label="item.label"
              :value="item.label || ''"
            />
          </el-select>
        </el-form-item>
      </div>
      <div>
        <el-form-item
          prop="genCount"
          label="生成数量"
        >
          <el-input-number
            :min="1"
            :max="16"
            :precision="0"
            v-model="ruleForm.genCount"
          />
        </el-form-item>
      </div>
      <div>
        <el-form-item
          prop="completeBody"
          label="是否补全全身"
        >
          <el-switch
            :active-value="1"
            :inactive-value="0"
            v-model="ruleForm.completeBody"
          />
        </el-form-item>
      </div>
      <div>
        <el-form-item
          label="分辨率"
          prop="imgSize"
          :rules="[{
            required: true,
            message: '请选择分辨率',
            trigger: ['change', 'blur'],
          }]"
        >
          <el-select
            class="tw-w-200px"
            v-model="ruleForm.imgSize"
            filterable
            clearable
          >
            <el-option
              v-for="item in poseChangeratio"
              :key="item.value"
              :label="item.label"
              :value="item.value || ''"
            />
          </el-select>
        </el-form-item>
      </div>
    </el-form>
    <div style="height: 40px;" />
    <div class="footer-bth">
      <el-button @click="confirmGeneration" type="primary">确认生成</el-button>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref, computed } from 'vue';
import { ElForm, ElMessage } from 'element-plus';
import { useRouter, useRoute } from 'vue-router';
import { Delete } from '@element-plus/icons-vue';
import UploadImage from '@/components/image-upload-control-multiple/upload-image.vue';
import { useEditPhotoDialog } from '@/components/use-edit-photo-dialog';
import { StyleModelUserCollectPageResListItem, StyleModelUserCollectPageRes } from '@/components/favorite-style-models/api/types';
import { postureFissionTaskCreateApi, webStyleGenApi, webStyleGenApiByDerive, styleModelDetailApi, webVirtuaApi, fetchFloralPatternApplyTaskDetail, postureFissionTaskBatchCreateApi } from '../api/index';
import { PostureFissionTaskCreateReq, WebVirtualTryonResImagesItem } from '../api/types';
import { getSmartDevelopStyleDetailById } from '@/components/view-picture/components/api/index';
import { STYLE_QUERY_KEY, useCreateByStyle } from './hooks/use-create-by-style';
import { useDictionary } from '@/hooks/use-dictionary2';
import { DICTIONARY_KEY } from '@/constant/dictionary';
import { useSearch } from './hooks/use-search';
import { fetchReplaceColorTaskDetail, inspirationListByIdsApi } from '@/modules/inspiration-center/views/cloth-color-replacer/api';
import { IReplaceColorTaskDetailRes, InspirationListByIdsResItem } from '@/modules/inspiration-center/views/cloth-color-replacer/api/type';
import { SEND_TASK_ID_KEY_ENUM } from '@/hooks/use-send-task';
import { useCreateByInspiration } from './hooks/use-create-by-Inspiration';

const router = useRouter();
const route = useRoute();
const { isFromStyle, initStyleList, getStylePicUrls, getStyleTaskCreateParams } = useCreateByStyle();
const formRef = ref<InstanceType<typeof ElForm>>();
const isShowDialog = ref(false);
const oldPrompt = ref<string>('');
const dialogType = ref('model');
const { fgclothtypeLit, poseChangeratio } = useSearch();
const ruleForm = ref<any>({
  genCount: 16,
  // cuttingHead: 0,
  needBackSide: 1,
  completeBody: 0,
  layoutByRef: 0,
  backSideCount: 4,
  imgSize: 'follow',
});
const imgIndex = ref<number>(0);
const pictureUrls = ref<string[]>([]);
const handleUploadSuccess = (picUrl: string[]) => {
  // emit('upload-success', picUrl);
  if (pictureUrls.value.length + picUrl.length > 20) {
    ElMessage.error('最大上传20张图');
    return;
  }
  pictureUrls.value = [...pictureUrls.value, ...picUrl];
};

const activeName = ref('first');

const collectData = ref<StyleModelUserCollectPageResListItem>({});

const { getInspirationCreateParams, getData } = useCreateByInspiration();
// 确认生成
const confirmGeneration = async () => {
  if (!pictureUrls.value.length) {
    ElMessage.error('请上传图片');
    return;
  }
  await formRef.value?.validate();
  const params: PostureFissionTaskCreateReq = {
    ...ruleForm.value,
    taskSource: ruleForm.value.taskSource || 'upload',
    pictureUrls: pictureUrls.value,
    backSideCount: ruleForm.value.needBackSide === 1 ? ruleForm.value.backSideCount : 0,
    clothTypeCode: fgclothtypeLit.value.filter(v => v.label === ruleForm.value.clothTypeName)?.[0]?.value
  };
  if (isFromStyle) {
    await postureFissionTaskBatchCreateApi({ list: getStyleTaskCreateParams(params) });
  } else if (route.query[SEND_TASK_ID_KEY_ENUM.INSPIRATION]) {
    await postureFissionTaskBatchCreateApi({ list: getInspirationCreateParams(params) });
  } else {
    await postureFissionTaskBatchCreateApi({ list: [params] });
  }

  ElMessage.success('生成成功');
  router.back();
};
const isShow = computed(() => {
  return !route.query.taskId && !route.query.byDeriveId && !route.query.byVirtualId && !otherSAources.value && !route.query.byStylishDerivationId && !isFromStyle && !route.query.byInspirationId;
});
const otherSAources = ref<string>('');
const init = async () => {
  const baseRuleForm = {
    genCount: 16,
    needBackSide: 1,
    completeBody: 0,
    layoutByRef: 0,
    backSideCount: 4,
    imgSize: 'follow',
  };

  const getCommonRuleFormFields = (data: any, query: any) => ({
    inspirationId: data.inspirationId || '',
    inspirationCode: data.inspirationCode || '',
    sourceBusinessId: data.taskId,
    sourceBusinessCode: data.taskCode,
    taskSource: query.taskSource || 'upload',
  });

  const queryToMap = (imgsQuery: string): { [groupIndex: number]: number[]; } => {
    if (!imgsQuery) return {};
    return imgsQuery.split(';').reduce((acc:any, item, index) => {
      if (!item) return acc;
      acc[index] = item.split(',').map(Number);
      return acc;
    }, {});
  };
  // 初始化配置集合
  const initConfigs = [
    {
      queryKey: 'taskId',
      async fetchData(taskId: string) {
        const { data } = await webStyleGenApi(taskId);
        return { data };
      },
      handleRuleForm({ data }: any) {
        return {
          ...data,
          taskId: undefined,
          taskCode: undefined,
          taskStatus: undefined,
          // source: data.sourceBusiness || '',
        };
      },
      handlePictureUrls({ data }: any) {
        return [data.refImgUrl || ''];
      },
    },
    {
      queryKey: 'byDeriveId',
      async fetchData(deriveId: string) {
        const { data: mainData } = await webStyleGenApiByDerive(deriveId);
        const { data: styleData } = await styleModelDetailApi(mainData.styleModelId as string);
        return { mainData, styleData };
      },
      handleRuleForm({ mainData, styleData }: any, query: any) {
        return {
          ...baseRuleForm,
          ...getCommonRuleFormFields(mainData, query), // 复用公共字段
          clothTypeName: styleData.clothTypeName,
          clothTypeCode: styleData.clothTypeCode,
        };
      },
      handlePictureUrls({ mainData }: any, query: any) {
        if (query.selectId) {
          return (mainData.images || []).filter((v: any) => (query.selectId || '').includes(v.imageId)).map((v: { imageUrl: string; }) => v.imageUrl);
        }
        if (query.imgUrl) {
          return [query.imgUrl as string];
        }
        return [];
      },
    },
    {
      queryKey: 'byVirtualId',
      async fetchData(virtualId: string) {
        const { data } = await webVirtuaApi(virtualId);
        return { data };
      },
      handleRuleForm({ data }: any, query: any) {
        return {
          ...baseRuleForm,
          ...getCommonRuleFormFields(data, query), // 复用公共字段
          clothTypeName: '',
          clothTypeCode: '',
        };
      },
      handlePictureUrls({ data }: any, query: any) {
        if (query.selectId) {
          return (data.images || []).filter((v: WebVirtualTryonResImagesItem) => (query.selectId || '').includes(v.imageId || '')).map((v: any) => v.imageUrl || '');
        }
        if (query.imgUrl) {
          return [query.imgUrl as string];
        }
        return [];
      },
    },
    {
      queryKey: 'byAiDesignId',
      async fetchData(aiDesignId: string) {
        const { data } = await getSmartDevelopStyleDetailById(aiDesignId);
        return { data, aiDesignId };
      },
      handleRuleForm({ data }: any, query: any) {
        return {
          ...baseRuleForm,
          ...getCommonRuleFormFields(data, query), // 复用公共字段
        };
      },
      handlePictureUrls({ data }: any, query: any) {
        const urls: string[] = [];
        (query.imgs as string || '').split(';').forEach((urlIndex: string, index: number) => {
          if (urlIndex) {
            urlIndex.split(',').forEach((urlIndexmin: string) => {
              const imgInfo = data.generateImages[index]?.pictureList[+urlIndexmin];
              urls.push(imgInfo?.repairImgUrl || imgInfo?.pictureUrl);
            });
          }
        });
        return urls;
      },
      handleOtherSources(aiDesignId: string) {
        otherSAources.value = aiDesignId;
      },
    },
    {
      queryKey: 'byStylishDerivationId',
      async fetchData(derivationId: string) {
        const { data: mainData } = await webStyleGenApiByDerive(derivationId);
        const { data: styleData } = await styleModelDetailApi(mainData.styleModelId as string);
        return { mainData, styleData };
      },
      handleRuleForm({ mainData, styleData }: any, query: any) {
        return {
          ...baseRuleForm,
          ...getCommonRuleFormFields(mainData, query), // 复用公共字段
          clothTypeName: styleData.clothTypeName,
          clothTypeCode: styleData.clothTypeCode,
        };
      },
      handlePictureUrls({ mainData }: any, query: any) {
        if (query.selectId) {
          return (mainData.images || []).filter((v: any) => (query.selectId || '').includes(v.imageId)).map((v: any) => v.imageUrl);
        }
        return [];
      },
    },
    {
      queryKey: 'byFloralPatternId',
      async fetchData(patternId: string) {
        const { data } = await fetchFloralPatternApplyTaskDetail(patternId);
        return { data, patternId };
      },
      handleRuleForm({ data }: any, query: any) {
        return {
          ...baseRuleForm,
          ...getCommonRuleFormFields(data, query), // 复用公共字段
        };
      },
      handlePictureUrls({ data }: any, query: any) {
        const generateImageUrls = Array.isArray(data?.generatedPicUrls)
          ? data.generatedPicUrls
          : JSON.parse(data?.generatedPicUrls || '[]');
        const groupImgIndexs = queryToMap(route.query.imgs as string);
        const imgsUrlList: string[] = [];
        Object.keys(groupImgIndexs).forEach((gIdx) => {
          if (!groupImgIndexs[+gIdx]) return;
          groupImgIndexs[+gIdx].forEach((imgIdx) => {
            const url = generateImageUrls[gIdx]?.picUrls[imgIdx] || '';
            if (url) {
              imgsUrlList.push(url);
            }
          });
        });
        return imgsUrlList;
        // return (generateImageUrls || []).filter((_: any, index: number) => (query.imgs as string || '').split(',').includes(`${index}`));
      },
      handleOtherSources(patternId: string) {
        otherSAources.value = patternId;
      },
    },
    {
      queryKey: 'byVirtualChangeId',
      async fetchData(changeId: string) {
        const { data } = await webVirtuaApi(changeId);
        return { data, changeId };
      },
      handleRuleForm({ data }: any, query: any) {
        return {
          ...baseRuleForm,
          ...getCommonRuleFormFields(data, query), // 复用公共字段
        };
      },
      handlePictureUrls({ data }: any, query: any) {
        return (data.images || []).filter((v: any) => (query.imgs as string || '').includes(v.imageId || '')).map((v: any) => v.faceRepairUrl || v.imageUrl || '');
      },
      handleOtherSources(changeId: string) {
        otherSAources.value = changeId;
      },
    },
    {
      queryKey: STYLE_QUERY_KEY,
      async fetchData(skcCode: string) {
        return initStyleList(skcCode);
      },
      handleRuleForm() {
        return { ...baseRuleForm };
      },
      handlePictureUrls: getStylePicUrls
    },
    {
      queryKey: SEND_TASK_ID_KEY_ENUM.REPLACE_COLOR,
      async fetchData(changeId: string) {
        const { data } = await fetchReplaceColorTaskDetail(changeId);
        return { data, changeId };
      },
      handleRuleForm({ data }: any, query: any) {
        return {
          ...baseRuleForm,
          ...getCommonRuleFormFields(data, query), // 复用公共字段
        };
      },
      handlePictureUrls({ data }: { data: IReplaceColorTaskDetailRes; }, { imgs }: any) {
        const indexes = (imgs as string).split(',');
        if (!data.replaceColorGeneratedPicUrls) return [];
        return indexes.map(idx => data.replaceColorGeneratedPicUrls[+idx]);
      }
    },
    {
      queryKey: SEND_TASK_ID_KEY_ENUM.INSPIRATION,
      async fetchData(changeId: string) {
        const { data } = await inspirationListByIdsApi(changeId.split(',').slice(0, 20));
        return { data, changeId };
      },
      handleRuleForm({ data }: any, query: any) {
        getData(data, baseRuleForm);
        return {
          ...baseRuleForm,
        };
      },
      handlePictureUrls({ data }: { data: InspirationListByIdsResItem[]; }) {
        return (data || []).map((item: InspirationListByIdsResItem) => item.inspirationImage);
      }
    },
  ];

  // 查找并执行匹配的配置
  // for (const config of initConfigs) {
  const { query } = route;
  const config = initConfigs.find(v => query[v.queryKey!] != null);
  if (config) {
    const queryValue = route.query[config.queryKey!];
    const data: any = await config.fetchData(queryValue as string);
    if (config.handleOtherSources) {
      config.handleOtherSources(queryValue as string);
    }
    ruleForm.value = config.handleRuleForm?.(data, route.query);
    pictureUrls.value = config.handlePictureUrls?.(data, route.query).slice(0, 20);
  }
  // }
};

init();

// 删除
const closeImgFun = (index: number) => {
  pictureUrls.value.splice(index, 1);
};

const { handleOpenDialog: handleOpenEditPhotoDialog } = useEditPhotoDialog({
  handleSuccess(url: string) {
    pictureUrls.value[imgIndex.value] = url;
  }
});


</script>

<style scoped>
.img-box {
  width: 200px;
  height: 200px;
}
.square-box {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 108px;
  height: 108px;
  background: linear-gradient(180deg, #D8F1FF 0%, #DDDCFF 100%);
  border-radius: 4px;
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
.style-model {
  display: flex;
  width: 350px;
  padding: 10px;
  border: 1px solid #e4e7ed;
  cursor: pointer;
}
.style-model-m {
  margin-left: 10px;
}
.style-model-r {
  margin-left: auto;
}
.app-box {
  width: 100%;
  padding: 10px;
  margin: 10px;
  background: #fff;
  overflow-y: auto;
}
.form-box {
  margin-top: 30px;
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
.footer-bth {
  display: flex;
  justify-content: center;
  position: absolute;
  left: 50%;
  bottom: 20px;
  transform: translateX(-50%);
  z-index: 999;
}
.w-200 {
  position: relative;
  width: 200px;
  height: 200px;
  border-radius: 5px;
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
  display: none;
  position: absolute;
  top: 0;
  right: 0;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  background-color: rgba(0, 0, 0, .7);
  cursor: pointer;
}
.config-img {
  display: none;
  position: absolute;
  left: 50%;
  bottom: 10px;
  transform: translateX(-50%);
}
.w-200:hover .config-img {
  display: block;
}
.w-200:hover .dele-ico {
  display: flex;
}
</style>
