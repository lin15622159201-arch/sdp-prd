<script lang="ts" setup>
import { ElMessageBox, ElMessage } from 'element-plus';
import { Switch, Edit } from '@element-plus/icons-vue';
import {
  getSysAdminWebDictList,
  disabledSysAdminWebDict,
  enabledSysAdminWebDict,
} from './api';
import ColorCateDialog from './components/color-cate-dialog.vue';
import ColorDialog from './components/color-dialog.vue';
import { useComponentMount } from '@/hooks-transfer/use-component-mount';
import { IColorPageItem, useTable } from './hooks/use-table';
import { useOpenBlank } from '@/hooks-transfer/use-router-blank';
import usePermissionConfig from './hooks/use-permission-config';
import usePermission from '@/hooks-transfer/use-permission';
import { ISysAdminWebDictResItem } from './api/types';
import { useRouter } from 'vue-router';
import { computed, ref } from 'vue';
import { SYS_ADMIN_WEB_ATTRIBUTE_CODE_ENUM } from './constant';
import { YES_NO_NUMBER_ENUM } from '@/constant';
import { DICTIONARY_KEY } from '@/constant/dictionary';

const { permissionRef } = usePermission(usePermissionConfig());
const router = useRouter();
interface IColorCategoryListItem extends ISysAdminWebDictResItem {
  /** 示意图 */
  imgUrl: string;
}
const colorCateList = ref<IColorCategoryListItem[]>([]);
const currentColorCate = ref<IColorCategoryListItem>();
/**
 * 颜色库的字典想去
 */
const colorLibraryObj = ref<ISysAdminWebDictResItem>();

const { columns } = useTable();

const tableData = computed<IColorPageItem[]>(() => {
  const arr: IColorPageItem[] = [];
  currentColorCate.value?.children.forEach((item) => {
    const obj: IColorPageItem = {
      ...item,
      imgUrl: '',
      colorNumber: '',
      englishName: '',
      englishAbbreviation: '',
      mapColorCode: '',
    };
    item.attributes.forEach((n) => {
      if (n.code === SYS_ADMIN_WEB_ATTRIBUTE_CODE_ENUM.SYT) {
        obj.imgUrl = n.name;
      }
      if (n.code === SYS_ADMIN_WEB_ATTRIBUTE_CODE_ENUM.SH) {
        obj.colorNumber = n.name;
      }
      if (n.code === SYS_ADMIN_WEB_ATTRIBUTE_CODE_ENUM.YWFY) {
        obj.englishName = n.name;
      }
      if (n.code === SYS_ADMIN_WEB_ATTRIBUTE_CODE_ENUM.YWSX) {
        obj.englishAbbreviation = n.name;
      }
      if (n.code === SYS_ADMIN_WEB_ATTRIBUTE_CODE_ENUM.YSSH) {
        obj.mapColorCode = n.name;
      }
    });
    arr.push({
      ...obj,
    });
  });
  return arr;
});
const handleCheckColorCate = (item: IColorCategoryListItem) => {
  if (currentColorCate.value === item) {
    return;
  }
  currentColorCate.value = item;
};
/**
 * 获取颜色类别列表
 */
const handleGetColorCategoryList = async () => {
  const { data } = await getSysAdminWebDictList({
    dictCodes: [DICTIONARY_KEY.CLOTHING_COLOR],
  });
  colorLibraryObj.value = data.length ? data[0] : undefined;
  if (data.length && data[0].children) {
    const arr: IColorCategoryListItem[] = [];
    data[0].children.forEach((item) => {
      const c = item.attributes.find(attr => attr.code === SYS_ADMIN_WEB_ATTRIBUTE_CODE_ENUM.SYT);
      arr.push({
        ...item,
        imgUrl: c?.name ?? '',
      });
    });
    colorCateList.value = arr;
  }
  if (colorCateList.value?.length && !currentColorCate.value) {
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    handleCheckColorCate(colorCateList.value[0]);
  }
  console.log('currentColorCate=', currentColorCate.value);
  if (currentColorCate.value?.id) {
    const c = colorCateList.value.find(item => item.id === currentColorCate.value!.id);
    if (c) {
      handleCheckColorCate(c);
    }
  }
};

const {
  setData: setColorCateData,
  trigger: colorCateTrigger,
} = useComponentMount(ColorCateDialog, {
  container: '#color-library__color-cate-dialog',
  props: {
    onSuccess() {
      handleGetColorCategoryList();
    },
  },
});

const {
  setData: setColorData,
  trigger: colorTrigger,
} = useComponentMount(ColorDialog, {
  container: '#color-library__color-dialog',
  props: {
    colorCateList,
    onSuccess() {
      handleGetColorCategoryList();
    },
  },
});

const handleAddColorCate = async () => {
  setColorCateData({
    isEdit: false,
    parentId: colorLibraryObj.value?.id ?? '',
    dictObj: {},
  });
  colorCateTrigger('handleOpen');
};

const handleEditColorCate = (item: IColorCategoryListItem) => {
  setColorCateData({
    isEdit: true,
    parentId: colorLibraryObj.value?.id ?? '',
    dictObj: item,
  });
  colorCateTrigger('handleOpen');
};

const handleSwitchColorCateState = async (item: IColorCategoryListItem) => {
  await ElMessageBox.confirm(`确定要${item.state === YES_NO_NUMBER_ENUM.YES ? '停用' : '启用'}${item.dictName}吗？`, '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  });
  if (item.state === YES_NO_NUMBER_ENUM.YES) {
    await disabledSysAdminWebDict(item.id);
  } else {
    await enabledSysAdminWebDict(item.id);
  }
  ElMessage.success('操作成功');
  if (
    currentColorCate.value?.dictCode !== item.dictCode
      && colorCateList.value[0]
  ) {
    handleCheckColorCate(colorCateList.value[0]);
  }
  handleGetColorCategoryList();
};

const handleAddColor = () => {
  setColorData({
    isEdit: false,
    parentId: currentColorCate.value!.id,
    dictObj: {},
  });
  colorTrigger('handleOpen', currentColorCate.value!.dictCode);
};

const handleEditColor = (item: IColorPageItem) => {
  setColorData({
    isEdit: true,
    parentId: currentColorCate.value!.id,
    dictObj: item,
  });
  colorTrigger('handleOpen', currentColorCate.value!.dictCode);
};

const handleSwitchColorState = async (item: IColorPageItem) => {
  await ElMessageBox.confirm(`确定要${item.state === YES_NO_NUMBER_ENUM.YES ? '停用' : '启用'}${item.dictName}吗？`, '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  });
  if (item.state === YES_NO_NUMBER_ENUM.YES) {
    await disabledSysAdminWebDict(item.id);
  } else {
    await enabledSysAdminWebDict(item.id);
  }
  ElMessage.success('操作成功');
  handleGetColorCategoryList();
};

const handleJump = (colorCode: string) => {
  const { href } = router.resolve({
    name: 'DesignCodeList',
    query: {
      colorCode,
    },
  });
  useOpenBlank(href, '');
};

(function init() {
  handleGetColorCategoryList();
}());
</script>

<template>
  <sc-app-page :laside="{ width: '250px' }">
    <template #laside>
      <ul class="nav">
        <li class="nav-li row-flex-center">
          <el-button
            v-if="permissionRef.XZYSLB"
            type="primary"
            @click="handleAddColorCate"
          >
            新增颜色类别
          </el-button>
        </li>
        <li
          v-for="(item, index) in colorCateList"
          :key="index"
          :class="[
            'nav-li',
            'nav-li__item',
            {
              active: currentColorCate?.dictCode === item.dictCode
            }
          ]"
          @click="handleCheckColorCate(item)"
        >
          <div class="tw-flex tw-items-center">
            <image-viewer
              :list="[item.imgUrl]"
            >
              <template #default="{ view }">
                <el-image
                  v-if="item.imgUrl"
                  :src="$filters.ossUrl(item.imgUrl, 52)"
                  class="diagram-image"
                  fit="cover"
                  @click.stop="view"
                />
              </template>
            </image-viewer>

            <span class="cate-name">
              {{ item.dictName }}
            </span>
          </div>

          <div class="operation-row tw-flex">
            <el-button
              v-if="permissionRef.BJYSLB"
              type="primary"
              :icon="Edit"
              circle
              size="small"
              @click.stop="handleEditColorCate(item)"
            />

            <el-button
              v-if="permissionRef.QTYYSLB"
              type="danger"
              :icon="Switch"
              circle
              size="small"
              @click.stop="handleSwitchColorCateState(item)"
            />
          </div>
        </li>
      </ul>
    </template>

    <template #header>
      <operation>
        <div class="main-title">
          <span>{{ currentColorCate?.dictName }}</span>
          <span v-if="currentColorCate?.state === YES_NO_NUMBER_ENUM.NO">（已停用）</span>
        </div>
        <template #content>
          <el-button
            v-if="permissionRef.XZYS"
            type="primary"
            @click="handleAddColor"
          >
            新增颜色
          </el-button>
        </template>
      </operation>
    </template>

    <template #main>
      <custom-table
        ref="tableRef"
        class="tw-h-full"
        :data="tableData"
        :column="columns"
      >
        <template #operation="{ row }">
          <div class="tw-flex">
            <!-- <el-button
              v-if="permissionRef.CKKS"
              text
              type="primary"
              @click="handleJump(row.colorCode)"
            >
              查看款式
            </el-button> -->
            <el-button
              v-if="permissionRef.BJYS"
              text
              type="primary"
              @click="handleEditColor(row)"
            >
              编辑
            </el-button>
            <el-button
              v-if="permissionRef.QTYYS"
              text
              type="danger"
              @click="handleSwitchColorState(row)"
            >
              {{ row.state === YES_NO_NUMBER_ENUM.YES ? '停用' : '启用' }}
            </el-button>
          </div>
        </template>
      </custom-table>
    </template>
  </sc-app-page>
</template>

<style scoped lang="scss">
  .nav{
    padding: 0;
    .row-flex-center {
      justify-content: center;
    }
    .nav-li {
      width: 100%;
      height: 45px;
      line-height: 45px;
      border-bottom: 1px solid #f9f9f9;
      color: #555;
      padding-left: 5px;
      padding-right: 5px;
      border-radius: 5px;
      cursor: pointer;
      /* stylelint-disable-next-line order/properties-order */
      display: flex;
      &.active {
        background: #eee;
      }
      &.nav-li__item {
        justify-content: space-between;
        align-items: center;
        .diagram-image {
          width: 25px;
          height: 25px;
          /* stylelint-disable-next-line order/properties-order */
          display: block;
          margin-right: 10px;
        }
        .operation-row {
          width: 60px;
          flex-shrink: 0;
        }
        .cate-name {
          width: 115px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        :deep(.el-button ) {
          height: 24px;
          line-height: 24px;
        }
      }
    }
  }
  .main-title{
    font-size: 20px;
  }
  .main{
    padding-top: 20px;
    .tools{
      margin-bottom: 20px;
    }
    .pagination-wrap{
      padding: 20px;
    }
  }
</style>
