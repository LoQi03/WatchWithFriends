import { styled } from '@mui/system';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import Forward10Icon from '@mui/icons-material/Forward10';
import Replay10Icon from '@mui/icons-material/Replay10';
import PauseIcon from '@mui/icons-material/Pause';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import FullscreenExitIcon from '@mui/icons-material/FullscreenExit';
import {  ButtonProps} from "@mui/material";
import { Theme } from "@emotion/react";
import ChatIcon from '@mui/icons-material/Chat';
import LockIcon from '@mui/icons-material/Lock';
import * as CommonStyles from '../../commonStyles';
import { theme } from '../../theme';

export const RoomAddLink = styled('div')({
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    gap: '10px',
    '@media screen and (max-width: 800px)': {
        zoom: 0.65,
    }
});

export const PlayButton = styled(CommonStyles.GenericButton)<ButtonProps>({
    height: "100%",
    width: "15%",
    fontSize: "20px",
});

export const RoomContainer = styled('div')({
    marginTop: '10px',
    width: '90%',
    paddingTop: '10px',
    paddingBottom: '10px',
    paddingLeft: '20px',
    paddingRight: '20px',
    borderRadius: '10px',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'start',

    boxShadow: 'rgba(0, 0, 0, 0.25) 0px 14px 28px, rgba(0, 0, 0, 0.22) 0px 10px 10px',
    gap: '20px',
    backgroundColor: theme.palette.background.default,
    height: '90%',
    overflowY: 'hidden',
    overflowX: 'hidden',
    '@media screen and (max-width: 800px)': {
        width: '95%',
        alignItems: 'center',
        flexDirection: 'column',
        gap: '10px',
        minHeight: '100%',
        paddingBottom: '70px',
        margin: '0',
    }
});
export const UsersContainer = styled('div')({
    display: 'flex',
    flexDirection: 'column',
});
export const VideoPlayerContainer = styled('div')<{ isFullScreen: boolean | undefined }>(({ isFullScreen }) => ({
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: theme.palette.primary.dark,
    ...(isFullScreen
        ? {
            width: '100%',
            height: '100%',
            boxShadow: 'none',
            position: 'fixed',
            top: '0',
            left: '0',
            zIndex: '100',
        }
        : {
            height: '50dvh',
            minHeight: '50dvh',
            maxHeight: '50dvh',
            width: '100%',
            boxShadow: 'rgba(0, 0, 0, 0.25) 0px 14px 28px, rgba(0, 0, 0, 0.22) 0px 10px 10px',
        })
}));
export const VideoPlayerAndPlayListContainer = styled('div')({
    display: 'flex',
    flexDirection: 'column',
    width: '70%',
    height: '100%',
    overflowY: 'hidden',
    overflowX: 'hidden',
    gap: '20px',
    justifyContent: 'space-between',
    '@media screen and (max-width: 800px)': {
        width: '100%',
        justifyContent: 'space-between',
        marginBottom: '20px',
    }
});
export const VideoPlayerActionBar = styled('div')({
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
    height: '50px',
    backgroundColor: theme.palette.primary.dark,
    alignItems: 'center',
    gap: '10px',
    '@media screen and (max-width: 800px)': {
        height: '30px',
    }
});
export const Play = styled(PlayArrowIcon)({
    color: 'white',
    cursor: 'pointer',
    width: '30px',
    height: '30px',
});

export const Pause = styled(PauseIcon)({
    color: 'white',
    cursor: 'pointer',
    width: '30px',
    height: '30px',
});

export const Replay = styled(Replay10Icon)({
    color: 'white',
    cursor: 'pointer',
    width: '30px',
    height: '30px',
});
export const Forward = styled(Forward10Icon)({
    color: 'white',
    cursor: 'pointer',
    width: '30px',
    height: '30px',
});

export const Volume = styled(VolumeUpIcon)({
    color: 'white',
    cursor: 'pointer',
    width: '30px',
    height: '30px',
})
export const Mute = styled(VolumeOffIcon)({
    color: 'white',
    cursor: 'pointer',
    width: '30px',
    height: '30px',
});

export const FullScreen = styled(FullscreenIcon)({
    paddingRight: '10px',
    color: 'white',
    cursor: 'pointer',
    width: '35px',
    height: '35px',
});
export const ExitFullScreen = styled(FullscreenExitIcon)({
    paddingRight: '10px',
    color: 'white',
    cursor: 'pointer',
    width: '35px',
    height: '35px',
});
export const PlayAndSeekActionBar = styled('div')({
    marginLeft: '10px',
    display: 'flex',
    justifyContent: 'start',
    width: '100%',
    height: '50px',
    backgroundColor: theme.palette.primary.dark,
    alignItems: 'center',
    gap: '15px',
    '@media screen and (max-width: 800px)': {
        height: '30px',
    }
});
export const TimeIndicator = styled('p')({
    color: 'white',
    fontSize: '16px',
    fontWeight: '500',
});

export const VolumeActionBar = styled('div')({
    display: 'flex',
    justifyContent: 'start',
    width: '20%',
    gap: '15px',
    paddingRight: '20px',
    alignItems: 'center',
    maxWidth: '200px',
});
export const ChatContainer = styled('div')({
    boxShadow: 'rgba(0, 0, 0, 0.25) 0px 14px 28px, rgba(0, 0, 0, 0.22) 0px 10px 10px',
    width: '30%',
    overflowX: 'hidden',
    overflowY: 'hidden',
    display: 'flex',
    height: '100%',
    maxHeight: '100%',
    alignItems: 'center',
    flexDirection: 'column',
    backgroundColor: theme.palette.primary.dark,
    borderRadius: '10px',
    justifyContent: 'space-between',
    '@media screen and (max-width: 800px)': {
        display: 'none',
    }
});

export const QueueContainer = styled('div')({
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: theme.palette.primary.main,
    height: '100%',
});

export const StyledChatIcon = styled(ChatIcon)({
    color: 'white',
    fontSize: '35px',
});
export const StyledChatIconContainer = styled('div')({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'fixed',
    padding: '15px',
    backgroundColor: theme.palette.primary.main,
    bottom: '5rem',
    right: '1.5rem',
    borderRadius: '100%',
    '@media screen and (min-width: 800px)': {
        display: 'none',
    }
});
export const StyledChatIconCounter = styled('div')({
    position: 'absolute',
    top: '0',
    right: '0',
    fontSize: '15px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '2px',
    width: '15px',
    borderRadius: '100%',
    backgroundColor: theme.palette.primary.light,
});

export const PhoneChatContainer = styled('div')({
    display: 'none',
    '@media screen and (max-width: 800px)': {
        position: 'absolute',
        bottom: '10rem',
        display: 'flex',
        width: '80%',
        maxWidth: '80%',
        height: '70dvh',
        maxHeight: '70dvh',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        borderRadius: '10px',
        backgroundColor: theme.palette.primary.dark,
        padding: '10px',
    }
});

export const VolumeActionBarSlider: Theme = { color: 'white', width: '100%' };

export const VideoPlayerSlider: Theme = { color: 'white', width: '100%' };


export const PasswordRoomInputFieldContainer = styled('div')({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '30px',
    width: '50%',
    height: '100%',
    '@media screen and (max-width: 800px)': {
        width: '90%',
    }
});

export const PasswordRoomModal = styled('div')({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.palette.primary.dark,
    borderRadius: '15px',
    padding: '20px 40px',
    width: '700px',
    opacity: '0',
    boxShadow: 'rgba(0, 0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px',
    animation: 'show 1s forwards',
    animationDelay: '.6s',
    transition: '.2s',
    '@keyframes show': {
        '0%': {
            transform: 'translateY(100px)',
            opacity: '0',
        },
        '100%': {
            transform: 'translateY(0px)',
            opacity: '1',
        }
    },
    '@media screen and (max-width: 800px)': {
        alignItems: 'center',
        overflow: 'hidden',
        height: '100dvh',
        width: '100dvw',
        margin: '0',
        borderRadius: '0',
    }
});
export const LockIconStyled = styled(LockIcon)({
    color: theme.palette.primary.main,
    fontSize: '100px',
});