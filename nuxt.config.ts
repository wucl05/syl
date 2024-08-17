// https://nuxt.com/docs/api/configuration/nuxt-config
const isDev = process.env.NODE_ENV === 'development';
const isProdApi = process.env.NODE_API_ENV === 'production';
console.log('env', process.env.NODE_ENV);
console.log('NUXT_PUBLIC_API_BASE_URL=',process.env.NUXT_PUBLIC_API_BASE_URL)
import { fileURLToPath } from 'url';
import { visualizer } from 'rollup-plugin-visualizer';
import viteCompression from 'vite-plugin-compression';
import { setMeta } from './app/utils/setMeta';
export default defineNuxtConfig({
  // extends: ['@nuxt/ui-pro'],
  head: {
    ...setMeta(),
    htmlAttrs: {
      lang: 'zh',
    },
    charset: 'utf-16',
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
    // script:[]
  },
  modules: [
    '@nuxt/content',
    '@nuxt/eslint',
    '@nuxt/fonts',
    '@nuxt/image',
    '@nuxt/ui',
    '@nuxthq/studio',
    '@vueuse/nuxt',
    'nuxt-og-image',
    "@nuxtjs/i18n",
    "@nuxtjs/tailwindcss",
    // "@nuxt/icon"
  ],
  // icon: {
  //   provider: 'server',
  //   serverBundle: {
  //     collections: ['heroicons', 'simple-icons'] // <!--- this
  //   },
  //   customCollections: [
  //     {
  //       prefix: 'my-icon',
  //       dir: './app/assets/icons'
  //     },
  //   ],
  // },
  i18n: {
    vueI18n: './i18n.config.ts' // if you are using custom path, default
  },
  css: ['~/assets/css/tailwind.css',"animate.css"],
  tailwindcss: {
  },

  hooks: {
    // Define `@nuxt/ui` components as global to use them in `.md` (feel free to add those you need)
    'components:extend': (components) => {
      const globals = components.filter(c => ['UButton'].includes(c.pascalName))

      globals.forEach(c => c.global = true)
    }
  },

  ui: {
    icons: ['heroicons', 'simple-icons','svg-spinners']
  },

  colorMode: {
    disableTransition: true
  },

  routeRules: {
    // Temporary workaround for prerender regression. see https://github.com/nuxt/nuxt/issues/27490
    '/': { prerender: true },
    '/api/search.json': { prerender: true },
    '/docs': { redirect: '/docs/getting-started', prerender: false }
  },

  devtools: {
    enabled: true
  },

  typescript: {
    strict: false
  },

  future: {
    compatibilityVersion: 4
  },

  eslint: {
    config: {
      stylistic: {
        commaDangle: 'never',
        braceStyle: '1tbs'
      }
    }
  },

  compatibilityDate: '2024-07-11',
  runtimeConfig: {
    public: {
      apiBase: process.env.NUXT_PUBLIC_API_BASE_URL,
    },
  },
  // plugins: [{ src: '@/plugins/error.js', ssr: true }],
  proxy: {
    '/api': {
      target: process.env.NUXT_PUBLIC_API_BASE_URL,
      changeOrigin: true,
      ws: true,
      // pathRewrite: { '^/api/': '' },
    },
  },

  alias: {
    utils: fileURLToPath(new URL('./app/utils', import.meta.url)),
    types: fileURLToPath(new URL('./app/types', import.meta.url)),
    icons: fileURLToPath(new URL('./app/assets/icons', import.meta.url)),
    server: fileURLToPath(new URL('./app/server', import.meta.url)),
    locales: fileURLToPath(new URL('./app/locales', import.meta.url)),
    hooks: fileURLToPath(new URL('./app/composables', import.meta.url)),
    // '@': fileURLToPath(new URL('./app', import.meta.url)),
  },
  // 压缩
  nuxtPrecompress: {
    enabled: true, // Enable in production
    report: false, // set true to turn one console messages during module init
    test: /\.(js|css|html|txt|xml|svg)$/, // files to compress on build
    // Serving options
    middleware: {
      // You can disable middleware if you serve static files using nginx...
      enabled: true,
      // Enable if you have .gz or .br files in /static/ folder
      enabledStatic: true,
      // Priority of content-encodings, first matched with request Accept-Encoding will me served
      encodingsPriority: ['br', 'gzip'],
    },

    // build time compression settings
    gzip: {
      // should compress to gzip?
      enabled: true,
      // compression config
      // https://www.npmjs.com/package/compression-webpack-plugin
      filename: '[path].gz[query]', // middleware will look for this filename
      threshold: 10240,
      minRatio: 0.8,
      compressionOptions: { level: 9 },
    },
    brotli: {
      // should compress to brotli?
      enabled: true,
      // compression config
      // https://www.npmjs.com/package/compression-webpack-plugin
      filename: '[path].br[query]', // middleware will look for this filename
      compressionOptions: { level: 11 },
      threshold: 10240,
      minRatio: 0.8,
    },
  },
  vite: {
    // ssr: {
    //   noExternal: [
    //     'dayjs',
    //   ],
    // },
    define: {
      // fixed apollo client err
      __DEV__: isDev.toString(),
    },
    plugins: [
      visualizer({
        open: true,
        gzipSize: true,
      }),
      viteCompression({
        verbose: true, // 默认即可
        disable: false, //开启压缩(不禁用)，默认即可
        deleteOriginFile: false, //删除源文件
        threshold: 10240, //压缩前最小文件大小
        algorithm: 'gzip', //压缩算法
        ext: '.gz', //文件类型
      }),
    ],
    esbuild: isDev
      ? {}
      : {
          pure: !isDev ? ['console.log', 'console.warn', 'debugger'] : [],
          legalComments: 'none',
        },
    build: {
      commonjsOptions: {
        include: [/node_modules/],
      },
      optimization: {
        splitChunks: {
          cacheGroups: {
            vendor: {
              test: /[\\/]node_modules[\\/]/,
              name: 'vendors',
              chunks: 'all',
            },
          },
        },
      },
    },
  },
  build: {
    analyze: process.env.analyze ? true : false,
    extend(config: { resolve: { alias: { [x: string]: string; }; }; optimization: { minimizer: { options: { terserOptions: { compress: { drop_console: boolean; }; }; }; }[]; }; }, { isClient }: any) {
      config.resolve.alias['vue$'] = 'vue/dist/vue.esm.js';
      if (isClient && isProdApi) {
        config.optimization.minimizer[0].options.terserOptions.compress.drop_console = true;
      }
    },
  },
})
