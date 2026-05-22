<script lang="tsx">
import type { SetupContext, PropType } from 'vue';
import { defineComponent } from 'vue';
import ResponsiveCol from './responsive-col.vue';
import { IElCol, IElRow } from '@/types';
// import type { IElRow, IElCol } from '@/types/index.d';

interface RowConfig {
  props?: IElRow;
  [key: string]: any;
}
type ElCol = Partial<IElCol>;
interface ColConfig {
  props?: ElCol | null;
  [key: string]: any;
}

export default defineComponent({
  name: 'ResponsiveRow',
  props: {
    row: {
      type: Object as PropType<RowConfig>,
    },
    col: {
      type: Object as PropType<ColConfig>,
    },
  },
  setup(props, { slots }: SetupContext) {
    return () => {
      const { col, row } = props;
      const childList = (slots.default && slots.default()) || [];

      // 处理默认参数
      const genCol = { ...(col || { props: null }) };
      const defaultColProps = { xs: 24, sm: 12, md: 8, lg: 8, xl: 6 } as IElCol;
      genCol.props = genCol.props || defaultColProps;

      type TChild = typeof childList;

      const colChildList = [] as TChild;
      const getColChild = (_childList: TChild) => {
        if (!Array.isArray(_childList)) return;
        _childList.forEach((child) => {
          const _type = child?.type as any;
          if (_type?.name === 'ElCol') {
            colChildList.push(child);
            return;
          }

          /**
           * 有children还是要处理
           */
          if (!_type?.name && !Array.isArray(child?.children)) {
            /**
             * _type在生产模式下，v-if的类型为 Symbol()
             * ps：若想控制显隐暂时先使用v-if，不建议使用v-show
             *    因为在dirs（数组）中没有能判断具体指令名称的属性。
             */
            const vNodeType = Object(_type).toString();
            if (vNodeType === 'Symbol(Comment)' || vNodeType === 'Symbol()') {
              return;
            }
          }
          if (Array.isArray(child?.children) && child?.children?.length) {
            getColChild(child.children as TChild);
            return;
          }
          // 对特定el-col自定义，传入col
          // 例：<el-form-item :col="{ xs: 24, sm: 24, md: 24, lg: 24, xl: 24 }">
          child?.props?.col && (genCol.props = child.props?.col);

          colChildList.push(
            (
              <ResponsiveCol
                {...genCol.props}
                hiddenEmptyContent={!!child?.props?.hiddenEmptyContent}
              >
                { child }
              </ResponsiveCol>
            ),
          );
        });
      };
      getColChild(childList);
      return (
        <el-row {...(row || {})}>
          {
            colChildList
          }
        </el-row>
      );
    };
  },
});
</script>
