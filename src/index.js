const Koa = require('koa')
const Router = require('koa-router')
const bodyParser = require('koa-bodyparser')

const api = require('./api')

const app = new Koa()
const router = new Router()

// setting router
router.use('/api', api.routes()) // using api routing

// Set bodyParser before Routing
app.use(bodyParser())

// apply router in app Instance
app.use(router.routes()).use(router.allowedMethods())

app.listen(4000, () => {
    console.log('listening to port 4000')
})