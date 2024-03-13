import { styled } from '@mui/system';
import { theme } from '../../theme';

export const LoaderContainer = styled('div')({
  position: 'absolute',
  zIndex: 9999,
  width: '100vw',
  height: '100vh',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: 'rgba(0,0,0,0.5)',
  top: 0,
  left: 0,
  margin: 0,
  padding: 0,
});

export const Loader = styled('div')({
  width: '150px',
  height: '150px',
  position: 'fixed',
  borderRadius: '50%',
  border: 'none',
  borderTop: '5px solid' + ' ' + theme.palette.primary.main,
  animation: 'spin 2s linear infinite',
  '@keyframes spin': {
    '0%': {
      transform: 'rotate(0deg)',
    },
    '100%': {
      transform: 'rotate(360deg)',
    },
  },
});