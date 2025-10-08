import type { StylelintConfig, StylelintConfigExtends, StylelintConfigIgnoreFiles, StylelintConfigPlugins, StylelintConfigRules } from './types'
import { orderProperties } from './properties'
import { checkStylelintPackages } from './utils'

export interface StylelintOptions {
  rules?: StylelintConfigRules
  extends?: StylelintConfigExtends[]
  plugins?: StylelintConfigPlugins[]
  ignoreFiles?: StylelintConfigIgnoreFiles[]
  enablePropertyOrder?: boolean
  enableDeclarationSpacing?: boolean
  customPropertyOrder?: string[] | Record<string, any>
  useDefaultIgnores?: boolean
}

const DEFAULT_EXTENDS = ['stylelint-config-standard']
const DEFAULT_PLUGINS = ['stylelint-order']

const DEFAULT_ORDER_RULES = [
  'custom-properties',
  'dollar-variables',
  'at-rules',
  'declarations',
  'rules',
]

const DEFAULT_IGNORE_PATTERNS = [
  '**/dist/**/*.css',
  '**/build/**/*.css',
  '**/.output/**/*.css',
  '**/.next/**/*.css',
  '**/.nuxt/**/*.css',
  '**/.vitepress/cache/**/*.css',
]

export async function stylelint(options: StylelintOptions = {}): Promise<StylelintConfig> {
  const {
    rules = {},
    extends: customExtends = [],
    plugins: customPlugins = [],
    ignoreFiles: customIgnoreFiles = [],
    enablePropertyOrder = true,
    enableDeclarationSpacing = true,
    customPropertyOrder,
    useDefaultIgnores = true,
    ...otherOptions
  } = options

  const requiredPackages = [
    ...DEFAULT_EXTENDS,
    ...DEFAULT_PLUGINS.map(p => p),
  ]
  checkStylelintPackages(requiredPackages)

  const allExtends = [...DEFAULT_EXTENDS, ...customExtends]

  const allPlugins = [...DEFAULT_PLUGINS, ...customPlugins]

  const orderRules: Record<string, any> = {}

  if (enablePropertyOrder) {
    orderRules['order/order'] = DEFAULT_ORDER_RULES
    orderRules['order/properties-order'] = customPropertyOrder || orderProperties
    orderRules['order/properties-alphabetical-order'] = null
  }

  const declarationRules: Record<string, any> = {}

  if (enableDeclarationSpacing) {
    declarationRules['declaration-empty-line-before'] = [
      'always',
      {
        except: ['first-nested'],
        ignore: ['after-comment', 'after-declaration'],
      },
    ]
  }

  const allIgnoreFiles = useDefaultIgnores
    ? [...DEFAULT_IGNORE_PATTERNS, ...customIgnoreFiles]
    : customIgnoreFiles

  return {
    extends: allExtends,
    plugins: allPlugins,
    rules: {
      ...orderRules,
      ...declarationRules,
      'no-empty-source': null,
      ...rules,
    },
    ignoreFiles: allIgnoreFiles.length > 0 ? allIgnoreFiles : undefined,
    ...otherOptions,
  } as StylelintConfig
}
