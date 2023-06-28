import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import SimpleLayout from './layouts/simple';
//
import BlogPage from './pages/BlogPage';
import UserPage from './pages/UserPage';
import LoginPage from './pages/LoginPage';
import Page404 from './pages/Page404';
import ProductsPage from './pages/ProductsPage';
import DashboardAppPage from './pages/DashboardAppPage';
import NewUser from './pages/NewUser';
import UpdateUser from './pages/UpdateUser';
import HotelPage from './pages/HotelPage';
import NewHotel from './pages/NewHotel';
import UpdateHotel from './pages/UpdateHotel';
import RoomPage from './pages/RoomPage';
import NewRoom from './pages/NewRoom';
import TourPage from './pages/TourPage';
import NewTour from './pages/NewTour';
import CommentPage from './pages/commentPage';
import BillPage from './pages/BillPage';
import ChatPage from './pages/ChatRealtime';
import UpdateTour from './pages/UpdateTour';

// ----------------------------------------------------------------------

export default function Router() {
  const routes = useRoutes([
    {
      path: '/dashboard',
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to="/dashboard/app" />, index: true },
        { path: 'app', element: <DashboardAppPage /> },
        { path: 'user', element: <UserPage /> },
        { path: 'hotel', element: <HotelPage /> },
        { path: 'room', element: <RoomPage /> },
        { path: 'tour', element: <TourPage /> },
        { path: 'products', element: <ProductsPage /> },
        { path: 'blog', element: <BlogPage /> },
        { path: 'review', element: <CommentPage /> },
        { path: 'bill', element: <BillPage /> },
        { path: 'user/create', element: <NewUser /> },
        { path: 'user/:id', element: <UpdateUser /> },
        { path: 'hotel/create', element: <NewHotel /> },
        { path: 'hotel/:id', element: <UpdateHotel /> },
        { path: 'room/create', element: <NewRoom /> },
        { path: 'tour/create', element: <NewTour /> },
        { path: 'tour/:id', element: <UpdateTour /> },
        { path: 'chat', element: <ChatPage /> },
      ],
    },
    {
      path: 'login',
      element: <LoginPage />,
    },
    {
      element: <SimpleLayout />,
      children: [
        { element: <Navigate to="/dashboard/app" />, index: true },
        { path: '404', element: <Page404 /> },
        { path: '*', element: <Navigate to="/404" /> },
      ],
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);

  return routes;
}
