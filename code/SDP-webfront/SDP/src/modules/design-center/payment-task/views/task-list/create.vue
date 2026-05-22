<template>
  <div class="app-box">
    <div class="bth-flex">
      <el-button
        class="tw-mr-4"
        :icon="ArrowLeft"
        @click="goToPath"
        link
      />
      <span>创建开款任务</span>
      <el-button
        class="l-auto"
        @click="goToPath"
      >
        取消
      </el-button>
      <el-button
        type="primary"
        @click="submit"
      >
        确定
      </el-button>
    </div>
    <div class="tb-coll">
      <el-form
        ref="formRef"
        :model="form"
        :inline="true"
      >
        <el-form-item
          label="款式标签"
          prop="styleLabelCode"
          :rules="[
            { required: true, message: '请选择', trigger: 'change' },
          ]"
        >
          <el-select
            filterable
            class="w-200"
            v-model="form.styleLabelCode"
            placeholder="请选择"
            @change="styleLabelChange"
          >
            <el-option
              v-for="item in TYPE_OF_OPENING_LIST"
              :key="item.value"
              :label="item.label"
              :value="item.value || ''"
            />
          </el-select>
        </el-form-item>
        <el-form-item
          label="波段"
          prop="wavebandCode"
          :rules="[
            { required: false, message: '请选择', trigger: 'change' },
          ]"
        >
          <el-select
            filterable
            class="w-200"
            v-model="form.wavebandCode"
            placeholder="请选择"
            @change="getNameChange($event, 'wavebandName', plmClothingBand)"
          >
            <el-option
              v-for="item in plmClothingBand"
              :key="item.value"
              :label="item.label"
              :value="item.value || ''"
            />
          </el-select>
        </el-form-item>
        <el-form-item
          label="店铺"
          prop="storeId"
          :rules="[
            { required: true, message: '请选择店铺', trigger: 'change' },
          ]"
        >
          <el-select
            filterable
            class="w-200"
            v-model="form.storeId"
            placeholder="请选择"
            @change="getNameChange($event, 'storeName', shopList)"
          >
            <el-option
              v-for="item in shopList"
              :key="item.value"
              :label="item.label"
              :value="item.value || ''"
            />
          </el-select>
        </el-form-item>
        <el-form-item
          label="平台"
          prop="bd"
          :rules="[
            { required: false, message: '请选择', trigger: 'change' },
          ]"
        >
          <el-select
            filterable
            class="w-200"
            v-model="form.platformCode"
            placeholder="请选择"
            @change="getNameChange($event, 'platformName', stockgoodsType)"
          >
            <el-option
              v-for="item in stockgoodsType"
              :key="item.value"
              :label="item.label"
              :value="item.value || ''"
            />
          </el-select>
        </el-form-item>
        <el-form-item
          label=""
        >
          <div
            class="tw-color-#605CE5 tw-cursor-pointer"
            @click="importExel"
          >从模板导入</div>
          <div
            class="tw-color-#605CE5 tw-cursor-pointer tw-m-l-20px"
          >
            <Uploader
              v-show="showImg && dataList.length < 50"
              @change="batchUpImg"
              :before-upload="handleBeforeUpload"
              accept=".jpg,.png,.jpeg"
              tips=""
              :limit="50 - dataList.length"
              :size-limit="20"
              :use-wrapper="false"
              :paste="false"
            >
              <template #default>
                <div>
                  <el-button size="small">
                    批量导图
                  </el-button>
                </div>
              </template>
              <template #list-item="{ data }">
                <div>{{ data }}</div>
              </template>
            </Uploader>
          </div>
        </el-form-item>
      </el-form>
    </div>
    <div class="table-box" ref="scrollBarRefScroll">
      <div
        v-for="(item, index) in dataList"
        :key="index"
        class="tw-m-b-10px"
      >
        <el-card shadow="never">
          <div class="tw-flex-center-y">
            <div :class="`tw-font-bold no-wrap after ${item.images.length ? 'before' : ''}`">款式{{ index + 1 }}：</div>
            <span class="tw-m-l-20px no-wrap">价格：</span>
            <el-input-number
              class="tw-w-150px"
              v-model="item.price"
              controls-position="right"
              :min="0"
              :max="9999.99"
              :precision="2"
            />
            <span class="tw-m-l-20px no-wrap">供应商：</span>
            <el-input
              class="tw-w-150px"
              v-model="item.supplierName"
              maxlength="20"
              placeholder=""
            />
            <span class="tw-m-l-20px no-wrap">供应商款号：</span>
            <el-input
              class="tw-w-150px"
              v-model="item.supplierStyleCode"
              maxlength="20"
              placeholder=""
            />
            <span class="tw-m-l-20px no-wrap">商品链接：</span>
            <el-input
              class="tw-w-150px" 
              v-model="item.commodityLink"
              maxlength="500"
              placeholder=""
            />
            <el-button
              type="danger"
              text
              class="l-auto"
              @click="delFun(index)"
            >
              删除款式
            </el-button>
          </div>
          <div class="tw-m-t-10px">
            <!-- <ImageuploadcontrolUpgrade
              :isMainImageType="true"
              v-model="item.images"
              layout="horizontal"
              :limit="10"
            /> -->
            <Uploader
              class="tw-ml-[-5px]"
              v-model="item.images"
              uploader-style="button"
              :limit="10"
              :accept="'.png, .jpg, .jpeg'"
              :size-limit="20"
              :tips="''"
            />
          </div>
        </el-card>
      </div>
    </div>
    <div class="footer">
      <!-- <span class="bth-text" @click="add">
        新建款式
      </span> -->
      <el-button
        type="primary"
        @click="add"
      >
        新建款式
      </el-button>
      <!-- <el-button
        class="l-auto"
        @click="recommend(true)"
      >智能推荐素材</el-button>
      <el-button @click="recommend(false)">模特素材</el-button>
      <el-button @click="modelFace">模特面容</el-button> -->
    </div>
    <el-dialog
      v-model="dialogFormVisible"
      title="导入开款任务"
      width="500"
    >
      <el-form :model="formExel" ref="refNameExel">
        <el-form-item
          label="上传文件"
          prop="url"
          :rules="[{ required: true, message: '请选择文件', trigger: 'change' }]"
        >
          <div class="tw-flex">
            <Uploader
              v-model="formExel.url"
              accept=".xlsx,.xls"
              tips="支持格式: .xls .xlsx"
              :limit="1"
              :size-limit="100"
              :use-wrapper="false"
              :paste="false"
              list-type="text"
            >
              <el-button
                plain
              >
                <el-icon><Upload /></el-icon>
                上传文件
              </el-button>
            </Uploader>
            <a
              href='https://oss.yunbanfang.cn/tiangong_9ef023de015c4266b8e82f987cdd8afa.xlsx'
              download='开款任务_导入模板.xlsx'
              @click.stop="(e) => {
                e.stopPropagation(); // 阻止事件冒泡
              }"
            >
              <span class="tw-m-l-10px tw-color-#605CE5 no-war">模板下载</span>
            </a>
          </div>
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取消</el-button>
          <el-button type="primary" @click="getExelData">
            确定
          </el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
import { nextTick, ref, PropType, defineProps, computed, defineEmits } from 'vue';
// import ImageuploadcontrolUpgrade from '@/components/image-upload-control-upgrade/index.vue';
import Uploader from '@/components/uploader/packages/uploader.vue';
import { Upload, ArrowLeft } from '@element-plus/icons-vue';
import { useCreateData } from './hooks/use-create-data';
import { developStyleBatchCreateApi, importExcelImportExcel } from '../../api/index';
import { DevelopStyleBatchCreateReqItem } from '../../api/types';
import { ElMessage, ElForm } from 'element-plus';
import { useRouter } from 'vue-router';
import { TASK_SOUCE } from '../../constant/index';
import { IFileData } from '@/components/uploader/packages/types';

const formRef = ref<InstanceType<typeof ElForm> | null>();
const refNameExel = ref<InstanceType<typeof ElForm> | null>();
const router = useRouter();
const { 
  TYPE_OF_OPENING_LIST,
  plmClothingBand,
  stockgoodsType
} = useCreateData();
const createData: any = useCreateData();
const shopList: any = createData?.shopList;
const sum = ref();
const goBack = () => {};
const form = ref<DevelopStyleBatchCreateReqItem>({});
const ruleTableForm = ref<{ tableList: any[]; }>({
  tableList: [],
});
const scrollBarRefScroll = ref<HTMLInputElement | null>(null);
const dataList = ref<any>([
  {
    price: undefined,
    supplierName: '',
    supplierStyleCode: '',
    commodityLink: '',
    images: [],
  }
]);
const styleLabelChange = (ev: string) => {
  const items = TYPE_OF_OPENING_LIST.value?.find((v: any) => v.value === ev);
  form.value.styleType = items?.attributes?.find(v => v.code === 'clothType')?.name;
  form.value.styleLabelName = items?.label;
};
const add = () => {
  if (dataList.value.length === 50) {
    ElMessage.error('最多创建50个款式');
    return;
  }
  dataList.value.push({
    price: undefined,
    supplierName: '',
    supplierStyleCode: '',
    commodityLink: '',
    images: [],
  });
  nextTick(() => {
    if (scrollBarRefScroll.value) {
      scrollBarRefScroll.value.scrollTo({
        top: scrollBarRefScroll.value.scrollHeight,
        behavior: 'smooth',
      });
    }
  });
};

const delFun = (index: number) => {
  if (dataList.value.length === 1) {
    ElMessage.error('最少保留一个款式');
    return;
  }
  dataList.value.splice(index, 1);
};

const dialogFormVisible = ref<boolean>(false);
const formExel = ref({
  url: [],
});
const importExel = () => {
  formExel.value.url = [];
  dialogFormVisible.value = true;
};

const getNameChange = (e:any, keyName: keyof DevelopStyleBatchCreateReqItem, list: { value: string; label: string; }[]) => {
  form.value[keyName] = list.find((v: { value: string; }) => v.value === e)?.label;
};
const goToPath = () => {
  router.replace('/design-center/payment-task/task-list');
};
const hasDuplicateSupplierCombination = (arr: DevelopStyleBatchCreateReqItem[]) => {
  const existedKeys = new Set();
  // eslint-disable-next-line
  for (const item of arr) {
    const uniqueKey = String(item.supplierName) + String(item.supplierStyleCode);
    if (existedKeys.has(uniqueKey) && !!item.supplierName && !!item.supplierStyleCode) {
      return true;
    }
    existedKeys.add(uniqueKey);
  }
  return false;
};
const submit = async () => {
  await formRef.value?.validate();
  const data: DevelopStyleBatchCreateReqItem[] = [];
  let mas = '';
  dataList.value.forEach((v: DevelopStyleBatchCreateReqItem, index: number) => {
    if (v.images.length === 0 && !mas) {
      mas = `款式${index + 1}最少上传一张图片`;
    }
    const mainImgUrl = v.images.find((v1: { mainImageType: number; url: string; }) => v1.mainImageType === 1)?.url;
    data.push({
      ...v,
      ...form.value,
      mainImgUrl: mainImgUrl || v.images[0]?.url,
      images: mainImgUrl ? v.images?.filter((v1 : { mainImageType: number; }) => v1.mainImageType !== 1).map((v2: { url: string; }) => v2.url) : v.images.filter((_: any, indexImg: number) => indexImg !== 0).map((v2: { url: string; }) => v2.url),
    });
  });
  if (form.value.styleType === TASK_SOUCE.spot_style && hasDuplicateSupplierCombination(data)) {
    mas = '已有重复款，如需添加SKC请到现货管理界面操作';
  }
  if (mas) {
    ElMessage.error(mas);
    return;
  }
  await developStyleBatchCreateApi(data);
  ElMessage.success('操作成功');
  goToPath();
};
// 获取exel数据
const getExelData = async () => {
  await refNameExel.value?.validate();
  try {
    const urlData: { url: string; } = formExel.value.url[0];
    const downloadRes = await fetch(urlData.url);
    if (!downloadRes.ok) throw new Error('下载失败');
    const excelBlob = await downloadRes.blob();
    const formData = new FormData();
    formData.append('file', excelBlob);
    importExcelImportExcel(formData).then((res: any) => {
      if ((dataList.value?.length ?? 0) + (res?.data?.length ?? 0) > 50) {
        ElMessage.error('最多创建50个款式');
        return;
      }
      const arrList: any = [];
      res.data.forEach((v: any) => {
        const { commodityLink, supplierName, supplierStyleCode, mainImgUrl } = v;
        const imgs: any = [];
        [2, 3, 4, 5, 6, 7, 8, 9, 10].forEach((_v) => {
          if (v[`imageUrl${_v}`]) {
            imgs.push({
              url: v[`imageUrl${_v}`]
            });
          }
        });
        arrList.push({
          commodityLink: commodityLink?.slice(0, 500),
          supplierName: supplierName?.slice(0, 20),
          supplierStyleCode: supplierStyleCode?.slice(0, 20),
          price: undefined,
          images: [
            {
              mainImageType: 1,
              url: mainImgUrl
            },
            ...imgs
          ],
        });
      });
      dataList.value = [...arrList, ...dataList.value];
      dialogFormVisible.value = false;
    });
  } catch (err) {
    console.error('失败', err);
  }
};
const showImg = ref(true);
// 批量上传图片
const batchUpImg = (urls: any) => {
  if ((dataList.value?.length ?? 0) + (urls?.length ?? 0) > 50) {
    ElMessage.error('最多创建50个款式');
    return;
  }
  const imgsData: any = [];
  urls.forEach((imgs: { url: string; }) => {
    imgsData.push({
      price: undefined,
      supplierName: '',
      supplierStyleCode: '',
      commodityLink: '',
      images: [
        {
          url: imgs.url
        }
      ],
    });
  });
  dataList.value = [...imgsData, ...dataList.value];
  showImg.value = true;
};
const handleBeforeUpload = (file: IFileData) => {
  showImg.value = false;
  return file;
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

</style>
<style>
.no-header-dialog .el-dialog__header {
  display: none !important;
}
.no-header-dialog .el-scrollbar {
  padding: 0;
}
.no-wrap {
  white-space: nowrap;
}
.after {
  position: relative;
}
.after::after {
  content: '*';
  display: block;
  position: absolute;
  left: -10px;
  top: 1px;
  color: red;
}
.before {
  position: relative;
}
.before::before {
  content: '主图';
  display: block;
  position: absolute;
  left: 0;
  top: 35px;
  background-color: #707AF2;
  z-index: 999;
  padding: 3px 8px;
  color: #fff;
}
.no-war {
  white-space: nowrap;
}
</style>
