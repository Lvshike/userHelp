var path = require('path')
var webpack = require('webpack')

module.exports = env =>{
  console.log(env,'ev=----------------------')
  let lib = env.lib ? env.lib : env.dev
  return {
    // 入口文件
    entry: lib? './src/index.js':'./src/main.js',
    // 出口文件
    output: {
      // 打包文件生成的路径
      path: path.resolve(__dirname, lib?'./lib':'./dist'),
      publicPath: lib?'/lib/':'/dist/',
      // 打包后的文件名
      filename: lib ? 'userHelp.js':'build.js',
      /**
       * library 指的是用户使用时的require的模块名
       * 这里既是require('test-publish3')
       */
      library: lib?'userHelp':'',
      libraryTarget: lib?'umd':'var',
      umdNamedDefine: !!lib
    },
    module: {
      rules: [
        {
          test: /\.css$/,
          use: [
            'vue-style-loader',
            'css-loader'
          ],
        },      {
          test: /\.vue$/,
          loader: 'vue-loader',
          options: {
            loaders: {
            }
            // other vue-loader options go here
          }
        },
        {
          test: /\.js$/,
          loader: 'babel-loader',
          exclude: /node_modules/
        },
        {
          test: /\.(png|jpg|gif|svg)$/,
          loader: 'file-loader',
          options: {
            name: '[name].[ext]?[hash]'
          }
        },
        {
          test: /\.(eot|svg|ttf|woff|woff2)(\?\S*)?$/,
          loader: 'file-loader'
        }       
      ]
    },
    resolve: {
      alias: {
        'vue$': 'vue/dist/vue.esm.js'
      },
      extensions: ['*', '.js', '.vue', '.json']
    },
    devServer: {
      historyApiFallback: true,
      noInfo: true,
      overlay: true
    },
    performance: {
      hints: false
    },
    devtool: '#eval-source-map'
  }

  if (process.env.NODE_ENV === 'production') {
    module.exports.devtool = '#source-map'
    // http://vue-loader.vuejs.org/en/workflow/production.html
    module.exports.plugins = (module.exports.plugins || []).concat([
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: '"production"'
        }
      }),
      new webpack.optimize.UglifyJsPlugin({
        sourceMap: true,
        compress: {
          warnings: false
        }
      }),
      new webpack.LoaderOptionsPlugin({
        minimize: true
      })
    ])
  }
}