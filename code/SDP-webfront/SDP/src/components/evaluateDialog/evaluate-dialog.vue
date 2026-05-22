<template>
  <el-dialog
    v-model="dialogOverflowVisible"
    @close="cancelFun"
    title="生成质量评价"
    width="40%"
  >
    <div class="main-box">
      <div class="lableTop">
        <div
          v-for="(item, index) in labelList"
          :key="index"
          @click="labelTopClick(item, index)"
          :class="`lableTopItem ${(item.labes || []).length ? 'activt' : ''}`"
        >{{ item.title }}</div>
      </div>
      <div
        class="lableTop"
        :style="`margin-top: ${(item.labes || []).length ? 10 : 0}px`"
        v-for="(item, index) in labelList"
        :key="index"
      >
        <div
          :class="`lablebottomItem ${items.isTrue ? 'activt' : ''}`"
          v-for="(items, indexs) in item.labes"
          :key="indexs"
          @click="items.isTrue = !items.isTrue"
        >{{ items.title }}</div>
      </div>
      <!-- :size-limit="10" -->
      <uploader
        style="margin: 10px 0;"
        v-model="supplementPictureList"
        :size-limit="20"
        :limit="5"
        accept=".jpg,.png,.jpeg"
        multiple
        tips="支持上传多张图片（最多5张）"
        :paste="true"
        structure="vertical"
        listPosition="after"
        checkAccept
      />
      <el-input
        v-model="description"
        style="width: 100%"
        :rows="2"
        type="textarea"
        maxlength="500"
        placeholder="请输入补充描述"
      />
    </div>
    <div class="footer-box">
      <el-button @click="cancelFun">取消</el-button>
      <el-button type="primary" @click="confirmFun">确认</el-button>
    </div>
  </el-dialog>
</template>

<script lang="ts" setup>
import { ref, defineEmits, computed, watch, onMounted } from 'vue';
import { ElDialog, ElInput, ElButton, ElMessage } from 'element-plus';
import { Search } from '@element-plus/icons-vue';
import { DICTIONARY_KEY } from '@/constant/dictionary';
import { useDictionary } from '@/hooks/use-dictionary';
import Uploader from '@/components/uploader/packages/uploader.vue';
import { imageGroupProblemFeedbackSaveApi } from './api/index';
import { ImageGroupProblemFeedbackSaveReq } from './api/type';

interface LabelInter {
  labes?: LabelsInter[];
  title?: string;
  code?: string;
}
interface LabelsInter {
  title?: string;
  code?: string;
  isTrue?: boolean;
}
const { getDictionaryOptions } = useDictionary();
const runningDiagramProblem = computed(() => getDictionaryOptions(DICTIONARY_KEY.RUNNING_DIAGRAM_PROBLEM));
const labelList = ref<LabelInter[]>([]);
watch(() => runningDiagramProblem.value, (newData) => {
  const arr: any = [];
  newData.forEach((v) => {
    arr.push({
      title: v.label,
      code: v.value,
      labes: [],
      oldLabels: (v.children || []).map((item) => {
        return {
          title: item.label,
          code: item.value,
        };
      })
    });
  });
  labelList.value = arr;
}, {
  immediate: true, 
});
// 标签数据
interface SuppInter {
  url: string;
}
const supplementPictureList = ref<SuppInter[]>([]);
const description = ref('');


// 
const labelTopClick = (item: any, index: number) => {
  if (item.labes.length) {
    item.labes = [];
  } else {
    item.labes = JSON.parse(JSON.stringify(item.oldLabels));
  }
};


const props = defineProps({
  details: {
    type: Object,
    default: () => {},
  },
});
const emits = defineEmits(['confirm', 'cancel']);
const dialogVisible = ref(false);
const keyText = ref();
const dialogOverflowVisible = ref(true);
const confirmFun = () => {
  const problemFeedbackList:any = [];
  labelList.value.forEach((v) => {
    if ((v.labes || []).filter(i => i.isTrue).length) {
      const arr:any = [];
      arr.push({
        name: v.title,
        code: v.code,
        values: [],
      });
      (v?.labes ?? []).filter(i => i.isTrue).forEach((item) => {
        arr[0].values.push({
          name: item.title,
          code: item.code
        });
      });
      problemFeedbackList.push(arr[0]);
    }
  });
  if (!problemFeedbackList.length && !description.value) {
    ElMessage.error('需填写描述或标签');
    return;
  }
  imageGroupProblemFeedbackSaveApi({
    ...props.details,
    supplementPictureList: (supplementPictureList.value || []).map(v => v?.url || ''),
    description: description.value,
    problemFeedbackList,
  }).then(() => {
    emits('confirm', null);
    ElMessage.success('保存成功');
  });
};
const cancelFun = () => {
  emits('cancel', null);
};
const isSelectedId = ref('-1');
onMounted(() => {
  document.removeEventListener('keydown', () => {});
});
</script>

<style scoped>
  .lableTop {
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
  }
  .lableTopItem {
    padding: 5px 10px;
    border: 1px solid rgba(215, 215, 215, 1);
    color: #333;
    border-radius: 100px;
    cursor: pointer;
  }
  .lablebottomItem {
    padding: 5px 10px;
    border: 1px solid rgba(215, 215, 215, 1);
    color: #333;
    border-radius: 6px;
    cursor: pointer;
  }
  .activt {
    border: 1px solid rgba(128, 128, 255, 1);
    color: #8080FF;
    background-color: rgba(128, 128, 255, .3);
  }
  .footer-box {
    display: flex;
    justify-content: end;
    margin-top: 20px;
  }
</style>
