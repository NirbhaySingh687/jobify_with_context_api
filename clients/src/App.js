import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Register, Landing, Error, ProtectedRoutes } from './pages'
import {
    AllJobs,
    Profile,
    SharedLayout,
    Stats,
    AddJob,
} from './pages/dashboard'

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<ProtectedRoutes><SharedLayout /></ProtectedRoutes> }>
                    <Route index element={<Stats />} />
                    <Route path='all-jobs' element={<AllJobs />} />
                    <Route path='add-jobs' element={<AddJob />} />
                    <Route path='profile' element={<Profile />} />
                </Route>
                <Route path='/register' element={<Register />} />
                <Route path='/landing' element={<Landing />} />
                <Route path='*' element={<Error />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App