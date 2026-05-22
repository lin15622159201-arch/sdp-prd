import { ElMessageBox } from 'element-plus';
import { createVersionPolling } from '@toy/version-polling';

createVersionPolling({
  silent: process.env.NODE_ENV === 'development', // 开发环境下不检测
  forceUpdate: true,
  onUpdate: async (self) => {
    // 当检测到有新版本时，执行的回调函数，可以在这里提示用户刷新页面。当前交互为直接刷新页面
    await ElMessageBox.confirm('发现新版本，是否立即刷新？', '提示', {
      type: 'warning',
      confirmButtonText: '立即刷新',
      cancelButtonText: '稍后刷新',
    }).then(() => {
      self.onRefresh();
    }).catch(() => {
      self.onCancel();
    });
  },
});
