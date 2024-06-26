import { useContext } from 'react';
import * as Styles from './styles';
import { AuthContext } from '../../services/authenticationContext';
import { RoomContext } from '../../services/roomContext';
import { Video } from '../../api';

export const PlayList: React.FC = () => {
    const authContext = useContext(AuthContext);
    const roomContext = useContext(RoomContext);
    return (
        <>
            {
                < Styles.PlayListContainer >
                    <Styles.PlayList>
                        {roomContext?.currentRoom?.playList?.map((video: Video) => {
                            return (
                                <Styles.PlayListItem key={video.id}>
                                    <Styles.PlayListItemImage src={video.image??""} alt={video.title??""} />
                                    <Styles.PlayListItemTitle>{video.title}</Styles.PlayListItemTitle>
                                    {
                                        authContext?.currentUser?.id === roomContext.currentRoom?.creatorId && <Styles.PlayListItemDelete onClick={() => roomContext.handleDeleteVideo(video.id!)} />
                                    }
                                </Styles.PlayListItem>
                            );
                        })}
                    </Styles.PlayList>
                </Styles.PlayListContainer >
            }
        </>
    );
}