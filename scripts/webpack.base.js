const path = require("path");
const HtmlPlugin = require("html-webpack-plugin");

const htmlPlugin = new HtmlPlugin({
    template: 'public/index.html',
    filename: 'index.html'
})

const baseConfig = {
    mode: 'development',
    devtool: 'source-map',
    entry: ['./main.tsx'],
    resolve: {
        extensions: ['.ts', '.js', '.tsx']
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
                test: /\.js|.ts|.tsx$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                options: {
                    presets: [['@babel/preset-env', {
                        targets: {
                            browsers: ['last 2 versions']
                        }
                    }], '@babel/preset-typescript'],
                    plugins: [
                        ['@babel/plugin-transform-react-jsx', {
                            "pragma": "h", // default pragma is React.createElement
                            // "pragmaFrag": "Preact.Fragment", // default is React.Fragment
                            "throwIfNamespace": false // defaults to true
                        }]]
                },
            }]
    },
    output: {
        filename: 'bundle.js',
        path: path.join(__dirname, 'dist')
    },
    plugins: [htmlPlugin]
}


module.exports = baseConfig;
