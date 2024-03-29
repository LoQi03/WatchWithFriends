import { styled } from '@mui/system';
import UploadFileTwoToneIcon from '@mui/icons-material/UploadFileTwoTone';
import { theme } from '../../theme';

export const ProfilePageContainer = styled('div')({
  marginTop: '20px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: '20px',
  overflowX: 'hidden',
  overflowY: 'auto',
  gap: '15px',

  backgroundColor: theme.palette.primary.dark,
  padding: '20px',
  width: '50%',
  height: '90%',
   boxShadow: 'rgba(0, 0, 0, 0.25) 0px 14px 28px, rgba(0, 0, 0, 0.22) 0px 10px 10px',
  '@media (max-width: 800px)': {
    width: '100%',
    borderRadius: '0',
    marginTop: '0px',
    gap: '5px',
    height: '100%',
    padding: '10px',
  },
});

export const ProfilePageContent = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '20px',
  gap: '30px',
  width: '97%',
  borderRadius: '20px',
  height: '95%',
  backgroundColor: theme.palette.secondary.light,
  '@media (max-width: 800px)': {
    flexDirection: 'column',
    gap: '1%',
    paddingBottom: '10px',
    paddingTop: '10px',
  },
});

export const ProfilePageInputContainer = styled('div')({
  width: '95%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  height: 'auto',
  gap: '20px',
  justifyContent: 'start',
  backgroundColor: theme.palette.background.default,
  padding: '20px',
  borderRadius: '20px',
  marginTop: '20px',
  boxShadow: 'rgba(0, 0, 0, 0.25) 0px 14px 28px, rgba(0, 0, 0, 0.22) 0px 10px 10px',
  '@media (max-width: 800px)': {
    justifyContent: 'space-between',
    padding: '15px',
    gap: '10px',
    width: '90%'
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

export const ImageRowContainer = styled('div')({
  width: '95%',
  height: '30%',
  alignItems: 'center',
  justifyContent: 'center',

  padding: '20px',
  borderRadius: '20px',
  display: 'flex',
  flexDirection: 'column',
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
