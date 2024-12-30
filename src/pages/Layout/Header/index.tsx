import { Layout, Button, Breadcrumb, Space, Dropdown, MenuProps } from "antd"
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    ReloadOutlined,
    ExpandOutlined,
    SettingOutlined,
    DownOutlined
} from "@ant-design/icons"
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";
import { useLocation, useNavigate } from "react-router-dom";
import { fetchLogout } from "@/store/modules/user";
import './index.scss'
import { useEffect, useRef, useState } from "react";
import { asyncRoutes, constantRoutes, RouteConfig } from "@/router/routes";

export default function Header({ collapsed, setCollapsed, colorBgContainer }: { collapsed: boolean, setCollapsed: Function, colorBgContainer: string }) {
    const dispatch = useDispatch<AppDispatch>();
    const navi = useNavigate();
    const routes = useRef<RouteConfig[]>([]);
    const location = useLocation();
    const [breadItems, setBreadItems] = useState([]);

    useEffect(() => {
        if (routes.current.length === 0) {
            routes.current = [...constantRoutes, ...asyncRoutes];
        }
        setBreadItems(createItems(routes.current));
    }, [location.pathname]);

    const createItems = (rArr: RouteConfig[]) => {
        let arr: any = [];
        if (location.pathname !== '/') {
            let pathArr: Array<string> = [];
            location.pathname.split('/').splice(1).reduce((prev: string, cur: string) => {
                let str = pathArr.length === 0 ? prev + cur : prev + '/' + cur;
                pathArr.push(str);
                return str;
            }, '/');
            pathArr.forEach((item: string) => {
                rArr.forEach((route: RouteConfig) => {
                    if (route.isShow) {
                        if (route.path === item) {
                            arr.push({
                                title: (
                                    <>
                                        {route.icon}
                                        <span>{route.label}</span>
                                    </>
                                )
                            })
                        }
                        else if (route.children) {
                            arr = arr.concat(createItems(route.children))
                        }
                    }
                })
            });
        }
        return arr;
    };

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
                    separator=">"
                    items={breadItems}
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
