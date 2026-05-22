import type { ComponentPublicInstance } from 'vue';
import RemarkRecordDialogConstructor from './main.vue';
import widthInstall from '../../utils/width-install';
import type { RemarkRecordDialogOpenOpts, RemarkRecordDialogOpenCbMethods } from '../../types';
import { defaultPropsValue } from '../../utils/props-data';
import optsKeys from '../../utils/opts-keys';

interface RemarkRecordDialogPublicMethods {
  open(methods?: RemarkRecordDialogOpenCbMethods): void;
  close(): void;
}
export type RemarkRecordDialogPublicInstance = ComponentPublicInstance<string, RemarkRecordDialogPublicMethods>;

const vm = widthInstall(RemarkRecordDialogConstructor, 'remark-popover__container');

const methods = {
  get instance() {
    const proxy = vm.component!.proxy as any;

    if (proxy.__v_skip === true) {
      return proxy._.exposed as RemarkRecordDialogPublicInstance;
    }
    return vm.component!.proxy as RemarkRecordDialogPublicInstance;
  },

  open(opts: RemarkRecordDialogOpenOpts, _methods?: RemarkRecordDialogOpenCbMethods) {
    optsKeys.forEach((key) => {
      const val = Reflect.get(opts, key) ?? Reflect.get(defaultPropsValue, key);
      vm.component!.props[key] = val;
    });
    methods.instance.open(_methods);
  },

  close() {
    methods.instance.close?.();
  },
};

export default methods;
export {
  optsKeys,
};
