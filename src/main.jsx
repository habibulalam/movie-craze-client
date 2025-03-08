import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import ErrorPage from './Component/ErrorPage.jsx';
import MyFavorites from './Component/MyFavorites.jsx';
import MovieAwards from './Component/MovieAwards.jsx';
import AllMovies from './Component/AllMovies.jsx';
import AddMovies from './Component/AddMovies.jsx';
import AuthProvider from './Provider/AuthProvider.jsx';
import Login from './Component/Login and Signup/Login.jsx';
import Signup from './Component/Login and Signup/Signup.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/allMovies",
        element: <AllMovies />,
      },
      {
        path: "/addMovies",
        element: <AddMovies />,
      },
      {
        path: "/myFavorites",
        element: <MyFavorites />,
      },
      {
        path: "/movieAwards",
        element: <MovieAwards />,
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/signup",
        element: <Signup />,
      },

    ]
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>,
)
