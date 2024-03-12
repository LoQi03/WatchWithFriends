import styled from "@emotion/styled";
import { theme } from "../../theme";

export const AuthenticationModal = styled('div')(() => ({
  position: 'relative',
  marginLeft: '40px',
  width: '700px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'start',
  justifyContent: 'center',
  borderRadius: '15px',
  backgroundColor: theme.palette.text.primary,
  boxShadow: 'rgba(0, 0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px',
  padding: '20px 40px',

  '@media screen and (max-width: 800px)': {
    padding: '0',
    alignItems: 'center',
    overflow: 'hidden',
    height: '100%',
    width: '100%',
    margin: '0',
    borderRadius: '0',
  },
}));

export const AuthenticationModalContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: start;
    justify-content: center;
    width: 100%;
    height: 100%;
`;
export const StyledImage = styled.img`
    width: 100%;
    object-fit: cover;
    cursor:'pointer' 
 `;