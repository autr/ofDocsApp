import consola from 'consola'
import onHeaders from 'on-headers'
import { Timer } from '@nuxt/utils'

export default options => (req, res, next) => {
  if (res.timing) {
    consola.warn('server-timing is already registered.')
  }
  res.timing = new ServerTiming()

  if (options && options.total) {
    res.timing.start('total', 'Nuxt Server Time')
  }

  onHeaders(res, () => {
    res.timing.end('total')

    if (res.timing.headers.length > 0) {
      res.setHeader(
        'Server-Timing',
        []
          .concat(res.getHeader('Server-Timing') || [])
          .concat(res.timing.headers)
          .join(', ')
      )
    }
    res.timing.clear()
  })

  next()
}

class ServerTiming extends Timer {
  constructor (...args) {
    super(...args)
    this.headers = []
  }

  end (...args) {
    const time = super.end(...args)
    if (time) {
      this.headers.push(this.formatHeader(time))
    }
    return time
  }

  clear () {
    super.clear()
    this.headers.length = 0
  }

  formatHeader (time) {
    const desc = time.description ? `;desc="${time.description}"` : ''
    return `${time.name};dur=${time.duration}${desc}`
  }
}
