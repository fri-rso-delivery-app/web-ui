import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { styled, useTheme, Theme } from '@mui/material/styles';

import {
  Tooltip,
  Box,
  Drawer as MuiDrawer,
  AppBar as MuiAppBar,
  Toolbar,
  List,
  CssBaseline,
  Typography,
  Divider,
  IconButton,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';

import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import DarkModeSwitch from './DarkModeSwitch';
import RefreshButton from './RefreshButton';
import FontAwesomeSvgIcon from '../util/FontAwesomeSvgIcon';
import { faUser } from '@fortawesome/free-solid-svg-icons';


const drawerWidth = 240;

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const openedMixin = (theme: Theme): Object => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme: Theme): Object => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});


type OpenCloseProps = {
  open: boolean,
}
const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<OpenCloseProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
  borderRadius: 0,
}));
const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== 'open',
})<OpenCloseProps>(({ theme, open } ) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);


type MiniDrawerLink = {
  title: string,
  url: string,
  icon: JSX.Element,
};
type MiniDrawerProps = {
  children: JSX.Element,
  title: string,
  links: MiniDrawerLink[],
};
export default function MiniDrawer({ children, title, links }: MiniDrawerProps) {
  const location = useLocation();
  const navigate = useNavigate();
  
  const theme = useTheme();
  const [open, setOpen] = useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  // top level route
  const matchedTop = location.pathname.split('/')[1];

  let matchedLink: (MiniDrawerLink | null) = null;
  links.forEach((link) => {
    if (matchedLink === null && matchedTop === link.url.split('/')[1]) {
      matchedLink = link;
    }
  });

  let matchedTitle = (matchedLink !== null) ? `${title} - ${matchedLink['title']}` : title;

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}
        sx={{
          background: theme.palette.primary.gradient,
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: 'none' }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            {matchedTitle}
          </Typography>

          <Box sx={{ flexGrow: 1, display: 'flex' }}/>

          <Box sx={{ flexGrow: 0, mx: 1 }}>
              <RefreshButton/>
          </Box>

          <Box sx={{ flexGrow: 0, mx: 1 }}>
              <DarkModeSwitch/>
          </Box>

          <Box sx={{ flexGrow: 0, mx: 1 }}>
            <Tooltip title="Open profile">
              <IconButton
                onClick={() => navigate('/profile')}
                sx={{ p: 0 }}
                color="inherit"
              >
                <FontAwesomeSvgIcon icon={faUser}/>
              </IconButton>
            </Tooltip>
          </Box>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {links.map((link, index) => (
            <ListItemButton
              key={link.url}
              sx={{
                minHeight: 48,
                justifyContent: open ? 'initial' : 'center',
                px: 2.5,
              }}
              onClick={() => navigate(link.url)}
              selected={matchedLink?.url === link.url}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : 'auto',
                  justifyContent: 'center',
                }}
              >
                {link.icon}
              </ListItemIcon>
              <ListItemText primary={link.title} sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton>
          ))}
        </List>
        <Divider />
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        {children}
      </Box>
    </Box>
  );
}
