import { useEffect } from "react";
import { useLocation, useNavigation } from "react-router-dom"
import nprogress from 'nprogress';
import 'nprogress/nprogress.css';

export default function RouteProgress() {
    const location = useLocation();
    const navigation = useNavigation();

    nprogress.configure({ showSpinner: false });

    useEffect(() => {
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
