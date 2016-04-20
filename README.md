# iReact
  根据 react 写的一个框架封装。方便开发者直接忽略 React 基本库的配置，封装了 http 请求和表单验证器 validator
  
## 1. 目录结构
	
	src
	├── app.js            // 入口文件
	├── component.js      // 组件类基本类，所有的组件都需要继承这个类
	├── request.js        // 封装 http 请求
	├── utils.js	      // 基本的工具类
	├── validator.js      // 表单验证器
	└── view.js           // 每个路由对应的 view 需要继承这个类

## 2. component.js

组件基本类，继承 React.Component，并提供了 http 请求工具

## 3. view.js

每个路由对应一个 view, view 提供了批量化使用数据的方法

## 4. request.js validator.js

主要工具类，分别封装了 axios 提供 http 请求和表单验证信息

## 协议
MIT
