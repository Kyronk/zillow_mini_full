import React, { useEffect } from 'react'
import Header from './Header';
import { Outlet } from "react-router-dom";
// import Navigation from './Navigation';
import { Navigation, Search} from "./index";
import { Intro, Contact } from '../../components';
import { useSelector, useDispatch } from "react-redux";
import * as actions from "../../store/actions";

const Home = () => {
    const dispatch = useDispatch();
    const { isLoggedIn } = useSelector(state => state.auth);

    useEffect(() => {
        dispatch(actions.getPrice());
        dispatch(actions.getArea());
        dispatch(actions.getProvince());
    }, []);

    return (
        <div className='w-full flex gap-6 flex-col items-center h-full'>
            <Header />
            <Navigation />
            { isLoggedIn && <Search />}
            <div className="w-4/5 lg:w-3/5 flex flex-col items-start justify-start mt-3 " >
                <Outlet />
            </div>
            <Intro />
            <Contact />
            <div className='h-[500px]'>

            </div>

        </div>
    )
}

export default Home