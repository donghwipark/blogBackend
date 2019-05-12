let postId = 1 // default of id

const posts = [
    {
        id: 1,
        title: 'title',
        body: 'body'
    }
]

// write post
exports.write = (ctx) => {
     // can search request body in ctx.request.body
    const {
        title,
        body
    } = ctx.request.body

    postId += 1 // add on previous postId

    const post = { id: postId, title, body }
    posts.push(post)
    ctx.body = post
}

// Search post list
exports.list = (ctx) => {
    ctx.body = posts
}

// Search Post
exports.read = (ctx) => {
    const { id } = ctx.params

    const post = posts.find(p => p.id.toString() === id)

    // if there are no post send error
    if(!post) {
        ctx.status = 404
        ctx.body = {
            message: "there are no Post"
        }
        return
    }

    ctx.body = post
}

// Delete the Post
exports.remove = (ctx) => {
    const { id } = ctx.params
    // Check the post id order
    const index = posts.findIndex(p => p.id.toString() === id)

    // If there are no post send error
    if(index === -1) {
        ctx.status = 404
        ctx.body = {
            message: 'There are no post'
        }
        return
    }

    // Delete the item on the index
    posts.splice(index, 1)
    ctx.status = 204 // no Content 
}

// Post modify
exports.replace = (ctx) => {
    // Pu method using input and change whole data
    const { id } = ctx.params

    // check the order of the post id
    const index = posts.findIndex(p => p.id.toString() === id)

    // Send error on no post
    if(index === -1) {
        ctx.status = 404
        ctx.body = {
            message: 'no Post'
        }
        return
    }

    // Cover the object
    // Make new object after delete the information except the id
    posts[index] = {
        id,
        ...ctx.request.body
    }
    ctx.body = posts[index]
}

// Post modify(Change the specific field)
exports.update = (ctx) => {
    // Patch method change the field
    const { id } = ctx.params

    // Check the post in id
    const index = posts.findIndex(p => p.id.toString() === id)

    // Send error if there are no post
    if(index === -1){
        ctx.status = 404
        ctx.body = {
            message: "there are no post"
        }
        return
    }

    // Cover  on previous information
    posts[index] = {
        ...posts[index],
        ...ctx.request.body
    }
    ctx.body = posts[index]
}

