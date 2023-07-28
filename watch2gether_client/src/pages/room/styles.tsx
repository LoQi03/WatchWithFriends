import styled from "@emotion/styled";
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import Forward10Icon from '@mui/icons-material/Forward10';
import Replay10Icon from '@mui/icons-material/Replay10';
import PauseIcon from '@mui/icons-material/Pause';

export const RoomContainer = styled.div`
    width: 70%;
    display: flex;
    flex-direction: row;
    gap: 20px;
`;
export const UsersContainer = styled.div`
    display: flex;
    flex-direction: column;
`;
export const VideoPlayerContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 60%;
`;
export const VideoPlayerActionBar = styled.div`
    display: flex;
    justify-content: space-between;
    width: 100%;
    height: 50px;
    background-color: #3928C2;
    margin-bottom: 10px;
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
export const PlayAndSeekActionBar = styled.div`
    margin-left: 10px;
    display: flex;
    justify-content: space-between;
    width: 80%;
    height: 50px;
    background-color: #3928C2;
    align-items: center;
    gap: 15px;
`;
export const TimeIndicator = styled.p`
    color: white;
    font-size: 16px;
    font-weight: 500;
    margin-left: 10px;
`;
