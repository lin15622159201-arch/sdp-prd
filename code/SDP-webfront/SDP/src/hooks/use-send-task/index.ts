import { DICTIONARY_KEY } from '@/constant/dictionary';
import { TASK_TYPE_ENUM } from '@/constant/task';
import { SYSTEM_ENUM } from '@/core/http/env';
import { useDictionary } from '@/hooks/use-dictionary';
import { computed } from 'vue';
import { useRouter } from 'vue-router';

export interface ISendTaskProps {
  /** 任务类型 */
  type: TASK_TYPE_ENUM;
  taskId: string;
  /** 选中图片列表 */
  imgs: string;
}
/**
 * 发送到其他任务时的 id 字段名枚举
 */
export enum SEND_TASK_ID_KEY_ENUM {
  /** 服装换色 */
  REPLACE_COLOR = 'byReplaceColorId',
  /** 姿势裂变 */
  POSTURE_FISSION = 'byPostureFissionId',
  /* AI设计 */
  AI_DESIGN = 'byAiDesignId',
  /** 风格化衍生 */
  STYLE_GEN = 'byStylishDerivationId',
  /** 花型上身 */
  PATTERN_APPLY = 'byFloralPatternId',
  /** 虚拟换衣 */
  VIRTUAL_TRYON = 'byVirtualChangeId',
  /** 灵感源 */
  INSPIRATION = 'byInspirationId',
}

/**
 * 任务发送到
 * @param taskSource 当前任务类型（TODO: 目前仅支持服装换色，其他在需要用到时自行添加）
 */
export const useSendTask = (taskSource: TASK_TYPE_ENUM) => {
  const router = useRouter();
  const { getDictionaryOptions } = useDictionary();
  const SEND_TASK_LIST = computed(() => getDictionaryOptions(DICTIONARY_KEY.AIFUNCTIONCALL_CONFIGURATION).find(v => v.value === taskSource)?.attributes || []);

  // 发送到其他任务的 id 字段名
  const sourceIdKeyMap: Partial<Record<TASK_TYPE_ENUM, string>> = {
    [TASK_TYPE_ENUM.REPLACE_COLOR]: SEND_TASK_ID_KEY_ENUM.REPLACE_COLOR,
    [TASK_TYPE_ENUM.POSE_FISSION]: SEND_TASK_ID_KEY_ENUM.POSTURE_FISSION,
    [TASK_TYPE_ENUM.AI_DESIGN]: SEND_TASK_ID_KEY_ENUM.AI_DESIGN,
    [TASK_TYPE_ENUM.STYLE_GEN]: SEND_TASK_ID_KEY_ENUM.STYLE_GEN,
    [TASK_TYPE_ENUM.PATTERN_APPLY]: SEND_TASK_ID_KEY_ENUM.PATTERN_APPLY,
    [TASK_TYPE_ENUM.VIRTUAL_TRY_ON]: SEND_TASK_ID_KEY_ENUM.VIRTUAL_TRYON,
  };
  const sourceIdKey = sourceIdKeyMap[taskSource];

  const sendTask = ({ taskId, imgs, type }: ISendTaskProps) => {
    if (!sourceIdKey) {
      console.error('未找到发送任务时的 id 字段名');
      return;
    }
    const commonQuery = {
      [sourceIdKey]: taskId,
      imgs,
      taskSource,
    };

    if (type === TASK_TYPE_ENUM.VIRTUAL_TRY_ON) {
      // 风格化衍生发送到虚拟换衣时，使用 selectId 字段（兼容就代码，新页面建议统一用imgs）
      const imgsKey = taskSource === TASK_TYPE_ENUM.STYLE_GEN ? 'selectId' : 'imgs';
      const routeData = router.resolve({
        name: 'Webview',
        query: {
          domain: SYSTEM_ENUM.FASHION_DESIGN,
          path: '/#/inspiration-center/virtual-change/create',
          activeMenu: 'Webview?domain=fashion-design&path=/#/inspiration-center/virtual-change/list',
          query: JSON.stringify({ ...commonQuery, [imgsKey]: imgs })
        }
      });
      window.open(routeData.href, '_self');
      return;
    }

    if (type.toLowerCase() === TASK_TYPE_ENUM.POSE_FISSION) {
      // 风格化衍生发送到姿势裂变时，使用 selectId 字段（兼容就代码，新页面建议统一用imgs）
      const imgsKey = taskSource === TASK_TYPE_ENUM.STYLE_GEN ? 'selectId' : 'imgs';
      router.push({
        name: 'PostureFissionAdd',
        query: { ...commonQuery, [imgsKey]: imgs }
      });
      return;
    }

    if (type === TASK_TYPE_ENUM.IMAGE_REPAIR) {
      // 【风格化衍生】【姿势裂变】发送到【图片修复】时，使用 selectId 字段（兼容就代码，新页面建议统一用imgs）
      const imgsKey = [TASK_TYPE_ENUM.STYLE_GEN, TASK_TYPE_ENUM.POSE_FISSION].includes(taskSource) ? 'selectId' : 'imgs';
      router.push({
        name: 'ImageRestorationAdd',
        query: { ...commonQuery, [imgsKey]: imgs }
      });
      return;
    }

    if (type === TASK_TYPE_ENUM.PATTERN_APPLY) {
      const routeData = router.resolve({
        name: 'Webview',
        query: {
          domain: SYSTEM_ENUM.FASHION_DESIGN,
          path: '/#/digital-print/pattern-try-on/create',
          activeMenu: 'Webview?domain=fashion-design&path=/#/digital-print/pattern-try-on/list',
          query: JSON.stringify(commonQuery)
        }
      });
      window.open(routeData.href, '_self');
      return;
    }

    if (type === TASK_TYPE_ENUM.REPLACE_COLOR) {
      router.push({
        name: 'InspirationCenterClothColorReplacerCreate',
        query: commonQuery
      });
    }
  };

  return {
    sendTask,
    SEND_TASK_LIST
  };
};
