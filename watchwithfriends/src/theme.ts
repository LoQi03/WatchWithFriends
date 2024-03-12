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
      primary: "#9DB2BF",
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
});