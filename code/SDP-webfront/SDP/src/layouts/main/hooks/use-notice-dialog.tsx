import { getNoticeDialogList, submitNoticeLog } from '@/api/global';
import { IGetNoticeDialogListRes } from '@/api/global/type';
import { ElMessageBox } from 'element-plus';
import { watch } from 'vue';
import { useRoute } from 'vue-router';

export const useNoticeDialog = () => {
  const $route = useRoute();
  const tasksMap = new Map<string, IGetNoticeDialogListRes[0]>();
  watch(() => $route.name, (val) => {
    loop(val as string);
  });
  // 找到当前路由是否有需要展示的弹窗 并循环展示
  const loop = async (routeName: string) => {
    const record = [...tasksMap.values()]
      .filter(v => v.triggerPath.split(',').includes(routeName));
    while (record.length > 0) {
      const { content, title, configId } = record.shift()!;
      tasksMap.delete(configId);
      submitNoticeLog({ configId });
      try {
        // eslint-disable-next-line no-await-in-loop
        await ElMessageBox.alert(
          `<div class='clear_width_restrict tw-max-h-80vh tw-overflow-y-auto'>
            <div v-html=${content} class='editor-content-view' />
          </div>`,
          title,
          {
            dangerouslyUseHTMLString: true,
            confirmButtonText: '知道了'
          }
        );
      } catch (error) {
        console.log('点击了关闭');
      }
    }
  };
  // 初始化获取弹窗数据
  const getData = async () => {
    const { data } = await getNoticeDialogList();
    if (!data) return;
    data.forEach((v) => {
      tasksMap.set(v.configId, v);
    });
    loop($route.name as string);
  };
  getData();
};
