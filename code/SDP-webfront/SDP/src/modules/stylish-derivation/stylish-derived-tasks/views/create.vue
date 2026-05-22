<template>
  <div class="app-box">
    <el-button @click="router.back()">返回</el-button>
    <el-form
      ref="formRef"
      class="form-box"
      :model="ruleForm"
      label-width="auto"
    >
      <el-form-item
        prop="styleModelId"
        label="风格模型"
        :rules="[{
          required: true,
          message: '请选择风格模型',
          trigger: ['change', 'blur'],
        }]"
      >
        <div
          class="square"
          v-if="!collectData.styleModelId"
          @click="dialogTableVisible = true"
        >
          <div class="square-box">
            <el-icon size="30" color="#605CE5"><CopyDocument /></el-icon>
          </div>
          <div style="margin-top: 5px">风格模型</div>
        </div>
        <div class="style-model" v-else>
          <el-image
            v-if="collectData.sampleImage"
            class="square-img"
            :src="collectData.sampleImage || ''"
            :preview-src-list="[collectData.sampleImage || '']"
            show-progress
            :initial-index="0"
            fit="contain"
          />
          <el-image
            v-if="!collectData.sampleImage"
            class="square-img"
            style="transform: scale(.7);"
            :src="zwtp"
            fit="contain"
          />
          <!-- <img class="square-img" src="https://oss.yunbanfang.cn/tiangong_2662ebb687c549efbb23f234d39dda03.png" alt=""> -->
          <div class="style-model-m">
            <strong>{{ collectData.styleModelName }}</strong>
            <div>{{ collectData.loraName }}</div>
            <div>服装类型：{{ collectData.clothTypeName }}</div>
          </div>
          <el-icon
            @click="dialogTableVisible = true"
            class="style-model-r"
            size="18"
          ><Edit /></el-icon>
        </div>
      </el-form-item>
      <el-tabs v-model="activeName" class="demo-tabs">
        <el-tab-pane label="图生图" name="first" />
        <el-tab-pane
          v-if="!otherSAources"
          label="文生图"
          name="second"
        />
      </el-tabs>
      <div v-if="activeName === 'first'">
        <div class="img-box" v-if="!ruleForm.refImgUrl">
          <UploadImage v-model="ruleForm.refImgUrl" @upload-success="handleUploadSuccess">
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
        <div class="image-to-image" v-show="ruleForm.refImgUrl">
          <div class="img-w-h-300">
            <el-image
              class="img-w-h-300"
              :src="ruleForm.refImgUrl"
              :preview-src-list="[ruleForm.refImgUrl]"
              :initial-index="0"
              fit="cover"
            />
            <div
              v-if="!otherSAources"
              class="dele-ico"
              @click.stop="closeImgFun"
            >
              <el-icon color="#fff"><Delete /></el-icon>
            </div>
            <!-- <el-icon @click="closeImgFun" class="close-ico" size="18"><CircleClose /></el-icon> -->
          </div>
          
          <div style="margin-left: 20px;flex: 1;">
            <el-form-item
              prop="tsc"
              label=""
            >
              <div
                @click="setPrompt"
                class="m-b-10 color-b"
                v-if="!ruleForm.prompt && !oldPrompt"
              >生成款式描述</div>
              <div class="m-b-10" v-else>
                <div>款式描述</div>
                <div
                  class="color-b"
                  style="margin-left: auto;"
                  @click="ruleForm.prompt = oldPrompt"
                >重置</div>
                <div
                  @click="setPrompt"
                  class="color-b"
                  style="margin-left: 10px"
                >再次生成</div>
              </div>
              <el-input
                :rows="6"
                v-if="ruleForm.prompt || oldPrompt"
                v-model="ruleForm.prompt"
                show-word-limit
                maxlength="400"
                placeholder="请输入"
                type="textarea"
              />
              <div v-if="ruleForm.prompt || oldPrompt" class="tit">手动输入款式描述时，以描述内容为准</div>
            </el-form-item>
            <el-form-item
              prop="sz"
              label="设置"
            >
              <div style="display: flex;">
                <div class="square" @click="bgImgFun">
                  <div v-if="!ruleForm.bgImgUrl" class="square-box">
                    <el-icon size="30" color="#605CE5"><CopyDocument /></el-icon>
                  </div>
                  <div v-else class="w-108">
                    <img
                      class="w-108"
                      :src="ruleForm.bgImgUrl"
                      alt=''
                    >
                    <div class="dele-ico" @click.stop="ruleForm.bgImgUrl = '';ruleForm.bgImgDesc = '';">
                      <el-icon color="#fff"><Delete /></el-icon>
                    </div>
                  </div>
                  <div v-if="!ruleForm.bgImgUrl" style="margin-top: 5px">场景</div>
                </div>
                <div
                  class="square"
                  @click="modelImgFun"
                  style="margin-left: 20px"
                >
                  <div v-if="!ruleForm.modelImgUrl" class="square-box">
                    <el-icon size="30" color="#605CE5"><User /></el-icon>
                  </div>
                  <!-- <img v-else style="width: 108px; height: 108px;object-fit: contain;" :src="ruleForm.modelImgUrl" alt=""> -->
                  <div v-else class="w-108">
                    <img
                      class="w-108"
                      :src="ruleForm.modelImgUrl"
                      alt=''
                    >
                    <div class="dele-ico" @click.stop="ruleForm.modelImgUrl = '';ruleForm.modelImgDesc = '';">
                      <el-icon color="#fff"><Delete /></el-icon>
                    </div>
                  </div>
                  <div v-if="!ruleForm.modelImgUrl" style="margin-top: 5px">模特</div>
                </div>
              </div>
            </el-form-item>
            <el-form-item
              v-if="!ruleForm.modelImgUrl"
              prop="faceFix"
              label="脸部修复"
            >
              <el-switch
                :active-value="1"
                :inactive-value="0" 
                v-model="ruleForm.faceFix"
              />
            </el-form-item>
            <el-form-item
              prop="enableDistill"
              label="是否加速"
            >
              <el-switch
                :active-value="1"
                :inactive-value="0" 
                v-model="ruleForm.enableDistill"
              />
            </el-form-item>
            <div style="display: flex;">
              <el-form-item
                prop="genCount"
                label="生成数量"
                :rules="[{
                  required: true,
                  message: '请输入生成数量',
                  trigger: ['change', 'blur'],
                }]"
              >
                <el-input-number
                  v-model="ruleForm.genCount"
                  :min="1"
                  :max="12"
                  :precision="0"
                />
              </el-form-item>
              <el-form-item
                prop="imgSize"
                label="分辨率"
                :rules="[{
                  required: true,
                  message: '请选择分辨率',
                  trigger: ['change', 'blur'],
                }]"
              >
                <el-select
                  v-model="ruleForm.imgSize"
                  filterable
                >
                  <el-option
                    v-for="item in generateNumList"
                    :key="item.value"
                    :label="item.label"
                    :value="item.label"
                  />
                </el-select>
              </el-form-item>
              <el-form-item
                class="tw-m-l-10px"
                prop="enableFollowability"
                label="风格参考"
                :rules="[{
                  required: true,
                  message: '请选择风格参考',
                  trigger: ['change', 'blur'],
                }]"
              >
                <el-select
                  v-model="ruleForm.enableFollowability"
                  filterable
                >
                  <el-option
                    v-for="item in enableFollowabilityList"
                    :key="item.value"
                    :label="item.label"
                    :value="Number(item.value)"
                  />
                </el-select>
              </el-form-item>
            </div>
          </div>
        </div>
      </div>
      <div v-if="activeName === 'second'">
        <el-form-item
          prop="prompt"
          label="提示词"
        >
          <el-input
            :rows='6'
            v-model="ruleForm.prompt"
            maxlength='400'
            placeholder='请输入'
            show-word-limit
            type='textarea'
          />
        </el-form-item>
        <el-form-item
          prop="sz"
          label="设置"
        >
          <div style="display: flex;">
            <div class="square" @click="bgImgFun">
              <div v-if="!ruleForm.bgImgUrl" class="square-box">
                <el-icon size="30" color="#605CE5"><CopyDocument /></el-icon>
              </div>
              <div v-else class="w-108">
                <img
                  class="w-108"
                  :src="ruleForm.bgImgUrl"
                  alt=""
                >
                <div class="dele-ico" @click.stop="ruleForm.bgImgUrl = '';ruleForm.bgImgDesc = '';">
                  <el-icon color="#fff"><Delete /></el-icon>
                </div>
              </div>
              <!-- <img v-else style="width: 108px; height: 108px;object-fit: contain;" :src="ruleForm.bgImgUrl" alt=""> -->
              <div v-if="!ruleForm.bgImgUrl" style="margin-top: 5px">场景</div>
            </div>
            <div
              class="square"
              @click="modelImgFun"
              style="margin-left: 20px"
            >
              <div v-if="!ruleForm.modelImgUrl" class="square-box">
                <el-icon size="30" color="#605CE5"><User /></el-icon>
              </div>
              <div v-else class="w-108">
                <img
                  class="w-108"
                  :src="ruleForm.modelImgUrl"
                  alt=''
                >
                <div class="dele-ico" @click.stop="ruleForm.modelImgUrl = '';ruleForm.modelImgDesc = '';">
                  <el-icon color="#fff"><Delete /></el-icon>
                </div>
              </div>
              <!-- <img v-else style="width: 108px; height: 108px;object-fit: contain;" :src="ruleForm.modelImgUrl" alt=""> -->
              <div v-if="!ruleForm.modelImgUrl" style="margin-top: 5px">模特</div>
            </div>
          </div>
        </el-form-item>
        <el-form-item
          v-if="!ruleForm.modelImgUrl"
          prop="faceFix"
          label="脸部修复"
        >
          <el-switch
            :active-value="1"
            :inactive-value="0"
            v-model="ruleForm.faceFix"
          />
        </el-form-item>
        <el-form-item
          prop="enableDistill"
          label="是否加速"
        >
          <el-switch
            :active-value="1"
            :inactive-value="0" 
            v-model="ruleForm.enableDistill"
          />
        </el-form-item>
        <div style="display: flex;">
          <el-form-item
            prop="genCount"
            label="生成数量"
            :rules="[{
              required: true,
              message: '请输入生成数量',
              trigger: ['change', 'blur'],
            }]"
          >
            <el-input-number
              v-model="ruleForm.genCount"
              :min="1"
              :max="12"
              :precision="0"
            />
          </el-form-item>
          <el-form-item
            prop="imgSize"
            label="分辨率"
            :rules="[{ 
              required: true,
              message: '请选择分辨率',
              trigger: ['change', 'blur'],
            }]"
          >
            <el-select
              v-model="ruleForm.imgSize"
              filterable
            >
              <el-option
                v-for="item in generateNumList"
                :key="item.value"
                :label="item.label"
                :value="item.label"
              />
            </el-select>
          </el-form-item>
          <el-form-item
            prop="enableFollowability"
            class="tw-m-l-10px"
            label="风格参考"
            :rules="[{
              required: true,
              message: '请选择风格参考',
              trigger: ['change', 'blur'],
            }]"
          >
            <el-select
              v-model="ruleForm.enableFollowability"
              filterable
            >
              <el-option
                v-for="item in enableFollowabilityList"
                :key="item.value"
                :label="item.label"
                :value="Number(item.value)"
              />
            </el-select>
          </el-form-item>
        </div>
      </div>
    </el-form>
    <div style="height: 40px;" />
    <div class="footer-bth">
      <el-button @click="confirmGeneration" type="primary">确认生成</el-button>
    </div>
    <LlstOfFavoriteStyleModels
      v-model="dialogTableVisible"
      @submit="handleCollect"
    />
    <el-dialog
      class="clear-dialog-body-padding"
      :title="dialogType === 'scene' ? '选择背景' : '选择模特'"
      v-model="isShowDialog"
      width="80%"
      @close="handleCancel"
    >
      <el-scrollbar
        class="tw-p-6"
        max-height="500"
        always
      >
        <ModelSelect
          v-if="dialogType === 'model'"
          :isShowRaceModel="false"
          v-model="modelInfo"
          page-source="ai-design"
        />
        <SceneSelect
          v-if="dialogType === 'scene'"
          v-model="sceneInfo"
          :showName="true"
          page-source="ai-design-stylish-derived"
        />
      </el-scrollbar>
      <span class="tw-flex tw-justify-end tw-p-24px">
        <el-button @click="handleCancel">取消</el-button>
        <el-button type="primary" @click="handleSubmit">确定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script lang="ts" setup>
import { ref, computed, watch } from 'vue';
import { ElForm, FormRules, ElMessage } from 'element-plus';
import { useRouter, useRoute } from 'vue-router';
import { CopyDocument, Edit, User, Delete, CircleClose } from '@element-plus/icons-vue';
import UploadImage from '@/components/image-upload-control/upload-image.vue';
import { useDictionary } from '@/hooks/use-dictionary2';
import { DICTIONARY_KEY } from '@/constant/dictionary';
import LlstOfFavoriteStyleModels from '@/components/favorite-style-models/llst-of-favorite-style-models.vue';
import { StyleModelUserCollectPageResListItem, StyleModelUserCollectPageRes } from '@/components/favorite-style-models/api/types';
import ModelSelect from '@/modules/inspiration-center/components/select-scene-and-model/model-select/index.vue';
import SceneSelect from '@/modules/inspiration-center/components/select-scene-and-model/scene-select.vue';
import { pictureCaptionCreateApi, webPictureCaptionApi, styleGenCreateApi, webStyleGenApi, styleModelDetailApi } from '../api/index';
import { getSmartDevelopStyleDetailById } from '@/components/view-picture/components/api/index';
import zwtp from '@/assets/zwtp.png';

const router = useRouter();
const route = useRoute();
const formRef = ref<InstanceType<typeof ElForm>>();
const isShowDialog = ref(false);
const oldPrompt = ref<string>('');
const modelInfo = ref<any>({
  url: '',
  aiModelCode: '',
  name: '',
  modelMaterialId: '', 
  racialName: '',
});
const sceneInfo = ref<any>({
  sceneId: '',
  sceneName: '',
  pictureId: '',
  picturePath: ''
});
const dialogType = ref('model');
const dialogTableVisible = ref(false);
const { getEnableDictionaryOptions } = useDictionary();
const ruleForm = ref<any>({
  genCount: 6,
  faceFix: 1,
  enableDistill: 0,
});
const isLooping = ref(false);

const handleDelete = () => {
  ruleForm.value.refImgUrl = '';
  // emit('clear');
};

const handleUploadSuccess = (picUrl: string) => {
  // emit('upload-success', picUrl);
};

const activeName = ref('first');

// 分辨率
const generateNumList = computed(() => getEnableDictionaryOptions(DICTIONARY_KEY.NEST_FGLORASIZE));
const collectData = ref<StyleModelUserCollectPageResListItem>({});
// 获取选中的收藏数据
const handleCollect = (data: StyleModelUserCollectPageResListItem) => {
  collectData.value = data;
  ruleForm.value.styleModelId = data.styleModelId;
  ruleForm.value.imgSize = generateNumList.value[0]?.label;
  generateNumList.value.forEach((v: { label: string; }) => {
    if (v.label.split('x')[0] === data.sizeWidth && v.label.split('x')[1] === data.sizeHeight) {
      ruleForm.value.imgSize = v.label;
    }
  });
};

// 风格参考
const enableFollowabilityList = computed(() => getEnableDictionaryOptions(DICTIONARY_KEY.FG_LORA_FOLLOW));

watch(() => enableFollowabilityList.value, (newData: any) => {
  if (newData.length && !ruleForm.value.enableFollowability) {
    newData.forEach((v: any) => {
      if (v.attributes.filter((v1: { code: string; name: string; }) => v1.code === 'isDefault' && v1.name === '1').length) {
        ruleForm.value.enableFollowability = Number(v.value);
      }
    });
  }
}, {
  immediate: true,
});

const handleCancel = () => {
  isShowDialog.value = false;
};

const racialName = ref<string>('');
const handleSubmit = () => {
  if (dialogType.value === 'scene') {
    ruleForm.value.bgImgUrl = sceneInfo.value.picturePath;
    ruleForm.value.bg = {
      sceneId: sceneInfo.value.sceneId,
      sceneName: sceneInfo.value.sceneName,
      picturePath: sceneInfo.value.picturePath,
      pictureId: sceneInfo.value.pictureId,
    };
  } else {
    racialName.value = modelInfo.value.racialName;
    ruleForm.value.modelImgUrl = modelInfo.value.url;
    ruleForm.value.model = {
      modelMaterialId: modelInfo.value.modelMaterialId,
      modelMaterialName: modelInfo.value.modelName || modelInfo.value.name,
      modelMaterialUrl: modelInfo.value.modelUrl || modelInfo.value.url || '',
    };
  }
  isShowDialog.value = false;
};

const bgImgFun = () => {
  dialogType.value = 'scene';
  isShowDialog.value = true;
};

const modelImgFun = () => {
  dialogType.value = 'model';
  isShowDialog.value = true;
};

// 生成款式描述
const setPrompt = async () => {
  const { data } = await pictureCaptionCreateApi({
    source: 'STYLE_GEN',
    inputImg: ruleForm.value.refImgUrl,
  });
  if (!data) {
    ElMessage.error('描述生成失败');
    return;
  }
  const dataStr = data as unknown as string;
  
  dataStr.split('\n\n').forEach((v: string) => {
    if (v.includes('Background')) {
      ruleForm.value.bgImgDesc = v.split(':')?.[1] ?? '';
    }
    if (v.includes('Fashion Model Appearance')) {
      ruleForm.value.modelImgDesc = v.split(':')?.[1] ?? '';
    }
  });
  

  const chinesePattern = /(?:[\u4e00-\u9fa5]|[\u3000-\u303f\uff00-\uffef]|[A-Z](?=[\u4e00-\u9fa5]))+/g;
  const match: string[] = dataStr.match(chinesePattern) || [];
  const chineseText = match?.join('');
  if (chineseText) {
    ruleForm.value.prompt = chineseText.replaceAll('：', '');
    oldPrompt.value = chineseText.replaceAll('：', '');
  }
  // data.split('\n\n').forEach((v: string) => {
  //   if (v.includes('Background')) {
  //     ruleForm.value.bgImgDesc = v.split(':')?.[1] ?? ''
  //   }
  //   if (v.includes('Fashion Model Appearance')) {
  //     ruleForm.value.modelImgDesc = v.split(':')?.[1] ?? ''
  //   }
  // });
  // const chinesePattern = /[\u4e00-\u9fa5].*?(?=\n\n[A-Za-z]|$)/s;
  // const match = data.match(chinesePattern);
};

// 确认生成
const confirmGeneration = async () => {
  if (activeName.value === 'first' && !ruleForm.value.refImgUrl) {
    ElMessage.error('请上传图片');
    return;
  }
  await formRef.value?.validate();
  await styleGenCreateApi({
    ...ruleForm.value,
    genType: activeName.value === 'first' ? 'IMAGE_TO_IMAGE' : 'TEXT_TO_IMAGE',
    faceFix: ruleForm.value.modelImgUrl ? 0 : ruleForm.value.faceFix
  });
  ElMessage.success('生成成功');
  router.back();
};
const otherSAources = ref<string>('');
const init = async () => {
  // 复制逻辑
  if (route.query.taskId) {
    const { data } = await webStyleGenApi(route.query.taskId as string);
    ruleForm.value = {
      ...data,
      taskId: undefined,
      taskCode: undefined,
      taskStatus: undefined,
      // source: data.sourceBusiness || '',
    };
    oldPrompt.value = data.prompt || '';
    if (data.genType === 'IMAGE_TO_IMAGE') {
      activeName.value = 'first';
    } else {
      activeName.value = 'second';
    }
    const r = await styleModelDetailApi(data.styleModelId || '');
    collectData.value = r.data;
  }
  
  // 从ai设计发送过来
  if (route.query.byAiDesignId) {
    otherSAources.value = route.query.byAiDesignId as string;
    const { data } = await getSmartDevelopStyleDetailById(otherSAources.value || '');
    ruleForm.value.taskSource = route.query.taskSource;
    ruleForm.value.sourceBusinessId = data.taskId;
    ruleForm.value.sourceBusinessCode = data.taskCode;
    ruleForm.value.inspirationId = data.inspirationId || '';
    ruleForm.value.inspirationCode = data.inspirationCode || '';
    ruleForm.value.bgImgUrl = data?.sceneInfo?.picturePath;
    ruleForm.value.bg = {
      sceneId: data?.sceneInfo?.sceneId,
      sceneName: data?.sceneInfo?.sceneName,
      picturePath: data?.sceneInfo?.picturePath,
      pictureId: data?.sceneInfo?.pictureId,
    };
    ruleForm.value.modelImgUrl = data?.modelMaterialUrl;
    ruleForm.value.model = {
      modelMaterialId: data?.modelMaterialId,
      modelMaterialName: data?.modelMaterialName,
      modelMaterialUrl: data?.modelMaterialUrl || '',
    };
    (route.query.imgs as string || '').split(';').forEach((urlIndex: string, index: number) => {
      if (urlIndex) {
        ruleForm.value.refImgUrl = data.generateImages[index].pictureList[+urlIndex]?.repairImgUrl || data.generateImages[index].pictureList[+urlIndex]?.pictureUrl;
      }
    });
  }
};

init();

const closeImgFun = () => {
  ruleForm.value.prompt = '';
  oldPrompt.value = '';
  ruleForm.value.refImgUrl = '';
  ruleForm.value.modelImgUrl = '';
  ruleForm.value.bgImgUrl = '';
  ruleForm.value.faceFix = 1;
  ruleForm.value.enableDistill = 0;
  ruleForm.value.genCount = 6;
  // ruleForm.value.imgSize = '';
  ruleForm.value.bgImgDesc = '';
  ruleForm.value.modelImgDesc = '';
  ruleForm.value.model = {};
  ruleForm.value.bg = {};
};
</script>

<style scoped>
.img-box {
  width: 100%;
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
  flex: 0 0 96px;
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
.img-w-h-300 {
  position: relative;
  width: 300px;
  height: 300px;
  object-fit: cover;
}
.close-ico {
  position: absolute;
  top: -10px;
  right: -10px;
  cursor: pointer;
}
.w-108 {
  position: relative;
  width: 108px;
  height: 108px;
  object-fit: cover;
}
.dele-ico {
  display: flex;
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
.tit {
  color: gray;
  font-size: 14px;
}
</style>
