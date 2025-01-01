import { Button, Card, Form, Input, Pagination, Space, Table, TableProps, Tooltip } from "antd";
import { UserOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import './index.scss'

interface DataType {
    key: React.Key;
    name: string;
    age: number;
    address: string;
}
export default function User() {
    const data: DataType[] = [
        {
            key: '1',
            name: 'John Brown',
            age: 32,
            address: 'New York No. 1 Lake ParkNew York No. 1 Lake Park',
        },
        {
            key: '2',
            name: 'Jim Green',
            age: 42,
            address: 'London No. 1 Lake Park',
        },
        {
            key: '3',
            name: 'Joe Black',
            age: 32,
            address: 'Sydney No. 1 Lake Park',
        },
        {
            key: '4',
            name: 'Disabled',
            age: 99,
            address: 'Sydney No. 1 Lake Park',
        },
    ];

    const columns: TableProps<DataType>['columns'] = [
        {
            title: '#',
            dataIndex: 'key',
            width: 80,
        },
        {
            title: 'id',
            dataIndex: 'id',
            width: 150,
        },
        {
            title: '用户名字',
            dataIndex: 'username',
            width: 150,
        },
        {
            title: '用户名称',
            dataIndex: 'name',
            width: 150,
        },
        {
            title: '用户角色',
            dataIndex: 'role',
            width: 150,
        },
        {
            title: '创建时间',
            dataIndex: 'address',
            ellipsis: true,
            render: (address) => (
                <Tooltip placement="topLeft" title={address}>
                    {address}
                </Tooltip>
            ),
            width: 150,
        },
        {
            title: '更新时间',
            dataIndex: 'address',
            ellipsis: true,
            render: (address) => (
                <Tooltip placement="topLeft" title={address}>
                    {address}
                </Tooltip>
            ),
            width: 150,
        },
        {
            title: '操作',
            fixed: 'right',
            render: () => (
                <Space>
                    <Button type="primary" size="small" icon={<UserOutlined />}>分配角色</Button>
                    <Button type="primary" size="small" icon={<EditOutlined />}>编辑</Button>
                    <Button type="primary" size="small" icon={<DeleteOutlined />} danger>删除</Button>
                </Space>
            ),
            align: 'center',
        },
    ];

    const rowSelection: TableProps<DataType>['rowSelection'] = {
        onChange: (selectedRowKeys: React.Key[], selectedRows: DataType[]) => {
            console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
        },
        getCheckboxProps: (record: DataType) => ({
            disabled: record.name === 'Disabled User', // Column configuration not to be checked
            name: record.name,
        }),
    };

    return (
        <div className="user">
            <Card className="user_search">
                <Form className="user_search_form">
                    <Form.Item label="用户名：" style={{ marginBottom: 0 }}>
                        <Input placeholder="请输入用户名" />
                    </Form.Item>
                    <Form.Item style={{ marginBottom: 0 }}>
                        <Space>
                            <Button type="primary" size="large" disabled>搜索</Button>
                            <Button type="default" size="large">重置</Button>
                        </Space>
                    </Form.Item>
                </Form>
            </Card>
            <Card className="user_content">
                <Space>
                    <Button type="primary" size="large">添加</Button>
                    <Button type="primary" size="large" danger disabled>批量删除</Button>
                </Space>
                <Table<DataType>
                    rowSelection={{ type: 'checkbox', ...rowSelection }}
                    columns={columns}
                    dataSource={data}
                    bordered
                    className="user_content_table"
                    pagination={false}
                />
                <Pagination
                    total={85}
                    showSizeChanger
                    showQuickJumper
                    showTotal={(total) => `共 ${total} 条`}
                    pageSizeOptions={[3, 5, 10]}
                    align="end"
                />
            </Card>
        </div>
    )
}
