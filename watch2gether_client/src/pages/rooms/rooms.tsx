import React, { createContext, useCallback, useMemo, useState } from 'react';
import * as Styles from './styles';
import * as CommonStyles from '../../commonStyles';
import { CreateRoom } from '../../components/create-room/create-room';
import { RoomDto } from '../../models/roomDto';
import * as API from '../../api/roomManagmentAPI'
import { RoomListItem } from '../../components/room-list-item/room-list-item';
import { AuthContext } from '../../services/authenticationContext';

export interface CreateRoomContextType {
    open: boolean;
    handleonClose: () => void;
    handleOpen: () => void;
    getRoomsAsync: () => Promise<void>;
}

export const RoomsContext = createContext<CreateRoomContextType | null>(null);


export const RoomsPage = (): JSX.Element => {
    const [open, setOpen] = useState(false);
    const handleOpen = (): void => setOpen(true);
    const handleonClose = (): void => setOpen(false);
    const [rooms, setRooms] = useState<RoomDto[]>();
    const aouthService = React.useContext(AuthContext);

    const getRoomsAsync = useCallback(async (): Promise<void> => {
        try {
            const response = await API.getRooms();
            setRooms(response.data);

        }
        catch (error) {
            aouthService?.logout();
            console.log(error);
        };
    }, [aouthService]);


    useMemo(() => {
        if (rooms) {
            return;
        }
        getRoomsAsync();
    }, [rooms, getRoomsAsync]);

    return (
        <Styles.RoomsPageContainer>
            <Styles.HeaderBar>
                <h1>Rooms</h1>
                <CommonStyles.StyledTextField placeholder="Search" />
            </Styles.HeaderBar>
            <Styles.RoomListContainer>
                <Styles.RoomList>
                    {
                        rooms && rooms.map((room: RoomDto) => <RoomListItem key={room.id} id={room.id!} name={room.name!} creatorId={room.creatorId} userCount={room.userIds?.length ?? 0} />)
                    }
                </Styles.RoomList>
            </Styles.RoomListContainer>
            <Styles.ActionBar>
                <CommonStyles.GenericButton onClick={handleOpen}>Create Room</CommonStyles.GenericButton>
            </Styles.ActionBar>
            <RoomsContext.Provider value={{ open, handleonClose, handleOpen, getRoomsAsync }}>
                <CreateRoom />
            </RoomsContext.Provider>
        </Styles.RoomsPageContainer>
    )
};