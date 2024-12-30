import { Layout, Menu, MenuProps } from "antd"
import logo from '@/assets/images/logo.png'
import { useEffect, useRef, useState } from "react"
import { asyncRoutes, constantRoutes, RouteConfig } from "@/router/routes";
import { useLocation, useNavigate } from "react-router-dom";

export default function MenuList({ collapsed }: { collapsed: boolean }) {
    const navi = useNavigate();
    const location = useLocation();
    type MenuItem = Required<MenuProps>['items'][number];
    const [items, setItems] = useState<MenuItem[]>([]);
    const defaultOpenKey = useRef<string[]>([]);
    const defaultSelectedKey = useRef<string[]>([]);
    const createItems = (routes: RouteConfig[]) => {
        let arr: MenuItem[] = [];
        routes.forEach((item) => {
            const { path, icon, label, children, isShow } = item;
            if (isShow) {
                if (children) {
                    if (!icon) { // 针对路由配置中父节点实际不显示在menu中但子节点需要显示的情况//
                        arr = arr.concat(createItems(children));
                    }
                    else {
                        arr.push({ key: path, icon, label, children: createItems(children) });
                    }
                }
                else {
                    arr.push({ key: path, icon, label });
                }
            }
        });
        return arr;
    };

    useEffect(() => {
        if (items.length === 0) {
            let arr = createItems(constantRoutes).concat(createItems(asyncRoutes));
            setItems(arr);
            if (defaultSelectedKey.current.length === 0) {
                location.pathname === '/' ? defaultSelectedKey.current.push(arr[0]?.key + '') : defaultSelectedKey.current.push(location.pathname);
            }
        }
        if (defaultOpenKey.current.length === 0 && location.pathname !== '/') {
            location.pathname.split('/').splice(0, 2).reduce((prev: string, cur: string) => {
                let str = prev + '/' + cur;
                defaultOpenKey.current.push(str);
                return str;
            });
        }
    }, [location.pathname]);

    const handleClickMenu = ({ key }: { key: string }) => {
        navi(key);
    }

    return (
        <Layout.Sider trigger={null} collapsible collapsed={collapsed}>
            <div className="layout_logo">
                <img className='layout_logo_img' src={logo} alt="logo" />
                {!collapsed && <span className='layout_logo_title'>后台管理系统</span>}
            </div>
            <Menu
                theme="dark"
                mode="inline"
                items={items}
                onClick={handleClickMenu}
                defaultOpenKeys={defaultOpenKey.current}
                defaultSelectedKeys={defaultSelectedKey.current}
            />
        </Layout.Sider>
    )
}
