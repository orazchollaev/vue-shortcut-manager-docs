// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt(
  module.exports = {
    extends: [
      '@nuxt/eslint-config',
      'plugin:prettier/recommended'
    ]
  }
)
