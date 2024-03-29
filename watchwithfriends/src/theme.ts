import { createTheme } from "@mui/material";

export const theme = createTheme({
  palette: {
    primary: {
      main: "#27374D",
    },
    secondary: {
      main: "#526D82",
    },
    background: {
      default: "#DDE6ED",
    },
    text: {
      primary: "#DDE6ED",
    },
    error: {
      main: "#FF0000",
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1920,
    },
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: "#526D82",
        },
      },
    },
  },
});