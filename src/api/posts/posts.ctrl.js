const { ObjectId } = require('mongoose').Types

exports.checkObjectId = (ctx, next) => {
    const { id } = ctx.params

    // Authorise fail
    if(!ObjectId.isValid(id)) {
        ctx.status = 400 // 400 Bad request
        return null
    }

    return next() // Can set ctx.body properly after return next
}

const Post = require('models/post')
const Joi = require('joi')

exports.write = async (ctx) => {
    // check the value which is not a object
    const schema = Joi.object().keys({
        title: Joi.string().required(), // required() means the must input 
        body: Joi.string().required(),
        tags: Joi.array().items(Joi.string()).required()
    })

    // First parameter is object to check, second is the schema
    const result = Joi.validate(ctx.request.body, schema)

    // response on error
    if(result.error) {
        ctx.status = 400
        ctx.body = result.error
        return
    }

    const { title, body, tags } = ctx.request.body

    // Make New Post instance
    const post = new Post({
        title, body, tags
    })

    try {
        await post.save()
        ctx.body = post
    } catch(e) {
        // error on database
        ctx.throw(e, 500)
    }
}

exports.list = async (ctx) => {
    try {
        const posts = await Post.find().exec()
        ctx.body = posts
    } catch(e) {
        ctx.throw(e, 500)
    }
}

exports.read = async (ctx) => {
    const { id } = ctx.params
    try {
        const post = await Post.findById(id).exec()
        // There are no post
        if(!post) {
            ctx.status = 404
            return
        }
        ctx.body = post
    } catch(e) {
        ctx.throw(e, 500)
    }
}

exports.remove = async (ctx) => {
    const { id } = ctx.params
    try {
        await Post.findByIdAndRemove(id).exec()
        ctx.status = 204
    } catch(e) {
        ctx.throw(e, 500)
    }
}

exports.update = async (ctx) => {
    const { id } = ctx.params
    try {
        const post = await Post.findByIdAndUpdate(id, ctx.request.body, {
            new: true
            // Can resend object on this setting
            // If didn't set up, resend the object before upgrade
        }).exec()
        // if there are no Post
        if(!post) {
            ctx.status = 404
            return
        }
        ctx.body = post
    } catch(e) {
        ctx.throw(e, 500)
    }
}