import { useSelector, shallowEqual } from 'react-redux';
import { Outlet } from 'react-router-dom';
import Login from '../pages/login';

export default function LoggedInRoutes() {
    const user = useSelector(state => state.user, shallowEqual);

    return user ? <Outlet /> : <Login />;
}
