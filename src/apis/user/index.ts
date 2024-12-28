import type { ILogin, ILoginResponseData, IUserInfoResponseData } from "./type";
import type { IResponseData } from "../type";
import { request } from "@/utils";

enum API {
    LOGIN_URL = '/admin/acl/index/login',
    USERINFO_URL = '/admin/acl/index/info',
    LOGOUT_URL = '/admin/acl/index/logout'
}

/**请求登录接口 */
export const requestLogin = (data: ILogin) => {
    return request.post<any, ILoginResponseData>(API.LOGIN_URL, data);
};

/**请求用户信息接口 */
export const requestUserInfo = () => {
    return request.get<any, IUserInfoResponseData>(API.USERINFO_URL);
};

/**请求用户退出登录 */
export const requestLogout = () => {
    return request.post<any, IResponseData>(API.LOGOUT_URL);
};

