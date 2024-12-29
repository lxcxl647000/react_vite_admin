import { Layout ,Menu} from "antd"
import {
    UserOutlined,
    VideoCameraOutlined,
    UploadOutlined
} from "@ant-design/icons"
import logo from '@/assets/images/logo.png'

export default function MenuList({collapsed}:{collapsed:boolean}) {
    return (
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
    )
}
