const { override, adjustStyleLoaders, fixBabelImports } = require("customize-cra");
module.exports = override(
  fixBabelImports('import', {
    libraryName: 'antd',
    libraryDirectory: 'es',
    style: 'css'
  }),
  adjustStyleLoaders(rule => {
    if (rule.test.toString().includes("scss")) {
      rule.use.push({
        loader: require.resolve("sass-resources-loader"),
        options: {
          resources: "./src/assets/output.scss" //这里是你自己放公共scss变量的路径
        }
      });
    }
  }),
  // ...其他配置...
);