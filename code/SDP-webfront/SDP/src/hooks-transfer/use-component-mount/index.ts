import { createVNode, render, getCurrentInstance, unref, onMounted, shallowRef, computed } from 'vue';
import type { VNodeTypes, VNode, ComponentInternalInstance, Ref, DefineComponent, FunctionalComponent } from 'vue';
import { isFunction } from 'lodash-es';

export interface IOptions {
  /**
   * 挂载容器
   */
  container: string;
  props?: Record<string, unknown> | Ref<Record<string, unknown>>;
}

const appendTo = document.body;
enum CONTAINER_NAME_TYPE {
  IS_ID = 1,
  IS_CLASS = 2,
  IS_STRING = 0,
}

/**
 * 使用函数的方式挂载组件
 *
 * 使用场景一般是弹窗类的组件
 *
 * 注意📢：使用该方式没有双向绑定（v-model ...）
 *
 * 使用例子：
 * ```ts
 * import CancelDialog from '../cancel-dialog';
 *
 * const { setData, trigger } = useComponentMount(CancelDialog, {
 *    // 挂载的位置
 *    container: '#wrapper',
 *    props: {
 *      msg: 'hhhh',
 *      onSuccess(val: any) {
 *        console.log('handle emit');
 *      }
 *    }
 * })
 * // 修改 CancelDialog msg
 * setData({
 *    msg: '编辑'
 * })
 * // 触发 CancelDialog 暴露的 open方法
 * trigger('open', {
 *   time: 1000
 * })
 * ```
 */
export function useComponentMount
<
  C extends VNodeTypes
  | DefineComponent<any, any>
  | FunctionalComponent<any>,
>(component: C, opts: IOptions) {
  const { props = {} } = opts;
  const container = opts.container.trim();
  const currentInstance = getCurrentInstance();
  const componentVm = shallowRef<VNode>();
  const componentInstance = computed(() => {
    if (!componentVm.value) return null;

    return componentVm.value.component!;
  });

  const instanceExposed = computed(() => {
    if (!componentInstance.value) return null;

    const proxy = componentInstance.value!.proxy as any;

    if (proxy.__v_skip === true) {
      return proxy._.exposed || proxy._.setupState as ComponentInternalInstance;
    }
    return proxy as unknown as ComponentInternalInstance;
  });

  /**
   * 安装组件方法
   */
  const widthInstall = () => {
    componentVm.value = createVNode(component, unref(props));
    // eslint-disable-next-line no-nested-ternary
    const containerType = container[0] === '#'
      ? CONTAINER_NAME_TYPE.IS_ID
      : container[0] === '.'
        ? CONTAINER_NAME_TYPE.IS_CLASS
        : CONTAINER_NAME_TYPE.IS_STRING;
    const containerName = containerType === CONTAINER_NAME_TYPE.IS_STRING
      ? container
      : container.slice(1);

    const _container = document.querySelector(container)
        || (() => {
          const dom = document.createElement('div');
          switch (containerType) {
            case CONTAINER_NAME_TYPE.IS_CLASS:
            case CONTAINER_NAME_TYPE.IS_STRING:
              dom.classList.add(containerName);
              break;
            case CONTAINER_NAME_TYPE.IS_ID:
              dom.id = containerName;
              break;
            default:
          }
          return dom;
        })();

    componentVm.value.appContext = currentInstance!.appContext!;
    render(componentVm.value, _container);
    appendTo.appendChild(_container);
  };

  /**
   * 设置props
   * 未在props定义的属性 将会用attr传输
   */
  const setData = (data: Record<string, unknown>) => {
    if (!data) {
      console.warn(`${data} 不是一个对象`);
      return;
    }

    if (componentInstance.value) {
      const { props: curProps, attrs } = componentInstance.value!;
      Object.entries(data).forEach(([key, val]) => {
        Reflect.set(Reflect.has(curProps, key) ? curProps : attrs, key, val);
      });
    }
  };
  /**
   * 触发子组件方法
   * @param key 事件名称
   * @param args 传递参数 any[]
   */
  const trigger = (methodKey: string, ...args: any[]) => {
    if (instanceExposed.value) {
      const method = Reflect.get(instanceExposed.value, methodKey);

      if (isFunction(method)) {
        method(...args);
      } else {
        console.warn(`${methodKey} : '${method}' 不是一个函数, 请检查`);
      }
    }
  };

  onMounted(() => {
    widthInstall();
  });

  return {
    componentVm,
    setData,
    trigger,
  };
}
