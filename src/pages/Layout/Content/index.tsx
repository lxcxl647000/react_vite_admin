import { Layout } from "antd"
import { Outlet } from "react-router-dom"

export default function Content({ colorBgContainer, borderRadiusLG }: { colorBgContainer: string, borderRadiusLG: number }) {

    return (
        <Layout.Content
            style={{
                margin: '24px 16px',
                padding: 24,
                minHeight: 280,
                background: colorBgContainer,
                borderRadius: borderRadiusLG,
            }}
        >
            <Outlet />
        </Layout.Content>
    )
}
