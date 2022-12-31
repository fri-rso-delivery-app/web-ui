import { useContext, useEffect, useMemo, useState } from 'react'
import './App.css'
import { QueryClientProvider, useQuery } from 'react-query'
import { AuthContext, queryClient } from './util/server'
import { UserRead } from './schemas/auth/Api'
import { 
  Routes,
  BrowserRouter as Router,
  Route,
} from 'react-router-dom'
import Login from './routes/auth/Login'
import AppRouter from './routes/AppRouter'
import { CircularProgress, createTheme, PaletteMode, ThemeProvider } from '@mui/material'
import { ColorModeContext, getAppTheme } from './util/theme'

export default function App() {
  const [mode, setMode] = useState(
    (localStorage.getItem('theme') ?? 'light') as PaletteMode
  );
  
  const colorMode = useMemo(
    () => ({
      // The dark mode switch would invoke this method
      toggleColorMode: () => {
        setMode((prevMode: PaletteMode) => {
            const newMode = (prevMode === 'light' ? 'dark' : 'light');
            localStorage.setItem('theme', newMode);
            return newMode;
          }
        );
      },
    }),
    [],
  );

  const theme = useMemo(() => createTheme(getAppTheme(mode)), [mode]);

  const [auth, setAuth] = useState(false);

  const readToken = () => {
    let token = localStorage.getItem('jwt_token');
    if (token) {
      setAuth(true);
    }
  };

  useEffect(() => {
    readToken();
  }, []);


  return (
    <div className="App">
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <QueryClientProvider client={queryClient}>
            <AuthContext.Provider value={{ auth, setAuth }}>
              <Router>
                <AppRoutes/>
              </Router>
            </AuthContext.Provider>
          </QueryClientProvider>
          </ThemeProvider>
      </ColorModeContext.Provider>
    </div>
  )
}

const AppRoutes = () => {
  const authCtx = useContext(AuthContext);

  const { data: user, isLoading, isError } = useQuery<UserRead>(
    'auth/users/my_profile',
    { enabled: authCtx.auth },
  );

  if (!authCtx.auth)
    return (
      <Routes>
        <Route path="*" element={ <Login /> } />
      </Routes>
    )

  if (isLoading) return (<CircularProgress/>);

  if (isError || user == null) return (<h1>err loading data</h1>);

  // save user data to local storage
  localStorage.setItem('user_data', JSON.stringify(user));

  return (
    <AppRouter/>
  )
};
