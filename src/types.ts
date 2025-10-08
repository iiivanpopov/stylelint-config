import type { Config, ConfigRuleSettings, Plugin } from 'stylelint'

export type StylelintConfigExtends = string | string[]
export type StylelintConfigPlugins = string | Plugin | (string | Plugin)[]
export type StylelintConfigIgnoreFiles = string | string[]
export interface StylelintConfigRules {
  [ruleName: string]: ConfigRuleSettings<any, object>
}
export type StylelintConfig = Config
