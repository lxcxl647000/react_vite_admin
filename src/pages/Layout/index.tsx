import './index.scss'
import logo from '@/assets/images/logo.png'
import { Layout, Menu, Button, theme, Breadcrumb, Dropdown, Space, MenuProps } from 'antd'
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    UploadOutlined,
    UserOutlined,
    VideoCameraOutlined,
    HomeOutlined,
    SettingOutlined,
    DownOutlined,
    ExpandOutlined,
    ReloadOutlined,
} from '@ant-design/icons';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/store';
import { fetchLogout } from '@/store/modules/user';
import { useNavigate } from 'react-router-dom';

export default function M_Layout() {
    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    const dispatch = useDispatch<AppDispatch>();
    const navi = useNavigate();

    const logout = async () => {
        // 退出登录
        try {
            await dispatch(fetchLogout());
            navi('/login');
        } catch (error) {

        }
    }

    const items: MenuProps['items'] = [
        {
            key: '1',
            label: '退出登录',
            onClick: logout,
        }
    ];

    const { avatar, name } = useSelector((state: RootState) => state.userReducers);

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
                <Layout.Header className='layout_header' style={{ padding: 0, background: colorBgContainer }}>
                    <div className="layout_header_left">
                        <Button
                            type="text"
                            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                            onClick={() => setCollapsed(!collapsed)}
                            style={{
                                fontSize: '16px',
                                width: 64,
                                height: 64,
                            }}
                        />
                        <Breadcrumb
                            items={[
                                {
                                    href: '',
                                    title: <HomeOutlined />,
                                },
                                {
                                    href: '',
                                    title: (
                                        <>
                                            <UserOutlined />
                                            <span>Application List</span>
                                        </>
                                    ),
                                },
                                {
                                    title: 'Application',
                                },
                            ]}
                        />
                    </div>
                    <div className="layout_header_right">
                        <Space size='middle'>
                            <Button type="default" shape="circle" icon={<ReloadOutlined />} />
                            <Button type="default" shape="circle" icon={<ExpandOutlined />} />
                            <Button type="default" shape="circle" icon={<SettingOutlined />} />
                            <img className=' layout_header_right_avatar' src={avatar} alt="avatar" />
                            <Dropdown menu={{ items }}>
                                <Space>
                                    {name}
                                    <DownOutlined />
                                </Space>
                            </Dropdown>
                        </Space>
                    </div>
                </Layout.Header>
                <Layout.Content
                    style={{
                        margin: '24px 16px',
                        padding: 24,
                        minHeight: 280,
                        background: colorBgContainer,
                        borderRadius: borderRadiusLG,
                    }}
                >
                    Content
                </Layout.Content>
            </Layout>
        </Layout>
    )
}
