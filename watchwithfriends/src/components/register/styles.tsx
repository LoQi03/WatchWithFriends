import styled from "@emotion/styled";
import { theme } from "../../theme";

export const InputContainer = styled('div')(() => ({
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'start',
  justifyContent: 'center',
  gap: '20px',
  '& a': {
    color: theme.palette.text.primary,
    fontSize: '15px',
    textDecoration: 'none',
  },
  [theme.breakpoints.down('sm')]: {
    width: '90%',
  },
}));
