import React from 'react';
import * as Styles from './styles';
import * as AppConfig from '../../AppConfig';
import Person2Icon from '@mui/icons-material/Person2';
import { Button } from '@mui/material';

export interface RoomListItemProps {
    name: string;
    creatorId: string;
    userCount: number;
};

export const RoomListItem = (props: RoomListItemProps): JSX.Element => {
    return (
        <Styles.RoomListItemContainer>
            <Styles.RoomListItemHeader>
                <h3>{props.name}</h3>
                <Styles.CreatorImage src={`${AppConfig.GetConfig().apiUrl}Users/${props.creatorId}/image`} />
            </Styles.RoomListItemHeader>
            <Styles.RoomListActionBar>
                <Styles.CountUserContainer><Person2Icon />{props.userCount}</Styles.CountUserContainer>
                <Button variant='contained' color='success'>Join</Button>
            </Styles.RoomListActionBar>
        </Styles.RoomListItemContainer>
    )
};