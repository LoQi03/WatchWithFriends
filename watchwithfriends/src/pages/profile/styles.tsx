import { styled } from '@mui/system';
import UploadFileTwoToneIcon from '@mui/icons-material/UploadFileTwoTone';
import { theme } from '../../theme';

export const ProfilePageContainer = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'start',
  borderRadius: '10px',
  overflowX: 'hidden',
  overflowY: 'auto',
  gap: '15px',
  '@media (max-width: 800px)': {
    width: '99%',
    borderRadius: '0',
    gap: '5px',
    height: '100%',
  },
});

export const ProfilePageContent = styled('div')({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'start',
  alignItems: 'center',
  gap: '30px',
  width: '100%',
  height: '100%',
  '@media (max-width: 800px)': {
    flexDirection: 'column',
    gap: '1%',
    paddingBottom: '10px',
    paddingTop: '10px',
    marginBottom: '65px',
  },
});

export const ProfilePageInputContainer = styled('div')({
  width: '95%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  height: '100%',
  gap: '20px',
  justifyContent: 'start',
  '@media (max-width: 800px)': {
    justifyContent: 'space-between',
  },
});

export const StyledImage = styled('img')({
  height: '230px',
  width: '230px',
  borderRadius: '50%',
  '@media (max-width: 800px)': {
    height: '150px',
    width: '150px',
  },
});

export const ChangePasswordLink = styled('a')({
  color: 'white',
  fontSize: '20px',
  textDecoration: 'none',
  cursor: 'pointer',
});

export const ButtonContainer = styled('div')({
  display: 'flex',
  justifyContent: 'space-between',
  width: '100%',
});

export const ImageContainer = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  textAlign: 'center',
  justifyContent: 'center',
  alignItems: 'center',
  height: '250px',
  width: '250px',
});

export const ProfileButtonStyle = {
  backgroundColor: 'transparent',
  color: 'white',
  border: 'none',
  boxShadow: 'none',
  borderRadius: '50%',
  height: '230px',
  width: '230px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '0',
  '@media (max-width: 800px)': {
    height: '150px',
    width: '150px',
  },
  '&:hover': {
    backgroundColor: 'transparent',
    opacity: '0.8',
    boxShadow: 'none',
  },
  '&:active': {
    backgroundColor: 'transparent',
    boxShadow: 'none',
  },
  '&:focus': {
    backgroundColor: 'transparent',
    boxShadow: 'none',
  },
};

export const UploadIcon = styled(UploadFileTwoToneIcon)({
  position: 'absolute',
  top: '1%',
  right: '1%',
  color: 'white',
  backgroundColor: theme.palette.primary.main,
  fontSize: '40px',
  padding: '10px',
  borderRadius: '50%',
  '@media (max-width: 800px)': {
    fontSize: '25px',
    top: '2%',
    right: '15%',
  },
});
