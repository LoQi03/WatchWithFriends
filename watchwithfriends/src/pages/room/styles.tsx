import styled from "@emotion/styled";
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import Forward10Icon from '@mui/icons-material/Forward10';
import Replay10Icon from '@mui/icons-material/Replay10';
import PauseIcon from '@mui/icons-material/Pause';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import FullscreenExitIcon from '@mui/icons-material/FullscreenExit';
import { Theme } from "@emotion/react";
import { Button, ButtonProps } from "@mui/material";

export const RoomAddLink = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 20px;
    width: 100%;
    @media screen and (max-width: 800px) {
        zoom: 0.65;
    }
`;

export const PlayButton = (props: ButtonProps): JSX.Element => <Button
    variant="contained"
    style={{
        color: "white",
        backgroundColor: "#EF8354",
        height: "100%",
        width: "15%",
        fontSize: "20px",
    }}
    {...props} />;



export const RoomContainer = styled.div`
    margin-top: 20px;
    width: 70%;
    display: flex;
    flex-direction: row;
    justify-content: start;
    gap: 20px;
    height: 90dvh;
    max-height: 90dvh;
    margin-bottom: 20px;
    @media screen and (max-width: 800px) {
        width: 95%;
        align-items: center;
        flex-direction: column;
        gap: 10px;
        min-height: 100%;
    }
`;
export const UsersContainer = styled.div`
    display: flex;
    flex-direction: column;
`;
export const VideoPlayerContainer = styled.div<{ isFullScreen: boolean | undefined }>`
${props => props.isFullScreen
        ?
        `
            display: flex;
            flex-direction: column;
            width: 100%;
            height: 100%;
            box-shadow: none;
            position: fixed;
            top: 0;
            left: 0;
            z-index: 100;
        `
        :
        `
            display: flex;
            flex-direction: column;
            height: 50dvh;
            min-height: 50dvh;
            max-height: 50dvh;
            width: 100%;
            box-shadow: rgba(0, 0, 0, 0.25) 0px 14px 28px, rgba(0, 0, 0, 0.22) 0px 10px 10px;
        `
    }
`;
export const VideoPlayerAndPlayListContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 70%;
    height: 90dvh;
    max-height: 90dvh;
    gap: 20px;
    justify-content: space-between;
    @media screen and (max-width: 800px) {
        width: 100%;
        justify-content: space-between;
        margin-bottom: 20px;
    };
`;
export const VideoPlayerActionBar = styled.div`
    display: flex;
    justify-content: space-between;
    width: 100%;
    min-height: 50px;
    height: 50px;
    background-color: #EF8354;
    align-items: center;
`;
export const Play = styled(PlayArrowIcon)`
    color: white;
    cursor: pointer;
    width: 30px;
    height: 30px;
`;

export const Pause = styled(PauseIcon)`
    color: white;
    cursor: pointer;
    width: 30px;
    height: 30px;
    `;

export const Replay = styled(Replay10Icon)`
    color: white;
    cursor: pointer;
    width: 30px;
    height: 30px;
`;
export const Forward = styled(Forward10Icon)`
    color: white;
    cursor: pointer;
    width: 30px;
    height: 30px;
`;

export const Volume = styled(VolumeUpIcon)`
    margin-left: 20px;
    color: white;
    cursor: pointer;
    width: 30px;
    height: 30px;
`
export const Mute = styled(VolumeOffIcon)`
    color: white;
    cursor: pointer;
    width: 30px;
    height: 30px;
`;

export const FullScreen = styled(FullscreenIcon)`
    padding-right: 10px;
    color: white;
    cursor: pointer;
    width: 35px;
    height: 35px;
`;
export const ExitFullScreen = styled(FullscreenExitIcon)`
    padding-right: 10px;
    color: white;
    cursor: pointer;
    width: 35px;
    height: 35px;
`;
export const PlayAndSeekActionBar = styled.div`
    margin-left: 10px;
    display: flex;
    justify-content: start;
    width: 100%;
    height: 50px;
    background-color: #EF8354;
    align-items: center;
    gap: 15px;
`;
export const TimeIndicator = styled.p`
    color: white;
    font-size: 16px;
    font-weight: 500;
`;

export const VolumeActionBar = styled.div`
    display: flex;
    justify-content: start;
    width: 20%;
    gap: 15px;
    padding-right: 20px;
    align-items: center;
    max-width: 200px;
`;

export const ChatContainer = styled.div`
    box-shadow: rgba(0, 0, 0, 0.25) 0px 14px 28px, rgba(0, 0, 0, 0.22) 0px 10px 10px;
    width: 30%;
    display: flex;
    height: 100%;
    max-height: 100%;
    flex-direction: column;
    background-color: #4F5D75;
    padding-left: 5px;
    padding-right: 5px;
    align-items: center;
    justify-content: space-between;
    @media screen and (max-width: 800px) {
        display: none;
    }
`;

export const QueueContainer = styled.div`
    display: flex;
    flex-direction: column;
    background-color: #EF8354;
    height: 100%;
`;

export const VolumeActionBarSlider: Theme = { color: 'white', width: '100%' };

export const VideoPlayerSlider: Theme = { color: 'white', width: '100%' };