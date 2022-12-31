import { Navigate, Outlet, Route, Routes } from 'react-router-dom'
import MiniDrawer from '../components/navigation/Navigation';
import Home from './home/Home';

import HomeIcon from '@mui/icons-material/Home';
import ListIcon from '@mui/icons-material/List';
import PersonIcon from '@mui/icons-material/Person';
import Err404 from './errors/Error404';
import ProfilePage from './profile/Profile';


export default function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<NavWidget/>}>
        <Route path="/register" element={ <Navigate to="/" /> }/>
        <Route path="/login" element={ <Navigate to="/" /> } />
        <Route index element={ <Home /> } />

        <Route path="/profile" element={ <ProfilePage /> } />

        <Route path="*" element={ <Err404 /> } />
      </Route>
    </Routes>
  )
}

function NavWidget () {
  return (
    <MiniDrawer
      title='FRI delivery'
      links={[
        {title: 'Home', url: '/', icon: <HomeIcon/>},
        {title: 'Profile', url: '/profile', icon: <PersonIcon/>},
        {title: 'Tasks', url: '/tasks', icon: <ListIcon/>},
      ]}
    >
      <Outlet />
    </MiniDrawer>
  )
}
