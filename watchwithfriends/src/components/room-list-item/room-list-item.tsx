import { useEffect } from 'react';
import * as Styles from './styles';
import * as AppConfig from '../../AppConfig';
import Person2Icon from '@mui/icons-material/Person2';
import { useNavigate } from 'react-router-dom';
import { UserDto } from '../../models/userDto';
import { useState } from 'react';
import * as API from '../../api/userManagementAPI';

export interface RoomListItemProps {
    id: string;
    name: string;
    creatorId: string;
    userCount: number;
    createdAt?: Date;
};

export const RoomListItem = (props: RoomListItemProps): JSX.Element => {
    const navigate = useNavigate();
    const [creator, setCreator] = useState<UserDto>();
    const join = (): void => {
        navigate(`/room/${props.id}`);
    };

    useEffect(() => {
        const getCreator = async () => {
            try {
                const response = await API.getUserById(props.creatorId);
                setCreator(response.data);
            }
            catch (error) {
                console.log(error);
            }
        };
        getCreator();
    }, [props.creatorId]);

    return (

        <Styles.RoomListItemContainer onClick={join}>
            <Styles.RoomListItemContentContainer>
                <Styles.RoomListItemImage src={`${AppConfig.GetConfig().apiUrl}Users/${props.creatorId}/image`} />
                <Styles.RoomListItemHeader>{props.name}</Styles.RoomListItemHeader>
                <Styles.RoomListItemInfo>
                    <div>Creator: {creator?.name}</div>
                    <Styles.RomListItemMembers><Person2Icon /> {" " + props.userCount} </Styles.RomListItemMembers>
                </Styles.RoomListItemInfo>
            </Styles.RoomListItemContentContainer>
        </Styles.RoomListItemContainer>
    )
};
