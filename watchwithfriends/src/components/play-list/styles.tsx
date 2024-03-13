import { styled } from '@mui/system';
import DeleteIcon from '@mui/icons-material/Delete';
import { theme } from '../../theme';

export const PlayListContainer = styled('div')({
  width: '100%',
  maxWidth: '100%',
  height: '30vh',
  maxHeight: '30vh',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  backgroundColor: theme.palette.primary.dark,
  color: 'white',
  boxShadow: 'rgba(0, 0, 0, 0.25) 0px 14px 28px, rgba(0, 0, 0, 0.22) 0px 10px 10px',
  '@media screen and (max-width: 800px)': {
    zoom: 0.8,
  },
});

export const PlayList = styled('div')({
  width: '100%',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  overflowY: 'auto',
  overflowX: 'hidden',
  padding: '10px',
});

export const PlayListItemImage = styled('img')({
  width: '150px',
});

export const PlayListItem = styled('div')({
  padding: '15px',
  width: '92%',
  height: '100px',
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  marginTop: '10px',
  backgroundColor: theme.palette.primary.main,
  gap: '20px',
});

export const PlayListItemTitle = styled('div')({
  fontSize: '20px',
  fontWeight: 'bold',
  height: '100%',
  width: '100%',
  display: 'flex',
  alignItems: 'start',
  justifyContent: 'start',
  textOverflow: 'ellipsis',
  paddingTop: '20px',
  paddingLeft: '20px',
});

export const PlayListItemDelete = styled(DeleteIcon)({
  color: theme.palette.primary.light,
  cursor: 'pointer',
  width: '30px',
  height: '30px',
});