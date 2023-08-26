import * as Styles from './styles';
import * as AppConfig from '../../AppConfig';
import Person2Icon from '@mui/icons-material/Person2';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export interface RoomListItemProps {
    id: string;
    name: string;
    creatorId: string;
    userCount: number;
};

export const RoomListItem = (props: RoomListItemProps): JSX.Element => {
    const navigate = useNavigate();
    const join = (): void => {
        navigate(`/room/${props.id}`);
    };

    return (
        <Styles.RoomListItemContainer>
            <Styles.RoomListItemHeader>
                <h3>{props.name}</h3>
                <Styles.CreatorImage src={`${AppConfig.GetConfig().apiUrl}Users/${props.creatorId}/image`} />
            </Styles.RoomListItemHeader>
            <Styles.RoomListActionBar>
                <Styles.CountUserContainer><Person2Icon />{props.userCount}</Styles.CountUserContainer>
                <Button onClick={join} variant='contained' color='success'>Join</Button>
            </Styles.RoomListActionBar>
        </Styles.RoomListItemContainer>
    )
};