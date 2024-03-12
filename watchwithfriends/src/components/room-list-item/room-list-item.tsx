import * as Styles from './styles';
import * as AppConfig from '../../AppConfig';
import Person2Icon from '@mui/icons-material/Person2';
import { useNavigate } from 'react-router-dom';

export interface RoomListItemProps {
    id: string;
    name: string;
    creatorId: string;
    userCount: number;
    createdAt?: Date;
};

export const RoomListItem = (props: RoomListItemProps): JSX.Element => {
    const navigate = useNavigate();
    const join = (): void => {
        navigate(`/room/${props.id}`);
    };

    return (

        <Styles.RoomListItemContainer onClick={join}>
            <Styles.RoomListItemContentContainer>
                <Styles.RoomListItemImage src={`${AppConfig.getConfig().apiUrl}Users/get-image/${props.creatorId}`} />
                <Styles.RoomListItemHeader>{props.name}</Styles.RoomListItemHeader>
                <Styles.RoomListItemInfo>
                    <Styles.RomListItemMembers><Person2Icon /> {" " + props.userCount} </Styles.RomListItemMembers>
                </Styles.RoomListItemInfo>
            </Styles.RoomListItemContentContainer>
        </Styles.RoomListItemContainer>
    )
};
