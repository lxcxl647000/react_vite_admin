import { Layout } from "antd"

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
            Content
        </Layout.Content>
    )
}
