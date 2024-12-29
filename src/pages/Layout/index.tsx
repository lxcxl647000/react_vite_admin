import './index.scss'
import logo from '@/assets/images/logo.png'
import { Layout, Menu, theme } from 'antd'
import {
    UploadOutlined,
    UserOutlined,
    VideoCameraOutlined,
} from '@ant-design/icons';
import { useState } from 'react';
import Header from './Header';
import Content from './Content';

export default function M_Layout() {
    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    return (
        <Layout className='layout'>
            <Layout.Sider trigger={null} collapsible collapsed={collapsed}>
                <div className="layout_logo">
                    <img className='layout_logo_img' src={logo} alt="logo" />
                    {!collapsed && <span className='layout_logo_title'>后台管理系统</span>}
                </div>
                <Menu
                    theme="dark"
                    mode="inline"
                    defaultSelectedKeys={['1']}
                    items={[
                        {
                            key: '1',
                            icon: <UserOutlined />,
                            label: 'nav 1',
                        },
                        {
                            key: '2',
                            icon: <VideoCameraOutlined />,
                            label: 'nav 2',
                        },
                        {
                            key: '3',
                            icon: <UploadOutlined />,
                            label: 'nav 3',
                        },
                    ]}
                />
            </Layout.Sider>
            <Layout>
                <Header collapsed={collapsed} setCollapsed={setCollapsed} colorBgContainer={colorBgContainer} />
                <Content colorBgContainer={colorBgContainer} borderRadiusLG={borderRadiusLG} />
            </Layout>
        </Layout>
    )
}
