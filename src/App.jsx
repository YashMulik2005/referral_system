import { useState } from 'react'
import Navbar from './components/Navbar'
import Home from './components/Home'
import { Dataprovider } from "./components/Context"
import { Route, Routes, BrowserRouter } from 'react-router-dom'
import Layout from './components/Layout'
import Login from './components/Login'
import Signup from './components/Signup'

function App() {
  const [count, setCount] = useState(0)

  return (
    <Dataprovider>
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Layout />} />
            <Route path='/login' element={<Login />} />
            <Route path='/signup' element={<Signup />} />
          </Routes>
        </BrowserRouter>
      </div>

    </Dataprovider>
  )
}

export default App
