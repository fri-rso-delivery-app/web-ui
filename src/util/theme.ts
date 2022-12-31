import { createContext } from 'react';
import { green, purple } from '@mui/material/colors';
import { PaletteMode, ThemeOptions } from '@mui/material';


// Custom options (https://mui.com/material-ui/customization/palette/)
declare module '@mui/material/styles' {
  interface PaletteColor {
    gradient?: string;
  }
  interface SimplePaletteColorOptions {
    gradient?: string;
  }
}


export const ColorModeContext = createContext({ toggleColorMode: () => {} });

function _getDarkLightModeBase(mode: PaletteMode) {
  return {
    palette: {
    mode,
    ...(mode === 'light'
      ? {
          // palette values for light mode
          primary: {
            main: green[500],
            gradient: `linear-gradient(to right, ${green[500]}, ${green[800]})`,
          },
          secondary: {
            main: purple[500],
          },
        }
      : {
          // palette values for dark mode
          primary: {
            main: green[500],
            gradient: `linear-gradient(to right, ${green[500]}, ${green[900]})`,
          },
          secondary: {
            main: purple[500],
          },
        }),
    },
  } as ThemeOptions;
}

export function getAppTheme(mode: PaletteMode) {
  return {
    ..._getDarkLightModeBase(mode),
    spacing: 6,
    components: {
      MuiDataGrid: {
        defaultProps: {
          isRowSelectable: () => false,
          hideFooter: true,
          disableColumnMenu: true,
        },
        styleOverrides: {
          root: {
            borderRadius: 16,
          }
        }
      },
      MuiPaper: {
        defaultProps: {
          elevation: 4,
        },
        styleOverrides: {
          root: {
            borderRadius: 16,
          }
        }
      },
      MuiTypography: {
        styleOverrides: {
          root: {
            display: 'inline-flex',
            alignItems: 'center',
          }
        }
      }
    }
  } as ThemeOptions;
}
