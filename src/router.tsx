import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './pages/Home'
import Locaux from './pages/Locaux'
import Reservation from './pages/Reservation'
import MesReservations from './pages/MesReservations'
import FAQ from './pages/FAQ'

const router = createBrowserRouter([
  { path: '/', element: <Home /> },
  { path: '/locaux', element: <Locaux /> },
  { path: '/reservation', element: <Reservation /> },
  { path: '/mes-reservations', element: <MesReservations /> },
  { path: '/faq', element: <FAQ /> },
])

export default function Router() {
  return <RouterProvider router={router} />
}
