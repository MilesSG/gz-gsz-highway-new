import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Select, Radio, Table } from 'antd';
import ReactECharts from 'echarts-for-react';
import { generateSpeedData, roadSections } from '../services/mockData';
import type { RadioChangeEvent } from 'antd';
import './SpeedAnalysis.css';

interface SpeedData {
  section: string;
  speed: number;
  freeFlowSpeed: number;
}

const SpeedAnalysis: React.FC = () => {
  const [speedData, setSpeedData] = useState<SpeedData[]>(generateSpeedData());
  const [timeRange, setTimeRange] = useState<'day' | 'week' | 'month'>('day');
  const [selectedRoad, setSelectedRoad] = useState(roadSections[0]);

  useEffect(() => {
    const timer = setInterval(() => {
      setSpeedData(generateSpeedData());
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  // 速度分布图配置
  const speedOption = {
    title: {
      text: '路段速度分布',
      left: 'center'
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    legend: {
      data: ['当前速度', '自由流速度'],
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
      data: roadSections,
      axisLabel: {
        rotate: 45
      }
    },
    yAxis: {
      type: 'value',
      name: '速度(km/h)'
    },
    series: [
      {
        name: '当前速度',
        type: 'bar',
        data: speedData.map(item => item.speed),
        itemStyle: {
          color: '#1890ff'
        }
      },
      {
        name: '自由流速度',
        type: 'line',
        data: speedData.map(item => item.freeFlowSpeed),
        lineStyle: {
          type: 'dashed',
          color: '#52c41a'
        },
        symbol: 'none'
      }
    ]
  };

  // 速度热力图配置
  const heatmapOption = {
    title: {
      text: '24小时速度热力图',
      left: 'center'
    },
    tooltip: {
      position: 'top'
    },
    grid: {
      height: '50%',
      top: '10%'
    },
    xAxis: {
      type: 'category',
      data: Array.from({ length: 24 }, (_, i) => `${String(i).padStart(2, '0')}:00`),
      splitArea: {
        show: true
      }
    },
    yAxis: {
      type: 'category',
      data: roadSections,
      splitArea: {
        show: true
      }
    },
    visualMap: {
      min: 0,
      max: 120,
      calculable: true,
      orient: 'horizontal',
      left: 'center',
      bottom: '15%',
      text: ['高速', '低速'],
      inRange: {
        color: ['#f50', '#ff0', '#0f0']
      }
    },
    series: [{
      name: '速度',
      type: 'heatmap',
      data: roadSections.flatMap((road, i) => 
        Array.from({ length: 24 }, (_, j) => [
          j,
          i,
          Math.round(40 + Math.random() * 80)
        ])
      ),
      label: {
        show: false
      },
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowColor: 'rgba(0, 0, 0, 0.5)'
        }
      }
    }]
  };

  // 表格列定义
  const columns = [
    {
      title: '路段',
      dataIndex: 'section',
      key: 'section',
    },
    {
      title: '当前速度(km/h)',
      dataIndex: 'speed',
      key: 'speed',
      sorter: (a: SpeedData, b: SpeedData) => a.speed - b.speed,
    },
    {
      title: '自由流速度(km/h)',
      dataIndex: 'freeFlowSpeed',
      key: 'freeFlowSpeed',
    },
    {
      title: '速度比',
      key: 'ratio',
      render: (record: SpeedData) => {
        const ratio = Number((record.speed / record.freeFlowSpeed * 100).toFixed(1));
        let color = '#52c41a';
        if (ratio < 60) {
          color = '#f5222d';
        } else if (ratio < 80) {
          color = '#faad14';
        }
        return <span style={{ color }}>{ratio}%</span>;
      },
      sorter: (a: SpeedData, b: SpeedData) => 
        (a.speed / a.freeFlowSpeed) - (b.speed / b.freeFlowSpeed),
    }
  ];

  const handleTimeRangeChange = (e: RadioChangeEvent) => {
    setTimeRange(e.target.value);
  };

  const handleRoadChange = (value: string) => {
    setSelectedRoad(value);
  };

  return (
    <div className="speed-analysis">
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
        <Col xs={24} lg={12}>
          <Card>
            <ReactECharts option={speedOption} style={{ height: '400px' }} />
          </Card>
        </Col>
        <Col xs={24} lg={12}>
          <Card>
            <ReactECharts option={heatmapOption} style={{ height: '400px' }} />
          </Card>
        </Col>
      </Row>

      <Row gutter={[24, 24]} className="charts-container">
        <Col span={24}>
          <Card title="路段速度详情">
            <Table
              columns={columns}
              dataSource={speedData}
              rowKey="section"
              pagination={false}
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default SpeedAnalysis; 