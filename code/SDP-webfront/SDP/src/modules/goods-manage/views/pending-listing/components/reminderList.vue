<template>
  <div class="tw-p-10px associate-platform-goods-dialog">
    <!-- 顶部提示 -->
    <div class="tip-text mb-4 tw-m-b-5">
      已选择<span class="highlight">{{ totalCount }}</span>个SKC，其中<span class="highlight">{{ hasPlatformCount }}</span>个存在发布平台记录，请确认操作
    </div>
    <!-- 表格 -->
    <el-form
      ref="formRef"
      :model="formData"
      scroll-to-error
    >
      <el-table
        :data="formData.tableData"
        border
        class="goods-table"
        :header-cell-style="{ background: '#f5f7fa' }"
        :cell-style="{ padding: '8px 0 0px 0' }"
      >
        <!-- 款式信息 -->
        <el-table-column label="款式信息" min-width="180">
          <template #default="{ row }">
            <div class="goods-info">
              <div>SPU：{{ row.styleCode }}</div>
              <div>SKC：{{ row.skcCode }}</div>
            </div>
          </template>
        </el-table-column>

        <!-- 平台商品列表 -->
        <el-table-column label="平台商品列表" min-width="280">
          <template #header>
            <span class="required">平台商品列表</span>
          </template>
          <template #default="{ row, $index }">
            <!-- 有平台商品列表时才显示 radio 和校验 -->
            <el-form-item
              v-if="row.platformSkcList?.length > 0"
              :prop="`tableData[${$index}].selectedPlatformId`"
              :rules="{ 
                required: true, 
                message: '请选择平台商品', 
                trigger: 'change' 
              }"
              class="table-form-item"
            >
              <div class="platform-list">
                <el-radio-group
                  v-model="row.selectedPlatformId"
                  :disabled="isPlatformListDisabled(row)"
                  class="platform-radio-group"
                >
                  <div
                    v-for="item in row.platformSkcList"
                    :key="item.platformSkcId"
                    class="platform-item"
                  >
                    <el-radio :value="item.platformSkcId" :disabled="Number(item.isAssociated) === 1">
                      <span class="platform-id">{{ item.platformSkcId }}</span>
                      <span :class="['sync-status', Number(item.isAssociated) === 1 ? 'synced' : 'unsynced']">
                        {{ Number(item.isAssociated) === 1 ? '已同步' : '未同步' }}
                      </span>
                    </el-radio>
                    <div class="create-time">创建时间：{{ $filters.formatTime(item.createdAt || '') }}</div>
                  </div>
                </el-radio-group>
              </div>
            </el-form-item>
            <div v-else class="no-platform">
              {{ row.message }}
            </div>
          </template>
        </el-table-column>

        <!-- 处理方法 -->
        <el-table-column
          width="140"
          align="center"
        >
          <template #header>
            <span class="required">处理方法</span>
          </template>
          <template #default="{ row, $index }">
            <!-- 有平台商品列表时才显示选择器和校验 -->
            <el-form-item
              v-if="!row.message"
              :prop="`tableData[${$index}].handleMethod`"
              :rules="{ required: true, message: '请选择处理方法', trigger: 'change' }"
              class="table-form-item"
            >
              <el-select
                v-model="row.handleMethod"
                :disabled="isHandleMethodDisabled(row)"
                placeholder="请选择"
                size="small"
              >
                <el-option
                  label="关联历史商品"
                  value="associate"
                  :disabled="isAssociateOptionDisabled(row)"
                >
                  <template #default>
                    <span class="option-dot dot-green" />
                    <span>关联历史商品</span>
                  </template>
                </el-option>
                <el-option
                  label="发布新商品"
                  value="create"
                >
                  <template #default>
                    <span class="option-dot dot-orange" />
                    <span>发布新商品</span>
                  </template>
                </el-option>
                <template #prefix>
                  <span
                    v-if="row.handleMethod"
                    class="option-dot"
                    :class="row.handleMethod === 'associate' ? 'dot-green' : 'dot-orange'"
                  />
                </template>
              </el-select>
            </el-form-item>
          </template>
        </el-table-column>

        <!-- 操作 -->
        <el-table-column
          label="操作"
          width="80"
          align="center"
        >
          <template #default="{ $index }">
            <el-button
              type="primary"
              link
              @click="handleRemove($index)"
            >
              移除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-form>

    <!-- 底部按钮 -->
    <div class="dialog-footer tw-m-t-5">
      <el-button @click="handleCancel">取消</el-button>
      <el-button type="primary" @click="handleConfirm">确定</el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, PropType, defineProps } from 'vue';
import { ElMessage, ElForm } from 'element-plus';
import { productBatchPublishOrAssociateApi } from '@/modules/goods-manage/api/listing';
import { ProductBatchPublishOrAssociateReqAssociateProductListItem } from '@/modules/goods-manage/api/listing/type';

interface PlatformItem {
  id: string;
  isSynced: boolean;
  createTime: string;
}

const props = defineProps({
  mockData: {
    type: Array as PropType<any[]>,
    default: () => []
  },
  closeDialog: {
    type: Function,
  }
});

interface TableRow {
  spu: string;
  skc: string;
  selectedPlatformId: string;
  platformList: PlatformItem[];
  handleMethod: string;
}

// 弹窗显示状态
const visible = ref(false);

// form ref
const formRef = ref<InstanceType<typeof ElForm>>();

// 初始化表格数据（设置默认值）
const initTableData = (data: any[]) => {
  return data.map((row: any) => {
    const list = row.platformSkcList || [];
    const firstUnsynced = list.find((item: any) => Number(item.isAssociated) === 0);
    const selectedPlatformId = firstUnsynced ? firstUnsynced.platformSkcId : '';
    const handleMethod = (!list || list.length === 0) && !row.message ? 'create' : 'associate';
    return {
      ...row,
      selectedPlatformId,
      handleMethod,
    };
  });
};

// 表单数据
const formData = ref<any>({
  tableData: initTableData(props.mockData || []),
});

// 统计数量
const totalCount = computed(() => formData.value.tableData.length);
const hasPlatformCount = computed(() => formData.value.tableData.filter((row: any) => row?.platformSkcList?.length > 0)?.length);

// 处理方法选项
const handleOptions = [
  { label: '关联历史商品', value: 'associate' },
  { label: '发布新商品', value: 'create' },
];


// 判断处理方法选择器是否禁用
const isHandleMethodDisabled = (row: any) => {
  const list = row.platformSkcList;
  if (!list || list.length === 0) return false;
  if (row.selectedPlatformId) return false;
  return list.some((v: any) => v.isAssociated === 0);
};

// 判断"关联历史商品"选项是否禁用
const isAssociateOptionDisabled = (row: any) => {
  const list = row.platformSkcList;
  // 没有平台商品列表时禁用
  if (!row.message && (!list || list.length === 0)) return true;
  // 所有商品都已关联时禁用
  if (!row.message && list && list.length > 0 && list.every((v: any) => v.isAssociated === 1)) return true;
  return false;
};

// 判断平台商品列表是否禁用（当处理方法为"发布新商品"时禁用）
const isPlatformListDisabled = (row: any) => {
  return row.handleMethod === 'create';
};

// 打开弹窗
// const open = (data: TableRow[]) => {
//   tableData.value = data.map(row => ({
//     ...row,
//     selectedPlatformIds: row.platformList.filter(p => p.isSynced).map(p => p.id)
//   }));
//   visible.value = true;
// };

// 关闭弹窗
const close = () => {
  formData.value.tableData = [];
  props.closeDialog && props.closeDialog();
};

// 移除行
const handleRemove = (index: number) => {
  formData.value.tableData.splice(index, 1);
};

// 取消
const handleCancel = () => {
  close();
};
const emit = defineEmits<{
  confirm: [data: any[]];
}>();
// 确定
const handleConfirm = async () => {
  // 表单校验
  try {
    await formRef.value?.validate();
  } catch (error) {
    return;
  }

  const styleIds = formData.value.tableData.filter((v: { handleMethod: string; }) => v.handleMethod === 'create')?.map((v: { styleId: string; }) => v.styleId);
  const associateProductList: ProductBatchPublishOrAssociateReqAssociateProductListItem[] = [];
  formData.value.tableData.filter((v: { handleMethod: string; }) => v.handleMethod === 'associate').forEach((v: any) => {
    const str = v.platformSkcList?.find((v1: { platformSkcId: string; }) => v1.platformSkcId === v.selectedPlatformId);
    associateProductList.push({
      productId: v.productId,
      productSkcId: v.productSkcId,
      platformProductId: str.platformProductId,
      platformSkcId: str.platformSkcId,
      platformSkuList: str.platformSkuList
    });
  });
  if (!styleIds.length && !associateProductList.length) {
    close();
    return;
  }
  await productBatchPublishOrAssociateApi({
    styleIds,
    associateProductList,
  });
  emit('confirm', formData.value.tableData);
  close();
};

defineExpose({
  // open,
  close
});
</script>

<style lang="scss" scoped>
.table-form-item {
  margin-bottom: 18px;
}
.table-form-item :deep(.el-form-item__error) {
  padding-top: 2px;
}
.required {
  position: relative;
  &::before {
    content: '*';
    color: #f56c6c;
    margin-right: 4px;
  }
}
.associate-platform-goods-dialog {
  .tip-text {
    font-size: 14px;
    color: #606266;
    .highlight {
      margin: 0 4px;
      color: #409eff;
      font-weight: bold;
    }
  }
  .goods-table {
    .goods-info {
      line-height: 1.8;
      color: #606266;
    }
    .platform-list {
      .platform-radio-group {
        display: flex;
        flex-direction: column;
        gap: 12px;
      }
      .platform-item {
        :deep(.el-radio) {
          margin-right: 0;
          height: auto;
          align-items: center;
        }
        :deep(.el-radio__label) {
          padding-left: 6px;
        }
        :deep(.el-radio__input) {
          margin-top: 2px;
        }
        .platform-id {
          color: #606266;
          margin-right: 8px;
        }
        .sync-status {
          font-size: 12px;
          padding: 2px 6px;
          border-radius: 4px;
          &.synced {
            background: #f0f9eb;
            color: #67c23a;
          }
          &.unsynced {
            background: #fdf6ec;
            color: #e6a23c;
          }
        }
        .create-time {
          font-size: 12px;
          margin-left: 20px;
          color: #909399;
        }
      }
    }
    .no-platform {
      padding: 12px 0;
      color: #909399;
    }
  }
  .dialog-footer {
    display: flex;
    justify-content: end;
  }
}

// 下拉选项圆点样式
.option-dot {
  display: inline-block;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  margin-right: 6px;
  vertical-align: middle;
  &.dot-green {
    background-color: #e6a23c;
  }
  &.dot-orange {
    background-color: #67c23a;
  }
}
</style>
