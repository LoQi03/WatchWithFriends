import React from 'react';
import * as Styles from './styles';
import * as CommonStyles from '../../commonStyles';
import { RoomListItem } from '../../components/room-list-item/room-list-item';

export const RoomsPage = (): JSX.Element => {
    return (
        <Styles.RoomsPageContainer>
            <Styles.HeaderBar>
                <h1>Rooms</h1>
                <CommonStyles.StyledTextField placeholder="Search" />
            </Styles.HeaderBar>
            <Styles.RoomList>
                <RoomListItem />
                <RoomListItem />

                <RoomListItem />
                <RoomListItem />
                <RoomListItem />
                <RoomListItem />
                <RoomListItem />
                <RoomListItem />
                <RoomListItem />
                <RoomListItem />
                <RoomListItem />
                <RoomListItem />
                <RoomListItem />
            </Styles.RoomList>
            <Styles.ActionBar>
                <CommonStyles.GenericButton>Create Room</CommonStyles.GenericButton>
            </Styles.ActionBar>
        </Styles.RoomsPageContainer>
    )
};