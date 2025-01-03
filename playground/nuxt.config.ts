import { createResolver } from '@nuxt/kit'

const { resolve } = createResolver(import.meta.url)

export default defineNuxtConfig({
  modules: [
    '../src/module',
    '@unocss/nuxt'
  ],

  devtools: { enabled: true },
  css: [
    './app/assets/main.css'
  ],

  ui: {
    fonts: false
  },
  appConfig: {
    ui: {
      // tailwind: {
      //   prefix: 'tw'
      // },
      // button: {
      //   variants: {
      //     size: {
      //       md: {
      //         base: 'tw:px-2 tw:px-1.5 tw:px-3.5 tw:px-3',
      //         leadingIcon: 'tw:size-1.5',
      //         leadingAvatarSize: 'md',
      //         trailingIcon: 'tw:size-6.5'
      //       }
      //     }
      //   }
      // }
    }
  },

  future: {
    compatibilityVersion: 4
  },

  compatibilityDate: '2024-07-09',

  // @ts-expect-error - `nuxt-component-meta` is used as CLI
  componentMeta: {
    exclude: [
      resolve('./app/components')
    ],
    metaFields: {
      type: false,
      props: true,
      slots: true,
      events: false,
      exposed: false
    }
  }
})
