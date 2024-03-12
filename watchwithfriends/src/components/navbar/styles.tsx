import { BottomNavigation, BottomNavigationAction, MenuItem } from '@mui/material';
import { styled } from '@mui/system';import { theme } from '../../theme';

export const Navbar = styled('div')(() => ({
  display: 'flex',
  alignItems: 'center',
  paddingX: '10px',
  backgroundColor: theme.palette.secondary.main,
  position: 'fixed',
  top: 0,
  minHeight: '60px',
  maxHeight: '60px',
  width: '100%',
  '@media screen and (max-width: 800px)': {
    display: 'none',
  }
}));

export const NavbarContainer = styled('div')({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  width: '100%',
  paddingX: '10px',
  paddingY: '10px',
});

export const StyledImage = styled('img')({
  height: '35px',
  objectFit: 'cover',
  cursor: 'pointer',
});

export const ProfileImage = styled('img')({
  height: '50px',
  width: '50px',
  borderRadius: '50%',
  cursor: 'pointer',
  objectFit: 'auto',
});

export const LinkContainer = styled('div')({
  width: '100%',
  display: 'flex',
  justifyContent: 'start',
  alignItems: 'center',
  gap: '20px',
  padding: '10px 30px',
});

export const Link = styled('a')({
  textDecoration: 'none',
  display: 'flex',
  alignItems: 'center',
  gap: '10px',
  color: theme.palette.text.primary,
  fontSize: '22px',
  fontWeight: 'bold',
  cursor: 'pointer',
  transition: '0.3s',
  '&:hover': {
    color: theme.palette.primary.main,
  },
  '@media screen and (max-width: 800px)': {
    backgroundColor: theme.palette.primary.main,
    padding: '10px',
    width: '70%',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: 'rgba(0, 0, 0, 0.3) 5px 5px 5px, rgba(0, 0, 0, 0.22) 5px 5px 5px',
    '&:hover': {
      color: theme.palette.secondary.main,
    },
  },
});

export const StyledMenuItem = styled(MenuItem)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  color: theme.palette.text.primary,
});

export const StyledMenuItemButton = styled('div')({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  minWidth: '100px',
});

export const NavbarButtons = styled(BottomNavigation)({
  zIndex: 100,
  display: 'flex',
  width: '100%',
  backgroundColor: theme.palette.secondary.dark,
  position: 'fixed',
  bottom: 0,
  height: '65px',
  '@media screen and (min-width: 800px)': {
    display: 'none',
  },
});

export const BottomNavigationLink = styled(BottomNavigationAction)({
  color: 'white',
  '&.Mui-selected': {
    color: theme.palette.secondary.light,
  },
});