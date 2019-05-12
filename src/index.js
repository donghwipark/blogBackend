const Koa = require('koa')
const Router = require('koa-router')

const app = new Koa()
const router = new Router()

// setting router
router.get('/', (ctx) => {
    ctx.body = 'Home'
})

router.get('/about/:name?', (ctx) => {
    const {name} = ctx.params
    // print depend on the name
    ctx.body = name ? `Introducing ${name}` : "introducing"
})

router.get('/posts', (ctx) => {
    const {id} = ctx.query
    // print depend on the id
    ctx.body = id ? `Post #${id}` : "No Post ID"
})

// apply router in app Instance
app.use(router.routes()).use(router.allowedMethods())

app.listen(4000, () => {
    console.log('listening to port 4000')
})