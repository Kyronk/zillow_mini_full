import { useEffect, useState } from 'react'
import { Routes, Route } from "react-router-dom";

import { DetailPost, Header, Home, HomePage, Login, Rental, SearchDetail } from './containers/Public';
import { path } from "./utils/constant";

import { System, CreatePost, ManagerPost } from './containers/System';
import * as actions from "./store/actions";
import { useDispatch, useSelector } from "react-redux";

function App() {

    const dispatch = useDispatch();
    const { isLoggedIn } =  useSelector(state => state.auth);
    
    useEffect(() => {
        setTimeout(() => {
            isLoggedIn &&  dispatch(actions.getCurrent());
        }, 1000);
    }, [ isLoggedIn]);

    useEffect(() => {
        dispatch(actions.getPrice());
        dispatch(actions.getArea());
        dispatch(actions.getProvince());
        // dispatch(actions.getCurrent();
    }, []);

    return (
        <div className=' bg-primary overflow-hidden'>
            <Routes>
                {/*  mother routes  */}
                <Route path={path.HOME} element={<Home /> }>
                    <Route path="*" element={<HomePage />} />
                    <Route path={path.HOME__PAGE} element={<HomePage />} />
                    <Route path={path.LOGIN} element={<Login /> } />
                    <Route path={path.CHO_THUE_CAN_HO} element={<Rental />} />
                    <Route path={path.CHO_THUE_MAT_BANG} element={<Rental />} />
                    <Route path={path.CHO_THUE_PHONG_TRO} element={<Rental />} />
                    <Route path={path.CHO_THUE_PHONG_TRO} element={<Rental />} />
                    <Route path={path.SEARCH} element={<SearchDetail />} />
                    <Route path={path.DETAL_POST__TITLE__POSTID} element={<DetailPost />} />
                    <Route path={"chi-tiet/*"} element={<DetailPost />} />


                
                </Route>
            
                {/*  mother routes  */}
                <Route path={path.SYSTEM} element={<System />}>
                    <Route  path={path.CREATE_POST}  element={<CreatePost />}/>
                    <Route  path={path.MANAGER_POST}  element={<ManagerPost />}/>
                    {/* 10p */}
                </Route>

            </Routes>

        </div>
    )
}

export default App
