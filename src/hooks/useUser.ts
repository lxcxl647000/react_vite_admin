export default function useUser() {
    const validateUsername = (params: any, value: string) => {
        if (!value) {
            return Promise.reject('用户名不能为空');
        }
        let val = value.trim();
        if (val.length < 5 || val.length > 10) {
            return Promise.reject('用户名长度5到10位');
        }
        else {
            return Promise.resolve();
        }
    }

    const validatePassword = (params: any, value: string) => {
        if (!value) {
            return Promise.reject('密码不能为空');
        }
        let val = value.trim();
        if (val.length < 6) {
            return Promise.reject('密码不能少于6位');
        }
        else {
            return Promise.resolve();
        }
    }

    return { validateUsername, validatePassword };
}