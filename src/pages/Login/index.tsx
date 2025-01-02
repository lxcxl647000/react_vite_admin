import { Form, Input, Button, message } from "antd"
import { UserOutlined, LockOutlined } from "@ant-design/icons"
import './index.scss'
import { useState } from "react"
import { useDispatch } from "react-redux";
import { fetchLogin } from "@/store/modules/user";
import { AppDispatch } from "@/store";
import { useNavigate } from "react-router-dom";
import useUser from "@/hooks/useUser";
export default function Login() {
    const [username, setUsername] = useState('admin');
    const [password, setPassword] = useState('111111');
    const dispatch = useDispatch<AppDispatch>();
    const navi = useNavigate();

    const { validateUsername, validatePassword } = useUser();

    const onFinish = async () => {
        await dispatch(fetchLogin(username, password));
        navi('/');
        message.success('登录成功');
    }
    return (
        <div className='login_container'>
            <Form
                className="login_form"
                name="login"
                initialValues={{ remember: true }}
                onFinish={onFinish}
            >
                <h1 className="login_h1">Hello</h1>
                <h2 className="login_h2">欢迎来到后台管理系统</h2>
                <Form.Item
                    name="username"
                    rules={[
                        {
                            validator: validateUsername
                        }
                    ]}
                    validateTrigger="onBlur"
                    initialValue={username}
                >
                    <Input
                        prefix={<UserOutlined />}
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </Form.Item>
                <Form.Item
                    name="password"
                    rules={[
                        {
                            validator: validatePassword
                        }
                    ]}
                    validateTrigger="onBlur"
                    initialValue={password}
                >
                    <Input.Password
                        prefix={<LockOutlined />}
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </Form.Item>
                <Form.Item>
                    <Button block type="primary" htmlType="submit">
                        登录
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
}
