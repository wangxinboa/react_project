# 简介

&emsp;项目规范: [http://alloyteam.github.io/CodeGuide/](http://alloyteam.github.io/CodeGuide/)

&emsp;使用 react 脚手架 create-react-app@5.0.1 创建

## 脚手架自带依赖

### dependencies

- "react": "^18.3.1",
- "react-dom": "^18.3.1",

### devDependencies

- "@testing-library/dom": "^10.4.1",
- "@testing-library/jest-dom": "^6.8.0",
- "@testing-library/react": "^16.3.0",
- "@testing-library/user-event": "^13.5.0",
- "react-scripts": "5.0.1",
- "web-vitals": "^2.1.4",

## 添加依赖

### dependencies

- "history": "^5.3.0",
- "react-router-dom": "^6.23.1",
- "antd": "^5.27.4",
- "@babel/parser": "^7.27.5",
- "dayjs": "^1.11.13",
- "express": "^4.21.0",
- "cors": "^2.8.5"

### devDependencies

- "sass": "^1.89.2"

## 内部添加(直接添加到代码中使用)的第三方框架

- dayjs（日期处理）
- express（本地后端服务）
- cors（跨域支持）

## 外部添加(index.html 中添加全局使用)的第三方框架

暂无（原 ace 编辑器引入已注释，按需启用）

## 项目启动

```bash
# 安装依赖
npm install

# 启动前端开发服务器（默认 http://localhost:3000）
npm start

# 启动后端服务（默认 http://localhost:2998）
npm run server
```
