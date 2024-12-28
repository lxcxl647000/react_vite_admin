import { AppDispatch } from '@/store';
import { fetchUserInfo } from '@/store/modules/user';
import { get_token } from '@/utils/token'
import { ReactNode } from 'react'
import { useDispatch } from 'react-redux';
import { Navigate } from 'react-router-dom';

export default function AuthRoute({ children }: { children: ReactNode }) {
    const token = get_token();
    const dispatch = useDispatch<AppDispatch>();

    if (token) {
        dispatch(fetchUserInfo());
        return <>
            {children}
        </>
    }
    else {
        return <Navigate to='/login' replace />
    }
}
