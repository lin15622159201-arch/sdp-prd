import { createVNode, render, nextTick } from 'vue';
import type { VNodeTypes } from 'vue';

const appendTo = document.body;

function widthInstall<T extends VNodeTypes>(type: T, container: string) {
  const vm = createVNode(type);

  nextTick(() => {
    const _container = document.getElementById(container)
      || document.querySelector(container)
      || (() => {
        const dom = document.createElement('div');
        dom.id = container;
        return dom;
      })();

    render(vm, _container);
    appendTo.appendChild(_container);
  });
  return vm;
}

export default widthInstall;
