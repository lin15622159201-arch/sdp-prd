import { computed, Ref, ref, watch } from 'vue';
import { REPLACE_REGION_ENUM } from '../../constant';
import { TASK_STATUS_ENUM } from '@/constant/task';
import { fetchPatternClothSegCreate, fetchPatternClothSegDetail } from '@/api/base-business/pattern-cloth-seg';

interface IProps {
  src: Ref<string | undefined>;
  replaceRegion: Ref<REPLACE_REGION_ENUM | undefined>;
  /** 是否已有框选区域 */
  disabled: Ref<boolean>;
}
export const useRegionMask = ({ src, replaceRegion, disabled }: IProps) => {
  interface IMaskRegionData {
    maskUrl?: string;
    // patternUrl?: string;
    maskTaskId?: string;
    refImgUrl?: string;
    region?: REPLACE_REGION_ENUM;
  }
  interface IMaskUrlMap {
    [url: string]: {
      [region: string]: IMaskRegionData;
    };
  }
  const garmImgMaskUrlMap = ref<IMaskUrlMap>({});
  const loading = ref(false);
  const maskUrl = computed(() => {
    if (!src.value || !replaceRegion.value) return '';
    return garmImgMaskUrlMap.value[src.value]?.[replaceRegion.value]?.maskUrl;
  });
  const regionMaskErrorText = ref('');

  // 检查mask图是否为空（即是否全为黑色）
  const checkMaskEmpty = (
    imageUrl: string,
    /** 容错率 */
    tolerance: number = 5
  ): Promise<boolean> => {
    return new Promise((resolve) => {
      const img = new Image();
      img.crossOrigin = 'anonymous'; // 允许跨域访问
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          resolve(false);
          return;
        }

        // 缩小图片尺寸以提高性能
        const maxSize = 500; // 限制最大尺寸
        let { width, height } = img;

        if (width > maxSize || height > maxSize) {
          const ratio = Math.min(maxSize / width, maxSize / height);
          width *= ratio;
          height *= ratio;
        }

        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);

        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const { data } = imageData;

        // 检查每个像素是否都是黑色
        for (let i = 0; i < data.length; i += 4) {
        // 如果发现任何非黑色像素（RGB值不全为0）
          if (data[i] > tolerance || data[i + 1] > tolerance || data[i + 2] > tolerance) {
            resolve(false);
            return;
          }
        }

        resolve(true); // 所有像素都是黑色
      };

      img.onerror = () => {
        resolve(false);
      };

      img.src = imageUrl;
    });
  };

  /**
 * 轮询获取生成的mask图
 * @param regionData
 */
  const polling = (regionData: IMaskRegionData) => new Promise(async (resolve, reject) => {
    const { maskTaskId, region, refImgUrl } = regionData;
    if (!maskTaskId || !region || !refImgUrl) return;
    let count = 0;
    const run = async () => {
      count += 1;
      const { data } = await fetchPatternClothSegDetail(maskTaskId);
      if (TASK_STATUS_ENUM.COMPLETED === data.taskStatus) {
        if (!data.resImgs) {
          reject(new Error('预览图生成失败, 分割图为空'));
          return;
        }
        if (!data.resImgs.startsWith('http')) {
          reject(new Error('预览图生成失败, 分割图地址不合法'));
          return;
        }
        const res = await checkMaskEmpty(data.resImgs);
        if (res) {
          reject(new Error('预览图生成失败, 识别换色区域为空'));
          return;
        }
        regionData.maskUrl = data.resImgs;
        resolve(true);
        return;
      }
      if ([TASK_STATUS_ENUM.GENERATING, TASK_STATUS_ENUM.QUEUEING].includes(data.taskStatus)) {
        if (count > 30) {
          reject(new Error('预览图生成超时'));
          return;
        }
        // 不是当前模特图的mask，不继续轮询
        if (src.value !== refImgUrl || replaceRegion.value !== region) return;
        setTimeout(run, 1000);
        return;
      }
      reject(new Error('预览图生成失败'));
    };
    run();
  });

  /**
 * 创建mask任务并轮询
 * @param refImgUrl
 * @param region
 */
  const createMask = async (refImgUrl: string, region: REPLACE_REGION_ENUM) => {
    const regionData: IMaskRegionData = {
      refImgUrl,
      region,
    };
    const { data } = await fetchPatternClothSegCreate({
      refImgUrl,
      region,
    });
    regionData.maskTaskId = data;
    garmImgMaskUrlMap.value[src.value!] = {
      ...garmImgMaskUrlMap.value[src.value!],
      [region]: regionData,
    };
    await polling(garmImgMaskUrlMap.value[src.value!][region]);
  };

  const generateRegionMask = async () => {
    if (!src.value || !replaceRegion.value || disabled.value) return;
    try {
      loading.value = true;
      regionMaskErrorText.value = '';
      const regionMap = garmImgMaskUrlMap.value[src.value];
      if (regionMap?.[replaceRegion.value]) {
        const { maskTaskId, maskUrl: _maskUrl } = regionMap[replaceRegion.value];
        if (_maskUrl) {
        // 已经生成过mask，不需要再生成
          loading.value = false;
          return;
        }
        if (maskTaskId) {
        // 如果已经创建了mask任务，轮询获取mask图
          await polling(regionMap[replaceRegion.value]);
          loading.value = false;
          return;
        }
      }
      // 没有创建过mask，需要创建任务并轮询结果
      await createMask(src.value, replaceRegion.value);
      loading.value = false;
    } catch (error) {
      // 如果创建mask任务失败，则删除之前的mask任务
      delete garmImgMaskUrlMap.value[src.value][replaceRegion.value];
      regionMaskErrorText.value = (error as Error).message;
      loading.value = false;
    }
  };

  watch([() => src.value, () => replaceRegion.value, () => disabled.value], () => {
    generateRegionMask();
  });

  return {
    regionMaskUrl: maskUrl,
    regionMaskLoading: loading,
    regionMaskErrorText,
    generateRegionMask,
  };
};
