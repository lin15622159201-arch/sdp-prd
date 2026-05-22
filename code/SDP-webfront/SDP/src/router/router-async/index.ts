const modules: Record<string, any> = import.meta.glob(
  ['@/modules/**/router.ts', '!@/modules/common/**'],
  { eager: true },
);

const asyncRoutes = Object.values(modules).flatMap(module => module.default);

export default asyncRoutes;
