<template>
  <el-dialog
    v-model="selfVisible"
    title="纸样文件"
    width="40%"
    :close-on-click-modal="false"
    center
    append-to-body
  >
    <ul class="tw-m-0 tw-p-0 tw-list-none">
      <ImageViewer :list="useNormalizeDesignFilePictureUrl(data.designFilePictureList)">
        <template #default="{ view }">
          <li
            v-for="(item, index) in data.designFilePictureList"
            :key="index"
          >
            <el-button
              v-if="$has(permissionConfig.XZ)"
              type="text"
              @click="view(index)"
            >
              {{ item.designFileName }}
            </el-button>
            <span v-else>
              {{ item.designFileName }}
            </span>
          </li>
        </template>
      </ImageViewer>
      <li
        v-for="(item, index) in data.designFileLinkList"
        :key="index"
      >
        <el-button
          v-if="$has(permissionConfig.XZ)"
          type="text"
          @click="handleDownloadFile(item)"
        >
          {{ item.designFileName }}
        </el-button>
        <span v-else>
          {{ item.designFileName }}
        </span>
      </li>
    </ul>
  </el-dialog>
</template>

<script lang="ts">
import type { PropType } from 'vue';
import { defineComponent } from 'vue';
import useDialogVisible from '@/hooks-transfer/use-dialog-visible';
import { useNormalizeDesignFilePictureUrl } from '@/modules/resource-lib/composables/normalize-picture-url';
import type {
  IProdDesignFilePageListItem,
  IProdDesignFilePageDesignFileLinkListItem,
} from '@/modules/resource-lib/api/types';
import usePermissionConfig from '../hooks/use-permission-config';
import { exportByBlob } from '@/core/utils/file-download';

export const fileDialogVisible = (row: IProdDesignFilePageListItem) => {
  return row.designFilePictureList.length + row.designFileLinkList.length;
};

export const handleDownloadFile = (item: IProdDesignFilePageDesignFileLinkListItem) => {
  exportByBlob({
    url: item.designFileUrl,
    filename: item.designFileName,
    method: 'get',
  });
};

export default defineComponent({
  name: 'FileDialog',
  props: {
    data: {
      require: true,
      type: Object as PropType<IProdDesignFilePageListItem>,
      default: () => {},
    },
  },
  setup(props, { emit }) {
    const { visible: selfVisible } = useDialogVisible(props, emit);
    const permissionConfig = usePermissionConfig();
    return {
      selfVisible,
      useNormalizeDesignFilePictureUrl,
      permissionConfig,
      handleDownloadFile,
      fileDialogVisible,
    };
  },
});
</script>
<style scoped lang="scss">
//
</style>
