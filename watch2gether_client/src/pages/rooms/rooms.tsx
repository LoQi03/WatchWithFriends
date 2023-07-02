import React from 'react';
import * as Styles from './styles';
import * as CommonStyle from '../../commonStyles';
import { Autocomplete } from '@mui/material';
import { RoomListItem } from '../../components/room-list-item/room-list-item';

export const RoomsPage = (): JSX.Element => {
    return (
        <Styles.RoomsPageContainer>
            <Styles.HeaderBar>
                <h1>Rooms</h1>
                <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    options={[]}
                    sx={{ width: 300 }}
                    renderInput={(params) => <CommonStyle.StyledTextField sx={{ width: 300 }} {...params} label="Rooms" />}
                />
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
            </Styles.RoomList>
            <Styles.ActionBar>
                <CommonStyle.GenericButton>Create Room</CommonStyle.GenericButton>
            </Styles.ActionBar>
        </Styles.RoomsPageContainer>
    )
};