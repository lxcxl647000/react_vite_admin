import './index.scss'
import { Layout, theme } from 'antd'
import { useState } from 'react';
import Header from './Header';
import Content from './Content';
import MenuList from './MenuList';

export default function M_Layout() {
    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    return (
        <Layout className='layout'>
            <MenuList collapsed={collapsed} />
            <Layout>
                <Header collapsed={collapsed} setCollapsed={setCollapsed} colorBgContainer={colorBgContainer} />
                <Content colorBgContainer={colorBgContainer} borderRadiusLG={borderRadiusLG} />
            </Layout>
        </Layout>
    )
}
