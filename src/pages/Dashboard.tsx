import React, { useEffect, useState } from 'react';
import { Row, Col, Card, Statistic, Table, Badge } from 'antd';
import { CarOutlined, ClockCircleOutlined, WarningOutlined, LineChartOutlined } from '@ant-design/icons';
import ReactECharts from 'echarts-for-react';
import HighwayMap from '../components/map/HighwayMap';
import {
  generateTrafficData,
  generateCongestionData,
  generateRealTimeStats,
  generateAccidentData,
  roadSections
} from '../services/mockData';
import './Dashboard.css';

const Dashboard: React.FC = () => {
  const [realTimeStats, setRealTimeStats] = useState(generateRealTimeStats());
  const [trafficData, setTrafficData] = useState(generateTrafficData());
  const [congestionData, setCongestionData] = useState(generateCongestionData());
  const [accidents, setAccidents] = useState(generateAccidentData());

  // 定期更新数据
  useEffect(() => {
    const timer = setInterval(() => {
      setRealTimeStats(generateRealTimeStats());
      setTrafficData(generateTrafficData());
      setCongestionData(generateCongestionData());
      setAccidents(generateAccidentData());
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  // 24小时流量趋势图配置
  const trafficOption = {
    title: {
      text: '24小时流量趋势',
      left: 'center'
    },
    tooltip: {
      trigger: 'axis'
    },
    xAxis: {
      type: 'category',
      data: trafficData.map(item => item.time),
      axisLabel: {
        rotate: 45
      }
    },
    yAxis: {
      type: 'value',
      name: '车流量(辆/小时)'
    },
    series: [{
      data: trafficData.map(item => item.value),
      type: 'line',
      smooth: true,
      areaStyle: {
        opacity: 0.3
      }
    }]
  };

  // 路段拥堵分布图配置
  const congestionOption = {
    title: {
      text: '路段拥堵分布',
      left: 'center'
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
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
      name: '拥堵指数'
    },
    series: [{
      data: congestionData.map(item => item.index),
      type: 'bar',
      itemStyle: {
        color: (params: any) => {
          const value = params.value;
          if (value < 1.5) return '#52c41a';
          if (value < 2) return '#faad14';
          return '#f5222d';
        }
      }
    }]
  };

  // 事故列表列定义
  const columns = [
    {
      title: '位置',
      dataIndex: 'location',
      key: 'location',
    },
    {
      title: '类型',
      dataIndex: 'type',
      key: 'type',
    },
    {
      title: '严重程度',
      dataIndex: 'severity',
      key: 'severity',
      render: (severity: string) => {
        const color = severity === '严重' ? 'red' : severity === '一般' ? 'orange' : 'green';
        return <Badge color={color} text={severity} />;
      }
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => {
        return <Badge status={status === '处理中' ? 'processing' : 'success'} text={status} />;
      }
    }
  ];

  return (
    <div className="dashboard">
      <Row gutter={[24, 24]}>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="当前流量"
              value={realTimeStats.currentFlow}
              prefix={<CarOutlined />}
              suffix="辆/小时"
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="平均车速"
              value={realTimeStats.averageSpeed}
              prefix={<LineChartOutlined />}
              suffix="km/h"
              precision={1}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="拥堵指数"
              value={realTimeStats.congestionIndex}
              prefix={<WarningOutlined />}
              precision={2}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="平均通行时间"
              value={realTimeStats.travelTime}
              prefix={<ClockCircleOutlined />}
              suffix="分钟"
            />
          </Card>
        </Col>
      </Row>

      <Row gutter={[24, 24]} className="charts-container">
        <Col xs={24}>
          <Card title="实时路况地图">
            <HighwayMap />
          </Card>
        </Col>
      </Row>
      
      <Row gutter={[24, 24]} className="charts-container">
        <Col xs={24} lg={12}>
          <Card>
            <ReactECharts option={trafficOption} style={{ height: '400px' }} />
          </Card>
        </Col>
        <Col xs={24} lg={12}>
          <Card>
            <ReactECharts option={congestionOption} style={{ height: '400px' }} />
          </Card>
        </Col>
      </Row>

      <Row gutter={[24, 24]} className="charts-container">
        <Col xs={24}>
          <Card title="实时路况事故">
            <Table
              columns={columns}
              dataSource={accidents}
              rowKey="id"
              pagination={false}
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard; 