import { styled } from '@mui/system';
import { theme } from '../../theme';

export const RoomUsersContainer = styled('div')({
  overflowY: 'hidden',
  overflowX: 'auto',
  display: 'flex',
  width: '100%',
  height: '100px',
  justifyContent: 'start',
  alignItems: 'center',
  backgroundColor: theme.palette.primary.dark,
  borderBottom: '2px solid ' + theme.palette.secondary.main,
  gap: '10px',
  '@media (max-width: 800px)': {
    height: '50px',
  },
});

export const UserImage = styled('img')({
  cursor: 'pointer',
  height: '50px',
  width: '50px',
  borderRadius: '100%',
  '@media (max-width: 800px)': {
    height: '30px',
    width: '30px',
  },
});

export const UserImageContainer = styled('div')({
  margin: '0px',
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%',
  height: '100%',
});

export const UserName = styled('p')({
  margin: '0',
  fontWeight: 500,
  fontSize: '16px',
  color: 'black',
  width: '100%',
  textAlign: 'center',
});

export const CurrentUserContainer = styled('div')({
  margin: '0px',
  height: '50px',
  width: '50px',
  borderRight: '2px solid white',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  paddingLeft: '10px',
  paddingRight: '10px',
  '@media (max-width: 800px)': {
    height: '30px',
  },
});