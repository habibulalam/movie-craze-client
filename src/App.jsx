import { Outlet } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import './App.css'
import Nav from './Component/Nav'


function App() {

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      <Nav />
      <Outlet></Outlet>
    </>
  )
}

export default App
