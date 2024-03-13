import { styled } from '@mui/system';
import { theme } from '../../theme';

export const RoomListItemHeader = styled('div')({
  fontSize: '30px',
  fontWeight: 'bold',
  marginLeft: '15px',
  marginTop: '10px',
});

export const RoomListItemContainer = styled('div')({
  cursor: 'pointer',
  width: '100%',
  padding: '10px',
  backgroundColor: theme.palette.secondary.main,
   boxShadow: 'rgba(0, 0, 0, 0.25) 0px 14px 28px, rgba(0, 0, 0, 0.22) 0px 10px 10px',
  transition: 'background-color 0.2s ease-in-out',
  '&:hover': {
    backgroundColor: theme.palette.secondary.dark,
  },
});

export const RoomListItemContentContainer = styled('div')({
  display: 'flex',
  flexDirection: 'row',
  width: '100%',
  height: '100%',
  justifyContent: 'space-between',
  alignItems: 'center',
});

export const RoomListItemImage = styled('img')({
  width: '100px',
  height: '100px',
});

export const RoomListItemInfo = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
  justifyContent: 'space-between',
  alignItems: 'flex-end',
  fontSize: '20px',
  gap: '5px',
  width: '80%',
});

export const RomListItemMembers = styled('div')({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  gap: '5px',
  fontSize: '20px',
});