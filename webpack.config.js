const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const GlobEntries = require('webpack-glob-entries');
const { IgnorePlugin } = require('webpack');
const nodeExternals = require('webpack-node-externals');

module.exports = {
    mode: 'production',
    entry: GlobEntries('./src/k6/**/*test.ts'), // Generates multiple entry for each test
    output: {
        path: path.join(__dirname, 'dist', 'k6'),
        libraryTarget: 'commonjs',
        filename: '[name].js',
    },
    resolve: {
        extensions: ['.ts', '.js'],
        alias: {
            "@pages": path.resolve(__dirname, 'src', 'pages'),
        },
        fallback: {
            "child_process": false, 
            "https": require.resolve("https-browserify"),
            "os": require.resolve("os-browserify/browser"),
            "constants": require.resolve("constants-browserify"),
            "stream": require.resolve("stream-browserify"),
            "path": require.resolve("path-browserify"),
            "buffer": require.resolve("buffer/"), 
            "zlib": require.resolve("browserify-zlib"), 
            "tty": require.resolve("tty-browserify"), 
            "crypto": require.resolve("crypto-browserify"), 
            "process": require.resolve("process/browser"), 
            "url": require.resolve("url/"), 
            "fs": false // Disable fs polyfill as it's not recommended in the browser
        }
    },
    module: {
        rules: [
          {
            test: /\.(js|ts|jsx)$/,
            exclude: /node_modules/,
            use: {
              loader: 'babel-loader',
            },
          },
        ],
    }, 
    target: 'web',
    externals: /^(k6|https?\:\/\/)(\/.*)?/,
    // Generate map files for compiled scripts
    devtool: "source-map",
    stats: {
        colors: true,
    },
    plugins: [
        new CleanWebpackPlugin(),
        // Copy assets to the destination folder
        // see `src/post-file-test.ts` for an test example using an asset
        new CopyPlugin({
            patterns: [{
                from: path.resolve(__dirname, 'assets'),
                noErrorOnMissing: true
            }],
        })
    ],
    optimization: {
        // Don't minimize, as it's not used in the browser
        minimize: false,
    },
    externalsPresets: { node: true }, // Consider using this option instead of manually specifying 'externals'
    externals: [nodeExternals()],
};