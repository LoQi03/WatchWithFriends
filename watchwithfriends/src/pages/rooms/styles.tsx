import { styled } from '@mui/system';
import { theme } from '../../theme';

export const RoomsPageContainer = styled('div')({
    marginTop: '20px',
    width: '90%',
    height: '90%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    overflowX: 'hidden',
    overflowY: 'hidden',
    justifyContent: 'space-between',
    backgroundColor: theme.palette.primary.dark,
    padding: '20px',
    borderRadius: '20px',
    boxShadow: 'rgba(0, 0, 0, 0.25) 0px 14px 28px, rgba(0, 0, 0, 0.22) 0px 10px 10px',
    '@media screen and (max-width: 800px)': {
        width: '100%',
        height: '100%',
        borderRadius: '0',
        margin: '0',
    }
});
export const HeaderBar = styled('div')({
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '30px',
    width: '99%',
    backgroundColor: theme.palette.background.default,
    padding: '10px',
    borderRadius: '10px',
     '@media screen and (max-width: 800px)': {
        width: '90%',
        padding: '15px',
    }
});
export const RoomList = styled('div')({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    height: '85%',
    marginTop: '30px',
    marginBottom: '15px',
    overflowY: 'auto',
    overflowX: 'hidden',
    padding: '20px',
    gap: '20px',

    '&::-webkit-scrollbar': {
        backgroundColor: theme.palette.secondary.main,
        width: '15px',
    },
    '&::-webkit-scrollbar-track': {
        opacity: 0,
    },
    '&::-webkit-scrollbar-thumb': {
        borderRadius: '5px',
        width: '10px',
        backgroundColor: theme.palette.primary.main,
    },
    '&::-webkit-scrollbar-thumb:hover': {
        background: theme.palette.primary.dark,
    },
});

export const RoomListContainer = styled('div')({
    display: 'flex',
    width: '100%',
    justifyContent: 'center',
    height: '100%',
});
export const RoomHeaderButtonContainer = styled('div')({
    height: '100%',
    width: '10%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
});
