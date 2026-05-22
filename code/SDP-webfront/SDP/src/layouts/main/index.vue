<template>
  <sc-app-layout
    :userConfig="userConfig"
    :currentEnv="(currentEnv as any)"
    :systemName="nameZh"
    :menus="menus"
    :active-menu-id="activeMenuId"
    :logo-url="IconLogo"
    :authMenuList="authMenuList"
    :breadcrumbList="breadcrumbList"
  >
    <template #tools>
      <el-tooltip
        effect="dark"
        content="全屏"
        placement="bottom"
      >
        <div class="tw-flex tw-gap-8px tw-items-center">
          <span class="action action-fullscreen">
            <fullscreen />
          </span>
          <hints />
          <InStockSelectionUploader />
        </div>
      </el-tooltip>
    </template>
  </sc-app-layout>
</template>
<script lang="ts" setup>
import { ScAppLayout } from '@toy/business-components';
// import { useNoticeDialog } from './hooks/use-notice-dialog';
import { currentEnv } from '@/core/http/env';
import { nameZh } from '@root/package.json';
import { useMenus } from './hooks/use-menus';
import { useUserConfig } from './hooks/use-user-config';
import IconLogo from '@/assets/logo.png';
import Fullscreen from './components/fullscreen/index.vue';
import Hints from './components/hints/index.vue';
import { useBreadcrumbList } from './hooks/use-breadcrumb';
import InStockSelectionUploader from './components/in-stock-selection-uploader';

const { userConfig } = useUserConfig();
// useNoticeDialog();
const { menus, activeMenuId, authMenuList } = useMenus();
const { breadcrumbList } = useBreadcrumbList();
</script>
