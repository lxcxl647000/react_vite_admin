import { Layout, Button, Breadcrumb, Space, Dropdown, MenuProps } from "antd"
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    HomeOutlined,
    UserOutlined,
    ReloadOutlined,
    ExpandOutlined,
    SettingOutlined,
    DownOutlined
} from "@ant-design/icons"
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";
import { useNavigate } from "react-router-dom";
import { fetchLogout } from "@/store/modules/user";
import './index.scss'

export default function Header({ collapsed, setCollapsed, colorBgContainer }: { collapsed: boolean, setCollapsed: Function, colorBgContainer: string }) {
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
    )
}
