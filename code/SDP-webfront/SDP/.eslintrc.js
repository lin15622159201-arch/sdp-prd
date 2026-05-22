module.exports = {
  root: true,
  extends: [
    '@toy/eslint-config/vue',
  ],
  rules: {
    'vue/multi-word-component-names': 'off',
    // 关闭基本命名规则
    camelcase: 'off', // 关闭驼峰命名检查
    '@typescript-eslint/naming-convention': 'off', // 关闭TypeScript命名约定
    '@typescript-eslint/camelcase': 'off', // 关闭TypeScript驼峰命名检查

    // 关闭Vue特定的命名规则
    'vue/component-name-in-template-casing': 'off', // 关闭组件名称大小写检查
    'vue/attribute-hyphenation': 'off', // 关闭属性连字符检查
    'vue/prop-name-casing': 'off', // 关闭props命名检查

    // 可选：关闭其他可能的命名规则
    'id-length': 'off', // 关闭标识符长度检查
    'id-match': 'off', // 关闭标识符匹配模式检查
    'no-multiple-empty-lines': 'off', // 运行多个空格
    // 自定义最大长度（例如 300 字符）
    'vue/max-len': ['error', { code: 300 }],
    'no-nested-ternary': 'off',
    'no-else-return': 'off',
    // react相关
    'react/no-array-index-key': 'off'
  }
};
