import { ChatField } from '../../components/chat/chat-field/chat-field';
import * as Styles from './styles';
import { RoomUsers } from '../../components/room-users/room-users';
import { VideoPlayer } from './video-player';
import { PlayList } from '../../components/play-list/play-list';
import { useContext } from 'react';
import { RoomContext } from '../../services/roomContext';


export const RoomPage: React.FC = () => {
    const roomContext = useContext(RoomContext);

    return (
        <>
            {
                roomContext?.connection &&
                <>
                    <Styles.RoomHeader>
                        <Styles.InputTextField value={roomContext?.newUrl} onChange={e => roomContext?.handleSetNewUrl(e.target.value)} />
                        <Styles.PlayButton onClick={() => roomContext?.handlePlayUrl(roomContext?.newUrl)}>Play</Styles.PlayButton>
                    </Styles.RoomHeader>
                    <Styles.RoomContainer>
                        <Styles.VideoPlayerAndPlayListContainer>
                            <Styles.VideoPlayerContainer isFullScreen={roomContext?.isFullScreen}>
                                <VideoPlayer />
                            </Styles.VideoPlayerContainer>
                            {
                                roomContext?.currentRoom?.playList && roomContext?.currentRoom?.playList?.length > 0 && <PlayList />
                            }
                        </Styles.VideoPlayerAndPlayListContainer>
                        <Styles.ChatContainer>
                            <RoomUsers users={roomContext?.users ?? []} />
                            <ChatField messages={roomContext?.messages} />
                        </Styles.ChatContainer>
                    </Styles.RoomContainer>
                </>
            }
        </>
    );
};
