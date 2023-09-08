import { ChatField } from '../../components/chat/chat-field/chat-field';
import * as Styles from './styles';
import { RoomUsers } from '../../components/room-users/room-users';
import { VideoPlayer } from './video-player';
import { PlayList } from '../../components/play-list/play-list';
import { useContext, useState } from 'react';
import { RoomContext } from '../../services/roomContext';
import * as CommonStyles from '../../commonStyles';

export const RoomPage: React.FC = () => {
    const roomContext = useContext(RoomContext);
    const [isPlayListOpen, setIsPlayListOpen] = useState(false);

    return (
        <>
            {
                roomContext?.connection &&
                <>
                    <Styles.RoomContainer>
                        <Styles.VideoPlayerAndPlayListContainer>
                            <Styles.RoomAddLink>
                                <CommonStyles.StyledTextField value={roomContext?.newUrl} onChange={e => roomContext?.handleSetNewUrl(e.target.value)} />
                                <Styles.PlayButton onClick={() => roomContext?.handlePlayUrl(roomContext?.newUrl)}>Play</Styles.PlayButton>
                            </Styles.RoomAddLink>
                            <Styles.VideoPlayerContainer isFullScreen={roomContext?.isFullScreen}>
                                <VideoPlayer />
                            </Styles.VideoPlayerContainer>
                            <PlayList />
                        </Styles.VideoPlayerAndPlayListContainer>
                        <Styles.ChatContainer>
                            {
                                <>
                                    <RoomUsers users={roomContext?.users ?? []} />
                                    <ChatField messages={roomContext?.messages} />
                                </>
                            }
                        </Styles.ChatContainer>
                    </Styles.RoomContainer>
                </>
            }
        </>
    );
};
