import { Navigate, Outlet, Route, Routes } from 'react-router-dom'
import MiniDrawer from '../components/navigation/Navigation';
import Home from './home/Home';

import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';
import Err404 from './errors/Error404';
import ProfilePage from './profile/Profile';
import FontAwesomeSvgIcon from '../components/util/FontAwesomeSvgIcon';
import { faBox, faStore } from '@fortawesome/free-solid-svg-icons';
import StoresList from './stores/StoresList';
import StoresNew from './stores/StoresNew';
import StorePage from './stores/StorePage';
import PacketsList from './packets/PacketsList';
import PacketNew from './packets/PacketNew';
import PacketPage from './packets/PacketPage';


export default function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<NavWidget/>}>
        <Route path="/register" element={ <Navigate to="/" /> }/>
        <Route path="/login" element={ <Navigate to="/" /> } />
        <Route index element={ <Home /> } />

        <Route path="/profile" element={ <ProfilePage /> } />
        
        <Route path="/stores" element={ <StoresList /> } />
        <Route path="/stores/new" element={ <StoresNew /> } />
        <Route path="/stores/:id" element={ <StorePage /> } />

        <Route path="/packets" element={ <PacketsList /> } />
        <Route path="/packets/new" element={ <PacketNew /> } />
        <Route path="/packets/:id" element={ <PacketPage /> } />

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
        {title: 'Packets', url: '/packets', icon: <FontAwesomeSvgIcon icon={faBox}/>},
      ]}
    >
      <Outlet />
    </MiniDrawer>
  )
}
