import React from 'react'
import Nav from '../admin/Nav'
import { LaptopOutlined, NotificationOutlined, UserOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import { Outlet } from "react-router-dom";
const { Header, Content, Footer, Sider } = Layout;
import { AntDesignOutlined, } from '@ant-design/icons';
import { Avatar, Divider, Tooltip } from 'antd';

const items1: MenuProps['items'] = [
  {
    key: 'dashboard',
    label: (<Avatar.Group>
      <Avatar src="https://res.cloudinary.com/fashsion-brand/image/upload/v1677003861/portfolio/jqfcw2bdpy9vcg5mciyr.jpg" />
    </Avatar.Group>),
    children: [
      {
        key: `ListProduct`,
        label: (<a href='#'>Thông tin</a>),

      },
      {
        key: `ListProduct`,
        label: (<a href='/'>Thoát</a>),

      },
    ]
  }]

const items2: MenuProps['items'] = [
  {
    key: 'dashboard',
    label: (<Avatar.Group>
      <Avatar src="https://res.cloudinary.com/fashsion-brand/image/upload/v1677003861/portfolio/jqfcw2bdpy9vcg5mciyr.jpg" />
    </Avatar.Group>),
    children: [
      {
        key: `animation`,
        label: (<a href='#'>Thông tin</a>),

      },
      {
        key: `logout`,
        label: (<a href='/'>Thoát</a>),

      },
    ]
  },
  {
    key: 'dashboard',
    icon: React.createElement(NotificationOutlined),
    label: (<a href='/admin'>Dashboard</a>),
  },
  {
    key: 'products',
    icon: React.createElement(UserOutlined),
    label: 'Products',
    children: [
      {
        key: `ListProduct`,
        label: (<a href='/admin/products'>ListProduct</a>),

      },
      {
        key: `AddProduct`,
        label: (<a href='/admin/products/add'>AddProduct</a>),
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
        label: (<a href='/admin/categories'>ListCategory</a>),

      },
      {
        key: `AddCategory`,
        label: (<a href='/admin/categories/add'>AddCategory</a>),
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
      <Layout>
        <Header className="header">
          <div className="logo" />
          <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']} items={items1} />
        </Header>
        <Content style={{ padding: '0 50px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>List</Breadcrumb.Item>
            <Breadcrumb.Item>App</Breadcrumb.Item>
          </Breadcrumb>
          <Layout style={{ padding: '24px 0', background: colorBgContainer }}>
            <Sider style={{ background: colorBgContainer }} width={200}>
              <Menu
                mode="inline"
                defaultSelectedKeys={['1']}
                defaultOpenKeys={['sub1']}
                style={{ height: '100%' }}
                items={items2}
              />
            </Sider>
            <Content style={{ padding: '0 24px', minHeight: 280 }}><main><Outlet /></main></Content>
          </Layout>
        </Content>
        <Footer style={{ textAlign: 'center' }}>Ant Design ©2023 Created by Ant UED</Footer>
      </Layout>

    </div>
  )
}

export default AdminLayout