import { Route, Routes } from 'react-router-dom'

import HomePage from '../pages/HomePage'
import LoginPage from '../pages/LoginPage';
import HomeAdmPage from '../pages/HomeAdm';


function AppRoutes(){
    return(
        <Routes>
            <Route path='/' element={<HomePage/>}/>
            <Route path='/login' element={<LoginPage/>}/>
            <Route path='/homeAdm' element={<HomeAdmPage/>}/>
        </Routes>
    )
}

export default AppRoutes;