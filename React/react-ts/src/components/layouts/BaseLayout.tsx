import React from 'react'
import { LaptopOutlined, NotificationOutlined, UserOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import { Outlet } from 'react-router-dom';
import Icon, { HomeOutlined, UserAddOutlined, AppleOutlined } from '@ant-design/icons';

const { Header, Content, Sider, Footer } = Layout;

const itemsWhenLoggedIn: MenuProps['items'] = [
  {
    key: 'dashboard',
    label: (<a href='/admin'><AppleOutlined /></a>),
  },
  {
    key: 'home',
    icon: <HomeOutlined />,
    label: (<a href='/'>Trang chủ</a>),
  },
  {
    key: 'products',
    icon: React.createElement(NotificationOutlined),
    label: (<a href='/products'>Sản phẩm</a>),
  },
  {
    key: 'User',
    icon: <UserOutlined />,
    label: (<a href='/'>User</a>),
    children: [
      {
        key: `logout`,
        label: (<a href='/' onClick={() => localStorage.removeItem("accessToken")}>logout</a>),
      },
      {
        key: `dashboard`,
        label: (<a href='/admin'>Trang quản trị</a>),
      }

    ]
  },
]

const itemsWhenNotLoggedIn: MenuProps['items'] = [
  {
    key: 'dashboard',
    label: (<a href='/admin'><AppleOutlined /></a>),
  },
  {
    key: 'home',
    icon: <HomeOutlined />,
    label: (<a href='/'>Trang chủ</a>),
  },
  {
    key: 'products',
    icon: React.createElement(NotificationOutlined),
    label: (<a href='/products'>Sản phẩm</a>),
  },
  {
    key: 'User',
    icon: <UserOutlined />,
    label: (<a href='/'>User</a>),
    children: [
      {
        key: `Signin`,
        label: (<a href='/signin'>Signin</a>),
      },
      {
        key: `Signup`,
        label: (<a href='/signup'>Signup</a>),
      },
    ]
  },
]

const isLoggedIn = localStorage.getItem("accessToken") !== null;


const BaseLayout = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
    <div>
      <Layout>
        <Header className="header">
          <div className="logo" />
          <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']} items={isLoggedIn ? itemsWhenLoggedIn : itemsWhenNotLoggedIn} />
        </Header>
        <Layout>
          <Layout style={{ padding: '0 24px 24px' }}>
            <Content
              style={{
                padding: 24,
                margin: 0,
                minHeight: 280,
                background: colorBgContainer,
              }}
            >
              <main><Outlet /></main>
            </Content>
            <Footer style={{ textAlign: 'center' }}>Ant Design ©2023 Created by Ant UED</Footer>
          </Layout>
        </Layout>
      </Layout>
    </div>
  )
}

export default BaseLayout