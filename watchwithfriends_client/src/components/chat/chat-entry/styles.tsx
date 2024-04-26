import { styled } from '@mui/system';
import { theme } from '../../../theme';

export const ChatEntryContainer = styled('div')<{ isCurrentUser: boolean }>(
  ({ isCurrentUser}) => ({
    marginTop: '10px',
    display: 'flex',
    gap: '10px',
    alignItems: 'end',
    justifyContent: isCurrentUser ? 'flex-end' : 'flex-start',
    width: '100%',
  })
);

export const ChatEntryContent = styled('div')<{ isCurrentUser: boolean }>(
    ({ isCurrentUser}) => ({
    maxWidth: '70%',
    borderRadius: '10px',
    backgroundColor: isCurrentUser ? theme.palette.primary.main : theme.palette.secondary.main,
    padding: '15px',
    whiteSpace: 'pre-wrap',
    wordSpacing: '5px',
    lineHeight: '1.4',
    textAlign: 'justify',
    fontWeight: '550',
    fontSize: '15px',
    overflowWrap: 'break-word',
    })
);


export const ChatEntryImage = styled('img')({
  cursor: 'pointer',
  height: '50px',
  width: '50px',
  borderRadius: '50%',
  minWidth: '50px',
  minHeight: '50px',
});

export const CurrentUserChatEntryName = styled('p')({
  marginLeft: '70px',
  marginRight: '0px',
  marginBottom: '10px',
  marginTop: '20px',
  color: 'black',
  fontWeight: '500',
  fontSize: '16px',
});

export const OtherUserChatEntryName = styled('p')({
  marginLeft: '0px',
  marginRight: '70px',
  marginBottom: '10px',
  marginTop: '20px',
  color: 'black',
  fontWeight: '500',
  fontSize: '16px',
});

export const OtherUserChatEntryNameContainer = styled('div')({
  display: 'flex',
  justifyContent: 'flex-end',
});
