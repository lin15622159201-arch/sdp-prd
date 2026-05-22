import type { Directive, DirectiveBinding } from 'vue';
import { xssFilter, xssRich } from '@/core/utils/xss-util';
// import xss, { FilterXSS, getDefaultWhiteList, getDefaultCSSWhiteList } from 'xss';

type TVHtmlxssBinding = string;
type THandlerMap = Record<string, any>;

const handlerMap: THandlerMap = {
  off(el: HTMLElement, binding: DirectiveBinding<TVHtmlxssBinding>) {
    el.innerHTML = binding.value;
  },
  default(el: HTMLElement, binding: DirectiveBinding<TVHtmlxssBinding>) {
    el.innerHTML = xssFilter.process(binding.value);
  },
  rich(el: HTMLElement, binding: DirectiveBinding<TVHtmlxssBinding>) {
    el.innerHTML = xssRich(binding.value);
  },
};
const handler: Directive<HTMLElement, TVHtmlxssBinding> = (
  el: HTMLElement,
  binding: DirectiveBinding<TVHtmlxssBinding>
) => {
  try {
    handlerMap[binding.arg || 'default']?.(el, binding);
  } catch (err) {
    console.warn(err);
  }
};

const vHtmlxss = {
  handler,
  name: 'htmlxss',
};

export default vHtmlxss;
