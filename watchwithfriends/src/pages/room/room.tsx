import { ChatField } from '../../components/chat/chat-field/chat-field';
import * as Styles from './styles';
import { VideoPlayer } from './video-player';
import { PlayList } from '../../components/play-list/play-list';
import { useContext, useEffect, useState } from 'react';
import { RoomContext } from '../../services/roomContext';
import * as CommonStyles from '../../commonStyles';

export const RoomPage: React.FC = () => {
    const roomContext = useContext(RoomContext);
    const [chatIsOpen, setChatIsOpen] = useState<boolean>(false);

    const openChat = (): void => {
        roomContext?.updateNotSeeingMessages(0);
        setChatIsOpen(!chatIsOpen);
    }

    useEffect(() => {
        if (roomContext?.messages) {
            if (!chatIsOpen) {
                return;
            }
            roomContext?.updateNotSeeingMessages(0);
        }
    }, [roomContext?.messages]);


    return (
        <>
            {
                roomContext?.connection &&
                <>
                    <Styles.RoomContainer>
                        <Styles.VideoPlayerAndPlayListContainer>
                            <Styles.RoomAddLink>
                                <CommonStyles.GenericTextField placeholder='Paste the video here....' value={roomContext?.newUrl} onChange={e => roomContext?.handleSetNewUrl(e.target.value)} />
                                <Styles.PlayButton onClick={() => roomContext?.handlePlayUrl(roomContext?.newUrl)}>Play</Styles.PlayButton>
                            </Styles.RoomAddLink>
                            
                                <VideoPlayer />
                            <PlayList />
                        </Styles.VideoPlayerAndPlayListContainer>
                        <Styles.ChatContainer>
                            {
                                <>
                                    <ChatField messages={roomContext?.messages} />
                                </>
                            }
                        </Styles.ChatContainer>

                        {
                            chatIsOpen &&
                            <Styles.PhoneChatContainer>
                                <ChatField messages={roomContext?.messages} />
                            </Styles.PhoneChatContainer>
                        }

                        <Styles.StyledChatIconContainer>
                            <Styles.StyledChatIcon onClick={openChat} />
                            {roomContext.notSeeingMessages != 0 && <Styles.StyledChatIconCounter > {roomContext.notSeeingMessages} </Styles.StyledChatIconCounter>}
                        </Styles.StyledChatIconContainer>
                    </Styles.RoomContainer>
                </>
            }
        </>
    );
};
