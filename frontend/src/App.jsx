import './App.css'
import { FrontPage } from './pages/FrontPage'
import { Signin } from './pages/Signin';
import { Signup } from './pages/Signup';
import { Dashboard } from './pages/Dashboard';
import { Movies } from './pages/Movies';
import { Route, Routes, BrowserRouter } from 'react-router-dom'

function App() {

  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={ <FrontPage /> }></Route>
        <Route path='/signin' element={ <Signin /> }></Route>
        <Route path='/signup' element={ <Signup />}></Route>
        <Route path='/dashboard' element={ <Dashboard />}></Route>
        <Route path='/movies/:id' element={<Movies />}></Route>
      </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
