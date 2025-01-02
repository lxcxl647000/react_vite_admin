import { Button, Card, Drawer, Form, Input, message, Pagination, Space, Table, TableProps, Tooltip } from "antd";
import { UserOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import './index.scss'
import { useEffect, useState } from "react";
import { requestAddUser, requestUserList } from "@/apis/acl";
import { IUser } from "@/apis/acl/type";
import useUser from "@/hooks/useUser";

export default function User() {
    const columns: TableProps<IUser>['columns'] = [
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
            dataIndex: 'roleName',
            width: 150,
        },
        {
            title: '创建时间',
            dataIndex: 'createTime',
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
            dataIndex: 'updateTime',
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

    const rowSelection: TableProps<IUser>['rowSelection'] = {
        onChange: (selectedRowKeys: React.Key[], selectedRows: IUser[]) => {
            console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
        },
        getCheckboxProps: (record: IUser) => ({
            disabled: record.name === 'Disabled User', // Column configuration not to be checked
            name: record.name,
        }),
    };

    const [total, setTotal] = useState(0);
    const [pageSize, setPageSize] = useState(5);
    const [curPage, setCurPage] = useState(1);
    const [userList, setUserList] = useState<IUser[]>([]);
    const [searchName, setSearchName] = useState('');

    // 添加用户//
    const [addUserOpen, setAddUserOpen] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const { validateUsername, validatePassword } = useUser();
    const [addUserForm] = Form.useForm();

    const fetchData = async (page?: number, name?: string) => {
        try {
            if (page) {
                setCurPage(page);
            }
            let res = await requestUserList(page ? page : curPage, pageSize, name || '');
            if (res.code === 200) {
                setTotal(res.data.total);
                setUserList(res.data.records.map((item, index) => {
                    item.key = index + 1;
                    return item;
                }));
            }
        } catch (error) {

        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    const handleReset = () => {
        setSearchName('');
        fetchData(1, '');
    }

    const handleOpenAddUser = () => {
        setAddUserOpen(true);
    }

    const handleCloseAddUser = () => {
        clearData();
        setAddUserOpen(false);
        fetchData(1, '');
    };

    const handleAddUser = async () => {
        try {
            await addUserForm.validateFields();
            let user: IUser = {
                createTime: "",
                updateTime: "",
                username: username,
                password: password,
                name: name,

                phone: null,
                roleName: ""
            };
            const res = await requestAddUser(user);
            if (res.code === 200) {
                message.success('添加成功');
            }
            else {
                message.error('添加失败');
            }
            handleCloseAddUser();
        } catch (error) {

        }
    };

    const clearData = () => {
        setUsername('');
        setPassword('');
        setName('');
        addUserForm.resetFields();
    }

    return (
        <div className="user">
            <Card className="user_search">
                <Form className="user_search_form">
                    <Form.Item label="用户名：" style={{ marginBottom: 0 }}>
                        <Input placeholder="请输入用户名" value={searchName} onChange={(e) => setSearchName(e.target.value)} />
                    </Form.Item>
                    <Form.Item style={{ marginBottom: 0 }}>
                        <Space>
                            <Button type="primary" size="large" disabled={searchName ? false : true} onClick={() => fetchData(curPage, searchName)}>搜索</Button>
                            <Button type="default" size="large" onClick={handleReset}>重置</Button>
                        </Space>
                    </Form.Item>
                </Form>
            </Card>
            <Card className="user_content">
                <Space>
                    <Button type="primary" size="large" onClick={handleOpenAddUser}>添加</Button>
                    <Button type="primary" size="large" danger disabled>批量删除</Button>
                </Space>
                <Table<IUser>
                    rowSelection={{ type: 'checkbox', ...rowSelection }}
                    columns={columns}
                    dataSource={userList}
                    bordered
                    className="user_content_table"
                    pagination={false}
                />
                <Pagination
                    total={total}
                    showSizeChanger
                    showQuickJumper
                    showTotal={(total) => `共 ${total} 条`}
                    pageSizeOptions={[3, 5, 10]}
                    align="end"
                    current={curPage}
                    pageSize={pageSize}
                    onChange={(page, pageSize) => {
                        setCurPage(page);
                        setPageSize(pageSize);
                    }}
                />
            </Card>
            <Drawer
                title="添加用户"
                placement={'right'}
                width={500}
                onClose={handleCloseAddUser}
                open={addUserOpen}
                extra={
                    <Space>
                        <Button onClick={handleCloseAddUser}>取消</Button>
                        <Button type="primary" onClick={handleAddUser}>
                            确定
                        </Button>
                    </Space>
                }
            >
                <Form form={addUserForm}>
                    <Form.Item
                        name={"username"}
                        label="用户名字"
                        required
                        rules={[
                            {
                                validator: validateUsername
                            }
                        ]}
                        validateTrigger="onBlur"
                    >
                        <Input placeholder="请填写用户名字" value={username} onChange={(e) => setUsername(e.target.value)} />
                    </Form.Item>
                    <Form.Item
                        name={"name"}
                        label="用户昵称"
                        required
                        rules={[
                            {
                                required: true,
                                message: '请填写用户昵称'
                            }
                        ]}
                        validateTrigger="onBlur"
                    >
                        <Input placeholder="请填写用户昵称" value={name} onChange={(e) => setName(e.target.value)} />
                    </Form.Item>
                    <Form.Item
                        name={"password"}
                        label="用户密码"
                        required
                        rules={[
                            {
                                validator: validatePassword
                            }
                        ]}
                        validateTrigger="onBlur"
                    >
                        <Input placeholder="请填写用户密码" value={password} onChange={(e) => setPassword(e.target.value)} />
                    </Form.Item>
                </Form>

            </Drawer>
        </div>
    )
}
