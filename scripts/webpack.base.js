const path = require("path");
const HtmlPlugin = require("html-webpack-plugin");

const htmlPlugin = new HtmlPlugin({
    template: 'public/index.html',
    filename: 'index.html'
})

const baseConfig = {
    mode: 'development',
    devtool: 'source-map',
    entry: ['./main.ts'],
    resolve: {
        extensions: ['.ts','.js']
    },
    module: {
        rules: [{
            test: /\.css?$/,
            use: ['style-loader', {
                loader: 'css-loader',
                options: {
                    modules: true
                }
            }]
        },
            {
                test: /\.js|.ts$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                options: {
                    presets: [['@babel/preset-env', {
                        targets: {
                            browsers: ['last 2 versions']
                        }
                    }], '@babel/preset-typescript']
                }
            }]
    },
    output: {
        filename: 'bundle.js',
        path: path.join(__dirname, 'dist')
    },
    plugins: [htmlPlugin]
}


module.exports = baseConfig;
