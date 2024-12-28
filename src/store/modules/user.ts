import { requestLogin, requestLogout, requestUserInfo } from "@/apis/user";
import { get_token, remove_token, set_token } from "@/utils/token";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserState } from "../type";

const initialState: UserState = {
    token: get_token(),
    avatar: '',
    name: '',
    btns: [],
    routes: []
}

let store = createSlice({
    name: "user",
    initialState,
    reducers: {
        setToken(state: UserState, action: PayloadAction<string>) {
            state.token = action.payload;
        },
        setName(state: UserState, action: PayloadAction<string>) {
            state.name = action.payload;
        },
        setAvatar(state: UserState, action: PayloadAction<string>) {
            state.avatar = action.payload;
        },
        setBtns(state: UserState, action: PayloadAction<string[]>) {
            state.btns = action.payload;
        },
        setRoutes(state: UserState, action: PayloadAction<string[]>) {
            state.routes = action.payload;
        }
    }
});

const userReducers = store.reducer;
const { setToken, setName, setAvatar, setBtns, setRoutes } = store.actions;

//登录
const fetchLogin = (username: string, password: string) => {
    return async (dispatch: any) => {
        // TODO: fetch login
        try {
            let res = await requestLogin({ username, password });
            if (res.code === 200) {
                dispatch(setToken(res.data));
                set_token(res.data);
                return 'ok';
            }
            else {
                return Promise.reject(res.message);
            }
        } catch (error) {
            return Promise.reject(error);
        }
    }
}

//获取用户信息
const fetchUserInfo = () => {
    return async (dispatch: any) => {
        // TODO: fetch user info
        try {
            let res = await requestUserInfo();
            if (res.code === 200) {
                dispatch(setName(res.data.name));
                dispatch(setAvatar(res.data.avatar));
                dispatch(setBtns(res.data.buttons));
                dispatch(setRoutes(res.data.routes));
                return 'ok';
            }
            else {
                return Promise.reject(res.message);
            }
        } catch (error) {
            return Promise.reject(error);
        }
    }
}

// 登出//
const fetchLogout = () => {
    return async (dispatch: any) => {
        // TODO: fetch logout
        try {
            let res = await requestLogout();
            if (res.code === 200) {
                dispatch(setToken(''));
                dispatch(setName(''));
                dispatch(setAvatar(''));
                dispatch(setBtns([]));
                dispatch(setRoutes([])); ''
                remove_token();
                return 'ok';
            }
            else {
                return Promise.reject(res.message);
            }
        } catch (error) {
            return Promise.reject(error);
        }
    }
}

export { fetchLogin, fetchUserInfo, fetchLogout };
export default userReducers;