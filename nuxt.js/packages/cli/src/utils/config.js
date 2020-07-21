import path from 'path'
import defaultsDeep from 'lodash/defaultsDeep'
import { loadNuxtConfig as _loadNuxtConfig, getDefaultNuxtConfig } from '@nuxt/config'
import { MODES } from '@nuxt/utils'

export async function loadNuxtConfig (argv, configContext) {
  const rootDir = path.resolve(argv._[0] || '.')
  const configFile = argv['config-file']

  // Load config
  const options = await _loadNuxtConfig({
    rootDir,
    configFile,
    configContext
  })

  // Nuxt Mode
  options.mode =
    (argv.spa && MODES.spa) || (argv.universal && MODES.universal) || options.mode

  // Server options
  options.server = defaultsDeep({
    port: argv.port || undefined,
    host: argv.hostname || undefined,
    socket: argv['unix-socket'] || undefined
  }, options.server || {}, getDefaultNuxtConfig().server)

  return options
}
