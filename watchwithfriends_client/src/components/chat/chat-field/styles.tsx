import { styled } from '@mui/system';
import SendIcon from '@mui/icons-material/Send';
import { theme } from '../../../theme';

export const ChatFieldContainer = styled('div')({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    backgroundColor: theme.palette.primary.dark,
    height: '100%',
    maxHeight: '100%',
    gap: '10px',
    width: '100%',
    '@media (max-width: 800px)': {
        zoom: 0.8,
    }
});

export const ChatFieldContent = styled('div')({
    overflowX: 'hidden',
    overflowY: 'auto',
    height: '100%',
    padding: '10px',

    /* Egyedi görgetősáv stílus */
    '&::-webkit-scrollbar': {
        width: '10px',
    },

    /* Egyedi görgetősáv háttere */
    '&::-webkit-scrollbar-track': {
        background: theme.palette.secondary.light,
    },

    /* Egyedi görgetősáv csúcsa */
    '&::-webkit-scrollbar-thumb': {
        background: theme.palette.primary.main,
        borderRadius: '5px',
    },

    /* Egyedi görgetősáv csúcsa hover állapotban */
    '&::-webkit-scrollbar-thumb:hover': {
        background: theme.palette.primary.dark,
    }
});

export const ChatFieldActionBar = styled('div')({
    display: 'flex',
    alignItems: 'center',
    padding: '5px',
    backgroundColor: theme.palette.primary.dark,
});

export const SendButton = styled(SendIcon)({
    color: 'white',
    cursor: 'pointer',
    width: '30px',
    height: '30px',
});
