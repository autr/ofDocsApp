import { TARGETS } from '@nuxt/utils'
import { common, locking } from '../options'
import { createLock } from '../utils'

export default {
  name: 'export',
  description: 'Export a static generated web application',
  usage: 'export <dir>',
  options: {
    ...common,
    ...locking,
    'fail-on-error': {
      type: 'boolean',
      default: false,
      description: 'Exit with non-zero status code if there are errors when exporting pages'
    }
  },
  async run (cmd) {
    const config = await cmd.getNuxtConfig({
      dev: false,
      target: TARGETS.static,
      _build: cmd.argv.build
    })
    const nuxt = await cmd.getNuxt(config)

    if (cmd.argv.lock) {
      await cmd.setLock(await createLock({
        id: 'generate',
        dir: nuxt.options.generate.dir,
        root: config.rootDir
      }))
    }

    const generator = await cmd.getGenerator(nuxt)
    await nuxt.server.listen()

    const { errors } = await generator.generate({
      init: true,
      build: false
    })

    await nuxt.close()
    if (cmd.argv['fail-on-error'] && errors.length > 0) {
      throw new Error('Error exporting pages, exiting with non-zero code')
    }
  }
}
