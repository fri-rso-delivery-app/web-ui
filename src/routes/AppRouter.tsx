import { Navigate, Outlet, Route, Routes } from 'react-router-dom'
import MiniDrawer from '../components/navigation/Navigation';
import Home from './home/Home';

import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';
import Err404 from './errors/Error404';
import ProfilePage from './profile/Profile';
import FontAwesomeSvgIcon from '../components/util/FontAwesomeSvgIcon';
import { faStore } from '@fortawesome/free-solid-svg-icons';
import StoresList from './stores/StoresList';


export default function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<NavWidget/>}>
        <Route path="/register" element={ <Navigate to="/" /> }/>
        <Route path="/login" element={ <Navigate to="/" /> } />
        <Route index element={ <Home /> } />

        <Route path="/profile" element={ <ProfilePage /> } />
        <Route path="/stores" element={ <StoresList /> } />

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
        {title: 'Stores', url: '/stores', icon: <FontAwesomeSvgIcon icon={faStore}/>},
      ]}
    >
      <Outlet />
    </MiniDrawer>
  )
}
