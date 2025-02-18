import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Radio, Slider, Space, Tag } from 'antd';
import ReactECharts from 'echarts-for-react';
import { generateCongestionData, roadSections } from '../services/mockData';
import type { RadioChangeEvent } from 'antd';
import './CongestionMap.css';

const CongestionMap: React.FC = () => {
  const [congestionData, setCongestionData] = useState(generateCongestionData());
  const [timeRange, setTimeRange] = useState<'realtime' | 'day' | 'week'>('realtime');
  const [timeSlider, setTimeSlider] = useState(12);

  useEffect(() => {
    if (timeRange === 'realtime') {
      const timer = setInterval(() => {
        setCongestionData(generateCongestionData());
      }, 5000);
      return () => clearInterval(timer);
    }
  }, [timeRange]);

  // 拥堵指数地图配置
  const mapOption = {
    title: {
      text: '路网拥堵状态',
      left: 'center'
    },
    tooltip: {
      trigger: 'item',
      formatter: '{b}: 拥堵指数 {c}'
    },
    visualMap: {
      min: 1,
      max: 3,
      left: 'left',
      top: 'bottom',
      text: ['严重拥堵', '畅通'],
      inRange: {
        color: ['#ff4d4f', '#faad14', '#52c41a']
      },
      calculable: true
    },
    series: [
      {
        type: 'graph',
        layout: 'force',
        force: {
          repulsion: 100,
          gravity: 0.1,
          edgeLength: 150,
          layoutAnimation: true
        },
        roam: true,
        label: {
          show: true,
          position: 'right',
          formatter: '{b}'
        },
        edgeSymbol: ['circle', 'arrow'],
        edgeSymbolSize: [4, 10],
        data: roadSections.map((section, index) => ({
          name: section,
          value: congestionData[index].index,
          itemStyle: {
            color: congestionData[index].index < 1.5 ? '#52c41a' : 
                  congestionData[index].index < 2 ? '#faad14' : '#ff4d4f'
          }
        })),
        links: roadSections.slice(0, -1).map((_, index) => ({
          source: index,
          target: index + 1,
          lineStyle: {
            width: 2,
            curveness: 0.2,
            color: '#666'
          }
        })),
        lineStyle: {
          color: '#333',
          width: 2
        },
        itemStyle: {
          borderColor: '#fff',
          borderWidth: 1
        },
        emphasis: {
          focus: 'adjacency',
          lineStyle: {
            width: 4
          }
        }
      }
    ]
  };

  // 拥堵趋势图配置
  const trendOption = {
    title: {
      text: '拥堵趋势分析',
      left: 'center'
    },
    tooltip: {
      trigger: 'axis'
    },
    legend: {
      data: ['拥堵指数', '预警阈值'],
      bottom: 0
    },
    xAxis: {
      type: 'category',
      data: Array.from({ length: 24 }, (_, i) => `${String(i).padStart(2, '0')}:00`),
      axisLabel: {
        rotate: 45
      }
    },
    yAxis: {
      type: 'value',
      name: '拥堵指数'
    },
    series: [
      {
        name: '拥堵指数',
        type: 'line',
        data: Array.from({ length: 24 }, () => 1 + Math.random() * 2),
        markLine: {
          data: [
            {
              name: '警戒线',
              yAxis: 2,
              lineStyle: {
                color: '#ff4d4f'
              }
            }
          ]
        }
      }
    ]
  };

  const handleTimeRangeChange = (e: RadioChangeEvent) => {
    setTimeRange(e.target.value);
  };

  const handleTimeSliderChange = (value: number) => {
    setTimeSlider(value);
  };

  const getStatusTag = (status: number) => {
    const config = {
      1: { color: 'success', text: '畅通' },
      2: { color: 'warning', text: '轻度拥堵' },
      3: { color: 'error', text: '中度拥堵' },
      4: { color: 'error', text: '严重拥堵' }
    };
    const { color, text } = config[status as keyof typeof config];
    return <Tag color={color}>{text}</Tag>;
  };

  return (
    <div className="congestion-map">
      <Row gutter={[24, 24]}>
        <Col span={24}>
          <Card>
            <div className="filters">
              <Space>
                <Radio.Group value={timeRange} onChange={handleTimeRangeChange}>
                  <Radio.Button value="realtime">实时</Radio.Button>
                  <Radio.Button value="day">24小时</Radio.Button>
                  <Radio.Button value="week">近7天</Radio.Button>
                </Radio.Group>
                {timeRange !== 'realtime' && (
                  <div className="time-slider">
                    <span>时间：</span>
                    <Slider
                      min={0}
                      max={23}
                      value={timeSlider}
                      onChange={handleTimeSliderChange}
                      tooltip={{
                        formatter: (value) => `${String(value).padStart(2, '0')}:00`
                      }}
                      style={{ width: 200 }}
                    />
                  </div>
                )}
              </Space>
            </div>
          </Card>
        </Col>
      </Row>

      <Row gutter={[24, 24]} className="charts-container">
        <Col xs={24} lg={14}>
          <Card>
            <ReactECharts option={mapOption} style={{ height: '600px' }} />
          </Card>
        </Col>
        <Col xs={24} lg={10}>
          <Card>
            <ReactECharts option={trendOption} style={{ height: '300px' }} />
          </Card>
          <Card title="路段拥堵状态" className="status-card">
            <div className="status-list">
              {congestionData.map((item, index) => (
                <div key={index} className="status-item">
                  <span className="road-name">{item.section}</span>
                  {getStatusTag(item.status)}
                  <span className="index-value">指数: {item.index.toFixed(2)}</span>
                </div>
              ))}
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default CongestionMap; 