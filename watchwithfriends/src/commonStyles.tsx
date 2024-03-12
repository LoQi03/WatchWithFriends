
import styled from "@emotion/styled";
import { Button, TextField, Theme} from "@mui/material";
import { theme } from "./theme";

export const PageContainer = styled('div', {
  shouldForwardProp: (prop) => prop !== 'backgroundImage' && prop !== 'isLogin',
})<{ backgroundImage?: string; isLogin?: boolean }>(
  ({ backgroundImage, isLogin }) => `
    background-color: ${theme.palette.background.default};
    ${!isLogin && "margin-top: 60px;"}
    align-items: center;
    width: 100%;
    display: flex;
    overflow-y: auto;
    flex-direction: column;
    justify-content: start;
    background-image: url(${backgroundImage});
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    height: 100%;

    @media screen and (max-width: ${theme.breakpoints.values.sm}px) {
        padding-top: 0px;
        margin-top: 0px;
        ${!isLogin && "margin-bottom: 65px;"}
    }
  `
);

export const StyledTextField = styled(TextField)(() => ({
  "& .MuiInputBase-input": {
    color: theme.palette.primary.main,
  },
  "& .MuiInputLabel-root": {
    color: theme.palette.primary.main,
  },
  "& .MuiInputLabel-root.Mui-focused": {
    color: theme.palette.primary.main,
  },
  "& .MuiIconButton-root": {
    color: theme.palette.primary.main,
  },
  "& .MuiOutlinedInput-notchedOutline": {
    borderColor: theme.palette.primary.main,
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      color: theme.palette.primary.main,
    },
    "&:hover fieldset": {
      color: theme.palette.primary.main,
    },
    "&.Mui-focused fieldset": {
      color: theme.palette.primary.main,
    },
  },
  input: {
    '&:-webkit-autofill': {
      WebkitBoxShadow: `0 0 0 1000px ${theme.palette.background.default} inset`,
      backgroundColor: theme.palette.background.default,
      WebkitTextFillColor: theme.palette.primary.main,
      caretColor: theme.palette.primary.main,
    },
  },
  [theme.breakpoints.down('sm')]: {
    "& .MuiInputBase-input, & .MuiInputLabel-root, & .MuiInputLabel-root.Mui-focused, & .MuiIconButton-root": {
      border: 'none',
      borderBottom: `1px solid ${theme.palette.primary.main}`,
      borderRadius: '0',
      color: theme.palette.primary.main,
    },
    "& .MuiOutlinedInput-notchedOutline": {
      borderColor: theme.palette.primary.main,
      border: 'none',
      borderBottom: `1px solid ${theme.palette.primary.main}`,
      borderRadius: '0',
      padding: '0',
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: theme.palette.primary.main,
      },
      "&:hover fieldset": {
        borderColor: theme.palette.primary.main,
      },
      "&.Mui-focused fieldset": {
        borderColor: theme.palette.primary.main,
      },
    },
    input: {
      '&:-webkit-autofill': {
        WebkitBoxShadow: `0 0 0 1000px ${theme.palette.primary.main} inset`,
        backgroundColor: theme.palette.background.default,
        WebkitTextFillColor: theme.palette.primary.main,
        caretColor: theme.palette.primary.main,
        borderRadius: '0',
      },
    },
  },
  width: '100%',
}));
export const GenericButton = styled(Button)(() => ({
  color: theme.palette.text.primary,
  backgroundColor: theme.palette.primary.main,
  width: '100%',
  height: '55px',
  fontSize: '20px',
  fontWeight: 'bold',
  '@media (max-width: 800px)': {
    height: '40px',
  },
  '&:hover': {
    backgroundColor: theme.palette.secondary.main,
  },
}));

export const ErrorMassage = styled.p`
    color: red;
    font-size: 15px;
 `;
 

export const SignSwitchButton = styled('p')(() => ({
  cursor: 'pointer',
  color: theme.palette.primary.main, 
  textDecoration: 'underline',
  fontSize: '17px',
}));

export const Title = styled('h1')(() => ({
    color: theme.palette.primary.main,
    fontSize: '40px',
    fontWeight: 'bold',
    textAlign: 'center',
    '@media (max-width: 800px)': {
        fontSize: '30px',
    },
}));