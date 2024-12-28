import { AppDispatch, RootState } from '@/store';
import { fetchUserInfo } from '@/store/modules/user';
import { get_token } from '@/utils/token'
import { ReactNode } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

export default function AuthRoute({ children }: { children: ReactNode }) {
    const token = get_token();
    const dispatch = useDispatch<AppDispatch>();
    const { name } = useSelector((state: RootState) => state.userReducers);
    const getUserInfo = async () => {
        try {
            await dispatch(fetchUserInfo());
            return <>
                {children}
            </>
        } catch (error) {
            // 这里需要登出//
            return <Navigate to='/login' replace />
        }
    }

    if (token) {
        // 无用户名需要去获取用户信息//
        if (!name) {
            getUserInfo();
        }
        else {
            return <>
                {children}
            </>
        }
    }
    else {
        return <Navigate to='/login' replace />
    }
}
