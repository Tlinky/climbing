# 使用Preact框架小记

## 前端项目大小分析

### 技术架构分析（50 kb）

- 基本架构: Preact+vite+ts
- 路由：Preact-router
- 国际化：Preact-translate
- 网络请求：

axios 大小约为 30 kb

ahook使用useRequest大小约为 25 kb

#### 实际打包

数据源为使用vite打包后大小

![img](https://cdn.nlark.com/yuque/0/2023/png/28590925/1683681818451-cb627fb4-c1df-4e2d-95bc-e1ef66968eb7.png)

纯项目构建（Preact+vite+ts）打包大小为16.78 kb

增加路由以及国际化后打包大小在25 kb左右，增加网络请求后约为 50 kb

### LuLu UI 组件大小分析（200 kb）

说明：以Edge主题为例(各主题间总体相差不大)，数据来源为vite-bundle-visualizer

- 校验类 Validate.js : 74.37 kb
- Dialog.js : 35.88 kb
- Pagination.js :  21.05 kb
- Table.js : 26.95 kb
- Tab.js : 16.52 kb
- Select.js : 22.61 kb
- Drop.js : 53.61 kb
- Follow.js : 19.85 kb
- ErrorTip.js : 7 kb
- .css文件 : 26.25 kb

### 多语言文件大小分析（100 kb）

当前旧款项目多语言文件大小：

- en.js : 256 kb
- zh-cn: 250 kb

删去非必要文案：

- en.js : 48 kb
- zh-cn: 46 kb

### 图片、图标等资源大小预计（15 kb）

- 10-20 kb

### 考虑优化点

- 产品侧：考虑简化功能配置、显示方式、交互逻辑、文案等
- 前端：参考LuLu UI，简化组件配置 （预计100-150 kb）
- 后端：考虑给予前端更多存储空间等（目前预计200 - 500 kb）
