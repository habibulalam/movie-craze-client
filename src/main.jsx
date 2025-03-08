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

    ]
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
