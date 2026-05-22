import { computed, ref, nextTick, onMounted, createApp } from 'vue';
import ElementPlus from 'element-plus';
// import { prototypeDisassemblyTaskCancelApi, prototypeDisassemblyTaskRestartApi } from '../api/index';
// import { PrototypeDisassemblyTaskCancelReq, PrototypeDisassemblyTaskRestartReq } from '../api/types';
import { fetchSizeTempBatchCreate } from '@/modules/base-config/size-template/api';
import { TABELDATA } from '@/modules/goods-manage/views/listing-edit/hooks/use-form';

/**
 * 存为模板
 */
export const useTempDialog = (currentCheckList: TABELDATA, detailData: any, formItem: any) => {
  return new Promise((resolve) => {
    console.log('currentCheckList', currentCheckList);
    // const { detailData, form: formItem } = useForm();
    const container = document.createElement('div');
    container.id = 'category-dialog-container';
    document.body.appendChild(container);
    const app = createApp({
      setup() {
        const formRef = ref<any>();
        const form = ref<any>({
          templateName: '',
        });
        const visible = ref(true);
        const handleChildData = () => {
          app.unmount();
          container.remove();
        };
        const confirmOrderToDesigner = async () => {
          await formRef.value!.validate();
          // const sizeReqs = [];
          // currentCheckList.tableData?.filter(v => v.size !== '挡位')
          const sizeReqsItem: any = [];
          (currentCheckList?.tableData ?? []).forEach((s: any, i: number) => {
            if (s.size !== '档差') {
              sizeReqsItem.push({
                size: s.size,
                values: (currentCheckList.sizeParts || []).filter((v1: any) => v1.checked).map((v2: any) => {
                  return {
                    part: v2.field,
                    partName: v2.label,
                    value: s[v2.field],
                    diff: currentCheckList?.tableData?.[i + 1] ? currentCheckList.tableData[i + 1][v2.field] : 0,
                  };
                }),
              });
            }
          });
          await fetchSizeTempBatchCreate([
            {
              catId: formItem.catId,
              catName: formItem.catName,
              groupCode: detailData?.sizeStandardCode ?? '',
              groupName: detailData?.sizeStandardName ?? '',
              parts: currentCheckList.sizeParts?.filter(v => v.checked)?.map(v1 => (v1.field || '')) ?? [],
              sizeReqs: sizeReqsItem,
              sizes: currentCheckList.tableData?.filter((v: { size: string; }) => v.size !== '档差')?.map((v1: { size: string; }) => (v1.size || '')) ?? [],
              templateName: form.value.templateName,
            }
          ]);
          resolve('成功');
          app.unmount();
          container.remove();
        };

        return () => (
          <div>
            <el-dialog
              v-model={visible}
              width='500px'
              title='存为模板'
              close-on-click-modal={false}
              append-to-body
              onClose={() => {
                handleChildData();
              }}
            >
              <el-form
                ref={formRef}
                label-width='95px'
                model={form}
              >
                <el-form-item
                  prop='templateName'
                  label='模板名称'
                  rules={[
                    { required: true, message: '请输入模板名称', trigger: 'change' },
                  ]}
                >
                  <el-input
                    style='width: 100%;'
                    v-model={form.value.templateName}
                  />
                </el-form-item>
              </el-form>
              <div style='text-align: right;'>
                <el-button
                  onClick={() => {
                    handleChildData();
                  }}
                >
                  取 消
                </el-button>
                <el-button
                  type='primary'
                  onClick={() => {
                    confirmOrderToDesigner();
                  }}
                >
                  确 定
                </el-button>
              </div>
            </el-dialog>
          </div>
        );
      },
    });
    app.use(ElementPlus);
    app.mount(container);
  });
};
