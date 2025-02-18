# 广州-广深高速公路交通数据可视化系统 🚗

一个现代化的交通数据可视化平台，用于实时监控和分析广州-广深高速公路的交通状况。

## 功能特点 ✨

- 📊 实时交通数据展示
  - 车流量统计
  - 平均车速监测
  - 拥堵指数分析
  - 通行时间计算

- 🗺️ 多维度数据可视化
  - 交通流量趋势图
  - 速度分布热力图
  - 路网拥堵状态图
  - 车型构成分析

- ⚡ 实时数据更新
  - 5秒自动刷新
  - 多时间维度查看
  - 多路段数据对比

- 🎯 智能分析功能
  - 交通流量预测
  - 拥堵预警提示
  - 路段状态评估
  - 事故信息追踪

## 技术栈 🛠️

- **前端框架**
  - React 18
  - TypeScript
  - React Router v6

- **UI 组件**
  - Ant Design 5.x
  - ECharts 5.x
  - Leaflet

- **开发工具**
  - Create React App
  - Node.js
  - npm

## 快速开始 🚀

1. **克隆项目**
   ```bash
   git clone https://github.com/MilesSG/gz-gsz-highway-new.git
   cd gz-gsz-highway-new
   ```

2. **安装依赖**
   ```bash
   npm install
   ```

3. **启动开发服务器**
   ```bash
   npm start
   ```

4. **构建生产版本**
   ```bash
   npm run build
   ```

## 项目结构 📁

```
src/
├── components/        # 通用组件
│   ├── layout/       # 布局组件
│   ├── charts/       # 图表组件
│   ├── map/          # 地图组件
│   └── common/       # 公共组件
├── pages/            # 页面组件
├── services/         # 数据服务
├── utils/            # 工具函数
├── types/            # 类型定义
├── assets/           # 静态资源
└── styles/           # 样式文件
```

## 主要功能模块 🔍

### 1. 总览面板
- 关键指标实时展示
- 24小时流量趋势
- 路段拥堵分布
- 实时事故信息

### 2. 交通流量分析
- 流量趋势图表
- 车型分布统计
- 历史数据对比
- 流量预测分析

### 3. 速度分析
- 路段速度分布
- 速度变化热力图
- 速度对比分析
- 异常情况标记

### 4. 拥堵地图
- 实时拥堵展示
- 路网状态可视化
- 拥堵趋势分析
- 拥堵预警提示

## 开发团队 👥

- 前端开发：MilesSG
- 数据分析：MilesSG
- 系统设计：MilesSG

## 许可证 📄

MIT License

## 联系方式 📧

- GitHub: [MilesSG](https://github.com/MilesSG)

## 更新日志 📝

### v0.1.0 (2024-02-18)
- 🎉 项目初始化
- ✨ 实现基础功能
- 🔧 完成核心模块
- 📊 添加数据可视化 