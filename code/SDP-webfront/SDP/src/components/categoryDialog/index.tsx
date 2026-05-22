
import { createApp } from 'vue';
import { ISCategoryReq, ChiInter } from './type';
import CategoryDialog from './category-dialog.vue';

export default function categoryDialog(list: ISCategoryReq[], categoryCode: string | undefined, categoryName: string) {
  const childList: ISCategoryReq[] = [];
  list.forEach((item1: ISCategoryReq) => {
    item1?.children?.forEach((item2: ChiInter) => {
      item2?.children?.forEach((item3: ChiInter) => {
        childList.push(item3);
      });
    });
  });
  if (categoryName) {
    categoryCode = childList.filter((v: ChiInter) => v.value === categoryName)?.[0]?.code;
  }

  return new Promise((res, rej) => {
    // 创建临时容器元素
    const container = document.createElement('div');
    container.id = 'category-dialog-container';
    document.body.appendChild(container);
    const app = createApp({
      components: {
        CategoryDialog,
      },
      data() {
        return {
          show: true,
        };
      },
      methods: {
        handleChildData(data: ISCategoryReq) {
          // 接收子组件传递的数据
          if (data) {
            res(data);
          }
          app.unmount(); // 销毁Vue应用
          container.remove(); // 移除DOM元素
        },
      },
      render() {
        return (
          <div>
            <CategoryDialog
              list={list}
              categoryCode={categoryCode}
              childList={childList}
              onConfirm={(data: ISCategoryReq) => {
                this.handleChildData(data);
              }}
            />
          </div>
        );
      },
    });
    app.mount(container);
  });
}
