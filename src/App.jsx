import { Outlet } from 'react-router-dom'
import './App.css'
import Nav from './Component/Nav'


function App() {

  return (
    <>
      <Nav />
      <Outlet></Outlet>
    </>
  )
}

export default App
