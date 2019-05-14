require('dotenv').config()

const Koa = require('koa')
const Router = require('koa-router')
const bodyParser = require('koa-bodyparser')

const api = require('./api')

const mongoose = require('mongoose')

const {
    PORT: port = 4000, // If there are no value set 4000 as default
    MONGO_URI: mongoURI
} = process.env

mongoose.Promise = global.Promise
mongoose.connect(mongoURI, { useNewUrlParser: true }).then(
    console.log('connected to mongodb')
).catch((e) => {
    console.error(e)
})

const app = new Koa()
const router = new Router()

// setting router
router.use('/api', api.routes()) // using api routing

// Set bodyParser before Routing
app.use(bodyParser())

// apply router in app Instance
app.use(router.routes()).use(router.allowedMethods())

app.listen(port, () => {
    console.log('listening to port', port)
})