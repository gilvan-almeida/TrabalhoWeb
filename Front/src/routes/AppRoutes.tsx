import { Route, Routes } from 'react-router-dom'

import HomePage from '../pages/HomePage'
import LoginPage from '../pages/LoginPage';
import HomeAdmPage from '../pages/HomeAdm';
import ManagerPage from '../pages/ManagerPage';
import UsersManagerPage from '../pages/UserManagerPage';


function AppRoutes(){
    return(
        <Routes>
            <Route path='/' element={<HomePage/>}/>
            <Route path='/login' element={<LoginPage/>}/>
            <Route path='/homeAdm' element={<HomeAdmPage/>}/>
            <Route path='/managerPage' element={<ManagerPage/>}/>
            <Route path='/managerUser' element={<UsersManagerPage/>}/>
        </Routes>
    )
}

export default AppRoutes;