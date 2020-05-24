const path = require('path');
const pxtoviewport = require('postcss-px-to-viewport');

function resolve(dir) {
  return path.join(__dirname, dir);
}

module.exports = {

  configureWebpack: (config) => {
    // eslint-disable-next-line no-param-reassign
    config.resolve = {
      extensions: ['.js', '.vue', '.json', '.css'],
      alias: {
        vue$: 'vue/dist/vue.esm.js',
        '@': resolve('src'),
      },
    };
  },
  css: {
    loaderOptions: {
      postcss: {
        plugins: [
          pxtoviewport({
            /* viewportWidth: 1242, // 视窗的宽度，对应的是我们设计稿的宽度，一般是750
            viewportHeight: 2208, // 视窗的高度，根据750设备的宽度来指定，一般指定1334，也可以不配置
            unitPrecision: 6, // 指定`px`转换为视窗单位值的小数位数
            viewportUnit: 'vw', // 指定需要转换成的视窗单位，建议使用vw
            selectorBlackList: ['.ignore'], // 指定不转换为视窗单位的类，可以自定义，可以无限添加,建议定义一至两个通用的类名
            minPixelValue: 1, // 小于或等于`1px`不转换为视窗单位，你也可以设置为你想要的值
            mediaQuery: false, // 允许在媒体查询中转换`px` */
            // 需要转换的单位，默认为"px"
            unitToConvert: 'px',
            // 设计稿的视口宽度, 将根据视口做比例换算
            viewportWidth: 1242,
            // 视窗的高度
            viewportHeight: 2208,
            // 转化精度，转换后保留位数
            unitPrecision: 6,
            // 能转化为vw的属性列表
            propList: ['*'],
            // 希望使用的视口单位
            viewportUnit: 'vw',
            // 字体使用的视口单位
            fontViewportUnit: 'vw',
            // 需要忽略的CSS选择器
            selectorBlackList: [],
            // 最小的转换数值
            minPixelValue: 1,
            // 媒体查询里的单位是否需要转换单位
            mediaQuery: false,
            // 转换后是否添加备用单位
            replace: true,
            // 忽略文件目录(必须使用正则表达式)
            exclude: [/(\/|\\)(node_modules)(\/|\\)/],
            // 是否添加根据 landscapeWidth 生成的媒体查询条件 @media (orientation: landscape)
            landscape: false,
            // 横屏时使用的单位
            landscapeUnit: 'vh',
            // 横屏时使用的视口宽度
            landscapeWidth: 2208,
          }),
        ],
      },
    },
  },
};
