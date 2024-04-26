import { styled } from '@mui/system';
import { theme } from '../../theme';
import CloseIcon from '@mui/icons-material/Close';
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
  transition: '.1s',
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
    width: '90vw',
    margin: 0,
    padding: '10px'
  },
}));

export const CreateRoomHeader = styled('div')({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  width: '100%',
  marginBottom: '20px',
});

export const HeaderCloseIcon = styled(CloseIcon)({
  cursor: 'pointer',
  color: theme.palette.primary.main,
  transition: '0.1s',
  '&:hover': {
    color: theme.palette.primary.light,
  },
  fontSize: '30px',
});