import { useState } from 'react'
import {Routes,Route} from 'react-router-dom'
import Books from './components/Books';
import SingleBook from './components/SingleBook';
import Account from './components/Account';
import Login from './components/Login';
import Register from './components/Register';
import Navigation from './components/Navigations';

function App() {
  const [token, setToken] = useState(null)

  return (
    <>
      <Navigation setToken={setToken}/>

      <div className='headBox'>
        <h1>Library of Wonders </h1> 
        <p> - where curiosity meets knowledge</p>
      </div>

      <Routes>
            <Route path='/' element={<Books/>}/>
            <Route path='/books/:id' element={<SingleBook/>}/>
            <Route path='/users/me' element={<Account/>}/>
            <Route path='/users/login' element={<Login setToken={setToken}/>}/>
            <Route path='/users/register' element={<Register setToken={setToken}/>}/>
        </Routes>
    </>
  )
}
export default App
