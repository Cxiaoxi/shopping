// cli4 的别名
const path = require('path')
const resolve = dir => path.join(__dirname, dir)

module.exports = {
  chainWebpack: config => {
    // html-dom中使用要加~
    // css和router路由配置中可以直接使用
    // 设置快捷路径， @ 表示 'src' ，components 表示 'src/components'
    config.resolve.alias
      .set('@', resolve('src'))
      .set('assets', resolve('src/assets'))
      .set('common', resolve('src/common'))
      .set('components', resolve('src/components'))
      .set('network', resolve('src/network'))
      .set('views', resolve('src/views'))
  },
}

// 非cli4的方法
// module.exports={
//   configurWebpack:{ 
//     resolve:{
//       // 配置别名
//       alias:{
//         // '@':'src'   自带了
//         'assets':'@/assets',
//         'common':'@/common',
//         'components':'@/components',
//         'network':'@/network'
//       }
//     }
//   }
// }