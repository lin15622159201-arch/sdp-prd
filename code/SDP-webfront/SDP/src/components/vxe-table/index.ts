// import 'vxe-table/lib/style.css';
import { getCurrentInstance, type App } from 'vue';
import XEUtils from 'xe-utils';
import zhCN from 'vxe-table/es/locale/lang/zh-CN';
import VXETablePluginExportXLSX from 'vxe-table-plugin-export-xlsx';
import {
  VXETable,
  Header,
  Column,
  Table,
  Colgroup,
  Export,
  Modal,
  Icon,
} from 'vxe-table';

/**
 * https://vxetable.cn/#/table/start/install
 */
VXETable.setup({
  i18n: (key, args) => XEUtils.toFormatString(XEUtils.get(zhCN, key), args),
});
VXETable.use(VXETablePluginExportXLSX);

function install(app: App) {
  app
    .use(Header)
    .use(Column)
    .use(Colgroup)
    .use(Export)
    .use(Modal)
    .use(Icon)
    .use(Table);

  // 给 vue 实例挂载内部对象，例如：
  app.config.globalProperties.$XModal = VXETable.modal;
  app.config.globalProperties.$XPrint = VXETable.print;
  app.config.globalProperties.$XSaveFile = VXETable.saveFile;
  app.config.globalProperties.$XReadFile = VXETable.readFile;
}

export default {
  install,
};

export const useInstall = () => {
  const instance = getCurrentInstance()!;
  install(instance.appContext.app);
};
