const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    mode: 'development',
    entry: "./src/index.js",
    plugins: [
        new HtmlWebpackPlugin({
            title: "Development",
            filename: "index.html",
            template: "src/index.html",
        }),
    ],
    output: {
        filename: "bundle.js",
        path: path.resolve(__dirname, "dist"),
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"],
            },
            {
              test: /\.(png|svg|jpg|gif|webp)$/,
              type: "asset/resource",
            },
        ],
    },
};
