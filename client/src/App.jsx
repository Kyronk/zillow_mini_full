import { useState } from 'react'
import { Routes, Route } from "react-router-dom";

import { Header, Home, Login } from './containers/Public';
import { path } from "./utils/constant";



function App() {
    const [count, setCount] = useState(0)

    return (
        <div className='w-screen h-screen bg-primary'>
            <Routes>
                <Route path={path.HOME} element={<Home /> }>
                    <Route path={path.LOGIN} element={<Login /> } />
                
                
                </Route>


            </Routes>
        </div>
    )
}

export default App
