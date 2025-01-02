import { request } from "@/utils";
import { IGetUsersResponseData, IUser } from "./type";
import { IResponseData } from "../type";

enum API {
    // 获取用户管理列表//
    GETUSERLIST_URL = '/admin/acl/user/',
    // 新增用户//
    ADDUSER_URL = '/admin/acl/user/save',
    // 修改用户//
    EDITUSER_URL = '/admin/acl/user/update',
    // 搜索用户//
    SEARCHUSER_URL = '/admin/acl/role/get/',
    // 删除用户//
    REMOVEUSER_URL = '/admin/acl/user/remove/',
    // 批量删除用户//
    BATCHREMOVEUSER_URL = '/admin/acl/user/batchRemove',
    // 获取用户角色数据//
    GETROLES_URL = '/admin/acl/user/toAssign/',
    // 分配用户角色//
    ASSIGNROLES_URL = '/admin/acl/user/doAssignRole',
}

/**获取用户管理列表 */
export const requestUserList = (page: number, limit: number, username: string) => request.get<any, IGetUsersResponseData>(API.GETUSERLIST_URL + `${page}/${limit}/?username=${username}`);

/**新增用户 */
export const requestAddUser = (data: IUser) => request.post<any, IResponseData>(API.ADDUSER_URL, data);

/**修改用户 */
export const requestEditUser = (data: IUser) => request.put<any, IResponseData>(API.EDITUSER_URL, data);