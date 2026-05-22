import { IProductPageResItem } from '@/modules/goods-manage/api/product/type';
import { ref, Ref } from 'vue';

interface ITableSpanMap {
  [styleIndex: number | string]: {
    rowspan: number; // 该 styleCode 需要合并的行数
    startIndex: number; // 该 styleCode 在表格中的起始行索引
  };
}

/**
 * 合并表格单元格的 Hook
 */
export const useTableSpan = (columns: Ref<any[]>) => {
  const tableSpanMap: ITableSpanMap = {};
  // 用于强制刷新表格，避免重新合并单元格后渲染异常
  const tableKey = ref(0);

  /**
   * 表格单元格合并方法
   * @param row 当前行数据
   * @param column 当前列数据
   * @param rowIndex 当前行索引
   * @param columnIndex 当前列索引
   */
  const tableSpanMethod = ({ row, rowIndex, columnIndex }: {
    row: IProductPageResItem & { styleIndex: number; };
    rowIndex: number;
    columnIndex: number;
  }) => {
    // 只合并前三列和最后一列操作列
    if (columnIndex < 4 || columnIndex === columns.value.length - 1) {
      const { styleIndex } = row;
      const spanInfo = tableSpanMap[styleIndex];

      if (!spanInfo) return { rowspan: 1, colspan: 1 };

      // 如果是该 styleIndex 的第一行，显示合并后的单元格
      if (rowIndex === spanInfo.startIndex) {
        return {
          rowspan: spanInfo.rowspan,
          colspan: 1,
        };
      } else {
        // 否则隐藏该单元格
        return {
          rowspan: 0,
          colspan: 0,
        };
      }
    }

    // 其他列不合并
    return { rowspan: 1, colspan: 1 };
  };

  /**
   * 处理表格数据，展开 skc 并计算合并信息
   */
  const spanTableData = (data: IProductPageResItem[]) => {
    tableKey.value += 1;
    // 清空之前的合并信息
    Object.keys(tableSpanMap).forEach(key => delete tableSpanMap[key]);

    // 将每个商品的 skc 拆开成独立行
    const result: (IProductPageResItem & { styleIndex: number; })[] = [];
    let currentIndex = 0;

    data.forEach((item, styleIndex) => {
      const skcCount = item.skcs?.length || 0;

      // 记录该 styleIndex 的合并信息
      tableSpanMap[styleIndex] = {
        rowspan: skcCount,
        startIndex: currentIndex,
      };

      // 展开 skc 数据
      if (skcCount > 0) {
        item.skcs.forEach((skc) => {
          result.push({ ...item, ...skc, styleIndex });
          currentIndex += 1;
        });
      } else {
        // 如果没有 skc，也要保留该行
        result.push({ ...item, styleIndex });
        currentIndex += 1;
      }
    });

    return result;
  };

  return {
    tableSpanMap,
    tableSpanMethod,
    spanTableData,
    tableKey,
  };
};
