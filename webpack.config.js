const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');


const devMode = process.env.NODE_ENV !=='production'; //Verifica si se esta en produccion o desarrollo




module.exports = { //Indica donde esta el frontEnd y a donde quiero colocarlo

    entry: './frontend/app.js',//archivo principal fronend
    output: {
        path: path.join(__dirname, 'backend/public'), //Indica donde colocar el codigo generado
        filename: 'js/bundle.js'
    },
    mode: 'production',
    module: {
        rules: [
            { //Se encarga de cargar los estilos css dentro de app.js
                test: /\.css/,
                use: [
                  devMode ? 'style-loader' : MiniCssExtractPlugin.loader,  //Si se esta en desarrollo carga los archivos dentro de app js, Si esta en produccion crea los archivos css en su propia carpeta
                    'css-loader'
                ]
            }
        ]


    },


    plugins: [
        new HtmlWebpackPlugin({  //Se encarga de minificar el codigo 
            template: './frontend/index.html',
            minify: {
                collapseWhitespace: true,
                removeComments: true,
                removeRedundantAttributes: true,
                removeScriptTypeAttributes: true,
                removeStyleLinkTypeAttributes: true,
                useShortDoctype: true
            }
        }),
        new MiniCssExtractPlugin({ 
            filename: 'css/bundle.css'//Indica donde se crea el archivo css
        })
    ],
    devtool: 'source-map' //Ayuda a ver en que linea se cometio el error

};