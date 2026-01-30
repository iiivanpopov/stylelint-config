import type { Config as StylelintConfig } from 'stylelint'

export function stylelint(config: StylelintConfig = {}): StylelintConfig {
  return {
    extends: [
      'stylelint-config-standard',
      'stylelint-config-recommended',
      'stylelint-config-recess-order',
      ...(Array.isArray(config.extends) ? config.extends : config.extends ? [config.extends] : []),
    ],
    rules: {
      'at-rule-no-unknown': null,
      'import-notation': null,
      'property-no-unknown': null,
      ...config.rules,
    },
  }
}
