import { ITableColumnsItem, ScTable } from '@toy/business-components';
import { IReplaceColorTaskPageItem } from '../../api/type';
import { createHandler } from '@/core/utils/template';
import { filters } from '@/core/plugins/filter';
import { useRouter } from 'vue-router';
import { TASK_STATUS_LIST, TASK_TYPE_ENUM } from '@/constant/task';
import { ElMessage, ElMessageBox } from 'element-plus';
import { SYSTEM_ENUM } from '@/core/http/env';
import { usePermissionCheck } from './use-permission-check';
import { fetchReplaceColorTaskDeleteBatch, fetchReplaceColorTaskStopBatch } from '../../api';
import { computed, ref } from 'vue';
import { useDictionary } from '@/hooks/use-dictionary';
import { DICTIONARY_KEY } from '@/constant/dictionary';

interface IUseTableProps {
  handleComparePreview: (data: IReplaceColorTaskPageItem, index: number) => void;
  handleSearch: (pageNum?: number) => void;
}
export const useTable = ({ handleComparePreview, handleSearch }: IUseTableProps) => {
  const router = useRouter();
  const tableRef = ref<InstanceType<typeof ScTable>>();
  const { getDictionaryOptions } = useDictionary();
  const TASK_SOURCE_LIST = computed(() => getDictionaryOptions(DICTIONARY_KEY.AIFUNCTIONCALL_CONFIGURATION));
  const { canTaskCopy, canTaskRemove, canTaskStop, isMe } = usePermissionCheck();

  const clearSelection = () => {
    tableRef.value?.clearSelection();
  };

  const renderTaskCode = (item: IReplaceColorTaskPageItem) => {
    const status = TASK_STATUS_LIST.find(i => i.value === item.taskStatus);
    return (
      <>
        <p>
          <el-link
            onClick={() => router.push({
              name: 'InspirationCenterClothColorReplacerDetail',
              params: { id: item.taskId },
            })}
          >
            {item.taskCode}
          </el-link>
        </p>
        {status && <el-tag type={status.style}>{status.label}</el-tag>}
      </>
    );
  };

  const renderImage = (src: string) => {
    return <custom-image src={filters.ossUrl(src)} class='tw-w-80px tw-h-80px' fit='cover' previewSrcList={[src]} />;
  };

  const renderGeneratedImages = (row: IReplaceColorTaskPageItem, urls: string[], isRef = false) => {
    return (
      <div class='tw-flex tw-gap-1'>
        {urls.slice(0, 4).map((src, index) => (
          <custom-image
            class='tw-w-80px tw-h-80px tw-cursor-pointer'
            src={filters.ossUrl(src)}
            initialIndex={index}
            fit='contain'
            previewSrcList={isRef ? urls : []}
            onClick={() => !isRef && handleComparePreview(row, index)}
          />
        ))}
      </div>
    );
  };

  const renderCreateInfo = (row: IReplaceColorTaskPageItem) => {
    return (
      <>
        <p>
          创建人：
          {row.creatorName}
        </p>
        <p>
          创建时间：
          {filters.formatTime(row.createdTime)}
        </p>
        <p>
          生成时间：
          {filters.formatTime(row.replaceColorGeneratedTime)}
        </p>
        <p>
          任务来源：
          {TASK_SOURCE_LIST.value.find(i => i.value === row.taskSource)?.label || row.taskSource || '用户上传'}
        </p>
      </>
    );
  };

  const handleSourceTask = (item: IReplaceColorTaskPageItem) => {
    let routeName = '';
    const params: Record<string, string | number> = {};
    let query: Record<string, string | number> = {};
    switch (item.taskSource) {
      case TASK_TYPE_ENUM.AI_DESIGN:
        routeName = 'Webview';
        query = {
          domain: SYSTEM_ENUM.FASHION_DESIGN,
          path: `/#/inspiration-center/ai-design-task/detail/${item.sourceBusinessId}`,
          activeMenu: 'Webview?domain=fashion-design&path=/#/inspiration-center/ai-design-task/list',
        };
        break;
      case TASK_TYPE_ENUM.STYLE_GEN:
        routeName = 'StylishDerivedTasksDetail';
        query.taskId = item.sourceBusinessId;
        break;
      case TASK_TYPE_ENUM.PATTERN_APPLY:
        routeName = 'Webview';
        query = {
          domain: SYSTEM_ENUM.FASHION_DESIGN,
          path: `/#/digital-print/pattern-try-on/detail/${item.sourceBusinessId}`,
          activeMenu: 'Webview?domain=fashion-design&path=/#/digital-print/pattern-try-on/list',
        };
        break;
      case TASK_TYPE_ENUM.VIRTUAL_TRY_ON:
        routeName = 'Webview';
        query = {
          domain: SYSTEM_ENUM.FASHION_DESIGN,
          path: '/#/inspiration-center/virtual-change/detail',
          activeMenu: 'Webview?domain=fashion-design&path=/#/inspiration-center/virtual-change/list',
          query: JSON.stringify({ taskId: item.sourceBusinessId }),
        };
        break;
      case TASK_TYPE_ENUM.POSE_FISSION:
        routeName = 'PostureFissionDetail';
        query.taskId = item.sourceBusinessId;
        break;
      default:
        break;
    }
    const url = router.resolve({ name: routeName, query, params })?.href;
    if (!routeName || !url) {
      ElMessage.error('跳转页面不存在');
      return;
    }
    window.open(url, '_blank');
  };

  const handleCopy = (item: IReplaceColorTaskPageItem) => {
    const routerObj = router.resolve({
      name: 'InspirationCenterClothColorReplacerCreate',
      params: { copyId: item.taskId },
    });
    window.open(routerObj.href, '_blank');
  };

  const handleStop = (item: IReplaceColorTaskPageItem) => {
    ElMessageBox.confirm('确定中止该任务吗？', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
    }).then(async () => {
      await fetchReplaceColorTaskStopBatch([item.taskId]);
      handleSearch();
      ElMessage.success('中止成功');
    });
  };

  const handleRemove = (item: IReplaceColorTaskPageItem) => {
    ElMessageBox.confirm('确定删除该任务吗？', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
    }).then(async () => {
      await fetchReplaceColorTaskDeleteBatch([item.taskId]);
      handleSearch();
      ElMessage.success('删除成功');
    });
  };

  const columns: ITableColumnsItem<IReplaceColorTaskPageItem>[] = [
    {
      type: 'selection',
      width: 40,
      align: 'center',
      reserveSelection: true,
      selectable: row => isMe(row.creatorId)
    },
    { label: '任务编号', render: renderTaskCode, minWidth: 120 },
    { label: '参考图', render: row => renderGeneratedImages(row, row.replaceColorImgUrls, true), width: 350 },
    { label: '换色图案', render: row => renderImage(row.targetColorUrl), width: 100 },
    { label: '生成图', render: row => renderGeneratedImages(row, row.replaceColorGeneratedPicUrls), width: 350 },
    { label: '品类', prop: 'categoryName' },
    {
      label: '关联任务',
      render: row => <el-link onClick={() => handleSourceTask(row)}>{row.sourceBusinessCode}</el-link>,
      width: 100,
    },
    { label: '创建信息', render: renderCreateInfo, width: 200 },
    {
      label: '操作',
      fixed: 'right',
      width: 100,
      render: row => createHandler(row, [
        { buttonText: '复制', onClick: handleCopy, isShow: canTaskCopy },
        { buttonText: '中止', buttonProps: { type: 'danger' }, onClick: handleStop, isShow: canTaskStop },
        { buttonText: '删除', buttonProps: { type: 'danger' }, onClick: handleRemove, isShow: canTaskRemove },
      ]),
    },
  ];

  return {
    tableRef,
    columns,
    clearSelection
  };
};
