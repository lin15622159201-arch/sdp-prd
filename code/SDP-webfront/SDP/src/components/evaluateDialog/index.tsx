import { createApp } from 'vue';
import EvaluateDialog from './evaluate-dialog.vue';
import ElementPlus from 'element-plus';
// import 'element-plus/dist/index.css';
import { ISCategoryReq, ChiInter } from './type';

export default function categoryDialog(details: any) {
  return new Promise((res, rej) => {
    // 创建临时容器元素
    const container = document.createElement('div');
    
    container.id = 'category-dialog-container';
    document.body.appendChild(container);
    const app = createApp({
      components: {
        EvaluateDialog,
      },
      data() {
        return {
          show: true,
        };
      },
      methods: {
        handleChildData(data: ISCategoryReq) {
          res('确认');
          app.unmount(); // 销毁Vue应用
          container.remove(); // 移除DOM元素
        },
        cancel() {
          rej('关闭弹框');
          app.unmount(); // 销毁Vue应用
          container.remove(); // 移除DOM元素
        },
      },
      render() {
        return (
          <div>
            <EvaluateDialog
              details={{
                taskId: details.taskId,
                groupNum: details?.group?.groupNum,
                origin: details?.origin,
              }}
              onConfirm={(data: ISCategoryReq) => {
                this.handleChildData(data);
              }}
              onCancel={() => {
                this.cancel();
              }}
            />
          </div>
        );
      },
    });
    // 在子应用中注册 ElementPlus
    app.use(ElementPlus);
    app.mount(container);
  });
}
