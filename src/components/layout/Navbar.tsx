import React from 'react';
import { Layout, Menu } from 'antd';
import { BarChartOutlined, LineChartOutlined, DashboardOutlined, EnvironmentOutlined } from '@ant-design/icons';
import { useNavigate, useLocation } from 'react-router-dom';
import './Navbar.css';

const { Header } = Layout;

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    {
      key: '/',
      icon: <DashboardOutlined />,
      label: '总览',
    },
    {
      key: '/traffic-flow',
      icon: <BarChartOutlined />,
      label: '交通流量',
    },
    {
      key: '/speed-analysis',
      icon: <LineChartOutlined />,
      label: '速度分析',
    },
    {
      key: '/congestion-map',
      icon: <EnvironmentOutlined />,
      label: '拥堵地图',
    },
  ];

  return (
    <Header className="navbar">
      <div className="logo">
        广深高速交通分析
      </div>
      <Menu
        theme="dark"
        mode="horizontal"
        selectedKeys={[location.pathname]}
        items={menuItems}
        onClick={({ key }) => navigate(key)}
      />
    </Header>
  );
};

export default Navbar; 