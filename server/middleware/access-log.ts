export default defineEventHandler((event) => {
    const start = Date.now()
    const { method, url } = event.node.req
    const ip = event.node.req.headers['cf-connecting-ip']
        ?? event.node.req.headers['x-forwarded-for']
        ?? event.node.req.socket.remoteAddress

    event.node.res.on('finish', () => {
        const ms = Date.now() - start
        const status = event.node.res.statusCode
        console.log(`${method} ${url} ${status} ${ms}ms ip=${ip}`)
    })
})
