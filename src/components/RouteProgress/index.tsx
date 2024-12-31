import { useEffect } from "react";
import { useLocation, useNavigation } from "react-router-dom"
import nprogress from 'nprogress';
import 'nprogress/nprogress.css';
import router from "@/router";

export default function RouteProgress() {
    const location = useLocation();
    const navigation = useNavigation();

    nprogress.configure({ showSpinner: false });

    useEffect(() => {
        const label = ((router.state.matches[1].route) as any).label || '';
        document.title = label ? `后台管理 - ${label}` : '后台管理';
        nprogress.start();

        if (navigation.state === 'idle') {
            nprogress.done();
        }

        return () => {
            nprogress.done();
        }
    }, [location.pathname, navigation.state]);

    return (
        <></>
    )
}
