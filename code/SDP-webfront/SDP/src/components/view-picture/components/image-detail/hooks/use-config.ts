import { shallowRef, computed } from 'vue';
import { EXTEND_LABEL } from './constant';
import { getConfig } from './lib/config';
import { usePermissionConfig } from './use-permission-config';

export const useConfig = () => {
  const {
    MTXZ,
    CJXZ,
  } = usePermissionConfig();

  const configs = shallowRef<EXTEND_LABEL[]>([]);

  const hasStyle = computed(() => configs.value.includes(EXTEND_LABEL.STYLE));
  const hasPatternRecognition = computed(() => configs.value.includes(EXTEND_LABEL.PATTERN_RECOGNITION));
  const hasMultiPose = computed(() => configs.value.includes(EXTEND_LABEL.MULTI_POSE));
  const hasFabricRecognitionRecommendation = computed(
    () => configs.value.includes(EXTEND_LABEL.FABRIC_RECOGNITION_RECOMMENDATION)
  );
  const hasPatternExtraction = computed(() => configs.value.includes(EXTEND_LABEL.PATTERN_EXTRACTION));
  const hasScene = computed(() => configs.value.includes(EXTEND_LABEL.SCENE) && CJXZ.value);
  const hasModel = computed(() => configs.value.includes(EXTEND_LABEL.MODEL) && MTXZ.value);
  

  const hasFabricEnhancement = computed(() => configs.value.includes(EXTEND_LABEL.FABRIC_ENHANCEMENT));

  return {
    hasStyle,
    hasPatternRecognition,
    hasMultiPose,
    hasFabricRecognitionRecommendation,
    hasPatternExtraction,
    hasScene,
    hasModel,
    hasFabricEnhancement,
  };
};
