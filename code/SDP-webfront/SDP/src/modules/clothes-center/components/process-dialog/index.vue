<template>
  <!-- 加工单详情 -->
  <div class="process-dialog">
    <el-dialog
      :modelValue="visible"
      width="1200px"
      title="加工单详情"
      :close-on-click-modal="false"
      center
      append-to-body
      @close="handleClose"
    >
      <el-tabs v-model="activeName">
        <el-tab-pane
          v-if="props.tabsShow.includes('base')"
          label="需求信息"
          name="base"
        >
          <sc-detail-card title="基础信息">
            <el-form>
              <el-row>
                <el-col :span="8">
                  <sc-detail-item label="设计师：">
                    {{detail?.designerName}}
                  </sc-detail-item>
                </el-col>
                <el-col :span="8">
                  <sc-detail-item label="设计组：">
                    {{detail?.designerGroup}}
                  </sc-detail-item>
                </el-col>
                <el-col :span="8">
                  <sc-detail-item label="品类：">
                    {{clothesInfo?.categoryName}}
                  </sc-detail-item>
                </el-col>
                <el-col :span="8">
                  <sc-detail-item label="打版方式：">
                    {{ $filters.getEnumLabel(MAKE_CLOTHES_TYPE_LIST, clothesInfo?.makeClothesTypeCode) }}
                  </sc-detail-item>
                </el-col>
                <el-col :span="8">
                  <sc-detail-item label="车版件数：">
                    {{clothesInfo?.sampleAmount}}
                  </sc-detail-item>
                </el-col>
                <el-col :span="8">
                  <sc-detail-item label="尺码：">
                    {{detail?.sizeStandard}}{{ detail?.sampleSize ? ` - ${detail?.sampleSize}` : '' }}
                  </sc-detail-item>
                </el-col>
                <el-col :span="8">
                  <sc-detail-item label="颜色：">
                    {{detail?.color}}
                  </sc-detail-item>
                </el-col>
              </el-row>
            </el-form>
          </sc-detail-card>
          <sc-detail-card title="设计图">
            <div class="image-content">
              <div class="ul">
                <div
                  v-for="(image, index) in (detail.designPictureList || [])"
                  :key="index"
                  class="li"
                >
                  <custom-image
                    class="tw-w-150px tw-h-150px tw-mt-10px"
                    :src="resizeImgByWidth(image, 300)"
                    fit="contain"
                    :preview-src-list="[image]"
                    lazy
                  />
                </div>
                <div
                  v-if="!detail.designPictureList.length"
                  class="li"
                >
                  <custom-image
                    class="tw-w-150px tw-h-150px tw-mt-10px"
                    :src="resizeImgByWidth('', 300)"
                    fit="contain"
                    lazy
                  />
                </div>
              </div>
            </div>
          </sc-detail-card>
          <sc-detail-card title="上架图">
            <div class="image-content">
              <div class="ul">
                <div
                  v-for="(image, index) in shelvePictureList"
                  :key="index"
                  class="li"
                >
                  <custom-image
                    class="tw-w-150px tw-h-150px tw-mt-10px"
                    :src="resizeImgByWidth(image, 300)"
                    fit="contain"
                    :preview-src-list="[image]"
                    lazy
                  />
                </div>
                <div
                  v-if="!shelvePictureList.length"
                  class="li"
                >
                  <custom-image
                    class="tw-w-150px tw-h-150px tw-mt-10px"
                    :src="resizeImgByWidth('', 300)"
                    fit="contain"
                    lazy
                  />
                </div>
              </div>
            </div>
          </sc-detail-card>
        </el-tab-pane>
        <el-tab-pane
          v-if="props.tabsShow.includes('design')"
          label="审版工艺单"
          name="design"
        >
          <sc-detail-card title="打版参考尺寸">
            <div class="tw-flex tw-my[10px]">
              <div class="tw-w-[50%]">
                <span class="required">版房品类：</span>
                {{auditCraftOrderDetailVo?.referSize?.roomCategoryName || ''}}
              </div>
              <div>
                <span class="required">纸样尺寸：</span>
                {{auditCraftOrderDetailVo?.referSize?.patternSize || ''}}
              </div>
            </div>
            <div>
              <sc-table
                height="300px"
                :data="sizeTableList"
                :columns="sizeTableColumns"
              />
            </div>
          </sc-detail-card>
          <sc-detail-card title="工艺说明要求">
            <div>
              <div class="required">裁剪要求：</div>
              <div v-html="getDefaultHtml(auditCraftOrderDetailVo?.cuttingRequire || cuttingRequireDefault)" />
            </div>
            <div class="tw-my[10px]">
              <div class="tw-mb[10px] required">车缝要求：</div>
              <div>
                <sc-table
                  height="300px"
                  :data="sewProcessList"
                  :columns="designTableColumns"
                  :span-method="componentSpanMethod"
                />
              </div>
            </div>
            <div>
              <div class="tw-my[10px] required">尾部要求：</div>
              <div v-html="getDefaultHtml(auditCraftOrderDetailVo?.tailRequire || tailRequireDefault)" />
            </div>
          </sc-detail-card>
        </el-tab-pane>
        <el-tab-pane
          v-if="props.tabsShow.includes('people')"
          label="相关人员"
          name="people"
        >
          <el-form>
            <el-row>
              <el-col :span="8">
                <sc-detail-item label="设计师：">
                  {{detail?.designerName || '-'}}
                </sc-detail-item>
              </el-col>
              <el-col :span="8">
                <sc-detail-item label="审版工艺师：">
                  {{detail?.reviewCraftsmanName || '-'}}
                </sc-detail-item>
              </el-col>
              <el-col :span="8">
                <sc-detail-item label="纸样师：">
                  {{detail?.patternMakerName || '-'}}
                </sc-detail-item>
              </el-col>
              <el-col :span="8">
                <sc-detail-item label="3D版师：">
                  {{detail?.dimensionDesignerName || '-'}}
                </sc-detail-item>
              </el-col>
              <el-col :span="8">
                <sc-detail-item label="裁剪师：">
                  {{detail?.cutterName || '-'}}
                </sc-detail-item>
              </el-col>
              <el-col :span="8">
                <sc-detail-item label="车缝师：">
                  {{detail?.sewerName || '-'}}
                </sc-detail-item>
              </el-col>
              <el-col :span="8">
                <sc-detail-item label="质检师：">
                  {{detail?.qualityCheckerName || '-'}}
                </sc-detail-item>
              </el-col>
              <el-col :span="8">
                <sc-detail-item label="审版师：">
                  {{detail?.editionReviewerName || '-'}}
                </sc-detail-item>
              </el-col>
              <el-col :span="8">
                <sc-detail-item label="用量师：">
                  {{detail?.checkerName || '-'}}
                </sc-detail-item>
              </el-col>
              <el-col :span="8">
                <sc-detail-item label="核价师：">
                  {{detail?.pricerName || '-'}}
                </sc-detail-item>
              </el-col>
            </el-row>
          </el-form>
        </el-tab-pane>
        <el-tab-pane
          v-if="props.tabsShow.includes('bom')"
          label="开发BOM"
          name="bom"
        >
          <sc-table
            height="100%"
            :data="bomList"
            :columns="tableColumns"
          />
        </el-tab-pane>
      </el-tabs>
    </el-dialog>
    <!--二次工艺弹框-->
    <SecondCraftDialog
      v-model:visible="processDialog.visible"
      :preview="processDialog.preview"
      :crafts="processDialog.crafts"
      :data="processDialog.data"
      :batch-dict-list-map="batchDictListMap"
      :craft-match-list="processDialog.craftMatchList"
    />
  </div>
</template>

<script lang="ts" setup>
import { computed, reactive, ref } from 'vue';
import { resizeImgByWidth } from '@/core/utils/helper';
import { useListColumns } from './hooks/use-table-columns';
import { useSizeTableColumns } from './hooks/use-size-table-columns';
import { useDesignTableColumns } from './hooks/use-design-table-columns';
import { sampleClothesInfoDetail, designCommonBom, designCommonGetBomById } from '../../api';
import { MAKE_CLOTHES_TYPE_LIST, tailRequireDefault, cuttingRequireDefault } from '@/modules/clothes-center/constant';
import { IBomPrintCraftDemandInfoListItem, ICraftMatchReqItem } from '@/modules/design-center/develop-bom/api/types';
import { IBomOrderMaterialItem } from '@/modules/design-center/develop-bom/views/edit/types';
import { craftMatch } from '@/modules/design-center/develop-bom/api';
import { useDictionary } from '@/hooks-transfer/use-dict';
import { DICTIONARY_KEY } from '@/constant/dictionary';
import SecondCraftDialog from '@/modules/design-center/develop-bom/components/process-dialog/index.vue';
import {
  SpanMethodProps
} from '@/modules/clothes-center/components/sew-require-card/hooks/use-table-list/type';
import useSewTableList from '@/modules/clothes-center/components/sew-require-card/hooks/use-table-list';

const props = defineProps({
  tabsShow: {
    type: Array,
    default: () => ['base', 'design', 'people', 'bom'],
  },
});

type Tabs = 'base' | 'bom' | 'design' | 'people';
const activeName = ref<Tabs>('base');
const dataInfo = ref();

// 二次工艺弹窗
const processDialog = reactive({
  visible: false,
  preview: false,
  crafts: {} as IBomPrintCraftDemandInfoListItem,
  data: {} as IBomOrderMaterialItem,
  craftMatchList: [] as ICraftMatchReqItem[],
});
const getCraftMatch = async (craftDemandId: string = '') => {
  const { data = [] } = await craftMatch({
    craftDemandId,
  });
  processDialog.craftMatchList = data || [];
};
const { batchDictListMap } = useDictionary([
  DICTIONARY_KEY.PLM_PURCHASE_YLBW,
  DICTIONARY_KEY.BOM_CUTTING_METHOD,
]);

const { tableColumns } = useListColumns({
  async previewCraft(row) {
    processDialog.preview = true;
    processDialog.crafts = row as unknown as IBomPrintCraftDemandInfoListItem;
    if (processDialog.preview) {
      await getCraftMatch(row.craftDemandId);
    }
    processDialog.visible = true;
  }
});
const { designTableColumns } = useDesignTableColumns();

const clothesInfo = computed(() => dataInfo.value?.clothes || {});
const detail = computed(() => dataInfo.value?.detail || {});
const auditCraftOrderDetailVo = computed(() => dataInfo.value?.auditCraftOrderDetailVo || {});
const referSize = computed(() => auditCraftOrderDetailVo.value?.referSize || {});
const shelvePictureList = computed(() => {
  const { spuShelvePictureList = [], skcShelvePictureList = [] } = dataInfo.value?.shelvePicture || {};
  return [...spuShelvePictureList, ...skcShelvePictureList];
});

const { convertToArray } = useSewTableList();
const sewProcessList = computed(() => {
  return convertToArray(auditCraftOrderDetailVo.value?.sewRequire || []);
});
const sizeTableList = computed(() => {
  if (!referSize.value) return [];
  return referSize.value?.sizeTable || [];
});

const { sizeTableColumns } = useSizeTableColumns({ referSize });

/**
   * @description 表格合并行处理
   * @param { row, column, rowIndex, columnIndex }
   * @returns { rowspan: number; colspan: number; }
   */
const componentSpanMethod = ({ row, column, rowIndex, columnIndex }: SpanMethodProps) => {
  const firstCol: Record<string, { rowspan: number; colspan: number; }> = {};
  const secondCol: Record<string, { rowspan: number; colspan: number; }> = {};
  sewProcessList.value.forEach((item) => {
    const [firstId, secondId] = item.parentId.split(',');
    if (!firstCol[firstId]) {
      firstCol[firstId] = {
        rowspan: 1,
        colspan: 1,
      };
    } else {
      firstCol[firstId].rowspan += 1;
    }
    if (!secondCol[secondId]) {
      secondCol[secondId] = {
        rowspan: 1,
        colspan: 1,
      };
    } else {
      secondCol[secondId].rowspan += 1;
    }
  });
  const [firstId, secondId] = sewProcessList.value[rowIndex].parentId.split(',');
  if (columnIndex === 0) {
    // 如果不是第一个出现的 `id`，返回 [0, 0]，表示合并到上一行
    if (rowIndex > 0 && sewProcessList.value[rowIndex - 1].parentId.includes(firstId)) {
      return [0, 0];
    }
    return firstCol[firstId]; // 返回合并的行数和列数
  }
  if (columnIndex === 1) {
    // 如果不是第一个出现的 `id`，返回 [0, 0]，表示合并到上一行
    if (rowIndex > 0 && sewProcessList.value[rowIndex - 1].parentId.includes(secondId)) {
      return [0, 0];
    }
    return secondCol[secondId]; // 返回合并的行数和列数
  }
  return [1, 1];
};

const getDefaultHtml = (val: string) => {
  if (val) {
    return val.replace(/\n/g, '<br/>');
  }
  return '';
};

const visible = ref(false);
const bomList = ref();
const handleClose = () => {
  visible.value = false;
};

const open = async (row: Record<string, any> = {}) => {
  const { designCode = '', clothesId = '', bomId = '' } = row;
  const getDetailsAndBomList = bomId
    ? Promise.all([
      sampleClothesInfoDetail({ clothesId }),
      designCommonGetBomById({ bomId }),
    ])
    : Promise.all([
      sampleClothesInfoDetail({ clothesId }),
      designCommonBom({ designCode }),
    ]);
  const [detailRes, bomListRes] = await getDetailsAndBomList;
  dataInfo.value = detailRes.data || {};
  bomList.value = bomListRes.data || [];
  visible.value = true;
};

defineExpose({
  open,
});
</script>

<style lang="scss" scoped>
:deep(.el-dialog__body) {
  max-height: 600px;
  overflow-y: scroll;
}
.image-content {
  margin-bottom: 10px;
  .ul {
    display: flex;
    flex-wrap: wrap;
    .li {
      position: relative;
      margin-right: 10px;
      padding: 15px;
      margin-bottom: 10px;
      .cover {
        display: block;
        width: 120px;
        height: 120px;
        border-radius: 4px;
      }
    }
  }
}
</style>
