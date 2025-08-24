import Navbar from './components/Navbar'
import {Routes, Route} from 'react-router-dom'
import {lazy, Suspense} from 'react'
const Dashboard = lazy(() => import('./pages/Dashboard'))
const Login = lazy(() => import('./pages/Login'))
const Signup = lazy(() => import('./pages/Signup'))
const NoMatch = lazy(() => import('./components/NoMatch'))

function App() {
  return (
    <>
    <Navbar />
      <Suspense fallback={<div>Loading...</div>} >
        <Routes>
          <Route path='/' element={<Dashboard />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='*' element={<NoMatch />} />
        </Routes>
      </Suspense>
    </>
  )
}

export default App