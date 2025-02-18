import React, { useEffect } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { generateCongestionData, roadSections } from '../../services/mockData';
import './HighwayMap.css';

// 广深高速的大致路线坐标点
const highwayCoordinates: [number, number][] = [
  [23.1291, 113.2644], // 广州起点
  [23.1207, 113.3215],
  [23.1150, 113.4033],
  [23.0234, 113.7669],
  [22.9161, 113.8766],
  [22.8350, 113.9339],
  [22.7555, 114.0637],
  [22.6468, 114.1225],
  [22.5524, 114.1131], // 深圳终点
];

const HighwayMap: React.FC = () => {
  useEffect(() => {
    // 初始化地图
    const map = L.map('highway-map').setView([23.0, 113.8], 9);

    // 添加OpenStreetMap图层
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    // 绘制高速公路路线
    const polyline = L.polyline(highwayCoordinates as L.LatLngExpression[], {
      color: '#1890ff',
      weight: 5
    }).addTo(map);

    // 添加路段标记和状态
    const congestionData = generateCongestionData();
    highwayCoordinates.forEach((coord, index) => {
      if (index < roadSections.length) {
        const congestion = congestionData[index];
        const color = congestion.index < 1.5 ? '#52c41a' : 
                     congestion.index < 2 ? '#faad14' : '#ff4d4f';
        
        // 创建自定义图标
        const markerHtml = `
          <div class="custom-marker" style="background-color: ${color}">
            <span class="marker-text">${congestion.index.toFixed(1)}</span>
          </div>
        `;
        
        const icon = L.divIcon({
          html: markerHtml,
          className: 'custom-marker-container',
          iconSize: [30, 30]
        });

        // 添加标记
        const marker = L.marker(coord as L.LatLngExpression, { icon })
          .addTo(map)
          .bindPopup(`
            <b>${roadSections[index]}</b><br>
            拥堵指数: ${congestion.index.toFixed(2)}<br>
            状态: ${congestion.status === 1 ? '畅通' : 
                   congestion.status === 2 ? '轻度拥堵' :
                   congestion.status === 3 ? '中度拥堵' : '严重拥堵'}
          `);
      }
    });

    // 清理函数
    return () => {
      map.remove();
    };
  }, []);

  return <div id="highway-map" className="highway-map"></div>;
};

export default HighwayMap; 