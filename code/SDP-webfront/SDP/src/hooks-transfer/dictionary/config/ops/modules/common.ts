import type { ModulesOpts } from '@/hooks-transfer/dictionary';

export const module: ModulesOpts = [
  {
    name: 'common',
    codes: [...new Set(
      [
        // 'plm_sample_exception_type',
      ],
    )],
  },
];
