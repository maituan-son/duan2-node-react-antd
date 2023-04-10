import React from 'react';
import {
  AppstoreOutlined,
  BarChartOutlined,
  CloudOutlined,
  ShopOutlined,
  TeamOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons';
import { Button, MenuProps, Space } from 'antd';

import Nav from '../admin/Nav' 
import { LaptopOutlined, NotificationOutlined, } from '@ant-design/icons' ;
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import { Outlet } from "react-router-dom";
const { Header, Content, Footer, Sider } = Layout;
import { AntDesignOutlined, } from '@ant-design/icons';
import { Avatar, Divider, Tooltip } from 'antd';
const items2 = [
  {
    key: `logout`,
    label: (<a href='/'>
       <Space direction="vertical" style={{ width: '100%' }}>
    <Button type="primary" block>
      Thoát
    </Button>
        </Space>

    </a>), 

  },
  {
    key: 'dashboard',
    label: (<Avatar.Group>
      <Avatar className='m-5' src="#" />
    </Avatar.Group>),
    children: [
      {
        key: `animation`,
        label: (<a href='#'>Thông tin</a>),

      },
    
    ]
  },
  {
    key: 'dashboard',
    icon: React.createElement(NotificationOutlined), 
    label: (<a href='/admin'>
          <Space direction="vertical" style={{ width: '100%' }}>
    <Button type="primary" block>
      Dashboard
    </Button>
        </Space>
    </a>),
  },
  {
    key: 'products',
    icon: React.createElement(UserOutlined),
    label: 'Products',
    children: [
      {
        key: `ListProduct`,
        label: (<a href='/admin/products'>  <Space direction="vertical" style={{ width: '100%' }}>
        <Button type="primary" block>
        ListProduct
        </Button>
            </Space></a>),

      },
      {
        key: `AddProduct`, 
        label: (<a href='/admin/products/add'>  <Space direction="vertical" style={{ width: '100%' }}>
        <Button type="primary" block>
        AddProduct

        </Button>
            </Space></a>),
      }

    ]
  },
  {
    key: 'category',
    icon: React.createElement(LaptopOutlined),
    label: 'Category',
    children: [
      {
        key: `ListCategory`,
        label: (<a href='/admin/categories'>  <Space direction="vertical" style={{ width: '100%' }}>
        <Button type="primary" block>
        ListCategory
        </Button>
            </Space></a>), 

      },
      {
        key: `AddCategory`,
        label: (<a href='/admin/categories/add'>  <Space direction="vertical" style={{ width: '100%' }}>
        <Button type="primary" block>
        AddCategory
        </Button>
            </Space></a>),
      }

    ]
  },

];

type Props = {}

function AdminLayout() {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
    <div>

      <Layout hasSider>
        <Sider
          style={{
            overflow: 'auto',
            height: '100vh',
            position: 'fixed', 
            left: 0,
            top: 0,
            bottom: 0,
          }}
        >
          <div style={{ height: 32, margin: 16, background: 'rgba(255, 255, 255, 0.2)' }} />
          <Menu theme="dark" mode="inline" defaultSelectedKeys={['4']} items={items2} />
        </Sider>
        <Layout className="site-layout" style={{ marginLeft: 200 }}>
          <Header style={{ padding: 0, background: colorBgContainer }} />
          <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
            <div style={{ padding: 24, textAlign: 'center', background: colorBgContainer }}>
              <main><Outlet /></main>
            </div>
          </Content>
        </Layout>
      </Layout>

    </div>
  )
}

export default AdminLayout