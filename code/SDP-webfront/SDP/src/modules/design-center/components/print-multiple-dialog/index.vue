<template>
  <el-dialog
    v-model="innerVisible"
    v-bind="$attrs"
    custom-class="print-dialog"
    append-to-body
  >
    <div class="print-container">
      <div
        v-for="(item, index) in innerPrintInfoDataList"
        :id="`print-item-${item.designCode}`"
        :key="index"
        class="print-item"
      >
        <div class="tw-flex tw-flex-justify-between tw-flex-items-center print-item-header">
          <span>{{ item.designCode }}</span>
          <span class="delete-btn" @click="handleItemDelete(index)">
            删除
          </span>
        </div>
        <div class="tw-flex tw-flex-col print-item-body design-body tw-p-5px">
          <div class="tw-flex tw-flex-items-center">
            <p>设计图（{{ item.designPictureSelectedList.length }}）</p>
            <!-- <p class="hint">
              请选择包含前后两面的设计图
            </p> -->
          </div>
          <div class="tw-flex-1 tw-flex tw-flex-wrap tw-gap-8px tw-pt-5px">
            <el-checkbox-group v-model="item.designPictureSelectedList">
              <el-checkbox
                v-for="(url, i) in item.designPicture"
                :key="`${url}#${i}`"
                :label="`${url}#${i}`"
                :disabled="item.designPictureSelectedList.length === 2
                  && !item.designPictureSelectedList.includes(`${url}#${i}`)"
              >
                <custom-image
                  :src="url"
                  fit="cover"
                  class="tw-w-100px tw-h-100px tw-rounded-4px"
                />
              </el-checkbox>
            </el-checkbox-group>
          </div>
        </div>
      </div>
    </div>
    <template #footer>
      <span>
        共{{ innerPrintInfoDataList.length }}条
      </span>
      <el-button
        style="margin-left: 4px;"
        type="primary"
        :disabled="!innerPrintInfoDataList.length"
        @click="handleConfirm"
      >
        打印
      </el-button>
    </template>
  </el-dialog>
</template>

<script lang="ts">
import type { PropType } from 'vue';
import { watch, defineComponent, ref, computed } from 'vue';
import type { PrintItem } from './types';
import { ElMessage } from 'element-plus';
import { cloneDeep } from 'lodash-es';
import { IPrototypePrintBatchRes } from '../../style-manage/api/types';

type IListItem = IPrototypePrintBatchRes[0] & {
  designPictureSelectedList: string[];
};

export default defineComponent({
  name: 'PrintMultipleDialog',
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
    buttonItems: {
      type: Array as PropType<PrintItem[]>,
      default: () => [],
    },
    printInfoDataList: {
      type: Array as PropType<IPrototypePrintBatchRes>,
      default: () => [],
    },
  },
  emits: ['update:visible', 'print', 'close'],
  setup(props, { emit }) {
    const innerPrintInfoDataList = ref<IListItem[]>([]);
    const innerVisible = computed({
      get: () => props.visible,
      set: (value: boolean) => {
        if (value) {
          innerPrintInfoDataList.value = [];
        }
        emit('update:visible', value);
      },
    });

    watch(() => props.printInfoDataList, (newValue) => {
      innerPrintInfoDataList.value = (cloneDeep(newValue) || []).map(v => ({
        ...v,
        designPictureSelectedList: []
      }));
    });

    const handleItemDelete = (index: number) => {
      innerPrintInfoDataList.value.splice(index, 1);
    };

    const handleConfirm = () => {
      const noPassValidateList = innerPrintInfoDataList.value.filter((v) => {
        return !(v.designPictureSelectedList?.length > 0);
      });
      if (noPassValidateList.length) {
        document.querySelector(`#print-item-${noPassValidateList[0].designCode}`)?.scrollIntoView({
          behavior: 'smooth',
          block: 'center',
          inline: 'center',
        });
        const hint = noPassValidateList.reduce((prev, cur) => {
          return prev ? `${prev}、${cur.designCode}` : `${cur.designCode}`;
        }, '');
        ElMessage.warning(`SKC(${hint})：请选择 至少一张设计图`);
        return;
      }
      // 现在版本不需要客户图
      // innerPrintInfoDataList.value.forEach((v) => {
      //   v.customerPictureSelectedList = v.customerPictureSelected;
      // });
      emit('print', innerPrintInfoDataList.value);
      ElMessage.warning('通过');
    };
    return {
      innerVisible,
      innerPrintInfoDataList,
      handleItemDelete,
      handleConfirm,
    };
  },
});
</script>

<style scoped lang="scss">
@import "@/modules/design-center/styles/index.scss";
ul {
  display: flex;
  width: 100%;
  padding-top: 10px;
  justify-content: space-evenly;
  li {
    width: 40%;
    height: 100px;
    border-radius: 5px;
    text-align: center;
    line-height: 100px;
    font-size: 18px;
    letter-spacing: 4px;
    font-weight: bold;
    cursor: pointer;
    @extend %button-normal;
    &:hover {
      @extend %button-hover;
    }
  }
}
dl {
  margin-bottom: 15px;
  dt,
  dd {
    p {
      padding-bottom: 10px;
    }
  }
  dt {
    margin-right: 10px;
    p {
      font-weight: bold;
      text-align: center;
    }
  }
  dd {
    p {
      color: #f56c6c;
    }
  }
}
.print-container {
  display: flex;
  flex-direction: column;
  // justify-content: center;
  align-items: center;
  /* check-box */
  :deep(.el-checkbox.is-checked) {
    border-color: var(--el-color-primary);
  }
  :deep(.el-checkbox) {
    position: relative;
    width: 100px;
    height: 100px !important;
    box-sizing: content-box;
    border: 2px solid #fff;
    border-radius: 4px;
    // margin-right: 10px;
    .el-checkbox__label {
      display: block;
      padding: 0;
    }
    .el-image {
      display: block;
    }
    .el-checkbox__input {
      position: absolute;
      left: 0;
      top: 0;
    }
  }
  .print-item{
    width: 100%;
    .print-item-header{
      height: 40px;
      background-color: #F4F5F8;
      padding: 0 8px;
      span{
        font-weight: bold;
      }
      .delete-btn{
        color: #DB162E;
        cursor: pointer;
      }
    }
    // .print-item-body{
    //   margin-top: 6px;
    //   &-left{
    //     // padding-right: 4px;
    //     // width: 120px;
    //     // height: 78px;
    //     .hint{
    //       color: #DB162E; font-size: 12px; margin-top: 4px;
    //     }
    //   }
    // }
  }
}
</style>
