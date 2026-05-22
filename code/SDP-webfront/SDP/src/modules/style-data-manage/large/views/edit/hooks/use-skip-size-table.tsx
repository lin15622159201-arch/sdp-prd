import { useTableColumns } from '@toy/business-components';
import { Plus, Minus } from '@element-plus/icons-vue';
import { ref, computed, Ref, shallowRef } from 'vue';
import {
  IStyleInfoSubmitReqStyleDetailSizeReqListItemSkipSizeQuotietyListItem as ISize,
} from '../../../api/types';
import { ElMessage } from 'element-plus';
import { getHoppingRulesApi } from '../../../api/index';
import { ISizeItem } from './types';

interface IError extends Error {
  type?: string;
}

interface IParams {
  readonlyFormData: Ref<any>;
  selectSizeItem: Ref<ISizeItem>;
  submitCb: () => void;
}

export const useSkipSizeTable = ({ readonlyFormData, selectSizeItem, submitCb }: IParams) => {
  const isEdit = ref(false);
  // [放码规则]默认数据
  const defaultItem = Object.freeze({
    startSize: '',
    endSize: '',
  });
  // [放码规则]表格数据
  const skipSizeTableList = ref<any[]>([{ ...defaultItem }]);

  // [放码规则]添加一行
  const handleAddSize = () => {
    skipSizeTableList.value.push({ ...defaultItem });
  };

  // [放码规则]删除一行
  const handleRemoveSize = (index: number) => {
    skipSizeTableList.value.splice(index, 1);
  };

  const sizeMap = computed(() => {
    const dataMap = Object.create(null) as Record<string, number>;
    (selectSizeItem.value?.children || []).forEach((item, i) => {
      dataMap[item.value] = i;
    });

    return dataMap;
  });

  const ERR_TYPE = 'data-checked';
  const getSkipSizeData = () => {
    const getErr = (msg = '') => {
      const err = new Error(msg) as IError;
      Object.assign(err, {
        type: ERR_TYPE,
      });
      return err;
    };
    // 数据集
    const dataList: ISize[] = [];

    skipSizeTableList.value.forEach((item, i) => {
      const getMsg = (msg = '') => {
        return `跳码规则 第${1 + i}条：${msg}`;
      };
      const { startSize, endSize } = item;
      if (!startSize || !endSize) {
        throw getErr(
          getMsg('请选择完成尺码'),
        );
      }
      // 上一条数据
      const lastTimeItem = i ? skipSizeTableList.value[i - 1] : null;
      // 获取下标
      const startIndex = sizeMap.value[startSize];
      const endIndex = sizeMap.value[endSize];

      if (startIndex > endIndex) {
        throw getErr(
          getMsg('右侧尺码应大于等于左侧尺码'),
        );
      }
      if (lastTimeItem && lastTimeItem?.endSize !== startSize) {
        throw getErr(
          getMsg('左侧尺码应等于上一行右侧尺码'),
        );
      }

      if (startIndex === endIndex && skipSizeTableList.value.length >= 1) {
        throw getErr(
          getMsg('该跳码规则相同，不允许存在其他规则'),
        );
      }

      dataList.push({
        size: `${startSize}-${endSize}`,
        data: '',
      });
    });

    return dataList;
  };

  const skipSizeData = ref<any>([]); // 跳码数据

  const submit = () => {
    try {
      const dataList = getSkipSizeData();
      skipSizeData.value = dataList;
      submitCb();
    } catch (err) {
      const e = err as IError;
      if (e.type === ERR_TYPE) {
        ElMessage.warning(e.message);
      }
      throw err;
    }
  };

  const handleSubmit = () => {
    if (isEdit.value) {
      submit();
    }
    isEdit.value = !isEdit.value;
  };

  // 设置跳码规则数据
  const setSkipSizeQuotiety = (skipSizeQuotiety: string[]) => {
    skipSizeTableList.value = !skipSizeQuotiety.length ? [{ ...defaultItem }] : [];

    skipSizeQuotiety.forEach((sizes) => {
      const [startSize, endSize] = sizes.split('-');
      skipSizeTableList.value.push({
        startSize,
        endSize,
      });
    });
  };

  const hoppingRulesMap = shallowRef(new Map<string, string[][]>());
  const handleGetHoppingRules = async () => {
    const { sizeStandardCode } = readonlyFormData.value;
    if (!sizeStandardCode) {
      return [
        { ...defaultItem },
      ];
    }
    const toHoppingData = (hoppingList: string[][]) => {
      return hoppingList.map(([startSize = '', endSize = '']) => {
        return {
          startSize,
          endSize,
        };
      });
    };

    if (hoppingRulesMap.value.has(sizeStandardCode)) {
      return toHoppingData(hoppingRulesMap.value.get(sizeStandardCode)!);
    }

    try {
      const { data } = await getHoppingRulesApi({
        enabled: '1',
        standardSizeCode: sizeStandardCode,
      });
      const item = data.filter(i => !!i.hoppingRules)[0];

      if (item) {
        const hoppingRulesList = item.hoppingRules.split(',').map(v => v.split('-'));
        hoppingRulesMap.value.set(sizeStandardCode, hoppingRulesList);
        return toHoppingData(hoppingRulesList);
      }
      return [
        { ...defaultItem },
      ];
    } catch (err) {
      // errorHandler.handleError(err);
      return [
        { ...defaultItem },
      ];
    }
  };

  const setSkipSizeData = async () => {
    skipSizeTableList.value = await handleGetHoppingRules();
  };

  const hasListData = () => {
    return skipSizeTableList.value.filter(i => !!i.endSize && !!i.startSize).length > 0;
  };

  const { columns } = useTableColumns<any>(() => {
    return [
      {
        label: '操作',
        minWidth: '110',
        align: 'center',
        render(row, column, index) {
          return (
            <>
              <el-button
                text
                type='primary'
                disabled={!isEdit.value}
                onClick={() => handleAddSize()}
              >
                <el-icon><Plus /></el-icon>
              </el-button>
              {skipSizeTableList.value.length > 1 && (
                <el-button
                  text
                  type='danger'
                  disabled={!isEdit.value}
                  onClick={() => handleRemoveSize(index)}
                >
                  <el-icon><Minus /></el-icon>
                </el-button>
              )}
            </>
          );
        }
      },
      {
        minWidth: '300',
        renderHeader: () => {
          return (
            <div class={['tw-flex', 'tw-flex-justify-between']}>
              <span>放码规则</span>
              <el-button
                text
                type={isEdit.value ? 'primary' : 'warning'}
                onClick={() => handleSubmit()}
              >
                {isEdit.value ? '保存' : '修改'}
              </el-button>
            </div>
          );
        },
        render: (row) => {
          return (
            <div class='tw-flex tw-items-center'>
              <el-select
                v-model={row.startSize}
                placeholder='请选择放码规则'
                class='tw-w[150px]'
                disabled={!isEdit.value}
              >
                {(selectSizeItem.value?.children || []).map((it) => {
                  return (
                    <el-option
                      label={it.label}
                      value={it.value}
                    />
                  );
                })}
              </el-select>
              <div class='tw-px[5px]'>
                -
              </div>
              <el-select
                v-model={row.endSize}
                placeholder='请选择放码规则'
                class='tw-w[150px]'
                disabled={!isEdit.value}
              >
                {(selectSizeItem.value?.children || []).map((it) => {
                  return (
                    <el-option
                      label={it.label}
                      value={it.value}
                    />
                  );
                })}
              </el-select>
            </div>
          );
        }
      }
    ];
  });
  return {
    tableColumns: columns,
    skipSizeTableList,
    skipSizeData,
    setSkipSizeQuotiety,
    setSkipSizeData,
    hasListData,
    getSkipSizeData
  };
};
