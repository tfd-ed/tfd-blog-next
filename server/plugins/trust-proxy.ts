export default defineNitroPlugin((nitroApp) => {
    nitroApp.hooks.hook('request', (event) => {
        const proto = event.node.req.headers['x-forwarded-proto']
        if (proto) {
            event.node.req.headers['x-forwarded-proto'] = Array.isArray(proto)
                ? proto[0]
                : proto
        }
    })
})
