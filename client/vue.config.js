// vue.config.js
module.exports = {
    // options...
    publicPath: './',
    configureWebpack: {
        stats: 'errors-only',
        performance: {
            hints: false
        }
    }
}