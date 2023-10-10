import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import * as API from '../../api/roomManagmentAPI';
import * as CommonStyles from '../../commonStyles';
import { CreateRoom } from '../../components/create-room/create-room';
import { RoomListItem } from '../../components/room-list-item/room-list-item';
import { RoomDto } from '../../models/roomDto';
import { AuthContext } from '../../services/authenticationContext';
import * as Styles from './styles';
import AddIcon from '@mui/icons-material/Add';
import { Loader } from '../../components/loader/loader';

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
    const aouthService = useContext(AuthContext);
    const [isLoading, setIsLoading] = useState(false);
    const [search, setSearch] = useState<string>("");
    const [filteredRooms, setFilteredRooms] = useState<RoomDto[] | null>(null);

    const getRoomsAsync = useCallback(async (): Promise<void> => {
        try {
            const { data } = await API.getRooms();
            setRooms(data);
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
        setIsLoading(true);
        setTimeout(() => {
            getRoomsAsync();
            setIsLoading(false);
        }, 1000);
    }, [rooms, getRoomsAsync]);

    useEffect(() => {
        if (!rooms) {
            return;
        }
        if (search === "") {
            setFilteredRooms(rooms);
            return;
        }
        const filtered = rooms.filter(x => x.name?.toLowerCase().includes(search.toLowerCase()));
        setFilteredRooms(filtered);
    }, [search, rooms]);

    return (
        <Styles.RoomsPageContainer>
            {isLoading && <Loader />}
            <Styles.HeaderBar>
                <CommonStyles.StyledTextField value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search" />
                <Styles.RoomHeaderButtonContainer>
                    <CommonStyles.GenericButton onClick={handleOpen} ><AddIcon /></CommonStyles.GenericButton>
                </Styles.RoomHeaderButtonContainer>
            </Styles.HeaderBar>
            <Styles.RoomListContainer>
                <Styles.RoomList>
                    {
                        filteredRooms && filteredRooms?.length > 0 ? filteredRooms.map((room: RoomDto) => <RoomListItem key={room.id} id={room.id!} name={room.name!} creatorId={room.creatorId} userCount={room.roomUsers?.length ?? 0} />)
                            : <h1> No room available!</h1>
                    }
                </Styles.RoomList>
            </Styles.RoomListContainer>
            <RoomsContext.Provider value={{ open, handleonClose, handleOpen, getRoomsAsync }}>
                <CreateRoom />
            </RoomsContext.Provider>
        </Styles.RoomsPageContainer>
    )
};