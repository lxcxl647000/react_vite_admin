import { requestLogin, requestUserInfo } from "@/apis/user";
import { get_token, set_token } from "@/utils/token";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserState } from "../type";

const initialState: UserState = {
    token: get_token(),
}

let store = createSlice({
    name: "user",
    initialState,
    reducers: {
        setToken(state: UserState, action: PayloadAction<string>) {
            state.token = action.payload;
        }
    }
});

const userReducers = store.reducer;
const { setToken } = store.actions;

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
            console.log(res);
        } catch (error) {

        }
    }
}

export { fetchLogin, fetchUserInfo };
export default userReducers;