import {create} from 'timesync'

const ts = (typeof window === 'undefined') ? null : create({
  server: '/api/timesync',
  interval: 60 * 60 * 1000,
})

function now() {
  return ts?.now() ?? Date.now()
}

export {now}
