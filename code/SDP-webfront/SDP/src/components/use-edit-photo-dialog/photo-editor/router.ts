export default [
  {
    path: '/photo-editor',
    name: 'PhotoEditor',
    component: () => import('./index.vue'),
    meta: {
      title: '图像编辑器',
      auth: false,
    },
  },
];
