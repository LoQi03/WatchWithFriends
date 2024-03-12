import { styled } from '@mui/system';
import { theme } from '../../theme';

export const CreateRoomModalContainer = styled('div')({
  position: 'absolute',
  left: '50%',
  top: '50%',
  transform: 'translate(-50%,-50%)',
  zIndex: 100,
});

export const CreateRoomActionBar = styled('div')({
  marginTop: '20px',
});

export const CreateRoomInputFieldContainer = styled('div')(() => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '30px',
  marginTop: '20px',
  width: '100%',
  marginBottom: '20px',
  [theme.breakpoints.down('sm')]: {
    width: '90%',
  },
}));

export const CreateRoomModal = styled('div')(() => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: theme.palette.background.default,
  borderRadius: '15px',
  padding: '20px 40px',
  width: '700px',
  opacity: 0,
  boxShadow: 'rgba(0, 0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px',
  animation: 'show 1s forwards',
  animationDelay: '.6s',
  transition: '.2s',
  '@keyframes show': {
    '0%': {
      transform: 'translateY(100px)',
      opacity: 0,
    },
    '100%': {
      transform: 'translateY(0px)',
      opacity: 1,
    },
  },
  [theme.breakpoints.down('sm')]: {
    alignItems: 'center',
    overflow: 'hidden',
    height: '100vh',
    width: '100vw',
    margin: 0,
    borderRadius: 0,
  },
}));

