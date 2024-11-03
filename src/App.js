import { Route, Routes } from 'react-router-dom'
import NavBar from './routes/Navbar'
import Login from './routes/login'
import SignUp from './routes/Signup'

export default function App(){
    return(
        <Routes>
        <Route path='/' element= {<NavBar/>}>
         
        <Route path='login' element={<Login/>} />
        <Route path='signup' element={<SignUp/>} />
        </Route>
        </Routes>
    )
}