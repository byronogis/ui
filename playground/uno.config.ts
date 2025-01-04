import {
  defineConfig,
  presetUno,
  transformerDirectives,
  transformerVariantGroup
} from 'unocss'
// import twClors from 'tailwindcss/colors'

export default defineConfig({
  presets: [
    presetUno()
  ],
  transformers: [
    transformerDirectives(),
    transformerVariantGroup()
  ],
  // preflights: [
  //   {
  //     getCSS: () => {
  //       const primitiveColor = Object.entries(twClors).reduce((acc, [name, value]) => {
  //         if (typeof value === 'string') {
  //           acc += `--color-${name}: ${value};\nn`
  //         } else {
  //           acc += Object.entries(value).reduce((_acc, [shade, value]) => {
  //             return _acc += `--color-${name}-${shade}: ${value};\n`
  //           }, ``)
  //         }
  //         return acc
  //       }, ``)

  //       return `
  //         :root {
  //           ${primitiveColor}
  //         }
  //       `
  //     }
  //   }
  // ],
  rules: [
    [/(?:([^:\s]+):)?bg-.*?\[(var\(--[^-]+-[^)]+\))\]\/(\d+)/, function* ([_, modifier, color, alpha], { symbols }) {
      yield {
        background: `color-mix(in oklab, ${color} ${alpha}%, transparent)`
      }
      if (modifier) {
        yield {
          [symbols.selector]: selector => `${selector}:${modifier}`,
          background: `color-mix(in oklab, ${color} ${alpha}%, transparent)`
        }
      }
    }],
    [/(?:([^:\s]+):)?text-.*?\[(var\(--[^-]+-[^)]+\))\]\/(\d+)/, function* ([_, modifier, color, alpha], { symbols }) {
      yield {
        color: `color-mix(in oklab, ${color} ${alpha}%, transparent)`
      }
      if (modifier) {
        yield {
          [symbols.selector]: selector => `${selector}:${modifier}`,
          color: `color-mix(in oklab, ${color} ${alpha}%, transparent)`
        }
      }
    }]
  ],
  shortcuts: {
    ring: 'ring-1'
  },
  content: {
    pipeline: {
      include: [
        // the default
        /\.(vue|svelte|[jt]sx|mdx?|astro|elm|php|phtml|html)($|\?)/,
        // IMPORTANT include @nuxt/ui files
        /\.nuxt\/ui\//,
        // for playground-vue
        /nuxt-ui-templates\/ui\//
      ]
    }
  }
})
