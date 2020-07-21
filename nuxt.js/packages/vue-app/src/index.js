import path from 'path'
import { dependencies } from '../package.json'

export const template = {
  dependencies,
  dir: path.join(__dirname, '..', 'template'),
  files: [
    'nuxt/config.json',
    'App.js',
    'client.js',
    'index.js',
    'router.js',
    'router.scrollBehavior.js',
    'router/routes.json',
    'server.js',
    'utils.js',
    'empty.js',
    'mixins/fetch.server.js',
    'mixins/fetch.client.js',
    'components/nuxt-error.vue',
    'components/nuxt-child.js',
    'components/nuxt-link.server.js',
    'components/nuxt-link.client.js',
    'components/nuxt.js',
    'views/app.template.html',
    'views/error.html'
  ]
}
