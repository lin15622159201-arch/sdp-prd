import type { Ref } from 'vue';
import { ref } from 'vue';
import viewerInstance from '@/components/image-viewer/lib/viewer';
import type { TList } from '@/components/image-viewer/lib/viewer';

// import type { ElImage } from 'element-plus';

import type { cooperationFormItem } from '../views/detail/config/cooperation-form';

type TCooperationForm = typeof cooperationFormItem;
type ITCooperationForm = TCooperationForm & Record<string, any>;

interface ModuleMap {
  idCard: string;
  bank: string;
}
interface TitleMap {
  Front: string;
  Back: string;
}

interface IImages {
  name?: string;
  url?: string;
  id?: string;
}
interface EditImage {
  moduleType: keyof ModuleMap;
  type: keyof TitleMap;
  visible: boolean;
  title: string;
  limit: number;
  images: IImages[];
}
// interface IPreviewRef{
//   clickHandler: () => void;
// }

const titleMap: TitleMap = {
  Front: '正面图管理',
  Back: '反面图管理',
};
const moduleMap: ModuleMap = {
  idCard: '身份证',
  bank: '银行卡',
};
export function useEditImage(cooperationForm: Ref<ITCooperationForm>) {
  const editImage = ref<EditImage>({
    moduleType: 'idCard',
    type: 'Front',
    visible: false,
    title: '编辑图片',
    limit: 1,
    images: [],
  });

  // 预览图片
  // const handlePreviewImage = (previewRef: InstanceType<typeof ElImage>) => {
  //   if (typeof previewRef.clickHandler === 'function') {
  //     previewRef.clickHandler();
  //   } else {
  //     try {
  //       const el = previewRef.$el as HTMLDivElement;
  //       const image = el.getElementsByTagName('img')[0];
  //       image.click();
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   }
  // };
  const handlePreviewImage = (list: TList) => {
    viewerInstance.update(list);
    viewerInstance.view();
  };
  // 编辑图片
  const handleEditImage = (selectedModuleType: keyof ModuleMap, selectedType: keyof TitleMap) => {
    editImage.value = {
      moduleType: selectedModuleType,
      type: selectedType,
      visible: true,
      title: moduleMap[selectedModuleType] + titleMap[selectedType] || '编辑图片',
      limit: 1,
      images: [],
    };
  };
  // 保存编辑图片
  const handleImagesEditChange = (images: IImages[]) => {
    const { type, moduleType } = editImage.value;
    cooperationForm.value[`${moduleType}${type}Image`] = images[0].url!;
    editImage.value.visible = false;
    editImage.value.images = [];
  };
  return {
    editImage,
    handlePreviewImage,
    handleEditImage,
    handleImagesEditChange,
  };
}
