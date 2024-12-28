import type { IResponseData } from "../type";

/**登录请求参数数据 */
export interface ILogin {
    username: string,
    password: string,
}

/**登录返回数据 */
export interface ILoginResponseData extends IResponseData {
    data: string,
}

/**获取用户返回数据 */
export interface IUserInfoResponseData extends IResponseData {
    data: {
        avatar: string,
        name: string,
        roles: string[],
        buttons: string[],
        routes: string[],
    }
}