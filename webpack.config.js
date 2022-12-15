const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { SourceMapDevToolPlugin } = require("webpack");

module.exports = {
    mode: "development",
    entry: "./src/index.js",
    plugins: [
        new HtmlWebpackPlugin({
            title: "Development",
            filename: "index.html",
            template: "src/index.html",
            favicon: "src/favicon-32x32.png",
        }),
        new SourceMapDevToolPlugin({
            filename: "[file].map",
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
            {
                test: /\.(scss)$/,
                use: [
                    {
                        loader: "style-loader",
                    },
                    {
                        loader: "css-loader",
                    },
                    {
                        loader: "postcss-loader",
                        options: {
                            postcssOptions: {
                                plugins: () => [require("autoprefixer")],
                            },
                        },
                    },
                    {
                        loader: "sass-loader",
                    },
                ],
            },
            {
                test: /\.js$/,
                enforce: "pre",
                use: ["source-map-loader"],
            },
        ],
    },
};
