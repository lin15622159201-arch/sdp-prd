import Viewer from 'viewerjs';
import { nextTick } from 'vue';

interface ViewerListItem {
  url: string;
  [propName: string]: any;
}

export type TList = ViewerListItem[] | string[] | string;

export class ViewerInstance {
  protected $viewer: Viewer | null;

  protected $wrapper: HTMLElement | null;

  private __list: string[];

  constructor() {
    this.$viewer = null;
    this.$wrapper = null;
    this.__list = [];

    this.install();
  }

  get list() {
    return this.__list.map(item => item);
  }

  private install() {
    nextTick(() => {
      const $ul = document.createElement('ul');
      // $ul.className = 'image-viewer-wrapper';
      $ul.id = '__image-viewer-wrapper';
      $ul.style.display = 'none';
      document.body.appendChild($ul);

      this.$wrapper = $ul;

      this.$viewer = new Viewer(this.$wrapper!, {
        className: 'viewer-custom-style',
        zIndex: 99999,
        fullscreen: false,
      });
    });
  }

  static getList(list: TList) {
    if (Array.isArray(list)) {
      return (list as (ViewerListItem & string)[]).map((item) => {
        return (item as ViewerListItem)?.url || item as string;
      });
    }
    return [list];
  }

  private update$LiDom(list: string[]) {
    const $lis: string[] = [];
    this.__list = [];

    list.forEach((src) => {
      this.__list.push(src);
      $lis.push(`
        <li class="image-viewer-item">
          <img src="${src}" />
        </li>
      `);
    });
    this.$wrapper!.innerHTML = $lis.join('');
  }

  update(list: TList) {
    const newList = ViewerInstance.getList(list);
    // 文件地址都是一致的
    if (newList.join(',') === this.__list.join(',')) return;

    this.update$LiDom(newList);

    if (this.$viewer) {
      this.$viewer.update();
    }
  }

  view(index = 0) {
    if (!this.$viewer) {
      console.warn('viewer未实例化');
    }
    this.$viewer?.view?.(index);
  }
}

/**
 * 导出单例
 */
const viewerInstance = new ViewerInstance();

export default viewerInstance;
