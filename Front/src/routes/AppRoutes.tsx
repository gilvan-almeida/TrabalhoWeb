import { Route, Routes } from 'react-router-dom'

import HomePage from '../pages/HomePage'
import LoginPage from '../pages/LoginPage';
import HomeAdmPage from '../pages/HomeAdm';
import { ItemPage } from '../pages/ItemPage';
import AdminLayout from '../components/AdminLayout';


function AppRoutes(){
    return(
        <Routes>
            <Route path='/' element={<HomePage/>}/>
            <Route path='/login' element={<LoginPage/>}/>
            <Route path='/homeAdm' element={<HomeAdmPage/>}/>
            <Route path='/item/:id' element={<ItemPage/>}/>

        <Route path="/admin" element={<AdminLayout />}>
           <Route index element={<HomeAdmPage />} />
           
        </Route>
        </Routes>
    )
}

export default AppRoutes;