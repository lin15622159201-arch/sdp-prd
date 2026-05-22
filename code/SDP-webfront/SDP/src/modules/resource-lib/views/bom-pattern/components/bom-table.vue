<template>
  <el-dialog
    v-model="selfVisible"
    title=""
    width="80%"
    :close-on-click-modal="false"
    append-to-body
    @open="openedInit"
  >
    <!-- 基础信息 -->
    <page-card title="基础信息">
      <section class="basis-info">
        <figure class="tw-flex tw-w-120px tw-ml-0 tw-mt-0">
          <ImageViewer
            v-if="useNormalizePictureUrl(detail.pictureUrl ?? [])[0]"
            :list="useNormalizePictureUrl(detail.pictureUrl ?? [])"
          >
            <template #default="{ view }">
              <el-image
                fit="cover"
                class="img-thumbnail__table cursor-pointer"
                :src="useNormalizePictureUrl(detail.pictureUrl ?? [])[0]"
                @click="view"
              />
            </template>
          </ImageViewer>
          <ImageViewer
            v-if="useNormalizePictureUrl(detail.pictureUrl ?? [], PICTURE_TYPE.DESIGN)[0]"
            :list="useNormalizePictureUrl(detail.pictureUrl ?? [], PICTURE_TYPE.DESIGN)"
          >
            <template #default="{ view }">
              <el-image
                fit="cover"
                class="img-thumbnail__table cursor-pointer"
                :src="useNormalizePictureUrl(detail.pictureUrl, PICTURE_TYPE.DESIGN)[0]"
                @click="view"
              />
            </template>
          </ImageViewer>
        </figure>
        <article>
          <div class="tw-mb-12px">
            <p>
              <span>{{ detail.designCode || '-' }}</span>
              <span class="tw-mx-10px tw-color-[#2d7afa] tw-font-bold">V {{ detail.versionNo }}</span>
              <span
                class="tag"
                :style="{
                  background: ({
                    [DESIGN_SAMPLE_TYPE_ENUM.PRE]: '#fff',
                    [DESIGN_SAMPLE_TYPE_ENUM.NORMAL]: '#FDEDED',
                    [DESIGN_SAMPLE_TYPE_ENUM.REPLACE]: '#F5EADB',
                  })[detail.sampleType],
                  color: ({
                    [DESIGN_SAMPLE_TYPE_ENUM.PRE]: '#000',
                    [DESIGN_SAMPLE_TYPE_ENUM.NORMAL]: '#D9001B',
                    [DESIGN_SAMPLE_TYPE_ENUM.REPLACE]: '#F59A23',
                  })[detail.sampleType],
                }"
              >
                {{ $filters.getEnumLabel(DESIGN_SAMPLE_TYPE_LIST, detail.sampleType) }}
              </span>
            </p>
          </div>
          <custom-desc
            class="margin-top-20"
            :data="detail"
            :key-map="keyMap"
            :label-width="100"
            :column="4"
          />
        </article>
      </section>
    </page-card>

    <!-- 物料匹配信息 -->
    <section class="back material-list">
      <dl class="section-title">
        <dt>
          开发bom
        </dt>
      </dl>
      <el-table
        :data="detail.bomOrderMaterialList"
        border
        style="width: 100%"
        row-key="id"
      >
        <el-table-column
          type="index"
          width="55"
          label="序号"
        />
        <el-table-column
          prop="prototypeMaterialName"
          label="物料项目"
          fixed="left"
        />
        <el-table-column label="使用部位">
          <template #default="{ row }">
            <span>{{ getUseParts(row) }}</span>
          </template>
        </el-table-column>
        <!-- <el-table-column label="预估单件用量" prop="singleDosage" /> -->
        <el-table-column label="物料id&名称" min-width="100px">
          <template #default="{ row }">
            <div class="flex flex-dir-column">
              <!--面料-->
              <span v-if="row.demandType === DESIGN_MATERIAL_TYPE_ENUM.FABRIC">
                {{ row.commodityCode }}
              </span>
              <!--辅料-->
              <span v-if="row.demandType === DESIGN_MATERIAL_TYPE_ENUM.ASSIST">
                {{ row.skuCode }}
              </span>
              <span>{{ row.commodityName }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="图片" min-width="100px">
          <template #default="{ row }">
            <ImageViewer v-if="row?.matchPictureList?.[0]" :list="row.matchPictureList">
              <template #default="{ view }">
                <el-image
                  class="cursor-pointer img-thumbnail__table"
                  fit="cover"
                  :src="resizeMatchPicture(row.matchPictureList[0])"
                  @click="view(0)"
                />
              </template>
            </ImageViewer>
          </template>
        </el-table-column>
        <el-table-column label="物料属性" min-width="120px">
          <template #default="{ row }">
            <!--面料-->
            <div
              v-if="row.demandType === DESIGN_MATERIAL_TYPE_ENUM.FABRIC"
              class="flex flex-dir-column"
            >
              <p><b>颜色</b>：{{ row.colorName }}{{ row.colorNumber ? `(${row.colorNumber})` : '' }}</p>
              <p v-if="row.widthConfirm"><b>门幅</b>：{{ row.widthConfirm }}{{ row.widthUnit }}</p>
              <p v-else><b>门幅</b>：{{ row.widthLow }}-{{ row.widthHigh }}{{ row.widthUnit }}</p>
              <p><b>单位</b>：{{ row.saleUnit }}</p>
              <p><b>克重</b>：{{ row.weightLow }}-{{ row.weightHigh }}{{ row.weightUnit }}</p>
            </div>
            <!--辅料-->
            <div
              v-if="row.demandType === DESIGN_MATERIAL_TYPE_ENUM.ASSIST"
              class="flex flex-dir-column"
            >
              <span v-for="attr in (row.skuAttrs || [])" :key="attr.attrId">
                <b>{{ attr.attrName }}</b>：{{ attr.attrValue }}
              </span>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="成分">
          <template #default="{ row }">
            <div class="flex flex-dir-column">
              <span
                v-for="(item, index) in row.material"
                :key="index"
                class="tw-mr-5px"
              >
                {{ item.name }}{{ item.percent }}%;
              </span>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="供应商物料编号&色号" min-width="150px">
          <template #default="{ row }">
            <div class="flex flex-dir-column">
              <!--面料-->
              <span v-if="row.demandType === DESIGN_MATERIAL_TYPE_ENUM.FABRIC">
                {{ row.commodityCode }}
              </span>
              <!--辅料-->
              <span v-if="row.demandType === DESIGN_MATERIAL_TYPE_ENUM.ASSIST">
                {{ row.skuCode }}
              </span>
              <div>
                {{ row.colorName }}{{ row.colorNumber ? `(${row.colorNumber})` : '' }}
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="二次工艺/环节" min-width="150px">
          <template #default="{ row }">
            <div class="flex row-flex-space-between" style="min-height: 60px">
              <div class="flex flex-dir-column ">
                <el-tag
                  v-for="(item, index) in row.craftDemandInfoList"
                  :key="index"
                  plain
                  style="margin: 5px;cursor: pointer;"
                  @click="previewCraft(item)"
                >
                  {{ item.category3 || item.category2 }}/{{
                    $filters.getEnumLabel(CRAFTS_REQUIRE_LIST, item.craftsRequire) }}
                </el-tag>
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="裁剪方法">
          <template #default="{ row }">
            <span>{{ (cuttingMethodOpts.find(item => item.code === row.cuttingMethod)?.desc) || '' }}</span>
          </template>
        </el-table-column>

        <el-table-column
          label="备注"
          width="260px"
          fixed="right"
        >
          <template #default="{ row }">
            <div class="flex flex-dir-column">
              <remark-record
                v-model="row.materialRemarkList"
                name-key="createdName"
                time-key="createdTime"
                desc-key="remark"
                :time-formatter="(v: string) => $filters.formatTime(v)"
                disabled
              />
            </div>
          </template>
        </el-table-column>
      </el-table>
    </section>

    <!--二次工艺弹框-->
    <ProcessDialog
      v-model:visible="processDialog.visible"
      :preview="processDialog.preview"
      :crafts="processDialog.crafts"
      :data="processDialog.data"
      :purchaser-id="detail.purchaserId"
    />
  </el-dialog>
</template>

<script lang="ts">
import type { PropType } from 'vue';
import { defineComponent, ref, reactive, computed } from 'vue';
import type { KeyMap } from '@/components/custom-desc/package/types';
import { getLabelByVal, filters } from '@/core/plugins/filter';
import ProcessDialog from './process-dialog/index.vue';
import useDialogVisible from '@/hooks-transfer/use-dialog-visible';

import {
  DESIGN_ORDER_TYPE_LIST,
  DESIGN_SAMPLE_TYPE_ENUM,
  DESIGN_SAMPLE_TYPE_LIST,
  CRAFTS_REQUIRE_LIST,
  DESIGN_CUTTING_METHOD_LIST,
  DESIGN_MATERIAL_TYPE_ENUM,
  PICTURE_TYPE,
} from '@/modules/resource-lib/constant';
import type {
  getWebV1BomDetailApiResBomOrderMaterialListResItem as BomRowItem,
  AddCaftsItem,
  IOrderPageListItem,
  IOrderPageBomInfoItem,
} from '@/modules/resource-lib/api/types';
import { useNormalizePictureUrl, getResizePicture } from '@/modules/resource-lib/composables/normalize-picture-url';
// import { getWebV1SpecialApi } from '@/modules/resource-lib/api';
import { useDictionary } from '@/hooks/use-dictionary';
import { DICTIONARY_KEY } from '@/constant/dictionary';

interface ISortFunc {
  (a: any, b: any): number;
}

export default defineComponent({
  name: 'BomTable',
  components: { ProcessDialog },
  props: {
    data: {
      require: true,
      type: Object as PropType<IOrderPageListItem>,
      default: () => {},
    },
  },
  setup(props, { emit }) {
    const { visible: selfVisible } = useDialogVisible(props, emit);

    const { getDictionaryOptions } = useDictionary();
    const PLM_PURCHASE_YLBW_0PTIONS = computed(() => {
      return getDictionaryOptions(DICTIONARY_KEY.PLM_PURCHASE_YLBW) ?? [];
    });

    // 基础信息
    const keyMap: KeyMap = {
      styleCode: '成衣SPU',
      // bdName: '所属BD',
      // regionName: '所属区域',
      // entryTypistName: '需求创建人员',
      spuCreatedTime: {
        label: 'SPU生成时间',
        type: 'time',
      },
      designerGroup: '设计组',
      // purchaserName: {
      //   label: '客户名称',
      //   type: 'name-code',
      //   code: 'purchaserCode',
      // },
      // demandTaskType: {
      //   label: '订单类型',
      //   formatter: v => getLabelByVal(DESIGN_ORDER_TYPE_LIST, v),
      // },
      skcCreatedTime: {
        label: '款生成时间',
        type: 'time',
      },
      designerName: {
        label: '设计师',
        type: 'name-code',
        code: 'designerIdWithBS',
      },
      // purchaserContactName: {
      //   label: '联系方式',
      //   type: 'name-mobile',
      //   code: 'purchaserContactMobile',
      // },
    };

    // 获取裁剪方法下拉
    const cuttingMethodOpts = computed(() => {
      const dirctList = getDictionaryOptions(DICTIONARY_KEY.BOM_CUTTING_METHOD);
      return dirctList.map((item) => {
        return {
          code: item.value,
          desc: item.label,
        };
      });
    });

    // 获取页面数据
    const detail = ref<IOrderPageListItem>({} as IOrderPageListItem);
    const parseBomListJson = (list: IOrderPageBomInfoItem[]) => {
      return list.map((it) => {
        try {
          if (it.material) {
            it.material = JSON.parse(it.material as string);
          }
          // 当为辅料时，处理物料属性json
          if (it.demandType === DESIGN_MATERIAL_TYPE_ENUM.ASSIST && it.skuAttrs) {
            it.skuAttrs = JSON.parse(it.skuAttrs as string);
          }
        } catch (e) {
          it.material = [];
          it.skuAttrs = [];
        }
        return it;
      });
    };

    const getDetails = async () => {
      const { data } = props;
      data.bomOrderMaterialList = parseBomListJson(data.bomOrderMaterialList);
      data.designerIdWithBS = `BS${data.designerId}`;
      const sortFunc: ISortFunc = (a, b) => {
        return a.sort - b.sort;
      };
      data.bomOrderMaterialList = data.bomOrderMaterialList?.sort(sortFunc);
      detail.value = data;

      console.log('detail==', detail.value);
    };
    const openedInit = () => {
      getDetails();
    };

    // 二次工艺弹窗
    const processDialog = reactive({
      visible: false,
      preview: false,
      crafts: {} as AddCaftsItem,
      data: {} as BomRowItem,
    });

    const previewCraft = (crafts: AddCaftsItem) => {
      processDialog.preview = true;
      processDialog.crafts = crafts;
      processDialog.visible = true;
    };

    const resizeMatchPicture = (src: string) => {
      return filters.ossUrl(src);
    };

    const getUseParts = (row: BomRowItem) => {
      const usePartLists = [] as string[];
      const partUseArr = (row.partUse as string)?.split(',');
      partUseArr?.forEach((v1) => {
        PLM_PURCHASE_YLBW_0PTIONS.value.forEach((v2) => {
          if (v2.value === v1) {
            usePartLists.push(v2.label);
          }
        });
      });
      return usePartLists?.join(',');
    };

    return {
      selfVisible,
      getDetails,
      openedInit,
      keyMap,
      detail,
      DESIGN_ORDER_TYPE_LIST,
      DESIGN_SAMPLE_TYPE_ENUM,
      DESIGN_MATERIAL_TYPE_ENUM,
      DESIGN_SAMPLE_TYPE_LIST,
      DESIGN_CUTTING_METHOD_LIST,
      CRAFTS_REQUIRE_LIST,
      processDialog,
      previewCraft,
      PICTURE_TYPE,
      useNormalizePictureUrl,
      getResizePicture,
      resizeMatchPicture,
      getUseParts,
      cuttingMethodOpts,
    };
  },
});
</script>

<style scoped lang="scss">
// @import "@/modules/design/styles/index.scss";
$gap: 15px;
figure {
  .el-image {
    width: 120px;
    height: 150px;
    margin-right: 20px;
  }
}
.tag {
  height: 20px;
  padding: 0 15px;
  line-height: 20px;
  text-align: center;
  border-radius: 10px;
}
.basis-info {
  display: flex;
  article {
    flex: 1;
    dl {
      display: flex;
      justify-content: space-between;
      align-items: center;
      ul {
        display: flex;
        align-items: center;
        li {
          margin-right: 10px;
        }
        li:nth-of-type(1) {
          font-weight: bold;
        }
        li:nth-of-type(2) {
          color: #2d7afa;
          font-weight: bold;
        }
      }
    }
  }
}
</style>
