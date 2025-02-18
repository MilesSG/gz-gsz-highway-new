import { random } from 'lodash';

// 生成24小时的时间点
export const timePoints = Array.from({ length: 24 }, (_, i) => 
  `${String(i).padStart(2, '0')}:00`
);

// 生成路段名称
export const roadSections = [
  '广州南-石湾',
  '石湾-西樵',
  '西樵-容桂',
  '容桂-大良',
  '大良-勒流',
  '勒流-伦教',
  '伦教-北滘',
  '北滘-乐从',
  '乐从-陈村',
  '陈村-佛山',
];

// 生成24小时交通流量数据
export const generateTrafficData = () => {
  return timePoints.map(time => {
    const baseValue = time.startsWith('0') ? 1000 : // 凌晨
      time.startsWith('1') && parseInt(time) < 17 ? 3000 : // 白天
      2000; // 晚上
    return {
      time,
      value: baseValue + random(-500, 500),
    };
  });
};

// 生成路段速度数据
export const generateSpeedData = () => {
  return roadSections.map(section => ({
    section,
    speed: random(60, 120),
    freeFlowSpeed: 120,
  }));
};

// 生成路段拥堵指数数据
export const generateCongestionData = () => {
  return roadSections.map(section => ({
    section,
    index: random(1, 3, true),
    status: random(1, 4), // 1: 畅通, 2: 轻度拥堵, 3: 中度拥堵, 4: 严重拥堵
  }));
};

// 生成实时统计数据
export const generateRealTimeStats = () => {
  return {
    currentFlow: random(1500, 3500),
    averageSpeed: random(70, 100, true),
    congestionIndex: random(1, 2.5, true),
    travelTime: random(25, 35),
  };
};

// 生成历史趋势数据
export const generateHistoricalData = () => {
  return Array.from({ length: 30 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - i);
    return {
      date: date.toISOString().split('T')[0],
      flow: random(2000, 4000),
      speed: random(70, 100),
      congestion: random(1, 2.5, true),
    };
  });
};

// 生成预测数据
export const generateForecastData = () => {
  return Array.from({ length: 7 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() + i);
    return {
      date: date.toISOString().split('T')[0],
      flow: random(2000, 4000),
      speed: random(70, 100),
      congestion: random(1, 2.5, true),
    };
  });
};

// 生成车型分布数据
export const generateVehicleTypeData = () => {
  return [
    { type: '小型车', percentage: random(50, 60) },
    { type: '中型车', percentage: random(20, 30) },
    { type: '大型车', percentage: random(10, 20) },
    { type: '特大型车', percentage: random(5, 10) },
  ];
};

// 生成事故数据
export const generateAccidentData = () => {
  return Array.from({ length: random(3, 8) }, () => ({
    id: random(1000, 9999),
    location: roadSections[random(0, roadSections.length - 1)],
    type: ['追尾', '侧翻', '刮蹭', '其他'][random(0, 3)],
    severity: ['轻微', '一般', '严重'][random(0, 2)],
    time: new Date(Date.now() - random(0, 24 * 60 * 60 * 1000)).toISOString(),
    status: ['处理中', '已解决'][random(0, 1)],
  }));
}; 