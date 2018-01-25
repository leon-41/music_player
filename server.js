const Webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const webpackConfig = require('./webpack.config')
const compiler = Webpack(webpackConfig);


new WebpackDevServer(compiler, {
    publicPath: webpackConfig.output.publicPath,
    hot: true,
    historyApiFallback: true,

    quiet: false,

    onInfo: false,

    stats: {
        assets: false,
        colors: true,
        version: false,
        hash: false,
        timings: false,
        chunks: false,
        chunkModules: false,
    }
}).listen(3000,'locolhost',function (err) {
    if(err) {
        console.log(err);
    }

    console.log('Listening at localhost:3000');
})