- 注意，webpack包要使用3.6.0版本的，
因为稳定，并且全局安装的也是3.6.0版本的。

> cnpm install webpack@3.6.0 --save-dev

### 1,在生产环境运行
- 首先，不能手动打开dist文件中的`index.html`,因为路径是有问题的，必须通过服务器打开

- 配置这个包`cnpm install -g serve`，
    因为在package.json中配置了命令，
    可以通过 npm run server生成服务器，
    可以直接访问 http://localhost:5000
    就会打开dist文件中的 index.html

### 2,遇到的坑爹问题
- 因为不小心删除了babelrc文件，自己创建时，文件前面没有加`.` 所以改文件无效！



