import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Select, Radio } from 'antd';
import ReactECharts from 'echarts-for-react';
import { generateTrafficData, generateVehicleTypeData, roadSections } from '../services/mockData';
import type { RadioChangeEvent } from 'antd';
import './TrafficFlow.css';

const TrafficFlow: React.FC = () => {
  const [trafficData, setTrafficData] = useState(generateTrafficData());
  const [vehicleData, setVehicleData] = useState(generateVehicleTypeData());
  const [timeRange, setTimeRange] = useState<'day' | 'week' | 'month'>('day');
  const [selectedRoad, setSelectedRoad] = useState(roadSections[0]);

  useEffect(() => {
    // 模拟数据更新
    const timer = setInterval(() => {
      setTrafficData(generateTrafficData());
      setVehicleData(generateVehicleTypeData());
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  // 流量趋势图配置
  const trafficOption = {
    title: {
      text: '交通流量趋势',
      left: 'center'
    },
    tooltip: {
      trigger: 'axis'
    },
    legend: {
      data: ['实际流量', '预测流量'],
      bottom: 0
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '10%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: trafficData.map(item => item.time),
      axisLabel: {
        rotate: 45
      }
    },
    yAxis: {
      type: 'value',
      name: '车流量(辆/小时)'
    },
    series: [
      {
        name: '实际流量',
        type: 'line',
        data: trafficData.map(item => item.value),
        smooth: true,
        areaStyle: {
          opacity: 0.3
        }
      },
      {
        name: '预测流量',
        type: 'line',
        data: trafficData.map(item => item.value * (1 + Math.random() * 0.2 - 0.1)),
        smooth: true,
        lineStyle: {
          type: 'dashed'
        }
      }
    ]
  };

  // 车型分布图配置
  const vehicleOption = {
    title: {
      text: '车型分布',
      left: 'center'
    },
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b}: {c} ({d}%)'
    },
    legend: {
      orient: 'vertical',
      left: 'left'
    },
    series: [
      {
        name: '车型占比',
        type: 'pie',
        radius: ['50%', '70%'],
        avoidLabelOverlap: false,
        label: {
          show: true,
          position: 'outside',
          formatter: '{b}: {d}%'
        },
        emphasis: {
          label: {
            show: true,
            fontSize: '16',
            fontWeight: 'bold'
          }
        },
        data: vehicleData.map(item => ({
          value: item.percentage,
          name: item.type
        }))
      }
    ]
  };

  const handleTimeRangeChange = (e: RadioChangeEvent) => {
    setTimeRange(e.target.value);
    // 这里可以根据时间范围更新数据
  };

  const handleRoadChange = (value: string) => {
    setSelectedRoad(value);
    // 这里可以根据选择的路段更新数据
  };

  return (
    <div className="traffic-flow">
      <Row gutter={[24, 24]}>
        <Col span={24}>
          <Card>
            <div className="filters">
              <Radio.Group value={timeRange} onChange={handleTimeRangeChange}>
                <Radio.Button value="day">24小时</Radio.Button>
                <Radio.Button value="week">近7天</Radio.Button>
                <Radio.Button value="month">近30天</Radio.Button>
              </Radio.Group>
              <Select
                style={{ width: 200, marginLeft: 16 }}
                value={selectedRoad}
                onChange={handleRoadChange}
                options={roadSections.map(road => ({ label: road, value: road }))}
              />
            </div>
          </Card>
        </Col>
      </Row>

      <Row gutter={[24, 24]} className="charts-container">
        <Col xs={24} lg={16}>
          <Card>
            <ReactECharts option={trafficOption} style={{ height: '500px' }} />
          </Card>
        </Col>
        <Col xs={24} lg={8}>
          <Card>
            <ReactECharts option={vehicleOption} style={{ height: '500px' }} />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default TrafficFlow; 