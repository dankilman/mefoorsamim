const Koa = require('koa')
const next = require('next')
const Router = require('@koa/router')

const config = require('./lib/config')

const port = config.serverPort
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare().then(() => {
  const server = new Koa()
  const router = new Router()
  router.all('(.*)', async ctx => {
    await handle(ctx.req, ctx.res)
    ctx.respond = false
  })
  server.use(router.routes())
  server.listen(port, async () => {
    // hack to init ts module
    const url = '/api/init'
    const stub = () => {}
    const [end, getHeader, _implicitHeader] = [stub, stub, stub]
    await handle({url, headers: {}}, {end, getHeader, _implicitHeader})
    console.log(`> Ready on http://localhost:${port}`)
  })
})
