const Post = require('models/post')

exports.write = async (ctx) => {
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