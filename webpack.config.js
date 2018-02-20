const path = require("path");
const CopyWebpackPlugin = require('copy-webpack-plugin');
const DotenvPlugin = require('webpack-dotenv-plugin');

const sourceFolder = path.resolve(__dirname, "./src");
const outputFolder = path.resolve(__dirname, "./dist");

module.exports = {
    devtool: "eval",
    output: {
        path: outputFolder,
        filename: "bundle.js",
        publicPath: "http://localhost:3000/"
    },
    plugins: [
        new DotenvPlugin({
            sample: './.env.default',
            path: './.env'
        }),
        new CopyWebpackPlugin([
            {
                from: sourceFolder + '/config.js',
                to: outputFolder + '/Config.js',
                transform: function (content, path) {
                    return inject_environment(content)
                }
            }
        ])
    ],
    module: {}
};

function inject_environment(content) {
    return content.toString()
        .replace('__EXAMPLE_DEBUG__', process.env.EXAMPLE_DEBUG)
        .replace('__EXAMPLE_API_SERVER__', JSON.stringify('https://api.' + process.env.EXAMPLE_ROOT_DOMAIN));
}
