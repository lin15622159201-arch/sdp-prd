import { ISmartDesignListReq } from './api/type';

export type IGalleryListItem = {
  id: string;
  name: string;
  url: string;
};

export type IModelInfo = {
  url?: string;
  aiModelCode?: string;
  name?: string;
  modelMaterialId?: string;
  racialName?: string;
};

export type ISceneInfo = {
  /**
   * 场景ID
   */
  sceneId: string;
  /**
   * 场景名称
   */
  sceneName: string;
  /**
   * 图片ID
   */
  pictureId: string;
  /**
   * 图片路径
   */
  picturePath: string;
};

export type AddSceneSource = 'ai-material' | 'ai-design' | 'ai-design-stylish-derived';

export type IModelPageSource = 'ai-design' | 'ai-material' | 'ai-design-stylish-derived';

export type IScenePageSource = 'ai-design' | 'ai-material' | 'ai-design-stylish-derived';

export type ISceneListReq = ISmartDesignListReq;

export type ISceneAndModel = { modelInfo: IModelInfo; sceneInfo: ISceneInfo; };

export interface MaterialFile {
  selected?: boolean;
  pictureUrl?: string;
}

export interface MaterialInfo {
  modelMaterialLibraryFileList?: MaterialFile[];
  modelMaterialLibraryId?: string;
}
