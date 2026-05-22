import type { ModulesOpts } from '@/hooks-transfer/dictionary';

export const module: ModulesOpts = [
  {
    name: '样衣打版管理',
    codes: [...new Set(
      [
        'plm_purchase_ylbw',
        'purchase_request_reason',
        // 'plm_sample_audit_callback',
        'plm_repair_reason',
        'plm_sample_redo_reason',
        'plm_process_step',
        // 'plm_dimension_requirement_unit',
        'plm_standard_size',
        'plm_process_sequence',
        'plm_demand_type',
        'pims_category',
        // 'plm_sample_audit_comment',
        'plm_style_source',
        // 'plm_Internal_plank_house',
        // 'plm_cutting_method',
        // 'plm_sample_qc_question_type',
      ],
    )],
  },
];
