import styled from "@emotion/styled";
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import Forward10Icon from '@mui/icons-material/Forward10';
import Replay10Icon from '@mui/icons-material/Replay10';
import PauseIcon from '@mui/icons-material/Pause';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';

export const RoomContainer = styled.div`
    margin-top: 20px;
    width: 70%;
    display: flex;
    flex-direction: row;
    justify-content: start;
    gap: 20px;
    height: 90%;
`;
export const UsersContainer = styled.div`
    display: flex;
    flex-direction: column;
`;
export const VideoPlayerContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 60%;
    box-shadow: rgba(0, 0, 0, 0.25) 0px 14px 28px, rgba(0, 0, 0, 0.22) 0px 10px 10px;
`;
export const VideoPlayerActionBar = styled.div`
    display: flex;
    justify-content: space-between;
    width: 100%;
    height: 50px;
    background-color: #3928C2;
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

export const PlayAndSeekActionBar = styled.div`
    margin-left: 10px;
    display: flex;
    justify-content: space-between;
    width: 70%;
    height: 50px;
    background-color: #3928C2;
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
`;

export const ChatContainer = styled.div`
    box-shadow: rgba(0, 0, 0, 0.25) 0px 14px 28px, rgba(0, 0, 0, 0.22) 0px 10px 10px;
    width: 40%;
    display: flex;
    flex-direction: column;
    background-color: #3928C2;
    padding-left: 10px;
    padding-right: 10px;
`;

export const QueueContainer = styled.div`
    display: flex;
    flex-direction: column;
    background-color: #3928C2;
    height: 100%;
`;
