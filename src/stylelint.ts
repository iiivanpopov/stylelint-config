import type { Config as StylelintConfig } from 'stylelint'

import { mergeObjects } from './utils'

export function stylelint(config: StylelintConfig = {}): StylelintConfig {
  const base: StylelintConfig = {
    extends: [
      'stylelint-config-standard',
      'stylelint-config-recommended',
      'stylelint-config-recess-order',
    ],
    rules: {
      'at-rule-no-unknown': null,
      'import-notation': null,
      'property-no-unknown': null,
    },
  }

  return mergeObjects(config, base)
}
