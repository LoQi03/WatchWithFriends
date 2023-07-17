import React, { createContext, useMemo, useState } from 'react';
import * as Styles from './styles';
import * as CommonStyles from '../../commonStyles';
import { CreateRoom } from '../../components/create-room/create-room';
import { RoomDto } from '../../models/roomDto';
import * as API from '../../api/roomManagmentAPI'
import { RoomListItem } from '../../components/room-list-item/room-list-item';

export interface CreateRoomContextType {
    open: boolean;
    handleonClose: () => void;
    handleOpen: () => void;
}

export const RoomContext = createContext<CreateRoomContextType | null>(null);


export const RoomsPage = (): JSX.Element => {
    const [open, setOpen] = useState(false);
    const handleOpen = (): void => setOpen(true);
    const handleonClose = (): void => setOpen(false);
    const [rooms, setRooms] = useState<RoomDto[]>();

    useMemo(() => {
        if (rooms) {
            return;
        }
        const getRoomsAsync = async (): Promise<void> => {
            const result = await API.getRooms();
            setRooms(result);
            console.log(result);
        };
        getRoomsAsync();
    }, [rooms]);


    return (
        <Styles.RoomsPageContainer>
            <Styles.HeaderBar>
                <h1>Rooms</h1>
                <CommonStyles.StyledTextField placeholder="Search" />
            </Styles.HeaderBar>
            <Styles.RoomListContainer>
                <Styles.RoomList>
                    {
                        rooms && rooms.map((room: RoomDto) => <RoomListItem key={room.id} name={room.name ?? ""} creatorId={room.creator ?? ""} userCount={room.users?.length ?? 0} />)
                    }
                </Styles.RoomList>
            </Styles.RoomListContainer>
            <Styles.ActionBar>
                <CommonStyles.GenericButton onClick={handleOpen}>Create Room</CommonStyles.GenericButton>
            </Styles.ActionBar>
            <RoomContext.Provider value={{ open, handleonClose, handleOpen }}>
                <CreateRoom />
            </RoomContext.Provider>
        </Styles.RoomsPageContainer>
    )
};